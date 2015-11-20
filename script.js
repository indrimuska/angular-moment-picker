(function (angular) {
	
	var language = navigator.language || navigator.userLanguage,
		locales = [
			{ code: 'af', label: 'Afrikaans' },
			{ code: 'sq', label: 'Albanian' },
			{ code: 'ar', label: 'Arabic' },
			{ code: 'ar-ma', label: 'Arabic (Morocco)' },
			{ code: 'ar-sa', label: 'Arabic (Saudi Arabia)' },
			{ code: 'ar-tn', label: 'Arabic (Tunisia)' },
			{ code: 'hy-am', label: 'Armenian' },
			{ code: 'az', label: 'Azerbaijani' },
			{ code: 'id', label: 'Bahasa Indonesia' },
			{ code: 'ms-my', label: 'Bahasa Melayu (Malaysia)' },
			{ code: 'eu', label: 'Basque' },
			{ code: 'be', label: 'Belarusian' },
			{ code: 'bn', label: 'Bengali' },
			{ code: 'bs', label: 'Bosnian' },
			{ code: 'br', label: 'Breton' },
			{ code: 'bg', label: 'Bulgarian' },
			{ code: 'my', label: 'Burmese' },
			{ code: 'ca', label: 'Catalan' },
			{ code: 'zh-cn', label: 'Chinese (Simplified)' },
			{ code: 'zh-tw', label: 'Chinese (Traditional)' },
			{ code: 'cv', label: 'Chuvash' },
			{ code: 'hr', label: 'Croatian' },
			{ code: 'cs', label: 'Czech' },
			{ code: 'da', label: 'Danish' },
			{ code: 'nl', label: 'Dutch' },
			{ code: 'en-au', label: 'English (Australia)' },
			{ code: 'en-ca', label: 'English (Canada)' },
			{ code: 'en-gb', label: 'English (United Kingdom)' },
			{ code: 'en', label: 'English (United States)' },
			{ code: 'eo', label: 'Esperanto' },
			{ code: 'et', label: 'Estonian' },
			{ code: 'fo', label: 'Farose' },
			{ code: 'fi', label: 'Finnish' },
			{ code: 'fr', label: 'French' },
			{ code: 'fr-ca', label: 'French (Canada)' },
			{ code: 'fy', label: 'Frisian' },
			{ code: 'gl', label: 'Galician' },
			{ code: 'ka', label: 'Georgian' },
			{ code: 'de', label: 'German' },
			{ code: 'de-at', label: 'German (Austria)' },
			{ code: 'el', label: 'Greek' },
			{ code: 'he', label: 'Hebrew' },
			{ code: 'hi', label: 'Hindi' },
			{ code: 'hu', label: 'Hungarian' },
			{ code: 'is', label: 'Icelandic' },
			{ code: 'it', label: 'Italian' },
			{ code: 'ja', label: 'Japanese' },
			{ code: 'km', label: 'Khmer (Cambodia)' },
			{ code: 'ko', label: 'Korean' },
			{ code: 'lv', label: 'Latvian' },
			{ code: 'lt', label: 'Lithuanian' },
			{ code: 'lb', label: 'Luxembourgish' },
			{ code: 'mk', label: 'Macedonian' },
			{ code: 'ml', label: 'Malayalam' },
			{ code: 'mr', label: 'Marathi' },
			{ code: 'me', label: 'Montenegrin' },
			{ code: 'ne', label: 'Nepalese' },
			{ code: 'nb', label: 'Norwegian' },
			{ code: 'nn', label: 'Norwegian Nynorsk' },
			{ code: 'fa', label: 'Persian' },
			{ code: 'pl', label: 'Polish' },
			{ code: 'pt', label: 'Portuguese' },
			{ code: 'pt-br', label: 'Portuguese (Brazil)' },
			{ code: 'ro', label: 'Romanian' },
			{ code: 'ru', label: 'Russian' },
			{ code: 'sr', label: 'Serbian' },
			{ code: 'sr-cyrl', label: 'Serbian Cyrillic' },
			{ code: 'sk', label: 'Slovak' },
			{ code: 'sl', label: 'Slovenian' },
			{ code: 'es', label: 'Spanish' },
			{ code: 'sv', label: 'Swedish' },
			{ code: 'tl-ph', label: 'Tagalog (Filipino)' },
			{ code: 'tzm', label: 'Tamaziɣt' },
			{ code: 'tzm-latn', label: 'Tamaziɣt Latin' },
			{ code: 'ta', label: 'Tamil' },
			{ code: 'th', label: 'Thai' },
			{ code: 'bo', label: 'Tibetan' },
			{ code: 'tr', label: 'Turkish' },
			{ code: 'uk', label: 'Ukrainian' },
			{ code: 'uz', label: 'Uzbek' },
			{ code: 'vi', label: 'Vietnamese' },
			{ code: 'cy', label: 'Welsh' }
		];
	
	if (locales.map(function (language) { return language.code; }).indexOf(language) < 0)
		language = 'en';
	
	angular
		.module('AngularMomentPickerDemo', ['moment-picker'])
		.config(['momentPickerProvider', function (momentPickerProvider) {
			momentPickerProvider.options({ locale: language });
		}])
		.controller('AngularMomentPickerDemoCtrl', ['momentPicker', '$scope', function (momentPicker, $scope) {
			var ctrl = this;
			
			ctrl.today = moment().locale(language).format('LLLL');
			ctrl.locales = locales;
			ctrl.formats = [
				{ group: 'Month', token: 'M', output: '1 2 ... 11 12' },
				{ group: 'Month', token: 'Mo', output: '1st 2nd ... 11th 12th' },
				{ group: 'Month', token: 'MM', output: '01 02 ... 11 12' },
				{ group: 'Month', token: 'MMM', output: 'Jan Feb ... Nov Dec' },
				{ group: 'Month', token: 'MMMM', output: 'January February ... November December' },
				{ group: 'Quarter', token: 'Q', output: '1 2 3 4' },
				{ group: 'Day of Month', token: 'D', output: '1 2 ... 30 31' },
				{ group: 'Day of Month', token: 'Do', output: '1st 2nd ... 30th 31st' },
				{ group: 'Day of Month', token: 'DD', output: '01 02 ... 30 31' },
				{ group: 'Day of Year', token: 'DDD', output: '1 2 ... 364 365' },
				{ group: 'Day of Year', token: 'DDDo', output: '1st 2nd ... 364th 365th' },
				{ group: 'Day of Year', token: 'DDDD', output: '001 002 ... 364 365' },
				{ group: 'Day of Week', token: 'd', output: '0 1 ... 5 6' },
				{ group: 'Day of Week', token: 'do', output: '0th 1st ... 5th 6th' },
				{ group: 'Day of Week', token: 'dd', output: 'Su Mo ... Fr Sa' },
				{ group: 'Day of Week', token: 'ddd', output: 'Sun Mon ... Fri Sat' },
				{ group: 'Day of Week', token: 'dddd', output: 'Sunday Monday ... Friday Saturday' },
				{ group: 'Day of Week (Locale)', token: 'e', output: '0 1 ... 5 6' },
				{ group: 'Day of Week (ISO)', token: 'E', output: '1 2 ... 6 7' },
				{ group: 'Week of Year', token: 'w', output: '1 2 ... 52 53' },
				{ group: 'Week of Year', token: 'wo', output: '1st 2nd ... 52nd 53rd' },
				{ group: 'Week of Year', token: 'ww', output: '01 02 ... 52 53' },
				{ group: 'Week of Year (ISO)', token: 'W', output: '1 2 ... 52 53' },
				{ group: 'Week of Year (ISO)', token: 'Wo', output: '1st 2nd ... 52nd 53rd' },
				{ group: 'Week of Year (ISO)', token: 'WW', output: '01 02 ... 52 53' },
				{ group: 'Year', token: 'YY', output: '70 71 ... 29 30' },
				{ group: 'Year', token: 'YYYY', output: '1970 1971 ... 2029 2030' },
				{ group: 'Week Year', token: 'gg', output: '70 71 ... 29 30' },
				{ group: 'Week Year', token: 'gggg', output: '1970 1971 ... 2029 2030' },
				{ group: 'Week Year (ISO)', token: 'GG', output: '70 71 ... 29 30' },
				{ group: 'Week Year (ISO)', token: 'GGGG', output: '1970 1971 ... 2029 2030' },
				{ group: 'AM/PM', token: 'A', output: 'AM PM' },
				{ group: 'AM/PM', token: 'a', output: 'am pm' },
				{ group: 'Hour', token: 'H', output: '0 1 ... 22 23' },
				{ group: 'Hour', token: 'HH', output: '00 01 ... 22 23' },
				{ group: 'Hour', token: 'h', output: '1 2 ... 11 12' },
				{ group: 'Hour', token: 'hh', output: '01 02 ... 11 12' },
				{ group: 'Minute', token: 'm', output: '0 1 ... 58 59' },
				{ group: 'Minute', token: 'mm', output: '00 01 ... 58 59' },
				{ group: 'Second', token: 's', output: '0 1 ... 58 59' },
				{ group: 'Second', token: 'ss', output: '00 01 ... 58 59' },
				{ group: 'Fractional Second', token: 'S', output: '0 1 ... 8 9' },
				{ group: 'Fractional Second', token: 'SS', output: '00 01 ... 98 99' },
				{ group: 'Fractional Second', token: 'SSS', output: '000 001 ... 998 999' },
				{ group: 'Fractional Second', token: 'SSSS', output: '0000 0001 ... 9998 9999' },
				{ group: 'Timezone', token: 'z', output: 'EST CST ... MST PST (deprecated)' },
				{ group: 'Timezone', token: 'zz', output: 'EST CST ... MST PST (deprecated)' },
				{ group: 'Timezone', token: 'Z', output: '-07:00 -06:00 ... +06:00 +07:00' },
				{ group: 'Timezone', token: 'ZZ', output: '-0700 -0600 ... +0600 +0700' },
				{ group: 'Unix Timestamp', token: 'X', output: '1360013296' },
				{ group: 'Unix Millisecond Timestamp', token: 'x', output: '1360013296123' },
				{ group: 'Time (Localized formats)', token: 'LT', output: '8:30 PM' },
				{ group: 'Time with seconds (Localized formats)', token: 'LTS', output: '8:30:25 PM' },
				{ group: 'Month numeral, day of month, year (Localized formats)', token: 'L', output: '09/04/1986' },
				{ group: 'Month numeral, day of month, year (Localized formats)', token: 'l', output: '9/4/1986' },
				{ group: 'Month name, day of month, year (Localized formats)', token: 'LL', output: 'September 4 1986' },
				{ group: 'Month name, day of month, year (Localized formats)', token: 'll', output: 'Sep 4 1986' },
				{ group: 'Month name, day of month, year, time (Localized formats)', token: 'LLL', output: 'September 4 1986 8:30 PM' },
				{ group: 'Month name, day of month, year, time (Localized formats)', token: 'lll', output: 'Sep 4 1986 8:30 PM' },
				{ group: 'Month name, day of month, day of week, year, time (Localized formats)', token: 'LLLL', output: 'Thursday, September 4 1986 8:30 PM' },
				{ group: 'Month name, day of month, day of week, year, time (Localized formats)', token: 'llll', output: 'Thu, Sep 4 1986 8:30 PM' },
			];
			ctrl.views = ['year', 'month', 'day', 'hour'];
			ctrl.defaults = {
				locale:    'en',
				format:    'LLLL',
				formatDef: momentPicker.format,
				minView:   momentPicker.minView,
				maxView:   momentPicker.maxView,
				startView: momentPicker.startView,
			}
			ctrl.builder = angular.copy(ctrl.defaults);
			ctrl.built = true;
			ctrl.myInput = moment().format(ctrl.builder.format);
			
			ctrl.changeLocale = function (date, from, to) {
				var format = ctrl.builder.format || ctrl.defaults.formatDef,
					date   = moment(date, format, from).locale(to);
				return date.isValid() ? date.format(format) : '';
			};
			ctrl.changeFormat = function (date, from, to) {
				var date = moment(date, from, ctrl.builder.locale);
				return date.isValid() ? date.format(to) : '';
			};
			
			$scope.$watch('ctrl.builder.locale', function (to, from) {
				if (from == to) return;
				
				if (ctrl.myInput)
					ctrl.myInput = ctrl.changeLocale(ctrl.myInput, from, to);
				['minDate', 'maxDate'].forEach(function (key) {
					if (ctrl.builder[key])
						ctrl.builder[key] = ctrl.changeLocale(ctrl.builder[key], from, to);
				});
			});
			$scope.$watch('ctrl.builder.format', function (to, from) {
				if (from == to) return;
				if (!from) from = ctrl.defaults.formatDef;
				if (!to) to = ctrl.defaults.formatDef;
				
				if (ctrl.myInput)
					ctrl.myInput = ctrl.changeFormat(ctrl.myInput, from, to);
				['minDate', 'maxDate'].forEach(function (key) {
					if (ctrl.builder[key])
						ctrl.builder[key] = ctrl.changeFormat(ctrl.builder[key], from, to);
				});
			});
			$scope.$watch('[ctrl.builder.minView, ctrl.builder.maxView]', function () {
				var availableViews = ctrl.views.filter(function (view, index) {
					return index >= ctrl.views.indexOf(ctrl.builder.minView) && index <= ctrl.views.indexOf(ctrl.builder.maxView);
				});
				if (availableViews.indexOf(ctrl.builder.startView) < 0)
					ctrl.builder.startView = availableViews[0];
			}, true);
			$scope.$watch('ctrl.builder', function () {
				$timeout(function () {
					ctrl.built = false;
					$timeout(function () { ctrl.built = true; });
				});
			}, true);
		}])
		.filter('encoded', function () {
			return function (value) {
				return (value || '').replace(/"/g, '&quot;');
			}
		})
		.directive('pre', ['$compile', '$timeout', function ($compile, $timeout) {
			return {
				restrict: 'E',
				transclude: true,
				link: function ($scope, $element, $attrs, $controller, $transclude) {
					$transclude($scope.$new(), function ($clone, $scope) {
						var clipboard,
							clipboardElement = angular.element('<div class="clipboard"><span ng-bind="text"></span>&nbsp;<i class="octicon octicon-clippy"></i></div>');
						
						// highlight code
						hljs.highlightBlock($clone[0]);
						$element.append($clone);
						// append clipboard
						$scope.text = 'Copy';
						$element.append(clipboardElement);
						clipboard = new Clipboard(clipboardElement[0], {
							target: function () { return $clone[0]; }
						});
						clipboard.on('success', function (e) {
							if (e.action != 'copy') return;
							e.clearSelection();
							$timeout(function () {
								$scope.text = 'Copied!';
								$timeout(function () { $scope.text = 'Copy'; }, 1000);
							});
						});
						// compile everything
						$compile(clipboardElement)($scope);
						$compile($clone)($scope);
					});
				}
			};
		}]);

})(angular);