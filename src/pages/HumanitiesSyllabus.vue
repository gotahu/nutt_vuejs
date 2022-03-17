<template>
  <div>
    <HumanitiesSearch @changeOnSearch="receiveSearchData" />

    <div class="container-fluid">
      <p class="text-black-50 text-center">講義をクリックまたはタップすると，シラバスを閲覧できます．</p>

      {{ /* タイトル行 */ }}
      <div class="row bg-success text-white align-items-center text-center py-2">
        <div class="d-none d-md-block col-md-1">コード</div>
        <div class="d-none d-md-block col-md-1 p-0">専攻</div>
        <div class="col col-md-3">講座名</div>
        <div class="col-2 col-md-1 p-0">時限</div>
        <div class="d-none d-md-block col-md-1 p-0">単位</div>
        <div class="col-2 col-md-1">学年</div>
        <div class="col col-md">講師名</div>
      </div>

      {{ /* リスト部分 */ }}
      <div class="list-group list-group-flush">
        <template v-for="lecture in filteredList">
          <a class="list-group-item list-group-item-action p-1 p-md-2" :key="lecture.code"
             @click="openSyllabusModal(lecture.code)"
             data-bs-toggle="modal" data-bs-target="#syllabusModal"
             :class="favouriteLecturesCode.includes(lecture.code) ? 'bg-warning bg-opacity-25' : ''"
          >
            <div class="row align-items-center gx-1 gx-lg-3">
              <div class="d-none d-md-block col-md-1">{{ lecture.code }}</div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.major }}</div>
              <div class="col col-md-3">{{ lecture.title_jp }}</div>
              <div class="col-2 col-md-1 p-0"><p class="m-0" v-for="t in lecture.time" :key="t">{{ lecture.semester }} {{t}}</p></div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.credit }} 単位</div>
              <div class="col-2 text-center text-md-start col-md-1">{{ lecture.year }}</div>
              <div class="col col-md">{{ lecture.teacher_jp }}</div>
            </div>
          </a>
        </template>
      </div>
    </div>
      </div>
</template>

<script>
import store from "@/store"
import HumanitiesSearch from "@/components/HumanitiesSearch";

export default {
  name: "HumanitiesSyllabus",
  data() {
    return {
      code: '',
      lectures: [],
      keyword: '',
      major: '',
      subject: '',
      semesters: [],
      sort: 'asc',
      favouriteLecturesCode: store.favouriteLecturesCode
    }
  },
  components: {
    HumanitiesSearch
  },
  created() {
    this.axios
        .get('https://hinyari.net/other/nutt/api/syllabus.php?faculty=01')
        .then(response => (this.lectures = response.data))
  },
  methods: {
    openSyllabusModal: function(code) {
      this.code = code
      this.$emit('changeOnModalCode', this.code)
    },
    receiveSearchData (array) {
      this.keyword = array[0]
      this.major = array[1]
      this.subject = array[2]
      this.semesters = array[3]
    },
    bgWarning: function(code) {
      return store.favouriteLecturesCode.indexOf(code) ? "" : "bg-warning"
    },
  },
  computed: {
    filteredList: function() {
      return this.lectures.filter(item => {
        return (item.title_jp.indexOf(this.keyword) > -1 || item.code.indexOf(this.keyword) > -1
                || item.teacher_jp.indexOf(this.keyword) > -1)
            && (item.major.indexOf(this.major) > -1 || this.major === "全専攻")
            && this.semesters.includes(item.semester)
      }, this)
    },
  },

}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}
</style>