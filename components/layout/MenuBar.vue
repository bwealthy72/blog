<template>
  <nav class="site-nav">
    <ul class="nav">
      <li v-for="(name, path) in routes" :key="path" class="nav__item">
        <a :href="path">{{ name }}</a>
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
