class DashNaviView extends NaviView {
	constructor(options) {
		super(options);
		this.title = 'DASH NAVI VIEW';
		this.render();
	}

	render() {
		super.render();

		$('#app-content-top > div').append('<div class="' + this.options.key + '">NAVI VIEW</div>');
		$('#app-content-left > div').append('<div class="' + this.options.key + '">NAVI VIEW</div>');
		$('#app-content-right > div').append('<div class="' + this.options.key + '">NAVI VIEW</div>');
		$('#app-content-bottom > div').append('<div class="' + this.options.key + '">NAVI VIEW <a href="#" class="btn btn-default">Next</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.options.key + ' .btn').on('click', function(e) {
			e.preventDefault();

			window.debug('==========');
			window.debug('BUTTON CLICK', arguments);

			const navi = _this.options.navi;
			navi.openView({ key: _this.options.nextViewKey, showOptions: null, isNew: false });
		});
	}
}

class NaviView2 extends NaviView {
	constructor(options) {
		super(options);

		this.title = 'NAVI VIEW 2';
		this.render();
	}

	render() {
		$('#app-content-top > div').append('<div class="' + this.options.key + '">NAVI VIEW 2</div>');
		$('#app-content-left > div').append('<div class="' + this.options.key + '">NAVI VIEW 2</div>');
		$('#app-content-right > div').append('<div class="' + this.options.key + '">NAVI VIEW 2</div>');
		$('#app-content-bottom > div').append('<div class="' + this.options.key + '">NAVI VIEW 2 <a href="#" class="btn btn-default">CLOSE</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.options.key + ' .btn').on('click', function(e) {
			e.preventDefault();
			window.debug(_this.options.key);
			_this.options.navi.closeView({ key: _this.options.key });
		});
	}
}

// --------------------------------------------------

let cotApp;
let cotLogin;
let navi;

$(document).ready(function() {
	window.debug('=====');
	window.debug('DOCUMENT READY');

	cotApp = new cot_app('doadmin');
	cotApp.render(function() {
		window.debug('cotApp.render()');

		cotApp.setTitle('');

		navi = new Navi({
			viewClasses: {
				'mainView': {
					classObj: DashNaviView,
					initOptions: {
						nextViewKey: 'altView'
					},
					standAlone: true
				},
				'altView': {
					classObj: NaviView2,
					initOptions: null,
					standAlone: false
				}
			},
			menuItems: [{
				label: 'MAIN VIEW',
				viewClass: {
					key: 'mainView',
					showOptions: null
				}
			}],
			mainView: {
				key: 'mainView',
				showOptions: null
			}
		});
	});
});
