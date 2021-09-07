<template>
  <div>
    <Search v-on:changeOnSearch="receiveSearchData" />
    <div class="container-fluid">
      <table class="table table-bordered">
        <tr class="table-success bg-success text-white">
          <th style="width: 10%">コード</th>
          <th style="width: 50%">講座名</th>
          <th style="width: 5%">時限</th>
          <th style="width: 5%">単位</th>
          <th style="width: 10%">講師名</th>
          <th style="width: 10%">教室</th>
          <th style="width: 10%">シラバス</th>
        </tr>
        <tr class="text-start" v-for="lecture in sortedList" v-bind:key="lecture.code">
          <td>{{ lecture.code }}<br>{{ lecture.subject }}</td>
          <td>{{ lecture.title_jp }}<br>{{ lecture.theme }}</td>
          <td><span v-for="t in lecture.time" :key=t>{{ t }}</span></td>
          <td>{{ lecture.credit }}</td>
          <td>{{ lecture.teacher_jp }}</td>
          <td><small>不明</small></td>
          <td class="text-center"><a data-bs-toggle="modal" data-bs-target="#syllabusModal"
                                     @click="openSyllabusModal(lecture.code)"><font-awesome-icon icon="angle-right" size="lg"/></a></td>
        </tr>
      </table>
    </div>
    <Modal :code="this.code" />
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
      classes: [],
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
      .then(response => (this.classes = response.data))
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
      return this.classes.filter(function(item) {
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

<style scoped>

</style>