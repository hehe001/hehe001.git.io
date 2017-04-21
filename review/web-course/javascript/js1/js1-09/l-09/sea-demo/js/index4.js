// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // // 通过 require 引入依赖
  var app = require('index4-4');
  /**
		DOM 操作
  */
	var P = {
		_init:function(){
			console.log('这是初始化');
			app.init()
			// seajs.use("index4-4",function (app) {
		 //        app.init();
		 //    });
			// P.alertBox()
		},
		alertBox:function(){
			console.log()
		},
		cc:function(){
			console.log('这是cc函数')
		},
		haha:function(){
			document.getElementsByTagName('body')[0].style.background = "red";
		}

	}
  	// 或者通过 module.exports 提供整个接口
	module.exports = {
		init:P._init,
		cc:P.cc,
		haha:P.haha
	}

});
