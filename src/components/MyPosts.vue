<template>
    <el-table :data="tableData" height="250" style="width: 100%;font-weight: bold" stripe="true">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="标题"  />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="poster" label="发布者" />
        <el-table-column prop="likes" label="点赞数" />
        <el-table-column prop="postTime" label="发布时间" />
    </el-table>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyPosts",
        mounted() {
            this.username = this.$store.getters.getUsername
            //用户帖子获取请求
            axios({
                url:'http://localhost:8080/Blog/GetUserblog',
                method: "post",
                data:{
                    username:this.username
                }
            }).then(res => {
                this.tableData=res.data
                //console.log(res.data)
            })
        },
        data(){
            return{
                username:'',
                tableData:[
                    {
                        id:'1',
                        title:'hello',
                        content:'是否豆腐干地方',
                        poster:'张三',
                        likes:'45',
                        postTime:'2022-01-06 15：00',
                        image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                        posterId:'3'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>