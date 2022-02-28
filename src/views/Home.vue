<template>
   <div class="container">
      
      <div class="content prototype">
         <div class="title">JS原型方法/对象测试</div>
         <div>{{new Date().format("yyyy-MM-dd")}}</div>
      </div>

      <div class="content filter">
         <div class="title">过滤器测试</div>
         <div>{{2121 | byteSizeConversion}}</div>
         <div>{{1 | subString(0,10)}}</div>
      </div>
      
      <div class="content vuePrototype">
         <div class="title">Vue原型方法/对象测试</div>
         <div v-if="isMobile()">移动</div>
         <div v-else>PC</div>
      </div>

      <div class="content wechat">
         <div class="title">微信授权测试</div>
         <div class="button" @click="jw_weChatPageAuth()">打开微信网页授权页面</div>
         <div class="button"  @click="testWeChatJsSdkConfig()">获取JS-SDK授权签名</div>
      </div>

      <div class="content validate">
         <div class="title">表单验证</div>
         <div>
            <div class="name">邮箱</div>
            <input v-validate-email="{name:'name',value:form.email, tip:'emailError'}" v-model="form.email" />
            <div class="errorTip" ref="emailError"></div>
         </div>
         <div>
            <div class="name">身份证</div>
            <input v-validate-id-card="{name:'idCard',value:form.idCard, tip:'idCardError'}" v-model="form.idCard" />
            <div class="errorTip" ref="idCardError"></div>
         </div>
         <div>
            <div class="name">手机/座机</div>
            <input v-validate-tel="{name:'tel',value:form.tel, tip:'telError'}" v-model="form.tel" />
            <div class="errorTip" ref="telError"></div>
         </div>
         <div>
            <div class="name">URL</div>
            <input v-validate-url="{name:'url',value:form.url, tip:'urlError'}" v-model="form.url" />
            <div class="errorTip" ref="urlError"></div>
         </div>
      </div>

      <test></test>

   </div>
</template>

<script>


import Test from '../components/0-test/Test.vue'

// import Vue from 'vue'
// Vue.directive('validate-email', {
//    // bind：只调用一次，指令第一次绑定到元素时调用
//    bind(el, binding, vnode){
//       // debugger;
//    },
//    // 当被绑定的元素插入到 DOM 中时
//    inserted: function (el) {
//       // 聚焦元素
//       el.focus()
//    },
//    // update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
//    update(el,binding,vnode){
//       vnode.context.$refs[binding.value.tipRef].innerText = binding.value.value;
//    },
//    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
//    // componentUpdated(el,binding,vnode){
//    //    vnode.context.$refs[binding.value.tipRef].innerText = "发生错误11111";
//    // },
//    // unbind：只调用一次，指令与元素解绑时调用。
//    unbind(){
//       debugger;
//    }
// })

export default {
   components:{
      Test
   },
   data(){
      return {
         form:{
            email:"",
            idCard:"",
            tel:"",
            url:"",
         }
      }
   },
   mounted(){


   },
   methods:{
      testWeChatJsSdkConfig(){
         this.$weChat.jw_weChatJsSdkConfig(['openLocation','getLocation'],{
            appid:'wx0656090416bae774',
            appsecret:'f3827befafd609da05e5e75876714593',  
         });
      },

      // 表单验证结果回调函数
      formValidationCallback(fieldName,fieldValue,errorInfo){
         console.log(errorInfo);
      }
   }
   
}
</script>


<style scoped>

.container{
   display:flex;
   flex-direction:column;
}

.content{
   display:flex;
   flex-direction: column;
   margin-bottom: 20px;
}
.content>.title{
   font-size: 18px;
   font-weight: bold;
}
.content>.button{
   cursor:pointer;
   color:blue;
}


.content.validate>*{
   margin: 4px 2px;
   display:flex;
}
.content.validate>*>.name{
   /* text-align: justify;
   text-align-last:justify; */
   width:80px;
   text-align:right;
   margin-right: 10px;
}
.content.validate .errorTip{
   margin-left:3px;
   color:red;
}

</style>