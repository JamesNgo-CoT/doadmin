class DashNaviView extends NaviView {
	constructor(options) {
		super(options);
		this.title = 'DASH NAVI VIEW';
		this.render();
	}

	render() {
		super.render();

		$('#app-content-top > div').append('<div class="' + this.className + '">NAVI VIEW</div>');
		$('#app-content-left > div').append('<div class="' + this.className + '">NAVI VIEW</div>');
		$('#app-content-right > div').append('<div class="' + this.className + '">NAVI VIEW</div>');
		$('#app-content-bottom > div').append('<div class="' + this.className + '">NAVI VIEW <a href="#" class="btn btn-default">Next</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.className + ' .btn').on('click', function(e) {
			e.preventDefault();

			window.debug('==========');
			window.debug('BUTTON CLICK', arguments);

			const navi = _this.navi;
			navi.openView({ classKey: _this.nextViewKey, showOptions: null, autoInstanceKey: true });
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
		$('#app-content-top > div').append('<div class="' + this.className + '">NAVI VIEW 2</div>');
		$('#app-content-left > div').append('<div class="' + this.className + '">NAVI VIEW 2</div>');
		$('#app-content-right > div').append('<div class="' + this.className + '">NAVI VIEW 2</div>');
		$('#app-content-bottom > div').append('<div class="' + this.className + '">NAVI VIEW 2 <a href="#" class="btn btn-default">CLOSE</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.className + ' .btn').on('click', function(e) {
			e.preventDefault();

			window.debug('==========');
			window.debug('BUTTON CLICK', arguments);

			// _this.navi.closeView({ classKey: _this.key });
			_this.navi.closeView({ viewObject: _this });
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
					}
				},
				'altView': {
					classObj: NaviView2,
					initOptions: null
				}
			},
			menuItems: [{
				label: 'MAIN VIEW',
				viewClass: {
					classKey: 'mainView',
					showOptions: null
				}
			}],
			mainView: {
				classKey: 'mainView',
				showOptions: null
			}
		});
	});
});
