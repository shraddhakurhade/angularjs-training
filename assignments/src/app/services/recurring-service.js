
      angular.module('expenseManager').factory('recurringservice', function($http, $q) {
		 var vm = this;
        this.recurrings ={};
	   	var recurringId;
	    var date = new Date();

	   return { 
         getRecurrings : function() {
            var def = $q.defer();

            $http.get("https://api.myjson.com/bins/3k25z")
                .success(function(recurrings) {
                    def.resolve(recurrings);
				    vm.recurrings = recurrings;
					console.log("service get..",vm.recurrings)
                })
                .error(function() {
                    def.reject("Failed to get Recurring transaction");
                });
            return def.promise;
		 	},		

	   		postRecurring : function(new_recurring) {
		        var def = $q.defer();	
				if(vm.recurrings.length > 0) {
					recurringId = vm.recurrings[vm.recurrings.length - 1].recurringId;
                	recurringId = parseInt(recurringId, 10) + 1;
				} else {
					recurringId = 1;
				}				
				vm.recurrings.push({recurringId:recurringId, date:new_recurring.date, category:new_recurring.category, amount:new_recurring.amount, mode:new_recurring.mode, payer:new_recurring.payer, payee: new_recurring.payee, notes:new_recurring.notes, type:new_recurring.type });			           
				$http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/3k25z',      
                data    : angular.toJson(vm.recurrings)
            }).success(function(recurrings) {
                    def.resolve(recurrings);
				    //vm.recurrings = recurrings;
					console.log("service post..",vm.recurrings)
                })
                .error(function() {
                    def.reject("Failed to create Recurring transaction");
                });
            return def.promise;
		 	},
		   
		    removeRecurring : function(id){
				console.log("service remove",id);
				var def = $q.defer();
				var index = "";
				for (var i in vm.recurrings) {
                    if (vm.recurrings[i].recurringId == id) { 
						index = i;
						break;
					}
				}
				vm.recurrings.splice(index,1);
				console.log("after service remove", index);
            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/3k25z',
                data    : angular.toJson(vm.recurrings)
            }).success(function(recurrings) {
                    def.resolve(recurrings);
				    //var recurrings = recurrings;
					console.log("remove..",vm.recurrings)
                })
                .error(function() {
                    def.reject("Failed to Remove Recurring transaction");
                });
            return def.promise;

   			},
		   		
		    update : function(index, editdata){
				console.log("service index",index);
			var def = $q.defer();
				for (var i in vm.recurrings) {
                    if (vm.recurrings[i].recurringId == index) { 
            	//vm.recurrings[i].recurringId = editdata.recurringId;
				vm.recurrings[i].date = new Date(editdata.date);
				vm.recurrings[i].category = editdata.category;
				vm.recurrings[i].amount = editdata.amount;
				vm.recurrings[i].mode = editdata.mode;
				vm.recurrings[i].payer = editdata.payer;
				vm.recurrings[i].payee = editdata.payee;
				vm.recurrings[i].notes = editdata.notes;
				vm.recurrings[i].type = editdata.type;
					}
				}			
			console.log("service update", vm.recurrings[index]);

            $http({
                method  : 'PUT',
                url     : 'https://api.myjson.com/bins/3k25z',
                data    : angular.toJson(vm.recurrings) 
            }).success(function(recurrings) {
                    def.resolve(recurrings);
				    vm.recurrings = recurrings;
					console.log("update Service..",vm.recurrings)
                })
                .error(function() {
                    def.reject("Failed to update Recurring transaction");
                });
            return def.promise;

			} 
				
	   };  
    });