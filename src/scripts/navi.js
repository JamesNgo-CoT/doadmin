class Navi {

	/**
	 * @param {object} options
	 *
	 * @param {object} options.viewClasses - Data used to make new Navi Views
	 * @param {object} options.viewClasses[key] - Object Key
	 * @param {object} options.viewClasses[key].classObj - Class to instantiate.
	 * @param {object} options.viewClasses[key].InitOptions - Initialization options.
	 *
	 * @param {object} options.mainView
	 * @param {string} options.mainView.key
	 * @param {object} options.mainView.showOptions
	 *
	 * @param {object[]} options.menuItems - Menu data.
	 * @param {string} options.menuItems[].label - Menu label.
	 * @param {object} options.menuItems[].viewClass - ViewClass data to link to.
	 * @param {string} options.menuItems[].viewClass.key - Key.
	 * @param {string} options.menuItems[].viewClass.showOptions - Show method Options.
	 */
	constructor(options) {
		window.debug('=====');
		window.debug('NAVI CONSTRUCTOR', arguments);

		options = options || {};

		// SETUP VIEW CLASSES OPTIONS
		if (options.viewClasses == null) {
			options.viewClasses = {};
		}
		for (var k in options.viewClasses) {
			const viewClass = options.viewClasses[k];
			viewClass.key = k;
		}

		// COPY TO PROPERTIES
		for (var k in options) {
			this[k] = options[k];
		}

		// PLACEHOLDER PROPERTY
		const _this = this;
		this.$placeholder = $('<div>NAVI PLACEHOLDER</div>');
		// TODO - NEED TO REPLACE WITH A MORE DIRECT CREATION CODE
		this.$placeholder.on('click', function(e) {
			const $target = $(e.target);
			if ($target.is('[data-menuindex]')) {
				const index = parseInt($target.attr('data-menuindex'));
				const menuItem = _this.menuItems[index];
				_this.render(menuItem.viewClass.key, menuItem.viewClass.showOptions);
			}
		});
		$('#app-content-top > div').append(this.$placeholder);

		// OTHER PROPERTIES
		this.lastView = null;

		// CONTINUE TO RENDER
		this.openView();
	}

	// --------------------------------------------------

	render() {
		window.debug('=====');
		window.debug('NAVI RENDER METHOD');

		// RENDER NAVI
		const templ = `
			<p>TITLE - {{title}}</p>
			{{#menuItems.length}}
			<ul>
				{{#menuItems}}
				<li data-menuindex="{{index}}">{{label}}</li>
				{{/menuItems}}
			</ul>
			{{/menuItems.length}}
		`;

		for (var i = 0, l = this.menuItems.length; i < l; i++) {
			this.menuItems[i].index = i;
		}

		const data = {
			title: this.lastView.title,
			menuItems: this.menuItems
		};

		const html = Mustache.render(templ, data);
		window.debug('html', html);
		this.$placeholder.html(html);
	}

	// --------------------------------------------------

	openView(options) {
		window.debug('=====');
		window.debug('NAVI OPEN VIEW METHOD', arguments);

		options = options || {};

		window.debug('viewObject:', options.viewObject);
		window.debug('key:', options.key);
		window.debug('showOptions:', options.showOptions);

		let showOptions = options.showOptions;

		// HIDE LAST VIEW IF IT EXISTS
		if (this.lastView) {
			this.lastView.hide();
		}

		let viewInstance;

		if (options.viewObject) {
			viewInstance = options.viewObject;
		} else {
			let key = options.key;

			if (!key || !this.viewClasses[key]) {
				key = this.mainView.key;
				showOptions = this.mainView.showOptions;
			}

			const viewClass = this.viewClasses[key];
			if (!viewClass.instance) {
				const finalOptions = $.extend({}, viewClass.initOptions, {
					key: key,
					navi: this
				});
				viewClass.instance = new viewClass.classObj(finalOptions);
			}

			viewInstance = viewClass.instance;
		}

		this.lastView = viewInstance;
		viewInstance.show(showOptions);
		this.render();
	}

	closeView(options) {
		window.debug('=====');
		window.debug('NAVI CLOSE VIEW METHOD', arguments);

		options = options || {};

		if (options.key && this.viewClasses[options.key].instance) {
			if (this.viewClasses[options.key].instance.destructor) {
				this.viewClasses[options.key].instance.destructor();
			}
			this.viewClasses[options.key].instance = null;
		}

		this.openView();
	}
}
