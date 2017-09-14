/* exported TEOAdministrationView */
/* global NaviView CotForm2 Mustache */

class TEOAdministrationView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);

		this.title = 'Administration';

		this.searchAvailable = false;
		this.search = null;
		this.actionMenuItems = null;
		this.inDynamicMenu = false;

		this.render();
	}

	render() {
		super.render();
	}

	show(showOpts) {
		super.show(showOpts);

		if (showOpts && showOpts.operation == 'update') {
			this.show_update(showOpts);
		} else {
			this.show_preview(showOpts);
		}
	}

	show_preview() { // showOpts) {}
		const _this = this;

		function done() {
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
						const id = previewFormDef.sections[i1].rows[i2].fields[i3].id;
						previewFormDef.sections[i1].rows[i2].fields[i3].type = 'static';
						previewFormDef.sections[i1].rows[i2].fields[i3].bindTo = null;
						previewFormDef.sections[i1].rows[i2].fields[i3].value = _this.model.get(id) || '-'; //model.get(previewFormDef.sections[i1].rows[i2].fields[i3].id);
					}
				}
			}

			const template = `
				<p>
					<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
					<button type="button" class="btn btn-default btn-update" style="margin: 0;">Update</button>
				</p>

				<div class="{{classname}}_formWrapper"></div>

				<p>
					<button type="button" class="btn btn-default btn-reload" style="margin: 0;">Reload</button>
					<button type="button" class="btn btn-default btn-update" style="margin: 0;">Update</button>
				</p>
			`;

			_this.$topRegion.empty().html(Mustache.render(template, {
				classname: _this.className
			}));

			$('.btn-update', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				console.log('click');
				_this.show({
					operation: 'update'
				});
			});

			_this.form = new CotForm2(previewFormDef);
			_this.form.render('.' + _this.className + '_formWrapper');
		}

		this.action_getConfig(done);
	}

	show_update() { // showopts) {
		const _this = this;

		function done() {
			const template = `
				<p>
					<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancel</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
				</p>

				<div class="{{classname}}_formWrapper"></div>

				<p>
					<button type="button" class="btn btn-default btn-cancel" style="margin: 0;">Cancelm</button>
					<button type="button" class="btn btn-default btn-save" style="margin: 0;">Save</button>
				</p>
			`;

			_this.$topRegion.empty().html(Mustache.render(template, {
				classname: _this.className
			}));

			$('.btn-cancel', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.show();
			});
			$('.btn-save', _this.$topRegion).on('click', function(e) {
				e.preventDefault();
				_this.action_submit();
			});

			_this.form = new CotForm2(_this.formDef);
			_this.form.render('.' + _this.className + '_formWrapper');
			_this.form.setModel(_this.model);
		}

		this.action_getConfig(done);
	}

	action_submit() {
		const data = {
			ConfigContent: btoa(JSON.stringify(this.model.toJSON())),
			ContentType:"application/json",
			QualifiedName:"TEOVolunteer/administration.json"
		};
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_config/v2/ConfigService.svc/ConfigSet(\'TEOVolunteer/administration.json\')';
		$.ajax(url, {
			headers: {
				'Authorization': 'AuthSession ' + _this.initOptions.cotLogin.sid
			},
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			dataType: 'JSON',
			error: function error(jqXHR, textStatus, errorThrown) {
				alert('An error has occured. ', errorThrown);
			},
			method: 'PUT',
			success: function success() { // data, textStatus, jqXHR) {
				alert('Configuration Saved');
			}
		});
	}

	action_getConfig(cbk) {
		const _this = this;
		const url = 'https://was-intra-sit.toronto.ca/c3api_config/v2/ConfigService.svc/ConfigSet(\'TEOVolunteer/administration.json\')?$format=application/json';
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
				const config = data.ConfigContent ? JSON.parse(atob(data.ConfigContent)) : {};

				_this.model = new CotModel(config);
				_this.formDef = {
					id: this.className + '_admin',
					rootPath: '',
					success: function(e) {
						e.preventDefault();
						_this.action_submit();
						return false;
					},
					useBinding: true,
					sections: [{
						title: 'Configuration',
						className: 'panel-info',
						rows: []
					}]
				};

				for (var k in config) {
					_this.formDef.sections[0].rows.push({
						fields: [{
							id: k,
							title: k,
							value: config[k],
							bindTo: k
						}]
					});
				}

				cbk();
			}
		});
	}
}
