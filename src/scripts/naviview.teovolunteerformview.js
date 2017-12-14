/* exported TEOVolunteerFormView */
/* global baseEntityUrl baseUploadSubmitUrl baseUploadUrl CotForm2 moment Mustache NaviView baseUploadKeepUrl */

class TEOVolunteerFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Volunteers';
		this.search = null
		this.actionMenuItems = null;
		this.initOptions = initOptions;

		const languages = [
			'Arabic',
			'Assyrian',
			'Cambodian',
			'Cantonese',
			'Croatian',
			'Czech',
			'Farsi',
			'French',
			'German',
			'Greek',
			'Gujarati',
			'Hebrew',
			'Hindi',
			'Hungarian',
			'Italian',
			'Japanese',
			'Konkani',
			'Korean',
			'Lithuanian',
			'Mandarin',
			'Marathi',
			'Norwegian',
			'Polish',
			'Portugese',
			'Romanian',
			'Russian',
			'Serbian',
			'Sindhi',
			'Spanish',
			'Swedish',
			'Tagalog',
			'Taiwanese',
			'Thai',
			'Turkish',
			'Vietnames',
			'Other'
		];

		this.formDef = {
			id: `${this.className}_vForm`,
			rootPath: '',
			success: (e) => {
				e.preventDefault();
				this.submit();
				return false;
			},
			useBinding: true,

			sections: [{
				className: 'panel-default',
				title: 'Volunteer Details',

				rows: [{
					fields: [{
						bindTo: 'vFName',
						id: `${this.className}_vFName`,
						required: true,
						title: 'First Name',
						type: 'text'
						//}]
					}, {
						//fields: [{
						bindTo: 'vLName',
						id: `${this.className}_vLName`,
						required: true,
						title: 'Last Name',
						type: 'text'
					}]
				}, {
					fields: [{
						bindTo: 'vAddress',
						className: 'col-xs-12 col-md-6',
						id: `${this.className}_vAddress`,
						title: 'Street Address',
						type: 'text'
						// }]
					}, {
						// fields: [{
						bindTo: 'vCity',
						className: 'col-xs-12 col-md-3',
						id: `${this.className}_vCity`,
						title: 'City',
						type: 'text'
						//}]
					}, {
						//fields: [{
						bindTo: 'vPCode',
						className: 'col-xs-12 col-md-3',
						id: `${this.className}_vPCode`,
						title: 'Postal Code',
						type: 'text'
					}]
				}, {
					fields: [{
						bindTo: 'vPhoneDay',
						id: `${this.className}_vPhoneDay`,
						placeholder: '(416) 555-5555',
						title: 'Day Phone',
						validationtype: 'Phone'
						//}]
					}, {
						//fields: [{
						bindTo: 'vPhoneEve',
						id: `${this.className}_vPhoneEve`,
						placeholder: '(416) 555-5555',
						title: 'Evening Phone',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						bindTo: 'vPhoneCell',
						id: `${this.className}_vPhoneCell`,
						placeholder: '(416) 555-5555',
						title: 'Cell Phone',
						type: 'text',
						validationtype: 'Phone'
						// }]
					}, {
						// fields: [{
						bindTo: 'vEmail',
						id: `${this.className}_vEmail`,
						placeholder: 'example@domain.ca',
						title: 'Email Address',
						type: 'text',
						validationType: 'Email'
					}]
				}, {
					fields: [{
						bindTo: 'vAge',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}],
						className: 'col-xs-12 col-sm-6 col-md-3',
						id: `${this.className}_vAge`,
						orientation: 'horizontal',
						title: 'Over 14?',
						type: 'radio'
						//}]
					}, {
						//fields: [{
						bindTo: 'vToronto',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}],
						className: 'col-xs-12 col-sm-6 col-md-3',
						id: `${this.className}_vToronto`,
						orientation: 'horizontal',
						title: 'Live in Toronto',
						type: 'radio'
					}]
				}, {
					fields: [{
						bindTo: 'vLang',
						choices: languages.map((lang) => {
							return {
								text: lang
							};
						}),
						id: `${this.className}_vLang`,
						orientation: 'horizontal',
						title: 'Languages Spoken',
						type: 'checkbox'
					}]
				}, {
					fields: [{
						bindTo: 'vLanguageOther',
						id: `${this.className}_vLanguageOther`,
						title: 'Other Languages',
						type: 'text'
					}]
				}, {
					fields: [{
						bindTo: 'vSource',
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
						id: `${this.className}_vSource`,
						orientation: 'horizontal',
						title: 'Details',
						type: 'checkbox'
					}]
				}, {
					fields: [{
						bindTo: 'vSourceOther',
						id: `${this.className}_vSourceOther`,
						title: 'Other Details'
					}]
				}]
			}, {
				className: 'panel-default ',
				title: 'Administration Details',

				rows: [{
					fields: [{
						bindTo: 'vEmergName',
						id: `${this.className}_vEmergName`,
						title: 'Emergency Contact Name',
						type: 'text'
						//}]
					}, {
						//fields: [{
						bindTo: 'vEmergRel',
						id: `${this.className}_vEmergRel`,
						title: 'Emergency Contact Relationship',
						type: 'text'
					}]
				}, {
					fields: [{
						bindTo: 'vEmergPhone',
						id: `${this.className}_vEmergPhone`,
						placeholder: '(416) 555-5555',
						title: 'Emergency Contact Phone',
						type: 'text',
						validationtype: 'Phone'
						//}]
					}, {
						//fields: [{
						bindTo: 'vEmergPhoneAlt',
						id: `${this.className}_vEmergPhoneAlt`,
						placeholder: '(416) 555-5555',
						title: 'Emergency Contact Alternative Phone',
						type: 'text',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						bindTo: 'vDateSubmitted',
						id: `${this.className}_vDateSubmitted`,
						options: {
							format: 'MM/DD/YYYY',
							extraFormats: ['YYYY-MM-DDTHH:mm:SS-Z']
						},
						title: 'Date Submitted',
						type: 'datetimepicker'
						//}]
					}, {
						//fields: [{
						bindTo: 'vDateArchived',
						id: `${this.className}_vDateArchived`,
						options: {
							format: 'MM/DD/YYYY',
							extraFormats: ['YYYY-MM-DDTHH:mm:SS-Z']
						},
						title: 'Date Archived',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						bindTo: 'vDateApproved',
						className: 'col-xs-12 col-sm-6',
						id: `${this.className}_vDateApproved`,
						options: {
							format: 'MM/DD/YYYY',
							extraFormats: ['YYYY-MM-DDTHH:mm:SS-Z']
						},
						title: 'Date Approved',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						bindTo: 'vGraduate',
						choices: [{
							text: 'No'
						}, {
							text: 'Yes'
						}],
						id: `${this.className}_vGraduate`,
						orientation: 'horizontal',
						title: 'Graduate?',
						type: 'radio'
						//}]
					}, {
						//fields: [{
						bindTo: 'vGradDate',
						id: `${this.className}_vGradDate`,
						options: {
							format: 'MM/DD/YYYY',
							extraFormats: ['YYYY-MM-DDTHH:mm:SS-Z']
						},
						title: 'Graduation Date',
						type: 'datetimepicker'
					}]

				}, {
					fields: [{
						bindTo: 'vAppStatus',
						choices: [{
							text: 'New'
						}, {
							text: 'Approved'
						}, {
							text: 'Archived'
						}],
						id: `${this.className}_vAppStatus`,
						title: 'Application Status',
						type: 'radio',
						orientation: 'horizontal'
						//}]
					}, {
						//fields: [{
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
						className: 'col-xs-12 col-md-6',
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
							if (id == 'vAttachments') {
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
							} else if (previewFormDef.sections[i1].rows[i2].fields[i3].type === 'textarea') {
								const template = `
									<span class="staticlabel"><span>{{label}}</span></span>
									<p>{{{value}}}</p>
								`;
								const html = Mustache.render(template, {
									label: previewFormDef.sections[i1].rows[i2].fields[i3].title,
									value: value.replace(/(?:\r\n|\r|\n)/g, '<br />')
								});
								previewFormDef.sections[i1].rows[i2].fields[i3].type = 'html';
								previewFormDef.sections[i1].rows[i2].fields[i3].html = html;
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
				columns: [{
					data: 'eDate',
					title: 'Event Date',
					default: '',
					render: (data) => moment(data).format('l'),
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
						return '<button type="button" class="btn btn-primary">View</button>'
					},
					orderable: false,
					searchable: false
				}],
				dom: `<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'table-responsive'<'col-sm-12'tr>>><'row'<'col-sm-5'i><'col-sm-7'p>>B`,
				lengthMenu: [10, 25, 50, 75, 100, 500, 1000]
			});
			_this.dt = $table.DataTable();
			$('#' + _this.className + '_dt tbody', _this.$topRegion).on('click', function(e) {
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

	action_delete() {
		bootbox.prompt('You are about to delete a volunteer. Please type the word \'Delete\' to confirm.', (result) => {
			if (result === 'Delete') {
				$(':input').prop('disabled', true);

				$.ajax(`${baseEntityUrl}/Volunteer('${this.id}')`, {
					complete: () => {
						$(':input').prop('disabled', false);
					},
					contentType: 'application/json; charset=utf-8',
					dataType: 'JSON',
					error: (jqXHR, textStatus, errorThrown) => {
						bootbox.alert('An error has occured. ' + errorThrown);
					},
					headers: {
						'Authorization': `AuthSession ${this.initOptions.cotLogin.sid}`
					},
					method: 'DELETE',
					success: () => {
						this.navi.openView(this.returnView, {
							operation: 'reload'
						});
						this.navi.closeView(this);
					}
				});
			}
		});
	}

	submit(model) {
		$('#' + this.className + 'vAttachments').get(0).cotDropzone.finalize(() => { // data) {
			let json = model.toJSON();
			new Promise((resolve) => {
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
					this.keepFiles(json.vAttachments, () => {
						resolve();
					});
				} else {
					resolve();
				}
			}).then(() => {
				if (this.id) {
					this.putRecord(json);
				} else {
					this.postRecord(json);
				}
			});
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
		};

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
				bootbox.alert('An error has occured. ' + errorThrown);
			},
			method: 'PUT',
			success: function success() { // (data, textStatus, jqXHR) {
				bootbox.alert('Volunteer Updated');
			}
		});
	}

	postRecord(json) {
		$(':input').prop('disabled', true);
		const _this = this;
		const url = baseEntityUrl + '/Volunteer';

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
		};

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
				bootbox.alert('An error has occured. ' + errorThrown);
			},
			method: 'POST',
			success: function success(data) { // , textStatus, jqXHR) {
				bootbox.alert('Volunteer Added');
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
		const url = `${baseEntityUrl}/Volunteer('${id}')`;

		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + this.initOptions.cotLogin.sid
			},
			contentType: 'application/json; charset=utf-8',
			dataType: 'JSON',
			error: (jqXHR, textStatus, errorThrown) => {
				bootbox.alert(`An error has occured. ${errorThrown}`);
			},
			method: 'GET',
			success: (data) => {
				data.vDateApproved = moment(data.vDateApproved).isValid() ? moment(data.vDateApproved).format('MM/DD/YYYY') : '';
				data.vDateSubmitted = moment(data.vDateSubmitted).isValid() ? moment(data.vDateSubmitted).format('MM/DD/YYYY') : '';
				data.vGradDate = moment(data.vGradDate).isValid() ? moment(data.vGradDate).format('MM/DD/YYYY') : '';
				callback(data);
			}
		});
	}

	updateRelatedRecord() {}

	keepFiles(attachments, cbk) {
		const url = baseUploadKeepUrl + attachments.map((attachment) => attachment.bin_id).join(',');
		$.ajax(url, {
			data: JSON.stringify({}),
			error: (jqXHR, textStatus, errorThrown) => {
				bootbox.alert(`An error has occured. ${errorThrown}`);
			},
			method: 'GET',
			success: () => {
				cbk();
			}
		});
	}
}
