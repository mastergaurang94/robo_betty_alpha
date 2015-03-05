'use strict';

angular.module('dashboard')
  .service('SidebarService', [function() {
      this.getSidebarOptions = function() {
      	return [
	      	{option:'Home', icon: 'menu-icon fa fa-users', link:'dashboard'},
	      	{option:'Forms', icon:'menu-icon fa fa-check-square-o', link:'createform'},
	      	{option:'Employees', icon:'menu-icon fa fa-user', link:'employees'},
          {option:'Patients', icon:'menu-icon fa fa-users', link:'patientQueue'},
	      	{option:'Settings', icon:'menu-icon fa fa-cog', link:''}
      	];
      };

      this.getSidebarHeader = function(){
      		return "RoboBetty";
      };

  }]);