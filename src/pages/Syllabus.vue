<template>
  <div>
    <p class="d-sm-none text-white bg-dark text-center p-1 mb-0">スマートフォンでは表示が崩れる場合があります．ご了承ください．</p>

    <Search @changeOnSearch="receiveSearchData" />

    <div class="container-fluid">
      <p class="small text-black-50 text-center">講義をクリックまたはタップすると，シラバスを閲覧できます．</p>

      <div class="row bg-success fw-bold text-white align-items-center text-md-center py-2">
        <div class="d-none d-md-block col-md-2">コード<br>科目</div>
        <div class="col-10 col-md-4">講座名</div>
        <div class="col-2 col-md-1">時限<br><div class="d-none d-md-block">単位数</div></div>
        <div class="col col-md-2">講師名</div>
        <div class="col-2 col-md-1">教室</div>
        <div class="col col-md-2">開講形式</div>
      </div>

      <div class="row border-bottom align-items-center position-relative clickable" v-for="lecture in sortedList" :key="lecture.code">
        <div class="d-none d-md-block col-md-2">{{ lecture.code }}<br>{{ lecture.subject }}</div>
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
    </div>
    <Modal :code="this.code"/>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Modal from "@/components/Modal";

export default {
  name: "syllabus",
  data() {
    return {
      code: '',
      lectures: [],
      keyword: '',
      department: '',
      subject: '',
      sort: 'asc'
    }
  },
  components: {
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

  },
  computed: {
    filteredList: function() {
      return this.lectures.filter(function(item) {
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
    }
  },

}
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}
</style>