# Angular Moment Picker

[![Join the chat at https://gitter.im/indrimuska/angular-moment-picker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/indrimuska/angular-moment-picker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM version](http://img.shields.io/npm/v/angular-moment-picker.svg?style=flat)](https://npmjs.org/package/angular-moment-picker)
[![NPM downloads](http://img.shields.io/npm/dm/angular-moment-picker.svg?style=flat)](https://npmjs.org/package/angular-moment-picker)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat)](LICENSE)

Angular Moment Picker is an AngularJS directive for date and time picker using Moment.js.

Check out the homepage at [https://github.com/indrimuska/angular-moment-picker](https://github.com/indrimuska/angular-moment-picker).

![Angualar Moment Picker](https://github.com/indrimuska/angular-moment-picker/img/angualar-moment-picker-views-selected.png)

## Install

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.js"></script>
<script src="//rawgit.com/indrimuska/angular-moment-picker/master/dist/angular-moment-picker.min.js"></script>
```
```js
var myApp = angular.module('myApp', ['moment-picker']);
```
```html
<div moment-picker="myDate"> {{ myDate }} </moment-picker>
```

## Options

Property | Default | Description
---|---|---
moment-picker | | Output value (two-way bindable).
locale | `"en"` | Locale code. <sup>1</sup>
format | `"L LT"` | Format of the output value and min/max date. <sup>1</sup>
min-view | `"year"` | Minimum navigable view. <sup>2</sup>
max-view | `"year"` | Maximum navigable view. <sup>2</sup>
start-view | `"year"` | Initial view when opening the picker. <sup>2</sup>
min-date | | Two-way bindable property representing the minimum selectable date in the same format of the value.
max-date | | Two-way bindable property representing the maximum selectable date in the same format of the value.

1. Locales and formats are available at http://momentjs.com/.
2. Available views are `year`, `month`, `day`, `month`.

## momentPickerProvider

Angular Moment Picker comes out with its own provider, in order to define your own configuration for all the pickers in your app.

```javascript
angular
    .module('myApp', ['moment-picker'])
    .config(['momentPickerProvider', function (momentPickerProvider) {
        momentPickerProvider.options({
            /* ... */
        });
    }]);
```

Property | Default | Description
---|---|---
locale | `"en"` | Locale code. <sup>1</sup>
format | `"L LT"` | Format of the output value and min/max date. <sup>1</sup>
min-view | `"year"` | Minimum navigable view. <sup>2</sup>
max-view | `"year"` | Maximum navigable view. <sup>2</sup>
start-view | `"year"` | Initial view when opening the picker. <sup>2</sup>
left-arrow | `"&larr;"` | Left arrow string (HTML allowed).
right-arrow | `"&rarr;"` | Right arrow string (HTML allowed).
months-format | `"MMM"` | Months format in `year` view.
days-format | `"D"` | Days format in `month` view.
hours-format | `"HH:[00]"` | Hours format in `day` view.
minutes-format | <sup>3</sub> | Minutes format in `hour` view.
minuts-step | `5` | Step between each visible minute in `hour` view.

1. Locales and formats are available at http://momentjs.com/.
2. Available views are `year`, `month`, `day`, `month`.
3. Locale format `LT` without meridiem part (AM/PM, am/pm).

## License
Copyright (c) 2015 Indri Muska. Licensed under the MIT license.