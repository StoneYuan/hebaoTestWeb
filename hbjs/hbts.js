
var needImportJs = [
    "subs/callOCR.js",
    "subs/callContacts.js",
    "subs/vivoDetection.js",
    "subs/cmpCommonPay.js",
    "subs/billQuery.js"
];

function ImportJSFileToJs(e){

    //https://www.cnblogs.com/junb/p/4253544.html
    var t=document.getElementsByTagName("SCRIPT"),
    src = t[t.length - 1].src,
    baseSrc = src.replace(/(\/[^\/]*?)$/i, '');

    for(var i =0; i<e.length; i++){        
        var fullp = baseSrc + "/" + e[i];
        var scrp = "<script src=" + "'" +fullp + "'" + "></script>";
        document.write(scrp);
        //https://blog.csdn.net/qq_42249896/article/details/90769809
    }
};


;(function($){
    if($.hbts != null) return;

    $.hbts = {
        isWkjs : function(){
            var type = localStorage.getItem("ios-webview-type");
            if(type == null) return true;
            var isWk = type === '1'? true : false;
            return isWk;
        },
    };

    //alert在低机型中卡死
    //https://www.jianshu.com/p/83b5522b4607
    //https://www.onezen.cc/2017/09/15/iosissues/webviewdead/


    $.ShowAlert = function (e){
        setTimeout(function(){
            alert(e);
        },100)                
    };
    
    $.isWkjs = hbts.isWkjs;

    ImportJSFileToJs(needImportJs);

    // 调用原生傻逼设计
    // 交易查询 '90001'
    // 密码管理 '90002'
    // 充值 '90003'
    // 提现 '90004'
    // 余额 '90005'


    hbts.recharge = {
        config : {
            title : "充值",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "充值金额",
                        key : "amount",
                        placeholder : "充值金额"
                    }
                ]
            },
        },
        handle : function (e){
            $.callBackGetPacketsContacts = function(r) {
                doLog("回调结果："+r);
            }
            callToPayRecharge(e.amount);
        }
    };


    hbts.evokeMsgUI = {
        config : {
            title : "拉起短信面板",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "手机号码",
                        key : "mobileNo",
                        placeholder : "输入手机号码"
                    },
                    {
                        name : "短信内容",
                        key : "contentNo",
                        placeholder : "输入短信内容"
                    }
                ]
            },
        },
        handle : function (e){
            MessageUI(e.mobileNo,e.contentNo);
        }
    };

    hbts.touristLogin = {
        config : {
            title : "游客模式拉起登录页面",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "回调页面地址",
                        key : "targetUrl",
                        placeholder : "输入页面地址"
                    }
                ]
            },
            info : {
                categroy : "参数说明",
                descText : "回调页面地址targetUrl为登录成功后回调页面地址，如果不传该值，则登录成功回调函数也不会传入单点登录后拼接的地址"
            }
        },
        handle : function (e){
            $.touristLoginSuccessCallback = function(r) {
                doLog("老式回调结果："+r);
            }
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("touristLogin",e,function(c){
                    doLog("新式回调结果："+c);
                });
            } else {
                touristLogin(e.targetUrl);
            }
        }
    };

    hbts.openMiniApp = {
        config : {
            title : "唤起小程序",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "小程序ID",
                        key : "miniApplicationId",
                        placeholder : "输入小程序ID"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("openMiniApplication",e,function(c){
                    doLog("新式回调结果："+c);
                });
            } else {
                openMiniApplication(e.miniApplicationId);
            }
        }
    };


    //单点登录   
    hbts.ssoLogin = {
        config : {
            title : "单点登录",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "目标链接",
                        key : "url",
                        placeholder : "输入url"
                    }
                ]
            }
        },
        handle : function(e){
            $.callBackSSOResult = function(e){
                var j = JSON.stringify(e);
                doLog(j);
            }
            var isWk = this.isWkjs();
            if(!isWk){
                CmpGetSsoUrl(e.url);
            }else{
                hebaoWkjs.doCall("CmpGetSsoUrl",e);
            }
        }   
    }




    hbts.changBright = {
        config : {
            title : "亮度调节",
            selects : [{
                categroy : "亮度调节类型",
                list : [{
                    name : "亮度调节",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "恢复系统亮度",
                    key : "type",
                    value : 2,
                }]
            }],
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "亮度值",
                        key : "value",
                        placeholder : "输入亮度值(0~1.0)"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                if(e.type == '1'){
                    hebaoWkjs.doCall("CmpSetOpenBrightnessValue",e);
                }else{
                    hebaoWkjs.doCall("CmpSetColseBrightnessValue");
                }
            } else {
                if(e.type == '1'){
                    CmpSetOpenBrightnessValue(e.value);
                }else{
                    CmpSetColseBrightnessValue();
                }
            }
        }
    };



    
    //设备信息
    hbts.deviceInfo = function(){
        $.callback20001 = function (e){
            var t = JSON.stringify(e);
            ShowAlert(t);
        };
        var isWk = this.isWkjs();
        if (!isWk) {
            cmpNativeCall({actionName: '20001',needCmpLoadding:false ,callback: 'callback20001'}); 
        }else{
            hebaoWkjs.doCall('cmpNativeCall',{ 
                actionName : '20001',
                needCmpLoadding :false ,
                callback: 'callback20001'
            });
        }
    };

    hbts.cativeCall = function(n){
        var isWk = this.isWkjs();
        if (!isWk) {
            cmpNativeCall({actionName: n}); 
        }else{
            hebaoWkjs.doCall('cmpNativeCall',{ 
                actionName : n
            });
        }
    };

      
    //获取定位信息
    hbts.getLocationInfo = function(){
        $.callBackGetLocationInfo = function(e){
            ShowAlert(e);
        };    
        var isWk = this.isWkjs();
        if (!isWk) {
            getLocationInfo();
        }else{
            hebaoWkjs.doCall('getLocationInfo');
        }
    };

    //退出和包
    hbts.exitHebao = function(){
        var isWk = this.isWkjs();

        var mys = confirm("确定要退出和包吗？");
        
        if(mys == true){
            if (!isWk) {
                CmpExitAction();
            }else{
                hebaoWkjs.doCall('CmpExitAction');
            }
        }else if(mys == false){

        }
    };

    //分享功能
    hbts.shareAction = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CMPShareAction( 'www.baidu.com' , '我是一个标题' ); 
        }else{
            hebaoWkjs.doCall('CMPShareAction');
        }
    };

    //分享微信小程序
    hbts.shareWXMiniApp = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            H5shareToWeChatMiniApps(); 
        }else{

        }
    };

    //拍照
    hbts.takePhoto = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CmpTakePhoto(0,0); 
        }else{

        }
    };


    //动态菜单
    hbts.setTitleMenuList = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            H5CmpSetTitleMenuList(); 
        }else{

        }
    };


    //清空动态菜单 
    hbts.removeTitleMenuList = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            H5CmpRemoveTitleMenuList(); 
        }else{

        }
    };


    //拉起地图
    hbts.openMapLocation = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CmpOpenMapLocation( '长沙' , '长沙天园假日小区' , '28.197272' , '112.983306'
            , '28.196794' , '113.07177' );
        }else{

        }
    };

    //保存图片 
    hbts.savePicToAlbum = function(){
        var isWk = this.isWkjs();
        var imgUrl = 'http://images.cnblogs.com/cnblogs_com/xinhudong/1120321/o_TIM%E6%88%AA%E5%9B%BE20171222164207.png';            
        if (!isWk) {
            CmpSavePicToAlbum(imgUrl); 
        }else{

        }
    };

    
    //识别名片
    hbts.readCardInfo = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CmpReadCardInfo( 'https://wwww.baidu.com' , 'https://www.taobao.com');
        }else{

        }

    };

     //扫一扫 
     hbts.scanCodeByApp = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            scanCodeByApp();
        }else{

        }

    };


     //扫一扫原生处理 
     hbts.scanCodeByAppWithParam = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            scanCodeByAppWithParam(true);
        }else{

        }

    };


     //分享到微信
     hbts.shareToWeChat = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            shareToWeChat( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{
            hebaoWkjs.doCall('shareToWeChat',{

            });
        }

    };
    

    //分享到QQ
    hbts.shareToQQ = function(){
        var isWk = this.isWkjs();
        if (!isWk) {            
            shareToQQ( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{
            hebaoWkjs.doCall('shareToWeChat',{

            });
        }
    };

     //分享到微博
     hbts.shareToSinaWeibo = function(){
        var isWk = this.isWkjs();
        if (!isWk) {            
            shareToSinaWeibo( '我是分享的内容', 'https://www.baidu.com') ;
        }else{
            hebaoWkjs.doCall('shareToWeChat',{

            });
        }
    };

    //调用支付插件（旧接口）
    hbts.checkPayPassword = function(){

        $.callBackCMPCheckPayPassword = function(e){
            ShowAlert("支付插件结果"+result);
        };
        
        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPCheckPayPassword();
        }else{

        }
    };

    //调用支付插件（新接口）(名字错误)
    hbts.checkPayPasswordNew = function(){

        $.callBackCMPCheckPayPasswordNew = function(e){
            ShowAlert("调用支付插件结果"+result);
        };
        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPResetPayPasswordNew();
        }else{

        }
    };

     //重置支付密码
     hbts.resetPayPassword = function(){

        $.callBackCMPResetPayPassword = function(e){
            ShowAlert("重置密码结果"+result);
        };

        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPResetPayPassword();
        }else{

        }
    };    


    //获取统一认证token
    hbts.getTokenForH5 = function(){
        $.getTokenForH5CallBack = function(status,token){
            ShowAlert('status: '+status + " token: "+ token);
        };
        var isWk = this.isWkjs();
        if (!isWk) {            
            getTokenForH5() ;
        }else{
            hebaoWkjs.doCall('getTokenForH5',function(r){
                var j = JSON.stringify(r);
                ShowAlert(j);
            });
        }
    };


    //调起咪咕 
    hbts.openMigu = function(){
        var isWk = this.isWkjs();
        if (!isWk) {            
            cmpOpenDeepLinkApp( 'miguvideo://amber_deeplink?DLSI=a75b353fe99443b5af2edd6bf443414e&amp;JA=miguvideos'
            , 'https://itunes.apple.com/cn/app/he-bao-he-bao-guan-fang-ke/id597795676?mt=8' );
        }else{

        }
    };

    //是否本机
    hbts.checkIsLocalNumber = function(){

        $.callbackCheckIsLocalNum = function(e){
            var m = "是否本机结果 ：" + e;
            ShowAlert(m);
        };
    
        var isWk = this.isWkjs();
        var val = prompt("请输入手机号码");
        if(val !=null && val.length > 10){
            if (!isWk) {
                CmpCheckIsLocalNumber(val);
            } else {
                hebaoWkjs.doCall('CmpCheckIsLocalNumber',{
                    phoneNumber : val
                });
            }
        }
    };

    //网络状态 
    hbts.networkType = function(){
        $.getNetworkType_callback = function (e){
            ShowAlert(e);
        };
        var isWk = this.isWkjs();
        if(!isWk){
            getNetworkType();
        }else{
            hebaoWkjs.doCall('getNetworkType');
        }
    };

    //拨打电话
    hbts.callPhone = function(){
        var isWk = this.isWkjs();
        var val = prompt("请输入手机号码");

        if(val && val>7){
            if(!isWk){
                CmpCmpDailNumber({phoneNumber:val});
            }else{

            }
        }
    };

     //我要反馈
    hbts.feedback = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpNeedFeedback();
        }else{

        }
    };


     //我的客服
     hbts.serviceOnline = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpServiceOnline();
        }else{

        }
    };

     //重置支付密码
     hbts.feedback = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpNeedFeedback();
        }else{

        }
    };
    

    //拉起原生名片 
    hbts.goCardClipIndex = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            goCardClipIndex();
        }else{

        }
    };

    //初始化地铁SDK 
    hbts.startHtcsCode = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpStartHtcsCode();
        }else{

        }
    };


    //地铁写缓存 
    hbts.setCsMetroValue = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpSetCsMetroValue('helloworld');
        }else{

        }
    };

    //地铁写缓存 
    hbts.getCsMetroValue = function(){
         
        $.callBackCMPCsMetroValue = function (e){
            ShowAlert(e)
        };
        var isWk = this.isWkjs();
        if(!isWk){
            CmpGetCsMetroValue();
        }else{

        }
    };    


    //发送信息给地铁SDK?什么消息？ 
    hbts.sendToHtcsCode = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            sendToHtcsCode();
        }else{

        }
    };    

    //检测更新  
    hbts.checkAppVersion = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            downLatestApp();
        }else{

        }
    };    
        
}(window));


(function($){

    $.notifyAuthSuccess = function() {
        ShowAlert('实名成功了哟');
    };

}(window));

// activity跳转和包本地应用???

// 双录？

//web检测器不生效
//https://stackoverflow.com/questions/53052995/safari-web-inspector-not-working-with-cordova-in-ios12-and-mac-os-mojave