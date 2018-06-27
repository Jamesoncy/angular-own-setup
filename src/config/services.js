angular.module('app.services', [])



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

class Service {

    constructor($http) {
        this.http = $http
    }

    makeRequest( method, url, callback, requestBody = {}) {
        return this.http({
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

    dataServiceError(errorResponse) {
        $log.error('XHR failed for HistoryService');
        $log.error(errorResponse);
        return errorResponse;
    }
}

angular.module('app.services')
.service('GlobalService', ['$http', Service])
