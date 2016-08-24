import angular from 'angular';

stMapValidator.$inject = ['MapValidatorService'];

export default function stMapValidator(MapValidatorService) {

  return {
    restrict: 'E',
    scope: {
      chainscript: '=?'
    },
    templateUrl: '../views/mapvalidator.html',
    link: (scope) => {
      scope.$watch('chainscript', () => {
        scope.error = null;
        if (angular.isDefined(scope.chainscript)) {
          scope.loading = true;
          MapValidatorService.validate(scope.chainscript)
            .then(errors => {
              scope.errors = errors;
              scope.loading = false;
            }).catch(error => {
              scope.error = error.message;
              scope.loading = false;
            });
        }
      });
    }
  };
}
