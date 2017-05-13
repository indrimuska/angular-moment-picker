import * as angular from 'angular';
import * as test from './utility';

describe('Open / close picker', () => {
	
	let $inputContent: ng.IAugmentedJQuery;
	let $divContent: ng.IAugmentedJQuery;

	// init test
	test.bootstrap();
	
	// create two pickers for all tests
	beforeEach(() => {
		// tslint:disable-next-line:no-unused-expression
		$inputContent = test.buildTemplate('input', { class: 'input-picker' });
		$divContent   = test.buildTemplate('div', { class: 'div-picker' });
	});
	
	const isVisible = ($element: ng.IAugmentedJQuery) => test.getPicker($element).is(':visible');
	
	// open picker on click
	it('should open the picker on click', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputContent)).toBe(true);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divContent)).toBe(true);
	});
	
	// open picker on focus
	// it('should open the picker on focus', () => {
	// 	test.trigger($inputContent, 'focus');
	// 	expect(isVisible($inputContent)).toBe(true);

	// 	test.trigger($divContent, 'focus');
	// 	expect(isVisible($divContent)).toBe(true);
	// });
	
	// close picker on blur
	it('should close the picker on blur', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputContent)).toBe(true);
		test.trigger($inputContent, 'blur');
		expect(isVisible($inputContent)).toBe(false);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divContent)).toBe(true);
		test.trigger($divContent, 'blur');
		expect(isVisible($divContent)).toBe(false);
	});
	
	// close picker clicking on another one
	it('should close a picker when clicking to another picker', () => {
		test.trigger($inputContent, 'click');
		expect(isVisible($inputContent)).toBe(true);
		
		test.trigger($divContent, 'click');
		expect(isVisible($divContent)).toBe(true);
		expect(isVisible($inputContent)).toBe(false);
	});
});
