import * as angular from 'angular';
import * as moment from 'moment';
import * as test from '../utility';

describe('Property `isOpen`', () => {

	let $rootScope: ng.IRootScopeService;

	// init test
	test.bootstrap();

	// get $rootScope service
	beforeEach(inject((_$rootScope_: ng.IRootScopeService) => { // tslint:disable-line:variable-name
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
	}));
	
	const isVisible = ($element: ng.IAugmentedJQuery) => !$element.find('.moment-picker-container').hasClass('ng-hide');
	
	it('should open the picker when set to `true`', () => {
		let $picker = test.buildTemplate('input', { class: 'input-picker', isOpen: true });
		expect(isVisible($picker)).toBe(true);
	});

	it('should close the picker when set to `false`', () => {
		let $picker = test.buildTemplate('input', { class: 'input-picker', isOpen: false });
		expect(isVisible($picker)).toBe(false);
	});

	it('should open and close the picker again when toggling value', () => {
		let $scope  = $rootScope.$new(),
			$picker = test.buildTemplate('input', { class: 'input-picker', isOpen: 'isOpen' }, undefined, $scope);
		
		// value to toggle
		[true, false, true].forEach((value: boolean) => {
			$scope['isOpen'] = value;
			$scope.$digest();
			expect(isVisible($picker)).toBe(value);
		});
	});
});
