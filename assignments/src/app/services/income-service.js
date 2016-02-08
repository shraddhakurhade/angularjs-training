   
      angular.module('expenseManager').factory('incomeService', function($http, $q) {
        // interface
        var service = {
            income: [],
            getIncome: getIncome,
        };
        return service;

        // implementation
        function getIncome() {
            var def = $q.defer();

            $http.get("app/api/income.json")
                .success(function(data) {
                    service.income = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get expenses");
                });
            return def.promise;
        }
    });
      