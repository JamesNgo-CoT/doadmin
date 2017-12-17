/* exported CotForm2 CotLoginExt DataTablesODataBridge loginGate */
/* global CotForm CotDropzone CotSession */
cot_form.prototype.dropzoneFieldRender = function(originalfield) {
	var field = $.extend(true, {}, originalfield);
	// Main element.
	var $el = $('<div></div>');

	// Hidden input element.
	// For form.getData() and 'required' validation.
	var $hiddenInput = $('<input type="hidden">')
		.attr('data-fv-field', field.id)
		.attr('id', field.id)
		.attr('name', field.id);
	if (field.required) {
		$hiddenInput
			.attr('aria-required', 'true')
			.attr('class', 'required');
	}
	$el.append($hiddenInput);

	// Dropzone div element.
	var $dropzoneDiv = $('<div class="dropzone"></div>');
	$el.append($dropzoneDiv);

	// Dropzone.
	var cotDropzone = $hiddenInput.get(0).cotDropzone = new CotDropzone();
	// Fill from model.
	cotDropzone._fillFromModel = function(model) {
		if (field.bindTo) {

			// Get files as array.
			var files = model.get(field.bindTo) || [];
			if (typeof files === 'string') {
				try {
					files = JSON.parse(files);
					if (!Array.isArray(files)) {
						files = [];
					}
				} catch (e) {
					files = [];
				}
			}
			if (!Array.isArray(files)) {
				files = [files];
			}

			// Set initial files.
			cotDropzone.initFiles = files.map(function(file) {
				file.status = 'initial';
				return file;
			});

			// Reset dropzone files.
			cotDropzone.dropzone.removeAllFiles(true);
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				cotDropzone.dropzone.emit('addedfile', file);
				cotDropzone.dropzone.emit('complete', file);
				cotDropzone.dropzone.files.push(file);
			}

			// Update hidden input.
			cotDropzone._updateHiddenIntput();
		}
	};

	// Update hidden input.
	if (!field.options.valueMap) {
		field.options.valueMap = function(file) {
			var bin_id;
			try {
				bin_id = JSON.parse(file.xhr.response).BIN_ID[0];
			} catch (e) {
				bin_id = null;
			}
			return {
				bin_id: bin_id,
				name: file.name,
				size: file.size,
				status: file.status,
				type: file.type
			}
		}
	}
	cotDropzone._updateHiddenIntput = function() {
		var value = cotDropzone.dropzone.files.filter(function(file) {
			return file.status == 'initial' || file.status == 'success'
		}).map(field.options.valueMap);
		var textValue = value.length > 0 ? JSON.stringify(value) : '';
		if (textValue != $hiddenInput.val()) {
			$hiddenInput.val(textValue).trigger('change');
			$hiddenInput.closest('form').data('formValidation').revalidateField($hiddenInput);
		}
	};
	cotDropzone._watchChanges = function(form) {
		if (field.bindTo) {
			$hiddenInput.on('change', function() { // e) {
				if (form._model) {
					var newValue = cotDropzone.dropzone.files.filter(function(file) {
						return file.status == 'initial' || file.status == 'success'
					})
					form._model.set(field['bindTo'], newValue);
				}
			});
		}
	};
	cotDropzone.finalize = function(cbk) {
		var step2 = function() {
			if (!cotDropzone.initFiles) {
				cotDropzone.initFiles = [];
			}
			var deletable = cotDropzone.initFiles.filter(function(file) {
				return cotDropzone.dropzone.files.indexOf(file) == -1;
			})
			var keepable = cotDropzone.dropzone.files.filter(function(file) {
				return cotDropzone.initFiles.indexOf(file) == -1;
			});
			if (cbk) {
				cbk({
					delete: deletable.filter(function(file) {
						return file.status == 'initial' || file.status == 'success';
					}),
					keep: keepable.filter(function(file) {
						return file.status == 'initial' || file.status == 'success';
					})
				});
			}
		};
		var step1 = function() {
			if (cotDropzone.dropzone.getQueuedFiles().length > 0) {
				var success = function() {
					cotDropzone.dropzone.off('success', success);
					step1();
				};
				cotDropzone.dropzone.on('success', success);
				cotDropzone.dropzone.processQueue();
			} else {
				step2();
			}
		};
		step1();
	};

	// Dropzone options.
	field.options.selector = $dropzoneDiv;
	if (field.options.includeCotFormInit != false) {
		field.options.init = (function(oldInit) {
			return function() {
				if (oldInit) {
					oldInit.apply(this, arguments);
				}
				this.on('success', function() { //file) {
					cotDropzone._updateHiddenIntput();
				});
				this.on('removedfile', function() { //file) {
					cotDropzone._updateHiddenIntput();
				});
			}
		})(field.options.init);
	}
	if (!field.options.clickable && field.options.includeCotFormButton != false) {
		$el.append('<p><button type="button" class="btn btn-default" id="' + field.id + 'Btn">Upload File</button></p>');
		field.options.clickable = [$dropzoneDiv.get(0), $el.find('#' + field.id + 'Btn').get(0)];
	}

	// Render dropzone.
	cotDropzone.render(field.options);

	// Return wrapper element.
	return $el.get(0);
};

