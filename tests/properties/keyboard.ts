import * as angular from 'angular';
import * as moment from 'moment';
import * as test from '../utility';
import { IProviderOptions } from '../../src/provider';
import { ViewString, IView } from '../../src/definitions';
import { KEYS } from '../../src/utility';
import * as views from '../../src/views';

describe('Keyboard', () => {

	// init test
	test.bootstrap();

	// available keyboard keys
	type MockKeyboardKeys = 'up' | 'down' | 'left' | 'right' | 'enter' | 'escape' | 'a' | 'b' | 'c';
	KEYS['a'] = 65;
	KEYS['b'] = 66;
	KEYS['c'] = 67;

	// create an event object for each key to test
	const EVENTS: { [name: string]: () => JQueryEventObject } = {};
	angular.forEach(KEYS, (code: number, key: MockKeyboardKeys) => {
		EVENTS[key] = () => $.Event('keydown', { keyCode: code });
	});

	/**
	 * Utility function to trigger a custom event to a picker input field.
	 * It first focus on the input to ensure the key is sent from the input field.
	 */
	const sendKey = ($input: ng.IAugmentedJQuery, key: MockKeyboardKeys): JQueryEventObject => {
		// get input focus first
		test.trigger($input, 'focus');
		// get a fresh event
		let event = EVENTS[key]();
		// and trigger it!
		test.trigger($input, event);
		return event;
	};

	// preventDefault()
	describe('default prevented event', () => {
		let $input: ng.IAugmentedJQuery;

		beforeEach(() => {
			$input = test.buildTemplate('input', { keyboard: 'true' });
		});

		// prevent default event
		['up', 'down', 'left', 'right', 'enter'].forEach((key: MockKeyboardKeys) => {
			it('should be set for ' + key.toUpperCase() + ' key', () => {
				let event = sendKey($input, key);
				expect(event.isDefaultPrevented()).toBe(true);
			});
		});

		// do not prevent default event
		it('should be set for all the other keys', () => {
			['escape', 'a', 'b', 'c'].forEach((key: MockKeyboardKeys) => {
				let event = sendKey($input, key);
				expect(event.isDefaultPrevented()).toBe(false);
			});
		});
	});

	describe('picker open/close', () => {
		let $input: ng.IAugmentedJQuery;

		const isOpen = () => test.getPicker($input).is(':visible');

		beforeEach(inject(($rootScope) => {
			$input = test.buildTemplate('input', { keyboard: 'true' });
		}));

		// close picker on pressing ESC
		it('should close the picker after pressing ESC key', () => {
			// focus on input
			test.trigger($input, 'focus');
			// press ESC to close the picker (without clicking on the input first)
			test.trigger($input, EVENTS['escape']());
			// check if the picker is closed
			expect(isOpen()).toBe(false);
		});

		// open picker after pressing UP or DOWN key
		['up', 'down'].forEach((key: MockKeyboardKeys) => {
			it('should open the picker after pressing ' + key.toUpperCase() + ' key', () => {
				// focus on input and close the picker
				sendKey($input, 'escape');
				// send key to be tested
				test.trigger($input, EVENTS[key]());
				// check picker opening
				expect(isOpen()).toBe(true);
			});
		});
	});

	describe('navigation', () => {
		let locale = 'en';
		let $scope: ng.IScope;
		let formats: { [name: string]: string } = {};
		let date = moment('2017-12-20 15:27:55', 'YYYY-MM-DD HH:mm:ss');
		let previousSettings: IProviderOptions;

		const pickerViews = ['decade', 'year', 'month', 'day', 'hour', 'minute'];
		const commonOpts = { keyboard: 'true', ngModel: 'date', format: 'YYYY-MM-DD HH:mm:ss', class: 'input-picker', locale: locale };
		const getHighlightedText = ($element: ng.IAugmentedJQuery) => test.getPicker($element).find('td.highlighted').text();

		// get formats from momentPickerProvider
		beforeEach(inject(($rootScope: ng.IRootScopeService, momentPicker: IProviderOptions) => { // tslint:disable-line:variable-name
			$scope = $rootScope.$new();
			$scope['date'] = date;
			// get provider options
			previousSettings  = momentPicker;
			formats['decade'] = momentPicker.yearsFormat;
			formats['year']   = momentPicker.monthsFormat;
			formats['month']  = momentPicker.daysFormat;
			formats['day']    = momentPicker.hoursFormat;
			formats['hour']   = momentPicker.minutesFormat || moment.localeData(locale).longDateFormat('LT').replace(/[aA]/, '').trim();
			formats['minute'] = momentPicker.secondsFormat;
			// set steps on HourView
			momentPicker.minutesStep = 1;
			momentPicker.secondsStep = 1;
		}));

		// after each tests reset momentPickerProvider
		afterEach(inject((momentPicker: IProviderOptions) => {
			momentPicker = previousSettings;
		}));

		pickerViews.forEach((view: ViewString, index: number) => {
			const viewPrecision  = <moment.unitOfTime.DurationConstructor>(index === pickerViews.length - 1 ? 'seconds' : pickerViews[index + 1]);
			const viewMultiplier = view == 'decade' ? 10 : 1;
			const itemsPerLine   = { decade: 4, year: 4, month: 7, day: 4, hour: 4, minute: 6 }[view];
			const keysOperations = { up: 'subtract', down: 'add', left: 'subtract', right: 'add' };

			// highlight on open
			it('should highlight the selected ' + view + ' on picker open', () => {
				let options = angular.extend({ startView: view }, commonOpts),
					$input  = test.buildTemplate('input', options, undefined, $scope);
				
				expect(getHighlightedText($input)).toBe(date.format(formats[view]));
			});

			// highlight on key press
			angular.forEach(keysOperations, (operation: 'add' | 'subtract', key: MockKeyboardKeys) => {
				const datesToShift = key == 'left' || key == 'right' ? 1 : itemsPerLine;
				const title = 'should highlight ' + (keysOperations[key] == 'add' ? 'next' : 'previous') + ' ' +
					datesToShift + ' ' + viewPrecision + (datesToShift != 1 ? 's' : '') + ' after pressing ' + key.toUpperCase() + ' key';

				it(title, () => {
					let options   = angular.extend({ startView: view }, commonOpts),
						$input    = test.buildTemplate('input', options, undefined, $scope),
						finalDate = date.clone()[operation](datesToShift, viewPrecision);
					
					sendKey($input, key);
					expect(getHighlightedText($input)).toBe(finalDate.format(formats[view]));
				});
			});
		});

	});
});
