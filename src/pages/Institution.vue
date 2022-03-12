<template>
  <div class="container">
    <h2>各施設の営業時間</h2>
    <div class="d-inline-flex w-100 justify-content-between align-items-center py-4 bg-white sticky-top">
      <button class="btn btn-success" @click="subDay" :disabled="isFirstDayOfMonth">前日</button>
      <span class="h4 fw-bold">{{ date | moment }}</span>
      <button class="btn btn-success" @click="addDay" :disabled="isEndDayOfMonth">翌日</button>
    </div>

    <div id="table-institution">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2">
        <div class="col" v-for="institution in institutions" :key="institutions.indexOf(institution)">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ institution.name }}</h5>
              {{ institution.definitions[institution.status[date.get('date') - 1]] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ja')

export default {
  name: "institution",
  data() {
    return {
      institutions: [],
      date: new moment(),
      firstDate: new moment().startOf('month'),
      endDate: new moment().endOf('month')
    }
  },
  created() {
    this.axios
      .get("https://hinyari.net/other/nutt/json/" + this.date.format("YYYYMM") + "-institutions.json")
      .then(response => (this.institutions = response.data))
  },
  computed: {
    isFirstDayOfMonth: function() {
      return this.date.isSame(this.firstDate, 'day')
    },
    isEndDayOfMonth: function() {
      return this.date.isSame(this.endDate, 'day')
    },
  },
  methods: {
    subDay: function() {
      const tmp = new moment(this.date);
      tmp.subtract(1, 'days')
      this.date = tmp
    },
    addDay: function() {
      const tmp = new moment(this.date);
      tmp.add(1, 'days')
      this.date = tmp
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("M月D日 (ddd)")
    }
  }
}
</script>

<style scoped>

</style>