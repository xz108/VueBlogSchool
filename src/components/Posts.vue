<template>

    <!--轮播图-->
    <el-carousel :interval="4000" type="card" height="260px" style="margin-top: 20px;margin-left: 15%;margin-right: 7%;width: 68%;">
        <!--轮播图item模板-->
        <el-carousel-item v-for="(item,index) in items" :key="index" style="width: fit-content;height: fit-content;" >
            <!--具体是一张卡片模板-->
            <el-card body-style="padding: 0px" style="margin-bottom: 5px;height: fit-content;width: fit-content">
                    <!--头图-->
                    <el-image :src=item.image />
            </el-card>
        </el-carousel-item>
    </el-carousel>

    <!--工具栏搜索和发帖，上下容器-->
    <el-container>
        <!--工具类和发帖按钮（一直显示）-->
        <el-header style="margin-bottom: 5px">
            <!--卡片模板·-->
            <el-card>
                <!--靠右列布局-->
                <el-row class="row-bg" justify="end">
                    <!--占位列-->
                    <el-col :span="14"></el-col>
                    <!--树洞搜索-->
                    <el-col :span="6">
                        <el-input
                                v-model=key
                                size="large"
                                placeholder="树洞搜索"
                                prefix-icon="Search"
                                @change="Psearch"
                        />
                    </el-col>
                    <!--发帖按钮-->
                    <el-col :span="1">
                        <el-button icon="plus" style="width: 40px;height: 40px;" size="large" type="primary" circle  @click="addStatus=!addStatus">
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-header>

        <!--发帖编辑部分（点击发帖按钮开关，默认隐藏）-->
        <el-main>
            <!--卡片式-->
            <el-card v-if="addStatus==true" style="padding-left: 10%;padding-right: 10%">
                <!--提示信息-->
                <h3>编辑内容:</h3>
                <!--标题输入框-->
                <el-input v-model="formdata.title" placeholder="限制16字" style="margin-bottom: 5px;width: 60%;">
                    <template #prepend style="color: aqua">标题</template>
                </el-input>
                <!--正文输入框-->
