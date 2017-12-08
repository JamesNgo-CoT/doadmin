/* exported Navi */
/* global NaviView */

class Navi {

	/**
	 * @param {object} viewSources - Required.
	 * @param {string} viewSources[sourceKey].classObject - Optional.
	 * @param {string} viewSources[sourceKey].className - Optional.
	 * @param {string} viewSources[sourceKey].classUrl - Optional.
	 * @param {object} viewSources[sourceKey].initOptions - Optional.
	 */
	constructor(viewSources) {

		// Check requirement.
		if (!viewSources) {
			throw 'Error: Navi constructor missing required arguments (viewSources).';
		}

		// Set properties.
		this.viewSources = viewSources;

		// Set default properties.
		this.lastViewObject = null;
		this.loadedScripts = null;
	}

	/**
	 * @param {object} argument[0] as viewObject - Required.
	 * @param {object} argument[1] as showOptions - Optional.
	 * @param {function} argument[2] as callback - Optional.
	 *
	 * @param {string} argument[0] as sourceKey - Required.
	 * @param {object} argument[1] as showOptions - Optional.
	 * @param {string} argument[2] as instanceKey - Optional.
	 * @param {boolean} argument[3] as autoInstanceKey - Optional.
	 * @param {function} argument[4] as callback - Optional.
	 */
	openView() {
		// Hide last NavView object.
		if (this.lastViewObject) {
			this.lastViewObject.hide();
		}

		// Show current NaviView object
		if (arguments[0] instanceof NaviView) {
			// Scenario 1 - NaviView object.

			const viewObject = arguments[0];
			const showOptions = arguments[1];
			const callback = arguments[2];

			this.lastViewObject = viewObject;
			viewObject.show(showOptions);

			if (callback) {
				callback();
			}

		} else if (typeof arguments[0] == 'string') {
			// Scenario 2 - NaviView Arguments

			const sourceKey = arguments[0];
			const showOptions = arguments[1];
			let instanceKey = arguments[2];
			const autoInstanceKey = arguments[3];
			const callback = arguments[4];

			// Check requirments.
			if (!this.viewSources[sourceKey]) {
				throw 'Error: Navi openView() method source key does not exist in viewSources.';
			}

			// Finalize instance key.
			if (autoInstanceKey) {
				instanceKey = (new Date()).getTime() + ''
			} else if (!instanceKey) {
				instanceKey = sourceKey;
			}

			const viewSource = this.viewSources[sourceKey];

			// Callback for possible async operation.
			const _this = this;
			const done = () => {
				const viewObject = viewSource.instances[instanceKey];
				_this.lastViewObject = viewObject;
				viewObject.show(showOptions);

				if (callback) {
					callback();
				}
			}
			// Create view object if missing. Otherwise done().
			if (!viewSource.instances || !viewSource.instances[instanceKey]) {
				this.createView(sourceKey, instanceKey, done);
			} else {
				done();
			}
		} else {
			// Missing requirment.
			throw 'Error: Navi openView() method incorrect argument type (arguments[0]).';
		}
	}

	/**
	 * @param {object} viewObject - Required. NaviView object to remove.
	 */
	closeView(viewObject) {

		// Requirments check.
		if (!viewObject) {
			throw 'Error: Navi closeView() method missing required arguments (viewObject).';
		}

		if (this.lastViewObject === viewObject) {
			this.openView();
		}

		// Hide and cleanup NaviView object.
		viewObject.hide();
		viewObject.destructor();

		// Remove NaviView object from viewSources instance property.
		const sourceKey = viewObject.sourceKey;
		const instanceKey = viewObject.instanceKey;
		this.viewSources[sourceKey].instances[instanceKey] = null;
		delete this.viewSources[sourceKey].instances[instanceKey];
	}

	/**
	 * @param {string} sourceKey - Required.
	 * @param {string} instanceKey - Required.
	 */
	createView(sourceKey, instanceKey, callback) {

		// Requirments check.
		if (!sourceKey || !instanceKey) {
			throw 'Error: Navi createView() method missing required arguments (sourceKey and/or instanceKey).';
		}

		const viewSource = this.viewSources[sourceKey];

		if (!viewSource.instances) {
			viewSource.instances = {};
		}

		const _this = this;

		function done() {
			viewSource.instances[instanceKey] = new viewSource.classObject(sourceKey, instanceKey, _this, viewSource.initOptions);
			if (callback) {
				callback();
			}
		}

		if (!viewSource.classObject) {
			const className = viewSource.className;
			const classUrl = viewSource.classUrl;
			if (!this.loadedScripts) {
				this.loadedScripts = {};
			}
			if (!this.loadedScripts[classUrl]) {
				$.getScript(classUrl, function() { // script, textStatus, jqXHR) {
					viewSource.classObject = window[className];
					done();
				});
			} else {
				viewSource.classObject = window[className];
				done();
			}
		} else {
			done();
		}
	}
}
