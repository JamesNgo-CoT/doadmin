class TEOVolunteersView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Volunteers';

		this.search = { action: function(searchText, searchTextbox) {} };

		const _this = this;

		this.actionMenuItems = [{
			label: 'Reload Data',
			action: function() {}
		}, {
			label: 'New Volunteer',
			action: function() {
				const sourceKey = _this.initOptions.formView;
				const showOptions = { operation: 'new' };
				const instanceKey = 'add';
				const autoInstanceKey = null;
				_this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
			}
		}];

		this.render();
	}

	render() {
		super.render();

		const templ = '<table id="{{id}}" style="width: 100%;"></table>';
		const data = { id: this.className + '_dataTable' };
		const html = Mustache.render(templ, data);
		this.$topRegion.html(html);

		$('#' + data.id).dataTable({
			columns: [{
				data: 'id',
				title: 'Select',
				render: function(data, type, row, meta) {
					return '<input class="selection" type="checkbox">';
				}
			}, {
				data: 'lastName',
				title: 'Last Name'
			}, {
				data: 'firstName',
				title: 'First Name'
			}, {
				data: 'lastName',
				title: 'Last Name'
			}, {
				data: 'dayPhone',
				title: 'Day Phone'
			}, {
				data: 'lastName',
				title: 'Last Name'
			}, {
				data: 'lastName',
				title: 'Last Name'
			}, {
				data: 'lastName',
				title: 'Last Name'
			}],
			data: [{
				id: 'ID',
				lastName: 'Last Name',
				firstName: 'First Name',
				dayPhone: 'Day Phone',
				dateApproved: 'Date Approved',
				status: 'Status',
				email: 'Email',
				languages: 'Languages'
			}]
		});
	}
}
