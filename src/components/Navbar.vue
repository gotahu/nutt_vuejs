<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-success" role="navigation" aria-label="main navigation">
      <div class="container-fluid">
        <router-link to="/">
          <a class="navbar-brand text-white nutt-title h3 m-0">NUTT</a>
        </router-link>
      </div>
    </nav>
    <div class="bg-success shadow mb-3">
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
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap');
  .nutt-title {
    font-family: 'Lexend', sans-serif;
  }
</style>