"use strict";
define(['json!core/../../bootconfig.json'],function(bootconfig){
	var oauthPlugin = {};

	//Initializing oauthPlugin
	var init = function(){
			//Check if we are in dev mode or on mobile device
			console.debug("Initializing oauthPlugin");
			if(typeof cordova != "undefined") {
				console.debug("Using device mode for oauthPlugin");
				var oauthPluginTemp = cordova.require("com.salesforce.plugin.oauth");
				for(var attName in oauthPluginTemp) {
					this[attName] = oauthPluginTemp[attName];
				}
			} else {
				console.debug("Using developer mode for oauthPlugin");
				window.handleOauthResponse = handleOauthResponse;
				this.successCallback = null;
				this.errorCallback = null;
				this.getAuthCredentials = function(successCallback,errorCallback){
						this.successCallback = successCallback;
						this.errorCallback = errorCallback;
						//Check for localStorage first;
						var creds = localStorage.getItem("creds");
						if(creds !== null){
							creds = JSON.parse(creds);
							successCallback(creds);
						} else {
							//Begin login process
							var url = getAuthorizeUrl(bootconfig.loginUrl,bootconfig.remoteAccessConsumerKey,bootconfig.oauthRedirectURI);
							console.debug('Login Url',url);
							window.open(url);
						}
					};
				this.logout = function(){
					localStorage.removeItem("creds");
					logger.info('Successfully Logout');
					//throw new Error("Logout method is not implemented for oauthPlugin");
				};

				//define handleOauthResponse
			}
	};

	var getAuthorizeUrl = function(loginUrl,clientId,redirectUri){
		return loginUrl+'/services/oauth2/authorize?display=popup'+
			'&response_type=token&client_id='+escape(clientId)+
			'&redirect_uri='+escape(redirectUri);
	};

	var handleOauthResponse = function(oauth){
		console.debug("Received oauth response",oauth);
		//creds = {creds.accessToken,creds.instanceUrl,creds.refreshToken,creds.userId, creds.orgId, creds.identityUrl} - Actual oauthResponse
		var creds = {
			accessToken:oauth.access_token,
			instanceUrl:oauth.instance_url,
			userId:oauth.id.split('/')[5],
			orgId:oauth.id.split('/')[4],
			refreshToken:oauth.refresh_token,
			identityUrl:oauth.id
		};
		localStorage.setItem("creds",JSON.stringify(creds));
		oauthPlugin.successCallback(creds);
	};
	oauthPlugin.init = init;
	return oauthPlugin;
});