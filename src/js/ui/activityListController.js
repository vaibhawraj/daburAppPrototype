"use strict";
define(['core/SfDataManager'],function(sfDataManager){
	var activityListController = function($scope, $rootScope,$state){
		$scope.accountList = [];
		$scope.showSpinner = false;
		$scope.goDetailPage = function(activity){
			logger.debug('Activity Clicked',activity);
			$scope.goNextPage('activityDetail',{
				id : activity.Id
			});
		};
		$scope.checkThis = function(act){
			act.check = true;
			$scope.goDetailPage(act);
		};
		$scope.onTaskLoad = function(records){
			$scope.setLoadTask(false);
			$scope.setActivityList(records);
			$scope.showSpinner = false;
			if(!$scope.$$phase) $scope.$apply();
		};
		$scope.onLoadFail = function(response){
			$scope.showSpinner = false;
			console.log(response);
		};
		$scope.init = function(){
			console.log('LoadTask',$scope.loadTask);
			if($scope.loadTask)	 {
				$scope.showSpinner = true;
				sfDataManager.getAllTask($scope.onTaskLoad, $scope.onLoadFail);
			} else {
				sfDataManager.getAllTask($scope.onTaskLoad, $scope.onLoadFail);
			}
		};
		$scope.init();
	};
	return activityListController;
});
