/* exported TEOVolunteersView */
/* global NaviView Mustache DataTablesODataBridge */

class TEOVolunteersView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Volunteers';

		// this.search = {
		// 	action: function(searchText, searchTextbox) {}
		// };

		const _this = this;

		this.actionMenuItems = [{
			label: 'Reload',
			action: function() {
				_this.action_reload();
			}
		}, {
			label: 'Add Volunteer',
			action: function() {
				_this.action_newVolunteer();
			}
		}, {
			separator: true
		}, {
			label: 'Copy',
			action: function() {
				$('.buttons-copy').trigger('click');
			}
		}, {
			label: 'Print',
			action: function() {
				$('.buttons-print').trigger('click');
			}
		}, {
			separator: true
		}, {
			label: 'Export CSV',
			action: function() {
				$('.buttons-csv').trigger('click');
			}
		}, {
			label: 'Export Excel',
			action: function() {
				$('.buttons-excel').trigger('click');
			}
		}, {
			label: 'Export PDF',
			action: function() {
				$('.buttons-pdf').trigger('click');
			}
		}];

		this.inDynamicMenu = false;

		this.bridge = new DataTablesODataBridge();

		this.render();
	}

	render() {
		super.render();

		const templ = `
			<p>
				<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-default btn-add" style="margin: 0;">Add Volunteer</button>
			</p>

			<table id="{{id}}" style="width: 100%;"></table>

			<p>
				<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-default btn-add" style="margin: 0;">Add Volunteer</button>
			</p>
		`;
		const data = {
			id: this.className + '_dataTable'
		};
		const html = Mustache.render(templ, data);
		this.$topRegion.html(html);

		this.dt = $('#' + data.id).DataTable({
			// dom: 'lfrtipB',
			dom: '<\'row\'<\'col-sm-6\'l><\'col-sm-6\'f>>' + '<\'row\'<\'col-sm-12\'tr>>' + '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>B',
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
			columns: [
				// 	{
				// 	data: 'id',
				// 	'checkboxes': {
				// 		'selectRow': true
				// 	},
				// 	orderable: false
				// },
				{
					data: 'vLName',
					title: 'Last Name',
					default: ''
				}, {
					data: 'vFName',
					title: 'First Name',
					default: ''
				}, {
					data: 'vPhoneDay',
					title: 'Day Phone',
					default: ''
				}, {
					data: 'vDateApproved',
					title: 'Date Approved',
					default: ''
				}, {
					data: 'vStatus',
					title: 'Status',
					default: ''
				}, {
					data: 'vEmail',
					title: 'Email',
					default: ''
				}, {
					data: 'vLang',
					title: 'Languages',
					default: ''
				}, {
					data: 'id',
					title: 'Action',
					render: function() {
						return '<button type="button" class="btn btn-default">View</button>'
					}
				}
			],
			// order: [
			// 	[2, "asc"]
			// ],
			// select: {
			// 	'style': 'multi'
			// },
			serverSide: true,
			scrollX: true,
			ajax: {
				url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=__Status ne \'DEL\'',
				data: this.bridge.data(),
				dataFilter: this.bridge.dataFilter()
			}
		});

		const _this = this;
		$('#' + this.className + '_dataTable tbody').on('click', function(e) {
			if ($(e.target).is('.btn')) {
				e.preventDefault();
				var data = _this.dt.row($(e.target).closest('tr')).data();
				const sourceKey = _this.initOptions.formView;
				const showOptions = {
					operation: 'view',
					id: data.id,
					returnView: _this
				};
				const instanceKey = null;
				const autoInstanceKey = true;
				_this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
			}
		});
		$('.btn-reload').on('click', function(e) {
			e.preventDefault();
			_this.action_reload();
		});
		$('.btn-add').on('click', function(e) {
			e.preventDefault();
			_this.action_newVolunteer();
		});
	}

	action_reload() {
		if (this.dt) {
			this.dt.ajax.reload(null, false);
		}
	}

	action_newVolunteer() {
		const sourceKey = this.initOptions.formView;
		const showOptions = {
			operation: 'new',
			returnView: this
		};
		const instanceKey = 'add';
		const autoInstanceKey = null;
		this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
	}

	show(options) {
		super.show(options);
		if (options && options.operation == 'reload') {
			this.action_reload();
		}
	}
}
