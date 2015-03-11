'use strict';

angular.module('dashboard')
	.controller('PatientRemoveController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (item) {
			$modalInstance.close($scope.selectedPatient);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
	        console.log('Remove modal popup if necessary!');
	        // if modal instance difined, dismiss window
	        if ($modalInstance) {
	          $modalInstance.dismiss('cancel');
	        }
      	});  

});
