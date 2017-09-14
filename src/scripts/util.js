/* exported CotForm2 DataTablesODataBridge */
/* global CotForm */

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
	var bindableTypes = ['daterangepicker', 'datetimepicker','text', 'dropdown', 'textarea', 'checkbox', 'radio', 'password', 'multiselect'];
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
CotForm2.prototype._watchChanges = function() {
	var form = this;
	if (this._isRendered) {
		(this._definition['sections'] || []).forEach(function(sectionInfo) {
			(sectionInfo['rows'] || []).forEach(function(row) {
				(row['fields'] || []).forEach(function(field) {
					//TODO: support grids
					if (field['bindTo']) {
						if (field['type'] == 'radio') {
							$('input[name="' + field['id'] + '"]').on('click', function(e) {
								if (form._model) {
									form._model.set(field['bindTo'], $(e.currentTarget).val());
								}
							});
						} else if (field['type'] == 'checkbox') {
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
						} else if (field['type'] == 'datetimepicker') {
							/*
							modify this section to match the chosen corejs CotForm date picker.
							current date picker: https://github.com/Eonasdan/bootstrap-datetimepicker/issues
							 */
							$("#" + field['id']).parent().on('dp.change', function() { // (e) {
								if (form._model) {
									form._model.set(field['bindTo'], $("#" + field['id']).val());
								}
							});
						} else if (field['type'] == 'daterangepicker') {
							$("#" + field['id']).on('apply.daterangepicker', function() {
								if (form._model) {
									form._model.set(field['bindTo'], $(this).val());
								}
							});
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
