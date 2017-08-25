class NaviView {
	constructor(options) {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + options.key + '\') CONSTRUCTOR', arguments);

		this.title = 'NAVIVIEW';
		this.options = options;
	}

	destructor() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.options.key + '\') DESCRUCTOR METHOD', arguments);

		$('.' + this.options.key).detach();
	}

	// --------------------------------------------------

	render() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.options.key + '\') RENDER METHOD');
	}

	// --------------------------------------------------

	hide() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.options.key + '\') HIDE METHOD');

		$('.' + this.options.key).hide();
	}

	show(options) {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.options.key + '\') SHOW METHOD', arguments);

		$('.' + this.options.key).show();
	}
}
