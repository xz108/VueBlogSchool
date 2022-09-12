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
                                placeholder="组队搜索"
                                prefix-icon="Search"
                                @change="Tsearch"
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
                <el-input v-model="newTeam.title"  placeholder="" style="margin-bottom: 5px;width: 60%;">
                    <template #prepend style="color: aqua">赛事名</template>
                </el-input>
                <el-input
                        v-model="newTeam.teamMsg"
                        :autosize="{ minRows: 4, maxRows: 6 }"
                        type="textarea"
                        placeholder="描述"
                        style="margin-bottom: 5px;"
                />
                <div style="display: flex">
                    队员人数：
                    <el-input-number v-model="num" :min="1" :max="4" @change="numChange" />
                    <div style="flex: 1"></div>
                    <el-button type="primary" @click="send">发送</el-button>
                </div>

            </el-card>
        </el-main>
    </el-container>
    <div style="display: flex;flex-wrap: wrap;margin-left: 20%;margin-right: 20%">
        <!--团队模块-->
        <div v-for="(team,index1) in teams" style="width: 33%">
            <!--卡片式-->
            <el-card :body-style="{ padding: '0px' }" style="margin: 20px">
                <!--下半部分内容-->
                <div style="padding: 14px">
                    <!--标题-->
                    <h4 style="font-weight: bold">{{team.title}}</h4>
                    <el-divider style="margin: 3px" />
                    <!--正文-->
                    <p style="font-size: 12px;font-weight: bold;white-space: pre-wrap">
                        {{team.teamMsg}}
                    </p>
                    <!--卖家头像、昵称、发布时间-->
                    <div style="display: flex;margin-top: 5px">
                        <!--头像-->
                        <div style="width: fit-content;margin-right: 5px">
                            <el-avatar
                                    size="large"
                                    :src=team.leader_avatar
                            />
                        </div>
                        <!--昵称-->
                        <div style="width: fit-content;font-size: small;font-weight: lighter"><el-tag effect="plain" size="small">
                            队长</el-tag>&nbsp; {{team.leader}}</div>
                        <div style="flex: 1"></div>
                        <!--时间-->
                        <time style="width: fit-content;font-size: small;font-weight: lighter"></time>
                    </div>
                    <el-divider style="margin: 0" />
                    <!--回复、开关-->
                    <div style="display: flex">
                        <div v-for="member in team.team_membersList" style="width: fit-content;margin-right: 5px">
                            <el-avatar
                                    size=""
                                    :src=member.avatar
                            />
                            <p style="font-size: small;text-align: center">{{member.memberName}}</p>
                        </div>
                        <!--队员加入按钮-->
                        <div v-for="member in (team.maxNum - team.team_membersList.length)" style="width: fit-content;margin-right: 5px">
                            <el-button icon="plus" style="width: 40px;height: 40px" size="large" type="" circle @click="join(index1)">
                            </el-button>
                        </div>
                        <div style="flex: 1"></div>
                        <!--卖家开关-->
<!--                        <el-switch-->
<!--                                v-model="team.state"-->
<!--                                active-color="#13ce66"-->
<!--                                inactive-color="#cccccc"-->
<!--                                inline-prompt-->
<!--                                active-text="在售"-->
<!--                                inactive-text="已售"-->
<!--                                width="50px"-->
<!--                        />-->
                    </div>
                </div>
            </el-card>
        </div>
        <p v-if="searchf==false">没有找到符合条件的团队</p>
    </div>
</template>

