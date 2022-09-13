<template>
    <!--固钉-->
    <el-affix>
        <!--flex布局-->
        <div style="padding-top: 10px;height: 67px; border-bottom: 1px solid #cccccc; display: flex;background-color: #ffffff;opacity: 90%">
            <div style="width: 70px">
                <el-avatar
                        size="large"
                        :src="logo"
                        style="margin-right: 5px;margin-left: 10px"
                />
            </div>
            <!--导航菜单-->
            <div style="width: 320px" >
                <el-menu
                        default-active="1"
                        mode="horizontal"
                        style="height: 50px"
                         router
                >
                    <el-menu-item index="/">校园树洞</el-menu-item>
                    <el-menu-item index="/jumpmarkest">跳蚤市场</el-menu-item>
                    <el-menu-item index="/teammatch">组队广场</el-menu-item>
                </el-menu>
            </div>
            <div style="flex: 1"></div>
            <!--后半部-->
            <div style="width: 400px">
                <el-container style="margin-right: 10px;display: flex">
                    <!--搜索框-->
                    <el-input
                            size="large"
                            placeholder="全站搜索"
                            prefix-icon="Search"
                            style="margin-right: 10px;flex: 1"
                            disabled
                    />
                    <el-button style="width: 50px;height: 50px" size="large" type="primary" circle plain v-if="!loginStatus" @click="dialogFormVisible = true">
                        <h4>登录</h4>
                    </el-button>
                    <!--头像、用户名下拉框-->
                    <el-dropdown type="primary" v-if="loginStatus">
                        <span>
                            <el-container>
                                <!--头像-->
                                <el-avatar
                                        size="large"
                                        :src=avatarUrl
                                        style="margin-right: 10px;"
                                        fit="contain"
                                />
                                <!--用户名-->
                                <h4 style="margin-top: 30px">{{username}}</h4>
                                <!--下拉框icon-->
                                <el-icon style="margin-top: 30px"><ArrowDown /></el-icon>
                            </el-container>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="this.$router.push('/usercenter')">个人中心</el-dropdown-item>
                                <el-dropdown-item @click="logout">注销</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </el-container>
            </div>
        </div>
    </el-affix>

    <!--登录对话框-->
    <el-dialog v-model="dialogFormVisible" title="登陆" width="35%">
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                label-position="left"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="on" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                        v-model="ruleForm.password"
                        type="password"
                        autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                没有账号？点此<el-link type="primary" icon="link"> <router-link to="/signin">注册</router-link></el-link>
            </el-form-item>
        </el-form>
        <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="login">登录</el-button
                            >
                          </span>
        </template>
    </el-dialog>

</template>

<script>
    import logo from "../assets/2.jpg"
    import axios from "axios";
    import { ElMessage } from 'element-plus'

    export default {
        name: "Header",
        mounted() {
            // this.$store.commit('setUsername',this.username)
            console.log(this.$store.getters.getUsername)
            this.username = this.$store.getters.getUsername;
            this.avatarUrl = this.$store.getters.getAvatar;
            this.loginStatus = this.$store.getters.getLoginStatus;
        },
        methods:{
          login:function () {
              let ul = this.ruleForm.username
              let pl = this.ruleForm.password
              if(ul.length>=3&&ul.length<=10&&pl.length>=3&&pl.length<=5){
                  /*登录接口*/
                  axios({
                      url:'http://1.15.226.69:8080/mylogin',
                      method: "post",
                      data: {
                          username:this.ruleForm.username,
                          password:this.ruleForm.password
                      }
                  }).then(res => {


                      console.log(res.data);
                      //console.log(res.data.state);
                      //判断状态
                      if(res.data){
                          console.log(res.data);
                          this.loginStatus = true;
                          this.dialogFormVisible = false;
                          //设置使用的用户名和头像
                          this.username = this.ruleForm.username;
                          this.avatarUrl = res.data.avater;
                          //保存用户名和头像链接
                          this.$store.commit('setUsername',this.username);
                          this.$store.commit('setAvatar',res.data.avater);
                          this.$store.commit('setLoginStatus',this.loginStatus);
                          //发送提示
                          ElMessage({
                              message: '登录成功',
                              type: 'success',
                          })

                          //清空输入框
                          this.ruleForm.username=''
                          this.ruleForm.password=''
                          setTimeout(function () {
                              // 这里就是处理的事件
                              location.reload();
                          }, 1000);
                      }else{
                          ElMessage.error('登录失败')
                          this.ruleForm.password=''
                      }
                  })
              }

          },
            logout:function () {
                this.loginStatus=false;
                this.$store.commit('setUsername','游客');
                this.$store.commit('setAvatar','');
                this.$store.commit('setLoginStatus',this.loginStatus);
                setTimeout(function () {
                    // 这里就是处理的事件
                    location.reload();
                }, 1000);
            }
        },
        data(){
            return{
                loginStatus:false,
                username:"hoozge",
                avatarUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                dialogFormVisible:false,
                formLabelWidth:'140px',
                logo:logo,
                ruleForm:{
                    username: '',
                    password: '',
                },
                rules:{
                    username:[
                        {required: true,message:"用户名不能为空",trigger:'blur'},
                        {min:3,max:10,message: "用户名长度为3-10",trigger: 'blur'}
                    ],
                    password: [
                        {required: true,message:"密码不能为空",trigger:'blur'},
                        {min:3,max:5,message: "密码长度为3-5",trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>