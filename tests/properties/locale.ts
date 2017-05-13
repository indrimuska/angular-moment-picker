import * as angular from 'angular';
import * as moment from 'moment';
import * as test from '../utility';

describe('Property `locale`', () => {

	let $rootScope: ng.IRootScopeService;

	// init test
	test.bootstrap();

	// get $rootScope service
	beforeEach(inject((_$rootScope_: ng.IRootScopeService) => { // tslint:disable-line:variable-name
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
	}));

	describe('Picker labels', () => {
		let format          = 'YYYY-MM-DD HH:mm:ss',
			startDate       = moment(),
			stringDivider   = '|',
			expectedHeaders = {
				month:  {},
				day:    {},
				hour:   {}
			};
		
		// build expected headers
		['en', 'it', 'fr', 'bn'].forEach((locale: string) => {
			let localeDate    = startDate.clone().locale(locale);
			const getWeekDays = () => moment.weekdays().map((day: string, i: number) => localeDate.clone().startOf('week').add(i, 'day').format('dd'));
			
			expectedHeaders.month[locale] = [localeDate.format('MMMM YYYY')].concat(getWeekDays()).join(stringDivider);
			expectedHeaders.day  [locale] = localeDate.format('LL');
			expectedHeaders.hour [locale] = localeDate.startOf('hour').format('lll');
		});

		const getHeader = ($element: ng.IAugmentedJQuery) => Array.prototype.slice.call(test.getPicker($element).find('th'), 0)
			.map((e: Node) => e.textContent)
			.filter((s: string) => s != '←' && s != '→')
			.join(stringDivider);
		
		it('should change locale dinamically', () => {
			angular.forEach(expectedHeaders, (header, view: string) => {
				let $scope = $rootScope.$new(),
					$input = test.buildTemplate('input', { locale: '\{\{locale\}\}', format: format, startView: view, startDate: startDate }, undefined, $scope);
				
				angular.forEach(header, (expectedHeader: string, locale: string) => {
					$scope['locale'] = locale;
					$scope.$apply();
					expect(getHeader($input)).toBe(expectedHeader);
				});
			});
		});
	});
});
