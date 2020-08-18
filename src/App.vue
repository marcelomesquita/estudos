<template>
  <main>
    <nav class="navbar navbar-dark bg-primary mb-3">
      <router-link class="navbar-brand" to="/">Programa de Estudos</router-link>
    </nav>

    <div class="container-fluid">
      <h1 class="h3">Programas</h1>

      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>
