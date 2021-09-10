<template>
  <span v-if="isBadged" :class="badgeClass">{{ label }}</span>
  <span v-else class="small">{{ type }}</span>
</template>

<script>
export default {
  name: "LectureType",
  props: {
    type: String
  },
  data() {
    return {
      isBadged: true,
      badgeClass: "badge ",
      label: ""
    }
  },
  created() {
    const type = this.type
    if (type === "遠隔授業") {
      this.badgeClass += "bg-primary"
      this.label = "遠隔"
    } else if (type === "遠隔授業（一部を対面授業）") {
      this.badgeClass += "bg-info text-dark"
      this.label = "遠隔+対面"
    } else if (type === "対面授業（一部を遠隔授業）") {
      this.badgeClass += "bg-warning text-dark"
      this.label = "対面+遠隔"
    } else if (type === "対面授業") {
      this.badgeClass += "bg-danger"
      this.label = "対面"
    } else if (type === "NUCTを参照") {
      this.badgeClass += "bg-success"
      this.label = "NUCT参照"
    } else if (type === "対面授業（同時に遠隔授業として配信）") {
      this.badgeClass += "bg-warning text-dark"
      this.label = "対面+遠隔(配信)"
    } else {
      this.isBadged = false
    }
  }

}
</script>

<style scoped>

</style>