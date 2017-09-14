/* exported NaviView */

class NaviView {

	constructor(sourceKey, instanceKey, navi, initOptions) {

		// if (!options || !options.sourceKey || !options.instanceKey || !options.navi) {
		if (!sourceKey || !instanceKey || !navi) {
			throw 'Error: Missing required arguments';
		}

		// Set properties.
		this.sourceKey = sourceKey;
		this.instanceKey = instanceKey;
		this.navi = navi;
		this.initOptions = initOptions;
		this.className = sourceKey.replace(/\s*/g, '') + '_' + instanceKey.replace(/\s*/g, '');
		this.title = 'NAVIVIEW';

		// this.cotLogin = cotLogin;

		this.$topRegion = null;
		this.$leftRegion = null;
		this.$rightRegion = null;
		this.$bottomRegion = null;

		// this.render(); - Implement in subclass.
	}

	destructor() {
		$('.' + this.className).detach();
	}

	hide() {
		//$('.' + this.className).hide();
		$('.' + this.className).fadeOut();
	}

	show() { // (showOptions) {
		//$('.' + this.className).show();
		$('.' + this.className).fadeIn();
	}

	render() {
		this.$topRegion = $('<div class="' + this.className + ' top"></div>');
		$('#app-content-top > div').append(this.$topRegion);

		this.$leftRegion = $('<div class="' + this.className + ' left"></div>');
		$('#app-content-left > div').append(this.$leftRegion);

		this.$rightRegion = $('<div class="' + this.className + ' right"></div>');
		$('#app-content-right > div').append(this.$rightRegion);

		this.$bottomRegion = $('<div class="' + this.className + ' bottom"></div>');
		$('#app-content-bottom > div').append(this.$bottomRegion);
	}
}
