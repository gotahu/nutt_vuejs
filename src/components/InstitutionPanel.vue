<template>
  <div class="d-inline-flex w-100 justify-content-between align-items-center py-4 bg-white sticky-top">
    <button class="btn btn-success" @click="subDay" :disabled="isFirstDayOfMonth">前日</button>
    <span class="h4 fw-bold">{{ formattedDate }}</span>
    <button class="btn btn-success" @click="addDay" :disabled="isEndDayOfMonth">翌日</button>
  </div>
  <div class="row">
    <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="inst in institutions" :key="inst.name">
      <span class="border-bottom border-success border-2">{{ inst.name }}</span>
      <p class="text-center w-100">{{ inst.definitions[inst.status[dayOfDate]]}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import axios, {AxiosResponse} from "axios";
import {computed, ref} from "vue";

export type INSTITUTION = typeof import("@/components/institution/institution.json")

export default {
  name: "InstitutionPanel",
  setup() {
    const firstDate = dayjs().startOf('month')
    const endDate = dayjs().endOf('month')

    const date = ref(dayjs())
    const dayOfDate = computed(() => {return date.value.get('day') - 1})

    const formattedDate = computed(() => date.value.format('M月D日(ddd)'))
    const YYYYMM = dayjs().format('YYYYMM')

    const institutions = ref<INSTITUTION[]>()

    axios({
      url: `https://hinyari.net/other/nutt/json/${YYYYMM}-institutions.json`,
      method: "get",
      params: {
        faculty: "00"
      }
    }).then((res: AxiosResponse<INSTITUTION[]>) => {
      institutions.value = res.data
    }).catch(() => {
      console.log(`エラー 施設情報を正常に取得できませんでした (${firstDate}, ${endDate}, ${YYYYMM})`)
    })

    const isFirstDayOfMonth = computed(() => date.value.isSame(firstDate, 'day'))
    const isEndDayOfMonth = computed(() => date.value.isSame(endDate, 'day'))

    // 日付を引く関数
    const subDay = () => {
      date.value = date.value.subtract(1, 'days')
    }

    // 日付を足す関数
    const addDay = () => {
      date.value = date.value.add(1, 'days')
    }


    return { institutions, formattedDate, isFirstDayOfMonth, isEndDayOfMonth, subDay, addDay, dayOfDate }
  }
}
</script>

<style scoped>

</style>