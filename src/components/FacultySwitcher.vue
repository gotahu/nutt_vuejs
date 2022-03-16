<template>
  <div class="px-5 pt-3 pb-2">
    <nav class="nav nav-pills nav-fill">
      <button v-for="(fac, index) in faculties" class="nav-link link-success"
              :key="'faculty-' + index"
              :class="faculty === fac[0] ? 'active bg-success' : ''"
              @click="setFaculty(fac[0])">{{ fac[1] }}</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "FacultySwitcher",
  data() {
    return {
      faculty: 'zengaku',
      faculties: [
          ["zengaku", "全学"],
          ["humanities", "文学部"]
      ]
    }
  },
  methods: {
    setFaculty(faculty) {
      this.faculty = faculty
      this.$emit('changeOnFaculty', this.faculty)
    }
  }
}
</script>

<style scoped>

</style>