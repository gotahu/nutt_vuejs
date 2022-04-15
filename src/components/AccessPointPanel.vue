<template>
  <div>
    <nav class="nav nav-pills nav-fill mb-2">
      <button class="nav-link link-success" v-for="dayOfWeek in ['月', '火', '水', '木', '金']"
          :class="getClassOfActive(dayOfWeek)" :key="dayOfWeek" @click="setAPDayOfWeek(dayOfWeek)">
        {{dayOfWeek}}
      </button>
    </nav>
    <div id="accesspoint-table">
      <div class="row gx-0">
        <div class="col border border-secondary">空室</div>
        <div class="col bg-black bg-opacity-75 text-white">施錠</div>
      </div>
      <div class="row gx-0 ">
        <div class="col bg-black bg-opacity-25">対面</div>
        <div class="col bg-black bg-opacity-25">対面+遠隔</div>
        <div class="col bg-info bg-opacity-50">遠隔+対面</div>
        <div class="col bg-primary bg-opacity-50">遠隔</div>
        <div class="col bg-success bg-opacity-50">NUCT参照</div>
      </div>
      <div class="d-flex align-items-start py-3">
        <div class="nav flex-column nav-pills flex-shrink-0 me-1 me-sm-2"
             id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button type="button" v-for="building in buildings" :key="building.enname"
                  class="nav-link"
                  :id="'v-pills-' + building.enname + '-tab'" data-bs-toggle="pill"
                  :data-bs-target="'#v-pills-' + building.enname" role="tab"
                  :aria-controls="'v-pills-' + building.enname"
                  :aria-selected="isSelected(building.enname)" @click="setSelectedName(building.enname)"
                  :class="isSelected(building.enname) ? 'active' : ''">
            {{ building.shorten }}
          </button>
        </div>
        <div class="tab-content flex-grow-1" id="v-pills-tabContent">
          <div v-for="building in buildings" :key="building.enname"
               class="tab-pane fade" role="tabpanel"
               :id="'v-pills-' + building.enname"
               :aria-labelledby="'v-pills-' + building.enname + '-tab'"
               :class="isSelected(building.enname)? 'show active': ''">
            <div id="table-accesspoint">
              <div class="row gx-0">
                <div class="col-2">＼</div>
                <div class="col">1</div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
              </div>
              <div v-for="room in building.rooms" class="row gx-0" :key="room">
                <div class="col-2 border-bottom border-end">{{ room }}</div>
                <div class="col border-bottom border-end" v-for="period in [1,2,3,4,5]" :key="period">
                  <template v-if="accesspoints[room] !== undefined">
                    <template v-if="accesspoints[room][apDayOfWeek + period] !== undefined">
                      <div :class="getStatusOfType(accesspoints[room][apDayOfWeek + period].type)[0]" class="text-black text-opacity-50">
                        {{ getStatusOfType(accesspoints[room][apDayOfWeek + period].type)[1] }}
                      </div>
                    </template>
                    <template v-else>
                      <div v-if="accesspoints[room]['lastperiods'][apDayOfWeek] > period" class="text-black-50 bg-primary bg-opacity-25 ">空</div>
                      <div v-else class="bg-black bg-opacity-75"><span class="small text-white text-opacity-50">×</span></div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-start">
        週ごとの正確な情報は，<a href="https://office.ilas.nagoya-u.ac.jp/access-point/">教養教育院サイト</a>にあります。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import dayjs from 'dayjs'

export default defineComponent({
  name: "AccessPointPanel",
  setup() {
    const selected = ref("honkan1f")
    const buildings = ref()
    const accesspoints = ref()
    const apDayOfWeek = ref("月")

    axios({
      url: "https://hinyari.net/other/nutt/api/accesspoint.php",
      method: "get"
    }).then(res => {
      accesspoints.value = res.data
    }).catch(() => {
      console.log("アクセスポイント情報取得時にエラーが発生しました。")
    })

    axios({
      url: "https://hinyari.net/other/nutt/json/buildings.json",
      method: "get"
    }).then(res => {
      buildings.value = res.data
    }).catch(() => {
      console.log("建造物情報取得時にエラーが発生しました。")
    })

    // 表示するアクセスポイントの曜日を本日の曜日に設定する
    apDayOfWeek.value = dayjs().format("ddd")

    // 土日の場合は月曜日にする
    if (apDayOfWeek.value === "土" || apDayOfWeek.value === "日") {
      apDayOfWeek.value = "月"
    }

    const isSelected = (name: string) => {
      return selected.value === name
    }

    const setSelectedName = (name: string) => {
      selected.value = name
    }

    const getStatusOfType = (type: string) => {
      let colorClass = ""
      let status = ""

      if (type === "遠隔授業") {
        colorClass += "bg-primary bg-opacity-25"
        status = "○"
      } else if (type === "原則遠隔、一部の授業回を対面") {
        colorClass += "bg-info bg-opacity-25"
        status = "△"
      } else if (type === "原則対面、一部の授業回を遠隔") {
        colorClass += "bg-black bg-opacity-25"
        status = "×"
      } else if (type === "対面授業") {
        colorClass += "bg-black bg-opacity-25"
        status = "×"
      } else if (type === "NUCT参照") {
        colorClass += "bg-success bg-opacity-25"
        status = "?"
      } else if (type === "対面授業、同時に一部の学生向けに遠隔授業（ハイフレックス型）") {
        colorClass += "bg-black bg-opacity-25"
        status = "×"
      }
      return [colorClass, status]
    }

    const getClassOfActive = (dayofweek : string) => {
      if (dayofweek === apDayOfWeek.value) {
        return "active bg-success"
      } else {
        return ""
      }
    }

    const setAPDayOfWeek = (dayofweek : string) => {
      apDayOfWeek.value = dayofweek
    }

    return {isSelected, setSelectedName, getStatusOfType, getClassOfActive, setAPDayOfWeek, apDayOfWeek,
            selected, buildings, accesspoints}

  }
});
</script>

<style scoped>

</style>