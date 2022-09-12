<template>
    <el-table :data="tableData" height="250" style="width: 100%;font-weight: bold" stripe="true">
        <el-table-column prop="team_id" label="团队ID" />
        <el-table-column prop="leader" label="队长" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="teamMsg" label="描述" />
        <el-table-column prop="maxNum" label="最大人数" />
        <el-table-column prop="team_membersList[0].memberName" label="成员1" />
        <el-table-column prop="team_membersList[1].memberName" label="成员2" />
        <el-table-column prop="team_membersList[2].memberName" label="成员3" />
        <el-table-column prop="team_membersList[3].memberName" label="成员4" />
    </el-table>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyTeam",
        mounted() {
            this.username = this.$store.getters.getUsername
            //用户团队获取请求
            axios({
                url:'http://localhost:8080/Team/GetTeamByName',
                method: "post",
                data:{
                    username:this.username
                }
            }).then(res => {
                this.tableData=res.data
                console.log(res.data)
            })
        },
        data(){
            return {
                tableData:[
                    {
                        team_id:1,
                        leader:'111',
                        title:'互联网+',
                        teamMsg:'诚招美工、PPT文案，表达能力强者优先',
                        state:true,
                        maxNum:4,
                        team_members:[{
                            member_id:1,
                            memberName:'你好',
                            memberAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        },{
                            member_id:1,
                            memberName:'嘉然今天吃什么',
                            memberAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }]
                    },{
                        team_id:1,
                        leader:'111',
                        title:'互联网+',
                        teamMsg:'诚招美工、PPT文案，表达能力强者优先',
                        state:true,
                        maxNum:4,
                        team_members:[{
                            member_id:1,
                            memberName:'你好',
                            memberAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        },{
                            member_id:1,
                            memberName:'嘉然今天吃什么',
                            memberAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        }]
                    }

                ]
            }
        }
    }
</script>

<style scoped>

</style>