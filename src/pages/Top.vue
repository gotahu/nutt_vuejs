<template>
  <div class="container-fluid container-md p-3">
    <div class="row gy-3">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header">時間割</div>
          <div class="card-body">
            <div id="timeschedule" class="text-center">
              <div class="row border-bottom" v-for="period in ['＼',1,2,3,4,5]" :key="period" >
                <div class="col-1">{{ period }}</div>
                <div class="col border-end p-0" v-for="dayOfWeek in ['月','火','水','木','金']"
                     :key="dayOfWeek">
                  <template v-if="period === '＼'">{{ dayOfWeek }}</template>
                  <template v-else>
                    <LectureCell :day-of-week="dayOfWeek" :period="period" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-header">アクセスポイント</div>
          <div class="card-body text-center ">
            <nav class="nav nav-pills nav-fill">
              <button class="nav-link" :class="apDayOfWeek === dayOfWeek ? 'active' : ''"
                      v-for="dayOfWeek in ['月','火','水','木','金']" :key="dayOfWeek"
                      @click="updateAPDayOfWeek(dayOfWeek)"
              >{{ dayOfWeek }}</button>
            </nav>
            <div class="row gx-0">
              <div class="col-2"></div>
              <div class="col">1</div>
              <div class="col">2</div>
              <div class="col">3</div>
              <div class="col">4</div>
              <div class="col">5</div>
            </div>
            <div class="row gx-0" v-for="room in rooms" :key="room">
              <div class="col-2 border-bottom">{{ room }}</div>
              <div class="col border-bottom border-end" v-for="period in [1,2,3,4,5]" :key="period">
                <template v-if="accesspoints[room] !== undefined">
                  <template v-if="accesspoints[room][apDayOfWeek + period] !== undefined">
                    <LectureType :type="accesspoints[room][apDayOfWeek + period]['type']" :isAP="true" />
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import moment from 'moment'
moment.locale('ja')

import LectureCell from '@/components/LectureCell'
import LectureType from "@/components/LectureType";

export default {
  name: 'Top',
  data() {
    return {
      accesspoints: [],
      apDayOfWeek: "",
      totalCredit: store.totalCredit,
      rooms:["A12","A13","A14","A15","A21", "A26", "A27", "A28", "A31", "A32", "A33", "A34",
              "C10", "C11", "C12", "C13", "C14", "C15", "S10", "S1X", "S12", "S13", "S14", "S15", "S16",
              "S17", "S18", "S19", "C20", "C21", "C22", "C23", "C25", "S20", "S21", "S2X", "S2Y",
              "CALL1", "CALL2", "CALL3", "CALL4", "C30", "C31", "C32", "C33", "C34", "C35", "C36", "S30",
              "C40", "C41", "C42", "C43"]
    }
  },
  components: {
    LectureType,
    LectureCell,
  },
  methods: {
    updateAPDayOfWeek: function(dayOfWeek) {
      this.apDayOfWeek = dayOfWeek
    }
  },
  created() {
    this.axios
        .get('https://hinyari.net/other/nutt/api/accesspoint.php')
        .then(response => (this.accesspoints = response.data))

    this.apDayOfWeek = new moment().format("ddd")
  }
}

</script>

<style lang="scss" scoped>

</style>