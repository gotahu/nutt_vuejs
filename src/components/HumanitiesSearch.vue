<template>
  <div class="container-fluid p-3 p-md-5 pb-md-3 pt-md-4">
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-center">キーワード</label>
        <div class="col-sm-10">
          <input type="text" placeholder="時間割コード・講座名・講師名を入力" v-model="keyword"
                 @input="sendSearchData" class="form-control">
        </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">専攻</label>
      <div class="col-sm-10">
        <div v-for="(maj, i) in majorsInfo" class="p-1 d-inline-flex" :key="i">
          <input :id="'maj' + i" type="radio" :value="maj" v-model="major" class="btn-check" @change="sendSearchData">
          <label :for="'maj' + i" class="btn btn-sm btn-outline-success">{{ maj }}</label>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">学期</label>
      <div class="col-sm-10 align-self-center">
        <div v-for="(sem, i) in semestersInfo" class="form-check form-check-inline" :key="i">
          <input type="checkbox" class="form-check-input" :id="'sem' + i" :value="sem" v-model="semesters" @change="sendSearchData">
          <label :for="'sem' + i" class="form-check-label">{{ sem }}</label>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label align-self-center text-center">教職</label>
      <div class="col-sm-10">
        <select class="form-select" id="teachersLicenseSubjectsSelect" v-model="teachersLicenseSubject" @change="sendSearchData">
          <option v-for="(subject, i) in teachersLicenseSubjectsInfo" :key="i" :value="subject">{{ subject }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HumanitiesSearch",
  data() {
    return {
      keyword: '',
      major: "全専攻", // 20 は全学部
      majorsInfo: [
        "全専攻", "言語学", "日本語学", "日本文学", "英語学", "英米文学", "中国語中国文学",
          "ドイツ語ドイツ文学", "フランス語フランス文学", "哲学", "西洋古典学", "中国哲学",
          "インド哲学", "日本史学", "東洋史学", "西洋史学", "美学美術史学", "考古学",
          "文化人類学", "社会学", "心理学", "地理学", "基礎選択科目", "共通選択科目"
      ],
      subject: '全科目',
      subjectsInfo: [
          "全科目", "基礎基盤科目", "基礎選択科目", "学部共通実践科目", "共通選択科目"
      ],
      semesters: ["春", "春1期", "春2期", "春集中"],
      semestersInfo: [
        "春", "春1期", "春2期", "秋", "秋1期", "秋2期", "春集中", "秋集中", "集中", "通年", "通年集中"
      ],
      teachersLicenseSubject: "",
      teachersLicenseSubjectsInfo: [
          "",
          "中高一種・英語",
          "中一種・国語",
          "高一種・国語",
          "中高一種・独語",
          "中高一種・仏語",
          "中一種・社会",
          "高一種・公民",
          "高一種・地歴",
      ]
    }
  },
  created() { // 子コンポーネントから親コンポーネントへのデータはイベント発火して渡すらしい
    this.$emit('changeOnSearch', [this.keyword, this.major, this.subject, this.semesters, this.teachersLicenseSubject])
  },
  methods: {
    sendSearchData() {
      this.$emit('changeOnSearch', [this.keyword, this.major, this.subject, this.semesters, this.teachersLicenseSubject])
    }
  }
}
</script>

<style scoped>

</style>