class NaviView {
	constructor(options) {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + options.key + '\') CONSTRUCTOR', arguments);

		if (!options || !options.classKey || !options.instanceKey || !options.navi) {
			throw 'Error: Missing required arguments';
		}

		for (var k in options) {
			this[k] = options[k];
		}

		this.className = this.classKey.replace(/\s*/g, '') + '_' + this.instanceKey.replace(/\s*/g, '');

		this.title = 'NAVIVIEW';
	}

	destructor() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.className + '\') DESCRUCTOR METHOD', arguments);

		$('.' + this.className).detach();
	}

	// --------------------------------------------------

	render() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.className + '\') RENDER METHOD');
	}

	// --------------------------------------------------

	hide() {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.className + '\') HIDE METHOD');

		$('.' + this.className).hide();
	}

	show(options) {
		window.debug('=====');
		window.debug('NAVI VIEW (\'' + this.className + '\') SHOW METHOD', arguments);

		$('.' + this.className).show();
	}
}
