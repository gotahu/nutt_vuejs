<template>
  <AppHeader />
  <main class="my-3">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
</template>

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
<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
export default {
  components: {AppFooter, AppHeader}
}
</script>