/* global NaviBar CotLoginExt */

let cotApp;
let cotLogin;
let navi;

$(document).ready(function() {

	cotApp = new cot_app('doadmin');
	cotApp.render(function() {

		cotApp.setTitle('Live Green Volunteer Admin');

		// cotLogin = new cot_login({
		cotLogin = new CotLoginExt({
			appName: 'c3app',
			ccRoot: 'https://insideto-secure.toronto.ca',
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
						initOptions:  {
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
