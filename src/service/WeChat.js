import Vue from 'vue'
import axios from 'axios'

export default function(){

    Vue.prototype.$weChat = {};

    // 1.0> 微信网页授权，参数为页面路由名称，用于授权完成后跳回
    const weChatPageAuth = function(redirectPagePath="/login",pageName,config = {scope:'snsapi_userinfo',appid:'wx0656090416bae774'}){
        
        // 0.1> 授权完成后要跳转到的页面
        let domain = window.location.protocol + "//" + window.location.host;
        let redirect_uri = encodeURI(domain + redirectPagePath);  

        // 0.2> 调起微信授权页面
        // scope值有两种
        // "snsapi_base"     用于获取用户的openid，用户关注了公众号之后，才能获取用户的基本信息；
        // "snsapi_userinfo" 用于获取用户的基本信息，用户无须关注公众号，但需要用户授权；
        let url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + config.appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + config.scope + "&state=" + pageName + "#wechat_redirect";
        window.location.href = url;
    }
    window.jw_weChatPageAuth = weChatPageAuth;
    Vue.prototype.jw_weChatPageAuth = weChatPageAuth;
    Vue.prototype.$weChat.jw_weChatPageAuth = weChatPageAuth;


    
    // 4.0> 配置微信JS-SDK, 所有需要调用微信JS-SDK接口的页面都要先调用此方法注入配置信息,同一个URL仅需调用一次
    // 官方文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1
    const weChatJsSdkConfig = function(jsApiList, config, callback) {
        
        if(!jsApiList){
            jsApiList = ["checkJsApi","openAddress","updateAppMessageShareData","updateTimelineShareData","onMenuShareWeibo","onMenuShareQZone","startRecord","stopRecord","onVoiceRecordEnd","playVoice","pauseVoice","stopVoice","onVoicePlayEnd","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","translateVoice","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"];
        }

        var params = {
            pageUrl:encodeURIComponent(location.href.split('#')[0]),
            appid:config.appid,  // 为了测试方便，此接口支持动态切换appid和appsecret(线上环境不能网上传递appid和appsecret，以防泄漏)
            appsecret:config.appsecret,
        }
        // Vue项目在切换页面时，IOS中浏览器的url并不会改变，依旧是第一次进入页面的地址，所以IOS获取签名的url需要传第一次进入的页面url
        if (window.__wxjs_is_wkwebview == true) { // IOS
            let first_open_url = localStorage.getItem('first_open_url');
            if(first_open_url){
                params.pageUrl = encodeURIComponent(first_open_url);
            }else{
                alert('请在全局路由守位中设置：first_open_url');
            }
        }

        axios({
            method: 'post',
            url: 'https://service.user.sidoc.cn/wechart-js-sdk/get-config',
            headers: {'Content-Type':'application/json;charset=UTF-8'},
            data: params
        }).then(res => {
            if (res.data.status_code == 0) {
                res.data = res.data.data;
                console.log(res.data);
                wx.config({
                    debug: config.debug?true:false,  // 开启debug后，会弹出配置成功与否的详细信息
                    appId: res.data.appId,
                    timestamp:res.data.timestamp ,
                    nonceStr:res.data.nonceStr,
                    signature: res.data.signature,
                    jsApiList: jsApiList,  // 需要授权的JS-SDK接口
                    openTagList: ['wx-open-launch-weapp'] // 需要使用的微信开放标签列表，例如['wx-open-launch-app']
                });
            }else{
                let msg = "微信JS-SDK名称获取失败：" + JSON.stringify(res);
                alert(msg);
                console.error(msg)   
            }
        }).catch(res => {
            let msg = "微信JS-SDK名称获取失败：" + JSON.stringify(res);
            // alert(msg);  不要在此处弹出alert,因为用户页面可以取消请求，导致此处弹出错误
            console.error(msg)   
        })

        // config信息验证后会执行ready方法 
        // 所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function(){
            callback?callback():'';
        });
        
        // 微信认证失败：如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        wx.error(function(res){
            alert("微信JS-SDK认证失败：" + JSON.stringify(res));
            console.log(res);
        });

        // 微信开放标签错误消息监听
        document.addEventListener('WeixinOpenTagsError', function (e) {
            console.error(e.detail.errMsg); // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
        });
    }
    window.jw_weChatJsSdkConfig = weChatJsSdkConfig;
    Vue.prototype.jw_weChatJsSdkConfig = weChatJsSdkConfig;
    Vue.prototype.$weChat.jw_weChatJsSdkConfig = weChatJsSdkConfig;

}