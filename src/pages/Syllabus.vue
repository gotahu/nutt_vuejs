<template>
  <div>
    <p class="d-sm-none text-white bg-dark text-center p-1 mb-0">スマートフォンでは表示が崩れる場合があります．ご了承ください．</p>

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
        <template v-for="lecture in sortedList">
          <a class="list-group-item list-group-item-action p-1 p-md-2" :key="lecture.code"
             @click="openSyllabusModal(lecture.code)"
             data-bs-toggle="modal" data-bs-target="#syllabusModal"
             :class="favouriteLecturesCode.includes(lecture.code) ? 'bg-warning bg-opacity-25' : ''"
          >
            <div class="row align-items-center gx-1 gx-lg-3">
              <div class="d-none d-md-block col-md-1">{{ lecture.code }}</div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ abbrName(lecture.subject) }}</div>
              <div class="col-10 col-md-3">{{ abbrName(lecture.title_jp) }}</div>
              <div class="col-2 col-md-1 p-0"><p class="m-0" v-for="t in lecture.time" :key="t">{{t}}</p></div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.credit }} 単位</div>
              <div class="col col-md-2">{{ lecture.teacher_jp }}</div>
              <div class="col col-md-2">未定</div>
              <div class="col-3 col-md-1 p-0"><LectureType :type="lecture.type" /></div>
            </div>
          </a>
        </template>
      </div>
    </div>

    <Modal :code="this.code"/>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Modal from "@/components/Modal";
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
      favouriteLecturesCode: store.favouriteLecturesCode
    }
  },
  components: {
    LectureType,
    Search,
    Modal
  },
  created () {
    this.axios
        .get('https://hinyari.net/other/nutt/json/2021-autumn-syllabus.json')
        .then(response => (this.lectures = response.data))
  },
  methods: {
    comparatorAsc: function(itemA, itemB) {
      if (itemA.code < itemB.code) {
        return -1
      } else if (itemA.code > itemB.code) {
        return 1
      } else {
        return 0
      }
    },
    comparatorDesc: function(itemA, itemB) {
      if (itemA.code < itemB.code) {
        return 1
      } else if (itemA.code > itemB.code) {
        return -1
      } else {
        return 0
      }
    },
    openSyllabusModal: function(code) {
      this.code = code
    },
    receiveSearchData (array) {
      this.keyword = array[0]
      this.department = array[1]
      this.subject = array[2]
    },
    abbrName: function(name) {
      return name.replace("健康・スポーツ科学", "健スポ").replace("（実習）", "実習")
        .replace("科目", "").replace("基礎セミナー", "基セミ")
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
      }, this)
    },
    sortedList: function() {
      const copy = this.filteredList.slice();

      if (this.sort === 'asc') {
        return copy.sort(this.comparatorAsc)
      } else if (this.sort === 'desc') {
        return copy.sort(this.comparatorDesc)
      } else {
        return copy
      }
    },
  },

}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}
</style>