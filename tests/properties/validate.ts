import * as angular from 'angular';
import * as moment from 'moment';
import * as test from '../utility';

describe('Property `validate`', () => {
	
	let $rootScope: ng.IRootScopeService;

	// init test
	test.bootstrap();

	// get $rootScope service
	beforeEach(inject((_$rootScope_: ng.IRootScopeService) => { // tslint:disable-line:variable-name
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
	}));
	
	const buildFormScope = (options) => {
		let $scope = $rootScope.$new(),
			$form  = angular.element('<form name="form">').appendTo(document.body),
			$input = test.buildTemplate('input', options, undefined, $scope, $form);
		return $scope;
	};
	
	describe('set to false', () => {
		// required
		it('should raise `required` validation error', () => {
			let $scope = buildFormScope({ name: 'date', validate: 'false', required: 'true' });
			expect($scope['form'].date.$error.required).toBe(true);
		});
		
		// minDate
		it('should raise `minDate` validation error', () => {
			let format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				minDate = ngModel.clone().add(1, 'month'),
				$scope  = buildFormScope({ name: 'date', validate: 'false', format: format, ngModel: ngModel, minDate: minDate });
			
			expect($scope['form'].date.$error.minDate).toBe(true);
		});
		
		// maxDate
		it('should raise `maxDate` validation error', () => {
			let format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				maxDate = ngModel.clone().subtract(1, 'month'),
				$scope  = buildFormScope({ name: 'date', validate: 'false', format: format, ngModel: ngModel, maxDate: maxDate });
			
			expect($scope['form'].date.$error.maxDate).toBe(true);
		});
	});
	
	describe('set to true', () => {
		// required
		it('should raise `required` validation error', () => {
			let $scope = buildFormScope({ name: 'date', validate: 'true', required: 'true' });
			expect($scope['form'].date.$error.required).toBe(true);
		});
		
		// minDate
		it('should set date to minimum allowable value', () => {
			let format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				minDate = ngModel.clone().add(1, 'month'),
				$scope  = buildFormScope({ validate: 'true', format: format, ngModel: ngModel, minDate: minDate });
			
			expect($scope['ngModel'].isSame(minDate)).toBe(true);
		});
		
		// maxDate
		it('should set date to maximum allowable value', () => {
			let format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				maxDate = ngModel.clone().subtract(1, 'month'),
				$scope  = buildFormScope({ validate: 'true', format: format, ngModel: ngModel, maxDate: maxDate });
			
			expect($scope['ngModel'].isSame(maxDate)).toBe(true);
		});
	});
});
