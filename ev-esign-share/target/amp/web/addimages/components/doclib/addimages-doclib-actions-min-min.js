(function(){var a="";YAHOO.Bubbling.fire("registerAction",{actionName:"onActionAddImagesToPdfFiles",fn:function b(c){var e="";var d=this;d.modules.actions.genericAction({success:{message:d.msg("message.addimages.success",c.displayName,Alfresco.constants.USERNAME)},failure:{message:d.msg("message.addimages.failure",c.displayName,Alfresco.constants.USERNAME)},webscript:{name:"handlefile?sourcenodeRef="+c.nodeRef,stem:Alfresco.constants.PROXY_URI,method:Alfresco.util.Ajax.GET},config:{}})}})})();