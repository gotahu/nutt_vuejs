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
      <label class="col-sm-2 col-form-label align-self-center text-center">専攻</label>
      <div class="col-sm-10">
        <div v-for="(maj, i) in majorsInfo" class="p-1 d-inline-flex" :key="i">
          <input :id="'maj' + i" type="radio" :value="maj" v-model="major" class="btn-check" @change="sendSearchData">
          <label :for="'maj' + i" class="btn btn-sm btn-outline-success">{{ maj }}</label>
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
  name: "HumanitiesSearch",
  data() {
    return {
      keyword: '',
      major: "全専攻", // 20 は全学部
      majorsInfo: [
        "全専攻", "言語学", "日本語学", "日本文学", "英語学", "英米文学", "中国語中国文学",
          "ドイツ語ドイツ文学", "フランス語フランス文学", "哲学", "西洋古典学", "中国哲学",
          "インド哲学", "日本史学", "東洋史学", "西洋史学", "美学美術史学", "考古学",
          "文化人類学", "社会学", "心理学", "地理学"
      ],
      subject: '全科目',
      subjectsInfo: [
          "全科目", "基礎基盤科目", "基礎選択科目", "学部共通実践科目", "共通選択科目"
      ]
    }
  },
  created() { // 子コンポーネントから親コンポーネントへのデータはイベント発火して渡すらしい
    this.$emit('changeOnSearch', [this.keyword, this.major, this.subject])
  },
  methods: {
    sendSearchData() {
      this.$emit('changeOnSearch', [this.keyword, this.major, this.subject])
    }
  }
}
</script>

<style scoped>

</style>