function CotForm2(definition) {
	if (!definition) {
		throw new Error('You must supply a form definition');
	}
	this._isRendered = false;
	this._definition = definition;
	this._useBinding = definition['useBinding'] || false;
	this._model = null;
	this.cotForm = new cot_form({
		id: definition['id'] || 'new_form',
		title: definition['title'],
		rootPath: definition['rootPath'],
		success: definition['success'] || function() {}
	});
	var that = this;
	var bindableTypes = ['daterangepicker', 'datetimepicker', 'text', 'dropdown', 'textarea', 'checkbox', 'radio', 'password', 'multiselect', 'dropzone'];
	$.each(definition['sections'] || [], function(i, sectionInfo) {
		var section = that.cotForm.addSection({
			id: sectionInfo['id'] || 'section' + i,
			title: sectionInfo['title'],
			className: sectionInfo['className']
		});
		$.each(sectionInfo['rows'] || [], function(y, row) {
			if (row['fields']) {
				row['fields'].forEach(function(field) {
					var type = field['type'] || 'text';
					if (field['bindTo'] && bindableTypes.indexOf(type) === -1) {
						throw new Error('Error in field ' + (field['id'] || 'no id') + ', fields of type ' + type + ' cannot use bindTo.');
					}
				});
				section.addRow(row['fields']);
			} else if (row['grid']) {
				section.addGrid(row['grid']);
			}
		});
	});
}
CotForm2.prototype = Object.create(CotForm.prototype);
CotForm2.prototype.constructor = CotForm2;
CotForm2.prototype._fillFromModel = function(model) {
	if (this._isRendered) {
		(this._definition['sections'] || []).forEach(function(sectionInfo) {
			(sectionInfo['rows'] || []).forEach(function(row) {
				(row['fields'] || []).forEach(function(field) {
					//TODO: support grids
					if (field['bindTo']) {
						var value = model ? (model.get(field['bindTo']) || '') : '';
						switch (field['type']) {
							case 'radio':
							case 'checkbox':
								$.makeArray(value).forEach(function(val) {
									var fld = $('input[name="' + field['id'] + '"][value="' + val + '"]');
									if (fld.length) {
										fld[0].checked = true;
									}
								});
								break;
							case 'multiselect':
								$('#' + field['id']).multiselect('select', $.makeArray(value));
								break;
							case 'datetimepicker':
								// $(".datetimepicker." + field['id']).val(value).trigger('change');
								$(".datetimepicker." + field['id']).data("DateTimePicker").date(value);
								break;
							case 'daterangepicker':
								var picker = $('#' + field['id']).data('daterangepicker');
								if (value.indexOf(picker.locale.separator) > -1) {
									var dates = value.split(picker.locale.separator);
									picker.setStartDate(dates[0]);
									picker.setEndDate(dates[1]);
								}
								break;
							case 'dropzone':
								var dz = $('#' + field['id']).get(0);
								if (dz && dz.cotDropzone) {
									dz.cotDropzone._fillFromModel(model);
								}
								break;
							default:
								$('#' + field['id']).val(value);
								break;
						}
					}
				});
			});
		});
	}
};
CotForm2.prototype._watchChanges = function() {
	var form = this;
	if (this._isRendered) {
		(this._definition['sections'] || []).forEach(function(sectionInfo) {
			(sectionInfo['rows'] || []).forEach(function(row) {
				(row['fields'] || []).forEach(function(field) {
					//TODO: support grids
					if (field['bindTo']) {
						if (field['type'] === 'radio') {
							$('input[name="' + field['id'] + '"]').on('click', function(e) {
								if (form._model) {
									form._model.set(field['bindTo'], $(e.currentTarget).val());
								}
							});
						} else if (field['type'] === 'checkbox') {
							$('input[name="' + field['id'] + '"]').on('click', function(e) {
								if (form._model) {
									var value = $(e.currentTarget).val();
									var values = $.makeArray(form._model.get(field['bindTo']) || []).slice();
									var currentIndex = (values).indexOf(value);
									if (e.currentTarget.checked && currentIndex == -1) {
										values.push(value);
									} else if (!e.currentTarget.checked && currentIndex > -1) {
										values.splice(currentIndex, 1);
									}
									form._model.set(field['bindTo'], values);
								}
							});
						} else if (field['type'] === 'datetimepicker') {
							$(".datetimepicker." + field['id']).on('dp.change', function() {
								if (form._model) {
									form._model.set(field['bindTo'], $("#" + field['id']).val());
								}
							});
						} else if (field['type'] == 'dropzone') {
							var dz = $('#' + field['id']).get(0);
							if (dz && dz.cotDropzone) {
								dz.cotDropzone._watchChanges(form);
							}
						} else {
							$('#' + field['id']).on('change', function(e) {
								if (form._model) {
									var newVal = $(e.currentTarget).val();
									if (field['type'] === 'multiselect' && field['multiple'] && !newVal) {
										newVal = [];
									}
									form._model.set(field['bindTo'], newVal);
								}
							});
						}
					}
				});
			});
		});
	}
};

