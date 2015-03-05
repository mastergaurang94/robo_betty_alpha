'use strict';

angular.module('robobetty', 
  [
  'ui.router',
  'widget',
  'product', 
  'dashboard',
  'ui.bootstrap',
  'signin',
  'register',
  'thankyou',
  'DashboardFormBuilderModule',
   'settings',
   'checkin',
   'thankyouCheckIn'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');
  $stateProvider
  .state('common',{
    templateUrl: 'views/components/dashboard/views/dashboard.html',
    abstract: true
  })
  .state('home', {
    url: '/home',
    templateUrl: 'views/components/home/views/home.html'
  })
  .state('createForm', {
    url: '/createform',
    controller: 'FormCreateController',
    templateUrl: 'views/components/dashboard/formBuilder/views/create.html',
    parent: 'common'
  })
  .state('product', {
    url: '/product',
    templateUrl: 'views/components/product/views/product.html'
  })
  .state('dashboard', {
    url: '/dashboard',
    template: '',
    parent: 'common'
  })
  .state('doctors', {
    url: '/doctors',
    templateUrl: 'views/components/dashboard/doctors/views/doctors.html',
    parent: 'common'
  })
  .state('settings', {
    url: '/settings',
    templateUrl: 'views/components/dashboard/settings/views/settings.html',
    parent: 'common'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'views/components/receptionistPortal/signin/views/login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/components/receptionistPortal/register/views/register.html'
  })
  .state('checkin', {
    url: '/checkin',
    templateUrl: 'views/components/patientCheckin/checkin/views/checkin.html'
  })
  .state('thankyou', {
    url: '/thankyou',
    templateUrl: 'views/components/receptionistPortal/register/views/thankyou.html'
  })
  .state('thankyouCheckIn', {
    url: '/thankyouCheckIn',
    templateUrl: 'views/components/patientCheckin/checkin/views/CheckInthankyou.html'
  });
})
  .run(['$rootScope', '$injector', function($rootScope, $injector){
    $injector.get("$http").defaults.transformRequest = function(data, headersGetter) 
    { 
      if ($rootScope.token) headersGetter()['token'] = $rootScope.token;
      if ($rootScope.email) headersGetter()['email'] = $rootScope.email; 
      if (data) 
        { 
            return angular.toJson(data); 
          }
    } 
  }]);

