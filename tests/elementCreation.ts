import * as angular from 'angular';
import * as test from './utility';

describe('Element creation', () => {
	
	// init test
	test.bootstrap();
	
	// creating directive
	it('should create a .moment-picker element that transclude content', () => {
		let $element = test.buildTemplate('div', { class: 'my-content' }),
			$children = [],
			content;
		
		expect($element).toBeDefined();
		expect($element.hasClass('moment-picker')).toBe(true);
		
		// it should have 2 children
		expect($element.children().length).toEqual(2);
		angular.forEach($element.children(), (element: ng.IAugmentedJQuery) => $children.push(angular.element(element)));
		
		// first child contains transcluded content
		expect($children[0].hasClass('moment-picker-contents')).toBe(true);
		content = $children[0].children();
		expect(content.length).toEqual(1);
		expect(angular.element(content[0]).hasClass('my-content')).toBe(true);
		
		// second child contains picker container
		expect($children[1].hasClass('moment-picker-container')).toBe(true);
	});
	
	// check transcluded DIV content
	it('should transclude DIV content', () => {
		let $element = test.buildTemplate('div', { class: 'my-content' }, 'My content'),
			$contents = $element.find('.moment-picker-contents').children();
		
		expect($contents.length).toEqual(1);
		expect(angular.element($contents[0]).hasClass('my-content')).toBe(true);
		expect(angular.element($contents[0]).text()).toEqual('My content');
	});
	
	// check transcluded INPUT content
	it('should transclude INPUT content', () => {
		let $element = test.buildTemplate('input', { class: 'my-content' }),
			$contents = $element.find('.moment-picker-contents').children();
		
		expect($contents.length).toEqual(1);
		expect(angular.element($contents[0]).hasClass('my-content')).toBe(true);
	});
});
