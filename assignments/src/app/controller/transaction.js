'use strict';
angular.module('expenseManager').controller('TransactionController', function($scope,transactionService) {
    
     	var vm = this;
        vm.transactions = [];
        vm.new_transaction = {};

	    $scope.date = new Date(2014, 3, 19);

	
        vm.getTransactions = function() {
            transactionService.getTransactions()
                .then(function(transactions) {
                    vm.transactions = transactions;
                    console.log('transactions returned to controller.');
                    console.log(vm.transactions);

                },
                function(data) {
                    console.log('transaction retrieval failed.');
                });
        }; 
    
    vm.getTransactions();
    vm.totalExpense = function(){
    var total = 0;
		
    for(var i=0;i<vm.transactions.length;i++){
	 if (vm.transactions[i].type === "Expense") {
    	total = total + parseInt(vm.transactions[i].amount, 10);}
    }
    return total;
   };
    
	  vm.totalIncome = function(){
    var total = 0;
		
    for(var i=0;i<vm.transactions.length;i++){
	 if (vm.transactions[i].type === "Income") {
    	total = total + parseInt(vm.transactions[i].amount, 10);}
    }
    return total;
   };
      vm.removeTransactionRecord = function(index) {
		vm.transactions.splice(index, 1);
		getRecordCount();
	};
		 vm.type = {
        data: [{
            id: 'id1',
            name: 'Expense'
        }, {
            id: 'id2',
            name: 'Income'
        }]
		};
	
      vm.category = {
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
        }, 
            {
            id: 'ID6',
            name: 'Business'
        }, {
            id: 'ID7',
            name: 'Salary'
        }, {
            id: 'ID8',
            name: 'Interest'
        }, {
            id: 'id9',
            name: 'Other'
        }]
    };       
    function clearRecordPanel() {
		vm.new_transaction.transactionId = '';
		vm.new_transaction.date = '';
		vm.new_transaction.category = '';
        vm.new_transaction.amount = '';
		vm.new_transaction.mode = '';
        vm.new_transaction.payer = '';
		vm.new_transaction.payee = '';
        vm.new_transaction.notes = '';
		vm.new_transaction.type = '';
		

	};
    
    vm.saveTransaction = function(){	

    if (vm.new_transaction.transactionId === '' || vm.new_transaction.date === '' || vm.new_transaction.category === '' || vm.new_transaction.amount === '' || vm.new_transaction.mode === ''|| vm.new_transaction.payer === '' || vm.new_transaction.payee === '' || vm.new_transaction.notes === '' || vm.new_transaction.type === '') return false;
        
vm.transactions.push({'transactionId':vm.new_transaction.transactionId, 'date':vm.new_transaction.date, 'category': vm.new_transaction.category, 'amount':vm.new_transaction.amount, 'mode':vm.new_transaction.mode, 'payer':vm.new_transaction.payer, 'payee': vm.new_transaction.payee, 'notes':vm.new_transaction.notes, 'type':vm.new_transaction.type });
    clearRecordPanel(); 
		$scope.transactionForm.$setPristine();
		$scope.transactionForm.$setUntouched();
};
    $scope.DisplayUpdate = false;
    $scope.DisplaySave = true;

      vm.editTransaction = function (id) {
        
                for (var i in vm.transactions) {
                    if (vm.transactions[i].transactionId == id) {
                        vm.new_transaction.transactionId=id;
                        vm.new_transaction.date=vm.transactions[i].date;
                        vm.new_transaction.category=vm.transactions[i].category;
                        vm.new_transaction.amount=vm.transactions[i].amount;
                        vm.new_transaction.mode=vm.transactions[i].mode;
                        vm.new_transaction.payer=vm.transactions[i].payer;
                        vm.new_transaction.payee=vm.transactions[i].payee;
                        vm.new_transaction.notes=vm.transactions[i].notes;
                        vm.new_transaction.type=vm.transactions[i].type;
                        
                        
                        $('.transaction-form').removeClass('hidden');

                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                      	$('.filter').toggleClass('hidden');
						$scope.toggleText ='Close Transaction';

                    }
                }
            };

      vm.UpdateTransaction = function(id){	    
            for (var i in vm.transactions) {
                    if (vm.transactions[i].transactionId == id) {               
                     
                        vm.transactions[i].date=vm.new_transaction.date;
                        vm.transactions[i].category=vm.new_transaction.category;
                        vm.transactions[i].amount=vm.new_transaction.amount;
                        vm.transactions[i].mode=vm.new_transaction.mode;
                        vm.transactions[i].payer=vm.new_transaction.payer;
                        vm.transactions[i].payee=vm.new_transaction.payee;
                        vm.transactions[i].notes=vm.new_transaction.notes;
                        vm.transactions[i].type=vm.new_transaction.type;
                        
                          }
            }       
		  			$scope.toggleText ='New Transaction';

                   clearRecordPanel();
		  			$scope.transactionForm.$setPristine();
		$scope.transactionForm.$setUntouched();
                    $scope.DisplaySave = true;
                    $scope.DisplayUpdate = false;
		  		$('.transaction-form').toggleClass('hidden');
		  		            $('.filter').toggleClass('hidden');


		  
	   };

   $scope.toggle = true;   
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'New Transaction' : 'Close Transaction';
        $('.transaction-form').toggleClass('hidden');
         $scope.DisplaySave = true;
            $('.filter').toggleClass('hidden');
               //Displaying Update button
        $scope.DisplayUpdate = false;
		clearRecordPanel();
    });
				 
});