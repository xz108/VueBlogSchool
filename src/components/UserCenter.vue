<template>
    <div class="common-layout">
        <el-container>
            <el-header style="height: fit-content;margin-top: 10px">
                <div style="display: flex;">
                    <div style="width: 250px"></div>
                    <div style="width: 70px">
                        <!--头像-->
                        <el-avatar
                                size="large"
                                :src="avatar"
                                style="margin-right: 10px"
                        />
                    </div>
                    <div style="width: 500px">
                        <h3>{{username}}</h3>
                        <p style="font-size: small">个性签名：你好,我是来自这边的二货</p>
                    </div>
                    <div style="flex: 1"></div>
                    <div style="width: 30%;">
                        <br>
                        <el-button icon="tools" type="primary" @click="this.$router.push('/usercenter')">编辑个人资料</el-button>
                    </div>
                </div>
            </el-header>
            <el-divider style="margin-top: 5px;margin-bottom: 5px"/>
            <el-container>
                <el-aside width="150px;">
                    <el-menu
                            default-active="2"
                            style="min-height: 78vh"
                            router
                    >
                        <el-menu-item index="/myposts">
                            <el-icon><document /></el-icon>
                            <span>我的贴子</span>
                        </el-menu-item>
                        <el-menu-item index="mygoods" >
                            <el-icon><goods /></el-icon>
                            <span>我的交易</span>
                        </el-menu-item>
                        <el-menu-item index="myteams">
                            <el-icon><user /></el-icon>
                            <span>我的组队</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        mounted() {
            this.username = this.$store.getters.getUsername
            this.avatar = this.$store.getters.getAvatar
            // this.username = thi
            console.log(this.username)
        },
        data(){
            return{
                username:'',
                avatar:'',
            }
        }
    }
</script>

<style scoped>

</style>