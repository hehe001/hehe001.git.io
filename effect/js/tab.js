define(function(require, exports, module) {
	var vuePub = require('filter');
    require('vue');
    var P = {
        _init:function(){
        	vuePub.filter();
        	P.render();
        },
        render:function(){
            $.ajax({
                url:'/html/data/data.json',
                dataType:"JSON",
                type:"get"
            }).done(function(cfg){
                // 请求成功
                P.view(cfg);
            })
        },
        _ifWork:function(obj,key,bt1,bt2,bt3){
            var tags = obj.decide[key];
            tags.isA = bt1;
            tags.isB = bt2;
            tags.isC = bt3;
        },
        view:function(cfg){
        	var data = {
        		"resume":cfg,
        		"decide":{
        			"base":{
        				"isA":true,
        				"isB":false
        			},
                    "work":{
                        "isA":false,
                        "isB":true,
                        "isC":false,
                    }
        		},
                "expItem":{}
        	}
            if(data.resume.work_history.length>0){
                var work = data.decide.work;
                work.isB = false;
                work.isC = true;
            }
        	var vm = new Vue({
		        el:'#app',
		        data:data,
		        methods:{
		            editBase:function(event,sclass){
		            	var item = event.currentTarget;
                        var parent = $(item).parents('.jbxx');
                        parent.find('.dak').show();
                        parent.find('.'+sclass).hide();
		            },
		            saveBase:function(event,sclass){
                        var item = event.currentTarget;
                        var parent = $(item).parents('.jbxx');
                        parent.find('.dak').hide();
                        parent.find('.'+sclass).show();
                    },
                    addWork:function(num){
                        // 新建
                        // 单独定义一个下票做为新加的一个标识
                        // 并且让  expItem 为空 防止 页面  保留上次数据
                        this.expNum = num;
                        this.expItem = {};
                        P._ifWork(this,'work',true,false,false);
                    },
                    saveWork:function(item){
                        // 保存
                        P._ifWork(this,'work',false,false,true);
                        var work = this.resume.work_history;
                        /*
                            保存时先取到 这个item
                            再去判断 如果 是新建 就增加 
                            如果是保存就把之前编辑时存的下标 
                            对应数组中的第几个删除掉
                        */
                        if(this.expNum<0){
                            work.push(item);
                        }else {
                            this.resume.work_history[this.expNum] = item;
                        }
                    },
                    editWork:function(obj,item,index){;
                        // 把json 对象  转换成json 字符串
                        var items = JSON.stringify(item);
                        $('#app').data('work-item',items);

                        seajs.use('cookie.js',function(cookie){
                            cookie('work-item', items);
                        })
                        // 编辑
                        // 把 对应的那个 v-for 中的item 直接丢给  表单的expItem
                        //  并且把 对应的下标 丢给一个值  保存时好用
                        this.expItem = item;
                        this.expNum = index;
                        P._ifWork(this,'work',true,false,false);
                    },
                    delWork:function(index){
                        // 删除
                        // 直接删除 html 中 存在的 $index
                        this.resume.work_history.splice(index,1);
                        P._ifWork(this,'work',false,false,true);
                    },
                    cancelWork:function(){
                        // 取消
                        if(this.expNum==-99){
                            P._ifWork(this,'work',false,true,false);
                        }else if(this.expNum==-100) {
                            P._ifWork(this,'work',false,false,true);
                        }else {
                            seajs.use('cookie.js',function(cookie){
                                console.log(cookie('work-item'));
                            })
                            P._ifWork(this,'work',false,false,true);
                            // 把字符串 转换成json 对象
                            // http://bbs.xhanglu.com/bbs/forum.php?mod=viewthread&tid=5&extra=page%3D1
                            var tpl = $.parseJSON($('#app').data('work-item'))
                            // 有个bug  取消时 存在，v-model input 一但改变 整个数据都会变
                            // 存变量也无效，只能存其他地方
                            this.resume.work_history.splice(this.expNum,1,tpl);
                        }
                    }
		        }
		    })
        }
    }
    module.exports = {
        init:P._init
    }

});