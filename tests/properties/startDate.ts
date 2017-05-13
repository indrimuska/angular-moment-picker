import * as angular from 'angular';
import * as moment from 'moment';
import * as test from '../utility';

describe('Property `startDate`', () => {
	
	let format          = 'YYYY-MM-DD HH:mm:ss',
		startDate       = moment('2005-05-15 13:20:15', format),
		startDateStr    = '\'' + startDate.format(format) + '\'',
		expectedHeaders = {
			decade: '2000 - 2009',
			year:   '2005',
			month:  'May 2005',
			day:    'May 15, 2005',
			hour:   'May 15, 2005 1:00 PM',
			minute: 'May 15, 2005 1:20 PM'
		};
	
	// init test
	test.bootstrap();
	
	const getHeaderText = ($element: ng.IAugmentedJQuery) => angular.element(test.getPicker($element).find('.header-view th')[1]).text();
	
	// test all views
	angular.forEach(expectedHeaders, (expectedHeader, view) => {
		let viewName = view[0].toUpperCase() + view.slice(1),
			title    = 'should open ' + viewName + ' View in ' + expectedHeader;
		
		it(title, () => {
			let $propAsMoment = test.buildTemplate('div', { locale: 'en', format: format, startView: view, startDate: startDate }),
				$propAsString = test.buildTemplate('div', { locale: 'en', format: format, startView: view, startDate: startDateStr });
				
			// Moment object input
			expect(getHeaderText($propAsMoment)).toBe(expectedHeader);
			// string input
			expect(getHeaderText($propAsString)).toBe(expectedHeader);
		});
	});
});
