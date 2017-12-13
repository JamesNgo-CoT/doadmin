/* exported TEOVolunteerFormView */
/* global NaviView CotForm2 moment Mustache baseEntityUrl baseUploadUrl baseUploadSubmitUrl */

class TEOVolunteerFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Volunteers';
		this.search = null
		this.actionMenuItems = null;
		// this.contextualMenuItems = [
		// 	{
		// 		label: 'Menu 1',
		// 		action: function() {},
		// 		menuItems: null
		// 	},
		// 	{
		// 		label: 'Menu 2',
		// 		menuItems: [{
		// 			label: 'Menu 2.1',
		// 			action: function() {}
		// 		}, {
		// 			label: 'Menu 2.2',
		// 			action: function() {}
		// 		}, {
		// 			label: 'Menu 2.3',
		// 			action: function() {}
		// 		}, {
		// 			label: 'Menu 2.3',
		// 			menuItems: [{
		// 				label: 'Menu 2.3.3',
		// 				action: function() {}
		// 			}]
		// 		}],
		// 		action: null
		// 	}
		// ]
		this.initOptions = initOptions;

		const _this = this;
		this.formDef = {
			id: this.className + '_vForm',
			rootPath: '',
			success: function(e) {
				e.preventDefault();
				_this.submit();
				return false;
			},
			useBinding: true,

			sections: [{
				title: 'Volunteer Details',
				className: 'panel-default',

				rows: [{
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vFName',
						title: 'First Name',
						type: 'text',
						required: true,
						bindTo: 'vFName'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vLName',
						title: 'Last Name',
						type: 'text',
						required: true,
						bindTo: 'vLName'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vAddress',
						title: 'Street Address',
						type: 'text',
						bindTo: 'vAddress'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vCity',
						title: 'City',
						type: 'text',
						bindTo: 'vCity'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vPCode',
						title: 'Postal Code',
						type: 'text',
						bindTo: 'vPCode'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vPhoneDay',
						title: 'Day Phone',
						validationtype: 'Phone',
						bindTo: 'vPhoneDay'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vPhoneEve',
						title: 'Evening Phone',
						validationtype: 'Phone',
						bindTo: 'vPhoneEve'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vPhoneCell',
						title: 'Cell Phone',
						type: 'text',
						validationtype: 'Phone',
						bindTo: 'vPhoneCell'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vEmail',
						title: 'Email Address',
						type: 'text',
						validationType: 'Email',
						bindTo: 'vEmail'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vAge',
						title: 'Over 14?',
						type: 'radio',
						orientation: 'horizontal',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}],
						bindTo: 'vAge'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vToronto',
						title: 'Live in Toronto',
						type: 'radio',
						orientation: 'horizontal',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}],
						bindTo: 'vToronto'
					}]
				}, {
					fields: [{
						id: this.className + '_vLang',
						title: 'Languages Spoken',
						type: 'checkbox',
						orientation: 'horizontal',
						choices: [{
							text: 'Arabic'
						}, {
							text: 'Assyrian'
						}, {
							text: 'Cambodian'
						}, {
							text: 'Cantonese'
						}, {
							text: 'Croatian'
						}, {
							text: 'Czech'
						}, {
							text: 'Farsi'
						}, {
							text: 'French'
						}, {
							text: 'German'
						}, {
							text: 'Greek'
						}, {
							text: 'Gujarati'
						}, {
							text: 'Hebrew'
						}, {
							text: 'Hindi'
						}, {
							text: 'Hungarian'
						}, {
							text: 'Italian'
						}, {
							text: 'Japanese'
						}, {
							text: 'Konkani'
						}, {
							text: 'Korean'
						}, {
							text: 'Lithuanian'
						}, {
							text: 'Mandarin'
						}, {
							text: 'Marathi'
						}, {
							text: 'Norwegian'
						}, {
							text: 'Polish'
						}, {
							text: 'Portugese'
						}, {
							text: 'Romanian'
						}, {
							text: 'Russian'
						}, {
							text: 'Serbian'
						}, {
							text: 'Sindhi'
						}, {
							text: 'Spanish'
						}, {
							text: 'Swedish'
						}, {
							text: 'Tagalog'
						}, {
							text: 'Taiwanese'
						}, {
							text: 'Thai'
						}, {
							text: 'Turkish'
						}, {
							text: 'Vietnames'
						}, {
							text: 'Other'
						}],
						bindTo: 'vLang'
					}]
				}, {
					fields: [{
						id: this.className + '_vLanguageOther',
						title: 'Other Languages',
						bindTo: 'vLanguageOther'
					}]
				}, {
					fields: [{
						id: this.className + '_vSource',
						title: 'Details',
						type: 'checkbox',
						orientation: 'horizontal',
						choices: [{
							text: 'Internet'
						}, {
							text: 'Volunteer Placement Agency'
						}, {
							text: 'Current Volunteer'
						}, {
							text: 'City of Toronto Website'
						}, {
							text: 'Live Green Event'
						}, {
							text: 'Friend'
						}, {
							text: 'Career Fair'
						}, {
							text: 'Other'
						}],
						bindTo: 'vSource'
					}]
				}, {
					fields: [{
						id: this.className + '_vSourceOther',
						title: 'Other Details',
						bindTo: 'vSourceOther'
					}]
				}]
			}, {
				title: 'Administration Details',
				className: 'panel-default ',

				rows: [{
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vEmergName',
						title: 'Emergency Contact Name',
						type: 'text',
						bindTo: 'vEmergName'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vEmergRel',
						title: 'Emergency Contact Relationship',
						type: 'text',
						bindTo: 'vEmergRel'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vEmergPhone',
						title: 'Emergency Contact Phone',
						type: 'text',
						validationtype: 'Phone',
						bindTo: 'vEmergPhone'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vEmergPhoneAlt',
						title: 'Emergency Contact Alternative Phone',
						type: 'text',
						validationtype: 'Phone',
						bindTo: 'vEmergPhoneAlt'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vDateSubmitted',
						title: 'Date Submitted',
						type: 'datetimepicker',
						options: {
							format: 'MM/DD/YYYY',
							extraFormats: ['YYYY-MM-DDTHH:mm:SS-Z']
						},
						bindTo: 'vDateSubmitted'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vDateArchived',
						title: 'Date Archived',
						type: 'datetimepicker',
						bindTo: 'vDateArchived'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vDateApproved',
						title: 'Date Approved',
						type: 'datetimepicker',
						bindTo: 'vDateApproved'
					}]
				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vGraduate',
						title: 'Graduate?',
						type: 'radio',
						choices: [{
								text: 'No'
							},
							{
								text: 'Yes'
							}
						],
						orientation: 'horizontal',
						bindTo: 'vGraduate'
						//}]
					}, {
						//fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vGradDate',
						title: 'Graduation Date',
						type: 'datetimepicker',
						bindTo: 'vGradDate'
					}]

				}, {
					fields: [{
						class: 'col-xs-12 col-md-4',
						id: this.className + '_vAppStatus',
						title: 'Application Status',
						type: 'radio',
						choices: [{
								text: 'New'
							},
							{
								text: 'Approved'
							},
							{
								text: 'Archived'
							}
						],
						orientation: 'horizontal',
						bindTo: 'vAppStatus'
					}]
				}, {
					fields: [{
						id: this.className + '_vAODA',
						title: 'AODA',
						type: 'radio',
						choices: [{
								text: 'No'
							},
							{
								text: 'Yes'
							}
						],
						orientation: 'horizontal',
						bindTo: 'vAODA'
					}]
				}, {
					fields: [{
						id: this.className + '_vStatus',
						title: 'Volunteer Status',
						type: 'radio',
						choices: [{
								text: 'Active'
							},
							{
								text: 'Unsubscribed'
							},
							{
								text: 'Duplicate'
							}
						],
						orientation: 'horizontal',
						bindTo: 'vStatus'
					}]
				}, {
					fields: [{
						id: this.className + '_vForms',
						title: 'Forms',
						type: 'checkbox',
						choices: [{
								text: 'Application'
							},
							{
								text: 'Reference'
							},
							{
								text: 'Media release'
							},
							{
								text: 'Boundary form'
							},
							{
								text: 'Roles & responsibilities'
							},
							{
								text: 'Emergecy contact'
							},
							{
								text: 'Waiver'
							}
						],
						orientation: 'horizontal',
						bindTo: 'vForms'
					}]
				}, {
					fields: [{
						id: this.className + '_vNotes',
						title: 'Notes',
						type: 'textarea',
						rows: 5,
						bindTo: 'vNotes'
					}]
				}]
			}, {
				title: 'Attachments',
				className: 'panel-default',

				rows: [{
					fields: [{
						type: 'dropzone',
						id: this.className + 'vAttachments',
						options: {
							maxFiles: 4,
							url: baseUploadSubmitUrl
						},
						bindTo: 'vAttachments'
					}]
				}]
			}]
		};

		this.render();
	}

	render() {
		super.render();
	}

	show_newVolunteer() { // (showOpts) {
		this.title = 'Add Volunteer';

		this.$topRegion.empty().html(`
			<p>
				<button type="button" class="btn btn-primary btn-cancel" style="margin: 0;">Cancel</button>
				<button type="button" class="btn btn-success btn-save" style="margin: 0;">Create</button>
			</p>

			<div class="` + this.className + `_formWrapper"></div>

			<p>
				<button type="button" class="btn btn-primary btn-cancel" style="margin: 0;">Cancel</button>
				<button type="button" class="btn btn-success btn-save" style="margin: 0;">Create</button>
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
			$('#' + _this.className + '_vForm').trigger('submit');
		});

		let model = new CotModel({

			vDateSubmitted: moment().format('M/D/YYYY h:m A'),
			vGraduate: 'No',
			vAppStatus: 'New',
			vAODA: 'No'

		});
		this.formDef.success = function(e) {
			e.preventDefault();
			_this.submit(model);
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

	show_updateVolunteer(showOpts) {
		const _this = this;

		function renderUpdateVolunteer(model) {
			let originalData = model.toJSON();

			_this.id = model.get('id');
			_this.title = model.get('vLName') + ', ' + model.get('vFName');
			_this.$topRegion.empty().html(`
				<p>
					<button type="button" class="btn btn-primary btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-success btn-save" style="margin: 0;">Save</button>
				</p>

				<div class="` + _this.className + `_formWrapper"></div>

				<p>
					<button type="button" class="btn btn-primary btn-done" style="margin: 0;">Done</button>
					<button type="button" class="btn btn-success btn-save" style="margin: 0;">Save</button>
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
				$('#' + _this.className + '_vForm').trigger('submit');
			});

			_this.formDef.success = function(e) {
				e.preventDefault();
				_this.submit(model);
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

	show_viewVolunteer(showOpts) {
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
						// const id = previewFormDef.sections[i1].rows[i2].fields[i3].id.replace(_this.className + '_', '');
						// previewFormDef.sections[i1].rows[i2].fields[i3].type = 'static';
						// previewFormDef.sections[i1].rows[i2].fields[i3].bindTo = null;
						// previewFormDef.sections[i1].rows[i2].fields[i3].value = model.get(id) || '-'; //model.get(previewFormDef.sections[i1].rows[i2].fields[i3].id);

						const id = previewFormDef.sections[i1].rows[i2].fields[i3].bindTo;
						previewFormDef.sections[i1].rows[i2].fields[i3].bindTo = null;
						const value = model.get(id);
						if (value == null || value == '' || (Array.isArray(value) && value.length == 0)) {
							previewFormDef.sections[i1].rows[i2].fields[i3].type = 'static';
							previewFormDef.sections[i1].rows[i2].fields[i3].value = '-';
						} else {
							if (id == 'eAttachments') {
								const template = `
								<ul>
									{{#values}}
									<li>
										{{name}} (<a href="${baseUploadUrl}/{{bin_id}}&sid=${_this.initOptions.cotLogin.sid}" target="_blank">Download</a>)
									</li>
									{{/values}}
								</ul>
								`;
								previewFormDef.sections[i1].rows[i2].fields[i3].type = 'html';
								previewFormDef.sections[i1].rows[i2].fields[i3].html = Mustache.render(template, {
									values: value
								});
							} else {
								previewFormDef.sections[i1].rows[i2].fields[i3].type = 'static';
								previewFormDef.sections[i1].rows[i2].fields[i3].value = value;
							}
						}

					}
				}
			}

			_this.id = model.get('id');
			_this.title = model.get('vLName') + ', ' + model.get('vFName');
			_this.$topRegion.empty().html(`
				<p>
					<button type="button" class="btn btn-primary btn-close" style="margin: 0;">Close</button>
					<button type="button" class="btn btn-primary btn-save" style="margin: 0;">Update</button>
					<button type="button" class="btn btn-danger btn-delete" style="margin: 0;">Delete</button>
				</p>

				<div class="` + _this.className + `_formWrapper"></div>

				<p>
					<button type="button" class="btn btn-primary btn-close" style="margin: 0;">Close</button>
					<button type="button" class="btn btn-primary btn-save" style="margin: 0;">Update</button>
					<button type="button" class="btn btn-danger btn-delete" style="margin: 0;">Delete</button>
				</p>

				<div id="volunteerSection" class="panel panel-default">
					<div class="panel-heading">
						<h3>Registration</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-xs-12">
								<table id="` + _this.className + `_dt" style="width: 100%;"></table>
							</div>
						</div>
					</div>
				</div>
			`);

			if (model.get('vAppStatus') == 'Approved' && model.get('vStatus') == 'Active') {
				$('#' + _this.className + '_dt').after('<p><button type="button" class="btn btn-primary btn-register">Register</button> <button type="button" class="btn btn-primary btn-export-excel" style="margin: 0;">Export Excel</button></p>');
				$('.btn-register', _this.$topRegion).on('click', function(e) {
					e.preventDefault();
					_this.navi.openView(_this.initOptions.registrationForm, {
						returnView: _this,
						volunteerData: model.toJSON()
					}, null, true);
				})
				$('.btn-export-excel', _this.$topRegion).on('click', function(e) {
					e.preventDefault();
					$('.buttons-excel', _this.$topRegion).trigger('click');
				});
			}

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
			$('.btn-delete', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.action_delete(model);
			});



			_this.form = new CotForm2(previewFormDef);
			_this.form.render('.' + _this.className + '_formWrapper');
			// _this.form.setModel(model);

			// DATATABLE
			// const bridge = new DataTablesODataBridge();
			const $table = $('#' + _this.className + '_dt');
			$table.oDataTable({
				$filter: `MainID eq '${model.get('MainID')}'`,
				ajax: {
					headers: {
						'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
					},
					url: baseEntityUrl + '/Registration',
				},
				columns: [
					{
						data: 'eDate',
						title: 'Event Date',
						default: '',
						searchType: 'date'
					}, {
						data: 'rEName',
						title: 'Event Name',
						default: ''
					}, {
						data: 'rEType',
						title: 'Event Type',
						default: '',
						searchChoices: ['', 'Training', 'Outreach', 'Special Event']
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
						class: 'action',
						data: 'id',
						title: 'Action',
						render: function() {
							return '<button type="button" class="btn btn-default">View</button>'
						},
						orderable: false,
						searchable: false
					}
				],
				dom: `<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'table-responsive'<'col-sm-12'tr>>><'row'<'col-sm-5'i><'col-sm-7'p>>B`,
				lengthMenu: [10, 25, 50, 75, 100, 500, 1000]
			});
			_this.dt = $table.DataTable();
			$('#' + _this.className + '_dt tbody').on('click', function(e) {
				if ($(e.target).is('.btn')) {
					e.preventDefault();
					var data = _this.dt.row($(e.target).closest('tr')).data();
					const sourceKey = _this.initOptions.registrationForm;
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
						this.show_newVolunteer(options);
						break;
					case 'view':
						this.show_viewVolunteer(options);
						break;
					case 'update':
						this.show_updateVolunteer(options);
						break;
				}
			}
		}
	}

	action_delete() { // model) {
		bootbox.prompt('You are about to delete a volunteer. Please type the word \'Delete\' to confirm.', function(result){
			if (result === 'Delete') {
				$(':input').prop('disabled', true);

				const _this = this;
				const url = baseEntityUrl + '/Volunteer(\'' + this.id + '\')';
				// const data = $.extend({}, model.toJSON());
				// data.__Status = 'DEL';

				$.ajax(url, {
					headers: {
						'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
					},
					complete: function() {
						$(':input').prop('disabled', false);
					},
					contentType: 'application/json; charset=utf-8',
					// data: JSON.stringify(data),
					dataType: 'JSON',
					error: function error(jqXHR, textStatus, errorThrown) {
						alert('An error has occured. ', errorThrown);
					},
					// method: 'PATCH', // TODO - use PATCH.
					method: 'DELETE',
					success: function success() { // (data, textStatus, jqXHR) {
						const showOptions = {
							operation: 'reload',
						};
						_this.navi.openView(_this.returnView, showOptions);
					}
				});
			}
		});
	}

	submit(model) {
		$('#' + this.className + 'vAttachments').get(0).cotDropzone.finalize(() => { // data) {
			var json = model.toJSON();
			if (json.vAttachments) {
				json.vAttachments = json.vAttachments.map((file) => {
					var bin_id;
					if (file.bin_id) {
						bin_id = file.bin_id;
					} else {
						try {
							bin_id = JSON.parse(file.xhr.response).BIN_ID[0];
						} catch (e) {
							bin_id = null;
						}
					}
					return {
						bin_id: bin_id,
						name: file.name,
						size: file.size,
						status: file.status,
						type: file.type
					}
				});
			}
			if (this.id) {
				this.putRecord(json);
			} else {
				this.postRecord(json);
			}
		});
	}

	putRecord(json) {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = baseEntityUrl + '/Volunteer(\'' + this.id + '\')';

		json = {
			MainID: json.MainID || this.id,
			vAODA: json.vAODA,
			vAddress: json.vAddress,
			vAge: json.vAge,
			vAppStatus: json.vAppStatus,
			vAttachments: json.vAttachments,
			vCity: json.vCity,
			vDateApproved: moment(json.vDateApproved).isValid() ? moment(json.vDateApproved).utc().format() : null,
			vDateSubmitted: moment(json.vDateSubmitted).isValid() ? moment(json.vDateSubmitted).utc().format() : null,
			vEmail: json.vEmail,
			vEmergName: json.vEmergName,
			vEmergPhone: json.vEmergPhone,
			vEmergPhoneAlt: json.vEmergPhoneAlt,
			vEmergRel: json.vEmergRel,
			vFName: json.vFName,
			vForms: json.vForms,
			vGradDate: moment(json.vGradDate).isValid() ? moment(json.vGradDate).utc().format() : null,
			vGraduate: json.vGraduate,
			vLName: json.vLName,
			vLang: json.vLang,
			vLanguageOther: json.vLanguageOther,
			vNotes: json.vNotes,
			vPCode: json.vPCode,
			vPhoneCell: json.vPhoneCell,
			vPhoneDay: json.vPhoneDay,
			vPhoneEve: json.vPhoneEve,
			vSource: json.vSource,
			vSourceOther: json.vSourceOther,
			vStatus: json.vStatus,
			vToronto: json.vToronto
		}

		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			complete: function() {
				$(':input').prop('disabled', false);
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(json),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'PUT',
			success: function success() { // (data, textStatus, jqXHR) {
				alert('Volunteer Updated');
			}
		});
	}

	postRecord(json) {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = baseEntityUrl + '/Volunteer';

		json = {
			MainID: json.MainID,
			vAODA: json.vAODA,
			vAddress: json.vAddress,
			vAge: json.vAge,
			vAppStatus: json.vAppStatus,
			vAttachments: json.vAttachments,
			vCity: json.vCity,
			vDateApproved: moment(json.vDateApproved).isValid() ? moment(json.vDateApproved).utc().format() : null,
			vDateSubmitted: moment(json.vDateSubmitted).isValid() ? moment(json.vDateSubmitted).utc().format() : null,
			vEmail: json.vEmail,
			vEmergName: json.vEmergName,
			vEmergPhone: json.vEmergPhone,
			vEmergPhoneAlt: json.vEmergPhoneAlt,
			vEmergRel: json.vEmergRel,
			vFName: json.vFName,
			vForms: json.vForms,
			vGradDate: moment(json.vGradDate).isValid() ? moment(json.vGradDate).utc().format() : null,
			vGraduate: json.vGraduate,
			vLName: json.vLName,
			vLang: json.vLang,
			vLanguageOther: json.vLanguageOther,
			vNotes: json.vNotes,
			vPCode: json.vPCode,
			vPhoneCell: json.vPhoneCell,
			vPhoneDay: json.vPhoneDay,
			vPhoneEve: json.vPhoneEve,
			vSource: json.vSource,
			vSourceOther: json.vSourceOther,
			vStatus: json.vStatus,
			vToronto: json.vToronto
		}

		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			complete: function() {
				$(':input').prop('disabled', false);
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(json),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'POST',
			success: function success(data) { // , textStatus, jqXHR) {
				window.alert('Volunteer Added');
				_this.show({
					operation: 'update',
					data: data,
					returnView: _this.returnView
				});
				_this.navi.render();
			}
		});
	}

	getRecord(id, callback) {
		const _this = this;
		const url = baseEntityUrl + '/Volunteer(\'' + id + '\')';
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
				data.vDateApproved = moment(data.vDateApproved).isValid() ? moment(data.vDateApproved).format('MM/DD/YYYY') : '';
				data.vDateSubmitted = moment(data.vDateSubmitted).isValid() ? moment(data.vDateSubmitted).format('MM/DD/YYYY') : '';
				data.vGradDate = moment(data.vGradDate).isValid() ? moment(data.vGradDate).format('MM/DD/YYYY') : '';
				callback(data);
			}
		});
	}
}
