// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  
  /**
		DOM 操作
		添加标签
  */
	var P = {
		_init:function(){
			P.alertBox();
		},
		alertBox:function(){
			console.log("这是什么呀，为什么能执行")
		}
	}

  	// 或者通过 module.exports 提供整个接口
	module.exports = {
		init:P._init
	}

});
