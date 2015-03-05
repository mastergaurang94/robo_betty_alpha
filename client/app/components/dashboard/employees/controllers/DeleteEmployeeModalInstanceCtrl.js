/**
 * Created by eduardo on 3/4/15.
 */
'use strict';

function DeleteEmployeeModalInstanceCtrl($modalInstance){
  var vm = this;

  vm.ok = function () {
    console.log('Deleted field');
    $modalInstance.close();
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}

angular.module('robobetty')
  .controller('DeleteEmployeeModalInstanceCtrl', ['$modalInstance', DeleteEmployeeModalInstanceCtrl]);