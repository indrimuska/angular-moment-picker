import * as moment from 'moment';
import * as test from './utility';

describe('Value', () => {

	let $scope: ng.IScope;
	let $input: ng.IAugmentedJQuery;
	let format = 'YYYY-MM-DD';

	// init test
	test.bootstrap();

	// same picker settings for all tests in this suite
	beforeEach(inject(($rootScope: ng.IRootScopeService) => {
		$scope = $rootScope.$new();
		$input = test.buildTemplate('input', { momentPicker: 'dateStr', ngModel: 'dateObj', format: format }, undefined, $scope);
	}));
	
	// set Model Value from View Value
	it('should initialize Model Value from View Value', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// set View Value from Model Value
	it('should initialize View Value from Model Value', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateStr);
		expect($input.val()).toBe(dateStr);
	});
	
	// update Model Value
	it('should update Model Value after View Value update', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		// first set an initial date
		$scope['dateObj'] = dateObj;
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		// then change it and listen for value update
		dateObj = moment('2016-11-23', format);
		dateStr = dateObj.format(format);
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// update View Value
	it('should update View Value after Model Value update', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		// first set an initial date
		$scope['dateObj'] = dateObj;
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		// then change it and listen for value update
		dateObj = moment('2016-11-23', format);
		dateStr = dateObj.format(format);
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateStr);
		expect($input.val()).toBe(dateStr);
	});
	
	// same property for View Value and Model Value
	it('should update (View) Value when using the same property value', () => {
		let date = moment('2017-01-12', format);
		
		$scope['date'] = date;
		$input = test.buildTemplate('input', { momentPicker: 'date', ngModel: 'date', format: format }, undefined, $scope);
		expect($scope['date'].isSame(date)).toBe(true);
		expect($input.val()).toBe(date.format(format));
	});

	// sync model across pickers
	it('should sync model updates across pickers', () => {
		let dateFormat = 'YYYY-MM-DD',
			timeFormat = 'HH:mm',
			$date = test.buildTemplate('input', { momentPicker: 'date', ngModel: 'datetime', format: dateFormat }, undefined, $scope),
			$time = test.buildTemplate('input', { momentPicker: 'time', ngModel: 'datetime', format: timeFormat }, undefined, $scope);
		
		$scope['datetime'] = moment('2017-01-12 20:32', dateFormat + ' ' + timeFormat);
		$scope.$digest();
		expect($date.val()).toBe($scope['datetime'].format(dateFormat));
		expect($time.val()).toBe($scope['datetime'].format(timeFormat));
		expect($scope['date']).toBe($scope['datetime'].format(dateFormat));
		expect($scope['time']).toBe($scope['datetime'].format(timeFormat));

		$scope['date'] = '2015-08-29';
		$scope.$digest();
		expect($date.val()).toBe($scope['date']);
		expect($scope['datetime'].format(dateFormat)).toBe($scope['date']);

		$scope['time'] = '23:11';
		$scope.$digest();
		expect($time.val()).toBe($scope['time']);
		expect($scope['datetime'].format(timeFormat)).toBe($scope['time']);

		expect($scope['datetime'].format(dateFormat + ' ' + timeFormat)).toBe('2015-08-29 23:11');
	});
});
