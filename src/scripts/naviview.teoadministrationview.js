class TEOAdministrationView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {

		// Debug marker.
		window.debug('⚑ LOGIN VIEW - CONSTRUCTOR', arguments);

		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Administration';

		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = null;

		this.render();
	}

	render() {

		// Debug marker.
		window.debug('⚑ LOGIN VIEW - RENDER METHOD', arguments);

		super.render();
	}
}
