(function(){var d=YAHOO.util.Dom,C=YAHOO.util.Event;var u=Alfresco.util.encodeHTML,z=Alfresco.util.isValueSet;Alfresco.DocumentListViewRenderer=function(D,E,F){this.name=D;this.parentDocumentList=E;this.parentElementIdSuffix="-documents";this.rowClassName="yui-dt-rec";this.actionsCssClassName=this.name;this.actionsColumnWidth=200;this.actionsSplitAtModifier=1;this.thumbnailColumnWidth=100;this.buttonElementIdSuffix="-"+this.name+"View";this.buttonCssClass=this.name+"-view";this.metadataBannerViewName=this.name;this.metadataLineViewName=this.name;if(F!=null){this.folderIconConfig=YAHOO.lang.JSON.parse(F).browse.folder}else{this.folderIconConfig={}}return this};Alfresco.DocumentListViewRenderer.prototype={setupRenderer:function m(D){d.addClass(D.id+this.buttonElementIdSuffix,this.buttonCssClass)},renderView:function s(F,D,E,G){YAHOO.util.Dom.setStyle(F.id+this.parentElementIdSuffix,"display","");F.widgets.dataTable.onDataReturnInitializeTable.call(F.widgets.dataTable,D,E,G)},destroyView:function k(F,D,E,G){YAHOO.util.Dom.setStyle(F.id+this.parentElementIdSuffix,"display","none")},renderCellSelected:function c(M,K,O,I,E){d.setStyle(K,"width",I.width+"px");d.setStyle(K.parentNode,"width",I.width+"px");var F=O.getData("jsNode"),L=F.nodeRef,D=O.getData("displayName"),H=document.createElement("input"),J=document.createElement("label");H.id="checkbox-"+O.getId();H.type="checkbox";H.name="fileChecked";H.value=L;H.checked=M.selectedFiles[L]?true:false;J.id="label_for_"+H.id;J.style.fontSize="0em";J.innerHTML=(H.checked?M.msg("checkbox.uncheck"):M.msg("checkbox.check"))+" "+D;J.setAttribute("for",H.id);K.innerHTML="";K.appendChild(J);K.appendChild(H);C.addListener(H,"click",function(P){J.innerHTML=(H.checked?M.msg("checkbox.uncheck"):M.msg("checkbox.check"))+" "+D},H,true);var N=d.getAncestorByTagName(K,"tr");C.addListener(H,"focus",function(){G(this);this.onEventHighlightRow({target:N})},this.parentDocumentList,true);new YAHOO.util.KeyListener(H,{keys:YAHOO.util.KeyListener.KEY.TAB,shift:true},{fn:function(){G(this);var P=d.getPreviousSibling(N);if(P!==null){this.onEventHighlightRow({target:P})}},scope:this.parentDocumentList,correctScope:true},"keydown").enable();function G(Q){var R=d.getElementsByClassName("yui-dt-highlighted","tr",d.getAncestorByTagName(N,"tbody"));for(var P=0;P<R.length;P++){Q.onEventUnhighlightRow({target:R[P]})}}},renderCellStatus:function o(O,M,P,I,D){d.setStyle(M,"width",I.width+"px");d.setStyle(M.parentNode,"width",I.width+"px");var G=P.getData(),E=G.jsNode,L=G.indicators,K,J,H="";if(L&&L.length>0){for(var F=0,N=L.length;F<N;F++){K=L[F];J=Alfresco.util.message(K.label,O.name,K.labelParams);J=Alfresco.util.substituteDotNotation(J,G);H+='<div class="status">';if(K.action){H+='<a class="indicator-action" data-action="'+K.action+'">'}H+='<img src="'+Alfresco.constants.URL_RESCONTEXT+"components/documentlibrary/indicators/"+K.icon+'" title="'+J+'" alt="'+K.id+'" />';if(K.action){H+="</a>"}H+="</div>"}}M.innerHTML=H},renderCellThumbnail:function e(Q,P,R,L,H){var K=R.getData(),I=K.jsNode,N=I.properties,E=K.displayName,G=I.isContainer,J=I.isLink,M=E.substring(E.lastIndexOf(".")),D=I.nodeRef.nodeRef;var O;if(window.location.href.search(/\/sharedfiles/)!=-1&&K.location.path.search("/Shared")==0){K.location.path=K.location.path.substring(7)}L.width=this.thumbnailColumnWidth;d.setStyle(P,"width",L.width+"px");d.setStyle(P.parentNode,"width",L.width+"px");if(G||(J&&I.linkedNode.isContainer)){P.innerHTML='<span class="folder">'+(J?'<span class="link"></span>':"")+(Q.dragAndDropEnabled?'<span class="droppable"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(Q,K)+'<img id="'+D+'" src="'+this.getFolderIcon(K.node)+'" /></a>';O=new YAHOO.util.DDTarget(D)}else{P.innerHTML='<span class="thumbnail">'+(J?'<span class="link"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(Q,K)+'<img id="'+D+'" src="'+Alfresco.DocumentList.generateThumbnailUrl(K)+'" alt="'+M+'" title="'+u(E)+'" /></a></span>'}var F=new Alfresco.DnD(D,Q)},getFolderIcon:function r(D){var E=new Alfresco.CommonComponentIconFilterChain(D,this.folderIconConfig,this.getDefaultFolderIcon(),this.getIconSize());var F=E.createIconResourceName();return Alfresco.constants.URL_RESCONTEXT+F},getDefaultFolderIcon:function a(){return"components/documentlibrary/images/folder-64.png"},getIconSize:function q(){return"64x64"},renderCellDescription:function t(D,K,ab,Q,V){var Y="",X,W,H=ab.getData(),Z=H.jsNode,L=Z.properties,M=Z.isContainer,N=Z.isLink,af="",T="",I="",J=Z.permissions.user.CreateChildren;if(Z.isLink){ab.setData("displayName",H.fileName.replace(/(.url)$/,""))}else{if(L.title&&L.title!==H.displayName&&D.options.useTitle){T='<span class="title">('+u(L.title)+")</span>"}}if(!Z.hasAspect("cm:workingcopy")&&z(H.version)&&!Z.isContainer&&!Z.isLink){I='<span class="document-version">'+u(H.version)+"</span>"}H._filenameId=Alfresco.util.generateDomId();var U=H.metadataTemplate;if(U){if(YAHOO.lang.isArray(U.banners)){var ad=function G(ai,ak,ah){var ag=(ah!==null?D.msg(ah)+": ":""),aj="";if(D.renderers.hasOwnProperty(ai)&&typeof D.renderers[ai]==="function"){aj=D.renderers[ai].call(D,H,ag)}else{if(Z.hasProperty(ai)){aj='<span class="item">'+ag+D.renderProperty(Z.properties[ai])+"</span>"}}return aj};var S,ae;for(X=0,W=U.banners.length;X<W;X++){ae=U.banners[X];if(!z(ae.view)||ae.view==this.metadataBannerViewName){S=YAHOO.lang.substitute(ae.template,D.renderers,ad);if(z(S)){Y+='<div class="info-banner">'+S+"</div>"}}}}if(YAHOO.lang.isString(U.title)){var aa=function F(ai,ak,ah){var ag=(ah!==null?"<em>"+D.msg(ah)+"</em>: ":""),aj="";if(D.renderers.hasOwnProperty(ai)&&typeof D.renderers[ai]==="function"){aj=D.renderers[ai].call(D,H,ag)}else{if(Z.hasProperty(ai)){aj='<div class="filename">'+Alfresco.DocumentList.generateFileFolderLinkMarkup(D,H);aj+=ag+D.renderProperty(Z.properties[ai])+"</a></span></div>"}}return aj};Y+=YAHOO.lang.substitute(U.title,D.renderers,aa)}else{if(Z.hasPermission("Write")&&!Z.isLocked&&!Z.hasAspect("cm:workingcopy")){D.insituEditors.push({context:H._filenameId,params:{type:"textBox",nodeRef:Z.nodeRef.toString(),name:"prop_cm_name",value:H.fileName,fnSelect:function P(ah,ai){var ag=ai.lastIndexOf(Alfresco.util.getFileExtension(ai))-1;if(ag>0){Alfresco.util.selectText(ah,0,ag)}else{ah.select()}},validations:[{type:Alfresco.forms.validation.length,args:{min:1,max:255,crop:true},when:"keyup",message:D.msg("validation-hint.length.min.max",1,255)},{type:Alfresco.forms.validation.nodeName,when:"keyup",message:D.msg("validation-hint.nodeName")}],title:D.msg("tip.insitu-rename"),errorMessage:D.msg("message.insitu-edit.name.failure")},callback:{fn:D._insituCallback,scope:D,obj:H}})}Y+='<h3 class="filename"><span id="'+H._filenameId+'">'+Alfresco.DocumentList.generateFileFolderLinkMarkup(D,H);Y+=u(H.displayName)+"</a></span>"+T+I+"</h3>"}if(YAHOO.lang.isArray(U.lines)){var ac=function O(ai,ak,ah){var ag=(ah!==null?"<em>"+D.msg(ah)+"</em>: ":""),aj="";if(D.renderers.hasOwnProperty(ai)&&typeof D.renderers[ai]==="function"){aj=D.renderers[ai].call(D,H,ag)}else{if(Z.hasProperty(ai)){aj='<span class="item">'+ag+D.renderProperty(Z.properties[ai])+"</span>"}}return aj};var S,R;for(X=0,W=U.lines.length;X<W;X++){R=U.lines[X];if(!z(R.view)||R.view==this.metadataLineViewName){S=YAHOO.lang.substitute(R.template,D.renderers,ac);if(z(S)){Y+='<div class="detail">'+S+"</div>"}}}}}K.innerHTML=Y;C.on(d.getElementsByClassName("banner-more-info-link","span",K),"click",function E(ag){D.onCloudSyncIndicatorAction(H,C.getTarget(ag))},{},D)},renderCellActions:function v(D,F,E,G,H){G.width=this.actionsColumnWidth;d.setStyle(F,"width",G.width+"px");d.setStyle(F.parentNode,"width",G.width+"px");d.addClass(F.parentNode,E.getData("type"));F.innerHTML='<div id="'+D.id+"-actions-"+E.getId()+'" class="hidden"></div>'},fnRenderCellProperty:function w(){var D=this;return function E(G,F,H,I){D.renderCellProperty(D,G,F,H,I)}},renderCellProperty:function y(K,J,L,H,D){if(typeof this.parentDocumentList.renderers[H.field]==="function"){J.innerHTML=this.parentDocumentList.renderers[H.field].call(this.parentDocumentList,L.getData(),"")}else{var G=L.getData(),E=G.jsNode,I=E.properties,F=I[H.field];if(F!=null){J.innerHTML='<span class="alf-generic-property">'+this.parentDocumentList.renderProperty(F)+"</span>"}}},fnRenderCellLinkProperty:function A(){var E=this;return function D(G,F,H,I){E.renderCellLinkProperty(E,G,F,H,I)}},renderCellLinkProperty:function b(K,J,L,H,D){var G=L.getData(),E=G.jsNode,I=E.properties,F=I[H.field];if(F!=null){J.innerHTML='<span class="link">'+Alfresco.DocumentList.generateFileFolderLinkMarkup(K.parentDocumentList,G)+this.parentDocumentList.renderProperty(F)+"</a></span>"}},getDataTableRecordIdFromRowElement:function B(E,F){if(E!=null&&F!=null){var D=F;if(!d.hasClass(F,this.rowClassName)){D=d.getAncestorByClassName(F,this.rowClassName)}return D!==null?D.id:null}},getRowElementFromDataTableRecord:function l(D,E){if(D!=null&&E!=null){return D.widgets.dataTable.getTrEl(E)}},getRowSelectElementFromDataTableRecord:function j(D,E){if(D!=null&&E!=null){return d.get("checkbox-"+E.getId())}},onEventHighlightRow:function i(E,S,H){E.widgets.dataTable.onEventHighlightRow.call(E.widgets.dataTable,S);var K;if(H){K=H}else{K=S.target}var D=d.get(E.id+"-actions-"+K.id);if(D&&D.firstChild===null){var U=E.widgets.dataTable.getRecord(this.getDataTableRecordIdFromRowElement(E,K));if(U!==null){var G=U.getData(),T=G.jsNode,L=G.actions,N=document.createElement("div"),P="",F;G.actionParams={};for(var Q=0,M=L.length;Q<M;Q++){P+=E.renderAction(L[Q],G)}N.innerHTML=YAHOO.lang.substitute(P,E.getActionUrls(G));d.addClass(N,"action-set");d.addClass(N,this.actionsCssClassName);F=YAHOO.util.Selector.query("div",N);if(F.length>E.options.actionsSplitAt+this.actionsSplitAtModifier){var I=d.get(E.id+"-moreActions").cloneNode(true),R=YAHOO.util.Selector.query("div",I);d.insertBefore(R[0],F[E.options.actionsSplitAt]);d.insertBefore(R[1],F[E.options.actionsSplitAt]);var J,O=F.slice(E.options.actionsSplitAt);for(J in O){if(O.hasOwnProperty(J)){R[1].appendChild(O[J])}}}D.appendChild(N)}}if(!d.hasClass(document.body,"masked")){E.currentActionsMenu=D;d.removeClass(D,"hidden")}},onEventUnhighlightRow:function g(E,H,G){E.widgets.dataTable.onEventUnhighlightRow.call(E.widgets.dataTable,H);var D;if(G){D=G}else{D=H.target}var F=d.get(E.id+"-actions-"+(D.id));if(F||d.hasClass(document.body,"masked")){if(E.hideMoreActionsFn){E.hideMoreActionsFn.call(this)}d.addClass(F,"hidden")}},onActionShowMore:function x(K,F,G){d.addClass(G.firstChild,"highlighted");var L=d.getNextSibling(G);var I=window.scrollY;if(I===undefined){I=document.documentElement.scrollTop}var D=d.getViewportHeight()-(d.getY(G)-I+G.offsetHeight);d.removeClass(L,"hidden");if(L.offsetHeight>D){d.setY(L,d.getY(G)-(L.offsetHeight+1))}var E=d.getX(G)+G.offsetWidth;var J=d.getX(L)+L.offsetWidth;if(E!=J){d.setX(L,(d.getX(G)+G.offsetWidth-L.offsetWidth))}K.hideMoreActionsFn=function H(){K.hideMoreActionsFn=null;d.removeClass(G.firstChild,"highlighted");d.addClass(L,"hidden")}},onFileRenamed:function f(G,E,D){var I=D[1];if(I&&(I.file!==null)){var H=G._findRecordByParameter(I.file.node.nodeRef,"nodeRef");if(H!==null){G.widgets.dataTable.updateRow(H,I.file);var F=G.widgets.dataTable.getTrEl(H);Alfresco.util.Anim.pulse(F)}}},onHighlightFile:function n(H,F,E){var K=E[1];if((K!==null)&&(z(K.fileName))){Alfresco.logger.debug("DL_VR_onHighlightFile: ",K.fileName);var J=H._findRecordByParameter(K.fileName,"displayName");if(J!==null){var G=this.getRowElementFromDataTableRecord(H,J),I=d.getY(G);if(YAHOO.env.ua.ie>0){I=I-(document.body.clientHeight/3)}else{I=I-(window.innerHeight/3)}window.scrollTo(0,I);Alfresco.util.Anim.pulse(G);H.options.highlightFile=null;var D=this.getRowSelectElementFromDataTableRecord(H,J);D.checked=true;H.selectedFiles[J.getData("nodeRef")]=true;YAHOO.Bubbling.fire("selectedFilesChanged")}}},_setEmptyDataSourceMessage:function h(E,D){E.widgets.dataTable.set("MSG_EMPTY",D)},renderEmptyDataSourceHtml:function p(Q,M){var N=Q;var F=N.doclistMetadata.itemCounts,J=(F.documents===0&&F.folders===0),L=(F.documents===0&&!N.options.showFolders&&F.folders>0);var I=function K(U){var S=d.getChildren(U);for(var R=0,T=S.length;R<T;R++){if(S[R].id!==null&&S[R].id!==""){S[R].id+="-instance"}}};var P=d.get(N.id+"-main-template"),H=P.cloneNode(true),E=d.getFirstChild(H),G=null,D=null;if(M){N._userCanUpload=N.doclistMetadata.parent.permissions.user.CreateChildren&&YAHOO.env.ua.mobile===null;N._removeDragAndDrop();if(N.currentFilter.filterId==="path"||N.currentFilter.filterId==="favourites"){N._addDragAndDrop()}if(N._userCanUpload&&N.dragAndDropEnabled){d.addClass(E,"docListInstructionsWithDND")}else{d.addClass(E,"docListInstructions")}if(J&&!N._userCanUpload){P=d.get(N.id+"-no-items-template");G=P.cloneNode(true);d.removeClass(G,"hidden");E.appendChild(G)}else{if(L){P=d.get(N.id+"-hidden-subfolders-template");G=P.cloneNode(true);d.removeClass(G,"hidden");I(G);D=d.getElementsByClassName("docListLinkedInstruction","a",G);if(D.length==1){D[0].innerHTML=N.msg("show.folders",F.folders)}E.appendChild(G)}else{if(J&&N._userCanUpload&&N.dragAndDropEnabled){P=d.get(N.id+"-dnd-instructions-template");G=P.cloneNode(true);d.removeClass(G,"hidden");E.appendChild(G)}else{if(J&&N._userCanUpload&&!N.dragAndDropEnabled){P=d.get(N.id+"-upload-instructions-template");G=P.cloneNode(true);d.removeClass(G,"hidden");I(G);E.appendChild(G)}}}}if(J&&N._userCanUpload&&N.dragAndDropEnabled){P=d.get(N.id+"-other-options-template");G=P.cloneNode(true);d.removeClass(G,"hidden");E.appendChild(G);if(J&&N._userCanUpload){if(N.dragAndDropEnabled){P=d.get(N.id+"-standard-upload-template");G=P.cloneNode(true);d.removeClass(G,"hidden");I(G);E.appendChild(G)}P=d.get(N.id+"-new-folder-template");G=P.cloneNode(true);d.removeClass(G,"hidden");I(G);E.appendChild(G)}}}else{d.addClass(E,"docListInstructions");if(L){P=d.get(N.id+"-hidden-subfolders-template");G=P.cloneNode(true);d.removeClass(G,"hidden");I(G);D=d.getElementsByClassName("docListLinkedInstruction","a",G);if(D.length==1){D[0].innerHTML=N.msg("show.folders",F.folders)}E.appendChild(G)}else{P=d.get(N.id+"-no-items-template");G=P.cloneNode(true);d.removeClass(G,"hidden");E.appendChild(G)}}var O=document.createElement("div");d.setStyle(O,"clear","both");E.appendChild(O);this._setEmptyDataSourceMessage(N,H.innerHTML)}}})();