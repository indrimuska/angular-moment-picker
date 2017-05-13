import * as angular from 'angular';
import { IDirectiveScopeInternal } from '../src/definitions';

let $compile, $timeout, $rootScope;

export const bootstrap = (): any => { // tslint:disable-line:no-any
	// load the moment-picker module, which contains the directive
	beforeEach(angular.mock.module('moment-picker'));
	
	// store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject((
		_$compile_: ng.ICompileService, // tslint:disable-line:variable-name
		_$timeout_: ng.ITimeoutService, // tslint:disable-line:variable-name
		_$rootScope_: ng.IRootScopeService, // tslint:disable-line:variable-name
	) => {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$timeout = _$timeout_;
		$rootScope = _$rootScope_;
	}));
};

export const $digest = () => $rootScope.$digest();

export const buildTemplate = (tag: string, options?: any, content?: any, $scope?: ng.IScope, $parent?: ng.IAugmentedJQuery) => { // tslint:disable-line:no-any
	let $template, $container, $element;
	if (!$scope) $scope = $rootScope.$new();
	tag = tag.toLowerCase();
	// template string
	let template = '<' + tag;
	// build attributes map
	if (!options) options = {};
	if (!options.momentPicker) options.momentPicker = 'mpTestFormattedString';
	if (tag === 'input' && !options.ngModel) options.ngModel = 'mpTestMomentObject';
	angular.forEach(options, (value, name) => {
		let valueStr = name;
		if (typeof value === 'string') valueStr = value;
		else $scope[name] = value;
		template += ' ' + name.replace(/([A-Z])/g, '-$1').toLowerCase() + '="' + valueStr + '"';
	});
	// close template
	template += tag === 'input' ? '>' : '></div>';
	$template = angular.element(template);
	if (tag !== 'input') {
		if (content) $template.append(content);
		else $template.append('{{' + options.momentPicker + '}}');
	}
	// append template to DOM
	$container = angular.element('<div></div>').append($template);
	angular.element($parent || document.body).append($container);
	// return compiled element
	$compile($parent || $container)($scope);
	$element = angular.element($container.children()[0]);
	$digest();
	$timeout.flush();
	return $element;
};

export const getPicker = (element: ng.IAugmentedJQuery) => (<IDirectiveScopeInternal>element.isolateScope()).picker;

// wrap jquery trigger fn: event trigger + digest stimulation
export const trigger = (element: ng.IAugmentedJQuery, event: string | JQueryEventObject) => {
	// use jquey trigger method to propagate event to parent nodes
	angular.element(element).trigger(<string>event);
	$digest();
};