<!--                <el-input-->
<!--                        v-model="formdata.content"-->
<!--                        :autosize="{ minRows: 4, maxRows: 6 }"-->
<!--                        type="textarea"-->
<!--                        placeholder="正文，限制300字"-->
<!--                        style="margin-bottom: 5px;"-->
<!--                />-->
                <!--图片上传组件-->
                <el-upload
                        list-type="picture-card"
                        :http-request="uploadURL"
                        :before-upload="handleBeforeUpload"
                        :limit="9"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <!--发送按钮-->
                <el-button style="margin-top: 5px" type="primary" @click="jumpToEdit">发送</el-button>
            </el-card>
        </el-main>
    </el-container>

    <!--帖子和热榜，列布局-->
    <el-row :gutter="0" style="margin-left: 8%">
        <!--帖子占12/20-->
        <el-col :span="12" style="margin-right: 25px">
            <!--行式布局container-->
            <el-container direction="vertical">
                    <!--置顶帖模板-->
                    <el-card v-for="post in topposts" body-style="padding: 5px" style="margin-bottom: 5px">
                        <!--卡片头部，标题、内容、图片-->
                        <template #header>
                            <!--路由-->
                            <router-link @click="changePostId(post.id,'topblog')" to="/postdeatil" style="text-decoration: none;color: #000000">
                                <!--水平布局-->
                                <el-container>
                                    <!--标题和正文-->
                                    <el-aside>
                                        <!--标题-->
                                        <div style="font-weight: bold">
                                            <el-tag type="danger" effect="dark" size="">[置顶]</el-tag>
                                            {{post.title}}
                                        </div>
                                        <!--正文-->
                                        <p style="font-weight: lighter;font-size: small">
                                             {{post.content}}...</p>
                                    </el-aside>
                                    <!--头图-->
                                    <el-main style="padding-top: 0;padding-bottom: 0">
                                        <el-image :src=post.imageList[0] style="width: 285px;height: 160px" />
                                    </el-main>
                                </el-container>
                            </router-link>
                        </template>
                        <!--卡片底部头像、昵称、发布时间、访问量、评论数、顶赞数-->
                        <div style="display: flex">
                            <!--头像-->
                            <div style="width: 8%">
                                <el-avatar
                                        size=""
                                        :src=post.avatar
                                />
                            </div>
                            <!--昵称-->
                            <div style="flex: 1">
                                <div style="font-weight: lighter;font-size: small;margin-top: 15px">{{post.poster}}</div>
                            </div>
                            <!--发布时间-->
                            <div style="width: 30%">
                                <div style="font-size: small;font-weight: bold;margin-top: 15px"><el-icon><Calendar /></el-icon>
                                    {{post.postTime}}</div>
                            </div>
                            <!--访问量-->
                            <div style="width: 15%">
                                <div style="font-size: small;margin-top: 15px"><el-icon><View /></el-icon>150</div>
                            </div>
                            <!--评论数-->
                            <div style="width: 15%">
                                <div style="font-size: small;margin-top: 9px"><el-button @click="changePostId(post.id)" icon="ChatDotSquare" link>65</el-button></div>
                            </div>
                            <!--点赞数-->
                            <div style="width: 10%">
                                <div style="font-size: small;margin-top: 9px">
                                    <el-button icon="CaretTop" link>{{post.likes}}</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-divider style="font-weight: bold"><span style="color: gold">置顶帖结束</span></el-divider>
                    <!--普通帖模板-->
                    <el-card v-for="(post,index) in posts" body-style="padding: 5px" style="margin-bottom: 5px">
                        <template #header>
                            <!--路由-->
                            <router-link @click="changePostId(post.id,'blog')" to="/postdeatil" style="text-decoration: none;color: #000000">
                                <el-container>
                                    <el-aside>
                                        <div style="font-weight: bold">
                                            {{post.title}}
                                        </div>
                                        <p style="font-weight: lighter;font-size: small;white-space: pre-wrap">
                                             {{post.content}}...</p>
                                    </el-aside>
                                    <el-main v-if="post.imageList.length>0" style="padding-top: 0;padding-bottom: 0;">
                                        <el-image :src=post.imageList[0] style="width: 285px;height: 160px" />
                                    </el-main>
                                </el-container>
                            </router-link>
                        </template>
                        <div style="display: flex">
                            <div style="width: 8%">
                                <el-avatar
                                        size=""
                                        :src=post.avatar
                                />
                            </div>
                            <div style="width: 13%">
                                <div style="font-weight: lighter;font-size: small;margin-top: 15px">{{post.poster}}</div>
                            </div>
                            <div style="width: 25%">
                                <div style="font-size: small;font-weight: bold;margin-top: 15px"><el-icon><Calendar /></el-icon>
                                    {{post.postTime}}</div>
                            </div>
                            <div style="width: 15%">
                                <div style="font-size: small;margin-top: 15px"><el-icon><View /></el-icon>150</div>
                            </div>
                            <div style="width: 15%">
                                <div style="font-size: small;margin-top: 9px"><el-button @click="changePostId(post.id,'blog')" icon="ChatDotSquare" link>65</el-button></div>
                            </div>
                            <div style="width: 10%">
                                <div style="font-size: small;margin-top: 9px">
                                    <el-button icon="CaretTop" link>{{post.likes}}</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <p v-if="searchf==false">没有找到符合条件的帖子</p>
                    <el-divider>没有更多了</el-divider>
            </el-container>
        </el-col>

        <!--热榜占9/20-->
        <el-col :span="9">
            <el-container>
                <el-header>
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                热度榜
                            </div>
                        </template>

                        <div v-for="(hot,index) in hots" style="margin-bottom: 5px">
                            <el-icon color="green" style="margin-right: 10px"><ArrowUp />
                                {{index+1}} </el-icon>
                            <el-button @click="changePostId(hot.id,'blog')" link>{{hot.title}}...</el-button>
                            <el-icon color="gold"><StarFilled /></el-icon>
                            {{hot.likes}}
                        </div>

