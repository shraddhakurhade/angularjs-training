'use strict';
angular.module('expenseManager').controller('DashboardController', function($scope,expenseManagerService,$interval) {
	
        $scope.transactions = [];
        $scope.new_transaction = {};
	    $scope.date = new Date();
     
        $scope.getTransactions = function() {
            expenseManagerService.getTransactions()
                .then(function(transactions) {
                    $scope.transactions = transactions;
                    console.log('transactions returned to controller.');
                    console.log($scope.transactions);

                },
                function(data) {
                    console.log('transaction retrieval failed.');
                });
        }; 
      $scope.intervalPromise = $interval(function(){
    $scope.getTransactions();
    }, 10000); 
    $scope.getTransactions();
    
   $scope.totalExpense = function(){
    var total = 0;
		
    for(var i=0;i<$scope.transactions.length;i++){
	 if ($scope.transactions[i].type === "Expense") {
    	total = total + parseInt($scope.transactions[i].amount, 10);}
    }
    return total;
   };
    
	  $scope.totalIncome = function(){
    var total = 0;
		
    for(var i=0;i<$scope.transactions.length;i++){
	 if ($scope.transactions[i].type === "Income") {
    	total = total + parseInt($scope.transactions[i].amount, 10);}
    }
    return total;
   };
     
   function clearRecordPanel() {
		$scope.new_transaction.transactionId = '';
		$scope.new_transaction.date = '';
		$scope.new_transaction.category = '';
        $scope.new_transaction.amount = '';
		$scope.new_transaction.mode = '';
        $scope.new_transaction.payer = '';
		$scope.new_transaction.payee = '';
        $scope.new_transaction.notes = '';
		$scope.new_transaction.type = '';
		

	};
	 $scope.removeTransactionRecord = function(index){
		 console.log("remove controller index",index);
		 expenseManagerService.removeTransaction(index)
                .then(function(transactions) {
			    $scope.getTransactions();

		}); 
	 };
    
    $scope.saveTransaction = function(){	
        expenseManagerService.postTransactions($scope.new_transaction)
                .then(function(transactions) {
			    $scope.getTransactions();
			console.log("controller post..")
		});
    	clearRecordPanel(); 
		$scope.transactionForm.$setPristine();
		$scope.transactionForm.$setUntouched();
};
	
	
    $scope.DisplayUpdate = false;
    $scope.DisplaySave = true;

      $scope.editTransaction = function(index) {
         console.log("edit index",index);		
		   for (var i in $scope.transactions) {
                    if ($scope.transactions[i].transactionId == index) {
		                $scope.new_transaction.transactionId=index;
					console.log("edit controller", $scope.transactions[i].transactionId);

		  				//$scope.new_transaction = $scope.transactions[index];
                        $scope.new_transaction.date = new Date($scope.transactions[i].date);
                        $scope.new_transaction.category=$scope.transactions[i].category;
                        $scope.new_transaction.amount=$scope.transactions[i].amount;
                        $scope.new_transaction.mode=$scope.transactions[i].mode;
                        $scope.new_transaction.payer=$scope.transactions[i].payer;			                        		     $scope.new_transaction.payee=$scope.transactions[i].payee;
                      	$scope.new_transaction.notes=$scope.transactions[i].notes;
                        $scope.new_transaction.type=$scope.transactions[i].type;
           
                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                       $(".update").addClass("active");
                       $(".cactive").removeClass("active");
                       $("#newTransaction").addClass("in active");
                       $(".cactivet").removeClass("in active");
                        	$scope.transactionForm.$setPristine();
		            $scope.transactionForm.$setUntouched();
					}
		   }
               
            };

      $scope.UpdateTransaction = function(index){
		  console.log("controller update",index);
         expenseManagerService.update(index,$scope.new_transaction)
                .then(function(transactions) {
			    $scope.getTransactions();

					}); 
		  			$scope.toggleText ='New Transaction';
                    clearRecordPanel();
		  			$scope.transactionForm.$setPristine();
		            $scope.transactionForm.$setUntouched();
                    $scope.DisplaySave = true;
                    $scope.DisplayUpdate = false;
	   };

	 $scope.type = {
        data: [{
            id: 'id1',
            name: 'Expense'
        }, {
            id: 'id2',
            name: 'Income'
        }]
		};
	
		 $scope.mode = {
        data: [{
            id: 'id1',
            name: 'Cash'
        }, {
            id: 'id2',
            name: 'Electronic Transfer'
        }, {
            id: 'id3',
            name: 'Cheque'
        }, {
            id: 'id4',
            name: 'Credit Card'
        }]
		};
	
      $scope.category = {
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
				 
});
