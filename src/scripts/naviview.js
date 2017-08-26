class NaviView {
	constructor(options) {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + options.classKey.replace(/\s*/g, '') + '_' + options.instanceKey.replace(/\s*/g, '') + '\') - CONSTRUCTOR', arguments);

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

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - DESTRUCTOR', arguments);

		$('.' + this.className).detach();
	}

	// --------------------------------------------------

	render() {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - RENDER METHOD', arguments);
	}

	// --------------------------------------------------

	hide() {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - HIDE METHOD', arguments);

		$('.' + this.className).hide();
	}

	show(options) {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - HIDE METHOD', arguments);

		$('.' + this.className).show();
	}
}
