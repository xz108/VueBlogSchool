<template>
    <el-table :data="tableData" height="250" style="width: 100%;font-weight: bold" stripe="true">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="state" label="状态"  />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述信息" />
        <el-table-column prop="datetime" label="发布时间" />
    </el-table>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MyGoods",
        mounted() {
            this.username = this.$store.getters.getUsername
            //用户货物获取请求
            axios({
                url:'http://1.15.226.69:8080/Good/GetGoodByname',
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
                tableData:[
                    {
                        id:1,
                        state:true,
                        image:['https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'],
                        name:'Yummy hamburger',
                        description:"汉堡！汉堡！汉堡！ \n"+
                            "可小刀 \n"+
                            "有意者+v:5201314",
                        seller:'嘉然今天吃什么',
                        avator:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                        datetime:'2022-6-2'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>