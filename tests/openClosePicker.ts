import * as angular from 'angular';
import * as test from './utility';

describe('Open / close picker', () => {
	
	let $inputPicker: ng.IAugmentedJQuery;
	let $inputContent: ng.IAugmentedJQuery;
	let $divPicker: ng.IAugmentedJQuery;
	let $divContent: ng.IAugmentedJQuery;

	// init test
	test.bootstrap();
	
	// create two pickers for all tests
	beforeEach(() => {
		// tslint:disable-next-line:no-unused-expression
		$inputPicker  = test.buildTemplate('input', { class: 'input-picker' });
		$inputContent = $inputPicker.find('.moment-picker-input');
		$divPicker    = test.buildTemplate('div', { class: 'div-picker' });
		$divContent   = $divPicker.find('.moment-picker-input');
	});
	
	const isVisible = ($element: ng.IAugmentedJQuery) => !$element.find('.moment-picker-container').hasClass('ng-hide');
	
	// open picker on click
	it('should open the picker on click', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputPicker)).toBe(true);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divPicker)).toBe(true);
	});
	
	// open picker on focus
	// it('should open the picker on focus', () => {
	// 	test.trigger($inputContent, 'focus');
	// 	expect(isVisible($inputPicker)).toBe(true);

	// 	test.trigger($divContent, 'focus');
	// 	expect(isVisible($divPicker)).toBe(true);
	// });
	
	// close picker on blur
	it('should close the picker on blur', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputPicker)).toBe(true);
		test.trigger($inputContent, 'blur');
		expect(isVisible($inputPicker)).toBe(false);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divPicker)).toBe(true);
		test.trigger($divContent, 'blur');
		expect(isVisible($divPicker)).toBe(false);
	});
	
	// close picker clicking on another one
	it('should close a picker when clicking to another picker', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputPicker)).toBe(true);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divPicker)).toBe(true);
		expect(isVisible($inputPicker)).toBe(false);
	});
});
