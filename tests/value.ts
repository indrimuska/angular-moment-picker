import * as moment from 'moment';
import * as test from './utility';

describe('Value', () => {

	let $scope: ng.IScope;
	let $picker: ng.IAugmentedJQuery;
	let format = 'YYYY-MM-DD';

	// init test
	test.bootstrap();

	// same picker settings for all tests in this suite
	beforeEach(inject(($rootScope: ng.IRootScopeService) => {
		$scope  = $rootScope.$new();
		$picker = test.buildTemplate('input', { momentPicker: 'dateStr', ngModel: 'dateObj', format: format, class: 'my-input' }, undefined, $scope);
	}));
	
	// set Model Value from View Value
	it('should set Model Value from View Value', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// update Model Value
	it('should update View Value after Model Value update', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		// first set an initial date
		$scope['dateObj'] = dateObj;
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		// then change it and listen for value update
		dateObj = moment('2016-12-12', format);
		dateStr = dateObj.format(format);
		$scope['dateStr'] = dateStr;
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// set View Value from Model Value
	it('should set View Value from Model Value', () => {
		let dateObj = moment('2017-01-12', format),
			dateStr = dateObj.format(format);
		
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateStr);
		expect($picker.find('.my-input').val()).toBe(dateStr);
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
		dateObj = moment('2016-12-12', format);
		dateStr = dateObj.format(format);
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateStr);
		expect($picker.find('.my-input').val()).toBe(dateStr);
	});
	
	// same property for View Value and Model Value
	it('should update View Value after Model Value update when using the same property', () => {
		let date = moment('2017-01-12', format);
		
		$scope['date'] = date;
		$picker = test.buildTemplate('input', { momentPicker: 'date', ngModel: 'date', format: format, class: 'my-input' }, undefined, $scope);
		expect($scope['date'].isSame(date)).toBe(true);
		expect($picker.find('.my-input').val()).toBe(date.format(format));
	});
});