<script>
    import { ElMessage } from 'element-plus'
    import axios from "axios";
    export default {
        name: "TeamMatch",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
            //团队数据获取请求
            axios({
                url:'http://localhost:8080/Team/getApplication',
                method: "post",
                data:{
                    team_id:'1'
                }
            }).then(res => {
                this.teams=res.data
                console.log(res.data)
                for(var i in this.teams){
                    if(this.teams[i].team_membersList.length==1){
                        if(this.teams[i].team_membersList[0].memberName==''){
                            this.teams[i].team_membersList=[]
                        }
                    }
                }
            })
        },
        data(){
            return {
                username:'',
                avatar:'',
                key:'',
                searchf:true,
                newTeam:{
                    title:'',
                    teamMsg: ''
                },
                addStatus:false,
                num:0,
                teams:[{
                    team_id:1,
                    leader:'111',
                    leader_avatar:'',
                    title:'互联网+',
                    teamMsg:'诚招美工、PPT文案，表达能力强者优先',
                    state:true,
                    maxNum:4,
                    team_membersList:[{
                        member_id:1,
                        memberName:'你好',
                        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                    },{
                        member_id:1,
                        memberName:'嘉然今天吃什么',
                        memberAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                    }]
                }]
            }
        },
        methods:{
            add:function () {
                if(this.username=="游客"){
                    ElMessage.error('需要登录才能发布')
                }else{
                    this.addStatus = !this.addStatus
                }
            },
            join:function(index){
                //console.log(index)
                if(this.username=='游客'){
                    ElMessage.error('需要登录才能加入队伍！');
                }else{
                    if(this.teams[index].leader==this.username){
                        ElMessage({
                            message:'不可加入自己创建的队伍！',
                            type:'error'
                        })
                    }else{
                        var f = true;
                        for(var i in this.teams[index].team_membersList){
                            if(this.username==this.teams[index].team_membersList[i].memberName){
                                f = false
                            }
                        }
                        if(f){
                            //加入团队请求
                            axios({
                                url:'http://localhost:8080/Team/postApplication',
                                method: "post",
                                data:{
                                    team_id: this.teams[index].team_id,
                                    memberName: this.username,
                                    avatar:this.avatar,
                                    role:''
                                }
                            }).then(res => {
                                if(res.data){
                                    ElMessage({
                                        message:'加入成功',
                                        type:'success'
                                    })
                                    let un = this.username;
                                    let ua = this.avatar;
                                    console.log(ua)
                                    this.teams[index].team_membersList.push({member_id: 1,memberName: un,avatar: ua})
                                }else{
                                    ElMessage({
                                        message:'加入失败',
                                        type:'error'
                                    })
                                }
                            })
                        }else{
                            ElMessage.error('不能重复加入已加入的队伍！')
                        }
                    }
                }

            },
            Tsearch:function (){
                //console.log('this')
                let kl = this.key
                if(kl.length>0){
                    //团队搜索接口
                    axios({
                        url:'http://localhost:8080/Team/SearchTeam',
                        method: "post",
                        data:{
                            key:this.key
                        }
                    }).then(res => {
                        this.teams = res.data
                        console.log(res.data);
                        if(res.data.length==0){
                            this.searchf=false;
                        }
                        for(var i in this.teams){
                            if(this.teams[i].team_membersList.length==1){
                                if(this.teams[i].team_membersList[0].memberName==''){
                                    this.teams[i].team_membersList=[]
                                }
                            }
                        }
                    })
                }
            },
            send:function () {
                let tl = this.newTeam.title;
                let ml = this.newTeam.teamMsg;
                if(tl.length>0){
                    if(ml.length>0){
                        //团队信息发送请求
                        axios({
                            url:'http://localhost:8080/Team/postTetam',
                            method: "post",
                            data:{
                                title:this.newTeam.title,
                                teamMsg:this.newTeam.teamMsg,
                                maxNum: this.num,
                                leader:this.username,
                                avatar:this.avatar
                            }
                        }).then(res => {
                            if(res.data){
                                this.addStatus=false
                                ElMessage({
                                    message:'发送成功',
                                    type:'success'
                                })
                                this.newTeam.title=''
                                this.newTeam.teamMsg=''
                                this.num=1
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
                        ElMessage.error('赛事信息不能为空！')
                    }
                }else{
                    ElMessage.error('赛事名不能为空！')
                }


            },
            numChange:function () {
                if(this.num===1){
                    ElMessage({
                        message: '组队最少需要寻找1位队员',
                        type: 'warning',
                    })
                }
                if(this.num===4){
                    ElMessage({
                        message: '组队成员最多支持4位',
                        type: 'warning',
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>