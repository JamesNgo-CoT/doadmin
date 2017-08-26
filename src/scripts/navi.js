/** Class to manage NaviViews objects. */
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

		// Debug marker.
		window.debug('⚑ NAVI - CONSTRUCTOR', arguments);

		// Requirments.
		if (!options || !options.viewClasses || !options.mainView || !options.menuItems) {
			throw 'Error: Missing required arguments';
		}

		// Finalize viewClasses option.
		for (var k in options.viewClasses) {
			const viewClass = options.viewClasses[k];
			viewClass.classKey = k;
		}

		// Set properties.
		for (var k in options) {
			this[k] = options[k];
		}

		// Attach UI placeholder.
		this.$placeholder = $('<div></div>');
		$('#app-content-top > div').append(this.$placeholder);

		// Other properties.
		this.lastView = null;
		this.dynamicMenuItems = [];

		// Start.
		this.openView();
	}

	// --------------------------------------------------

	/** Renders the UI. */
	render() {

		// Debug marker.
		window.debug('⚑ NAVI - RENDER METHOD', arguments);

		// Mustache JS template.
		const templ = `
			{{#viewObject}}
			<h1>{{title}}</h1>

			<hr>

			<p>SEARCH FORM:</p>

			<p>ACTION MENU ITEMS:</p>
			{{/viewObject}}

			<hr>

			<p>MENU ITEMS:</p>

			<ul class="menuItems">
				{{#menuItems}}
				<li><a>{{label}}</a></li>
				{{/menuItems}}
			</ul>

			<p>DYNAMIC MENU ITEMS:</p>

			<ul class="dynamicMenuItems">
				{{#dynamicMenuItems}}
				<li><a>{{label}}</a></li>
				{{/dynamicMenuItems}}
			</ul>

			<hr>
		`;

		// Mustache JS data.
		const data = {
			viewObject: this.lastView,
			menuItems: this.menuItems,
			dynamicMenuItems: this.dynamicMenuItems
		};

		// Mustache JS render.
		const html = Mustache.render(templ, data);
		this.$placeholder.html(html);

		// TODO - Search form event handler

		// TODO - Action menu items event handler

		const _this = this;

		// Menu items event handler.
		$('.menuItems > li > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewClass = _this.menuItems[i].viewClass;
				_this.openView({
					classKey: viewClass.classKey,
					instanceKey: viewClass.instanceKey,
					showOptions: viewClass.showOptions,
					autoInstanceKey: viewClass.autoInstanceKey
				});
			})
		});

		// TODO - Dynamic menu items event handler.
		// Menu items event handler.
		$('.dynamicMenuItems > li > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewObject = _this.dynamicMenuItems[i].viewObject;
				_this.openView({
					viewObject: viewObject
				});
			})
		});
	}

	// --------------------------------------------------

	/**
	 * @param {object} options
	 */
	openView(options) {

		// Debug marker.
		window.debug('⚑ NAVI - OPEN VIEW METHOD', arguments);

		options = options || {};

		window.debug('viewObject:', options.viewObject);
		window.debug('classKey:', options.classKey);
		window.debug('instanceKey:', options.instanceKey);
		window.debug('showOptions:', options.showOptions);
		window.debug('autoInstanceKey:', options.autoInstanceKey);

		let showOptions = options.showOptions;

		// Hide last NavView object.
		if (this.lastView) {
			this.lastView.hide();
		}

		let viewInstance;

		if (options.viewObject) {
			viewInstance = options.viewObject;
		} else {
			let classKey = options.classKey;
			let instanceKey = options.autoInstanceKey ? (new Date()).getTime() + '' : options.instanceKey;

			// Default to main view
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

			if (!viewClass.instances[instanceKey]) {
				const finalOptions = $.extend({}, viewClass.initOptions, {
					classKey: classKey,
					instanceKey: instanceKey || classKey,
					navi: this
				});
				viewClass.instances[instanceKey] = new viewClass.classObj(finalOptions);

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

	/**
	 * @param {object} options
	 * @param {object} options.viewObject
	 */
	closeView(options) {

		// Debug marker.
		window.debug('⚑ NAVI - CLOSE VIEW METHOD', arguments);

		if (!options || !options.viewObject) {
			throw 'Error: Missing required arguments';
		}

		const viewObject = options.viewObject;
		viewObject.destructor();

		const classKey = viewObject.classKey;
		const instanceKey = viewObject.instanceKey || classKey;

		if (this.viewClasses[classKey] && this.viewClasses[classKey].instances && this.viewClasses[classKey].instances[instanceKey]) {
			for (let i = 0, l = this.dynamicMenuItems.length; i < l; i++) {
				if (viewObject == this.dynamicMenuItems[i].viewObject) {
					this.dynamicMenuItems.splice(i, 1);
					break;
				}
			}

			this.viewClasses[classKey].instances[instanceKey] = null;
			delete this.viewClasses[classKey].instances[instanceKey];
		}

		this.openView();
	}
}
