"use strict";
define([],function(){
	var takeOrderController = function($scope, $rootScope, $state, activityId){
		$scope.activityId = activityId;
		$scope.orderedProductList = [];
		$scope.activeProduct = -1;
		$scope.isProductAdded = function(Id) {
			var index = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			if(index === -1) {return false;}
			return $scope.orderedProductList[index].isSelected;
		};
		$scope.showBody = function(Id){
			if($scope.activeProduct === Id){
				return {"display":"block"};
			}
			return {"display":"none"};
		};
		$scope.markActive = function(Id){
			if($scope.activeProduct !== Id) {
				$scope.activeProduct = Id;
			}
		};
		$scope.getTotalPrice = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var total = 0;
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				total = $scope.orderedProductList[productIndex].salesPrice * $scope.orderedProductList[productIndex].quantity;
			}
			return total;
		};
		$scope.getQuantity = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var q = 0;
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				q = $scope.orderedProductList[productIndex].quantity;
			}
			return q;
		};
		$scope.addProduct = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex === -1) {
				var oplEntry = {
					productId : product.Id,
					quantity : product.quantity,
					salesPrice : product.salesPrice,
					unitPrice : product.unitPrice,
					mrp : product.mrp,
					isSelected : true
				};
				$scope.activeProduct = -1;
				$scope.orderedProductList.push(oplEntry);
			} else {
				if(!$scope.orderedProductList[productIndex].isSelected) {
					$scope.orderedProductList[productIndex].isSelected = true;
					$scope.orderedProductList[productIndex].quantity = product.quantity;
					$scope.activeProduct = -1;
				}
			}
		};
		$scope.removeQuantity = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				product.quantity =  parseInt(product.quantity,10) - 1;
				if(product.quantity < 1) {
					product.quantity = 1;
				}
				$scope.orderedProductList[productIndex].quantity = product.quantity;
			}
		};
		$scope.addQuantity = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
					product.quantity = parseInt(product.quantity,10) + 1;
					$scope.orderedProductList[productIndex].quantity = product.quantity;
			}
		};
		$scope.updateQuantity = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				if(product.quantity < 1) {
					product.quantity = 1;
				}
				$scope.orderedProductList[productIndex].quantity = product.quantity;
			}
		};
		$scope.showDeleteButton = function(Id){
			return $scope.isProductAdded(Id);
		};
		$scope.removeProduct = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			if(productIndex !== -1) {
				if($scope.orderedProductList[productIndex].isSelected) {
					$scope.orderedProductList[productIndex].isSelected = false;
				}
			}
		};
		$scope.getTotalProducts = function(){
			var len = 0;
			$scope.orderedProductList.forEach(function(opl){if(opl.isSelected){len = len+1;}});
			return len;
		};
		$scope.getTotalAmount = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * opl.salesPrice);
				}
			});
			return total;
		};
		$scope.getMyProfit = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * (opl.salesPrice - opl.unitPrice));
				}
			});
			return total;
		};
		$scope.getShopOwnerMargin = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * (opl.mrp - opl.salesPrice));
				}
			});
			return total;
		};
		$scope.init = function(){
			$scope.activity = $scope.activityList.find(function(activity){
				return activity.Id == activityId;
			});
			$scope.productList.forEach(function(product){
				product.quantity = 1;
			});
		};
		$scope.init();
		$scope.cancel = function(){
			$scope.goPreviousPage('activityDetail',{
				id:$scope.activityId
			});
		};
		$scope.save = function(){
			$scope.goPreviousPage('activityDetail',{
				id:$scope.activityId
			});
		};
	};
	return takeOrderController;
});
