;(function() {
"use strict";

'use strict';

angular.module('app', ['templates', 'app.routes', 'app.services']);
}());

;(function() {
"use strict";

'use strict';

angular.module('templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('dashboard/dashboard.html', '<h1>Dashboard</h1>\n<button ng-click = "click()" value = "tewqdsada"></button>');
  $templateCache.put('login/login.html', '<h1>Login</h1>');
}]);
}());

;(function() {
"use strict";

'use strict';

angular.module('app.routes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'login/login.html',
    controller: 'Guest.LoginController'
  }).when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'Admin.DashboardController'
  });
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: '/' });
}]);
}());

;(function() {
"use strict";

'use strict';

angular.module('app.services', []);

angular.module('app.services').factory('GlobalService', ['$http', Service]);

/*class Service {
    constructor($http) {
        this.http = $http
    }

    makeRequest(method, url, callback, requestBody) {
        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        })
        .then(function(response) {
            callback(response.data);
        })
        .catch(this.dataServiceError);
    }

    dataServiceError(errorResponse) {
        $log.error('XHR failed for HistoryService');
        $log.error(errorResponse);
        $state.go('login');
        return errorResponse;
    }
}*/

function Service($http) {
    var service = {};
    service.makeRequest = makeRequest;
    service.dataServiceError = dataServiceError;

    return service;

    function makeRequest(method, url, callback) {
        var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        }).then(function (response) {
            callback(response.data);
        }).catch(dataServiceError);
    }

    function dataServiceError(errorResponse) {
        $log.error('XHR failed for HistoryService');
        $log.error(errorResponse);
        $state.go('login');
        return errorResponse;
    }
}
}());

;(function() {
"use strict";

'use strict';

angular.module('app.services').factory('IndexService', ['$http', 'GlobalService', Service]);

function Service($http, GlobalService) {
    var service = {};
    service.getRequest = getApiSample;

    return service;

    function makeRequest(method, url, callback) {
        var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        }).then(function (response) {
            callback(response.data);
        }).catch(GlobalService.dataServiceError);
    }

    function getApiSample(callback) {
        GlobalService.makeRequest('GET', 'https://reqres.in/api/users?page=2', callback, {});
    }
}
}());

;(function() {
"use strict";

'use strict';

angular.module('app').controller('Admin.DashboardController', ['$scope', Controller]);

function Controller($scope) {
		$scope.click = function () {
				alert();
		};
}
}());

;(function() {
"use strict";

'use strict';

angular.module('app').controller('Guest.LoginController', ['$scope', 'IndexService', Controller]);

function Controller($scope, IndexService) {
	IndexService.getRequest(function (data) {
		console.log(data);
	});
}
}());
