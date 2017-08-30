class NaviBar extends Navi {

	/**
	 * @param {object} viewSources - Required.
	 * @param {string} viewSources[sourceKey].classObject - Optional.
	 * @param {string} viewSources[sourceKey].className - Optional.
	 * @param {string} viewSources[sourceKey].classUrl - Optional.
	 * @param {object} viewSources[sourceKey].initOptions - Optional.
	 */
	constructor(viewSources, defaultViewArguments, menuItems, cotLogin, loginRequired, loginViewArguments) {

		// Requirments check.
		if (!viewSources || !defaultViewArguments) {
			throw 'Error: NaviBar constructor missing required arguments (viewSources or defaultViewArguments).';
		}

		if (cotLogin) {
			for (var i = 0, l = viewSources.length; i < l; i++) {
				if (!viewSources[i].initOptions) {
					viewSources[i].initOptions = {};
				}
				viewSources[i].initOptions.cotLogin = cotLogin;
			}
		}

		super(viewSources);

		// Set properties.
		this.defaultViewArguments = defaultViewArguments;
		this.menuItems = menuItems || [];
		this.cotLogin = cotLogin;
		this.loginRequired = loginRequired;
		this.loginViewArguments = loginViewArguments;
		this.dynamicMenuItems = [];
		this.lock = null;

		// Attach UI placeholder.
		this.$placeholder = $('<div></div>');
		$('#app-content-top > div').append(this.$placeholder);

		// Start.
		this.openView();

		const _this = this;
		let isFix = false;
		let $navBar;
		let height;
		let pointOfChange;
		$(window).on('scroll', function(e) {
			const scrollTop = $(this).scrollTop();
			$navBar = $navBar || $('.navbar', _this.$placeholder);
			height = height || _this.$placeholder.height();
			pointOfChange = pointOfChange || _this.$placeholder.offset().top;

			if (isFix && scrollTop < pointOfChange) {
				$navBar.removeClass('navbar-fixed-top');
				isFix = false;
				_this.$placeholder.css('height', 'auto');
			} else if (!isFix && scrollTop >= pointOfChange) {
				$navBar.addClass('navbar-fixed-top');
				isFix = true;
				_this.$placeholder.css('height', height + 'px');
			}
		});
	}

	/**
	 * @param {object} argument[0] as viewObject - Required. NaviView object to show.
	 * @param {object} argument[1] as showOptions - Optional.
	 *
	 * @param {string} argument[0] as sourceKey - Required.
	 * @param {object} argument[1] as showOptions - Optional.
	 * @param {string} argument[2] as instanceKey - Optional.
	 * @param {boolean} argument[3] as autoInstanceKey - Optional.
	 */
	openView() {
		const _this = this;
		function done() {
			_this.render();
			if (callback) {
				callback();
			}
		}

		let arg = Array.prototype.slice.call(arguments);

		let callback;
		if (arg[0] instanceof NaviView) {
			callback = arg[2];
			arg[0] = arg[0] || null;
			arg[1] = arg[1] || null;
			arg[2] = done;
		} else if (typeof arg[0] == 'string') {
			callback = arg[4];
			arg[0] = arg[0] || null;
			arg[1] = arg[1] || null;
			arg[2] = arg[2] || null;
			arg[3] = arg[3] || null;
			arg[4] = done;
		}

		if (this.loginViewArguments && this.cotLogin && this.loginRequired && !this.cotLogin.isLoggedIn()) {

			const loginViewArguments = this.loginViewArguments;
			const sourceKey = loginViewArguments.sourceKey;
			const showOptions = loginViewArguments.showOptions;
			const instanceKey = loginViewArguments.instanceKey;
			const autoInstanceKey = loginViewArguments.autoInstanceKey;
			arg = [sourceKey, showOptions, instanceKey, autoInstanceKey, done];

		} else if (!arg[0]) {

			const defaultViewArguments = this.defaultViewArguments;
			const sourceKey = defaultViewArguments.sourceKey;
			const showOptions = defaultViewArguments.showOptions;
			const instanceKey = defaultViewArguments.instanceKey;
			const autoInstanceKey = defaultViewArguments.autoInstanceKey;
			arg = [sourceKey, showOptions, instanceKey, autoInstanceKey, done];

		}

		super.openView.apply(this, arg);
	}

	/**
	 * @param {object} viewObject - Required. NaviView object to remove.
	 */
	closeView(viewObject) {
		for (let i = 0, l = this.dynamicMenuItems.length; i < l; i++) {
			if (viewObject == this.dynamicMenuItems[i].viewObject) {
				this.dynamicMenuItems.splice(i, 1);
				break;
			}
		}

		super.closeView(viewObject);

		this.openView();
	}

	/**
	 * @param {string} sourceKey - Required.
	 * @param {string} instanceKey - Required.
	 */
	createView(sourceKey, instanceKey, callback) {
		const _this = this;
		function done() {
			const viewSource = _this.viewSources[sourceKey];
			_this.dynamicMenuItems.push(viewSource.instances[instanceKey]);
			if (callback) {
				callback();
			}
		}
		super.createView(sourceKey, instanceKey, done);
	}

	render() {
		if (!this.lock) {
			this.lock = $('.securesite').html();
			$('.securesite > img').detach();
		}

		// Event handler clean up to prevent memory leaks.
		$('.viewSearch', this.$placeholder).off('submit');
		$('.viewSearch > button, .actionMenuItem > a, .menuItem > a, .dynamicMenuItems > a, .navLogin > a, .navLogout > a', this.$placeholder).off('click');

		// Mustache JS Template
		const templ = `
			<nav class="navbar navbar-default">
				<div class="container-fluid">

					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#">{{viewObject.title}}</a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse" id="bs-navbar-collapse">
						<div class="navbar-right">

							{{#viewObject}}
							{{#search}}
							<form class="navbar-form navbar-left viewSearch">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Search">
								</div>
								<button type="submit" class="btn btn-default">Submit</button>
							</form>
							{{/search}}

							{{#contextualMenuItems.length}}
							<ul class="nav navbar-nav">
								{{#contextualMenuItems}}
									<li class="nav-item dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{label}} <span class="caret"></span></a>
										<ul class="dropdown-menu">
											{{#menuItems}}
											<li><a href="#">{{label}}</a></li>
											{{/menuItems}}
										</ul>
									</li>
								{{/contextualMenuItems}}
							</ul>
							{{/contextualMenuItems.length}}

							{{#actionMenuItems.length}}
							<ul class="nav navbar-nav">
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Actions <span class="caret"></span></a>
									<ul class="dropdown-menu">
										{{#actionMenuItems}}
										<li class="actionMenuItem"><a href="#">{{label}}</a></li>
										{{/actionMenuItems}}
									</ul>
								</li>
							</ul>
							{{/actionMenuItems.length}}
							{{/viewObject}}

							<ul class="nav navbar-nav">
								{{^cotLogin}}
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">View <span class="caret"></span></a>
									<ul class="dropdown-menu">
										{{#menuItems}}
										<li class="menuItem"><a href="#">{{label}}</a></li>
										{{/menuItems}}
										{{#dynamicMenuItems.length}}
										<li role="separator" class="divider"></li>
										{{#dynamicMenuItems}}
										<li class="dynamicMenuItem"><a href="#">{{^title}}Untitled{{/title}}{{#title}}{{.}}{{/title}}</a></li>
										{{/dynamicMenuItems}}
										{{/dynamicMenuItems.length}}
									</ul>
								</li>
								{{/cotLogin}}
								{{#cotLogin}}
								{{^isLoggedIn}}
								<li class="navLogin"><a href="#">Login</a></li>
								{{/isLoggedIn}}
								{{#isLoggedIn}}
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Views <span class="caret"></span></a>
									<ul class="dropdown-menu">
										{{#menuItems}}
										<li class="menuItem"><a href="#">{{label}}</a></li>
										{{/menuItems}}
										{{#dynamicMenuItems.length}}
										<li role="separator" class="divider"></li>
										{{#dynamicMenuItems}}
										<li class="dynamicMenuItem"><a href="#">{{^title}}Untitled{{/title}}{{#title}}{{.}}{{/title}}</a></li>
										{{/dynamicMenuItems}}
										{{/dynamicMenuItems.length}}
									</ul>
								</li>
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{username}} <span class="caret"></span></a>
									<ul class="dropdown-menu">
										<li class="navLogout"><a href="#">Logout</a></li>
									</ul>
								</li>
								{{/isLoggedIn}}
								{{/cotLogin}}
							</ul>

							<div class="nav navbar-nav lock">
								{{{lock}}}
							</div>
						</div> <!-- /.navbar-right -->
					</div><!-- /.navbar-collapse -->
				</div><!-- /.container-fluid -->
			</nav>
		`;

		// Mustache JS data.
		const data = {
			viewObject: this.lastViewObject,
			menuItems: this.menuItems,
			dynamicMenuItems: this.dynamicMenuItems,
			cotLogin: this.cotLogin,
			lock: this.lock
		};

		// Mustache JS render.
		const html = Mustache.render(templ, data);
		this.$placeholder.html(html);

		const _this = this;

		// Search textbox event handler
		const $viewSearch = $('.viewSearch', this.$placeholder);
		const $searchTextbox = $('input[type="text"]', $viewSearch);
		$viewSearch.on('submit', function(e) {
			e.preventDefault();
			_this.lastViewObject.search($searchTextbox.val(), $searchTextbox);
		});
		$('button', $viewSearch).on('click', function(e) {
			e.preventDefault();
			$viewSearch.trigger('submit');
		});

		// Action Menu items event handler.
		$('.actionMenuItem > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				_this.lastViewObject.actionMenuItems[i].action();
			});
		});

		// Menu items event handler.
		$('.menuItem > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewArguments = _this.menuItems[i].viewArguments;
				_this.openView(viewArguments.sourceKey, viewArguments.showOptions, viewArguments.instanceKey, viewArguments.autoInstanceKey);
			});
		});

		// Dynamic Menu items event handler.
		$('.dynamicMenuItem > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewObject = _this.dynamicMenuItems[i]; //.viewObject;
				_this.openView(viewObject);
			});
		});

		$('.navLogin > a', this.$placeholder).on('click', function(e) {
			_this.cotLogin.showLogin();
		});

		$('.navLogout > a', this.$placeholder).on('click', function(e) {
			_this.cotLogin.logout();
		});
	}
}
