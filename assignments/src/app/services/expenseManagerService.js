   angular.module('expenseManager').factory('expenseManagerService', function($http, $q) {
 		var vm = this;
        this.transactions ={};
	   	var transactionId;
	    var date = new Date();

	   return { 
         getTransactions : function() {
            var def = $q.defer();

            $http.get("https://api.myjson.com/bins/1twfn")
                .success(function(transactions) {
                    def.resolve(transactions);
				    vm.transactions = transactions;
					console.log("service get..",vm.transactions)
                })
                .error(function() {
                    def.reject("Failed to get transaction");
                });
            return def.promise;
		 	},		

	   		postTransactions : function(new_transaction) {
		        var def = $q.defer();	
				if(vm.transactions.length > 0) {
					transactionId = vm.transactions[vm.transactions.length - 1].transactionId;
                	transactionId = parseInt(transactionId, 10) + 1;
				} else {
					transactionId = 1;
				}				
				vm.transactions.push({transactionId:transactionId, date:new_transaction.date, category:new_transaction.category, amount:new_transaction.amount, mode:new_transaction.mode, payer:new_transaction.payer, payee: new_transaction.payee, notes:new_transaction.notes, type:new_transaction.type });			           
				$http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',      
                data    : angular.toJson(vm.transactions)
            }).success(function(transactions) {
                    def.resolve(transactions);
				    //vm.transactions = transactions;
					console.log("service post..",vm.transactions)
                })
                .error(function() {
                    def.reject("Failed to create transaction");
                });
            return def.promise;
		 	},
		   
		    removeTransaction : function(id){
				console.log("service remove",id);
				var def = $q.defer();
				var index = "";
				for (var i in vm.transactions) {
                    if (vm.transactions[i].transactionId == id) { 
						index = i;
						break;
					}
				}
				vm.transactions.splice(index,1);
				console.log("after service remove", index);
            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',
                data    : angular.toJson(vm.transactions)
            }).success(function(transactions) {
                    def.resolve(transactions);
				    //var transactions = transactions;
					console.log("remove..",vm.transactions)
                })
                .error(function() {
                    def.reject("Failed to Remove transaction");
                });
            return def.promise;

   			},
		   		
		    update : function(index, editdata){
				console.log("service index",index);
			var def = $q.defer();
				for (var i in vm.transactions) {
                    if (vm.transactions[i].transactionId == index) { 
            	//vm.transactions[i].transactionId = editdata.transactionId;
				vm.transactions[i].date = new Date(editdata.date);
				vm.transactions[i].category = editdata.category;
				vm.transactions[i].amount = editdata.amount;
				vm.transactions[i].mode = editdata.mode;
				vm.transactions[i].payer = editdata.payer;
				vm.transactions[i].payee = editdata.payee;
				vm.transactions[i].notes = editdata.notes;
				vm.transactions[i].type = editdata.type;
					}
				}			
			console.log("service update", vm.transactions[index]);

            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',
                data    : angular.toJson(vm.transactions) 
            }).success(function(transactions) {
                    def.resolve(transactions);
				    vm.transactions = transactions;
					console.log("update Service..",vm.transactions)
                })
                .error(function() {
                    def.reject("Failed to update transaction");
                });
            return def.promise;

			} 
				
	   };  
    });
      