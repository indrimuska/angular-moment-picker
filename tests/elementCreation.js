describe('Element creation', function () {
	
	// load the moment-picker module, which contains the directive
	beforeEach(module('moment-picker'));
	
	// store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function (_$rootScope_, _$compile_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
		$compile = _$compile_;
	}));
	
	// creating directive
	it('should create a .moment-picker element that transclude content', function () {
		var $element = buildTemplate('div', { class: 'my-content' }),
			$children = [],
			content;
		
		expect($element).toBeDefined();
		expect($element.hasClass('moment-picker')).toEqual(true);
		
		// it should have 2 children
		expect($element.children().length).toEqual(2);
		angular.forEach($element.children(), function (element) { $children.push(angular.element(element)); });
		
		// first child contains transcluded content
		expect($children[0].hasClass('moment-picker-contents')).toEqual(true);
		content = $children[0].children();
		expect(content.length).toEqual(1);
		expect(angular.element(content[0]).hasClass('my-content')).toEqual(true);
		
		// second child contains picker container
		expect($children[1].hasClass('moment-picker-container')).toEqual(true);
	});
	
	// check transcluded content
	it('should transclude DIV content', function () {
		var $element = buildTemplate('div', { class: 'my-content' }, 'My content'),
			$contents = angular.element($element[0].querySelectorAll('.moment-picker-contents')).children();
		
		expect($contents.length).toEqual(1);
		expect(angular.element($contents[0]).hasClass('my-content')).toEqual(true);
		expect(angular.element($contents[0]).text()).toEqual('My content');
	});
	
	// check transcluded content
	it('should transclude INPUT content', function () {
		var $element = buildTemplate('input', { class: 'my-content' }),
			$contents = angular.element($element[0].querySelectorAll('.moment-picker-contents')).children();
		
		expect($contents.length).toEqual(1);
		expect(angular.element($contents[0]).hasClass('my-content')).toEqual(true);
	});
});
