import Vue from 'vue'

/*
 
使用示例:
以下以邮箱验证为例展示表单验证指令的使用方式；
如下，邮箱验证的指令是“validate-email”，其参数name为欲验证的字段的名称，value为值，tip(选填)是用于显示错误信息的元素ref
<input v-validate-email="{value:name,tip:'emailError'}" v-model="name" />

此为显示表单错误信息的元素，表单验证指令会自动将验证结果填充至此元素中，与此同时会调用验证回调 formValidationCallback 来传递验证结果
<div ref="emailError"></div>

*/

export default function(){

   // 0.0> 工具方法
   function imp(binding,vnode,reg,_errorInfo){
      let errorInfo = "";
      if(!reg.test(binding.value.value)){
         errorInfo = _errorInfo;
      }
      if(binding.value.tip){
         let node = vnode.context.$refs[binding.value.tip];
         node?node.innerText=errorInfo:null;
      }
      if(vnode.context.formValidationCallback){
         vnode.context.formValidationCallback(binding.value.name,binding.value.value,errorInfo);
      }
   }

   // 1.0> 邮箱验证
   Vue.directive('validate-email', {
      update(el,binding,vnode){ 
         const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         imp(binding,vnode,reg,'请输入正确的邮箱');
      },
   });


   // 2.0> 身份证验证
   Vue.directive('validate-id-card', {
      update(el,binding,vnode){ 
         const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)|(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx][0-9]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9]$)/;
         imp(binding,vnode,reg,'请输入正确的身份证号');
      },
   });


   // 3.0> 座机号和手机号验证
   Vue.directive('validate-tel', {
      update(el,binding,vnode){ 
         const reg = /(^((0\d{2}-\d{8})|(0\d{3}-\d{7,8})|(0\d{2}\d{8})|(0\d{3}\d{7,8}))$)|(^[1][3,4,5,6,7,8,9][0-9]{9}$)/;
         imp(binding,vnode,reg,'请输入正确的座机/手机号');
      },
   });


   // 4.0> URL验证
   Vue.directive('validate-url', {
      update(el,binding,vnode){ 
         const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
         imp(binding,vnode,reg,'请输入正确的URL');
      },
   });

   



}