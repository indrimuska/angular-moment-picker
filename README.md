# Angular Moment Picker

[![Join the chat at https://gitter.im/indrimuska/angular-moment-picker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/indrimuska/angular-moment-picker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM version](http://img.shields.io/npm/v/angular-moment-picker.svg?style=flat)](https://npmjs.org/package/angular-moment-picker)
[![NPM downloads](http://img.shields.io/npm/dm/angular-moment-picker.svg?style=flat)](https://npmjs.org/package/angular-moment-picker)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Check out the homepage at [http://indrimuska.github.io/angular-moment-picker/](http://indrimuska.github.io/angular-moment-picker/).

*Angular Moment Picker* is a native AngularJS directive for date and time picker that uses *Moment.js* and **does not require jQuery**.

<p align="center">
    <a href="http://indrimuska.github.io/angular-moment-picker/">
        <img src="http://indrimuska.github.io/angular-moment-picker/img/angular-moment-picker.gif" alt="Angular Moment Picker demo">
    </a>
</p>

## Installation

Get Angular Moment Picker from [**npm**](https://www.npmjs.com/), [**bower**](http://bower.io/) or [**git**](https://git-scm.com/):
```
  npm install angular-moment-picker
bower install moment-picker
  git clone   https://github.com/indrimuska/angular-moment-picker.git
```

Include style and script in your page:
```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.js"></script>
<script src="//cdn.rawgit.com/indrimuska/angular-moment-picker/master/dist/angular-moment-picker.min.js"></script>
<link href="//cdn.rawgit.com/indrimuska/angular-moment-picker/master/dist/angular-moment-picker.min.css" rel="stylesheet">
```

Add *moment-picker* dependency to your module:
```js
var myApp = angular.module('myApp', ['moment-picker']);
```

Provide the attribute to your element:
```html
<div moment-picker="myDate"> {{ myDate }} </div>
```

## Demo

Check out the demo page at [http://indrimuska.github.io/angular-moment-picker/](http://indrimuska.github.io/angular-moment-picker/).

## The views

*Year view* | *Month view* | *Day view* | *Hour view* | *Minute view*
---|---|---|---|---
![Year view](http://indrimuska.github.io/angular-moment-picker/img/year-view.png) | ![Month view](http://indrimuska.github.io/angular-moment-picker/img/month-view.png) | ![Day view](http://indrimuska.github.io/angular-moment-picker/img/day-view.png) | ![Hour view](http://indrimuska.github.io/angular-moment-picker/img/hour-view.png) | ![Minute view](http://indrimuska.github.io/angular-moment-picker/img/minute-view.png)

## Options

To configure Angular Moment Picker you have to append to your block or your input the attribute options you want to set.

```html
<div moment-picker="ctrl.birthday" locale="fr" format="LL">
    Mon anniversaire est le {{ ctrl.birthday }}
</div>
```

Property | Default | Description
---|---|---
moment-picker | | Two-way bindable model property, required to use the directive.
locale | `"en"` | Locale code. <sup>1</sup>
format | `"L LT"` | Format of the output value and min/max date. <sup>1</sup>
min-view | `"year"` | Minimum navigable view.
max-view | `"hour"` | Maximum navigable view.
start-view | `"year"` | Initial view when the picker is open.
min-date | | Two-way bindable property representing the minimum selectable date in the same format of the value.
max-date | | Two-way bindable property representing the maximum selectable date in the same format of the value.
disable | | Disables the picker if truly.

## Events

As for the options, to bind an event you only need to append the right property to your picker.

```html
<div moment-picker="ctrl.meeting" format="HH:mm A" change="ctrl.onChange(newValue, oldValue)">
    The meeting starts at {{ ctrl.meeting }}.
</div>
```

Event | Parameters | Description
---|---|---
change | `newValue`, `oldValue` | Function fired upon change in picker value.

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
format | `"L LTS"` | Format of the output value and min/max date. <sup>1</sup>
min-view | `"year"` | Minimum navigable view.
max-view | `"hour"` | Maximum navigable view.
start-view | `"year"` | Initial view when opening the picker.
left-arrow | `"&larr;"` | Left arrow string (HTML allowed).
right-arrow | `"&rarr;"` | Right arrow string (HTML allowed).
months-format | `"MMM"` | Months format in `year` view.
days-format | `"D"` | Days format in `month` view.
hours-format | `"HH:[00]"` | Hours format in `day` view.
minutes-format | <sup>2</sub> | Minutes format in `hour` view.
minutes-step | `5` | Step between each visible minute in `hour` view.
seconds-format | `"ss"` | Seconds format in `minute` view.
seconds-step | `1` | Step between each visible second in `minute` view.

## Notes

1. Locale codes and format tokens are available at http://momentjs.com/.
2. Locale format `LT` without meridiem part (AM/PM, am/pm).

## Builder

Try the online [Angular Moment Picker Builder](http://indrimuska.github.io/angular-moment-picker/#builder):

[http://indrimuska.github.io/angular-moment-picker/#builder](http://indrimuska.github.io/angular-moment-picker/#builder).

## License
Copyright (c) 2015 Indri Muska. Licensed under the MIT license.
