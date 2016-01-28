(function() {
  'use strict';
  angular
    .module('expenseManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('expense', {
        url: '/',
        templateUrl: 'app/partials/expense.html',
        controller: 'ExpenseController',
        controllerAs: 'e'
      });

    $urlRouterProvider.otherwise('/');
  }   
})();
