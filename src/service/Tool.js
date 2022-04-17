
// uuid库，https://github.com/uuidjs/uuid
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue'

export default function(){

    Vue.prototype.$common = {};

    // 1.0 判断设置类型，是否移动设备(如：手机、ipad等) ------------------------------------------------------
    const isMobile = function(){
        let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return isMobile
    }
    window.isMobile = isMobile;
    Vue.prototype.isMobile = isMobile;
    Vue.prototype.$common.isMobile = isMobile;


    // 2.0 获取url中的参数；使用示例：getUrlParam('paramName') -------------------------------------------------------
    const getUrlParam = function(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    
    window.getUrlParam = getUrlParam;
    Vue.prototype.getUrlParam = getUrlParam;
    Vue.prototype.$common.getUrlParam = getUrlParam;
    Vue.filter('getUrlParam',getUrlParam);


    // 3.0 判空：判断变量是否为空或 -----------------------------------------------------------------------------------
    const isEmpty = function(value){
        if(value === undefined){
            return true;
        }else if(value === null){
            return true;
        }else if(typeof value === "string" && value.trim() === ""){
            return true;
        }else if(typeof value === "number" && isNaN(value) === true){ 
            return true;
        }else if(typeof value === "number" && value === 0){
            return true;
        }
        return false;
    }
    window.isEmpty = isEmpty;
    Vue.prototype.isEmpty = isEmpty;
    Vue.prototype.$common.isEmpty = isEmpty;
    Vue.filter('isEmpty',isEmpty);


    // 4.0 字节大小转换，用于将单位为字节B(Byte)的数字转为KB、KM、GB等 ---------------------------------------------------------
    const byteSizeConversion = function (value) {
        let pvalue = parseInt(value)
        if(isNaN(pvalue)){
            return "错误：不能将" + value + "转为整数";
        }
        if(pvalue < 1024){
            return pvalue + "B";
        }else if(pvalue >= (1024 * 1024 * 1024)){ // GB
            pvalue = (pvalue/1024/1024/1024).toFixed(2);
            return pvalue + "GB";
        }else if(pvalue >= (1024 * 1024)){        // MB
            pvalue = (pvalue/1024/1024).toFixed(2);
            return pvalue + "MB";
        }else if(pvalue >= (1024)){ // KB
            pvalue = (pvalue/1024).toFixed(2);
            return pvalue + "KB";
        }
    }
    window.byteSizeConversion = byteSizeConversion;
    Vue.prototype.byteSizeConversion = byteSizeConversion;
    Vue.prototype.$common.byteSizeConversion = byteSizeConversion;
    Vue.filter('byteSizeConversion',byteSizeConversion);


    // 5.0 时长转换，用于将毫秒的数字转为ms、s、分钟、小时等 ---------------------------------------------------------
    const durationConversion = function (value) {
        let pvalue = parseFloat(value)
        if(isNaN(pvalue)){
            return "错误：不能将" + value + "转为整数";
        }
        if(pvalue < 1000){
            return pvalue.toFixed(2) + " ms";
        }else if(pvalue >= (1000 * 60 * 60 * 24)){ // 天
            pvalue = (pvalue/(1000 * 60 * 60 * 24)).toFixed(2);
            return pvalue + " 天";
        }else if(pvalue >= (1000 * 60 * 60)){        // 小时
            pvalue = (pvalue/(1000 * 60 * 60)).toFixed(2);
            return pvalue + " 小时";
        }else if(pvalue >= (1000 * 60)){      // 分钟
            pvalue = (pvalue/(1000 * 60)).toFixed(2);
            return pvalue + ' 分钟';
        }else if(pvalue >= 1000){       // s
            pvalue = (pvalue/1000).toFixed(2);
            return pvalue + " s";
        }
    }
    window.durationConversion = durationConversion;
    Vue.prototype.durationConversion = durationConversion;
    Vue.prototype.$common.durationConversion = durationConversion;
    Vue.filter('durationConversion',durationConversion);


    // 6.0 将毫秒转为日期时间字符串  -----------------------------------------------------------------------------
    const millisecondToDateTimeString = function (value) {
        let d = new Date(value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        seconds = d.getSeconds();

        month = parseInt(month) < 10?('0'+month):month;
        day = parseInt(day) < 10?('0'+day):day;
        hour = parseInt(hour) < 10?('0'+hour):hour;
        minute = parseInt(minute) < 10?('0'+minute):minute;
        seconds = parseInt(seconds) < 10?('0'+seconds):seconds;
        return year+"年"+month+"月"+day+"日"+" "+hour+":"+minute+":"+seconds;
    }
    window.millisecondToDateTimeString = millisecondToDateTimeString;
    Vue.prototype.millisecondToDateTimeString = millisecondToDateTimeString;
    Vue.prototype.$common.millisecondToDateTimeString = millisecondToDateTimeString;
    Vue.filter('millisecondToDateTimeString',millisecondToDateTimeString);


    // 7.0 将毫秒转为时间字符串 -----------------------------------------------------------------------------
    const millisecondToTimeString = function (value) {
        let d = new Date(value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        seconds = d.getSeconds();

        month = parseInt(month) < 10?('0'+month):month;
        day = parseInt(day) < 10?('0'+day):day;
        hour = parseInt(hour) < 10?('0'+hour):hour;
        minute = parseInt(minute) < 10?('0'+minute):minute;
        seconds = parseInt(seconds) < 10?('0'+seconds):seconds;
        return hour+":"+minute+":"+seconds;
    }
    window.millisecondToTimeString = millisecondToTimeString;
    Vue.prototype.millisecondToTimeString = millisecondToTimeString;
    Vue.prototype.$common.millisecondToTimeString = millisecondToTimeString;
    Vue.filter('millisecondToTimeString',millisecondToTimeString);


    // 8.0 将字符串转为大写 --------------------------------------------------------------------
    Vue.filter('toUpperCase', function (value) {
        return value.toUpperCase();
    })

    
    // 9.0>. 获取到期天数 ----------------------------------------------------------------------
    const getExpirationTime = function (value) {
    
        let end_time = new Date(value).getTime(); // 毫秒数
        let now_time = new Date().getTime();

        let resetSec = end_time - now_time;

        let day = parseInt(resetSec/(60*60*24*1000));
        let hour = parseInt(resetSec/(60*60*1000)%24);
        let minu = parseInt(resetSec/(60*1000)%60);
        let sec = parseInt(resetSec/1000%60);
        return day; 
    }
    window.getExpirationTime = getExpirationTime;
    Vue.prototype.getExpirationTime = getExpirationTime;
    Vue.prototype.$common.getExpirationTime = getExpirationTime;
    Vue.filter('getExpirationTime',getExpirationTime);

    
    // 9.1>. 获取指定时间到当前时间的差 ----------------------------------------------------------------------
    const getDiffToToday = function (value) {
        if(isEmpty(value)) {
            return null;
        }
        
        let end_time = new Date(value).getTime(); // 毫秒数
        let now_time = new Date().getTime();

        let resetSec = end_time - now_time;

        let day = parseInt(resetSec/(60*60*24*1000));
        let hour = parseInt(resetSec/(60*60*1000)%24);
        let minu = parseInt(resetSec/(60*1000)%60);
        let sec = parseInt(resetSec/1000%60);
        
        if(day > 0){
            return (day + "天后");
        }else if(day < 0){
            return (Math.abs(day) + "天前");
        }

        if(hour > 0){
            return (hour + "小时后");
        }else if(hour < 0){
            return (Math.abs(hour) + "小时前");
        }

        if(minu > 0){
            return (minu + "分钟后");
        }else if(minu < 0){
            return (Math.abs(minu) + "分钟前");
        }

        if(sec > 0){
            return (sec + "秒后");
        }else if(sec < 0){
            return (Math.abs(sec) + "秒前");
        }

        return day; 
    }
    window.getDiffToToday = getDiffToToday;
    Vue.prototype.getDiffToToday = getDiffToToday;
    Vue.prototype.$common.getDiffToToday = getDiffToToday;
    Vue.filter('getDiffToToday',getDiffToToday);


    // 10. 生成本地唯一的UUID（UUID本身有重复的机率，此函数可避免重复）
    const uuid = function(){
        // 获取微秒级时间戳
        let timestamp =  window.performance.timing.navigationStart + window.performance.now();
        let uuid = uuidv4() + "-" + timestamp;
        return uuid;
    }
    window.uuid = uuid;
    Vue.prototype.uuid = uuid;
    Vue.prototype.$common.uuid = uuid;
    Vue.filter('uuid',uuid);


    // 11. 在浏览器中打开链接
    const openUrl = function(urlStr){
        try {
            new URL(urlStr); // 若urlStr错误，则new URL()会抛出异常
            this.$this.$electron.shell.openExternal(urlStr);
        } catch (_) {
            this.$this.$message({ message: "URL无效，请检查 “外网访问域名” 是否正确！", type: 'error' });
        }
    }
    window.openUrl = openUrl;
    Vue.prototype.openUrl = openUrl;
    Vue.prototype.$common.openUrl = openUrl;

    
    // 12. 将文本内容导出为文件
    const exportText = function(data,name){
        let blob = new Blob([data]);
        let url = window.URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    window.exportText = exportText;
    Vue.prototype.exportText = exportText;
    Vue.prototype.$common.exportText = exportText;


    // 13. 截取字符串
    const subString = function(data,startIndex,endIndex){
        if(typeof(data) != 'string'){
            data += "";
        }
        return data.substring(startIndex,endIndex);
    }
    Vue.filter('subString',subString);

    
    // 14. 下载文本内容
    const downloadText = function(fileName,fileContent){

        // 创建隐藏的可下载链接
        let eleLink = document.createElement('a');
        eleLink.download = fileName;
        eleLink.style.display = 'none';

        // 字符内容转变成blob地址
        let blob = new Blob([fileContent]);
        eleLink.href = URL.createObjectURL(blob);

        // 触发点击
        document.body.appendChild(eleLink); 
        eleLink.click();
        
        // 然后移除
        document.body.removeChild(eleLink);
    }
    window.downloadText = downloadText;


    // 15. 保留2位小数字（四舍五入）
    const toFixed = function(value,numberDigits=2){
        // 截取当前数据到小数点后两位
        let realVal = parseFloat(value).toFixed(numberDigits);
        return realVal
    }
    Vue.filter('toFixed',toFixed);
}


