import * as angular from 'angular';
import { ViewString } from './definitions';

export interface IProviderOptions {
	locale?: string;
	format?: string;
	minView?: ViewString;
	maxView?: ViewString;
	startView?: ViewString;
	validate?: boolean;
	autoclose?: boolean;
	today?: boolean;
	keyboard?: boolean;
	showHeader?: boolean;
	leftArrow?: string;
	rightArrow?: string;
	parsers?:Array<string>;
	
	// Decade View
	yearsFormat?: string;
	
	// Year View
	monthsFormat?: string;
	
	// Month View
	daysFormat?: string;
	
	// Day View
	hoursFormat?: string;
	hoursStart?: number;
	hoursEnd?: number;
	
	// Hour View
	minutesFormat?: string;
	minutesStep?: number;
	minutesStart?: number;
	minutesEnd?: number;

	// Minute View
	secondsFormat?: string;
	secondsStep?: number;
	secondsStart?: number;
	secondsEnd?: number;
}

export default class Provider implements angular.IServiceProvider {
	private settings: IProviderOptions = <IProviderOptions>{
		locale: 'en',
		format: 'L LTS',
		minView: 'decade',
		maxView: 'minute',
		startView: 'year',
		validate: true,
		autoclose: true,
		today: false,
		keyboard: false,
		showHeader: true,
		leftArrow: '&larr;',
		rightArrow: '&rarr;',
		parsers: [],
		
		// Decade View
		yearsFormat: 'YYYY',
		
		// Year View
		monthsFormat: 'MMM',
		
		// Month View
		daysFormat: 'D',
		
		// Day View
		hoursFormat: 'HH:[00]',
		hoursStart: 0,
		hoursEnd: 23,
		
		// Hour View
		minutesStep: 5,
		minutesStart: 0,
		minutesEnd: 59,
		
		// Minute View
		secondsFormat: 'ss',
		secondsStep: 1,
		secondsStart: 0,
		secondsEnd: 59

	};
	
	public options(options: IProviderOptions): IProviderOptions {
		angular.extend(this.settings, options);
		return angular.copy(this.settings);
	}
	
	public $get(): IProviderOptions {
		return this.settings;
	}
}