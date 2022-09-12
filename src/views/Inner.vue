<template>
<!--    <PageHeader/>-->
  <div class="fall">
    <MarkDown/>
    <router-view/>
  </div>

</template>

<script>
    import PageHeader from "@/components/PageHeader";
    import MarKdown from "@/components/MarkDown"
    import MarkDown from "@/components/MarkDown";
    export default {
        name: "Inner",
        components:{
          MarkDown
          ,
            // PageHeader
        }
    }
</script>

<style scoped>
.fall{
  background: linear-gradient(141deg,#1BAEAE,#0fb8ad);
}

</style>