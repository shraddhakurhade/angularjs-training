'use strict';
angular.module('expenseManager').controller('RecurringController', function($scope,recurringservice,$filter) {
    
     	 $scope.recurrings = [];
        $scope.new_recurring = {};
	    $scope.date = new Date();

        $scope.getRecurrings = function() {
            recurringservice.getRecurrings()
                .then(function(recurrings) {
                    $scope.recurrings = recurrings;
                    console.log('Recurrings returned to controller.');
                    console.log("controller",$scope.recurrings);

                },
                function(data) {
                    console.log('Recurrings retrieval failed.');
                });
        }; 
    
    $scope.getRecurrings();

     $scope.removeRecurringRecord = function(index) {
		$scope.recurrings.splice(index, 1);
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
	
    function clearRecordPanel() {
		$scope.new_recurring.recurringId = '';
		$scope.new_recurring.date = '';
		$scope.new_recurring.category = '';
        $scope.new_recurring.amount = '';
		$scope.new_recurring.mode = '';
        $scope.new_recurring.payer = '';
		$scope.new_recurring.payee = '';
        $scope.new_recurring.notes = '';
		$scope.new_recurring.type = '';
		

	};
    
    $scope.saveRecurring = function(new_recurring){
		console.log("controller save before..")
   		recurringservice.postRecurring($scope.new_recurring);
    	clearRecordPanel(); 
		$scope.recurringForm.$setPristine();
		$scope.recurringForm.$setUntouched();
	};
    $scope.DisplayUpdate = false;
    $scope.DisplaySave = true;

      $scope.editRecurring = function (index) {
        		console.log("edit",index);
                for (var i in $scope.recurrings) {
                    if ($scope.recurrings[i].recurringId == index) {                 
                        $scope.new_recurring.recurringId=index;
                        $scope.new_recurring.date = $scope.recurrings[i].date;
                        $scope.new_recurring.category=$scope.recurrings[i].category;
                        $scope.new_recurring.amount=$scope.recurrings[i].amount;
                        $scope.new_recurring.mode=$scope.recurrings[i].mode;
                        $scope.new_recurring.payer=$scope.recurrings[i].payer;
                        $scope.new_recurring.payee=$scope.recurrings[i].payee;
                        $scope.new_recurring.notes=$scope.recurrings[i].notes;
                        $scope.new_recurring.type=$scope.recurrings[i].type;                   

                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                		$scope.toggleText ='Close Recurring';

                       $scope.recurringForm.$setPristine();
		               $scope.recurringForm.$setUntouched(); 

					}
				}

            };

      $scope.UpdateRecurring = function(index){
		  console.log("controller update", index);
		     recurringservice.update(index, $scope.new_recurring);
		  			$scope.toggleText ='Add Recurring';

                    clearRecordPanel();
		  			$scope.recurringForm.$setPristine();
		            $scope.recurringForm.$setUntouched();
                    $scope.DisplaySave = true;
                    $scope.DisplayUpdate = false;
		  
	   };	
	
	$scope.toggle = true;   
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Add Recurring' : 'Close Recurring';
        $('.recurring-form').toggleClass('hidden');
         $scope.DisplaySave = true;
            $('.filter').toggleClass('hidden');
               //Displaying Update button
        $scope.DisplayUpdate = false;
		clearRecordPanel();
    });
		
});