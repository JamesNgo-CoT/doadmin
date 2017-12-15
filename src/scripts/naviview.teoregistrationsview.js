/* exported TEORegistrationsView */
/* global NaviView DataTablesODataBridge Mustache CotSession moment baseEntityUrl */

class TEORegistrationsView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Registrations';
		this.search = null;
		this.actionMenuItems = [{
			label: 'Reload Data',
			action: () => {
				this.action_reload();
			}
		}, {
			label: 'New Registration',
			action: () => {
				this.action_newRegistration();
			}
		}, {
			label: 'Copy',
			action: () => {
				$('.buttons-copy', this.$topRegion).trigger('click');
			}
		}, {
			label: 'Export CSV',
			action: () => {
				$('.buttons-csv', this.$topRegion).trigger('click');
			}
		}, {
			label: 'Export Excel',
			action: () => {
				$('.buttons-excel', this.$topRegion).trigger('click');
			}
		}, {
			label: 'Export PDF',
			action: () => {
				$('.buttons-pdf', this.$topRegion).trigger('click');
			}
		}, {
			label: 'Print',
			action: () => {
				$('.buttons-print', this.$topRegion).trigger('click');
			}
		}];
		this.inDynamicMenu = false;

		this.bridge = new DataTablesODataBridge();

		this.render();
	}

	render() {
		super.render();

		// HTML.
		const templ = `
			<p>
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Registration</button>
			</p>
			<table id="{{id}}" style="width: 100%;"></table>
			<p>
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Registration</button>
			</p>
		`;
		const data = {
			id: this.className + '_dataTable'
		};
		const html = Mustache.render(templ, data);
		this.$topRegion.html(html);

		// HTML Eventhandlers.
		$('.btn-reload', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_reload();
		});
		$('.btn-add', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_newRegistration();
		});
		this.initOptions.cotLogin.isLoggedIn((result) => {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				this.initOptions.cotLogin.logout();
			} else {
				const $table = $('#' + data.id);
				$table.oDataTable({
					ajax: {
						error: (jqXHR, textStatus, errorThrown) => bootbox.alert(`An error occured. ${errorThrown}`),
						url: baseEntityUrl + '/Registration',
						headers: {
							'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
						}
					},
					columns: [{
						data: 'eKey',
						title: 'Event ID',
						default: '',
						visible: false
					}, {
						data: 'eDate',
						title: 'Event Date',
						default: '',
						render: function(data) {
							return moment(data).isValid() ? moment(data).format('l') : '';
						},
						searchType: 'date'
					}, {
						data: 'rEName',
						title: 'Event Name',
						default: ''
					}, {
						data: 'rELocation',
						title: 'Event Location',
						default: '',
						visible: false
					}, {
						data: 'rEType',
						title: 'Event Type',
						default: '',
						searchChoices: ['', 'Training', 'Outreach', 'Special Event']
					}, {
						data: 'rEHours',
						title: 'Event Hours',
						default: ''
					}, {
						data: 'vLName',
						title: 'Volunteer',
						default: '',
						render: function(data, type, row) {
							return row.vLName + ', ' + row.vFName;
						}
					}, {
						data: 'vLName',
						title: 'Volunteer Last Name',
						default: '',
						visible: false
					}, {
						data: 'vFName',
						title: 'Volunteer First Name',
						default: '',
						visible: false
					}, {
						data: 'vEmail',
						title: 'Volunteer Email',
						default: ''
					}, {
						data: 'vPhoneCell',
						title: 'Volunteer Phone',
						default: '',
						visible: false
					}, {
						className: 'action',
						data: 'id',
						title: 'Action',
						render: function() {
							return '<button type="button" class="btn btn-primary">View</button>'
						},
						orderable: false,
						searchable: false
					}],
					dom: `<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'table-responsive'<'col-sm-12'tr>>><'row'<'col-sm-5'i><'col-sm-7'p>>B`,
					lengthMenu: [10, 25, 50, 75, 100, 500, 1000]
				});

				this.dt = $table.DataTable();

				$('#' + this.className + '_dataTable tbody')
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
		const instanceKey = 'add';
		const autoInstanceKey = false;
		this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
	}
}
