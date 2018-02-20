(function(){var g=YAHOO.util.Dom,l=YAHOO.util.Event,c=YAHOO.util.Element;Alfresco.UserProfile=function(o){Alfresco.UserProfile.superclass.constructor.call(this,"Alfresco.UserProfile",o,["button"]);return this};YAHOO.extend(Alfresco.UserProfile,Alfresco.component.Base,{options:{userId:"",profile:{}},fileUpload:null,onReady:function a(){if(this.options.profile.isEditable){this.widgets.upload=Alfresco.util.createYUIButton(this,"button-upload",this.onUpload);this.widgets.signUpload=Alfresco.util.createYUIButton(this,"sign-upload",this.onSignUpload);this.widgets.clearphoto=Alfresco.util.createYUIButton(this,"button-clearphoto",this.onClearPhoto);this.widgets.edit=Alfresco.util.createYUIButton(this,"button-edit",this.onEditProfile);this.widgets.save=Alfresco.util.createYUIButton(this,"button-save",null,{type:"submit",additionalClass:"alf-primary-button"});this.widgets.cancel=Alfresco.util.createYUIButton(this,"button-cancel",this.onCancel);var o=new Alfresco.forms.Form(this.id+"-form");this.widgets.form=o;o.setSubmitElements(this.widgets.save);o.setSubmitAsJSON(true);o.setAJAXSubmit(true,{successCallback:{fn:this.onSuccess,scope:this}});o.addValidation(this.id+"-input-firstName",Alfresco.forms.validation.mandatory,null,"keyup");o.addValidation(this.id+"-input-email",Alfresco.forms.validation.mandatory,null,"keyup");o.addValidation(this.id+"-input-email",Alfresco.forms.validation.email,null,"keyup");o.addValidation(this.id+"-input-companyemail",Alfresco.forms.validation.email,null,"keyup");o.addValidation(this.id+"-input-telephone",Alfresco.forms.validation.phone,null,"keyup");o.addValidation(this.id+"-input-mobile",Alfresco.forms.validation.phone,null,"keyup");o.addValidation(this.id+"-input-companytelephone",Alfresco.forms.validation.phone,null,"keyup");o.addValidation(this.id+"-input-companyfax",Alfresco.forms.validation.phone,null,"keyup");o.init()}if(this.options.profile.isEditable&&window.location.hash=="#edit"){this.onEditProfile()}else{g.removeClass(this.id+"-readview","hidden")}this.widgets.following=Alfresco.util.createYUIButton(this,"button-following",this.onFollowing)},onEditProfile:function n(r,s){g.addClass(this.id+"-readview","hidden");var q=this.options.profile,o=this.id+"-input-";g.get(o+"lastName").value=q.lastName;g.get(o+"firstName").value=q.firstName;g.get(o+"jobtitle").value=q.jobtitle;g.get(o+"location").value=q.location;g.get(o+"bio").value=q.bio;g.get(o+"telephone").value=q.telephone;g.get(o+"mobile").value=q.mobile;g.get(o+"email").value=q.email;g.get(o+"skype").value=q.skype;g.get(o+"instantmsg").value=q.instantmsg;g.get(o+"googleusername").value=q.googleusername;g.get(o+"organization").value=q.organization;g.get(o+"companyaddress1").value=q.companyaddress1;g.get(o+"companyaddress2").value=q.companyaddress2;g.get(o+"companyaddress3").value=q.companyaddress3;g.get(o+"companypostcode").value=q.companypostcode;g.get(o+"companytelephone").value=q.companytelephone;g.get(o+"companyfax").value=q.companyfax;g.get(o+"companyemail").value=q.companyemail;this.widgets.form.validate();g.removeClass(this.id+"-editview","hidden")},onUpload:function k(p,q){if(this.fileUpload===null){this.fileUpload=Alfresco.getFileUploadInstance()}var o={flashUploadURL:"slingshot/profile/uploadavatar",htmlUploadURL:"slingshot/profile/uploadavatar.html",username:this.options.userId,mode:this.fileUpload.MODE_SINGLE_UPLOAD,onFileUploadComplete:{fn:this.onFileUploadComplete,scope:this}};this.fileUpload.show(o);l.preventDefault(p)},onSignUpload:function e(p,q){if(this.fileUpload===null){this.fileUpload=Alfresco.getFileUploadInstance()}var o={flashUploadURL:"slingshot/profile/uploadesign",htmlUploadURL:"slingshot/profile/uploadesign.html",username:this.options.userId,mode:this.fileUpload.MODE_SINGLE_UPLOAD,onFileUploadComplete:{fn:this.onSignUploadComplete,scope:this}};this.fileUpload.show(o);l.preventDefault(p)},onClearPhoto:function d(o,p){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"slingshot/profile/resetavatar/"+encodeURIComponent(this.options.userId),method:Alfresco.util.Ajax.PUT,requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:function(q){var r=g.getElementsByClassName("photoimg","img");for(i in r){r[i].src=Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png"}},scope:this}})},onFileUploadComplete:function f(o){var s=o.successful.length;if(s>0){var r=o.successful[0].nodeRef;var t=g.getElementsByClassName("photoimg","img");for(i in t){t[i].src=Alfresco.constants.PROXY_URI+"api/node/"+r.replace("://","/")+"/content/thumbnails/avatar?c=force"}var q={};q[this.id+"-photoref"]=r;var p={method:"POST",url:g.get(this.id+"-form").attributes.action.nodeValue,dataObj:q};Alfresco.util.Ajax.jsonRequest(p)}},onSignUploadComplete:function m(o){var s=o.successful.length;if(s>0){var r=o.successful[0].nodeRef;var t=g.getElementsByClassName("signImg","img");for(i in t){t[i].src=Alfresco.constants.PROXY_URI+"api/node/"+r.replace("://","/")+"/content/thumbnails/esign?c=force"}var q={};q[this.id+"-photoref1"]=r;var p={method:"POST",url:g.get(this.id+"-form").attributes.action.nodeValue,dataObj:q};Alfresco.util.Ajax.jsonRequest(p)}},onSuccess:function b(o){if(o){if(window.location.hash=="#edit"){window.location=window.location.href.replace(/#.*/,"")}else{location.reload(true)}}else{Alfresco.util.PopupManager.displayPrompt({text:Alfresco.util.message("message.failure",this.name)})}},onCancel:function j(o,p){g.addClass(this.id+"-editview","hidden");g.removeClass(this.id+"-readview","hidden")},onFollowing:function h(p,q){var o="/api/subscriptions/"+encodeURIComponent(Alfresco.constants.USERNAME)+"/"+(this.options.follows?"unfollow":"follow");Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.PROXY_URI+o,dataObj:[this.options.profile.name],successCallback:{fn:function(){window.location.reload()},scope:this}})}})})();