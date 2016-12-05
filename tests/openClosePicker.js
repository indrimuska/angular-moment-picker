describe('Open / close picker', function () {
	
	var $inputPicker, $divPicker, $inputPickerContents, $divPickerContents;
	
	// init test
	initTest();
	
	// create two pickers for all tests
	beforeEach(function () {
		$inputPicker  = buildTemplate('input', { class: 'input-picker' }),
		$inputContent = $inputPicker.find('.moment-picker-input'),
		$divPicker    = buildTemplate('div', { class: 'div-picker' }),
		$divContent   = $divPicker.find('.moment-picker-input');
	});
	
	function isVisible($element) {
		return !$element.find('.moment-picker-container').hasClass('ng-hide');
	}
	
	// open picker on click
	it('should open the picker on click', function () {
		$inputContent.ngTrigger('click');
		expect(isVisible($inputPicker)).toBe(true);
		
		$divContent.ngTrigger('click');
		expect(isVisible($divPicker)).toBe(true);
	});
	
	// open picker on focus
	it('should open the picker on focus', function () {
		$inputContent.ngTrigger('focus');
		expect(isVisible($inputPicker)).toBe(true);
		
		$divContent.ngTrigger('focus');
		expect(isVisible($divPicker)).toBe(true);
	});
	
	// close picker on blur
	it('should close the picker on blur', function () {
		$inputContent.ngTrigger('click');
		expect(isVisible($inputPicker)).toBe(true);
		$inputContent.ngTrigger('blur');
		expect(isVisible($inputPicker)).toBe(false);
		
		$divContent.ngTrigger('click');
		expect(isVisible($divPicker)).toBe(true);
		$divContent.ngTrigger('blur');
		expect(isVisible($divPicker)).toBe(false);
	});
	
	// close picker clicking on another one
	it('should close a picker when clicking to another picker', function () {
		$inputContent.ngTrigger('click');
		expect(isVisible($inputPicker)).toBe(true);
		
		$divContent.ngTrigger('click');
		expect(isVisible($divPicker)).toBe(true);
		expect(isVisible($inputPicker)).toBe(false);
	});
});
