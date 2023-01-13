(function(){
  'use strict';


  var globalConfigRouter = {
    error: {
      '404': '404'
    }
  };

  angular.module('myApp')
  .run(runBlock)
  .config(config);


  

  runBlock.$inject = ['$templateCache', '$rootScope', '$state', '$stateParams', '$globalVariable', '$sessionData'];
  function runBlock($templateCache, $rootScope, $state, $stateParams, $globalVariable, $sessionData) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeStart', function (e, r, n) {
    
    });

    var always_available = ['login'];
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      if (!always_available.includes(toState.name)) {
        // console.log( 
        //   {
        //     "arr": always_available, 
        //     "state": toState.name, 
        //     "auth": !$sessionData.get("auth_key")
        //   }
        // );
        if ($sessionData.get("auth") == undefined ) {
          event.preventDefault();
          $state.go('login');
        }
        if(typeof(toState.templateUrl)!== undefined){
          $templateCache.remove(toState.templateUrl);
        }
      }
    });
    $globalVariable.configRouter = globalConfigRouter;
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(
      function ($injector, $location) {
        var state = $injector.get('$state');
        state.go(globalConfigRouter.error['404']);
        // state.go('login');
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
        controller: 'DefaultCtrl',
        resolve: {
          load: load(['controllers/default.js'])
        }
      })
      .state('app.index', {
        url: '/index',
        templateUrl: 'views/beranda/404.html',
        // controller: 'SettingCtrl',
        // resolve: {
        //   load: load(['controllers/setting.js', 'sweetalert2'])
        // }
      })
      .state('app.setting', {
        url: '/setting',
        templateUrl: 'views/beranda/beranda.html',
        controller: 'SettingCtrl',
       
        resolve: {
          load: load(['controllers/setting.js', 'sweetalert2'])
        }
      })
      
      
      .state("logout", {
        url: "/logout",
        controller: function ($state, $sessionData, ) {
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
          $state.go("login");

          // console.log($state);


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