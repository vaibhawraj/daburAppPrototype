void 0!==forcetk.Client&&(forcetk.Client.prototype.SOAP={x2js:new X2JS,xmlns:"urn:enterprise.soap.sforce.com",endpointUrl:"",parent:function(){return this}},forcetk.Client.prototype.SOAP._createEnvelope=function(a){var b={};return this.sessionId?b.SessionHeader={sessionId:this.sessionId}:b={},['<?xml version="1.0" encoding="UTF-8"?>','<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"',' xmlns:xsd="http://www.w3.org/2001/XMLSchema"',' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">','<soapenv:Header xmlns="'+this.xmlns+'">',this.x2js.json2xml_str(b),"</soapenv:Header>",'<soapenv:Body xmlns="'+this.xmlns+'">',this.x2js.json2xml_str(a),"</soapenv:Body>","</soapenv:Envelope>"].join("")},forcetk.Client.prototype.SOAP.ajax=function(a,b,c,d){"use strict";var e=this.parent,f=this.endpointUrl;return $.ajax({type:"POST",async:this.asyncAjax,url:null!==this.proxyUrl?this.proxyUrl:f,contentType:"text/xml",cache:!1,processData:!1,data:c,success:a,error:!e.refreshToken||d?b:function(d,f,g){401===d.status?e.refreshAccessToken(function(d){e.setSessionToken(d.access_token,null,d.instance_url),e.SOAP.ajax(a,b,c,!0)},b):b(d,f,g)},dataType:"xml",beforeSend:function(a){null===e.proxyUrl||e.visualforce||a.setRequestHeader("SalesforceProxy-Endpoint",f),a.setRequestHeader(e.authzHeader,"Bearer "+e.sessionId),a.setRequestHeader("SOAPAction",'""'),a.setRequestHeader("X-User-Agent","salesforce-toolkit-rest-javascript/"+e.apiVersion)}})},forcetk.Client.prototype.SOAP.describeTabs=function(a,b){var c={describeTabs:""},d=this._createEnvelope(c),e=this;this.ajax(function(b){var c=e.x2js.xml2json(b);a(c.Envelope.Body.describeTabsResponse)},function(a){b(a)},d)},forcetk.Client.prototype.setSessionToken=function(a,b,c){"use strict";if(this.sessionId=a,this.apiVersion=void 0===b||null===b?"v29.0":b,void 0===c||null===c){this.visualforce=!0;var d=location.hostname.split("."),e=null;e=4===d.length&&"my"===d[1]?d[0]+"."+d[1]:3===d.length?d[0]:d[1],this.instanceUrl="https://"+e+".salesforce.com"}else this.instanceUrl=c;this.SOAP.endpointUrl=this.instanceUrl+"/services/Soap/c/"+this.apiVersion.substring(1),this.SOAP.sessionId=this.sessionId,this.SOAP.proxyUrl=this.proxyUrl,this.SOAP.parent=this,$.cookie("access_token",this.sessionId,1)},forcetk.Client.prototype.describeListViews=function(a,b,c){"use strict";return this.ajax("/"+this.apiVersion+"/sobjects/"+a+"/listviews/",b,c)},forcetk.Client.prototype.ajaxUrl=function(a,b,c,d,e,f){"use strict";var g=this,h=(this.visualforce?"":this.instanceUrl)+a;return $.ajax({type:d||"GET",async:this.asyncAjax,url:null===this.proxyUrl||this.visualforce?h:this.proxyUrl,contentType:"DELETE"===d?null:"application/json",cache:!1,processData:!1,data:e,success:b,error:!this.refreshToken||f?c:function(f,h,i){401===f.status?g.refreshAccessToken(function(f){g.setSessionToken(f.access_token,null,f.instance_url),g.ajax(a,b,c,d,e,!0)},c):c(f,h,i)},dataType:"json",beforeSend:function(a){null===g.proxyUrl||g.visualforce||a.setRequestHeader("SalesforceProxy-Endpoint",h),a.setRequestHeader(g.authzHeader,"Bearer "+g.sessionId),a.setRequestHeader("X-User-Agent","salesforce-toolkit-rest-javascript/"+g.apiVersion)}})});