<template>
    <el-card style="width: 60%;margin-left: 10%">
        <div style="display: flex;margin-bottom: 10px">
            <h3 style="width: 100px">头像：</h3>
            <el-upload
                    :show-file-list="false"
                    :http-request="uploadURL"
                    :on-remove="handleRemove"
                    :before-upload="handleBeforeUpload"
                    :limit="1"
            >
                <img v-if="imageUrl" :src="imageUrl" style="width: 50px;height: 50px" />
                <div v-else style="border: 1px dashed;width: 50px;height: 50px;position: relative">
                    <el-icon style="position: relative;top: 25%;left: 32%;"><Plus /></el-icon>
                </div>
            </el-upload>
        </div>

        <div style="display: flex;margin-bottom: 10px">
            <h3 style="width: 100px;">用户名：</h3>
            <el-input v-model="newusername" style="width: 50%"/>
        </div>
        <div style="display: flex">
            <el-button type="primary" @click="myupdata">保存</el-button>
<!--            <el-button>取消</el-button>-->
        </div>
    </el-card>
</template>

<script>
    import {client,	getFileNameUUID} from '@/utils/alioss'
    import axios from "axios";
    import {ElMessage} from "element-plus"
    export default {
        name: "UserMessage",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
        },
        data(){
            return{
                username:'',
                avatar:'',
                imageUrl:'',
                newusername:''
            }
        },
        methods:{
            myupdata:function(){
                let il = this.imageUrl
                let nl = this.newusername
                if(il.length>0||nl.length>0){
                    if(nl==''){
                        this.newusername=this.username
                    }
                    if(il==''){
                        this.imageUrl=this.avatar
                    }
                    //修改信息请求
                    axios({
                        url:'http://localhost:8080/User/updateUser',
                        method: "post",
                        data:{
                            avatar:this.imageUrl,
                            newU:this.newusername,
                            oldU:this.username
                        }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data){
                            ElMessage({
                                message:'修改成功',
                                type:'success'
                            })
                            this.username=this.newusername
                            this.avatar=this.imageUrl
                            this.$store.commit('setUsername',this.newusername)
                            this.$store.commit('setAvatar',this.imageUrl)
                            setTimeout(function () {
                                // 这里就是处理的事件
                                location.reload();
                            }, 1000);
                        }else {
                            ElMessage({
                                message:'修改失败',
                                type:'error'
                            })
                        }
                    })
                }  else{
                    ElMessage.error('至少改变一项')
                }
            },
            // 上传文件之前的方法
            handleBeforeUpload(file) {
                const isJPEG = file.name.split('.')[1] === 'jpeg';
                const isJPG = file.name.split('.')[1] === 'jpg';
                const isPNG = file.name.split('.')[1] === 'png';
                const isWEBP = file.name.split('.')[1] === 'webp';
                const isGIF = file.name.split('.')[1] === 'gif';
                const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
                if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
                    this.$message.error('上传图片只能是 JPEG/JPG/PNG 格式!');
                }
                if (!isLt500K) {
                    this.$message.error('单张图片大小不能超过 4mb!');
                }
                return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
            },
            uploadURL(file) {
                var fileName = 'banner' + `${Date.parse(new Date())}` + '.jpg'; //定义唯一的文件名
                client().multipartUpload(fileName, file.file).then(
                    result => {
                        this.imageUrl = 'https://nbubbs-image.oss-cn-hangzhou.aliyuncs.com/' + fileName;
                        console.log(this.imageUrl)
                    })
            },
            handleRemove(file) {
                this.imageUrl = "";
                console.log(this.imageUrl)
            }
        }
    }
</script>

<style scoped>

</style>