// lazyload config
(function() {
  'use strict';
  
  angular
  .module('myApp')
  .constant('MODULE_CONFIG', [
    {
      name: 'MomentJS',
      files: [
          'lib/moment/moment.js',
          'lib/moment/min/moment-with-locales.min.js'
      ]
    },
    {
      name: 'sweetalert2',
      files: [
        'lib/sweetalert2/dist/sweetalert2.all.min.js'
      ]
    },
    {
      name: 'fullcalendar',
      files: [
        'lib/fullcalendar/main.min.css',
        'lib/fullcalendar/main.min.js'
      ]
    },
    {
      name: 'ui.bootstrap',
      serie: true,
      files: [
        'lib/ui-bootstrap4/dist/ui-bootstrap-csp.css',
        'lib/ui-bootstrap4/dist/ui-bootstrap-tpls.js'
      ]
    },
    {
      name: 'datatable',
      serie: true,
      files: [
        '//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css',
        '//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js'
      ]
    },
    {
      name: 'ckeditor',
      files: [
        '//cdn.ckeditor.com/4.14.1/basic/ckeditor.js'
      ]
    }
  ])
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', 
    function($ocLazyLoadProvider, MODULE_CONFIG) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: false,
        modules: [MODULE_CONFIG]
      });
    }
  ]);
})();

