  class Controller {
		constructor($scope, IndexService) {
			this.scope = $scope
			this.IS = IndexService
			this.onLoad()
		}
	
		onLoad() {
			this.IS.getRequest(function(data) {
				console.log(data)
			})
		}
	
		updateUser(user) {
			this.UsersStore.updateUser(user);
		}
	}

	angular
		.module('app')
		.service('IndexService')
		.controller('Guest.LoginController', ['$scope', 'IndexService', Controller]);
