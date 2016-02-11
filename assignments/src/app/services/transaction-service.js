   
      angular.module('expenseManager').factory('transactionService', function($http, $q) {
        var service = {
            transactions: [],
            getTransactions: getTransactions,
        };
        return service;

        // implementation
        function getTransactions() {
            var def = $q.defer();

            $http.get("app/api/transaction.json")
                .success(function(data) {
                    service.transactions = data;
                console.log(service.transactions);
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get transaction");
                });
            return def.promise;
        };
 
    });
      