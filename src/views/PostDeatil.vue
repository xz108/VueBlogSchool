<template>
    <el-container direction="vertical" style="margin-left: 20%;margin-right: 20%">
        <!--标题和作者信息卡片-->
        <el-card style="width: 100%;margin-bottom: 12px">
            <template #header >
                <h2>{{Post.title}}</h2>
                <el-divider style="margin: 15px"/>
                <!--卡片底部头像、昵称、发布时间、访问量、评论数、顶赞数-->
                <div style="display: flex;">
                    <!--头像-->
                    <div style="width: fit-content">
                        <el-avatar
                                size=""
                                :src=Post.avatar
                        />
                    </div>
                    <!--昵称-->
                    <div style="width: fit-content">
                        <div style="font-weight: lighter;font-size: small;margin-top: 15px">&nbsp;&nbsp;{{Post.poster}}&nbsp;&nbsp;</div>
                    </div>
                    <!--发布时间-->
                    <div style="width: fit-content">
                        <div style="font-size: small;font-weight: lighter;margin-top: 15px"><el-icon><Calendar /></el-icon>
                            {{Post.postTime}}&nbsp;&nbsp;</div>
                    </div>
                    <!--访问量-->
                    <div style="width: fit-content">
                        <div style="font-size: small;font-weight: lighter;margin-top: 15px"><el-icon><View /></el-icon>150</div>
                    </div>
                </div>
            </template>
            <!--正文-->
            <div id="" class="typo typo-selection">
                <p style = "white-space: pre-wrap"  v-html="Post.content" ></p>
            </div>
            <el-image v-for="(myurl,index) in Post.imageList" @click="onPreview" style="width: 32%;margin-right: 10px" :src=myurl />

        </el-card>
        <!--评论为空时显示-->
        <el-card v-if="chats.length==0" style="width: 100%;margin-top: 3px">
            <el-empty style="height: fit-content" description="别让楼主寂寞太久" />
        </el-card>
        <!--评论区卡片-->
        <el-card v-for="chat in chats" style="width: 100%;margin-top: 3px">
            <div style="display: flex">
                <div style="width: fit-content;margin-right: 15px">
                    <!--头像-->
                    <el-avatar
                            size=""
                            :src=chat.avatar
                    />
                </div>
                <div style="flex: 1">
                    <h5 style="font-weight: lighter">{{chat.nickname}}&nbsp;<el-tag v-if="chat.title.length>0" effect="plain" :type=chat.type size="small">
                        {{chat.title}}</el-tag></h5>
                    <p style="white-space: pre-wrap;font-size: medium;">{{chat.content}}</p>
                    <div style="display: flex">
                        <div style="width: fit-content;font-size: small;font-weight: lighter">
                            {{chat.createTime}}
                        </div>
                        <div style="width: fit-content;margin-left: 10px">
                            <el-button style="font-size: small;font-weight: lighter;padding-top: 0;" link>回复</el-button>
                        </div>
                        <div style="width: fit-content;margin-left: 10px">
                            <el-button icon="CaretTop" style="font-size: small;font-weight: lighter;padding-top: 0;" link>
                                {{chat.followers}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>

        <!--评论点赞固钉-->
        <el-affix position="bottom" :offset="0">
            <!--回复卡片-->
            <el-card body-style="padding:0" style="padding: 5px">
                <div style="display: flex;">
                    <div style="flex: 1"></div>
                    <!--评论按钮-->
                    <div style="width: fit-content;margin-right: 5px">
                        <div style="font-size: large;"><el-button icon="ChatDotSquare" @click="chat" >{{chats.length}}</el-button></div>
                    </div>
                    <!--点赞按钮-->
                    <div style="width: fit-content;margin-right: 3%">
                        <div style="font-size: large;">
                            <el-button icon="CaretTop" @click="like" >7</el-button>
                        </div>
                    </div>
                </div>
            </el-card>

            <!--评论内容输入框-->
            <el-card v-if="showChat" body-style="padding:0" style="padding: 15px">
                <div style="display: flex;">
                    <div style="width: fit-content;margin-right: 5px">
                        <!--头像-->
                        <div style="width: fit-content">
                            <el-avatar
                                    size="large"
                                    :src=avatar
                            />
                        </div>
                    </div>
                    <!--文本域-->
                    <div style="flex: 1">
                        <el-input v-model=content type="textarea"></el-input>
                    </div>
                    <!--回复按钮-->
                    <div style="width: fit-content;margin-left: 5px">
                        <el-button type="primary" @click="rep">回复</el-button>
                    </div>
                </div>
            </el-card>
        </el-affix>

    </el-container>
    <el-image-viewer
            v-if="showViewer"
            @close="closeViewer"
            :url-list=Post.image
    />
    <el-backtop :right="100" :bottom="100" />
</template>

<script>
    import axios from "axios";
    import {ElMessage} from "element-plus"
    import { ElNotification } from 'element-plus'
    import {MarkDownChange} from "@/directive/Markdown"
    export default {
        name: "PostDeatil",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
            this.postId = this.$store.getters.getPostId
            this.type = this.$store.getters.getType
            //根据postId请求帖子数据
            axios({
                url:'http://localhost:8080/Blog/selectOne',
                method: "post",
                data:{
                    id:this.postId,
                    type:this.type
                }
            }).then(res => {
                this.Post=res.data
                console.log(res.data)
              console.log(this.Post.content)
              this.Post.content= MarkDownChange(this.Post.content)
              // console.log("content Change!")
            })
            if(this.type==='blog'){
                //根据postId请求普通评论数据
                axios({
                    url:'http://localhost:8080/comment/listAllComment',
                    method: "post",
                    data:{
                        blog_id:this.postId
                    }
                }).then(res => {
                    this.chats=res.data
                    console.log(res.data)
                })
            }else{
                //根据postId请求置顶评论数据
                axios({
                    url:'http://localhost:8080/comment/listAlltopComment',
                    method: "post",
                    data:{
                        blog_id:this.postId
                    }
                }).then(res => {
                    this.chats=res.data
                    //console.log(res.data)

                })
            }
        },
        data(){
            return{
                username:'',
                avatar:'',
                postId:0,
                type:'',
                showViewer: false, // 显示查看器
                showChat:false,
                content:'',
                Post:{
                    id:'1',
                    title:'hello',
                    content:"程序的编码风格，指的是一个人在编写程序时表现出来的特点、习惯逻辑思路等。\n" +
                        "对于程序员来说，在开发时要重视其编写规范，程序不仅应该能够在机器上正确执行，还应便于调试、维护及阅读。\n" +
                        "下面，播妞举例说明一些编程规范，帮助Python开发者编写出优雅的代码，提高代码可读性，一起来看吧！",
                    poster:'张三',
                    likes:'45',
                    postTime:'2022-01-06 15：00',
                    avatar:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    imageList:['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        "https://pic.leetcode-cn.com/1639645313-nkDVCJ-3.jpeg?x-oss-process=image%2Fformat%2Cwebp"],
                    posterId:'3'
                },
                chats:[{
                    id:'',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    nickname:'hoozge',
                    content:'是的我同意你的说法',
                    create_time:'2022-01-04 15:60',
                    followers:7,
                    title:'开发者',
                    type:'danger'
                },{
                    id:'',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    nickname:'gdfgf',
                    content:'不，不应该是这样',
                    create_time:'2022-04-04 6:30',
                    followers:3,
                    title:'楼主',
                    type:''
                },{
                    id:'',
                    avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                    nickname:'小菜鸡',
                    content:'哦，为什么我没有头衔？',
                    create_time:'2022-04-04 6:30',
                    followers:0,
                    title:'',
                    type:''
                }]
            }
        },
        methods: {
            onPreview() {
                this.showViewer = true
            },
            // 关闭查看器
            closeViewer() {
                this.showViewer = false
            },
            chat(){
                if(this.username=='游客'){
                    ElMessage.error('需要登录才能回复！');
                }else{
                    this.showChat = !this.showChat
                }
            },
            like(){
                ElNotification({
                    title: '实验功能暂不可用',
                    message: '点赞功能开发中',
                    type: 'info',
                })
            },
            rep(){
                let cl = this.content
                if(cl.length>0){
                    if(this.type=='blog'){
                        //发送普通评论请求
                        axios({
                            url:'http://localhost:8080/comment/postComment',
                            method: "post",
                            data:{
                                blog_id:this.postId,
                                content:this.content,
                                nickname:this.username,
                                avatar:this.avatar

                            }
                        }).then(res => {
                            //console.log(res.data)
                            if(res.data){
                                ElMessage({
                                    message:'回复评论成功',
                                    type:'success'
                                })
                                this.content = ''
                                setTimeout(function () {
                                    // 这里就是处理的事件
                                    location.reload();
                                }, 1000);
                            }else{
                                ElMessage({
                                    message:'回复失败',
                                    type:'error'
                                })
                            }
                        })
                    }else{
                        //发送置顶评论请求
                        axios({
                            url:'http://localhost:8080/comment/postTopComment',
                            method: "post",
                            data:{
                                blog_id:this.postId,
                                content:this.content,
                                nickname:this.username,
                                avatar:this.avatar

                            }
                        }).then(res => {
                            //console.log(res.data)
                            if(res.data){
                                ElMessage({
                                    message:'回复评论成功',
                                    type:'success'
                                })
                                this.content = ''
                                setTimeout(function () {
                                    // 这里就是处理的事件
                                    location.reload();
                                }, 1000);
                            }else{
                                ElMessage({
                                    message:'回复失败',
                                    type:'error'
                                })
                            }
                        })
                    }

                }else {
                    ElMessage({
                        message:'评论不能为空',
                        type:'error'
                    })
                }
            }
        }
    }
</script>

<style scoped>
@import "../css/typo.css";

</style>