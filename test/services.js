angular.module('app.services', [])

angular.module('app.services')
    .factory('GlobalService', ['$http', Service])

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

var Service = function ($http) {
    this.http = $http
}

Service.prototype.makeRequest = function ( method, url, callback, requestBody = {}) {
    return $http({
        'url': url,
        'method': method,
        'data': requestBody,
        ignoreLoadingBar: true
    })
    .then(response => {
        callback(response.data);
    })
    .catch(dataServiceError);
}

Service.prototype.makeRequest = function dataServiceError(errorResponse) {
    $log.error('XHR failed for HistoryService');
    $log.error(errorResponse);
    $state.go('login');
    return errorResponse;
}