   angular.module('expenseManager').factory('expenseManagerService', function($http, $q) {
 		var that = this;
        this.transactions ={};
	   	var transactionId;
	    var date = new Date();

	   return { 
         getTransactions : function() {
            var def = $q.defer();

            $http.get("https://api.myjson.com/bins/1twfn")
                .success(function(transactions) {
                    def.resolve(transactions);
				    that.transactions = transactions;
					console.log("service get..",that.transactions)
                })
                .error(function() {
                    def.reject("Failed to get transaction");
                });
            return def.promise;
		 	},		

	   		postTransactions : function(new_transaction) {
		        var def = $q.defer();	
				if(that.transactions.length > 0) {
					transactionId = that.transactions[that.transactions.length - 1].transactionId;
                	transactionId = parseInt(transactionId, 10) + 1;
				} else {
					transactionId = 1;
				}				
				that.transactions.push({transactionId:transactionId, date:new_transaction.date, category:new_transaction.category, amount:new_transaction.amount, mode:new_transaction.mode, payer:new_transaction.payer, payee: new_transaction.payee, notes:new_transaction.notes, type:new_transaction.type });			           
				$http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',      
                data    : angular.toJson(that.transactions)
            }).success(function(transactions) {
                    def.resolve(transactions);
				    //that.transactions = transactions;
					console.log("service post..",that.transactions)
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
				for (var i in that.transactions) {
                    if (that.transactions[i].transactionId == id) { 
						index = i;
						break;
					}
				}
				that.transactions.splice(index,1);
				console.log("after service remove", index);
            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',
                data    : angular.toJson(that.transactions)
            }).success(function(transactions) {
                    def.resolve(transactions);
				    //var transactions = transactions;
					console.log("remove..",that.transactions)
                })
                .error(function() {
                    def.reject("Failed to Remove transaction");
                });
            return def.promise;

   			},
		   		
		    update : function(index, editdata){
				console.log("service index",index);
			var def = $q.defer();
				for (var i in that.transactions) {
                    if (that.transactions[i].transactionId == index) { 
            	//that.transactions[i].transactionId = editdata.transactionId;
				that.transactions[i].date = new Date(editdata.date);
				that.transactions[i].category = editdata.category;
				that.transactions[i].amount = editdata.amount;
				that.transactions[i].mode = editdata.mode;
				that.transactions[i].payer = editdata.payer;
				that.transactions[i].payee = editdata.payee;
				that.transactions[i].notes = editdata.notes;
				that.transactions[i].type = editdata.type;
					}
				}			
			console.log("service update", that.transactions[index]);

            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/1twfn',
                data    : angular.toJson(that.transactions) 
            }).success(function(transactions) {
                    def.resolve(transactions);
				    that.transactions = transactions;
					console.log("update Service..",that.transactions)
                })
                .error(function() {
                    def.reject("Failed to update transaction");
                });
            return def.promise;

			} 
				
	   };  
    });
      