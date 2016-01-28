/*
 'use strict';
angular.module('expenseManager').
controller('IncomeController', function($scope) {
       
$scope.incomeRecord = [{idate: '01/01/2016', business:'', salary: '50000',interest_deposit: ''},
{idate: '02/01/2016', business:'', salary: '', interest_deposit: '10000'},
{idate: '03/01/2016', business:'10000', salary: '', interest_deposit: '2000'},
	];

     $scope.removeIncomeRecord = function(idx) {
		$scope.incomeRecord.splice(idx, 1);
		getRecordCount();
	};
   
	getRecordCount();
	
	function getRecordCount() {
		$scope.recordCount = $scope.incomeRecord.length;
        console.log($scope.incomeRecord.length);
	};
	
	function clearRecordPaneli() {
		$scope.idate = '';
		$scope.business = '';
		$scope.salary = '';
		$scope.interest_deposit = '';		
	};

	$scope.addIncomeRecord = function() {
		if ($scope.idate === '' || $scope.business === '' || $scope.salary === '' ||  $scope.interest_deposit === '') return false;
		
		$scope.incomeRecord.push({
			'edate': $scope.nidate, 
			'rent': $scope.nbusiness,
			'travel': $scope.nsalary,
		    'party': $scope.ninterest_deposit
		});	
		getRecordCount();
		clearRecordPaneli();	
	}

    $scope.toggle1 = true;   
    $scope.$watch('toggle1', function(){
        $scope.toggleTexti = $scope.toggle1 ? 'Add Income' : 'Close';
        $('.income-form').toggleClass('hidden');
		clearRecordPanel();
    });

});*/
