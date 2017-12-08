/* exported TEODashView */
/* global NaviView Mustache DataTablesODataBridge moment CotSession */

class TEODashView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Dashboard';
		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = [{
			label: 'Reload Data',
			action: () => {
				this.action_reload();
			}
		}];
		this.inDynamicMenu = false;

		//this.bridge = new DataTablesODataBridge();

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
						<p><button type="button" class="btn btn-default btn-reload">Reload</button></p>
						<div class="oDataTable"><table id="{{datatableId}}" style="width: 100%;"></table></div>
						<p><button type="button" class="btn btn-default btn-reload">Reload</button></p>
					</div>
					</div>
				</div>
			</div>
		`;
		const dtId = this.className + '_dt';
		this.$topRegion.empty().html(Mustache.render(template, {
			datatableId: dtId
		}));

		const bridge = new DataTablesODataBridge();
		this.initOptions.cotLogin.isLoggedIn((result) => {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				this.initOptions.cotLogin.logout();
			} else {
				this.dt = $('#' + dtId).DataTable({
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
							render: (data) => { //}, type, row, meta) {
								return moment(data).isValid() ? moment(data).utc().calendar() : '';
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
							render: () => {
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
						// url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=__Status ne \'DEL\'',
						data: bridge.data(),
						dataFilter: bridge.dataFilter(),
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						}
					}

				});
				/*
				const $table = $('#' + dtId);
				$table.oDataTable({
					ajax: {
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						},
						// url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=__Status ne \'DEL\' and (vAppStatus eq \'New\' or vAppStatus eq null)'
						url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json'
					},
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
							render: (data) => { //}, type, row, meta) {
								return moment(data).isValid() ? moment(data).utc().calendar() : '';
							},
							searchType: 'date'
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
							render: () => {
								return '<button type="button" class="btn btn-default">Update</button>'
							},
							searchable: false
						}
					],
					// topLevelFilter: '__Status ne \'DEL\' and (vAppStatus eq \'New\' or vAppStatus eq null)'
				});
				this.dt = $table.dataTable();
				*/
				$('#' + dtId + ' tbody').on('click', (e) => {
					if ($(e.target).is('.btn')) {
						e.preventDefault();
						const data = this.dt.row($(e.target).closest('tr')).data();
						const sourceKey = this.initOptions.formView;
						const showOptions = {
							operation: 'update',
							id: data.id,
							returnView: this
						};
						const instanceKey = null;
						const autoInstanceKey = true;
						this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
					}
				});
			}
		}, true);

		$('.btn-reload').on('click', (e) => {
			e.preventDefault();
			this.action_reload();
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
