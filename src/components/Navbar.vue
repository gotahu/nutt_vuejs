<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-success" role="navigation" aria-label="main navigation">
      <div class="container-fluid">
        <router-link to="/" class="text-decoration-none">
          <span class="nutt-title h4 text-white p-2">NUTT</span>
        </router-link>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">
              トップページ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/syllabus" class="nav-link text-white">
              講座検索
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/institution" class="nav-link text-white">
              施設情報
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