class TEODashView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Dashboard';

		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = null;

		this.render();
	}

	render() {
		super.render();

		this.$topRegion.html(`
			<p>DASHBOARD DATA...</p>
		`);
	}

	show(showOptions) {
		super.show(showOptions);
	}
}
