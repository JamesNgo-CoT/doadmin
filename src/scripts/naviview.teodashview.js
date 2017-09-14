/* exported TEODashView */
/* global NaviView Mustache DataTablesODataBridge moment */

class TEODashView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Dashboard';

		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = null;
		this.inDynamicMenu = false;

		this.render();
	}

	render() {
		super.render();

		const template = `
			<div id="section0" class="panel panel-info">
				<div class="panel-heading">
					<h3>Applications To Be Verified</h3>
				</div>
				<div class="panel-body">
					<div class="row">
					<div class="col-xs-12">
						<p>
							<button type="button" class="btn btn-default btn-reload">Reload</button>
						</p>

						<table id="{{datatableId}}" style="width: 100%;"></table>

						<p>
							<button type="button" class="btn btn-default btn-reload">Reload</button>
						</p>
					</div>
					</div>
				</div>
			</div>
		`;
		const data = {
			datatableId: this.className + '_dt'
		};
		const html = Mustache.render(template, data);
		this.$topRegion.empty().html(html);

		const bridge = new DataTablesODataBridge();

		this.dt = $('#' + data.datatableId).DataTable({
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
					data: '__CreatedOn',
					title: 'Date',
					default: '',
					render: function(data) { //}, type, row, meta) {
						return moment(data).utc().calendar();
					}
								}, {
					data: 'vLName',
					title: 'Last Name',
					default: ''
				}, {
					data: 'vFName',
					title: 'First Name',
					default: ''

				}, {
					data: 'vStatus',
					title: 'Volunteer Status',
					default: ''
				}, {
					data: 'vAppStatus',
					title: 'Application Status',
					default: ''

				}, {
					data: 'vPhoneDay',
					title: 'Day Phone',
					default: ''
				}, {
					data: 'vEmail',
					title: 'Email',
					default: ''
				}, {
					data: 'id',
					title: 'Action',
					render: function() {
						return '<button type="button" class="btn btn-default">Update</button>'
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
				url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=__Status ne \'DEL\' and (vAppStatus eq \'New\' or vAppStatus eq null)',
				data: bridge.data(),
				dataFilter: bridge.dataFilter()
			}
		});

		const _this = this;

		$('.btn-reload').on('click', function(e) {
			e.preventDefault();
			_this.action_reload();
		});

		$('#' + data.datatableId + ' tbody').on('click', function(e) {
			if ($(e.target).is('.btn')) {
				e.preventDefault();
				const data = _this.dt.row($(e.target).closest('tr')).data();
				const sourceKey = _this.initOptions.formView;
				const showOptions = {
					operation: 'update',
					id: data.id,
					returnView: _this
				};
				const instanceKey = null;
				const autoInstanceKey = true;
				_this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
			}
		});
	}

	show(options) {
		super.show(options);
		if (options && options.operation == 'reload') {
			this.action_reload();
		}
	}

	action_reload() {
		if (this.dt) {
			this.dt.ajax.reload(null, false);
		}
	}
}
