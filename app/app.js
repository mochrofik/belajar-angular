'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'oc.lazyLoad',
  'ui.router',
  'ngCookies',
  // 'ngRoute',
  // 'myApp.view1',
  // 'myApp.view2',
  // 'myApp.version'
])  .factory('$globalVariable', globalVariable)
.factory('$sessionData', sessionData)


globalVariable.$inject = [];
function globalVariable() {
  function _global() {

    // akses uat --> http://ldms-web-uat.mamorasoft.com
    
    // this.base_url_login = "http://ldms-login-uat.mamorasoft.com";
    // this.base_url = "http://ldms-api-uat.mamorasoft.com";

    // this.base_url_login = "https://api-pismart-dev.pupuk-indonesia.com/oauth_api";
    // this.base_url       = "https://api-pismart-dev.pupuk-indonesia.com/vendor_diklat";
    // this.urlPILDMS      = "https://pismart-dev.pupuk-indonesia.com/pismart-web-vendor-diklat-angular";
    this.base_url_login = "http://ldms-login-dev.mamorasoft.com";
    this.base_url       = "http://ldms-api-dev.mamorasoft.com";
    this.urlPILDMS      = "http://ldms-web-dev.mamorasoft.com/ldms";
    this.hash_key       = '!dweCEIJ!@321ASDNU123I1na!';
    this.is_prod = false; // true itu live..
    // this.base_url = "http://192.168.50.64:8000";
    // this.base_url = "http://127.0.0.1:8000";
    this.configRouter = {};
  }
  _global.prototype = {
    // getUrl: function (url) {
    //   return this.base_url+url;
    // }
  }
  return new _global();
}


sessionData.$inject = ['$cookies'];
function sessionData($cookies) {
  function _session() {
    this.data = {};
    var tmp = $cookies.get("SessionData");
    if (tmp) {
      this.data = JSON.parse(tmp);
    }
  }
  _session.prototype = {
    set: function (name, value) {
      this.data[name] = value;
      $cookies.put("SessionData", JSON.stringify(this.data));
    },
    get: function (name) {
      return this.data[name];
    },
    remove: function (name) {
      delete this.data[name];
      $cookies.put("SessionData", JSON.stringify(this.data));
    }
  }
  return new _session();
}

// window.confirm = function (params) {
  
// }
