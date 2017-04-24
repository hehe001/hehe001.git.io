// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // 通过 require 引入依赖
  // var index4 = require('index4-4');
  /**
		DOM 操作
  */
	var P = {
		_init:function(){
			
		},
		tab:function(){

		},
		del:function(){

		},
		add:function(){

		},
		test:function(){
			
		}

	}
  	// 或者通过 module.exports 提供整个接口
	module.exports = {
		init:P._init
	}

});
