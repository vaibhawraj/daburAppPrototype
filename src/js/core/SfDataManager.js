"use strict";
define(['core/SfClient','mediator/mediator'],function(client,m){
	logger.info('Initializing SfDataManager');
	var mediator = new m();
	var login = function(){
		client.login();
	};
	client.mediator.subscribe('login successful','SfDataManager',function(){
		logger.debug('I have received login message and I will mediate it now');
		mediator.publish('login successful');
	});
	var taskList = [];
	var getAllTask = function(){
		if(taskList.length === 0) {
			logger.info('Fetching Account');
			var query = 'SELECT Id FROM Task WHERE CreatedDate = TODAY';
			client.client.query(query,function(response){
				logger.debug('Got Response',response);
			},function(){

			});
		} 
		return taskList;
	};

	var saveCase = function(){

	};

	return {
		login:login,
		mediator:mediator,
		getAllTask:getAllTask,
		saveCase:saveCase
	};
});