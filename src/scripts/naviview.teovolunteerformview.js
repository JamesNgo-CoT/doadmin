class TEOVolunteerFormView extends NaviView {
	constructor(sourceKey, instanceKey, navi, initOptions) {
		super(sourceKey, instanceKey, navi, initOptions);


		this.title = 'Volunteers';
		this.search = null
		this.actionMenuItems = null;
		this.contextualMenuItems = [
			{
				label: 'Menu 1',
				action: function() {},
				menuItems: null
			},
			{
				label: 'Menu 2',
				menuItems: [{
					label: 'Menu 2.1',
					action: function() {}
				}, {
					label: 'Menu 2.2',
					action: function() {}
				}, {
					label: 'Menu 2.3',
					action: function() {}
				}, {
					label: 'Menu 2.3',
					menuItems: [{
						label: 'Menu 2.3.3',
						action: function() {}
					}]
				}],
				action: null
			}
		]

		this.render();
	}

	render() {
		super.render();

		this.$topRegion.html(`
			<p>TOP</p>
			<div class="` + this.className + `_formWrapper"></div>
			<p>BOTTOM</p>
		`);

		const form = new CotForm({
			id: 'vForm',
			rootPath: '',
			success: function() {},

			sections: [{
				title: 'Volunteer Details',
				className: 'panel-info collapsable',

				rows: [{
					fields: [{
						id: 'vFName',
						title: 'First Name',
						type: 'text',
						required: true
					}]
				}, {
					fields: [{
						id: 'vLName',
						title: 'Last Name',
						type: 'text',
						required: true
					}]
				}, {
					fields: [{
						id: 'vAddress',
						title: 'Street Address',
						type: 'text'
					}]
				}, {
					fields: [{
						id: 'vCity',
						title: 'City',
						type: 'text'
					}]
				}, {
					fields: [{
						id: 'vPCode',
						title: 'Postal Code',
						type: 'text'
					}]
				}, {
					fields: [{
						id: 'vPhoneDay',
						title: 'Day Phone',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						id: 'vPhoneEve',
						title: 'Evening Phone',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						id: 'vPhoneCell',
						title: 'Cell Phone',
						type: 'text',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						id: 'vEmail',
						title: 'Email Address',
						type: 'text',
						validationType: 'Email'
					}]
				}, {
					fields: [{
						id: 'vAge',
						title: 'Over 14?',
						type: 'radio',
						orientation: 'horizontal',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}]
					}]
				}, {
					fields: [{
						id: 'vToronto',
						title: 'Live in Toronto',
						type: 'radio',
						orientation: 'horizontal',
						choices: [{
							text: 'Yes'
						}, {
							text: 'No'
						}]
					}]
				}, {
					fields: [{
						id: 'vLang',
						title: 'Languages Spoken',
						type: 'checkbox',
						orientation: 'horizontal',
						choices: [{
							text: 'Arabic'
						}, {
							text: 'Assyrian'
						}, {
							text: 'Cambodian'
						}, {
							text: 'Cantonese'
						}, {
							text: 'Croatian'
						}, {
							text: 'Czech'
						}, {
							text: 'Farsi'
						}, {
							text: 'French'
						}, {
							text: 'German'
						}, {
							text: 'Greek'
						}, {
							text: 'Gujarati'
						}, {
							text: 'Hebrew'
						}, {
							text: 'Hindi'
						}, {
							text: 'Hungarian'
						}, {
							text: 'Italian'
						}, {
							text: 'Japanese'
						}, {
							text: 'Konkani'
						}, {
							text: 'Korean'
						}, {
							text: 'Lithuanian'
						}, {
							text: 'Mandarin'
						}, {
							text: 'Marathi'
						}, {
							text: 'Norwegian'
						}, {
							text: 'Polish'
						}, {
							text: 'Portugese'
						}, {
							text: 'Romanian'
						}, {
							text: 'Russian'
						}, {
							text: 'Serbian'
						}, {
							text: 'Sindhi'
						}, {
							text: 'Spanish'
						}, {
							text: 'Swedish'
						}, {
							text: 'Tagalog'
						}, {
							text: 'Taiwanese'
						}, {
							text: 'Thai'
						}, {
							text: 'Turkish'
						}, {
							text: 'Vietnames'
						}, {
							text: 'Other'
						}]
					}]
				}, {
					fields: [{
						id: 'vLanguageOther',
						title: 'Other Languages'
					}]
				}, {
					fields: [{
						id: 'vSource',
						title: 'Details',
						type: 'checkbox',
						orientation: 'horizontal',
						choices: [{
							text: 'Internet'
						}, {
							text: 'Volunteer Placement Agency'
						}, {
							text: 'Current Volunteer'
						}, {
							text: 'City of Toronto Website'
						}, {
							text: 'Live Green Event'
						}, {
							text: 'Friend'
						}, {
							text: 'Career Fair'
						}, {
							text: 'Other'
						}]
					}]
				}, {
					fields: [{
						id: 'vSourceOther',
						title: 'Other Details'
					}]
				}]
			}, {
				title: 'Administration Details',
				className: 'panel-info ',

				rows: [{
					fields: [{
						id: 'vEmergName',
						title: 'Emergency Contact Name',
						type: 'text'
					}]
				}, {
					fields: [{
						id: 'vEmergRel',
						title: 'Emergency Contact Relationship',
						type: 'text'
					}]
				}, {
					fields: [{
						id: 'vEmergPhone',
						title: 'Emergency Contact Phone',
						type: 'text',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						id: 'vEmergPhoneAlt',
						title: 'Emergency Contact Alternative Phone',
						type: 'text',
						validationtype: 'Phone'
					}]
				}, {
					fields: [{
						id: 'vDateSubmitted',
						title: 'Date Submitted',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						id: 'vDateArchived',
						title: 'Date Archived',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						id: 'vDateApproved',
						title: 'Date Approved',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						id: 'vGradDate',
						title: 'Graduation Date',
						type: 'datetimepicker'
					}]
				}, {
					fields: [{
						id: 'vGraduate',
						title: 'Graduate?',
						type: 'radio',
						choices: [
							{ text: 'No' },
							{ text: 'Yes' }
						],
						orientation: 'horizontal'
					}]
				}, {
					fields: [{
						id: 'vAppStatus',
						title: 'Application Status',
						type: 'radio',
						choices: [
							{ text: 'New' },
							{ text: 'Approved' },
							{ text: 'Archived' }
						],
						orientation: 'horizontal'
					}]
				}, {
					fields: [{
						id: 'vAODA',
						title: 'AODA',
						type: 'radio',
						choices: [
							{ text: 'No' },
							{ text: 'Yes' }
						],
						orientation: 'horizontal'
					}]
				}, {
					fields: [{
						id: 'vStatus',
						title: 'Volunteer Status',
						type: 'radio',
						choices: [
							{ text: 'Active' },
							{ text: 'Unsubscribed' },
							{ text: 'Duplicate' }
						],
						orientation: 'horizontal'
					}]
				}, {
					fields: [{
						id: 'vForms',
						title: 'Forms',
						type: 'radio',
						choices: [
							{ text: 'Application' },
							{ text: 'Reference' },
							{ text: 'Media release' },
							{ text: 'Boundary form' },
							{ text: 'Roles & responsibilities' },
							{ text: 'Emergecy contact' },
							{ text: 'Waiver' }
						],
						orientation: 'horizontal'
					}]
				}, {
					fields: [{
						id: 'vNotes',
						title: 'Notes',
						type: 'textarea'
					}]
				}]
			}, {
				title: 'Volunteer Events',
				className: 'panel-info collapsable'
			}, {
				title: 'Uploades',
				className: 'panel-info collapsable'
			}]
		});

		form.render('.' + this.className + '_formWrapper');
		const $wrapper = $('.' + this.className + '_formWrapper', this.$topRegion);
		$('.panel.collapsable .panel-heading', $wrapper).append('<span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>');
		$('.panel.collapsable .panel-heading span.clickable', $wrapper).on('click', function(e) {
			var $this = $(this);
			if (!$this.hasClass('panel-collapsed')) {
				$this.parents('.panel').find('.panel-body').slideUp();
				$this.addClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			} else {
				$this.parents('.panel').find('.panel-body').slideDown();
				$this.removeClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			}
		});
	}

	show(options) {
		super.show(options);

		if (options && options.operation) {
			const operation = options.operation;
			switch (operation) {
				case 'new':
					this.title = 'New Volunteer';
					this.newVolunteer(options);
					break;
			}
		}
	}

	newVolunteer(options) {

	}
}
