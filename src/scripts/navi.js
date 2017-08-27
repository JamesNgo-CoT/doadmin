/** Class to manage NaviView objects. */
class Navi {

	/**
	 * Initialize a new Navi object.
	 * @param {object} viewSources - Required.
	 * @param {string} viewSources[sourceKey].classObject - Required.
	 * @param {object} viewSources[sourceKey].initOptions - Optional.
	 */
	constructor(viewSources) {

		// Debug marker.
		window.debug('⚑ NAVI - CONSTRUCTOR', arguments);

		// Requirments check.
		if (!viewSources) {
			throw 'Error: Missing required arguments';
		}

		// Set properties.
		this.lastViewObject = null;
		this.viewSources = viewSources;
	}

	/**
	 * Opens a NaviView object.
	 *
	 * @param {object} argument[0] as viewObject - Required. NaviView object to show.
	 * @param {object} argument[1] as showOptions - Optional.
	 *
	 * @param {string} argument[0] as sourceKey - Required.
	 * @param {object} argument[1] as showOptions - Optional.
	 * @param {string} argument[2] as instanceKey - Optional.
	 * @param {boolean} argument[3] as autoInstanceKey - Optional.
	 */
	openView() {

		// Debug marker.
		window.debug('⚑ NAVI - OPEN VIEW METHOD', arguments);

		// Requirments check.
		if (!arguments[0]) {
			throw 'Error: Missing required arguments';
		}

		// Hide last NavView object.
		if (this.lastViewObject) {
			this.lastViewObject.hide();
		}

		// Get NaviView object.
		let viewObject;
		if (arguments[0] instanceof NaviView) {

			viewObject = arguments[0];

		} else if (typeof arguments[0] == 'string') {

			const sourceKey = arguments[0];

			// Requirments check.
			if (!this.viewSources[sourceKey]) {
				throw 'Error: Source key does not exist';
			}

			let instanceKey = arguments[2];
			const autoInstanceKey = arguments[3];

			// Finalize instance key.
			if (autoInstanceKey) {
				instanceKey = (new Date()).getTime() + ''
			} else if (!instanceKey) {
				instanceKey = sourceKey;
			}

			const viewSource = this.viewSources[sourceKey];

			// Create view object if missing.
			if (!viewSource.instances || !viewSource.instances[instanceKey]) {
				this.createView(sourceKey, instanceKey);
			}

			viewObject = viewSource.instances[instanceKey];

		} else {
			// Missing requirment.
			throw 'Error: Incorrect argument type';
		}

		// Set new last view object
		this.lastViewObject = viewObject;

		// Show NaviView object.
		const showOptions = arguments[1];
		viewObject.show(showOptions);
	}

	/**
	 * Remove a NaviView object from the Navi object.
	 *
	 * @param {object} viewObject - Required. NaviView object to remove.
	 */
	closeView(viewObject) {

		// Debug marker.
		window.debug('⚑ NAVI - CLOSE VIEW METHOD', arguments);

		// Requirments check.
		if (!viewObject) {
			throw 'Error: Missing required arguments';
		}

		// Hide and cleanup NaviView object.
		viewObject.hide();
		viewObject.destructor();

		const sourceKey = viewObject.sourceKey;
		const instanceKey = viewObject.instanceKey;

		this.viewSources[sourceKey].instances[instanceKey] = null;
		delete this.viewSources[sourceKey].instances[instanceKey];
	}

	createView(sourceKey, instanceKey) {
		const viewSource = this.viewSources[sourceKey];

		if (!viewSource.instances) {
			viewSource.instances = {};
		}

		viewSource.instances[instanceKey] = new viewSource.classObject(sourceKey, instanceKey, this, viewSource.initOptions);
	}
}


/** Navi Class but including UI */
class NaviBar extends Navi {

	/**
	 * @param {object} viewSources - Required.
	 * @param {string} viewSources[sourceKey].classObject - Required.
	 * @param {object} viewSources[sourceKey].initOptions - Optional.
	 */
	constructor(viewSources, defaultViewArguments, menuItems) {

		// Debug marker.
		window.debug('⚑ NAVIBAR - CONSTRUCTOR', arguments);

		// Requirments check.
		if (!viewSources || !defaultViewArguments) {
			throw 'Error: Missing required arguments';
		}

		super(viewSources);

		// Set properties.
		this.defaultViewArguments = defaultViewArguments;
		this.menuItems = menuItems || [];
		this.dynamicMenuItems = [];

		// Attach UI placeholder.
		this.$placeholder = $('<div></div>');
		$('#app-content-top > div').append(this.$placeholder);

		// Start.
		this.openView();
	}

