<template>
  <div v-if="isAP" class="d-block text-black bg-opacity-25" :class="colorClass">
    <span class="text-black">{{ label }}</span>
  </div>
  <div v-else class="d-block">
    <span v-if="isBadged" class="badge" :class="colorClass">{{ label }}</span>
    <span v-else class="small">{{ type }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "LectureType",
  props: {
    type: String,
    isAP : Boolean
  },
  setup(props) {
    const isBadged = ref(true)
    const label = ref("a")
    const colorClass = ref("")
  
    if (props.type === "遠隔授業") {
      label.value = "遠隔"
      colorClass.value = "bg-primary"
    } else if (props.type === "原則遠隔、一部の授業回を対面") {
      label.value = "遠隔+対面"
      colorClass.value = "bg-info text-dark bg-opacity-75"
    } else if (props.type === "原則対面、一部の授業回を遠隔") {
      label.value = "対面+遠隔"
      colorClass.value = "bg-warning text-dark"
    } else if (props.type === "対面授業") {
      label.value = "対面"
      colorClass.value = "bg-danger"
    } else if (props.type === "NUCT参照") {
      label.value = "NUCT参照"
      colorClass.value = "bg-success"
    } else if (props.type === "対面授業、同時に一部の学生向けに遠隔授業（ハイフレックス型）") {
      label.value = "対面+配信"
      colorClass.value = "bg-warning text-dark bg-opacity-50"
    } else {
      isBadged.value = false
    }

    return { isBadged, label, colorClass }
  }
});
</script>