<template>
  <nav class="site-nav">
    <ul class="nav">
      <li v-for="(name, path) in routes" :key="path" class="nav__item">
        <NuxtLink :to="path">{{ name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$store.state.routePaths;
    },
  },
};
</script>
