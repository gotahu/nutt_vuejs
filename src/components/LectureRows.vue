<template>
  <div>
    <template v-for="lecture in lectures">
      <div class="row border-button align-items-center position-relative clickable" :key="lecture.code">
        <div class="d-none d-md-block col-md-2">
          {{ lecture.code }}<br>{{ lecture.subject }}
        </div>
        <div class="col-10 col-md-4">{{ lecture.title_jp }}<br>{{ lecture.theme }}</div>
        <div class="col-2 col-md-1">
          <span v-for="t in lecture.time" :key="t">{{ t }}</span><br><small class="d-none d-md-block">{{ lecture.credit }} 単位</small>
        </div>
        <div class="col col-md-2">{{ lecture.teacher_jp }}</div>
        <div class="col-2 col-md-1">未定</div>
        <div class="col col-md-2">{{ lecture.type }}</div>
        <a data-bs-toggle="modal" data-bs-target="#syllabusModal" class="stretched-link" @click="openSyllabusModal(lecture.code)">
        </a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "LectureRow",
  props: {
    lectures: Array
  },
  methods: {
    openSyllabusModal(code) {
      this.$emit('clickOnRow', code)
    }
  }
}
</script>

<style lang="scss" scoped>
  .clickable {
    cursor: pointer;
}
</style>