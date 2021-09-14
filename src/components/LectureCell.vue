<template>
  <div>
    <template v-if="favouriteLectures[dayAndPeriod] !== undefined">
      <div v-for="lecture in favouriteLectures[dayAndPeriod]" :key="lecture.code"
        class="d-flex flex-column border"
      >
        <div class="tiny">{{ lecture.code }}</div>
        <div class="small py-2">{{ abbrName(lecture.title) }}</div>
        <LectureType :type="lecture.type" />
        <div class="tiny mt-auto pt-1">{{ lecture.teacher }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import store from "@/store"
import LectureType from "@/components/LectureType";

export default {
  name: "LectureCell",
  components: {LectureType},
  props: {
    dayOfWeek: String,
    period: Number,
  },
  data() {
    return {
      favouriteLectures: store.favouriteLectures,
      dayAndPeriod: this.dayOfWeek + this.period
    }
  },
  methods: {
    abbrName: function(name) {
      return name.replace("健康・スポーツ科学", "健スポ").replace("（実習）", "実習")
          .replace("科目", "").replace("基礎セミナー", "基セミ")
    }
  }

}
</script>

<style scoped>
.tiny {
  font-size: 0.75em;
}

</style>