/* exported TEOEventFormView */
/* global NaviView CotForm2 moment DataTablesODataBridge */

class TEOEventFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Event';
		this.search = null
		this.actionMenuItems = null;

		const _this = this;
		this.formDef = {
			id: this.className + '_eForm',
			rootPath: '',
			success: function(e) {
				e.preventDefault();
				_this.action_submit();
				return false;
			},
			useBinding: true,
			sections: [{
				title: 'Event Details',
				className: 'panel-info',
				rows: [{
					fields: [{
						id: this.className + '_eTypeOf',
						title: 'Type of Event',
						required: true,
						type: 'radio',
						choices: [{
							text: 'Training'
						}, {
							text: 'Outreach'
						}, {
							text: 'Special Event'
						}],
						orientation: 'horizontal',
						bindTo: 'eTypeOf'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eDate',
						title: 'Date',
						required: true,
						type: 'datetimepicker',
						bindTo: 'eDate'
						// }]
					}, {
						// fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eTimeStart',
						title: 'Start Time',
						required: true,
						type: 'text',
						bindTo: 'eTimeStart'
						// }]
					}, {
						// fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eTimeEnd',
						title: 'End Time',
						required: true,
						type: 'text',
						bindTo: 'eTimeEnd'
					}]
				}, {
					fields: [{
						id: this.className + '_eName',
						title: 'Event Name',
						required: true,
						type: 'text',
						bindTo: 'eName'
					}]
				}, {
					fields: [{
						id: this.className + '_eLocation',
						title: 'Location',
						type: 'text',
						bindTo: 'eLocation'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eContName',
						title: 'Contact Name',
						type: 'text',
						bindTo: 'eContName'
						// }]
					}, {
						// fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eContPhone',
						title: 'Contact Phone',
						type: 'text',
						validationtype: 'Phone',
						bindTo: 'eContPhone'
						// }]
					}, {
						// fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_eContEmail',
						title: 'Contact Email',
						type: 'text',
						validationtype: 'Email',
						bindTo: 'eContEmail'
					}]
				}, {
					fields: [{
						id: this.className + '_eSpeakerName',
						title: 'Speaker',
						type: 'text',
						bindTo: 'eSpeakerName'
					}]
				}, {
					fields: [{
						id: this.className + '_eSpeakerInfo',
						title: 'Speaker Info',
						type: 'textarea',
						rows: 5,
						bindTo: 'eSpeakerInfo'
					}]
				}, {
					fields: [{
						id: this.className + '_eHours',
						title: 'Hours Credit',
						type: 'dropdown',
						choices: [{
							text: '0'
						}, {
							text: '1'
						}, {
							text: '2'
						}, {
							text: '3'
						}, {
							text: '4'
						}, {
							text: '5'
						}, {
							text: '6'
						}, {
							text: '7'
						}, {
							text: '8'
						}, {
							text: '9'
						}, {
							text: '10'
						}],
						bindTo: 'eHours'
					}]
				}, {
					fields: [{
						id: this.className + '_eState',
						title: 'State',
						type: 'radio',
						choices: [{
							text: 'New'
						}, {
							text: 'Approved'
						}],
						orientation: 'horizontal',
						bindTo: 'eState'
					}]
				}, {
					fields: [{
						id: this.className + '_eNotes',
						title: 'Staff Notes',
						type: 'textarea',
						rows: 5,
						bindTo: 'eNotes'
					}]
				}]
			}, {
				title: 'Event Registrations',
				className: 'panel-info',
			}]
		};

		this.render();
	}

	render() {
		super.render();
	}

	show_newEvent() { // (showOpts) {
		this.title = 'Add Event';

		this.$topRegion.empty().html(`
			<p>
				<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
				<button type="button" class="btn btn-default btn-save" style="margin: 0;">Create</button>
			</p>

			<div class="` + this.className + `_formWrapper"></div>

			<p>
				<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
				<button type="button" class="btn btn-default btn-save" style="margin: 0;">Create</button>
			</p>
		`);

		const _this = this;
		$('.btn-cancel', this.$topRegion).on('click', function(e) {
			e.preventDefault();
			_this.navi.openView(_this.returnView, {
				operation: 'reload'
			});
			_this.navi.closeView(_this);
		});
		$('.btn-save', this.$topRegion).on('click', function(e) {
			e.preventDefault();
			$('#' + _this.className + '_eForm').trigger('submit');
		});

		let model = new CotModel({});
		this.formDef.success = function(e) {
			e.preventDefault();
			_this.action_submit(model);
			return false;
		}
		this.form = new CotForm2(this.formDef);
		this.form.render('.' + this.className + '_formWrapper');
		this.form.setModel(model);

		const $wrapper = $('.' + this.className + '_formWrapper', this.$topRegion);
		$('.panel.collapsable .panel-heading', $wrapper).append('<span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>');
		$('.panel.collapsable .panel-heading span.clickable', $wrapper).on('click', function() { // (e) {
			var $this = $(this);
			if (!$this.hasClass('panel-collapsed')) {
				$this.parents('.panel').find('.panel-body').slideUp();
				$this.addClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			} else {
				$this.parents('.panel').find('.panel-body').slideDown();
				$this.removeClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			}
		});
	}

	show_updateEvent(showOpts) {
		const _this = this;

		function renderUpdateVolunteer(model) {
			let originalData = model.toJSON();

			_this.id = model.get('id');
			_this.title = model.get('eName');
			_this.$topRegion.empty().html(`
				<p>
					<button type="button" class="btn btn-default btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
				</p>

				<div class="` + _this.className + `_formWrapper"></div>

				<p>
					<button type="button" class="btn btn-default btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
				</p>
			`);

			$('.btn-done', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.show({
					operation: 'view',
					data: originalData,
					returnView: _this.returnView
				});
				_this.navi.render();
			});
			$('.btn-save', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				$('#' + _this.className + '_eForm').trigger('submit');
			});

			_this.formDef.success = function(e) {
				e.preventDefault();
				_this.action_submit(model);
				originalData = model.toJSON();
				return false;
			}
			_this.form = new CotForm2(_this.formDef);
			_this.form.render('.' + _this.className + '_formWrapper');
			_this.form.setModel(model);
		}

		if (showOpts.data) {
			renderUpdateVolunteer(new CotModel(showOpts.data));
		} else if (showOpts.id) {
			this.getRecord(showOpts.id, function(data) {
				renderUpdateVolunteer(new CotModel(data));
			});
		} else {
			this.show({
				operation: 'new',
				returnView: this.returnView
			})
			this.navi.render();
		}
	}

	show_viewEvent(showOpts) {
		const _this = this;

		function renderViewVolunteer(model) {
			const previewFormDef = $.extend(true, {}, _this.formDef);
			previewFormDef.useBinding = false;
			for (var i1 = 0, l1 = previewFormDef.sections.length; i1 < l1; i1++) {
				if (!previewFormDef.sections[i1].rows) {
					continue;
				}
				for (var i2 = 0, l2 = previewFormDef.sections[i1].rows.length; i2 < l2; i2++) {
					if (!previewFormDef.sections[i1].rows[i2].fields) {
						continue;
					}
					for (var i3 = 0, l3 = previewFormDef.sections[i1].rows[i2].fields.length; i3 < l3; i3++) {
						const id = previewFormDef.sections[i1].rows[i2].fields[i3].id.replace(_this.className + '_', '');
						previewFormDef.sections[i1].rows[i2].fields[i3].type = 'static';
						previewFormDef.sections[i1].rows[i2].fields[i3].bindTo = null;
						previewFormDef.sections[i1].rows[i2].fields[i3].value = model.get(id) || '-'; //model.get(previewFormDef.sections[i1].rows[i2].fields[i3].id);
					}
				}
			}

			_this.id = model.get('id');
			_this.title = model.get('eName');
			_this.$topRegion.empty().html(`
				<p><button type="button" class="btn btn-default btn-close" style="margin: 0;">Close</button> <button type="button" class="btn btn-default btn-save" style="margin: 0;">Update</button> <button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button></p>
				<div class="` + _this.className + `_formWrapper"></div>
				<p><button type="button" class="btn btn-default btn-close" style="margin: 0;">Close</button> <button type="button" class="btn btn-default btn-save" style="margin: 0;">Update</button> <button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button></p>

				<div id="volunteerSection" class="panel panel-info">
					<div class="panel-heading">
						<h3>Volunteer Registration</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-xs-12">
								<table id="` + _this.className + `_dt" style="width: 100%;"></table>
								<p><button type="button" class="btn btn-default btn-register">Register</button></p>
							</div>
						</div>
					</div>
				</div>
			`);

			$('.btn-close', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.navi.openView(_this.returnView, {
					operation: 'reload'
				});
				_this.navi.closeView(_this);
			});
			$('.btn-save', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.show({
					operation: 'update',
					returnView: _this.returnView,
					data: model.toJSON()
				})
				_this.navi.render();
			});

			_this.form = new CotForm2(previewFormDef);
			_this.form.render('.' + _this.className + '_formWrapper');
			// _this.form.setModel(model);

			// DATATABLE
			const bridge = new DataTablesODataBridge();
			_this.dt = $('#' + _this.className + '_dt').DataTable({
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
					data: 'vLName',
					title: 'Last Name',
					default: '',
					visible: false
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
					url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration?$format=application/json&$filter=__Status ne \'DEL\' and rEId eq \'' + model.get('id') + '\'',
					data: bridge.data(),
					dataFilter: bridge.dataFilter()
				}
			});
			$('#' + _this.className + '_dt tbody').on('click', function(e) {
				if ($(e.target).is('.btn')) {
					e.preventDefault();
					var data = _this.dt.row($(e.target).closest('tr')).data();
					const sourceKey = _this.initOptions.registrationForm;
					const showOptions = {
						id: data.id,
						returnView: _this
					};
					const instanceKey = null;
					const autoInstanceKey = true;
					_this.navi.openView(sourceKey, showOptions, instanceKey, autoInstanceKey);
				}
			});
			$('.btn-register', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.navi.openView(_this.initOptions.registrationForm, { returnView: _this, eventData: model.toJSON() }, null, true);
			})
		}

		if (showOpts.data) {
			renderViewVolunteer(new CotModel(showOpts.data));
		} else if (showOpts.id) {
			this.getRecord(showOpts.id, function(data) {
				renderViewVolunteer(new CotModel(data));
				_this.navi.render();
			});
		} else {
			const showOptions = {
				operation: 'new',
				returnView: this.returnView
			};
			const instanceKey = 'add';
			const autoInstanceKey = null;
			this.navi.openView(this.sourceKey, showOptions, instanceKey, autoInstanceKey);
		}
	}

	show(options) {
		super.show(options);

		if (options) {
			if (options.returnView) {
				this.returnView = options.returnView;
			}

			if (options.reload && this.dt) {
				this.dt.ajax.reload(null, false);
			}

			if (options.operation) {
				switch (options.operation) {
					case 'new':
						this.show_newEvent(options);
						break;
					case 'view':
						this.show_viewEvent(options);
						break;
					case 'update':
						this.show_updateEvent(options);
						break;
				}
			}
		}
	}

	action_submit(model) {
		if (this.id) {
			this.action_submitPutRecord(model);
		} else {
			this.action_submitPostRecord(model);
		}
	}

	action_submitPutRecord(model) {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event(\'' + this.id + '\')';
		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			complete: function() {
				$(':input').prop('disabled', false);
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(model.toJSON()),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'PUT',
			success: function success() { // (data, textStatus, jqXHR) {
				alert('Event Updated');
			}
		});
	}

	action_submitPostRecord(model) {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event';
		const data = model.toJSON();
		data.eDate = moment(data.eDate).utc().format()
		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			complete: function() {
				$(':input').prop('disabled', false);
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'POST',
			success: function success(data) { // , textStatus, jqXHR) {
				_this.show({
					operation: 'update',
					data: data,
					returnView: _this.returnView
				});
				_this.navi.render();
				window.alert('Event Added');
			}
		});
	}

	getRecord(id, callback) {
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event(\'' + id + '\')';
		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			contentType: 'application/json; charset=utf-8',
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'GET',
			success: function success(data) { // , textStatus, jqXHR) {
				callback(data);
			}
		});
	}
}
