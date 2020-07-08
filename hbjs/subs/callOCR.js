;(function($, hbts){
    hbts.callOCR = {
        config : {
            title : "OCR能力",
            selects : [
                {
                    categroy : "ORC类型",
                    list :[
                        {
                            name : "身份证正面",
                            key : "type",
                            value : 1,
                            checked : true                                              
                        },
                        {
                            name : "身份证反面",
                            key : "type",
                            value : 2
                        },
                        {
                            name : "营业执照",
                            key : "type",
                            value : 3
                        },
                        {
                            name : "银行卡",
                            key : "type",
                            value : 4
                        }
                    ]
                }
            ]
        },
        handle : function (e){
            var type = parseInt(e.type);
            switch (type) {
                case 1:{
                    $.getFrontIdCard = function(r) {
                        doLog(r);
                    }
                    cmpay.callOCRFront();
                }
                break;
                case 2:{
                    $.getBackIdCard = function(r) {
                        doLog(r);
                    }
                    cmpay.callOCRBack();
                }
                break;    
                case 3:{
                    $.callbackBusinessInfo = function(r) {
                        doLog(r);
                    }
                    getBusinessInfo();
                }
                break; 
                case 4:{
                    $.callbackBankInfo = function(r) {
                        doLog(r);
                    }
                    getBankCardInfo();
                }
                break; 
                default:
                    break;
            }
        }
    }; 
}(window,hbts));

