app=angular.module("assignment",["ui.router","ui.bootstrap","ngStorage","selectize"]),app.run(["$rootScope","$stateParams","$location","$localStorage",function(a,t,o,e){}]),app.constant("CONFIG",{baseUrl:"https://hackerearth.0x10.info/api/"});
app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,o){t.otherwise("/"),e.state("app",{url:"/",views:{navbar:{templateUrl:"app/views/layouts/navbar.html"},content:{templateUrl:"app/views/pages/home.html",controller:"HomePageController"},footer:{templateUrl:"app/views/layouts/footer.html"}}}),o.html5Mode(!0)}]);
"use strict";app.factory("HomePageService",["$http","$rootScope","CONFIG",function(t,e){var r=function(e){return t.get("https://hackerearth.0x10.info/api/one-push?type=json&query=push&title="+e.title+"&url="+e.url+"&tag="+e.tag,{})},i=function(e){return t.get("https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites",{})};return{addWebsite:r,getWebsite:i}}]);
"use strict";app.controller("HomePageController",["$rootScope","$scope","HomePageService","$localStorage","$document",function(e,t,s,i,a){function r(){t.showingOrderNo={from:(t.page-1)*t.perPage+1,to:Math.min(t.totalItems,t.page*t.perPage)},t.websites=[];for(var e=i.websiteData,s=e.length,a=(t.page-1)*t.perPage,r=Math.min((t.page-1)*t.perPage+t.perPage,s),l=a;l<r;l++)t.websites.push(e[l])}t.websites=[],t.perPage=5,t.maxSize=5,t.totalItems="",t.page=1,function(){s.getWebsite().success(function(s){i.websiteData=s.websites;for(var a=Math.min(s.websites.length,t.perPage),r=0;r<a;r++)t.websites.push(s.websites[r]);t.totalItems=s.websites.length,e.totalWebsite=s.websites.length}).error(function(e,t){alert(e)})["finally"](function(){})}(),t.showingOrderNo={from:1,to:5},t.SearchModel="",t.searchWebsite={valueField:"id",labelField:"mix_title",searchField:"mix_title",maxItems:1,loadThrottle:600,closeAfterSelect:!0,placeholder:"search (by title, url or tag )",load:function(e,s){for(var a=i.websiteData,r=a.length,l=0;l<r;l++)a[l].mix_title=a[l].title+" "+a[l].tag+" "+a[l].url_address;t.websitesList=a,s(t.websitesList)},onChange:function(e){if(e){for(var s=i.websiteData.length,a=i.websiteData,l=0;l<s;l++)if(a[l].id==parseInt(e)){t.websites=[],t.websites.push(a[l]),t.$apply();break}}else r(),t.$apply()}},t.pushWebsite={title:"",url_address:"",tag:""},t.pushWebsite=function(){t.isPushdisable=!0;var e={title:t.pushWebsite.title,url:t.pushWebsite.url_address,tag:t.pushWebsite.tag};s.addWebsite(e).success(function(e){t.message=e.message,t.isPushdisable=!1,t.isShowMessage=!0,setTimeout(function(){t.isShowMessage=!1,a.trigger("click")},200)}).error(function(e,s){t.isPushdisable=!1,alert(e)})["finally"](function(){})},t.pageChanged=function(){r()}}]);
app.directive("onFinishRender",["$timeout",function(e){return{restrict:"A",link:function(n,t,i){n.$last===!0&&e(function(){n.$emit(i.eventname?i.eventname:"ngRepeatFinished")})}}}]);
app.directive("validInput",["$rootScope","Checkout",function(e,n){return{require:"?ngModel",scope:{inputPattern:"@"},link:function(t,r,u,i){var p=null;void 0!==t.inputPattern&&(p=new RegExp(t.inputPattern,"g")),i&&(i.$parsers.push(function(n){if(p){var t=n.replace(p,"");return n!==t&&(i.$setViewValue(t),i.$render()),t.length>0&&t.length<11?e.continuebtnWrapper="":t.length>10?(t=t.substring(0,10),i.$setViewValue(t),i.$render()):e.continuebtnWrapper="disabled",t}return n}),r.bind("keypress",function(t){if(32===t.keyCode&&t.preventDefault(),13===t.keyCode){var r={number:i.$modelValue};n.generateOtp(r).success(function(n){e.otpInput="",e.continuebtnWrapper="hide"}).error(function(e,n){})["finally"](function(){})}}))}}}]);
app.directive("ngShowProduct",["$rootScope","$state","$localStorage","cartServices",function(t,o,e,a){return{restrict:"AE",scope:{productObj:"="},templateUrl:"views/partials/showproduct.html",link:function(o,e,r){o.openProduct=function(o){t.product=o,t.productPopup="visible active",t.navStatus="diable-nav"},o.addToCart=function(o){o.hasOwnProperty("quantity")||(o.quantity=1),o.isSaved=!0,t.subTotalAmount=(parseFloat(t.subTotalAmount)+parseFloat(o.price)).toFixed(2),t.savedProducts.push(o),a.setTrolleyToLocalStorage()},o.decreaseQt=function(t){a.decreaseQt(t),a.setTrolleyToLocalStorage()},o.increaseQt=function(t){a.increaseQt(t),a.setTrolleyToLocalStorage()}}}}]);