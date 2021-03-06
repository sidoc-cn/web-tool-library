
// JS原型扩展函数/对象

export default function (){

   // 1.0 全局日期对象格式化方法 -----------------------------------------------------------------------------
   Date.prototype.format = function(fmt) { 
      var o = { 
         "M+" : this.getMonth()+1,                 // 月份 
         "d+" : this.getDate(),                    // 日 
         "h+" : this.getHours(),                   // 小时 
         "m+" : this.getMinutes(),                 // 分 
         "s+" : this.getSeconds(),                 // 秒 
         "q+" : Math.floor((this.getMonth()+3)/3), // 季度 
         "S"  : this.getMilliseconds()             // 毫秒 
      }; 
      if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      }
      for(var k in o) {
         if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
      }
      return fmt; 
   }


   // 2.0 删除数组元素 -------------------------------------------------------------------------------
   Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
         this.splice(index, 1);
      }
   };

}

