<template>
  <div class="modal" id="syllabusModal" tabindex="-1" aria-labelledby="syllabusModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header py-2">
          <h5 class="modal-title">シラバス</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
        </div>
        <div class="modal-body">
          <div class="d-block">
            <a class="btn btn-success float-end" :href="syllabus_url" role="button"
              target="_blank" rel="noopener noreferrer">
              詳細なシラバスをみる
            </a>
            <label>予め<a href="https://app4.srv.nagoya-u.ac.jp/camweb/top.do?CAS=1">サイト</a>にログインしておく必要があります。</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="favouriteCheck" class="form-check-input" v-model="isRegistered"
            >
            <label class="form-check-label" for="favouriteCheck">お気に入りに登録</label>
          </div>
          <div class="px-2 px-md-3">
            <div class="row border-bottom py-1 py-md-2" v-for="(syllabus, index) in syllabus[0]" :key="index">
              <div class="col-2">{{ index_to_jp[index] }}</div>
              <div class="col-10">{{ syllabus }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import axios from "axios";
import {useStore} from "vuex";

export default defineComponent({
  name: "SyllabusModal",
  setup() {
    const index_to_jp = {
      code: "時間割コード",
      subject: "科目区分",
      major: '専攻',
      title_jp: "科目名",
      theme: "テーマ（基礎セミナー）",
      teacher_jp: "担当教員",
      credit: "単位数",
      time: "開講時間",
      type: "開講形態",
      type_online: "オンラインの場合",
      communication_ondemand: "ｵﾝﾃﾞﾏﾝﾄﾞ型の対話手段",
      purpose_jp: "目的",
      goal_jp: "達成目標",
      content: "内容",
      condition: "履修条件",
      criterion: "評価基準",
      textbook: "教科書",
      reference_book: "参考書",
      extracurricular_study: "課外学習",
      caution: "注意事項",
      how_to_answer: "質問対応方法",
      email: "メール",
      homepage: "サイト",
      message: "メッセージ",
      room: "教室",
      message_type: "開講形態について",
      time_shorten: "開講時間(略)",
      teachers_license_year: "教職（対象学年）",
      teachers_license_subject: "教職（科目）",
      year: "対象学年"
    }

    const isRegistered = ref(false)

    const store = useStore()

    const code = computed(() => store.getters.modalCode)

    const syllabus = ref([])
    const syllabus_url = ref()

    watch(code, () => {
      axios({
        method: "get",
        url: "https://hinyari.net/other/nutt/api/syllabus.php",
        params: {
          code: code.value
        }
      }).then(response => {
        syllabus.value = response.data
        syllabus_url.value = "https://app4.srv.nagoya-u.ac.jp/camweb/slbssbdr.do?value(risyunen)=2022&value(semekikn)=1&value(kougicd)="
            + code.value + "&value(crclumcd)=ZZ"
      })
    })

    return { index_to_jp, syllabus, syllabus_url, code, isRegistered }
  }
});
</script>

<style scoped>

</style>