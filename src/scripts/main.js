/* exported baseConfigUrl baseEntityUrl baseUploadUrl baseURL baseUploadSubmitUrl baseUploadKeepUrl baseBinUtilUrl */
/* global NaviBar CotLoginExt */

const baseURL = ''; // 'https://insideto-secure.toronto.ca'; // 'https://was-intra-sit.toronto.ca';
const baseEntityUrl = baseURL + '/c3api_data/v2/DataAccess.svc/live_green_volunteer';
const baseConfigUrl = baseURL + '/c3api_config/v2/ConfigService.svc/ConfigSet';
const baseUploadUrl = baseURL + '/cc_sr_admin_v1/upload/live_green_volunteer';
const baseUploadSubmitUrl = baseURL + '/cc_sr_admin_v1/upload/live_green_volunteer/live_green_volunteer';
const baseUploadKeepUrl = baseURL + '/cc_sr_admin_v1/submit/live_green_volunteer?keepFiles=';
const baseBinUtilUrl = baseURL + '/cc_sr_admin_v1/submit/binUtils/live_green_volunteer'

$.fn.oDataTable.headerWrapperString = '<div style="margin-right: -15px;"></div>';

let cotApp;
let cotLogin;
let navi;

$(document).ready(function() {

	cotApp = new cot_app('Live Green Volunteer Admin');
	cotApp.render(function() {

		// cotApp.setTitle('Live Green Volunteer Admin');

		cotLogin = new CotLoginExt({
			appName: 'live_green_volunteer',
			ccRoot: baseURL, // 'https://insideto-secure.toronto.ca',
			welcomeSelector: null,
			onReady: function() { // (cot_login_instance) {
				const viewSources = {
					'loginView': {
						classObject: null,
						className: 'LoginView',
						classUrl: 'scripts/naviview.loginview.js',
						initOptions: null
					},
					'dashboardView': {
						classObject: null,
						className: 'TEODashView',
						classUrl: 'scripts/naviview.teodashview.js',
						initOptions: {
							formView: 'volunteerFormView'
						}
					},
					'volunteersView': {
						classObject: null,
						className: 'TEOVolunteersView',
						classUrl: 'scripts/naviview.teovolunteersview.js',
						initOptions: {
							formView: 'volunteerFormView'
						}
					},
					'volunteerFormView': {
						classObject: null,
						className: 'TEOVolunteerFormView',
						classUrl: 'scripts/naviview.teovolunteersview.js',
						initOptions: {
							tableView: 'volunteersView',
							registrationForm: 'registrationFormView'
						}
					},
					'eventsView': {
						classObject: null,
						className: 'TEOEventsView',
						classUrl: 'scripts/naviview.teoeventsview.js',
						initOptions: {
							formView: 'eventFormView'
						}
					},
					'eventFormView': {
						classObject: null,
						className: 'TEOEventFormView',
						classUrl: 'scripts/naviview.teoeventsview.js',
						initOptions: {
							registrationForm: 'registrationFormView'
						}
					},
					'registrationsView': {
						classObject: null,
						className: 'TEORegistrationsView',
						classUrl: 'scripts/naviview.teoregistrationsview.js',
						initOptions: {
							formView: 'registrationFormView'
						}
					},
					'registrationFormView': {
						classObject: null,
						className: 'TEORegistrationFormView',
						classUrl: 'scripts/naviview.teoregistrationsview.js',
						initOptions: null
					},
					'administrationView': {
						classObject: null,
						className: 'TEOAdministrationView',
						classUrl: 'scripts/naviview.teoadministrationview.js',
						initOptions: null
					}
				};

				const defaultViewArguments = {
					sourceKey: 'dashboardView',
					showOptions: null,
					instanceKey: null,
					autoInstanceKey: false
				};
				// TODO - Temporary Only. Restore above comments
				// const defaultViewArguments = {
				// 	sourceKey: 'volunteerFormView',
				// 	showOptions: { operation: 'new' },
				// 	instanceKey: 'add',
				// 	autoInstanceKey: false
				// };

				const menuItems = [{
						label: 'Dashboard',
						viewArguments: {
							sourceKey: 'dashboardView',
							showOptions: null
						}
					},
					{
						label: 'Volunteers',
						viewArguments: {
							sourceKey: 'volunteersView',
							showOptions: null
						}
					},
					{
						label: 'Events',
						viewArguments: {
							sourceKey: 'eventsView',
							showOptions: null
						}
					},
					{
						label: 'Registrations',
						viewArguments: {
							sourceKey: 'registrationsView',
							showOptions: null
						}
					}, {
						label: 'Administration',
						viewArguments: {
							sourceKey: 'administrationView',
							showOptions: null
						}
					}
				];

				const loginRequired = true;

				const loginViewArguments = {
					sourceKey: 'loginView',
					showOptions: null,
					instanceKey: null,
					autoInstanceKey: false
				};

				navi = new NaviBar(viewSources, defaultViewArguments, menuItems, cotLogin, loginRequired, loginViewArguments);
			},
			onLogin: function() { // (cot_login_instance) {
				if (navi) {
					navi.closeView(navi.lastViewObject);
				}
			},
		});
	});
});
