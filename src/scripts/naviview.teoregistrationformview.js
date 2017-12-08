/* exported TEORegistrationFormView */
/* global NaviView DataTablesODataBridge Mustache moment */

class TEORegistrationFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Registration';

		this.search = null
		this.actionMenuItems = null;

		this.render();
	}

	render() {
		super.render();

		const template = `
			<p>
				<span class="btns-new">
					<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
					<button type="button" class="btn btn-default btn-create" style="margin: 0;">Create</button>
				</span>
				<span class="btns-update">
					<button type="button" class="btn btn-default btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
					<button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button>
				</span>
				<span class="btns-preview">
					<button type="button" class="btn btn-default btn-close" style="margin: 0;">Close</button>
					<button type="button" class="btn btn-default btn-update" style="margin: 0;">Update</button>
					<button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button>
				</span>
			</p>

			<div id="eventSection" class="panel panel-info">
				<div class="panel-heading">
					<h3>Event</h3>
				</div>
				<div class="panel-body">
					<div class="row datatable">
						<div class="col-xs-12">
							<table id="{{eventDatatableId}}" style="width: 100%;"></table>
						</div>
					</div>

					<div class="row display"></div>

					<div class="row buttons">
						<div class="col-xs-12 form-group form-group-vertical" style="margin-bottom: 15px;">
							<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
							<button type="button" class="btn btn-default btn-change" style="margin: 0;">Change</button>
						</div>
					</div>
				</div>
			</div>

			<div id="volunteerSection" class="panel panel-info">
				<div class="panel-heading">
					<h3>Volunteer</h3>
				</div>
				<div class="panel-body">
					<div class="row datatable">
						<div class="col-xs-12">
							<table id="{{volunteerDatatableId}}" style="width: 100%;"></table>
						</div>
					</div>

					<div class="row display"></div>

					<div class="row buttons">
						<div class="col-xs-12 form-group form-group-vertical" style="margin-bottom: 15px;">
							<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
							<button type="button" class="btn btn-default btn-change" style="margin: 0;">Change</button>
						</div>
					</div>
				</div>
			</div>

			<p>
				<span class="btns-new">
					<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
					<button type="button" class="btn btn-default btn-create" style="margin: 0;">Create</button>
				</span>
				<span class="btns-update">
					<button type="button" class="btn btn-default btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
					<button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button>
				</span>
				<span class="btns-preview">
					<button type="button" class="btn btn-default btn-close" style="margin: 0;">Close</button>
					<button type="button" class="btn btn-default btn-update" style="margin: 0;">Update</button>
					<button type="button" class="btn btn-default btn-delete" style="margin: 0;">Delete</button>
				</span>
			</p>
		`;

		const data = {
			eventDatatableId: this.className + '_edt',
			volunteerDatatableId: this.className + '_vdt'
		};

		const html = Mustache.render(template, data);

		this.$topRegion.empty().html(html);

		$('.btns-new, .btns-update, .btns-preview, #eventSection .row.datatable, #eventSection .row.display .row, #eventSection .row.buttons, #eventSection .row.buttons .btn-cancel, #eventSection .row.buttons .btn-change, #volunteerSection .row.datatable, #volunteerSection .row.display .row, #volunteerSection .row.buttons, #volunteerSection .row.buttons .btn-cancel, #volunteerSection .row.buttons .btn-change', this.$topRegion).hide();

		$('.btns-new .btn-cancel', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.navi.openView(this.showOpts.returnView, {
				reload: true
			});
			this.navi.closeView(this);
		});

		$('.btns-new .btn-create', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_create();
		});

		$('.btns-update .btn-done', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			// _this.show({ returnView: this.showOpts.returnView, data: this.data, preview: true });
			this.navi.openView(this.showOpts.returnView, {
				reload: true
			});
			this.navi.closeView(this);
		});

		$('.btns-update .btn-save', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_update();
		});

		$('.btns-update .btn-delete', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_delete();
		});

		$('#eventSection .row.buttons .btn-change', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_changeEvent();
		});

		$('#volunteerSection .row.buttons .btn-change', this.$topRegion).on('click', (e) => {
			e.preventDefault();
			this.action_changeVolunteer();
		});

		const eBridge = new DataTablesODataBridge();
		this.edt = $('#' + this.className + '_edt').DataTable({
			columns: [{
				data: 'eDate',
				title: 'Event Date',
				default: '',
				render: function(data) {
					return moment(data).isValid() ? moment(data).format('MM/DD/YYYY') : '';
				}
			}, {
				data: 'eName',
				title: 'Event Name',
				default: ''
			}, {
				data: 'eTypeOf',
				title: 'Event Type',
				default: ''
			}, {
				data: 'id',
				title: 'Action',
				render: () => {
					return '<button type="button" class="btn btn-default">Select</button>'
				}
			}],
			lengthMenu: [5, 10, 20],
			"serverSide": true,
			scrollX: true,
			ajax: {
				url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event?$format=application/json&$filter=__Status ne \'DEL\' and eState eq \'Approved\'',
				data: eBridge.data(),
				dataFilter: eBridge.dataFilter(),
				headers: {
					'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
				}
			}
		});
		$('#' + this.className + '_edt tbody').on('click', (e) => {
			if ($(e.target).is('.btn')) {
				e.preventDefault();
				const eventData = this.edt.row($(e.target).closest('tr')).data();
				this.action_setEvent(eventData);
			}
		});

		const vBridge = new DataTablesODataBridge();
		this.vdt = $('#' + this.className + '_vdt').DataTable({
			columns: [{
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
					return '<button type="button" class="btn btn-default">Select</button>'
				}
			}],
			serverSide: true,
			scrollX: true,
			lengthMenu: [5, 10, 20],
			ajax: {
				url: 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=__Status ne \'DEL\' and (vAppStatus eq \'Approved\' and vStatus eq \'Active\')',
				data: vBridge.data(),
				dataFilter: vBridge.dataFilter(),
				headers: {
					'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
				}
			}
		});
		$('#' + this.className + '_vdt tbody').on('click', (e) => {
			if ($(e.target).is('.btn')) {
				e.preventDefault();
				var volunteerData = this.vdt.row($(e.target).closest('tr')).data();
				this.action_setVolunteer(volunteerData);
			}
		});
	}

	show(showOpts) {
		super.show(showOpts);

		this.showOpts = showOpts || {};

		const _this = this;

		function proceedPreview() {
			// TODO - PREVIEW
		}

		function proceedUpdate() {
			$('.btns-new, .btns-update, .btns-preview, #eventSection .row.datatable, #eventSection .row.buttons, #eventSection .row.buttons .btn-cancel, #eventSection .row.buttons .btn-change, #volunteerSection .row.buttons, #volunteerSection .row.datatable, #volunteerSection .row.buttons .btn-cancel, #volunteerSection .row.buttons .btn-change').hide();
			$('.btns-update').show();

			// const eventId = _this.data.rEId;
			const eventId = _this.data.eKey;
			_this.action_getEventData(eventId, function(eventData) {
				_this.action_setEvent(eventData);
			});

			const volunteerId = _this.data.MainID;
			_this.action_getVolunteerData(volunteerId, function(volunteerData) {
				_this.action_setVolunteer(volunteerData);
			})
		}

		if (this.showOpts.id || this.showOpts.data) {
			// Preview or Update
			if (this.showOpts.preview) {
				// Preview
				this.title = 'Registration';

				if (this.showOpts.id) {
					this.action_getData(this.showOpts.id, proceedPreview);
				} else {
					this.data = this.showOpts.data;
					proceedPreview();
				}
			} else {
				// Update
				this.title = 'Update Registration';

				if (this.showOpts.id) {
					this.action_getData(this.showOpts.id, proceedUpdate);
				} else {
					this.data = this.showOpts.data;
					proceedUpdate();
				}
			}
		} else {
			// New
			this.title = 'New Registration';

			$('.btns-update, .btns-preview, #eventSection .row.buttons, #eventSection .row.buttons .btn-cancel, #eventSection .row.buttons .btn-change, #volunteerSection .row.buttons, #volunteerSection .row.buttons .btn-cancel, #volunteerSection .row.buttons .btn-change').hide();
			$('.btns-new, #eventSection .row.datatable, #volunteerSection .row.datatable').show();

			this.edt.ajax.reload();
			if (showOpts.eventData) {
				this.action_setEvent(showOpts.eventData);
			}

			this.vdt.ajax.reload();
			if (showOpts.volunteerData) {
				this.action_setVolunteer(showOpts.volunteerData);
			}
		}
	}

	action_setEvent(eventData) {
		this.eventData = {
			// rEId: eventData.id
			eKey: eventData.eKey
		};

		for (let k in eventData) {
			if (eventData.hasOwnProperty(k)) {
				if (k != '@odata.etag' && k != 'id' && k.substr(0, 2) !== '__') {
					const k2 = 'r' + k.charAt(0).toUpperCase() + k.slice(1);
					this.eventData[k2] = eventData[k];
				}
			}
		}

		const template = `
			<div class="col-xs-12">
				<div class="row">
					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Event Name</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#rEName}}{{rEName}}{{/rEName}}{{^rEName}}-{{/rEName}}</p>
					</div>

					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Location</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#rELocation}}{{rELocation}}{{/rELocation}}{{^rELocation}}-{{/rELocation}}</p>
					</div>

					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Type</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#rETypeOf}}{{rETypeOf}}{{/rETypeOf}}{{^rETypeOf}}-{{/rETypeOf}}</p>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Date</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#rEDate}}{{rEDate}}{{/rEDate}}{{^rEDate}}-{{/rEDate}}</p>
					</div>

					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Hours Credit</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#rEHours}}{{rEHours}}{{/rEHours}}{{^rEHours}}-{{/rEHours}}</p>
					</div>
				</div>
			</div>
		`;

		const data = $.extend({}, this.eventData);
		data.eDate = moment(data.eDate).format('MM/DD/YYYY');

		const html = Mustache.render(template, data);

		$('#eventSection .row.display', this.$topRegion).html(html);

		$('#eventSection .row.datatable, #eventSection .row.buttons .btn-cancel', this.$topRegion).hide();
		$('#eventSection .row.display, #eventSection .row.buttons, #eventSection .row.buttons .btn-change', this.$topRegion).show();
	}

	action_changeEvent() {
		this.edt.ajax.reload();
		$('#eventSection .row.display, #eventSection .row.buttons .btn-change', this.$topRegion).hide();
		$('#eventSection .row.datatable, #eventSection .row.buttons, #eventSection .row.buttons .btn-cancel', this.$topRegion).show();
	}

	action_setVolunteer(volunteerData) {
		this.volunteerData = {
			MainID: volunteerData.MainID
		};

		for (let k in volunteerData) {
			if (volunteerData.hasOwnProperty(k)) {
				if (k != '@odata.etag' && k != 'id' && k.substr(0, 2) !== '__') {
					this.volunteerData[k] = volunteerData[k];
				}
			}
		}

		const template = `
			<div class="col-xs-12">
				<div class="row">
					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Volunteer Name</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#vName}}{{vName}}{{/vName}}{{^vName}}-{{/vName}}</p>
					</div>

					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Day Phone</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#vPhoneDay}}{{vPhoneDay}}{{/vPhoneDay}}{{^vPhoneDay}}-{{/vPhoneDay}}</p>
					</div>

					<div class="col-xs-12 col-md-4 form-group form-group-vertical" style="margin-bottom: 15px;">
						<span class="staticlabel">Email</span>
						<p style="padding: 6px 12px; border: 1px solid #cccccc; border-radius: 4px;">{{#vEmail}}{{vEmail}}{{/vEmail}}{{^vEmail}}-{{/vEmail}}</p>
					</div>
				</div>
			</div>
		`;

		const data = $.extend({}, this.volunteerData);
		data.vName = data.vLName + ', ' + data.vFName;

		const html = Mustache.render(template, data);

		$('#volunteerSection .row.display', this.$topRegion).html(html);

		$('#volunteerSection .row.datatable, #volunteerSection .row.buttons .btn-cancel', this.$topRegion).hide();
		$('#volunteerSection .row.display, #volunteerSection .row.buttons, #volunteerSection .row.buttons .btn-change', this.$topRegion).show();
	}

	action_changeVolunteer() {
		this.vdt.ajax.reload();
		$('#volunteerSection .row.display, #volunteerSection .row.buttons .btn-change', this.$topRegion).hide();
		$('#volunteerSection .row.datatable, #volunteerSection .row.buttons, #volunteerSection .row.buttons .btn-cancel', this.$topRegion).show();
	}

	action_create() {
		if (this.eventData && this.volunteerData) {
			this.data = {
				MainID: this.volunteerData.MainID,
				eDate: this.eventData.rEDate,
				eKey: this.eventData.eKey,
				rEHours: this.eventData.rEHours,
				rELocation: this.eventData.rELocation,
				rEName: this.eventData.rEName,
				rEType: this.eventData.rETypeOf,
				vEmail: this.volunteerData.vEmail,
				vEmergName: this.volunteerData.vEmergName,
				vEmergPhone: this.volunteerData.vEmergPhone,
				vEmergPhoneAlt: this.volunteerData.vEmergPhoneAlt,
				vEmergRel: this.volunteerData.vEmergRel,
				vFName: this.volunteerData.vFName,
				vLName: this.volunteerData.vLName,
				vPhoneCell: this.volunteerData.vPhoneCell,
				vPhoneDay: this.volunteerData.vPhoneDay,
				vPhoneEve: this.volunteerData.vPhoneEve
			};

			// for (let k in this.eventData) {
			// 	this.data[k] = this.eventData[k];
			// }
			//
			// for (let k in this.volunteerData) {
			// 	this.data[k] = this.volunteerData[k];
			// }

			$(':input').prop('disabled', true);
			const _this = this;
			const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration';
			$.ajax(url, {
				headers: {
					'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
				},
				complete: function() {
					$(':input').prop('disabled', false);
				},
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(_this.data),
				dataType: 'JSON',
				error: function error(jqXHR, textStatus, errorThrown) {
					alert('An error has occured. ', errorThrown);
				},
				method: 'POST',
				success: function success(data) { // (data, textStatus, jqXHR) {
					alert('Registration Created');
					// _this.navi.openView(_this.showOpts.returnView, {
					// 	reload: true
					// });
					_this.show({ returnView: _this.showOpts.returnView, data: data });
					_this.navi.render();
				}
			});
		} else {
			alert('Missing information.');
		}
	}

	action_update() {
		if (this.eventData && this.volunteerData) {
			const id = this.data.id;

			this.data = {
				MainID: this.volunteerData.MainID,
				eDate: this.eventData.rEDate,
				eKey: this.eventData.eKey,
				rEHours: this.eventData.rEHours,
				rELocation: this.eventData.rELocation,
				rEName: this.eventData.rEName,
				rEType: this.eventData.rETypeOf,
				vEmail: this.volunteerData.vEmail,
				vEmergName: this.volunteerData.vEmergName,
				vEmergPhone: this.volunteerData.vEmergPhone,
				vEmergPhoneAlt: this.volunteerData.vEmergPhoneAlt,
				vEmergRel: this.volunteerData.vEmergRel,
				vFName: this.volunteerData.vFName,
				vLName: this.volunteerData.vLName,
				vPhoneCell: this.volunteerData.vPhoneCell,
				vPhoneDay: this.volunteerData.vPhoneDay,
				vPhoneEve: this.volunteerData.vPhoneEve
			};

			// for (let k in this.eventData) {
			// 	this.data[k] = this.eventData[k];
			// }
			//
			// for (let k in this.volunteerData) {
			// 	this.data[k] = this.volunteerData[k];
			// }

			$(':input').prop('disabled', true);
			const _this = this;
			const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration(\'' + id + '\')';
			$.ajax(url, {
				headers: {
					'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
				},
				complete: function() {
					$(':input').prop('disabled', false);
				},
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(_this.data),
				dataType: 'JSON',
				error: function error(jqXHR, textStatus, errorThrown) {
					alert('An error has occured. ', errorThrown);
				},
				method: 'PUT',
				success: function success() { // (data, textStatus, jqXHR) {
					alert('Registration Updated');
					// _this.navi.openView(_this.showOpts.returnView, {
					// 	reload: true
					// });
				}
			});
		} else {
			alert('Incomplete information.');
		}
	}

	action_delete() {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration(\'' + this.data.id + '\')';
		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			complete: function() {
				$(':input').prop('disabled', false);
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({ __Status: 'DEL'}),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'PATCH',
			success: function success() { // (data, textStatus, jqXHR) {
				alert('Registration Deleted');
				_this.navi.openView(_this.showOpts.returnView, {
					reload: true
				});
			}
		});
	}

	action_getData(id, cbk) {
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Registration(\'' + id + '\')';
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
			success: function success(data) { // (data, textStatus, jqXHR) {
				_this.data = data;
				if (cbk) {
					cbk();
				}
			}
		});
	}

	action_getEventData(id, cbk) {
		const _this = this;
		// const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event(\'' + id + '\')';
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event?$format=application/json&$filter=eKey eq \'' + id + '\'';
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
			success: function success(data) { // (data, textStatus, jqXHR) {
				if (cbk) {
					cbk(data.value[0]);
				}
			}
		});
	}

	action_getVolunteerData(id, cbk) {
		const _this = this;
		// const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer(\'' + id + '\')';
		const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Volunteer?$format=application/json&$filter=MainID eq \'' + id + '\'';
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
			success: function success(data) { // (data, textStatus, jqXHR) {
				if (cbk) {
					cbk(data.value[0]);
				}
			}
		});
	}

	// action_submit(model) {
	// 	if (this.id) {
	// 		this.action_submitPutRecord(model);
	// 	} else {
	// 		this.action_submitPostRecord(model);
	// 	}
	// }
	//
	// action_submitPutRecord(model) {
	// 	$(':input').prop('disabled', true);
	// 	const _this = this;
	// 	const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event(\'' + this.id + '\')';
	// 	$.ajax(url, {
	// 		headers: {
	// 			'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
	// 		},
	// 		complete: function() {
	// 			$(':input').prop('disabled', false);
	// 		},
	// 		contentType: 'application/json; charset=utf-8',
	// 		data: JSON.stringify(model.toJSON()),
	// 		dataType: 'JSON',
	// 		error: function error(jqXHR, textStatus, errorThrown) {
	// 			alert('An error has occured. ', errorThrown);
	// 		},
	// 		method: 'PUT',
	// 		success: function success() { // (data, textStatus, jqXHR) {
	// 			alert('Event Updated');
	// 		}
	// 	});
	// }
	//
	// action_submitPostRecord(model) {
	// 	$(':input').prop('disabled', true);
	// 	const _this = this;
	// 	const url = 'https://was-intra-sit.toronto.ca/c3api_data/v2/DataAccess.svc/TEOVolunteer/Event';
	// 	$.ajax(url, {
	// 		headers: {
	// 			'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
	// 		},
	// 		complete: function() {
	// 			$(':input').prop('disabled', false);
	// 		},
	// 		contentType: 'application/json; charset=utf-8',
	// 		data: JSON.stringify(model.toJSON()),
	// 		dataType: 'JSON',
	// 		error: function error(jqXHR, textStatus, errorThrown) {
	// 			alert('An error has occured. ', errorThrown);
	// 		},
	// 		method: 'POST',
	// 		success: function success(data) { // , textStatus, jqXHR) {
	// 			_this.show({
	// 				operation: 'update',
	// 				data: data,
	// 				returnView: _this.returnView
	// 			});
	// 			_this.navi.render();
	// 			window.alert('Event Added');
	// 		}
	// 	});
	// }
}
