<template>

  <div class="container w-75" >
    <div class="row text-center">

      <div  style="height: 100px" >

      </div>

    </div>
    <div class="row " style="height: 60px" >

    </div>
    <div class="row text-center" >
      <h1 class="light">markdown PreView</h1>
      <br/>
      <br/>
    </div>
    <el-divider />

    <div class="row">
      <!--    <hr>-->
      <div class="col-md-5 text-left">
        <h3 class="light">markdown</h3>
        <textarea class="info" v-model="markdown"></textarea>
      </div>

      <div class="col-md-5 text-left" >
        <h3 class="light">Preview</h3>
        <div style="word-break: break-all" class="info"  :key="markdown" v-markdown>
          {{markdown}}
        </div>
      </div>
      <div class="col-md-2 text-center">
        <h3 class="light">Operation</h3>
        <div class="info-button " style="margin: auto">
          <div class="btn-group-vertical" role="group">
            <button type="button" @click="post" class="btn btn-danger">submit</button>
            <button type="button" @click="goBack" class="btn btn-warning">
               quit</button>
            <button type="button" class="btn btn-success">save</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import PageHeader from "@/components/PageHeader";
import {useRouter} from "vue-router";
import {useStore} from 'vuex';
const markdown=ref();
const router = useRouter();
const store = useStore();
let title,avatar,image,posterName=ref(0)
onMounted(()=>{
  // console.log(title)
  title =store.getters.getTitle
  avatar =store.getters.getAvatar
  image=store.getters.getImage
  posterName=store.getters.getPosterName
  console.log(title)
})


function post(){
  axios(
      {
      //   headers:{
      //   'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
      // },
        url:'http://127.0.0.1:8080/Blog/postblog/',
        method:'post',
        data:{
          content:markdown.value,
          title:title,
          avatar:avatar,
          posterName:posterName,
          image:image
        }
      }
  ).then(res=>{
        console.log(res.data)
        setTimeout(function () {
          // 这里就是处理的事件
          location.reload();
        }, 1000);
        router.push('/')
  })
}
function goBack(){
  router.push('/')
}

</script>

<style scoped>
.info-button{
  width: 100%;
  height: 400px;
  /*background-color: #333333;*/
}
textarea{
  resize: none;
  border: 2px dashed orange;
}
/*.navbar-fixed-top{*/
/*  background-color:#ffffff;*/
/*  height: 50px;*/
/*  border: 2px dashed orange;*/
/*}*/
.info{
  height: 800px;
  width: 100%;
  background-color: rgba(255,255,255,0.9);
}
image{
  width: 400px;
  height: 300px;
}
.container{
  background: linear-gradient(141deg,#1BAEAE,#0fb8ad);
  height: 2000px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

}
.light{
  color: white;
  text-shadow: #181818;
}
textarea{
  resize: none;
  width: 460px;
  background: #181818;
  border: 2px dashed orange;
}
</style>