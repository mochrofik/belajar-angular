(function() {
  'use strict';

  angular.module('myApp')

  .config(['$middlewareProvider', function($middlewareProvider) {
      $middlewareProvider.map({
 
        /** Don't allow anyone through */
        'nobody': function nobodyMiddleware() {
            //
        },
 
        /** Let everyone through */
        'everyone': function everyoneMiddleware() {
            // In order to resolve the middleware,
            // you MUST call this.next()
            this.next();
        },
 
       
        'auth': ['$sessionData', function authMiddleware($sessionData) {
          if ($sessionData.get('auth_key')) {
            this.next();
          }else{
            this.redirectTo('/login');
          }
        }]
 
    })
  }]);
  
})();