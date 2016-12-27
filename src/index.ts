import * as angular from 'angular';
import Provider from './provider';
import Directive from './directive';

angular
	.module('moment-picker', [])
	.provider('momentPicker', [() => new Provider()])
	.directive('momentPicker', [
		'$timeout', '$sce', '$log', '$window', 'momentPicker',
		($timeout: ng.ITimeoutService, $sce: ng.ISCEService, $log: ng.ILogService, $window: ng.IWindowService, momentPicker: Provider) => {
			return new Directive($timeout, $sce, $log, $window, momentPicker);
		}
	]);

export { Provider, Directive };