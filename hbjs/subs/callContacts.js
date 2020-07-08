;(function($, hbts){
    hbts.callContacts = {
        config : {
            title : "通讯录能力",
            selects : [
                {
                    categroy : "接口类型",
                    list :[
                        {
                            name : "通讯录单选",
                            key : "type",
                            value : 1,
                            checked : true                                             
                        },
                        {
                            name : "通讯录单选（带名字）",
                            key : "type",
                            value : 2
                        },
                        {
                            name : "获取通讯录列表",
                            key : "type",
                            value : 3
                        },
                        {
                            name : "存储号码",
                            key : "type",
                            value : 4
                        },
                        {
                            name : "删除号码",
                            key : "type",
                            value : 5
                        }
                    ]
                }
            ],
            info : {
                categroy : "存储/删除号码",
                descText : "[{\"name\":\"大王\", \"mobile\": \"13899996666\"}]"
            }
        },
        handle : function (e){
            var type = parseInt(e.type);
            switch (type) {
                case 1:{
                    $.callBackGetPacketsContacts = function(r) {
                        doLog("回调结果："+r);
                    }
                    goSinglePacketsContact();
                }
                break;
                case 2:{
                    $.callBackGetPacketsContactsWithName = function(r) {
                        doLog("回调结果："+r);
                    }
                    goSinglePacketsContactWithName();
                }
                break;    
                case 3:{
                    $.callBackGetContacts = function(r) {
                        doLog("回调结果："+r);
                    }
                    getContacts();
                }
                break; 
                case 4:{
                    $.H5CmpSaveToAddrListCallBack = function(r) {
                        doLog("回调结果："+r);
                    }
                    var _json = this.config.info.description;
                    CmpSaveToAddrList(JSON.parse(_json), 'H5CmpSaveToAddrListCallBack');
                }
                break; 
                case 5:{
                    $.H5CmpDeleFromAddrListCallBack = function(r) {
                        doLog("回调结果："+r);
                    }
                    var _json = this.config.info.description;
                    CmpDeleFromAddrList(JSON.parse(_json), 'H5CmpDeleFromAddrListCallBack');
                }
                break; 
                default:
                    break;
            }
        }
    };
}(window,hbts));