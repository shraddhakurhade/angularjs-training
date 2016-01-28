/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('expenseManager')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
