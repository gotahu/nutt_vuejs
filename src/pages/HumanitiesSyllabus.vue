<template>
  <div>
    <p class="d-sm-none text-white bg-dark text-center p-1 mb-0">スマートフォンでは表示が崩れる場合があります．ご了承ください．</p>

    <HumanitiesSearch @changeOnSearch="receiveSearchData" />

    <div class="container-fluid">
      <p class="text-black-50 text-center">講義をクリックまたはタップすると，シラバスを閲覧<span class="fw-bold">できません</span>．もうちょっとまってください</p>

      {{ /* タイトル行 */ }}
      <div class="row bg-success text-white align-items-center text-center py-2">
        <div class="d-none d-md-block col-md-1">コード</div>
        <div class="d-none d-md-block col-md-1 p-0">専攻</div>
        <div class="col col-md-3">講座名</div>
        <div class="col col-md-1 p-0">時限</div>
        <div class="d-none d-md-block col-md-1 p-0">単位</div>
        <div class="col-1 col-md-1">学年</div>
        <div class="col col-md-2">講師名</div>
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
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.major }}</div>
              <div class="col col-md-3">{{ abbrName(lecture.title_jp) }}</div>
              <div class="col col-md-1 p-0">{{ abbrName(lecture.time) }}</div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.credit }} 単位</div>
              <div class="col-1 text-center text-md-start col-md-1">{{ lecture.year }}</div>
              <div class="col col-md-2">{{ abbrName(lecture.teacher_jp) }}</div>
            </div>
          </a>
        </template>
      </div>
    </div>

    <Modal :code="this.code"/>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

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
      sort: 'asc',
      favouriteLecturesCode: store.favouriteLecturesCode
    }
  },
  components: {
    HumanitiesSearch,
    Modal
  },
  created() {
    this.axios
        .get('https://hinyari.net/other/nutt/api/syllabus.php?type=humanities')
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
      this.major = array[1]
      this.subject = array[2]
    },
    abbrName: function(name) {
      return name.replace("健康・スポーツ科学", "健スポ").replace("（実習）", "実習")
        .replace("科目", "").replace("基礎セミナー", "基セミ").replace("曜日 ", "").replace("時限", "限").replace("集中 その他 その他", "")
        .replace("○", "")

    },
    bgWarning: function(code) {
      return store.favouriteLecturesCode.indexOf(code) ? "" : "bg-warning"
    }
  },
  computed: {
    filteredList: function() {
      return this.lectures.filter(item => {
        return (item.title_jp.indexOf(this.keyword) > -1 || item.code.indexOf(this.keyword) > -1
                || item.teacher_jp.indexOf(this.keyword) > -1)
            && (item.major === this.major || this.major === "全専攻")
            && (this.subject === "全科目" || item.subject === this.subject)
            && (item.time.indexOf("春") > -1)
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