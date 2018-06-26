angular
		.module('app')
		.controller('Guest.LoginController', ['$scope', 'IndexService', Controller]);
	
	function Controller($scope, IndexService) { 
		IndexService.getRequest(function(data) {
			console.log(data)
		})
    }