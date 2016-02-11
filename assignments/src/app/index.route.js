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
     /* .state('transaction.expense', {
        parent: 'transaction',
        url: '/expense',
        templateUrl: 'app/views/expense.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      })
    .state('transaction.income', {
		parent: 'transaction',
        url: '/income',
        templateUrl: 'app/views/income.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      })
	  .state('transaction.report', {
        parent: 'transaction',
        url: '/report',
        templateUrl: 'app/views/report.html',
        controller: 'TransactionController',
        controllerAs: 'dash'
      });*/
	  $urlRouterProvider.otherwise('/transaction');

  }   
})();
