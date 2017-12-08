/* exported TEOVolunteersView */
/* global NaviView Mustache DataTablesODataBridge CotSession moment */

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

		this.initOptions.cotLogin.isLoggedIn((result) => {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				this.initOptions.cotLogin.logout();
			} else {
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
							data: '__CreatedOn',
							title: 'Creation Date',
							default: '',
							render: function(data) {
								return moment(data).isValid() ? moment(data).format('MM/DD/YYYY') : '';
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
							data: 'vPhoneDay',
							title: 'Day Phone',
							default: ''
						}, {
							data: 'vDateApproved',
							title: 'Date Approved',
							default: '',
							render: function(data) {
								return moment(data).isValid() ? moment(data).format('MM/DD/YYYY') : '';
							}
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
							render: () => {
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
						dataFilter: this.bridge.dataFilter(),
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						}
					}
				});
				$('#' + this.className + '_dataTable tbody').on('click', (e) => {
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
				});
			}
		}, true);

		$('.btn-reload').on('click', (e) => {
			e.preventDefault();
			this.action_reload();
		});
		$('.btn-add').on('click', (e) => {
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
