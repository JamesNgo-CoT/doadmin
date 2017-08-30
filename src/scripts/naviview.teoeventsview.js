class TEOEventsView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Events';

		window.debug('TEOEventsView', this);

		this.search = {
			action: function(searchText, searchTextbox) {
				console.log(searchText);
			}
		};

		const _this = this;
		this.actionMenuItems = [{
			label: 'Add Event',
			action: function() {
				console.log(_this.initOptions.formViewSourceKey);
				const sourceKey = _this.initOptions.formViewSourceKey;
				const showOptions = { isNew: true }
				const instanceKey = 'add';
				_this.navi.openView(sourceKey, showOptions, instanceKey, false);
			}
		}];

		this.render();
	}

	render() {

		// Debug marker.
		window.debug('⚑ LOGIN VIEW - RENDER METHOD', arguments);

		super.render();
	}
}