class CotLoginExt extends cot_login {
	constructor(options) {
		const _onReady = options.onReady;
		options.onReady = function(cot_login_instance) {
			cot_login_instance.modal.on('shown.bs.modal', function() {
				$('#username').focus()
			});
			if (_onReady) {
				_onReady(cot_login_instance);
			}
		}

		super(options);

		this.isRelogin = false;
	}

	isLoggedIn(callback, withRelogin) {
		const _this = this;
		const isLoggedInHandler = !withRelogin ? callback : function(result) {
			if (result != CotSession.LOGIN_CHECK_RESULT_TRUE) {
				_this.isRelogin = true;
				_this.showLogin(function() {
					_this.isRelogin = false;
					_this.session.isLoggedIn(callback);
				});
			} else {
				callback(result);
			}
		}

		return this.session.isLoggedIn(isLoggedInHandler);
	}

	showLogin(callback) {
		if (callback) {
			this.modal
				.off('hidden.bs.modal')
				.on('hidden.bs.modal', function() { // e) {
					$(this).off('hidden.bs.modal');
					callback();
				});
		}
		super.showLogin();
	}
}

class DataTablesODataBridge {
	constructor() {}

	data() {
		const _this = this;
		return function(data) {

			// DRAW
			_this.draw = data.draw;

			const retData = {};

			// $COUNT
			retData['$count'] = 'true';

			// $ORDERBY
			if (data.order) {
				const $orderby = [];
				for (let i = 0, l = data.order.length; i < l; i++) {
					$orderby.push(data.columns[data.order[i].column].data + ' ' + data.order[i].dir);
				}
				retData['$orderby'] = $orderby.join(',');
			}

			// $SEARCH
			if (data.search && data.search.value) {
				// let $filter = [];
				// for (let i = 0, l = data.columns.length; i < l; i++) {
				// 	$filter.push('contains(' + data.columns[i].data + ',\'' + data.search.value + '\')');
				// }
				// $filter = ['contains(testdata,\'' + data.search.value + '\')'];
				// retData.$filter = $filter.join(' or ');
				retData.$search = '"' + data.search.value + '"';
			}

			// $SELECT
			// const $select = [];
			// for (var i = 0, l = data.columns.length; i < l; i++) {
			// 	$select.push(data.columns[i].data);
			// }
			// retData.$select = $select.join(',');

			// $filter
			//retData.$filter = '__Status ne \'DEL\'';

			// $TOP
			retData.$top = data.length;

			// $SKIP
			retData.$skip = data.start;

			const retVal = [];
			for (var k in retData) {
				retVal.push(k + '=' + retData[k]);
			}
			return retVal.join('&');
		}
	}

	dataFilter() {
		const _this = this;
		return function(data) {
			const dataObj = JSON.parse(data);
			const retData = {
				draw: _this.draw,
				recordsTotal: dataObj['@odata.count'],
				recordsFiltered: dataObj['@odata.count'],
				data: dataObj.value
			};
			return JSON.stringify(retData);
		}
	}
}

// CotSession.prototype.login = function(options) {
// 	options = $.extend({
// 		username: '', //the username to login with
// 		password: '', //the password to login with
// 		success: function() {}, //a function to call after a successful login
// 		error: function() {}, //a function to call after an unsuccessful login
// 		always: function() {} //a function to always call after the whole login attempt is complete
// 	}, options || {});
//
// 	var url = this.options.ccApiOrigin + this.options.ccApiPath + 'session?app=' + this.options.appName;
// 	var payload = {
// 		user: options.username,
// 		pwd: options.password
// 	};
// 	var that = this;
// 	$.post(url, payload, function(data) {
// 		if (!data['error']) {
// 			that._storeLogin(data);
// 			options.success();
// 		} else if (data.error === 'invalid_user_or_pwd') {
// 			options.error(null, 'Invalid username or password', data.error);
// 		}
// 	}).fail(function(jqXHR, textStatus, error) {
// 		options.error(jqXHR, textStatus, error);
// 	}).always(function() {
// 		options.always();
// 	});
// };

function loginGate(cotLogin) {
	return new Promise((resolve, reject) => {
		if (cotLogin.isLoggedIn()) {
			resolve();
		} else {
			cotLogin.showLogin(() => {
				if (cotLogin.isLoggedIn()) {
					resolve();
				} else {
					reject();
				}
			})
		}
	});
}
