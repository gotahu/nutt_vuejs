<template>
  <div class="container-fluid px-3">
    <TopHeader />

    <div class="row gy-3">
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header">アクセスポイント</div>
          <div class="card-body text-center ">
            <Accesspoint />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg">
        <div class="card">
          <div class="card-header">シラバス検索</div>
          <div class="card-body p-0">
            <Syllabus />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ja')

import Accesspoint from "@/components/Accesspoint";
import Syllabus from "@/pages/Syllabus";
import TopHeader from "@/components/TopHeader";

export default {
  name: 'Top',
  components: {
    TopHeader,
    Syllabus,
    Accesspoint,
  },
  methods: {
  },
  created() {
    this.apDayOfWeek = new moment().format("ddd")
  }
}

</script>

<style lang="scss" scoped>

</style>