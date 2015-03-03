'use strict';

angular.module('DashboardFormBuilderModule')
  .controller('FormCreateController', function ($scope, $modal, FormService) {

  // preview form mode
  $scope.previewMode = false;

  // new form
  $scope.form = {};
  $scope.form.form_id = 1;
  $scope.form.form_name = 'My Form';
  $scope.form.form_fields = [];

  // previewForm - for preview purposes, form will be copied into this
  // otherwise, actual form might get manipulated in preview mode
  $scope.previewForm = {};

  // add new field drop-down:
  $scope.addField = {};
  $scope.addField.types = FormService.fields;
  $scope.addField.new = $scope.addField.types[0].name;
  $scope.addField.lastAddedID = 0;

  // accordion settings
  $scope.accordion = {};
  $scope.accordion.oneAtATime = true;

  // create new field button click
  $scope.addNewField = function(){
    // incr field_id counter
    $scope.addField.lastAddedID++;
    var newField = {
      "field_id" : $scope.addField.lastAddedID,
      "field_title" : "New field - " + ($scope.addField.lastAddedID),
      "field_type" : $scope.addField.new,
      "field_value" : "",
      "field_required" : true,
      "field_disabled" : false
    };

    // put newField into fields array
    $scope.form.form_fields.push(newField);
    if($scope.previewMode == false) {
      $scope.previewMode = true;
    }
    $scope.form.submitted = false;
    angular.copy($scope.form, $scope.previewForm);
  };

  // deletes particular field on button click
  $scope.deleteField = function (field_id){
    var modalInstance = $modal.open({
        templateUrl: 'views/components/dashboard/formBuilder/views/deleteModal.html',
        controller : 'DeleteModalInstanceCtrl',
        controllerAs : 'vm'
      });

    modalInstance.result.then(function() {
      // confirmed delete
      for(var i = 0; i < $scope.form.form_fields.length; i++){
        if($scope.form.form_fields[i].field_id == field_id){
          $scope.form.form_fields.splice(i, 1);
          break;
        }
      }
      if($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
        $scope.previewMode = false;
        $scope.form.submitted = false;
      }
      angular.copy($scope.form, $scope.previewForm);
    }, function() {
      // delete canceled
    }
    );
  };

  // add new option to the field
  $scope.addOption = function (field){
    if(!field.field_options) {
      field.field_options = [];
    }

    var lastOptionID = 0;

    if(field.field_options[field.field_options.length-1]) {
      lastOptionID = field.field_options[field.field_options.length-1].option_id;
    }

      // new option's id
    var option_id = lastOptionID + 1;

    var newOption = {
      "option_id" : option_id,
      "option_title" : "Option " + option_id,
      "option_value" : option_id
    };

    // put new option into field_options array
    field.field_options.push(newOption);
    angular.copy($scope.form, $scope.previewForm);
  };

  // delete particular option
  $scope.deleteOption = function (field, option){
    for(var i = 0; i < field.field_options.length; i++){
      if(field.field_options[i].option_id == option.option_id){
        field.field_options.splice(i, 1);
        break;
      }
    }
    angular.copy($scope.form, $scope.previewForm);
  };

  // decides whether field options block will be shown (true for dropdown and radio fields)
  $scope.showAddOptions = function (field){
    if(field.field_type == "radio" || field.field_type == "dropdown")
      return true;
    else
      return false;
    angular.copy($scope.form, $scope.previewForm);
  };

  // updates preview form when default text changes
  $scope.updateOptions = function() {
    angular.copy($scope.form, $scope.previewForm);
  };

  // deletes all the fields
  $scope.reset = function (){
    if($scope.form.form_fields !== null && $scope.form.form_fields.length !== 0) {
      var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/formBuilder/views/deleteModal.html',
          controller : 'DeleteModalInstanceCtrl',
          controllerAs : 'vm'
        });

      modalInstance.result.then(function() {
        // confirmed reset
        $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
        $scope.previewMode = false;
        $scope.form.submitted = false;
        angular.copy($scope.form, $scope.previewForm);
      }, function() {
        // reset canceled
      }
      );
    }
  };
});
