<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-success" role="navigation" aria-label="main navigation">
      <div class="container-fluid">
        <router-link to="/" class="text-decoration-none order-1 me-auto">
          <span class="nutt-title h4 text-white p-2">NUTT</span>
        </router-link>
        <ul class="nav nav-pills order-3 order-md-2 justify-content-center mt-1 mt-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">
              トップページ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/institution" class="nav-link text-white">
              施設情報
            </router-link>
          </li>
<!--          <li class="nav-item">-->
<!--            <router-link to="/humanities" class="nav-link text-white">-->
<!--              文学部-->
<!--            </router-link>-->
<!--          </li>-->
          <li class="nav-item">
            <router-link to="/contact" class="nav-link text-white">
              問い合わせ
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap');
  .nutt-title {
    font-family: 'Lexend', sans-serif;
  }
</style>