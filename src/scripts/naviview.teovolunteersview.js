/* exported TEOVolunteersView */
/* global NaviView Mustache DataTablesODataBridge CotSession moment baseEntityUrl */

class TEOVolunteersView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Volunteers';

		// this.search = {
		// 	action: function(searchText, searchTextbox) {}
		// };

		this.actionMenuItems = [{
			label: 'Reload',
			action: () => {
				this.action_reload();
			}
		}, {
			label: 'Add Volunteer',
			action: () => {
				this.action_newVolunteer();
			}
		}, {
			separator: true
		}, {
			label: 'Copy',
			action: () => {
				$('.buttons-copy').trigger('click');
			}
		}, {
			label: 'Print',
			action: () => {
				$('.buttons-print').trigger('click');
			}
		}, {
			separator: true
		}, {
			label: 'Export CSV',
			action: () => {
				$('.buttons-csv').trigger('click');
			}
		}, {
			label: 'Export Excel',
			action: () => {
				$('.buttons-excel').trigger('click');
			}
		}, {
			label: 'Export PDF',
			action: () => {
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
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Volunteer</button>
			</p>
			<div class="oDataTable"><table id="{{id}}" style="width: 100%;"></table></div>
			<p>
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Volunteer</button>
			</p>
		`;
		const data = {
			id: this.className + '_dataTable'
		};
		const html = Mustache.render(templ, data);
		this.$topRegion.html(html);

		this.initOptions.cotLogin.isLoggedIn((result) => {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				this.initOptions.cotLogin.logout();
			} else {
				const $table = $('#' + data.id);
				$table.oDataTable({
					ajax: {
						error: (jqXHR, textStatus, errorThrown) => bootbox.alert(`An error occured. ${errorThrown}`),
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						},
						url: baseEntityUrl + '/Volunteer',
					},
					columns: [
						{
							data: '__CreatedOn',
							title: 'Creation Date',
							default: '',
							render: function(data) {
								return moment(data).isValid() ? moment(data).format('l') : '';
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
							data: 'vPhoneDay',
							title: 'Day Phone',
							default: ''
						}, {
							data: 'vDateApproved',
							title: 'Date Approved',
							default: '',
							render: function(data) {
								return moment(data).isValid() ? moment(data).format('MM/DD/YYYY') : '';
							},
							searchType: 'date'
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
							className: 'action',
							data: 'id',
							title: 'Action',
							render: () => {
								return '<button type="button" class="btn btn-primary">View</button>'
							},
							orderable: false,
							searchable: false
						}
					],
					dom: `<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'table-responsive'<'col-sm-12'tr>>><'row'<'col-sm-5'i><'col-sm-7'p>>B`,
					lengthMenu: [10, 25, 50, 75, 100, 500, 1000]
				});
				this.dt = $table.DataTable();

				$('#' + this.className + '_dataTable tbody', this.$topRegion)
					.on('click', (e) => {
						if ($(e.target).is('.btn')) {
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
		$('.btn-add', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_newVolunteer();
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
