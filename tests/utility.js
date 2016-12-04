var $rootScope, $compile;

var initTest = function () {
	// load the moment-picker module, which contains the directive
	beforeEach(module('moment-picker'));
	
	// store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function (_$rootScope_, _$compile_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
		$compile = _$compile_;
	}));
}

var $digest = function () {
	$rootScope.$digest();
}

var buildTemplate = function (tag, options, content) {
	var $template, $container, $element;
	// template string
	var template = '<' + tag;
	// build attributes map
	if (!options) options = {};
	if (!options.momentPicker) options.momentPicker = 'mpTestFormattedString';
	angular.forEach(options, function (value, name) {
		template += ' ' + name.replace(/([A-Z])/g, '-$1').toLowerCase() + '="' + value + '"';
	});
	// close template
	template += tag.toLowerCase() === 'input' ? '>' : '></div>';
	$template = angular.element(template);
	if (tag.toLowerCase() !== 'input') {
		if (content) $template.append(content);
		else $template.append('{{' + options.momentPicker + '}}');
	}
	// append template to DOM
	$container = angular.element('<div></div>');
	angular.element(document.body).append($container);
	$container.append($template);
	// return compiled element
	$compile($container)($rootScope);
	$element = angular.element($container.children()[0]);
	$digest();
	return $element;
};

// extending jQLite
angular.element.prototype.find = function (query) {
	return angular.element(this[0].querySelectorAll(query));
};
angular.element.prototype.ngTrigger = function (event) {
	if (this.trigger) this.trigger(event);
	this.triggerHandler(event);
	$digest();
};