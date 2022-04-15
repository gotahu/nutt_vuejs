<template>
  <div class="container">
    <h2>各施設の営業時間</h2>
    <institution-panel />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import InstitutionPanel from "@/components/InstitutionPanel.vue";

export default defineComponent({
  name: "InstitutionView",
  components: {InstitutionPanel}
});
</script>

<style scoped>

</style>