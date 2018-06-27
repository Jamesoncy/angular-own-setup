angular.module('app.services')
    .factory('IndexService', ['$http', 'GlobalService', Service])

function Service($http, GlobalService) {
    const service = {};
    service.getRequest = getApiSample
    
    return service

    function makeRequest( method, url, callback, requestBody = {}) {
        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        })
        .then(response => {
            callback(response.data);
        })
        .catch(GlobalService.dataServiceError);
    }

    function getApiSample(callback) {
        GlobalService.makeRequest('GET','https://reqres.in/api/users?page=2', callback, {})
    }
}