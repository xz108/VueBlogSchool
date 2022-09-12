<template>
    <el-affix>
        <el-container style="margin: 5px">
            <el-card style=" width: 100%">
                <el-page-header title="返回" icon="ArrowLeft" @back="goback" content="" />
            </el-card>
        </el-container>
    </el-affix>
</template>

<script>
    export default {
        name: "PageHeader",
        methods:{
            goback:function () {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>