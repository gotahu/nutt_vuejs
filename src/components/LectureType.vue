<template>
  <div class="d-block text-black bg-opacity-25" :class="colorClass" v-if="isAP">
    <span class="text-black">{{ label }}</span>
  </div>
  <div class="d-block" v-else>
    <span v-if="isBadged" class="badge" :class="colorClass">{{ label }}</span>
    <span v-else class="small">{{ type }}</span>
  </div>
</template>

<script>
export default {
  name: "LectureType",
  props: {
    type: String,
    isAP: Boolean
  },
  data() {
    return {
      isBadged: true,
      colorClass: "",
      label: ""
    }
  },
  created() {
    const type = this.type
    if (type === "遠隔授業") {
      this.colorClass += "bg-primary"
      this.label = "遠隔"
    } else if (type === "遠隔授業（一部を対面授業）") {
      this.colorClass += "bg-info"
      this.label = "遠隔+対面"
    } else if (type === "対面授業（一部を遠隔授業）") {
      this.colorClass += "bg-warning"
      this.label = "対面+遠隔"
    } else if (type === "対面授業") {
      this.colorClass += "bg-danger"
      this.label = "対面"
    } else if (type === "NUCTを参照") {
      this.colorClass += "bg-success"
      this.label = "NUCT参照"
    } else if (type === "対面授業（同時に遠隔授業として配信）") {
      this.colorClass += "bg-warning"
      this.label = "対面+遠隔(配信)"
    } else {
      this.isBadged = false
    }
  }

}
</script>

<style scoped>

</style>