<template>
  <div>
    <header>
      <Navbar/>
    </header>
    <main>
      <div>
        <router-view/>
      </div>
    </main>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    createTitleDesc: function(routeInstance) {
      if (routeInstance.meta.title) {
        const setTitle = routeInstance.meta.title + ' | NUTT'
        document.title = setTitle
      } else {
        document.title = 'NUTT'
      }
    }
  },
  mounted: function() {
    const routeInstance = this.$route
    this.createTitleDesc(routeInstance)
  },
  watch: {
    '$route' (routeInstance) {
      this.createTitleDesc(routeInstance)
    }
  }

}
</script>

<style lang="scss">
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
