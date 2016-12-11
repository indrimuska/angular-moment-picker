describe('Properties: `startDate`', function () {
	
	var format          = 'YYYY-MM-DD HH:mm:ss',
		startDate       = moment('2005-05-15 13:20:15', format),
		startDateStr    = "'" + startDate.format(format) + "'",
		expectedHeaders = {
			decade: '2000 - 2009',
			year:   '2005',
			month:  'May 2005',
			day:    'May 15, 2005',
			hour:   'May 15, 2005 1:00 PM',
			minute: 'May 15, 2005 1:20 PM'
		};
	
	// init test
	initTest();
	
	function getHeaderText($element) {
		return angular.element($element.find('.header-view th')[1]).text();
	}
	
	// test all views
	angular.forEach(expectedHeaders, function (expectedHeader, view) {
		var viewName = view.toUpperCase(),
			title    = 'should open ' + viewName + ' View in ' + expectedHeader;
		
		it(title, function () {
			var $propAsMoment  = buildTemplate('div', { locale: 'en', format: format, startView: view, startDate: startDate }),
				$propAsString  = buildTemplate('div', { locale: 'en', format: format, startView: view, startDate: startDateStr });
				
			// Moment object input
			expect(getHeaderText($propAsMoment)).toBe(expectedHeader);
			// string input
			expect(getHeaderText($propAsString)).toBe(expectedHeader);
		});
	});
});
