<template>
  <!-- モーダルの設定 -->
  <div class="modal" id="syllabusModal" tabindex="-1" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header py-2">
          <h5 class="modal-title" id="exampleModalLabel">シラバス</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input type="checkbox" id="favouriteCheck" class="form-check-input" v-model="isRegistered" @change="onFavouriteChange">
            <label class="form-check-label" for="favouriteCheck">お気に入りに登録</label>
          </div>
          <div class="row border-bottom py-1 py-md-2" v-for="(syllabus, index) in syllabus[0]" :key="index">
            <div class="col-2 text-center">{{ index_to_jp[index] }}</div>
            <div class="col-10"> {{ syllabus }}</div>
          </div>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>

import store from '@/store'

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
        time_shorten: "開講時間(略)"
      },
      isRegistered: false
    }
  },
  watch: {
    code: function () {
      const code = this.code;
      // axios でシラバスデータを取得
      this.axios
          .get('https://hinyari.net/other/nutt/api/syllabus.php?code=' + code)
          .then(response => (this.syllabus = response.data))

      // お気に入り登録されているかを取得
      this.isRegistered = store.favouriteLecturesCode.includes(code)
    }
  },
  methods: {
    onFavouriteChange: function() {
      // シラバスデータを変数に格納
      const syllabus = this.syllabus[0]
      // 時間割に表示する最低限の情報を連想配列にしてぶちこむ
      // 部屋の情報は未発表 //TODO
      const lecture = {'code': this.code, 'subject': syllabus.subject, 'title': syllabus.title_jp,
        'teacher': syllabus.teacher_jp.replace('○', ''), 'type': syllabus.type, 'room': syllabus.room
      }
      // もし Fav されたら，状態管理リストにぶちこむ
      if (this.isRegistered) {
        // 月1など曜日+時限に振り分け，TOP で使いやすくする．
        // 2限連続などはコンマ区切りになっているのでそれで回す
        syllabus.time_shorten.split(',').forEach(period => {
          if (store.favouriteLectures[period] === undefined) {
            store.favouriteLectures[period] = []
            store.favouriteLectures[period].push(lecture)
          } else {
            store.favouriteLectures[period].push(lecture)
          }
        })
        // 簡易リストにもぶちこむ
        store.favouriteLecturesCode.push(this.code)

        store.totalCredit += parseInt(syllabus.credit)
      } else {
        // 削除する
        syllabus.time_shorten.split(',').forEach(period => {
          store.favouriteLectures[period].splice(
              store.favouriteLectures[period].indexOf(lecture), 1
          )
        })

        // 簡易リストから消す
        store.favouriteLecturesCode.splice(
            store.favouriteLecturesCode.indexOf(this.code), 1
        )

        store.totalCredit -= parseInt(syllabus.credit)

      }
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="checkbox"].favourite-check {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  background: transparent;
  border-style: none;
  border-color: transparent;
  color: #b4b4b4;

  cursor: pointer;
  width: 1.25em;
  height: 1.25em;
}

input[type="checkbox"].favourite-check:before {
  content: "★";
  font-size: 1.25em;
}

input[type="checkbox"].favourite-check:checked {
  color: #006e4f;
}
</style>