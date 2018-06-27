angular
		.module('app')
		.controller('Guest.LoginController', ['$scope', 'IndexService', Controller]);
	
	function Controller($scope, IndexService) { 
		IndexService.getRequest(data => {
			console.log(data)
		})
    }