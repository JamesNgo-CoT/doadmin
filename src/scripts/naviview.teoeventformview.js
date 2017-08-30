class TEOEventFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Event Form';

		this.searchAvailable = false;
		this.search = null;

		this.actionMenuItems = null;

		this.form = null;

		this.render();
	}

	render() {
		super.render();

		this.$topRegion.html(`
			<p>TOP</p>
			<div class="formWrapper"></div>
			<p>BOTTOM</p>
		`);

		const prefix = this.className;
		this.form = new CotForm({
			id: prefix + '_form',
			rootPath: '',
			success: function() {},

			sections: [{
				title: 'Event Details',

				rows: [{
					fields: [{
						id: prefix + '_eventType',
						title: 'Event Type',
						type: 'radio',
						required: true,
						orientation: 'horizontal',
						choices: [
							{ text: 'Training' },
							{ text: 'Outreach' },
							{ text: 'Special Event' }
						]
					}]
				}, {
					fields: [{
						id: prefix + '_date',
						title: 'Date',
						type: 'datetimepicker',
						required: true
					}, {
						id: prefix + '_startTime',
						title: 'Start Time',
						type: 'text',
						required: true
					}, {
						id: prefix + '_endTime',
						title: 'End Time',
						type: 'text',
						required: true
					}]
				}, {
					fields: [{
						id: prefix + '_eventName',
						title: 'Event Name',
						type: 'text',
						required: true
					}]
				}, {
					fields: [{
						id: prefix + '_location',
						title: 'Location',
						type: 'text'
					}]
				}, {
					fields: [{
						id: prefix + '_contactName',
						title: 'Contact Name',
						type: 'text'
					}, {
						id: prefix + '_contactPhone',
						title: 'Contact Phone',
						type: 'text',
						validator: 'Phone'
					}, {
						id: prefix + '_contactEmail',
						title: 'Contact Email',
						type: 'text',
						validator: 'Email'
					}]
				}, {
					fields: [{
						id: prefix + '_speaker',
						title: 'Speaker',
						type: 'text'
					}]
				}, {
					fields: [{
						id: prefix + '_speakerInfo',
						title: 'Speaker Info',
						type: 'textarea'
					}]
				}]
			}]
		});
		this.form.render('.' + this.className + ' .formWrapper');
	}

	show(options) {
		super.show(options);

		if (options) {
			if (options.isNew) {
				this.title = 'Add Event';

				const _this = this;
				this.actionMenuItems = [{
					label: 'Close',
					action: function() {}
				}, {
					label: 'Save',
					action: function() {}
				}];
			}
		}
	}
}
