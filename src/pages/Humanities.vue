<template>
  <div class="conteiner-fluid px-3">
    <TopHeader />

    <HumanitiesSyllabus />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import HumanitiesSyllabus from "@/pages/HumanitiesSyllabus";

export default {
  name: "Humanities",
  components: {HumanitiesSyllabus, TopHeader}
}
</script>

<style scoped>

</style>