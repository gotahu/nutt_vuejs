<template>
  <div class="container-fluid p-3 p-md-5">
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-center">キーワード</label>
        <div class="col-sm-10">
          <input type="text" placeholder="時間割コード・講座名・講師名を入力" v-model="keyword"
                 @input="sendSearchData" class="form-control">
        </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">学部・学科</label>
      <div class="col-sm-10">
        <div v-for="(dep, i) in departmentsInfo" class="p-1 d-inline-flex" :key="i">
          <input :id="'dep' + i" type="radio" :value="i" v-model="department" class="btn-check" @change="sendSearchData">
          <label :for="'dep' + i" class="btn btn-sm btn-outline-success">{{ dep }}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <label class="col-sm-2 col-form-label text-center">科目区分</label>
      <div class="col-sm-10">
        <select class="form-select" id="inputGroupSelect" v-model="subject" @change="sendSearchData">
          <option v-for="(sub, i) in subjectsInfo" :key="i" :value="sub">{{ sub }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: '',
      department: 20, // 20 は全学部
      departmentsInfo: [
        "文", "法", "経", "教", "自然情報", "人社", "ｺﾝﾋﾟｭｰﾀ", "理", "医医", "保健", "化生", "物工", "マテ", "電情",
          "機航", "エネ", "土建", "生環", "資生", "応生", "全学部"
      ],
      subject: '全科目',
      subjectsInfo: [
          "全科目", "基礎セミナー", "文系基礎科目", "理系基礎科目", "言語文化", "文系教養科目",
          "理系教養科目", "開放科目", "健康・スポーツ科学（実習）", "全学教養科目"
      ]
    }
  },
  created() { // 子コンポーネントから親コンポーネントへのデータはイベント発火して渡すらしい
    this.$emit('changeOnSearch', [this.keyword, this.department, this.subject])
  },
  methods: {
    sendSearchData() {
      this.$emit('changeOnSearch', [this.keyword, this.department, this.subject])
    }
  }
}
</script>

<style scoped>

</style>