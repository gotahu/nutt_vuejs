<template>
  <div class="container-fluid container-md p-3">
    <div class="row">
      <div class="col-12 mb-3">
        <p class="h5 mb-3">時間割</p>
        <p class="text-end">履修単位：{{ totalCredit }} 単位</p>
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
      <div class="col-12">
        <p class="h5 mb-3">予定</p>
<!--        <iframe class="w-100" height="600" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&src=amRzZnEwdHV1bDR2dGI1ZWd2djJkNHJmYmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23AD1457&showTitle=0&showTz=0"></iframe>-->
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import LectureCell from "@/components/LectureCell";

export default {
  name: 'Top',
  data() {
    return {
      totalCredit: store.totalCredit
    }
  },
  components: {
    LectureCell,
  }

}



</script>

<style lang="scss" scoped>

</style>