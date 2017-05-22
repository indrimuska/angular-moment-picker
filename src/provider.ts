import * as angular from 'angular';
import { ViewString, Position } from './definitions';

export interface IProviderOptions {
	locale?: string;
	format?: string;
	minView?: ViewString;
	maxView?: ViewString;
	startView?: ViewString;
	position?: Position;
	inline?: boolean;
	validate?: boolean;
	autoclose?: boolean;
	setOnSelect?: boolean;
	today?: boolean;
	keyboard?: boolean;
	showHeader?: boolean;
	leftArrow?: string;
	rightArrow?: string;
	
	// Decade View
	yearsFormat?: string;	
	
	// Year View
	monthsFormat?: string;
	monthsHeaderFormat?: string;
	
	// Month View
	daysFormat?: string;
	daysHeaderFormat?: string; 
	
	// Day View
	hoursFormat?: string;
	hoursStart?: number;
	hoursEnd?: number;
	hoursHeaderFormat?: string;
	
	// Hour View
	minutesFormat?: string;
	minutesStep?: number;
	minutesStart?: number;
	minutesEnd?: number;
	minutesHeaderFormat?: string;

	// Minute View
	secondsFormat?: string;
	secondsStep?: number;
	secondsStart?: number;
	secondsEnd?: number;
	secondsHeaderFormat?: string;
}

export default class Provider implements angular.IServiceProvider {
	private settings: IProviderOptions = <IProviderOptions>{
		locale: 'en',
		format: 'L LTS',
		minView: 'decade',
		maxView: 'minute',
		startView: 'year',
		inline: false,
		validate: true,
		autoclose: true,
		setOnSelect: false,
		today: false,
		keyboard: false,
		showHeader: true,
		leftArrow: '&larr;',
		rightArrow: '&rarr;',
		
		// Decade View
		yearsFormat: 'YYYY',
		
		// Year View
		monthsFormat: 'MMM',
		monthsHeaderFormat: 'YYYY',
		
		// Month View
		daysFormat: 'D',
		daysHeaderFormat: 'MMMM YYYY',
		
		// Day View
		hoursFormat: 'HH:[00]',
		hoursStart: 0,
		hoursEnd: 23,
		hoursHeaderFormat: 'LLL',
		
		// Hour View
		minutesStep: 5,
		minutesStart: 0,
		minutesEnd: 59,
		minutesHeaderFormat: 'lll',

		// Minute View
		secondsFormat: 'ss',
		secondsStep: 1,
		secondsStart: 0,
		secondsEnd: 59,
		secondsHeaderFormat: 'lll'
	};
	
	public options(options: IProviderOptions): IProviderOptions {
		angular.extend(this.settings, options);
		return angular.copy(this.settings);
	}
	
	public $get(): IProviderOptions {
		return this.settings;
	}
}