<template>
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
</template>

<script>
import LectureCell from '@/components/LectureCell'

export default {
  name: "Timetable",
  components: {
    LectureCell
  }
}
</script>

<style scoped>

</style>