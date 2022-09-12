<template>
    <el-container>
        <el-header style="margin-bottom: 5px;margin-top: 15px">
            <el-card>
                <el-row class="row-bg" justify="end">
                    <el-col :span="14"></el-col>
                    <el-col :span="6">
                        <el-input
                                v-model="key"
                                size="large"
                                placeholder="市场搜索"
                                prefix-icon="Search"
                                @change="Gsearch"
                        />
                    </el-col>
                    <el-col :span="1">
                        <el-button icon="plus" style="width: 40px;height: 40px" size="large" type="primary" circle @click="add">
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>

        </el-header>
        <el-main>
            <el-card v-if="addStatus==true" style="padding-left: 10%;padding-right: 10%">
                <h3>编辑内容:</h3>
                <el-input v-model=newGood.name  placeholder="" style="margin-bottom: 5px;width: 60%;">
                    <template #prepend style="color: aqua">商品名</template>
                </el-input>
                <el-input
                        v-model=newGood.description
                        :autosize="{ minRows: 4, maxRows: 6 }"
                        type="textarea"
                        placeholder="描述"
                        style="margin-bottom: 5px;"
                />
                <!--图片上传组件-->
                <el-upload
                        list-type="picture-card"
                        :http-request="uploadURL"
                        :before-upload="handleBeforeUpload"
                        :limit="9"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <el-button type="primary" @click="send">发送</el-button>
            </el-card>
        </el-main>
    </el-container>

    <div style="display: flex;flex-wrap: wrap;margin-left: 20%;margin-right: 20%">
        <!--交易模块-->
        <div v-for="good in goods" style="width: 33%">
            <!--卡片式-->
            <el-card :body-style="{ padding: '0px' }" style="margin: 20px">
                <!--（待售）商品图片轮播图-->
                <el-carousel v-if="good.state" trigger="click" height="200px">
                    <el-carousel-item v-if="good.imagelist.length>0" v-for="img in good.imagelist" style="display: flex">
                        <el-image
                                :src=img
                                style="width: 100%;"
                                fit="contain"
                        />
                    </el-carousel-item>
                    <el-carousel-item label="此商品无图" v-if="good.imagelist.length==0" style="display: flex">
                        <el-image
                                :src=img
                                style="width: 100%;"
                                fit="contain"
                        />
                    </el-carousel-item>
                </el-carousel>
                <!--（已售）商品图片轮播图-->
                <el-carousel v-if="!good.state" trigger="click" height="200px" style="opacity: 60%">
                    <el-carousel-item label="已售" style="background-color: #cccccc;display: flex">
                        <el-image
                                :src=good.imagelist[0]
                                style="width: 100%;opacity: 20%;"
                                fit="contain"
                        />
                    </el-carousel-item>
                </el-carousel>
                <!--下半部分内容-->
                <div style="padding: 14px">
                    <!--标题-->
                    <h4 style="font-weight: bold">{{good.name}}</h4>
                    <el-divider style="margin: 3px" />
                    <!--正文-->
                    <p style="font-size: 12px;font-weight: bold;white-space: pre-wrap">
                        {{good.description}}
                    </p>
                    <!--卖家头像、昵称、发布时间-->
                    <div style="display: flex;margin-top: 5px">
                        <!--头像-->
                        <div style="width: fit-content;margin-right: 5px">
                            <el-avatar
                                    size="small"
                                    :src=good.avatar
                            />
                        </div>
                        <!--昵称-->
                        <div style="width: fit-content;font-size: small;font-weight: lighter">{{good.seller}}</div>
                        <div style="flex: 1"></div>
                        <!--时间-->
                        <time style="width: fit-content;font-size: small;font-weight: lighter">{{good.datetime}}</time>
                    </div>
                    <el-divider style="margin: 0" />
                    <!--回复、开关-->
                    <div style="display: flex">
                        <!--评论按钮-->
                        <div style="width: fit-content;margin-right: 5px">
                            <div style="font-size: large;"><el-button icon="ChatDotSquare" @click="chat" link >65</el-button></div>
                        </div>
                        <div style="flex: 1"></div>
                        <!--卖家开关-->
                        <el-switch
                                v-if="good.seller == username"
                                v-model="good.state"
                                active-color="#13ce66"
                                inactive-color="#cccccc"
                                inline-prompt
                                active-text="在售"
                                inactive-text="已售"
                                width="50px"
                                @change="myswitch(good.id)"
                        />
                    </div>
                </div>
            </el-card>
        </div>
        <p v-if="searchf==false">没有找到符合条件的商品</p>
    </div>


</template>

