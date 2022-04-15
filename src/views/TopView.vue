<template>
  <div class="top container-fluid">
    <div class="row gy-3">
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header">アクセスポイント</div>
          <div class="card-body text-center">
            <AccessPointPanel />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg">
        <div class="card">
          <div class="card-header">シラバス検索</div>
          <div class="card-body p-0">
            <p class="d-sm-none text-white bg-dark text-center p-1 mb-0">
              スマートフォンでは表示が崩れる場合があります．ご了承ください．
            </p>
            <SyllabusPanel />
          </div>
        </div>
      </div>
    </div>
    <SyllabusModal />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SyllabusPanel from "@/components/SyllabusPanel.vue";
import SyllabusModal from "@/components/SyllabusModal.vue";
import AccessPointPanel from "@/components/AccessPointPanel.vue";

export default defineComponent({
  name: 'TopView',
  components: {
    AccessPointPanel,
    SyllabusModal,
    SyllabusPanel
  },
});
</script>
