var $compile, $timeout, $rootScope, momentPickerProvider;

var initTest = function () {
	// load the moment-picker module, which contains the directive
	beforeEach(module('moment-picker'));
	
	// store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function (_$compile_, _$timeout_, _$rootScope_, _momentPicker_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$timeout = _$timeout_;
		$rootScope = _$rootScope_;
		momentPickerProvider = _momentPicker_;
	}));
}

var $digest = function () {
	$rootScope.$digest();
}

var buildTemplate = function (tag, options, content) {
	var $template, $container, $element, $scope = $rootScope.$new();
	// template string
	var template = '<' + tag;
	// build attributes map
	if (!options) options = {};
	if (!options.momentPicker) options.momentPicker = 'mpTestFormattedString';
	angular.forEach(options, function (value, name) {
		var valueStr = typeof value === 'string' ? value : name;
		$scope[name] = value;
		template += ' ' + name.replace(/([A-Z])/g, '-$1').toLowerCase() + '="' + valueStr + '"';
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
	$compile($container)($scope);
	$element = angular.element($container.children()[0]);
	$digest();
	$timeout.flush();
	return $element;
};

// extending jQLite
angular.element.prototype.find = function (query) {
	return angular.element(this[0].querySelectorAll(query));
};
angular.element.prototype.ngTrigger = function (event) {
	// use jquey trigger method to propagate event to parent nodes
	this.trigger(event);
	$digest();
};

// fix PhantomJS missing blur-on-clickout features
var lastFocused;
angular.element(document.body).on('click', function (e) {
	if (lastFocused) lastFocused.ngTrigger('blur');
	lastFocused = angular.element(e.target);
});