describe('Property `validate`', function () {
	
	// init test
	initTest();
	
	function buildFormScope(options) {
		var $scope  = $rootScope.$new(),
			$form   = angular.element('<form name="form">').appendTo(document.body),
			$input  = buildTemplate('input', options, undefined, $form, $scope);
		return $scope;
	}
	
	describe('set to false', function () {
		// required
		it('should raise `required` validation error', function () {
			var $scope = buildFormScope({ name: 'date', validate: 'false', required: 'true' });
			expect($scope.form.date.$error.required).toBe(true);
		});
		
		// minDate
		it('should raise `minDate` validation error', function () {
			var format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				minDate = ngModel.clone().add(1, 'month'),
				$scope  = buildFormScope({ name: 'date', validate: 'false', format: format, ngModel: ngModel, minDate: minDate });
			
			expect($scope.form.date.$error.minDate).toBe(true);
		});
		
		// maxDate
		it('should raise `maxDate` validation error', function () {
			var format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				maxDate = ngModel.clone().subtract(1, 'month'),
				$scope  = buildFormScope({ name: 'date', validate: 'false', format: format, ngModel: ngModel, maxDate: maxDate });
			
			expect($scope.form.date.$error.maxDate).toBe(true);
		});
	});
	
	describe('set to true', function () {
		// required
		it('should raise `required` validation error', function () {
			var $scope = buildFormScope({ name: 'date', validate: 'true', required: 'true' });
			expect($scope.form.date.$error.required).toBe(true);
		});
		
		// minDate
		it('should set date to minimum allowable value', function () {
			var format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				minDate = ngModel.clone().add(1, 'month'),
				$scope  = buildFormScope({ validate: 'true', format: format, ngModel: ngModel, minDate: minDate });
			
			expect($scope.ngModel.isSame(minDate)).toBe(true);
		});
		
		// maxDate
		it('should set date to maximum allowable value', function () {
			var format  = 'YYYY-MM-DD',
				ngModel = moment('2016-12-15', format),
				maxDate = ngModel.clone().subtract(1, 'month'),
				$scope  = buildFormScope({ validate: 'true', format: format, ngModel: ngModel, maxDate: maxDate });
			
			expect($scope.ngModel.isSame(maxDate)).toBe(true);
		});
	});
});
