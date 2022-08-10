# web-tool-library

> 路由path 必须与Vue文件的路径名称完全对应；
> 
> 图片文件的路径必须与Vue文件的路径名称完全对

## JS原型方法
``` javascript
// 日期对象格式化
Date.prototype.format(<yyyy-MM-dd HH:mm:ss.SSS>);

// 删除数组中元素
Array.prototype.remove(<element>);
```

<br/><br/>

## 全局方法（JS原型方法/VUE原型方法/VUE过滤器）
``` javascript

// 判断设置类型，是否移动设备(如：手机、ipad等)
isMobile()

// 获取url中的参数
getUrlParam(<paramName>)

// 判断变量或对象是否为空或
isEmpty()

// 字节大小转换，用于将单位为字节B(Byte)的数字转为KB、KM、GB等
byteSizeConversion()

// 将毫秒的数字转为ms、s、分钟、小时等
durationConversion(value)

// 将毫秒转为日期时间字符串
millisecondToDateTimeString(value)

// 将毫秒转为时间字符串
millisecondToTimeString(value)
```
