
	class Controller {
		constructor($scope) {
			this.scope = $scope
			this.onLoad()
		}

		onLoad() {
			
		}

		click() {
			alert('Click')
		}
	}

	angular
		.module('app')
		.controller('Admin.DashboardController', ['$scope', Controller]);