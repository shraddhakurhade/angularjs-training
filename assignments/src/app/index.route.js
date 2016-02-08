(function() {
  'use strict';
  angular
    .module('expenseManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
     .state('dashboard', {
        //abstract: true,
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dash'
      })
      .state('expense', {
        //parent: 'main',
        url: '/expense',
        templateUrl: 'app/views/expense.html',
        controller: 'ExpenseController',
        controllerAs: 'view'
      })
    .state('income', {
        url: '/income',
        templateUrl: 'app/views/income.html',
        controller: 'IncomeController',
        controllerAs: 'inc'
      });

    $urlRouterProvider.otherwise('/');
  }   
})();
