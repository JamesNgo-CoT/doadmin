/* exported TEODashView */
/* global NaviView Mustache moment CotSession baseEntityUrl */

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

		this.render();
	}

	render() {
		super.render();

		const template = `
			<p><button type="button" class="btn btn-primary btn-reload">Reload</button></p>
			<div class="oDataTable"><table id="{{datatableId}}" style="width: 100%;"></table></div>
			<p><button type="button" class="btn btn-primary btn-reload">Reload</button></p>
		`;
		const dtId = this.className + '_dt';
		this.$topRegion.empty().html(Mustache.render(template, {
			datatableId: dtId
		}));


		// const bridge = new DataTablesODataBridge();
		this.initOptions.cotLogin.isLoggedIn((result) => {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				this.initOptions.cotLogin.logout();
			} else {
				const $table = $('#' + dtId);
				$table.oDataTable({
					ajax: {
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						},
						url: baseEntityUrl + '/Volunteer'
					},
					columns: [{
						data: '__CreatedOn',
						title: 'Date',
						default: '',
						render: (data) => {
							return moment(data).isValid() ? moment(data).utc().calendar() : '';
						},
						searchType: 'date'
					}, {
						data: 'vLName',
						title: 'Last Name',
						default: '',
						sortOrder: 'asc'
					}, {
						data: 'vFName',
						title: 'First Name',
						default: ''

					}, {
						data: 'vStatus',
						title: 'Volunteer Status',
						default: '',
						searchChoices: ['', 'Active', 'Unsubscribed', 'Duplicate']
					}, {
						data: 'vAppStatus',
						title: 'Application Status',
						default: '',
						searchChoices: ['', 'New', 'Approved', 'Archived']

					}, {
						data: 'vPhoneDay',
						title: 'Day Phone',
						default: ''
					}, {
						data: 'vEmail',
						title: 'Email',
						default: ''
					}, {
						className: 'action',
						data: 'id',
						title: 'Action',
						render: () => {
							return '<button type="button" class="btn btn-primary">View</button>'
						},
						orderable: false,
						searchable: false
					}],
					dom: `<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'table-responsive'<'col-sm-12'tr>>><'row'<'col-sm-5'i><'col-sm-7'p>>B`,
					lengthMenu: [10, 25, 50, 75, 100, 500, 1000]
				});
				this.dt = $table.DataTable();

				$('#' + dtId + ' tbody', this.$topRegion)
					.on('click', (e) => {
						if ($(e.target).is('.btn')) {
							e.preventDefault();
							const data = this.dt.row($(e.target).closest('tr')).data();
							const sourceKey = this.initOptions.formView;
							const showOptions = {
								operation: 'view',
								id: data.id,
								returnView: this
							};
							const instanceKey = null;
							const autoInstanceKey = true;
							this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
						}
					})
					.on('dblclick', (e) => {
						e.preventDefault();
						var data = this.dt.row($(e.target).closest('tr')).data();
						const sourceKey = this.initOptions.formView;
						const showOptions = {
							operation: 'view',
							id: data.id,
							returnView: this
						};
						const instanceKey = null;
						const autoInstanceKey = true;
						this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
					});
			}
		}, true);

		$('.btn-reload', this.$topRegion).on('click', (e) => {
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
