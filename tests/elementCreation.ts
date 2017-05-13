import * as angular from 'angular';
import * as test from './utility';

describe('Element creation', () => {
	
	// init test
	test.bootstrap();
	
	// creating directive
	it('should create a `.moment-picker-reference` element that transclude content', () => {
		let $element = test.buildTemplate('div', { class: 'my-content' }),
			content;
		
		expect($element).toBeDefined();
		expect($element.hasClass('moment-picker-reference')).toBe(true);
		expect($element.hasClass('my-content')).toBe(true);
	});
	
	// check transcluded DIV content
	it('should transclude DIV content', () => {
		let $element = test.buildTemplate('div', { class: 'my-content' }, 'My content');
		
		expect($element.length).toEqual(1);
		expect(angular.element($element[0]).hasClass('my-content')).toBe(true);
		expect(angular.element($element[0]).text()).toEqual('My content');
	});
	
	// check transcluded INPUT content
	it('should transclude INPUT content', () => {
		let $element = test.buildTemplate('input', { class: 'my-content' });
		
		expect($element.length).toEqual(1);
		expect(angular.element($element[0]).hasClass('my-content')).toBe(true);
	});
});
