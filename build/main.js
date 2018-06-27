;(function() {
"use strict";

'use strict';

angular.module('app', ['templates', 'app.routes', 'app.services']);
}());

;(function() {
"use strict";

'use strict';

angular.module('templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('dashboard/dashboard.html', '<h1>Dashboard</h1>\n<button type = "button" ng-click = "$ctrl.click()">tewqdsada</button>');
  $templateCache.put('login/login.html', '<h1>Login</h1>');
}]);
}());

;(function() {
"use strict";

'use strict';

angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('guest', {
        url: '/',
        templateUrl: 'login/login.html',
        controller: 'Guest.LoginController as $ctrl'
    }).state('admin', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'Admin.DashboardController as $ctrl'
    });
    $urlRouterProvider.otherwise("/");
}]);
}());

;(function() {
"use strict";

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('app.services', []);

/*function Service($http) {
    var service = {}
    service.makeRequest = makeRequest
    service.dataServiceError = dataServiceError
    
    return service

    function makeRequest( method, url, callback, requestBody = {}) {
        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        })
        .then(function(response) {
            callback(response.data);
        })
        .catch(dataServiceError);
    }

    function dataServiceError(errorResponse) {
        $log.error('XHR failed for HistoryService');
        $log.error(errorResponse);
        return errorResponse;
    }
}*/

var Service = function () {
    function Service($http) {
        _classCallCheck(this, Service);

        this.http = $http;
    }

    _createClass(Service, [{
        key: 'makeRequest',
        value: function makeRequest(method, url, callback) {
            var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return this.http({
                'url': url,
                'method': method,
                'data': requestBody,
                ignoreLoadingBar: true
            }).then(function (response) {
                callback(response.data);
            }).catch(dataServiceError);
        }
    }, {
        key: 'dataServiceError',
        value: function dataServiceError(errorResponse) {
            $log.error('XHR failed for HistoryService');
            $log.error(errorResponse);
            return errorResponse;
        }
    }]);

    return Service;
}();

angular.module('app.services').service('GlobalService', ['$http', Service]);
}());

;(function() {
"use strict";

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*function Service($http) {
    var service = {}
    
    service.getApiSample = getApiSample
    return service

    function getApiSample(callback) {
        this.GlobalService.makeRequest("GET", 'GET','https://reqres.in/api/users?page=2', callback)
    }
}*/

var Service = function () {
    function Service($http, $GlobalService) {
        _classCallCheck(this, Service);

        this.http = $http;
        this.GS = $GlobalService;
    }

    _createClass(Service, [{
        key: 'getApiSample',
        value: function getApiSample(callback) {
            this.GS.makeRequest("GET", 'GET', 'https://reqres.in/api/users?page=2', callback);
        }
    }]);

    return Service;
}();

angular.module('app.services').service('IndexService', ['$http', 'GlobalService', Service]);
}());

;(function() {
"use strict";

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller($scope) {
		_classCallCheck(this, Controller);

		this.scope = $scope;
		this.onLoad();
	}

	_createClass(Controller, [{
		key: 'onLoad',
		value: function onLoad() {}
	}, {
		key: 'click',
		value: function click() {
			alert('Click');
		}
	}]);

	return Controller;
}();

angular.module('app').controller('Admin.DashboardController', ['$scope', Controller]);
}());

;(function() {
"use strict";

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller($scope, IndexService) {
		_classCallCheck(this, Controller);

		this.scope = $scope;
		this.IS = IndexService;
		this.onLoad();
	}

	_createClass(Controller, [{
		key: 'onLoad',
		value: function onLoad() {
			this.IS.getRequest(function (data) {
				console.log(data);
			});
		}
	}, {
		key: 'updateUser',
		value: function updateUser(user) {
			this.UsersStore.updateUser(user);
		}
	}]);

	return Controller;
}();

angular.module('app').service('IndexService').controller('Guest.LoginController', ['$scope', 'IndexService', Controller]);
}());
