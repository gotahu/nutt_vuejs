<template>
  <div class="container-fluid p-3 p-md-5 pb-md-1 pt-md-4">
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label text-center">キーワード</label>
      <div class="col-sm-10">
        <input type="text" placeholder="時間割コード・講座名・講師名を入力" v-model="keyword"
               @input="updateOnSearch" class="form-control">
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">学部・学科</label>
      <div class="col-sm-10">
        <div v-for="(dep, i) in departmentsInfo" class="p-1 d-inline-flex" :key="i">
          <input :id="'dep' + i" type="radio" :value="i" v-model="department" class="btn-check" @change="updateOnSearch">
          <label :for="'dep' + i" class="btn btn-sm btn-outline-success">{{ dep }}</label>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">学期</label>
      <div class="col-sm-10 align-self-center">
        <div v-for="(sem, i) in semestersInfo" class="form-check form-check-inline" :key="i">
          <input type="checkbox" class="form-check-input" :id="'sem' + i" :value="sem" v-model="semesters" @change="updateOnSearch">
          <label :for="'sem' + i" class="form-check-label">{{ sem }}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <label class="col-sm-2 col-form-label text-center">科目区分</label>
      <div class="col-sm-10">
        <select class="form-select" id="inputGroupSelect" v-model="subject" @change="updateOnSearch">
          <option v-for="(sub, i) in subjectsInfo" :key="i" :value="sub[0]">{{ sub[1] }}</option>
        </select>
        <p>★印は，2021年度以前入学者用の，旧シラバスに対応しています．</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStore} from "vuex";
import * as MutationTypes from "@/store/mutationType";

export default defineComponent({
  name: "SyllabusSearch",
  setup() {
    const store = useStore()

    const keyword = ref("")
    const department = ref(20)
    const departmentsInfo = [
      "文", "法", "経", "教", "自然情報", "人社", "ｺﾝﾋﾟｭｰﾀ", "理", "医医", "保健", "化生", "物工", "マテ", "電情",
      "機航", "エネ", "土建", "生環", "資生", "応生", "全学部"
    ]
    const subject = ref("全科目")
    const subjectsInfo = [
      ["全科目", "全科目"],
      ["基礎セミナー", "基礎セミナー"],
      ["言語文化科目", "言語文化"],
      ["「大学での学び」基礎論", "「大学での学び」基礎論"],
      ["現代教養科目", "現代教養科目"],
      ["国際理解科目", "国際理解科目"],
      ["自然系基礎科目", "自然系基礎科目"],
      ["人文・社会系基礎科目", "人文・社会系基礎科目"],
      ["健康・スポーツ科学科目", "健スポ・実習"],
      ["言語文化", "★言語文化"],
      ["文系基礎科目", "★文系基礎科目"],
      ["理系基礎科目", "★理系基礎科目"],
      ["文系教養科目", "★文系教養科目"],
      ["理系教養科目", "★理系教養科目"],
      ["健康・スポーツ科学（講義）", "★健スポ・講義"],
      ["全学教養科目", "★全学教養科目"]
    ]
    const semesters = ref(["I", "III"])
    const semestersInfo = [
      "I", "II", "III", "IV", "春", "秋", "その他"
    ]
    const types = ref([])
    const typesInfo = [
      "対面", "対面+遠隔", "遠隔+対面", "遠隔", "NUCT参照", "その他"
    ]

    const updateOnSearch = () => {
      store.commit(MutationTypes.CHANGE_SEARCH, [
          keyword.value,
          department.value,
          subject.value,
          semesters.value,
          types.value
      ])
    }

    return {keyword, department, departmentsInfo, subject, subjectsInfo, semesters, semestersInfo, types, typesInfo,
            updateOnSearch}
  }
});
</script>

<style scoped>

</style>