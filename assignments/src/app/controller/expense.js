'use strict';
angular.module('expenseManager').controller('ExpenseController', function($scope, expenseService) {
     var vm = this;
        vm.expenses = [];
         $scope.expense = {};
         $scope.index = 0; 
    
        vm.getExpenses = function() {
            expenseService.getExpenses()
                .then(function(expenses) {
                    vm.expenses = expenses;
                    console.log('expenses returned to controller.');
                    //console.log(vm.expenses);

                },
                function(data) {
                    console.log('expenses retrieval failed.');
                });
        };        
        vm.getExpenses();

     vm.removeExpenseRecord = function(index) {
		vm.expenses.splice(index, 1);
		getRecordCount();
	};
      vm.list_expenses = {
        data: [{
            id: 'id1',
            name: 'Rent'
        }, {
            id: 'id2',
            name: 'Travel'
        }, {
            id: 'id3',
            name: 'Party'
        }, {
            id: 'id4',
            name: 'Studies'
        }, {
            id: 'id5',
            name: 'Shopping'
        }, {
            id: 'id6',
            name: 'Other'
        }
              ]
    };       
    //vm.list_expense = 'Travel';
    
  /*vm.editExpense = function() {
    vm.editmode = true;
    //vm.toggleText = vm.toggle ? 'Add Expense' : 'Close';
    $('.expense-form').toggleClass('hidden');
    //$('.expense-form').removeClass('hidden');

    //vm.addExpense = false; 
  };*/
    
    vm.submitExpenses = function(isValid){	
        if (vm.edate === '' || vm.list_expense === '' || vm.amount === '' || vm.mode === '') return false;
		vm.expenses.push({'edate':vm.edate, 'list_expense': vm.list_expense, 'amount':vm.amount, 'mode':vm.mode });
		// Writing it to the server
		//	
            //vm.expenseForm.$setSubmitted();
        getRecordCount();
        clearRecordPanel();
        vm.submitExpenses = true;
        
        if (isValid) {
          alert('Expenses has been posted successfully!');
        };
		var dataObj = {
				edate : vm.edate,
				list_expense : vm.list_expense,
				amount : vm.amount,
                mode : vm.mode
		};
		var res = $http.post('/expense.json', dataObj);
		res.success(function(data, status, headers, config) {
			vm.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
		vm.edate='';
		vm.list_expense='';
		vm.amount='';
        vm.mode='';
	
	};
 vm.totalExpense = function(){
    var total = 0;
    for(var i=0;i<vm.expenses.length;i++){
    total = total + parseInt(vm.expenses[i].amount, 10);
    }
    return total;
};
    
    
   $scope.toggle = true;   
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Add Expense' : 'Close';
        $('.expense-form').toggleClass('hidden');
        //$('.income-form').addClass('hidden');
		//clearRecordPanel();
    });
   /* vm.editExpense = function(index){
			 vm.editing = vm.expenses.[index];	
        vm.index = index;
		};*/
    
    
    /*for (var i = 0, length = vm.expenses.length; i < length; i++) {
      vm.expense[vm.expenses[i].id] = false;
    }


    vm.modify = function(tableData){
        vm.expense[tableData.id] = true;
    };


    vm.update = function(tableData){
        vm.expense[tableData.id] = false;
    };*/
    
    });
