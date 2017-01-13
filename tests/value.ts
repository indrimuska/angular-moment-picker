import * as moment from 'moment';
import * as test from './utility';

describe('Value', () => {

	let format  = 'YYYY-MM-DD';
	let $scope: ng.IScope;
	let $picker: ng.IAugmentedJQuery;

	// init test
	test.bootstrap();

	// same picker settings for all tests in this suite
	beforeEach(inject(($rootScope: ng.IRootScopeService) => {
		$scope  = $rootScope.$new();
		$picker = test.buildTemplate('input', { momentPicker: 'dateStr', ngModel: 'dateObj', format: format }, undefined, $scope);
	}));
	
	// set Model Value from View Value
	it('should set Model Value from View Value', () => {
		let dateObj = moment('2017-01-12', format);
		
		$scope['dateStr'] = dateObj.format(format);
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// update Model Value
	it('should update View Value after Model Value update', () => {
		let dateObj = moment('2017-01-12', format);
		
		$scope['dateObj'] = dateObj;
		$scope['dateStr'] = dateObj.format(format);
		$scope.$digest();
		dateObj           = moment('2016-12-12', format);
		$scope['dateStr'] = dateObj.format(format);
		$scope.$digest();
		expect($scope['dateObj'].isSame(dateObj)).toBe(true);
	});
	
	// set View Value from Model Value
	it('should set View Value from Model Value', () => {
		let dateObj = moment('2017-01-12', format);
		
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateObj.format(format));
	});
	
	// update View Value
	it('should update View Value after Model Value update', () => {
		let dateObj = moment('2017-01-12', format);
		
		$scope['dateObj'] = dateObj;
		$scope['dateStr'] = dateObj.format(format);
		$scope.$digest();
		dateObj           = moment('2016-12-12', format);
		$scope['dateObj'] = dateObj;
		$scope.$digest();
		expect($scope['dateStr']).toBe(dateObj.format(format));
	});
});
