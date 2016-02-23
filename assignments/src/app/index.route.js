(function() {
  'use strict';
  angular
    .module('expenseManager')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dash'
      })
	  .state('setting', {
        url: '/setting',
        templateUrl: 'app/views/setting.html',
        controller: 'RecurringController',
        controllerAs: 'recur'
      })
	.state('expense', {
			url: '/expense',
			templateUrl: 'app/views/expense.html',
			controller: 'DashboardController',
			controllerAs: 'dash'
		 })
	.state('income', {
			url: '/income',
			templateUrl: 'app/views/income.html',
			controller: 'DashboardController',
			controllerAs: 'dash'
		 })
	  .state('transaction', {
			url: '/transaction',
			templateUrl: 'app/views/transaction.html',
			controller: 'DashboardController',
			controllerAs: 'dash'
		 })
	.state('report', {
			url: '/report',
			templateUrl: 'app/views/report.html',
			controller: 'DashboardController',
			controllerAs: 'dash'
		 })
	
    /*.state('dashboard.income', {
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
     //$urlRouterProvider.otherwise('/transaction');
     $urlRouterProvider.otherwise('/expense');

  }   
})();