<script>
    import axios from "axios";
    import {client} from "@/utils/alioss";
    import {ElMessage} from "element-plus";

    export default {
        name: "JumpMarkest",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
            //商品数据获取请求
            axios({
                url:'http://localhost:8080/Good/GetGoods',
                method: "post"
            }).then(res => {
                this.goods=res.data
                console.log(res.data)
                for(var i in this.goods){
                    if(this.goods[i].state=='true'){
                        this.goods[i].state=true
                    }else{
                        this.goods[i].state=false
                    }
                }
            })

        },
        methods:{
            add:function () {
                if(this.username=="游客"){
                    ElMessage.error('需要登录才能发布')
                }else{
                    this.addStatus = !this.addStatus
                }
            },
            send:function () {
                let nl = this.newGood.name;
                let dl = this.newGood.description;
                if(nl.length>0){
                    if(dl.length>0){
                        //货物信息发送请求
                        axios({
                            url:'http://localhost:8080/Good/PostGood',
                            method: "post",
                            data:{
                                name:this.newGood.name,
                                description:this.newGood.description,
                                image:this.fileList,
                                username:this.username,
                                avatar:this.avatar
                            }
                        }).then(res => {
                            if(res.data){
                                this.addStatus=false
                                ElMessage({
                                    message:'发送成功',
                                    type:'success'
                                })
                                this.newGood.name=''
                                this.newGood.description=''
                                this.fileList=[]
                                setTimeout(function () {
                                    // 这里就是处理的事件
                                    location.reload();
                                }, 1000);
                            }else{
                                ElMessage.error('发送失败')
                            }
                            //console.log(res.data)
                        })
                    }else {
                        ElMessage.error('描述不能为空！')
                    }
                }else{
                    ElMessage.error('商品名不能为空！')
                }


            },
            Gsearch:function (){
                let kl = this.key
                if(kl.length>0){
                    //帖子搜索接口
                    axios({
                        url:'http://localhost:8080/Good/searchGood',
                        method: "post",
                        data:{
                            key:this.key
                        }
                    }).then(res => {
                        this.goods = res.data
                        console.log(res.data);
                        if(res.data.length==0){
                            this.searchf=false;
                        }
                    })
                }
            },
            myswitch:function (id) {
                //console.log(id)
                //改变货物状态请求
                axios({
                    url:'http://localhost:8080/Good/closeSell',
                    method: "post",
                    data:{
                        id:id
                    }
                }).then(res => {
                    //console.log(res.data)
                })
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
                //定义唯一的文件名，打印出来的uid其实就是时间戳
                client().multipartUpload(fileName, file.file).then(
                    result => {
                        //此处为给自己属性进行赋值，
                        //根据需要可能项目还需对自己的数据库进行保存
                        this.fileList.push('https://nbubbs-image.oss-cn-hangzhou.aliyuncs.com/' + fileName);
                    })
            }
        },
        data(){
            return{
                username:'',
                avatar:'',
                key:'',
                searchf:true,
                fileList:[],
                newGood:{
                    name:'',
                    description:''
                },
                addStatus:false,
                value:true,
                conent:"楼主是萌萌哒的女生呦~自用3090显卡，舔狗买的用不上捏 \n"+
                    "可小刀 \n"+
                    "有意者+v:5201314",
                goods:[{
                    id:1,
                    state:true,
                    imagelist:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    name:'99新，女生自用3090',
                    description:"楼主是萌萌哒的女生呦~自用3090显卡，舔狗买的用不上捏 \n"+
                        "可小刀 \n"+
                        "有意者+v:5201314",
                    seller:'',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    datetime:'2022-6-2 16:43'
                },{
                    id:1,
                    state:true,
                    imagelist:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    name:'99新，女生自用3090',
                    description:"楼主是萌萌哒的女生呦~自用3090显卡，舔狗买的用不上捏 \n"+
                        "可小刀 \n"+
                        "有意者+v:5201314",
                    seller:'小莓今天减肥了吗',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    datetime:'2022-6-2 16:43'
                },{
                    id:1,
                    state:true,
                    imagelist:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    name:'99新，女生自用3090',
                    description:"楼主是萌萌哒的女生呦~自用3090显卡，舔狗买的用不上捏 \n"+
                        "可小刀 \n"+
                        "有意者+v:5201314",
                    seller:'小莓今天减肥了吗',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    datetime:'2022-6-2 16:43'
                },{
                    id:1,
                    state:true,
                    imagelist:['https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'],
                    name:'Yummy hamburger',
                    description:"汉堡！汉堡！汉堡！ \n"+
                        "可小刀 \n"+
                        "有意者+v:5201314",
                    seller:'嘉然今天吃什么',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    datetime:'2022-6-2'
                }]
            }
        }
    }
</script>

<style scoped>

</style>