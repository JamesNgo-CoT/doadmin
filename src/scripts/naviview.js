class NaviView {
	constructor(options) {
		if (console && console.log) {
			console.log('NaviView(\'' + options.key + '\').constructor()', options);
		}

		for (var k in options) { this[k] = options[k]; }

		this.title = 'NAVI VIEW';

		this._render();
	}

	_render() {
		if (console && console.log) {
			console.log('NaviView(\'' + this.key + '\')._render()');
		}

		$('#app-content-top > div').append('<div class="' + this.key + '">NAVI VIEW</div>');
		$('#app-content-left > div').append('<div class="' + this.key + '">NAVI VIEW</div>');
		$('#app-content-right > div').append('<div class="' + this.key + '">NAVI VIEW</div>');
		$('#app-content-bottom > div').append('<div class="' + this.key + '">NAVI VIEW <a href="#" class="btn btn-default">Next</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.key + ' .btn').on('click', function(e) {
			e.preventDefault();
			_this.navi.render(_this.nextViewKey);
		});
	}

	show(options) {
		if (console && console.log) {
			console.log('NaviView(\'' + this.key + '\').show()', options);
		}

		$('.' + this.key).show();
	}

	hide() {
		if (console && console.log) {
			console.log('NaviView(\'' + this.key + '\').hide()');
		}

		$('.' + this.key).hide();
	}

	close() {
		if (console && console.log) {
			console.log('NaviView(\'' + this.key + '\').close()');
		}

		$('.' + this.key).detach();
		this.navi.closeView(this.key);
		this.navi.render();
	}
}

NaviView.factory = function(options) {
	if (!this.instances) {
		this.instances = {};
	}

	if (!this.instances[options.key]) {
		this.instances[options.key] = new this(options);
	}

	return this.instances[options.key];
}

NaviView.remove = function(key) {
	if (this.instances[key]) {
		delete this.instances[key];
	}
}
