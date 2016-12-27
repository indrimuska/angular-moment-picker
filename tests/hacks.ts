// extending jQLite
angular.element.prototype.find = function (query: string) { // tslint:disable-line:only-arrow-functions
	return angular.element(this[0].querySelectorAll(query));
};

// fix PhantomJS missing blur-on-clickout features
let lastFocused;
angular.element(document.body).on('click', (event) => {
	if (lastFocused) lastFocused.trigger('blur');
	lastFocused = angular.element(event.target);
});