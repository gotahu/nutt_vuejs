<template>
  <div>
    <header>
      <Navbar/>
    </header>
    <main>
      <transition mode="out-in">
        <router-view class="mb-5" />
      </transition>
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
        document.title = routeInstance.meta.title + ' | NUTT'
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

.v-enter-active, .v-leave-active {
  transition: opacity .25s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

</style>
