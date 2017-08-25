class NaviView2 extends NaviView {
	constructor(options) {
		super(options);
	}

	_render() {
		$('#app-content-top > div').append('<div class="' + this.key + '">NAVI VIEW 2</div>');
		$('#app-content-left > div').append('<div class="' + this.key + '">NAVI VIEW 2</div>');
		$('#app-content-right > div').append('<div class="' + this.key + '">NAVI VIEW 2</div>');
		$('#app-content-bottom > div').append('<div class="' + this.key + '">NAVI VIEW 2 <a href="#" class="btn btn-default">CLOSE</a></div>');

		const _this = this;
		$('#app-content-bottom > div .' + this.key + ' .btn').on('click', function(e) {
			e.preventDefault();
			_this.close();
		});
	}
}

let cotApp;
let cotLogin;
let navi;

$(document).ready(function() {
	window.debug('DOCUMENT READY');

	cotApp = new cot_app('doadmin');
	cotApp.render(function() {
		window.debug('cotApp.render()', 'callback');

		cotApp.setTitle('');

		navi = new Navi({
			viewClasses: {
				'mainView': { classObj: NaviView, options: { nextViewKey: 'altView' }, standAlone: true },
				'altView': { classObj: NaviView2, options: null, standAlone: false }
			},
			menuItems: [{ key: 'mainView', options: null, title: 'MAIN VIEW' }],
			mainView: { key: 'mainView', options: null }
		});
	});
});
