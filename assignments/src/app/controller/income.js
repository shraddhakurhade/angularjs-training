'use strict';
angular.module('expenseManager').controller('IncomeController', function($scope, incomeService) {
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

     nm.removeIncomeRecord = function(index) {
		nm.incomes.splice(index, 1);
		getRecordCount();
	};

     nm.list_incomes = {
        data: [{
            id: 'ID1',
            name: 'Business'
        }, {
            id: 'ID2',
            name: 'Salary'
        }, {
            id: 'ID3',
            name: 'Interest'
        }]
    };       
    nm.nlist_income = 'Salary';
    
      $scope.toggle1 = true;   
    $scope.$watch('toggle1', function(){
        $scope.toggleTexti = $scope.toggle1 ? 'Add Income' : 'Close';
        $('.income-form').toggleClass('hidden');
		//clearRecordPaneli();
    });  
    
    /*nm.submitIncome = function(isValid){
        if (nm.idate === '' || nm.list_income === '' || nm.amount === '') return false;

		nm.incomes.push({'idate':nm.idate, 'list_income': nm.list_income, 'amount':nm.amount});
		// Writing it to the server
		getRecordCount();
        clearRecordPanel();
        nm.submitIncome = true;
         if (isValid) {
              alert('Income Record has been posted successfully!');
            };
		var dataObj = {
				idate : nm.idate,
				list_income : nm.list_income,
				amount : nm.amount
		};
        
		var res = $http.post('/income.json', dataObj);
		res.success(function(data, status, headers, config) {
			nm.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
        nm.idate='';
		nm.list_income='';
		nm.amount='';
	};*/
    
        nm.new_income = {};
     function clearRecordPanel() {
		nm.new_income.id = '';
		nm.new_income.idate = '';
		nm.new_income.list_income = '';
        nm.new_income.amount = '';
		nm.new_income.mode = '';
	};
        nm.saveIncome = function(){	
             if (nm.new_income.id === '' || nm.new_income.idate === '' || nm.new_income.list_income === '' || nm.new_income.amount === '' || nm.new_income.mode === '') return false;
            nm.incomes.push({'id':nm.new_income.id,'idate':nm.new_income.idate, 'list_income': nm.new_income.list_income, 'amount':nm.new_income.amount, 'mode':nm.new_income.mode });
         clearRecordPanel();  
};
    $scope.DisplayUpdate = false;
    $scope.DisplaySave = true;

      nm.editIncome = function (iid) {
        
                for (var i in nm.incomes) {
                    if (nm.incomes[i].id == iid) {
                        nm.new_income.id=iid;
                        nm.new_income.idate=nm.incomes[i].idate;
                        nm.new_income.list_income=nm.incomes[i].list_income;
                        nm.new_income.amount=nm.incomes[i].amount;
                        nm.new_income.mode=nm.incomes[i].mode;
                        
                        
                        $('.income-form').removeClass('hidden');

                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                        //Clearing the Status
                    }
                }
            };

      nm.UpdateIncome = function(iid){	    
            for (var i in nm.incomes) {
                    if (nm.incomes[i].id == iid) {               
                        nm.incomes[i].idate=nm.new_income.idate;
                        nm.incomes[i].list_income=nm.new_income.list_income;
                        nm.incomes[i].amount=nm.new_income.amount;
                        nm.incomes[i].mode=nm.new_income.mode;
                          }
            }           
                   clearRecordPanel();
                    $scope.DisplaySave = true;
                    $scope.DisplayUpdate = false;
	   };
    
    
        nm.totalIncome = function(){
            var total = 0;
            for(var i=0;i<nm.incomes.length;i++){
            total = total + parseInt(nm.incomes[i].amount, 10);
            }
            return total;
        };
    });
