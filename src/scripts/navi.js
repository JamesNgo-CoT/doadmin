class Navi {

	/**
	 * @param {object} options
	 *
	 * @param {object} options.viewClasses
	 * @param {object} options.viewClasses[classKey]
	 * @param {object} options.viewClasses[classKey].classObj
	 * @param {object} options.viewClasses[classKey].InitOptions
	 *
	 * @param {object} options.mainView
	 * @param {string} options.mainView.classKey
	 * @param {string} options.mainView.instanceKey
	 * @param {object} options.mainView.showOptions
	 * @param {boolean} options.mainView.autoInstanceKey
	 *
	 * @param {object[]} options.menuItems - Menu data.
	 * @param {string} options.menuItems[].label - Menu label.
	 * @param {object} options.menuItems[].viewClass
	 * @param {string} options.menuItems[].viewClass.classKey
	 * @param {string} options.menuItems[].viewClass.instanceKey
	 * @param {string} options.menuItems[].viewClass.showOptions
	 * @param {boolean} options.menuItems[].viewClass.autoInstanceKey
	 */
	constructor(options) {
		window.debug('=====');
		window.debug('NAVI CONSTRUCTOR', arguments);

		if (!options || !options.viewClasses || !options.mainView || !options.menuItems) {
			throw 'Error: Missing required arguments';
		}

		for (var k in options.viewClasses) {
			const viewClass = options.viewClasses[k];
			viewClass.classKey = k;
		}

		for (var k in options) {
			this[k] = options[k];
		}

		this.$placeholder = $('<div></div>');
		$('#app-content-top > div').append(this.$placeholder);

		this.lastView = null;
		this.dynamicMenuItems = [];

		this.openView();
	}

	// --------------------------------------------------

	render() {
		window.debug('=====');
		window.debug('NAVI RENDER METHOD');

		const templ = `
			<p>TITLE: {{title}}</p>

			<hr>

			<p>SEARCH FORM:</p>

			<p>ACTION MENU ITEMS:</p>

			{{#menuItems.length}}
			<p>MENU ITEMS:</p>
			<ul class="menuItems">
				{{#menuItems}}
				<li><a>{{label}}</a></li>
				{{/menuItems}}
			</ul>
			{{/menuItems.length}}

			<p>DYNAMIC MENU ITEMS:</p>

			<hr>
		`;

		const data = {
			title: this.lastView.title,
			menuItems: this.menuItems
		};

		const html = Mustache.render(templ, data);
		this.$placeholder.html(html);

		const _this = this;
		$('.menuItems > li > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewClass = _this.menuItems[i].viewClass;
				_this.openView({
					classKey: viewClass.classKey,
					instanceKey: viewClass.instanceKey,
					showOptions: viewClass.showOptions,
					autoInstanceKey: ViewClass.autoInstanceKey
				});
			})
		});
	}

	// --------------------------------------------------

	openView(options) {
		window.debug('=====');
		window.debug('NAVI OPEN VIEW METHOD', arguments);

		options = options || {};

		window.debug('viewObject:', options.viewObject);
		window.debug('classKey:', options.classKey);
		window.debug('instanceKey:', options.instanceKey);
		window.debug('showOptions:', options.showOptions);
		window.debug('autoInstanceKey:', options.autoInstanceKey);

		let showOptions = options.showOptions;

		if (this.lastView) {
			this.lastView.hide();
		}

		let viewInstance;

		if (options.viewObject) {
			viewInstance = options.viewObject;
		} else {
			let classKey = options.classKey;
			let instanceKey = options.autoInstanceKey ? (new Date()).getTime() + '' : options.instanceKey;

			if (!classKey || !this.viewClasses[classKey]) {
				const mainView = this.mainView;
				classKey = mainView.classKey;
				instanceKey = mainView.autoInstanceKey ? (new Date()).getTime() + '' : mainView.instanceKey;
				showOptions = mainView.showOptions;
			}

			const viewClass = this.viewClasses[classKey];

			if (!viewClass.instances) {
				viewClass.instances = {};
			}

			if (!instanceKey) {
				instanceKey = classKey;
			}

			if (!viewClass.instances[instanceKey]) {
				const finalOptions = $.extend({}, viewClass.initOptions, {
					classKey: classKey,
					instanceKey: instanceKey,
					navi: this
				});
				viewClass.instances[instanceKey] = new viewClass.classObj(finalOptions);

				// TODO - ADD MENU OPERATION
				this.dynamicMenuItems.push({
					label: viewClass.instances[instanceKey].title || 'UNTITLED',
					viewObject: viewClass.instances[instanceKey]
				});
			}

			viewInstance = viewClass.instances[instanceKey];
		}

		this.lastView = viewInstance;
		viewInstance.show(showOptions);
		this.render();
	}

	closeView(options) {
		window.debug('=====');
		window.debug('NAVI CLOSE VIEW METHOD', arguments);

		if (!options || !options.viewObject) {
			throw 'Error: Missing required arguments';
		}

		const viewObject = options.viewObject;
		viewObject.destructor();

		const classKey = viewObject.classKey;
		const instanceKey = viewObject.instanceKey || classKey;

		if (this.viewClasses[classKey] && this.viewClasses[classKey].instances && this.viewClasses[classKey].instances[instanceKey]) {
			this.viewClasses[classKey].instances[instanceKey] = null;
			delete this.viewClasses[classKey].instances[instanceKey];

			// TODO - ADD MENU OPERATION
		}

		this.openView();
	}
}
