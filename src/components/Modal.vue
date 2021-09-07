<template>
  <!-- モーダルの設定 -->
  <div class="modal" id="syllabusModal" tabindex="-1" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">シラバス</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
        </div>
        <div class="modal-body">
          <p class="text-info">一般向けに公開されている情報のみを表示しています．<br>学生向けの詳細なシラバスはアクセス制限をかける必要があります．
          <br>ログインしたユーザにのみ表示する予定ですが，ログイン機能は未実装です．すみません</p>
          <table class="table table-bordered text-start">
            <tbody>
              <tr v-for="(r, index) in syllabus[0]" :key="index">
                <th>{{ index_to_jp[index] }}</th>
                <td>{{ r }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>

export default {
  name: "Modal",
  props: ['code'],
  data() {
    return {
      syllabus: [],
      index_to_jp: {
        code: "時間割コード",
        subject: "科目区分",
        title_jp: "科目名",
        theme: "テーマ（基礎セミナー）",
        teacher_jp: "担当教員",
        credit: "単位数",
        time: "単位数",
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
      },
    }
  },
  watch: {
    code: function () {
      const code = this.code;
      this.axios
          .get('https://hinyari.net/other/nutt/api/syllabus.php?code=' + code)
          .then(response => (this.syllabus = response.data))
    }
  }
}
</script>

<style scoped>

</style>