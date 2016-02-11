'use strict';
angular.module('expenseManager').controller('ExpenseController', function($scope, expenseService) {
     var vm = this;
        vm.expenses = [];
         $scope.expense = {};
         $scope.index = 0; 
        vm.new_expense = {};

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
        }            ]
    };       
    //vm.list_expense = 'Travel';
 
    /*vm.submitExpenses = function(isValid){	
        if (vm.id === '' || vm.edate === '' || vm.list_expense === '' || vm.amount === '' || vm.mode === '') return false;
		vm.expenses.push({'id':vm.id,'edate':vm.edate, 'list_expense': vm.list_expense, 'amount':vm.amount, 'mode':vm.mode });
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
                id : vm.id,
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
        vm.id='';
		vm.edate='';
		vm.list_expense='';
		vm.amount='';
        vm.mode='';
	
	};*/
    function clearRecordPanel() {
		vm.new_expense.id = '';
		vm.new_expense.edate = '';
		vm.new_expense.list_expense = '';
        vm.new_expense.amount = '';
		vm.new_expense.mode = '';
	};
        vm.saveExpense = function(){	

             if (vm.new_expense.id === '' || vm.new_expense.edate === '' || vm.new_expense.list_expense === '' || vm.new_expense.amount === '' || vm.new_expense.mode === '') return false;
            vm.expenses.push({'id':vm.new_expense.id,'edate':vm.new_expense.edate, 'list_expense': vm.new_expense.list_expense, 'amount':vm.new_expense.amount, 'mode':vm.new_expense.mode });
         clearRecordPanel();  
};
    $scope.DisplayUpdate = false;
    $scope.DisplaySave = true;

      vm.editExpense = function (eid) {
        
                for (var i in vm.expenses) {
                    if (vm.expenses[i].id == eid) {
                        vm.new_expense.id=eid;
                        vm.new_expense.edate=vm.expenses[i].edate;
                        vm.new_expense.list_expense=vm.expenses[i].list_expense;
                        vm.new_expense.amount=vm.expenses[i].amount;
                        vm.new_expense.mode=vm.expenses[i].mode;
                        
                        
                        $('.expense-form').removeClass('hidden');

                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                        //Clearing the Status
                        vm.status = '';
                    }
                }
            };

      vm.UpdateExpense = function(eid){	    
            for (var i in vm.expenses) {
                    if (vm.expenses[i].id == eid) {               
                        vm.expenses[i].edate=vm.new_expense.edate;
                        vm.expenses[i].list_expense=vm.new_expense.list_expense;
                        vm.expenses[i].amount=vm.new_expense.amount;
                        vm.expenses[i].mode=vm.new_expense.mode;
                          }
            }           
                   clearRecordPanel();
                    $scope.DisplaySave = true;
                    $scope.DisplayUpdate = false;
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
         $scope.DisplaySave = true;
                        //Displaying Update button
        $scope.DisplayUpdate = false;
        //$('.income-form').addClass('hidden');
		clearRecordPanel();
    });
  
    });
