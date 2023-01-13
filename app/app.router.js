(function(){
  'use strict';

  angular.module('myApp')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(
      function ($injector, $location) {
        var state = $injector.get('$state');
        state.go('login');
        return $location.path();
      }
    );

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/signin/index.html',
        data: { is_login: true },
        controller: 'LoginCtrl',
        resolve: {
          load: load(['controllers/login.js'])
        }
      })
      .state('app', {
        url: '/app',
        templateUrl: 'views/layout/template.html',
        controller: 'BerandaCtrl',
        resolve: {
          load: load(['controllers/beranda.js'])
        }
      })
      .state('app.index', {
        url: '/index',
        templateUrl: 'views/beranda/beranda.html',
        controller: 'BerandaCtrl',
        resolve: {
          load: load(['controllers/beranda.js', 'sweetalert2'])
        }
      }).state("logout", {
        url: "/logout",
        controller: function ($state, $sessionData, $globalVariable) {
          $sessionData.remove("auth");
          $sessionData.remove("employee_id");
          $sessionData.remove("auth_key");
          $sessionData.remove("nik");
          $sessionData.remove("user_role");
          $sessionData.remove("imStaff");
          $sessionData.remove("role_ojt");
          $sessionData.remove("deviceDetector");
          $sessionData.remove("deviceBrowser");
          $sessionData.remove("data_diri");
          $sessionData.remove("id_ojt_angkatan");
          $sessionData.remove("detailProfile");
          $globalVariable.configRouter.error["404"] = "login";
          $state.go("login");
        },
      })

  };

  function load(srcs, callback) {
    return ['$ocLazyLoad', '$q', 'MODULE_CONFIG',
      function ($ocLazyLoad, $q, MODULE_CONFIG) {
        var deferred = $q.defer();
        var promise = false;
        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
        if (!promise) {
          promise = deferred.promise;
        }
        angular.forEach(srcs, function (src) {
          promise = promise.then(function () {
            angular.forEach(MODULE_CONFIG, function (module) {
              if (module.name == src) {
                src = module.module ? module.name : module.files;
              }
            });
            return $ocLazyLoad.load(src);
          });
        });
        deferred.resolve();
        return callback ? promise.then(function () { return callback(); }) : promise;
      }]
  }
})()