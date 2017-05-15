import * as angular from 'angular';
import * as test from './utility';

describe('Element creation', () => {
	
	// init test
	test.bootstrap();
	
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
