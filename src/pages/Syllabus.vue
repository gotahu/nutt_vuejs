<template>
  <div>
    <Search @changeOnSearch="receiveSearchData" />

    <div class="container-fluid">
      <p class="text-black-50 text-center">講義をクリックまたはタップすると，シラバスを閲覧できます．</p>



      {{ /* タイトル行 */ }}
      <div class="row bg-success text-white align-items-center text-md-center py-2">
        <div class="d-none d-md-block col-md-1">コード</div>
        <div class="d-none d-md-block col-md-1 p-0">科目名</div>
        <div class="col-10 col-md-3">講座名</div>
        <div class="col-2 col-md-1 p-0">時限</div>
        <div class="d-none d-md-block col-md-1 p-0">単位</div>
        <div class="col col-md-2">講師名</div>
        <div class="col col-md-2">講義室</div>
        <div class="col-2 col-md-1 p-0 p-md-2">授業形態</div>
      </div>


      {{ /* リスト部分 */ }}
      <div class="list-group list-group-flush">
        <template v-for="lecture in filteredList">
          <a class="list-group-item list-group-item-action p-1 p-md-2" :key="lecture.code"
             @click="openSyllabusModal(lecture.code)"
             data-bs-toggle="modal" data-bs-target="#syllabusModal"
             :class="favouriteLecturesCode.includes(lecture.code) ? 'bg-warning bg-opacity-25' : ''">
            <div class="row align-items-center gx-1 gx-lg-3">
              <div class="d-none d-md-block col-md-1">{{ lecture.code }}</div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.subject }}</div>
              <div class="col-10 col-md-3">{{ lecture.title_jp }}</div>
              <div class="col-2 col-md-1 p-0"><p class="m-0" v-for="t in lecture.time" :key="t">{{t}}</p></div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.credit }} 単位</div>
              <div class="col col-md-2">{{ lecture.teacher_jp }}</div>
              <div class="col col-md-2">{{ lecture.room }}</div>
              <div class="col-3 col-md-1 p-0"><LectureType :type="lecture.type" /></div>
            </div>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import LectureType from "@/components/LectureType";

import store from "@/store"

export default {
  name: "Syllabus",
  data() {
    return {
      code: '',
      lectures: [],
      keyword: '',
      department: '',
      subject: '',
      sort: 'asc',
      semesters: [],
      types: [],
      favouriteLecturesCode: store.favouriteLecturesCode
    }
  },
  components: {
    LectureType,
    Search,
  },
  created() {
    this.axios
        .get('https://hinyari.net/other/nutt/api/syllabus.php?faculty=00')
        .then(response => (this.lectures = response.data))
  },
  methods: {
    openSyllabusModal: function(code) {
      this.code = code
      this.$emit('changeOnModalCode', this.code)
    },
    receiveSearchData (array) {
      this.keyword = array[0]
      this.department = array[1]
      this.subject = array[2]
      this.semesters = array[3]
    },
    bgWarning: function(code) {
      return store.favouriteLecturesCode.indexOf(code) ? "" : "bg-warning"
    }
  },
  computed: {
    filteredList: function() {
      return this.lectures.filter(item => {
        return (item.title_jp.indexOf(this.keyword) > -1 || item.code.indexOf(this.keyword) > -1
                || item.teacher_jp.indexOf(this.keyword) > -1 || item.subject.indexOf(this.keyword) > -1)
            && (item.departments[this.department] === "○" || this.department === 20)
            && (this.subject === "全科目" || item.subject === this.subject)
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

.scroller {
  height: 100%;
}
</style>