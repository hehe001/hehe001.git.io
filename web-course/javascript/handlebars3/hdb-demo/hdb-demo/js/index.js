define(function(require, exports, module) {
    var rawData = {
            "_id" : "",
            "name":'',
            "sex" : "",
            "age" : "29",
            "avatar": "/asets/images/img.png",
            "birthday": "",
            "constellation":"",
            "zodiac":"",
            "city_live" : {
                "province" : "北京",
                "city" : "昌平"
            },
            "city_birth" : {
                "province":"北京",
                "city":"东城区"
            },
            "resigned" : "true",
            "telephone" : "13611171158",
            "email":"llqfront@gmail.com",
            "work_experience" : "10年以上",
            "intent": [
                {
                    industry: '请选期望行业',
                    position: '期望职位：',
                    area_province: 'area_province',
                    area_city: 'area_city',
                    salary: 'salary',
                    production: 'production',
                    sell_mode: ['arrMode','arrMode','arrMode'],
                    business_trip: '期望工作地区'
                }
            ],
            "language": [
                {
                    category:'英语',
                    listen: '听力',
                    speak: '口语',
                    read: '阅读',
                    write: '写作'
                },
                {
                    category:'英语',
                    listen: '听力',
                    speak: '口语',
                    read: '阅读',
                    write: '写作'
                }
            ],
            "work_history": [
                {
                    company:'',
                    position:'',
                    start_year:'',
                    end_year:'',
                    sales_type:'',
                    reportto:'',
                    subordinate:'',
                    desc:'',
                    sales_year:'',
                    finish_rate:'',
                    productions:'',
                    sell_target:'',
                    sell_mode:'',
                }
            ],
            "edu_history": [
                {
                    school:'学校名称：',
                    major:'专业名称：',
                    level:'学历',
                    start_year:'开始时间',
                    end_year:'线束时间：'
                },
                {
                    school:'学校名称：',
                    major:'专业名称：',
                    level:'学历',
                    start_year:'开始时间',
                    end_year:'线束时间：'
                }
            ],
            "train":[
                {
                    name:'培训名称：',
                    rog:'培训机构：',
                    start_year:'开始时间',
                    end_year:'线束时间：'
                },
                {
                    name:'培训名称：',
                    rog:'培训机构：',
                    start_year:'开始时间',
                    end_year:'线束时间：'
                }
            ]
        };
    var arr = [];
    
    var P ={
        _init:function(){
            P.bind();
            P.view('#add-tpl',null)
        },
        addFn:function(oParent){
            console.log(oParent.find('.company').val())
            var work = {
                company:oParent.find('.company').val(),
                position:oParent.find('.position').val(),
                start_year:'',
                end_year:'',
                sales_type:'',
                reportto:'',
                subordinate:'',
                desc:'',
                sales_year:'',
                finish_rate:'',
                productions:'',
                sell_target:'',
                sell_mode:'',
            }
            
            if(oParent.hasClass('bianji')){
                var index = oParent.data('id');
                arr[index] = work;
            }else {
                arr.push(work);
            }
            P.view('#show-tpl',arr)
            oParent.find('.j-pt').removeClass('j-pt-s');
        },
        bind:function(){
            var oParent = $('#list');
            // 添加
            oParent.on('click','.bjpc-01',function(){
                $(this).parents('.j-pt').addClass('j-pt-s');
                var delwork = {
                    company:'',
                    position:'',
                    start_year:'',
                    end_year:'',
                    sales_type:'',
                    reportto:'',
                    subordinate:'',
                    desc:'',
                    sales_year:'',
                    finish_rate:'',
                    productions:'',
                    sell_target:'',
                    sell_mode:'',
                }
                P.view('#bianji-tpl',delwork)
            }).on('click','.job-qr',function(){
                P.addFn(oParent)
                oParent.removeClass('bianji')
            }).on('click','.job-bj',function(){
                var _index = $(this).parents('.list-02').data('index');
                oParent.data('id',_index);
                work = arr[_index]
                P.view('#bianji-tpl',work);
                oParent.addClass('bianji')
            }).on('click','.job-del',function(){
                var _index = $(this).parents('.list-02').data('index');
                arr.splice(_index,1)
                if(arr.length<=0){
                    oParent.find('.j-pt').addClass('j-pt-s');
                    P.view('#add-tpl',null)
                }else {
                    P.view('#show-tpl',arr)
                }
            })
        },
        view:function(id,context){
            var source1   = $(id).html();
            var template = Handlebars.compile(source1);
            var html    = template(context);
            $('#demo').html(html);
        }
    }

    module.exports = {
        init:P._init
    }
});
