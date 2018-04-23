import * as moment from 'moment';
import * as test from '../utility';

describe('rangeSelection', () => {
    let $scope: ng.IScope;
    let $input: ng.IAugmentedJQuery;
    let format = 'YYYY-MM-DD';

// init test
    test.bootstrap();

    describe('when rangeSelection is set to true', () => {
        let date = moment(),
            selectableElement;

        beforeEach(inject(($rootScope: ng.IRootScopeService) => {
            $scope = $rootScope.$new();
            $input = test.buildTemplate('input', {
                momentPicker: 'dateObj',
                ngModel: date,
                format: format,
                maxView: 'year',
                rangeSelection: true,
                rangeStart: null,
                rangeEnd: null
            }, undefined, $scope);
            selectableElement = test.getPicker($input).find('td');
        }));

        it('should set rangeSelection flag on $scope', () => {
            expect($scope.rangeSelection).toBe(true);
        });

        it('should set rangeStart on first selection', () => {
            selectableElement[0].click();
            $scope.$apply();
            expect($scope.rangeStart).toEqual(date);
        });

        it('should set rangeEnd on second selection', () => {
            let dateStart = date.clone();

            selectableElement[0].click();
            $scope.$apply();

            date.add(1, 'y');
            selectableElement[0].click();
            $scope.$apply();

            expect($scope.rangeStart).toEqual(dateStart);
            expect($scope.rangeEnd).toEqual(date);
        });

        it('should reset rangeStart and rangeEnd if rangeStart and rangeEnd are already defined', () => {
            selectableElement[0].click();
            $scope.$apply();

            date.add(1, 'y');
            selectableElement[0].click();
            $scope.$apply();

            date.add(1, 'y');
            selectableElement[0].click();
            $scope.$apply();
            expect($scope.rangeStart).toEqual(date);
            expect($scope.rangeEnd).toEqual(null);
        });
    });
});