class LoginView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {

		// Debug marker.
		window.debug('⚑ LOGIN VIEW - CONSTRUCTOR', arguments);

		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Login Required';

		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = null;

		this.render();
	}

	render() {

		// Debug marker.
		window.debug('⚑ LOGIN VIEW - RENDER METHOD', arguments);

		super.render();

		this.$topRegion.html(`
			<p>Please <a href="#">login</a> to proceed.</p>
		`);

		const _this = this;
		$('a', this.$topRegion).on('click', function(e) {
			e.preventDefault();
			_this.cotLogin.showLogin();
		});
	}
}
