 // 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // // 通过 require 引入依赖
  // require('b');
  var app = require('index4-4');
  var doSomething = function(){
  	console.log("这是return 的方法");
  	app.init()
  }
  return doSomething;
});

