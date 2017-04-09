"use strict";
define([],function(){
	var directive = function(){
		return {
			//Here Go Directive Configuration
			restrict:'E',
			templateUrl:'template/directive/spinnerTemplate.html'
		};
	};
	return directive;
});