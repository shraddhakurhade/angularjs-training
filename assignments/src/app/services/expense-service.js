   
      angular.module('expenseManager').factory('expenseService', function($http, $q) {
        // interface
              //  var id = $routeParams.locid; 
        var service = {
            expenses: [],
            getExpenses: getExpenses,
        };
        return service;

        // implementation
        function getExpenses() {
            var def = $q.defer();

            $http.get("app/api/expense.json")
                .success(function(data) {
                    service.expenses = data;
                //console.log(service.expenses);
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get expenses");
                });
            return def.promise;
        };

         /*function addExpense() {
            var def = $q.defer();

            $http.post("app/api/expense.json",data)
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get expenses");
                });
            return def.promise;
        } */ 
    });
      