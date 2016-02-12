(function() {
  'use strict';
  angular
    .module('expenseManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('transaction', {
        url: '/transaction',
        templateUrl: 'app/views/transaction.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      }); 
      /*.state('dashboard.expense', {
        parent: 'dashboard',
        url: '/expense',
        templateUrl: 'app/views/expense.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      })
    .state('dashboard.income', {
		parent: 'dashboard',
        url: '/income',
        templateUrl: 'app/views/income.html',
        controller: 'ExpenseController',
        controllerAs: 'dash'
      })
	  .state('dashboard.report', {
        parent: 'dashboard',
        url: '/report',
        templateUrl: 'app/views/report.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      });*/
	  $urlRouterProvider.otherwise('/transaction');

  }   
})();
