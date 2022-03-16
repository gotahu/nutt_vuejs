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
            <p class="d-sm-none text-white bg-dark text-center p-1 mb-0">スマートフォンでは表示が崩れる場合があります．ご了承ください．</p>
            <FacultySwitcher @changeOnFaculty="receiveFacultyData" />
            <Syllabus v-if="faculty === 'zengaku'"/>
            <HumanitiesSyllabus v-else-if="faculty === 'humanities'"/>
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
import FacultySwitcher from "@/components/FacultySwitcher";
import HumanitiesSyllabus from "@/pages/HumanitiesSyllabus";

export default {
  name: 'Top',
  components: {
    HumanitiesSyllabus,
    FacultySwitcher,
    TopHeader,
    Syllabus,
    Accesspoint,
  },
  data() {
    return {
      faculty: 'zengaku',
    }
  },
  methods: {
    receiveFacultyData (faculty) {
      this.faculty = faculty
    }
  },
  created() {
    this.apDayOfWeek = new moment().format("ddd")
  }
}

</script>

<style lang="scss" scoped>

</style>