	/**
	 * Opens a NaviView object.
	 *
	 * @param {object} argument[0] as viewObject - Required. NaviView object to show.
	 * @param {object} argument[1] as showOptions - Optional.
	 *
	 * @param {string} argument[0] as sourceKey - Required.
	 * @param {object} argument[1] as showOptions - Optional.
	 * @param {string} argument[2] as instanceKey - Optional.
	 * @param {boolean} argument[3] as autoInstanceKey - Optional.
	 */
	openView() {

		// Debug marker.
		window.debug('⚑ NAVIBAR - OPEN VIEW METHOD', arguments);

		let arg = Array.prototype.slice.call(arguments);

		if (!arg[0]) {
			const defaultViewArguments = this.defaultViewArguments;
			const sourceKey = defaultViewArguments.sourceKey;
			const showOptions = defaultViewArguments.showOptions;
			const instanceKey = defaultViewArguments.instanceKey;
			const autoInstanceKey = defaultViewArguments.autoInstanceKey;
			arg = [sourceKey, showOptions, instanceKey, autoInstanceKey];
		}

		super.openView.apply(this, arg);

		this.render();
	}

	/**
	 * Remove a NaviView object from the Navi object.
	 *
	 * @param {object} viewObject - Required. NaviView object to remove.
	 */
	closeView(viewObject) {

		// Debug marker.
		window.debug('⚑ NAVIBAR - CLOSE VIEW METHOD', arguments);

		for (let i = 0, l = this.dynamicMenuItems.length; i < l; i++) {
			if (viewObject == this.dynamicMenuItems[i].viewObject) {
				this.dynamicMenuItems.splice(i, 1);
				break;
			}
		}

		super.closeView(viewObject);
		this.openView();
	}

	createView(sourceKey, instanceKey) {
		super.createView(sourceKey, instanceKey);
		const viewSource = this.viewSources[sourceKey];
		this.dynamicMenuItems.push({
			label: viewSource.instances[instanceKey].title || 'UNTITLED',
			viewObject: viewSource.instances[instanceKey]
		});
	}

	render() {

		// Debug marker.
		window.debug('⚑ NAVIBAR - RENDER METHOD', arguments);

		const templ = `
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#">{{viewObject.title}}</a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<div class="navbar-right">
							<form class="navbar-form navbar-left">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Search">
								</div>
								<button type="submit" class="btn btn-default">Submit</button>
							</form>

						<ul class="nav navbar-nav">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Actions <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li><a href="#">Action</a></li>
									<li><a href="#">Another action</a></li>
									<li><a href="#">Something else here</a></li>
									<li role="separator" class="divider"></li>
									<li><a href="#">Separated link</a></li>
									<li role="separator" class="divider"></li>
									<li><a href="#">One more separated link</a></li>
								</ul>
							</li>
						</ul>

						<ul class="nav navbar-nav">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Views <span class="caret"></span></a>
								<ul class="dropdown-menu">
									{{#menuItems}}
									<li class="menuItems"><a>{{label}}</a></li>
									{{/menuItems}}
									{{#dynamicMenuItems.length}}
									<li role="separator" class="divider"></li>
									{{#dynamicMenuItems}}
									<li class="dynamicMenuItems"><a>{{label}}</a></li>
									{{/dynamicMenuItems}}
									{{/dynamicMenuItems.length}}
								</ul>
							</li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li><a href="#">Logout</a></li>
								</ul>
							</li>
						</ul>
					</div> <!-- /.navbar-right -->
					</div><!-- /.navbar-collapse -->
				</div><!-- /.container-fluid -->
			</nav>
		`;

		// Mustache JS data.
		const data = {
			viewObject: this.lastViewObject,
			menuItems: this.menuItems,
			dynamicMenuItems: this.dynamicMenuItems
		};

		// Mustache JS render.
		const html = Mustache.render(templ, data);
		this.$placeholder.html(html);

		// TODO - Search form event handler

		// TODO - Action menu items event handler

		const _this = this;

		// Menu items event handler.
		$('.menuItems > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewArguments = _this.menuItems[i].viewArguments;
				_this.openView(viewArguments.sourceKey, viewArguments.showOptions, viewArguments.instanceKey, viewArguments.autoInstanceKey);
			})
		});

		// TODO - Dynamic menu items event handler.
		// Menu items event handler.
		$('.dynamicMenuItems > a', this.$placeholder).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				const viewObject = _this.dynamicMenuItems[i].viewObject;
				_this.openView(viewObject);
			})
		});
	}
}


class NaviView {
	// constructor(options) {
	constructor(sourceKey, instanceKey, navi, initOptions) {

		// Debug marker.
		window.debug('⚑ NAVI VIEW - CONSTRUCTOR', arguments);
		window.debug(sourceKey, instanceKey, navi, initOptions);

		// if (!options || !options.sourceKey || !options.instanceKey || !options.navi) {
		if (!sourceKey || !instanceKey || !navi) {
			throw 'Error: Missing required arguments';
		}

		// Set properties.
		this.sourceKey = sourceKey;
		this.instanceKey = instanceKey;
		this.navi = navi;
		this.initOptions = initOptions;
		this.className = sourceKey.replace(/\s*/g, '') + '_' + instanceKey.replace(/\s*/g, '');
		this.title = 'NAVIVIEW';
	}

	destructor() {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - DESTRUCTOR', arguments);

		$('.' + this.className).detach();
	}

	hide() {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - HIDE METHOD', arguments);

		$('.' + this.className).hide();
	}

	show(options) {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - HIDE METHOD', arguments);

		$('.' + this.className).show();
	}

	render() {

		// Debug marker.
		window.debug('⚑ NAVI VIEW (\'' + this.className + '\') - RENDER METHOD', arguments);
	}
}
