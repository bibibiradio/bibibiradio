var loginViewer=require("./login.js");
var testViewer=require("./test");
var staticViewer=require("./static");
var x404Viewer=require("./404.js");
var forbiddenViewer=require("./forbidden");
var mainPageViewer=require("./mainPage");
var rootPageViewer=require("./rootPage");
var regPageViewer=require("./reg");
var forgetPasswordViewer=require("./forgetPassword");
var testLoginEjs=require("./testLoginEjs");

function initView(app){
	//业务处理View
	loginViewer.initLoginView(app);
	testViewer.initTestView(app);
	mainPageViewer.initMainPageView(app);
	testLoginEjs.initTestLoginEjsView(app);
	regPageViewer.initRegView(app);
	forgetPasswordViewer.initForgetPasswordView(app);
	//end 业务处理View

	//处理权限不够而禁止访问的页面
	forbiddenViewer.initForbiddenView(app);

	//处理静态资源的View
	staticViewer.initStaticView(app);

	//处理访问/的跳转
	rootPageViewer.initRootView(app);

	//处理404（其他View都无法处理的情况）
	x404Viewer.init404View(app);
}

exports.initView=initView;