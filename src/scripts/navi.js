class Navi {
	constructor(options) {
		// options = {
		// 	mainView: { key: 'string', options: 'object' },
		// 	menuItems: [{ key: 'string', options: 'object', title: 'string' }],
		// 	viewClasses: { key: { classObj: 'object', options: 'object', standAlone: 'boolean' } }
		// }

		window.debug('Navi.constructor()', options);

		options = options || {};

		// SETUP VIEW CLASSES OPTIONS
		if (options.viewClasses == null) {
			options.viewClasses = {};
		}
		for (var k in options.viewClasses) {
			options.viewClasses[k].key = k;
			if (options.viewClasses[k].mainMenuTitle) {
				this.menuItems.push({ key: k, title: options.viewClasses[k].mainMenuTitle });
			}
		}

		// DYNAMIC MENU ITEMS
		this.dynamicMenuItems = [];

		// COPY TO PROPERTIES
		for (var k in options) {
			this[k] = options[k];
		}

		// PLACEHOLDER PROPERTY
		const _this = this;
		this.$placeholder = $('<div>NAVI PLACEHOLDER</div>');
		this.$placeholder.on('click', function(e) {
			const $target = $(e.target);
			if ($target.is('[data-menuindex]')) {
				const index = parseInt($target.attr('data-menuindex'));
				const menuItem = _this.menuItems[index];
				_this.render(menuItem.key, menuItem.options);
			}
		});
		$('#app-content-top > div').append(this.$placeholder);

		// OTHER PROPERTIES
		this.lastView = null;

		// CONTINUE TO RENDER
		this.render();
	}

	render(key, options) {
		window.debug('Navi.render()', key, options, this.lastView);

		// HIDE LAST VIEW
		if (this.lastView) { this.lastView.hide(); }

		// SHOW NEXT VIEW
		if (!key || !this.viewClasses[key]) {
			key = this.mainView.key;
			options = this.mainView.options;
		}

		const viewClass = this.viewClasses[key];
		const finalOptions = $.extend({}, viewClass.options, { key: key, navi: this });
		const viewInstance = viewClass.classObj.factory(finalOptions);
		viewInstance.show();
		this.lastView = viewInstance;

		// RENDER NAVI
		window.debug('RENDER NAVI');
		const templ = `
			<p>TITLE - {{title}}</p>
			{{#menuItems.length}}
			<ul>
				{{#menuItems}}
				<li data-menuindex="{{index}}">{{title}}</li>
				{{/menuItems}}
			</ul>
			{{/menuItems.length}}
		`;

		for (var i = 0, l = this.menuItems.length; i < l; i++) {
			this.menuItems[i].index = i;
		}

		const data = {
			title: viewInstance.title,
			menuItems: this.menuItems
		};
		const html = Mustache.render(templ, data);
		window.debug(html);
		this.$placeholder.html(html);
	}

	closeView(key) {
		this.viewClasses[key].classObj.remove(key);
		this.render();
	}
}
