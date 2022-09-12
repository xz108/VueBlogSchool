<template>
    <Header />
    <router-view/>
    <el-backtop :right="100" :bottom="100" />
</template>

<script>
    import Header from "@/components/Header";
    export default {
        name: "Index",
        components:{
            Header
        }
    }
</script>

<style scoped>

</style>