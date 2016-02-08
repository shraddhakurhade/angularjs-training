'use strict';
angular.module('expenseManager').controller('DashboardController', function($scope,expenseService,incomeService) {
    
     var vm = this;
        vm.expenses = [];

        vm.getExpenses = function() {
            expenseService.getExpenses()
                .then(function(expenses) {
                    vm.expenses = expenses;
                    console.log('expenses returned to controller.');
                    console.log(vm.expenses);

                },
                function(data) {
                    console.log('expenses retrieval failed.');
                });
        };        
              vm.getExpenses();

     vm.totalExpense = function(){
    var total = 0;
    for(var i=0;i<vm.expenses.length;i++){
    total = total + parseInt(vm.expenses[i].amount, 10);
    }
    return total;
};
    
      var nm = this;
        nm.incomes = [];
         nm.income = {};
         nm.index = 0; 
        nm.getIncome = function() {
            incomeService.getIncome()
                .then(function(incomes) {
                    nm.incomes = incomes;
                    console.log('Income returned to controller.');
                    //console.log(vm.expenses);

                },
                function(data) {
                    console.log('Income retrieval failed.');
                });
        };        
        nm.getIncome();
    
       nm.totalIncome = function(){
            var total = 0;
            for(var i=0;i<nm.incomes.length;i++){
            total = total + parseInt(nm.incomes[i].amount, 10);
            }
            return total;
        };
    

    
    
});