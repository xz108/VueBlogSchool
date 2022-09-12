<template>
      <PageHeader/>
<!--  <div class="fall">-->
<!--    <MarkDown/>-->
    <router-view/>
<!--  </div>-->

</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  name: "Inner",
  components:{
    PageHeader
  }
}
</script>

<style scoped>
.fall{
  background: linear-gradient(141deg,#1BAEAE,#0fb8ad);
}

</style>