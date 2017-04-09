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
	};
	return activityListController;
});
