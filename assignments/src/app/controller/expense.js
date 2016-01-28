
 'use strict';
angular.module('expenseManager').
controller('ExpenseController', function($scope) {
       
    $scope.expenseRecord = [
{edate: '01/01/2016', rent: '6000', travel: '100', party: '4000', office: '200', studies: '200', shopping:'1000' }, 
{edate: '02/01/2016', rent: '', travel: '100', party: '', office: '200', studies: '100', shopping:'' },
{edate: '03/01/2016', rent: '', travel: '100', party: '', office: '200', studies: '100', shopping:'2000' }
	];
    
$scope.incomeRecord = [{idate: '01/01/2016', business:'', salary: '50000',interest_deposit: ''},
{idate: '02/01/2016', business:'', salary: '', interest_deposit: '10000'},
{idate: '03/01/2016', business:'10000', salary: '', interest_deposit: '2000'},
	];
    
	getRecordCount();
	function getRecordCount() {
		$scope.recordCount = $scope.expenseRecord.length;
        console.log($scope.expenseRecord.length);
	};
	
	function clearRecordPanel() {
		$scope.nedate = '';
		$scope.nrent = '';
		$scope.ntravel = '';
		$scope.nparty = '';
		$scope.noffice = '';
		$scope.nstudies = '';
		$scope.nshopping = '';
	};

	$scope.addExpenseRecord = function() {
		if ($scope.nedate === '' || $scope.nrent === '' || $scope.ntravel === '' || $scope.nparty === ''|| $scope.noffice === ''|| $scope.nstudies === ''|| $scope.nshopping === '') return false;
		
		$scope.expenseRecord.push({
			'edate': $scope.nedate, 
			'rent': $scope.nrent,
			'travel': $scope.ntravel,
		    'party': $scope.nparty,
			'office': $scope.noffice,
			'studies': $scope.nstudies,
		    'shopping': $scope.nshopping,	
		});	
		getRecordCount();
		clearRecordPanel();	
	};
	
	 $scope.removeRecord = function(idx) {
		$scope.expenseRecord.splice(idx, 1);
		getRecordCount();
	};
	
     $scope.toggle = true;   
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Add Expense' : 'Close';
        $('.expense-form').toggleClass('hidden');
        //$('.income-form').addClass('hidden');
		clearRecordPanel();
    });

    
	getRecordCounti();
	
	function getRecordCounti() {
		$scope.recordCount = $scope.incomeRecord.length;
        console.log($scope.incomeRecord.length);
	};
	
	function clearRecordPaneli() {
		$scope.nidate = '';
		$scope.nbusiness = '';
		$scope.nsalary = '';
		$scope.ninterest_deposit = '';		
	};

	$scope.addIncomeRecord = function() {
		if ($scope.nidate === '' || $scope.nbusiness === '' || $scope.nsalary === '' ||  $scope.ninterest_deposit === '') return false;
		
		$scope.incomeRecord.push({
			'idate': $scope.nidate, 
			'business': $scope.nbusiness,
			'salary': $scope.nsalary,
		    'interest_deposit': $scope.ninterest_deposit
		});	
		getRecordCounti();
		clearRecordPaneli();	
	};
 $scope.removeIncomeRecord = function(idx) {
		$scope.incomeRecord.splice(idx, 1);
		getRecordCounti();
	};
   
    $scope.toggle1 = true;   
    $scope.$watch('toggle1', function(){
        $scope.toggleTexti = $scope.toggle1 ? 'Add Income' : 'Close';
        $('.income-form').toggleClass('hidden');
		clearRecordPaneli();
    });

       
});