<!--                        <div style="margin-bottom: 5px">-->
<!--                            <el-icon color="red" style="margin-right: 10px"><ArrowDown />99</el-icon>-->
<!--                            <el-button link>vue返回上一页(后退)的几种方法与区别...</el-button>-->
<!--                            <el-icon color="gold"><StarFilled /></el-icon>10-->
<!--                        </div>-->
                    </el-card>
                </el-header>
            </el-container>
        </el-col>
    </el-row>

</template>

<script>
    import {client,	getFileNameUUID} from '@/utils/alioss'
    import axios from "axios";
    import {ElMessage} from "element-plus";
    import route from "@/router";

    export default {
        name: "Posts",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
            //置顶帖获取请求
            axios({
                url:'http://localhost:8080/Blog/QueryAllTopBlog',
                method: "post"
            }).then(res => {
                this.topposts=res.data
                console.log(res.data)
            })
            //普通帖获取请求
            axios({
                url:'http://localhost:8080/Blog/QueryAllBlog',
                method: "post"
            }).then(res => {
                this.posts=res.data
              this.posts.forEach(function (post){
                post.content =post.content.substr(0,40)
              })
              console.log(this.posts)
            })
            //热度榜数据获取请求
            axios({
                url:'http://localhost:8080/Blog/QueryFavorite',
                method: "post"
            }).then(res => {
                this.hots=res.data
                //console.log(res.data)
            })

        },
        methods: {
            add: function () {
                if(this.username=="游客"){
                  console.log(this.username)
                    ElMessage.error('需要登录才能发帖')
                }else{
                    this.addStatus = !this.addStatus
                }
            },
          jumpToEdit: function (){

            console.log(this.formdata.title)
            this.$store.commit('setTitle',this.formdata.title)
            this.$store.commit('setPosterName',this.username)
            this.$store.commit('setImage',this.fileList)
            this.$store.commit('setAvatar',this.avatar)
            route.push("/edit")
          } ,
            changePostId:function (postId,type) {
                this.$store.commit('setPostId',postId)
                this.$store.commit('setType',type)
                console.log(postId+type)
                this.$router.push('/postdeatil')
            },
            log:function () {
                //console.log(this.fileList)
                let tl = this.formdata.title;
                let cl = this.formdata.content;
                if(tl.length>0){
                    if(cl.length>0){
                        //帖子信息发送请求
                        axios({
                            url:'http://localhost:8080/Blog/postblog',
                            method: "post",
                            data:{
                                title:this.formdata.title,
                                content:this.formdata.content,
                                image:this.fileList,
                                posterName:this.username,
                                avatar:this.avatar
                            }
                        }).then(res => {
                            if(res.data){
                                this.addStatus=false
                                ElMessage({
                                    message:'发送成功',
                                    type:'success'
                                })
                                this.formdata.title=''
                                this.formdata.content=''
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
                        ElMessage.error('内容不能为空！')
                    }
                }else{
                    ElMessage.error('标题不能为空！')
                }


            },
            Psearch:function (){
                let kl = this.key
                if(kl.length>0){
                    //帖子搜索接口
                    axios({
                        url:'http://localhost:8080/Blog/searchBlog',
                        method: "post",
                        data:{
                            key:this.key
                        }
                    }).then(res => {
                        this.posts = res.data
                        console.log(res.data);
                        if(res.data.length==0){
                            this.searchf=false;
                        }
                    })
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
                addStatus:false,
                searchf:true,
                key:'',
                items:[{image:"https://pic.leetcode-cn.com/1653973116-QjvCFZ-%E5%B2%97%E4%BD%8D%E9%9D%A2%E8%AF%95%E6%A8%A1%E6%8B%9F%E9%A2%98%E9%9B%86.png?x-oss-process=image%2Fformat%2Cwebp"},
                    {image:"https://pic.leetcode-cn.com/1617250539-zSvRFh-%E6%95%99%E8%82%B2%E4%BC%98%E6%83%A0-01.png?x-oss-process=image%2Fformat%2Cwebp"},
                    {image:"https://pic.leetcode-cn.com/1639645313-nkDVCJ-3.jpeg?x-oss-process=image%2Fformat%2Cwebp"}],
                formdata:{
                    title:'',
                    content:''
                },
                fileList:[],
                hots:[{
                    id:'1',
                    title:'3',
                    likes:'4235'
                },{
                    id:'2',
                    title:'534',
                    likes:'4234'
                }],
                posts:[{
                    id:'1',
                    title:'hello',
                    content:'是否豆腐干地方',
                    poster:'张三',
                    likes:'45',
                    postTime:'2022-01-06 15：00',
                    imageList:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    posterId:'3',
                    avatar:"https://img-blog.csdnimg.cn/img_convert/dbb8bdeec5d679acc4c1639578ef4277.png"
                },
                {
                    id:'1',
                    title:'hello',
                    content:'vue返回上一页(后退)的几种方法与区别 - CSDN',
                    poster:'张三',
                    likes:'45',
                    postTime:'2022-01-06 15：00',
                    imageList:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    posterId:'3',
                    avatar:"https://img-blog.csdnimg.cn/img_convert/dbb8bdeec5d679acc4c1639578ef4277.png"
                },
                {
                    id:'1',
                    title:'hello',
                    content:'vue返回上一页(后退)的几种方法与区别 - CSDN',
                    poster:'张三',
                    likes:'45',
                    postTime:'2022-01-06 15：00',
                    imageList:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'],
                    posterId:'3',
                    avatar:"https://img-blog.csdnimg.cn/img_convert/dbb8bdeec5d679acc4c1639578ef4277.png"
                }],
                topposts:[{
                    id:'1',
                    title:'李昊：从技术到管理，如何实现螺旋上升？',
                    content:'从开发者到技术管理者应该如何提升能力？在李昊看来，开发和管理之间的“鸿沟”并非很难跨越，他将从“深入理解基层技术管理岗位角色、纠偏对技术管理者的认识误区，以及通过日常执行层真正做好管理”三',
                    poster:'《新程序员》编辑部',
                    likes:'45',
                    postTime:'2022-06-01 08:57:05',
                    imageList:['https://img-blog.csdnimg.cn/img_convert/7545ed3ef0c7d5a3357ca0ec2d47cece.png'],
                    posterId:'3',
                    avatar:"https://img-blog.csdnimg.cn/img_convert/dbb8bdeec5d679acc4c1639578ef4277.png"
                },
                    {
                        id:'1',
                        title:'动动手指自己“造”芯片，Google 推出芯片设计网站',
                        content:'「人人都是开发者，家家都是技术公司」的时代，不仅编程的门槛降低了，就连自己也可以动动手指头制造芯片“玩”了。\n\n6 月 1 日，Google 硬件团队推出了一个全新的面向开发者的网站：http://developers.google.com/silicon。乍一看，这个网站平平无奇',
                        poster:'CSDN资讯',
                        likes:'45',
                        postTime:'2022-06-02 16:24:11',
                        imageList:['https://img-blog.csdnimg.cn/b5b60459f806442ea502d95b176da5e1.png'],
                        posterId:'3',
                        avatar:"https://img-blog.csdnimg.cn/e21a1aacbbf8432fb9bd33589fb125e3.png"
                    },
                    {
                        id:'1',
                        title:'32【源码】数据可视化：基于 Echarts + Python Flask 动态实时大屏 - 监管系统',
                        content:'一.确定需求方案\n' +
                            '1. 屏幕分辨率\n' +
                            '这个案例的分辨率是16:9，最常用的的宽屏比。\n' +
                            '\n' +
                            '根据电脑分辨率屏幕自适应显示，F11全屏查看；\n' +
                            '\n' +
                            '2. 部署方式',
                        poster:'额 无语',
                        likes:'45',
                        postTime:'2022-05-31 00:35:58',
                        imageList:['https://img-blog.csdnimg.cn/2bff5af5d5944ea2a2630cd7c7b4be71.gif'],
                        posterId:'3',
                        avatar:"https://img-blog.csdnimg.cn/img_convert/6f4a02f856d5119651e41ebf4c889313.png"
                    }]
            }
        }
    }
</script>

<style scoped>

</style>