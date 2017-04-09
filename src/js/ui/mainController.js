//mainController.js
//Defination for mainController

"use strict";
define(['json!productList','core/SfDataManager'],function(productList,sfDataManager){
	//var defaultView = "listView";
	//var defaultList = "today";
	/*
	*	This method is root controller of app and most of delegating work is assigned to this guy
	*	For more information on $scope, $route, $routeParams, $location
	*	Refer : https://docs.angularjs.org/api/ngRoute
	*
	*/
	var mainController = function($scope, $rootScope,$state/*,$ionicViewSwitcher*/ /*$routeParams, $location*/){

		/*$scope.$route = $route;
		$scope.$routeParams = $routeParams;
		$scope.$location = $location;
		console.log($route);
		console.log($location);
		console.log($routeParams);*/
		/*$scope.appName = "Nilkamal Activity Manager";
		$scope.$state = $state;*/
		$scope.direction = "forward";
		$scope.getTransitionDirection = function(){
			return $scope.direction;
		};
		$scope.init = function(){
			//Perform any initialization required here
			logger.info('Initializing mainController');
			
			//Regular cleanup process
			//SfDataManager.cleanupProcess();

			//This will directly redirect user to start page
			sfDataManager.mediator.subscribe('login successful','mainController',function(){
				window.setTimeout(function() {
					$(".splash").css("display","none");
				}, 100);
				$state.go('home');
			});
			sfDataManager.login();
			//$scope.initializeMainApp();
			
		};
		$scope.init();
		$scope.goPreviousPage = function(pageName,_params){
			$scope.direction = "backward";
			var params = {};
			if(typeof(_params) !== "undefined"){
				params = _params;
			}
			$scope.go(pageName,params);
		};
		$scope.go = function(pageName,params){
			window.setTimeout(function() {
				$state.go(pageName,params);
			}, 100);
		};
		$scope.goNextPage = function(pageName,_params){
			$scope.direction = "forward";
			var params = {};
			if(typeof(_params) !== "undefined"){
				params = _params;
			}
			$scope.go(pageName,params);
		};
		$scope.actions = [
			{
				actionLabel : "My Activities",
				iconName:"image/ic_assignment_white_48px.svg",
				action : function(){
					$scope.goNextPage('myActivity');
				}
			},
			{
				actionLabel : "Offers",
				iconName:"image/ic_card_giftcard_white_48px.svg",
				action : function(){
					$scope.goNextPage('offer');
				}
			},
			{
				actionLabel : "Dashboard",
				iconName:"image/ic_assessment_white_48px.svg",
				action : function(){
					$scope.goNextPage('dashboard');
				}
			},
			{
				actionLabel : "Logout",
				iconName:"image/ic_exit_to_app_white_48px.svg",
				action : function(){
					logger.info("Logging Out");
				}
			}
		];
		$scope.taskList = [];
		$scope.loadTask = true;
		$scope.setLoadTask = function(v){
			$scope.loadTask = v;
		};
		$scope.activityList = [
			{
				Id : 1,
				accountName : "Vikas Medical Store",
				shopOwner: "Mr. Rampal Singh",
				lastPurchase:"280.00",
				balanceDue:"50.00",
				todaysOrder:"180.00",
				check:false
			},
			{
				Id : 2,
				accountName : "Suraj Medical Store",
				shopOwner: "Mr. Suresh Mehta",
				lastPurchase:"280.00",
				balanceDue:"50.00",
				todaysOrder:"180.00",
				check:false
			},
			{
				Id : 3,
				accountName : "Reliance MediShop",
				shopOwner: "Mr. Kishore Das",
				lastPurchase:"280.00",
				balanceDue:"50.00",
				todaysOrder:"180.00",
				check:false
			},
			{
				Id : 4,
				accountName : "Himachal HerbalStore",
				shopOwner: "Mr. Vaynkatesh Prasad",
				lastPurchase:"280.00",
				balanceDue:"50.00",
				todaysOrder:"180.00",
				check:false
			}
		];
		$scope.productList = productList;
		/*
		$scope.hideSplash= function() {
			if(typeof navigator.splashscreen != "undefined") {
				console.debug('Hiding splashscreen');

				navigator.splashscreen.hide();
			}
		};
		$scope.initializeMainApp = function(){
			console.info('Initializing Main App');
			//Regular Cleanup process will be added here
			//As well as purging Database code will go here
			//$ionicViewSwitcher.nextDirection('forward');
			$state.go('listView',{sobjectName:'Event'});
			//Hide splash screen
			$scope.hideSplash();
		};
		$scope.init();
		
		$ionicPlatform.registerBackButtonAction(function(e){
			console.debug("Received backbutton event",e);
			if(window.isDeviceReady) {
				var ionViews = document.getElementsByTagName('ion-view');
				var  ionView;
				for(var i=0;i<ionViews.length;i++) {
					if(ionViews.item(i).getAttribute('nav-view')=="active") {
						ionView = ionViews.item(i);
					}
				}
				if(typeof ionView != "undefined") {
					var controller = angular.element(ionView).scope();
					if(typeof controller.backbutton != "undefined") {
							controller.backbutton();
					} else {
						console.error("backbutton method is not defined");
					}
				}
			}
		return;
		},101);
		//$scope.routeParams = $routeParams;

		//Set to start page
		//$location.path('listView/today');

		//Applicable for every child scope
		//All shared Variables
		$scope.cloudStatus = 'online';
		//Function help in changing shared variable
		$scope.setCloudStatus = function(status){
			$scope.cloudStatus = status;
		}

		$rootScope.$on('$stateChangeSuccess',function(event,toState, toParams, fromState, fromParams){
			var ionViews = document.getElementsByTagName('ion-view');
			var  ionView;
			for(var i=0;i<ionViews.length;i++) {
				if(ionViews.item(i).getAttribute('state')==toState.name) {
					ionView = ionViews.item(i);
				}
			}
			if(typeof ionView != "undefined") {
				var scope = angular.element(ionView).scope();
					
				if(typeof scope != "undefined" && typeof scope.stateChangeSuccess == "function")
					scope.stateChangeSuccess();
			}
    	});*/
	};

	//Export mainController
	return mainController;
});