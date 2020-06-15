;(function(){
    if(window.hbts != null) return;
    
 
    var isWk = false;

    var hbts = {};

    window.hbts = hbts;

    if (window.hblog == null) {
        window.hblog = function (e){
            console.log(e);
        }
    }

    //设备信息
    hbts.deviceInfo = function(){
        if (!isWk) {
            cmpNativeCall({actionName: '20001',needCmpLoadding:false ,callback: 'callback20001' }); 
        }else{

        }
    };

    //优惠券
    hbts.coupon = function(){
        if (!isWk) {
            cmpInit();
        }else{

        }
    };

    //获取定位信息
    hbts.getLocationInfo = function(){

        if (!isWk) {
            getLocationInfo();
        }else{

        }
    };

    //退出和包
    hbts.exitHebao = function(){
        
        if (!isWk) {
            CmpExitAction();
        }else{

        }
    };

    //分享功能
    hbts.shareAction = function(){
        
        if (!isWk) {
            CMPShareAction( 'www.baidu.com' , '我是一个标题' ); 
        }else{

        }

    };

    //分享微信小程序
    hbts.shareWXMiniApp = function(){
        
        if (!isWk) {
            H5shareToWeChatMiniApps(); 
        }else{

        }
    };

    //拍照
    hbts.takePhoto = function(){
        
        if (!isWk) {
            CmpTakePhoto(0,0); 
        }else{

        }
    };


    //动态菜单
    hbts.setTitleMenuList = function(){
        
        if (!isWk) {
            H5CmpSetTitleMenuList(); 
        }else{

        }

    };


    //清空动态菜单 
    hbts.removeTitleMenuList = function(){
        
        if (!isWk) {
            H5CmpRemoveTitleMenuList(); 
        }else{

        }
    };


    //拉起地图
    hbts.openMapLocation = function(){
        
        if (!isWk) {
            CmpOpenMapLocation( '长沙' , '长沙天园假日小区' , '28.197272' , '112.983306'
            , '28.196794' , '113.07177' );
        }else{

        }
    };

    //保存图片 
    hbts.savePicToAlbum = function(){
        
        var imgUrl = 'http://images.cnblogs.com/cnblogs_com/xinhudong/1120321/o_TIM%E6%88%AA%E5%9B%BE20171222164207.png';            
        if (!isWk) {
            CmpSavePicToAlbum(imgUrl); 
        }else{

        }
    };

    
    //识别名片
    hbts.readCardInfo = function(){
        
        if (!isWk) {
            CmpReadCardInfo( 'https://wwww.baidu.com' , 'https://www.taobao.com');
        }else{

        }

    };

     //扫一扫 
     hbts.scanCodeByApp = function(){
        
        if (!isWk) {
            scanCodeByApp();
        }else{

        }

    };


     //扫一扫原生处理 
     hbts.scanCodeByAppWithParam = function(){
        
        if (!isWk) {
            scanCodeByAppWithParam(true);
        }else{

        }

    };


     //分享到微信
     hbts.shareToWeChat = function(){
        
        if (!isWk) {
            shareToWeChat( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{

        }

    };
    

    //分享到QQ
    hbts.shareToQQ = function(){
        
        if (!isWk) {            
            shareToQQ( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{

        }
    };

     //分享到微博
     hbts.shareToSinaWeibo = function(){
        
        if (!isWk) {            
            shareToSinaWeibo( '我是分享的内容', 'https://www.baidu.com') ;
        }else{

        }
    };


    


    //传支付密码 
    hbts.checkPayPassword = function(){
        
        if (!isWk) {            
            CMPCheckPayPassword();
        }else{

        }
    };


    //获取token
    hbts.getTokenForH5 = function(){
        
        if (!isWk) {            
            getTokenForH5() ;
        }else{

        }
    };


    //调起咪咕 
    hbts.openMigu = function(){
        
        if (!isWk) {            
            cmpOpenDeepLinkApp( 'miguvideo://amber_deeplink?DLSI=a75b353fe99443b5af2edd6bf443414e&amp;JA=miguvideos'
            , 'https://itunes.apple.com/cn/app/he-bao-he-bao-guan-fang-ke/id597795676?mt=8' );
        }else{

        }
    };



    hbts.goss = function(){

        window.location.href = "tiaoban.html";

        hblog("hbts.goss");
    };

}());



   
  

   