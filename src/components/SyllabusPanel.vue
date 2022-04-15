<template>
  <div>
    <SyllabusSearch />

    <div class="container-fluid">
      <p class="text-black-50 text-center">
        講義をクリックまたはタップすると，シラバスを閲覧できます。
      </p>
      <p class="bg-warning text-black p-1 bg-opacity-50 text-center">
        コードが<span class="fw-bold text-danger"> 赤字 </span>のものは，仮コードです．履修登録はこのコードを用いて行います
      </p>

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

      <div class="list-group list-group-flush">
        <template v-for="lecture in searchedLectures" :key="lecture.code">
          <a class="list-group-item list-group-item-action p-1 p-md-2"
            @click="openSyllabusModal(lecture.code)"
            data-bs-toggle="modal" data-bs-target="#syllabusModal">
            <div class="row align-items-center gx-1 gx-lg-3">
              <div class="d-none d-md-block col-md-1">{{ lecture.code }}</div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.subject }}</div>
              <div class="col-10 col-md-3">
                {{ lecture.title_jp }}
                <span v-if="lecture.title_jp === '英語（基礎）'" class="badge" :class="englishCourse(lecture.code).className">{{ englishCourse(lecture.code).course }}</span>
                <span v-if="lecture.title_jp === '英語（サバイバル）'" class="badge bg-danger">サバイバル</span>
              </div>
              <div class="col-2 col-md-1 p-0"><p class="m-0" v-for="t in lecture.time" :key="t">{{t}}</p></div>
              <div class="d-none d-md-block col-md-1 small p-0">{{ lecture.credit }} 単位</div>
              <div class="col col-md-2">{{ lecture.teacher_jp }}</div>
              <div class="col col-md-2">{{ lecture.room }}</div>
              <div class="col-3 col-md-1 p-0"><LectureType v-if="lecture.type !== null" :type="lecture.type" /></div>
            </div>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import SyllabusSearch from "@/components/syllabus/SyllabusSearch.vue";
import axios, {AxiosResponse} from "axios";
import {useStore} from "vuex";
import * as MutationTypes from "@/store/mutationType"
import LectureType from "@/components/syllabus/LectureType.vue";

export type LECTURE = typeof import("@/components/syllabus/lecture.json")

export default defineComponent({
  name: "SyllabusPanel",
  components: {LectureType, SyllabusSearch},
  setup() {
    const store = useStore();

    const code = ref()
    let lectures : LECTURE[]
    const searchedLectures = ref<LECTURE[]>()

    const keyword = computed(() => store.state.keyword)
    const department = computed(() => store.state.department)
    const subject = computed(() => store.state.subject)
    const semesters = computed(() => store.state.semesters)
    const types = computed(() => store.state.types)

    axios({
      url: "https://hinyari.net/other/nutt/api/syllabus.php",
      method: "get",
      params: {
        faculty: "00"
      }
    }).then((res: AxiosResponse<LECTURE[]>) => {
      lectures = res.data
      searchedLectures.value = lectures
    })

    /*
      モーダルを開ける
     */
    const openSyllabusModal = (c : string) => {
      store.commit(MutationTypes.CHANGE_MODAL_CODE, c)
      code.value = c
    }

    const searchOptions = computed(() => {
      return [keyword.value, department.value, subject.value, semesters.value, types.value]
    })

    watch(searchOptions, () => {
      searchedLectures.value = lectures.filter(item => {
        return (item.title_jp.indexOf(keyword.value) > -1 || item.code.indexOf(code.value) > -1
                || item.teacher_jp.indexOf(keyword.value) > -1 || item.subject.indexOf(keyword.value) > -1)
          && (item.departments[department.value] === "○" || department.value === 20)
          && (subject.value === "全科目" || item.subject === subject.value)
          && semesters.value.includes(item.semester)
      })
    })

    const codeToCourse : {[key : string] : string} = {
      "0012101" : "A",
      "0012102" : "A",
      "0012103" : "A",
      "0012104" : "Pre-A",
      "0012105" : "Pre-A",
      "0012106" : "Pre-A",
      "0012107" : "Pre-A",
      "0012108" : "Pre-A",
      "0012109" : "Pre-A",
      "0012110" : "Pre-A",
    }

    const englishCourse = (code : string) => {
      const course = codeToCourse[code]
      if (course == undefined) {
        return {
          className: "bg-primary",
          course: "B"
        }
      } else {
        return {
          className: "bg-success",
          course: course
        }
      }
    }

    return { code, openSyllabusModal, searchedLectures, englishCourse }

  },
});
</script>

<style scoped>

</style>