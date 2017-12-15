/* exported TEOEventsView */
/* global NaviView Mustache moment baseEntityUrl */

class TEOEventsView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		// const _this = this;

		this.title = 'Events';
		this.search = null;
		this.actionMenuItems = [{
			label: 'Reload Data',
			action: () => {
				this.action_reload();
			}
		}, {
			label: 'New Event',
			action: () => {
				this.action_newEvent();
			}
		}, {
			separator: true
		}, {
			label: 'Copy',
			action: () => {
				$('.buttons-copy', $(`.${this.className}.top`)).trigger('click');
			}
		}, {
			label: 'Print',
			action: () => {
				$('.buttons-print', $(`.${this.className}.top`)).trigger('click');
			}
		}, {
			separator: true
		}, {
			label: 'Export CSV',
			action: () => {
				$('.buttons-csv', $(`.${this.className}.top`)).trigger('click');
			}
		}, {
			label: 'Export Excel',
			action: () => {
				$('.buttons-excel', $(`.${this.className}.top`)).trigger('click');
			}
		}, {
			label: 'Export PDF',
			action: () => {
				$('.buttons-pdf', $(`.${this.className}.top`)).trigger('click');
			}
		}];
		this.inDynamicMenu = false;

		// this.bridge = new DataTablesODataBridge();

		this.render();
	}

	render() {
		super.render();

		const _this = this;

		// HTML.
		const templ = `
			<p>
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Event</button>
			</p>

			<div class="oDataTable"><table id="{{id}}" style="width: 100%;"></table></div>

			<p>
				<button type="button" class="btn btn-primary btn-reload" style="margin: 0;">Reload</button>
				<button type="button" class="btn btn-primary btn-add" style="margin: 0;">Add Event</button>
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
			_this.action_newEvent();
		});

		const $table = $('#' + data.id);
		$table.oDataTable({
			ajax: {
				error: (jqXHR, textStatus, errorThrown) => bootbox.alert(`An error occured. ${errorThrown}`),
				headers: {
					'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
				},
				url: baseEntityUrl + '/Event'
			},
			columns: [{
				class: 'noMaxWidth',
				data: 'eName',
				title: 'Event Name',
				default: ''
			}, {
				data: 'eTypeOf',
				title: 'Event Type',
				default: '',
				searchChoices: ['', 'Training', 'Outreach', 'Special Event']
			}, {
				data: 'eDate',
				title: 'Event Date',
				default: '',
				render: function(data) {
					return moment(data).isValid() ? moment(data).format('l') : '';
				},
				searchType: 'date'
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
			.on('click', function(e) {
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

	action_newEvent() {
		const sourceKey = this.initOptions.formView;
		const showOptions = {
			operation: 'new',
			returnView: this
		};
		const instanceKey = 'add';
		const autoInstanceKey = null;
		this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
	}
}
