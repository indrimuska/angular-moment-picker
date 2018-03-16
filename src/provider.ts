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
  yearsPerLine?: number;

  // Year View
  monthsFormat?: string;
  monthsPerLine?: number;

  // Month View
  daysFormat?: string;
  daysPerLine?: number;

  // Day View
  hoursFormat?: string;
  hoursStart?: number;
  hoursEnd?: number;
  hoursPerLine?: number;

  // Hour View
  minutesFormat?: string;
  minutesStep?: number;
  minutesStart?: number;
  minutesEnd?: number;
  minutesPerLine?: number;

  // Minute View
  secondsFormat?: string;
  secondsStep?: number;
  secondsStart?: number;
  secondsEnd?: number;
  secondsPerLine?: number;
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
    yearsPerLine: 4,

    // Year View
    monthsFormat: 'MMM',
    monthsPerLine: 4,

    // Month View
    daysFormat: 'D',

    // Day View
    hoursFormat: 'HH:[00]',
    hoursStart: 0,
    hoursEnd: 23,
    hoursPerLine: 4,

    // Hour View
    minutesStep: 5,
    minutesStart: 0,
    minutesEnd: 59,
    minutesPerLine: 4,

    // Minute View
    secondsFormat: 'ss',
    secondsStep: 1,
    secondsStart: 0,
    secondsEnd: 59,
    secondsPerLine: 6,
  };

  public options(options: IProviderOptions): IProviderOptions {
    angular.extend(this.settings, options);
    return angular.copy(this.settings);
  }

  public $get(): IProviderOptions {
    return this.settings;
  }
}
