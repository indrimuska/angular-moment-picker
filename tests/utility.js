var $rootScope, $compile;

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
		else $template.append('{{ ' + options.momentPicker + ' }}');
	}
	// append template to DOM
	$container = angular.element('<div></div>');
	$container.append($template);
	// return compiled element
	$compile($container)($rootScope);
	$element = angular.element($container.children()[0]);
	$rootScope.$digest();
	return $element;
};