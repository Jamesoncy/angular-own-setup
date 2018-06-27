
/*function Service($http) {
    var service = {}
    
    service.getApiSample = getApiSample
    return service

    function getApiSample(callback) {
        this.GlobalService.makeRequest("GET", 'GET','https://reqres.in/api/users?page=2', callback)
    }
}*/

class Service {
    constructor($http, $GlobalService) {
        this.http = $http
        this.GS = $GlobalService
    }

    getApiSample(callback) {
        this.GS.makeRequest("GET", 'GET','https://reqres.in/api/users?page=2', callback)
    }
    
}

angular.module('app.services')
    .service('IndexService', ['$http', 'GlobalService', Service])
