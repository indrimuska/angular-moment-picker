import * as angular from 'angular';
import * as moment from 'moment';
import { Value, IDirectiveScopeInternal, IModelController } from './definitions';

export const KEYS = { up: 38, down: 40, left: 37, right: 39, escape: 27, enter: 13 };

export const isValidMoment = (value: moment.Moment | Value): boolean => {
	return moment.isMoment(value) && value.isValid();
};

export const toValue = (date: moment.Moment | Value, format: string, locale: string): Value => {
	let momentDate = <moment.Moment>date;
	if (!isValidMoment(date)) momentDate = toMoment(date, format, locale);
	return momentToValue(momentDate, format);
};

export const toMoment = (date: moment.Moment | Value, format: string, locale: string): moment.Moment => {
	let momentDate = moment(date, format, locale);
	if (!isValidMoment(momentDate)) momentDate = undefined;
	return momentDate;
};

export const momentToValue = (momentObject: moment.Moment, format: string): Value => {
	if (!isValidMoment(momentObject)) return undefined;
	return !format ? momentObject.valueOf() : momentObject.format(format);
};

export const valueToMoment = (formattedValue: Value, format: string, locale: string): moment.Moment => {
	if (!formattedValue) return undefined;
	if (!format) return moment(formattedValue);
	return moment(formattedValue, format, locale);
};

export const setValue = (value: moment.Moment | Value, $scope: IDirectiveScopeInternal, $ctrl: IModelController, $attrs: ng.IAttributes): void => {
	let modelValue = isValidMoment(value) ? (<moment.Moment>value).clone() : valueToMoment(<Value>value, $scope.format, $scope.locale),
		viewValue = momentToValue(modelValue, $scope.format);
	$scope.model = modelValue;
	$ctrl.$modelValue = modelValue;
	if (!$attrs['ngModel']) $scope.value = viewValue;
	else {
		$ctrl.$setViewValue(viewValue);
		$ctrl.$render(); // render input value
	}
};