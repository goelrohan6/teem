
'use strict';

angular.module('Teem')
  .directive('upgrading', [
  '$window', '$timeout',
  function($window, $timeout) {
    return {
      scope: true,
      link: function(scope){
        var appCache = $window.applicationCache;

        // Browsers not supporting Application Cache
        if (!appCache) {
          return;
        }

        appCache.addEventListener('downloading', function() {
          // Chrome is not triggering the cached event properly
          // Temporaly disabling the upgrading screen
          scope.upgrading = false;
        });

        appCache.addEventListener('cached', function() {
          scope.upgrading = false;
          // Need to apply scope
          $timeout();
        });

        appCache.addEventListener('error', function() {
          scope.upgrading = false;
          // Need to apply scope
          $timeout();
        });

        appCache.addEventListener('updateready', function() {
          scope.upgrading = false;
          // Need to apply scope
          $timeout(function() {
            appCache.swapCache();
            $window.location.reload();
          });
        });
      },
      templateUrl: 'upgrading.html'
    };
  }]);
