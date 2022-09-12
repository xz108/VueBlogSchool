<template>
        <el-row justify="center">
            <el-col :span="2"/>
            <el-col :span="12">
                <el-card style="margin-top: 5px">
                    <template #header>
                        <div class="card-header">
                            <span><el-icon><HomeFilled /></el-icon>加入社区</span>
                        </div>
                    </template>
                    <el-form
                            ref="ruleFormRef"
                            :model="siginForm"
                            status-icon
                            :rules="rules"
                            label-width="120px"
                            label-position="left"
                            style="width: 400px"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="siginForm.username" autocomplete="on" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                    v-model="siginForm.password"
                                    type="password"
                                    autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password">
                            <el-input
                                    v-model="siginForm.confirm"
                                    type="password"
                                    autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="signin">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="2"/>
        </el-row>
</template>

<script>
    import axios from "axios";
    import {ElMessage} from "element-plus";

    export default {
        name: "SignIn",
        methods:{
            signin:function () {
                let ul = this.siginForm.username;
                let pl = this.siginForm.password;
                let cl = this.siginForm.confirm;
                if(ul.length>=0&&ul.length<=10&&pl.length>=3&&pl.length<=5&&cl.length>=3&&cl.length<=5){
                    if(pl===cl){ //密码确认
                        //注册接口
                        axios({
                            url:'http://localhost:8080/User/register',
                            method: "post",
                            data: {
                                username:this.siginForm.username,
                                password:this.siginForm.password
                            }
                        }).then(res => {
                            //console.log(typeof(res.data));
                            if(res.data){
                                ElMessage({
                                    message: '注册成功',
                                    type: 'success',
                                })
                                this.$router.back();
                            }else{
                                ElMessage.error('注册失败')
                            }
                        })
                        this.siginForm.username=''
                        this.siginForm.password=''
                        this.siginForm.confirm=''
                    }else {
                        ElMessage.error('两次密码输入不一致')
                    }
                }


            }
        },
        data(){
            return{
                siginForm:{
                    username: '',
                    password: '',
                    confirm: ''
                },
                rules:{
                    username:[
                        {required: true,message:"用户名不能为空",trigger:'blur'},
                        {min:3,max:10,message: "用户名长度3-10",trigger: 'blur'}
                    ],
                    password: [
                        {required: true,message:"密码不能为空",trigger:'blur'},
                        {min:3,max:5,message: "密码长度3-5",trigger: 'blur'}
                    ],
                    confirm: [
                        {required: true,message:"请确认密码",trigger:'blur'},
                        {min:3,max:5,message: "密码长度3-5",trigger: 'blur'}
                    ]
                }
            }

        }
    }
</script>

<style scoped>

</style>