/* exported TEORegistrationsView */
/* global NaviView DataTablesODataBridge Mustache */

class TEORegistrationsView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		const _this = this;

		this.title = 'Registrations';
		this.search = null;
		this.actionMenuItems = [{
			label: 'Reload Data',
			action: function() {
				_this.action_reload();
			}
		}, {
			label: 'New Registration',
			action: function() {
				_this.action_newRegistration();
			}
		}, {
			label: 'Copy',
			action: function() {
				$('.buttons-copy').trigger('click');
			}
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
		}, {
			label: 'Print',
			action: function() {
				$('.buttons-print').trigger('click');
			}
		}];
		this.inDynamicMenu = false;

		this.bridge = new DataTablesODataBridge();

		this.render();
	}

	render() {
		super.render();

		const _this = this;

		// HTML.
		const templ = `
			<p>
				<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-default btn-add" style="margin: 0;">Add Registration</button>
			</p>

			<table id="{{id}}" style="width: 100%;"></table>

			<p>
				<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-default btn-add" style="margin: 0;">Add Registration</button>
			</p>
		`;
		const data = {
			id: this.className + '_dataTable'
		};
		const html = Mustache.render(templ, data);
		this.$topRegion.html(html);

		// HTML Eventhandlers.
		$('.btn-reload', this.$topRegion).on('click', function(e) {
			e.preventDefault();
			_this.action_reload();
		});
		$('.btn-add', this.$topRegion).on('click', function(e) {
			e.preventDefault();
			_this.action_newRegistration();
		});

		this.dt = $('#' + data.id).DataTable({
			dom: '<\'row\'<\'col-sm-6\'l><\'col-sm-6\'f>>' + '<\'row\'<\'col-sm-12\'tr>>' + '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>B',
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
			columns: [
			// {
			// 	data: 'id',
			// 	checkboxes: {
			// 		'selectRow': true
			// 	},
			// 	orderable: false
			// },
			{
				data: 'rEName',
				title: 'Event Name',
				default: ''
			}, {
				data: 'rETypeOf',
				title: 'Event Type',
				default: ''
			}, {
				data: 'rEDate',
				title: 'Event Date',
				default: ''
			}, {
				data: 'vLName',
				title: 'Volunteer',
				default: '',
				render: function(data, type, row) {
					return row.vLName + ', ' + row.vFName;
				}
			}, {
				data: 'vFName',
				title: 'First Name',
				default: '',
				visible: false
			}, {
				data: 'id',
				title: 'Action',
				render: function() {
					return '<button type="button" class="btn btn-default">View</button>'
				}
			}],
			// order: [
			// 	[2, "asc"]
			// ],
			// 'select': {
			// 	'style': 'multi'
			// },
			"serverSide": true,
			ajax: {
				url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration?$format=application/json&$filter=__Status ne \'DEL\'',
				data: this.bridge.data(),
				dataFilter: this.bridge.dataFilter()
			}
		});

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
	}

	show(showOpts) {
		super.show(showOpts);
		this.showOpts = showOpts || {};
		if (this.showOpts.reload) {
			this.action_reload();
		}
	}

	action_reload() {
		if (this.dt) {
			this.dt.ajax.reload(null, false);
		}
	}

	action_newRegistration() {
		const sourceKey = this.initOptions.formView;
		const showOptions = {
			operation: 'new',
			returnView: this
		};
		const instanceKey = null;
		const autoInstanceKey = true;
		this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
	}
}
