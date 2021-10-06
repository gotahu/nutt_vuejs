<template>
  <div class="container-fluid px-3">
    <div class="text-center text-white">
      <p class="bg-dark p-1 mt-3">10/5 講義室情報を更新しました</p>
      <p class="bg-dark p-1 bg-opacity-75">授業形態で NUCT 参照となっているものや，その他情報に誤りがある場合は，右上の【問い合わせ】から教えていただけると助かります．</p>
    </div>

    <div class="row gy-3">
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header">アクセスポイント</div>
          <div class="card-body text-center ">
            <Accesspoint />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg">
        <div class="card">
          <div class="card-header">シラバス検索</div>
          <div class="card-body p-0">
            <Syllabus />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ja')

import Accesspoint from "@/components/Accesspoint";
import Syllabus from "@/pages/Syllabus";

export default {
  name: 'Top',
  components: {
    Syllabus,

    Accesspoint,
  },
  methods: {
  },
  created() {
    this.axios
        .get('https://hinyari.net/other/nutt/api/accesspoint.php')
        .then(response => (this.accesspoints = response.data))

    this.apDayOfWeek = new moment().format("ddd")
  }
}

</script>

<style lang="scss" scoped>

</style>