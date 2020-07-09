
;(function($, hbts){
    hbts.vivoDetection = {
        config : {
            title : "通政通-活体检测",
            selects : [
                {
                    categroy : "是否本人",
                    list :[
                        {
                            name : "是本人",
                            key : "isSelf",
                            value : 1,
                            checked : true                      
                        },
                        {
                            name : "不是本人",
                            key : "isSelf",
                            value : 0                       
                        }
                    ]
                }
            ],
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "身份证号码",
                        key : "identiyCode",
                        placeholder : "输入身份证号码"
                    },
                    {
                        name : "姓名",
                        key : "username",
                        placeholder : "输入姓名"
                    }
                ]
            },
        },
        handle : function (e){
            $.callbackLifeCheckPlus = function(r) {
                doLog("回调结果："+r);
            }
            var isSelf = e.isSelf;            
            var identiyCode = e.identiyCode;
            var username = e.username;
            if(isSelf == '1'){
                identiyCode = "";
                username = "";
            }
            var isWk = this.isWkjs();
            if (!isWk) {
                doVivoDetectionNew(isSelf,identiyCode,username,"");
            }else{
                hebaoWkjs.doCall('doVivoDetectionNew',e);
            }
        }
    };
}(window,hbts));
