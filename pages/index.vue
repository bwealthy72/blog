<template>
  <div class="home-wrapper">
    <div class="mobile">
      <ul class="apps">
        <li class="apps__item" v-for="(name, path) in appPaths" :key="path">
          <NuxtLink class="link" :to="path">
            <img class="link__img" :src="loadImage(name)" :alt="name" />
            <p class="link__name">{{ name }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadImage(name) {
      return require(`~/assets/images/dock/${name}.png`);
    },
  },
  computed: {
    appPaths() {
      const a = JSON.parse(JSON.stringify(this.$store.state.appPaths));
      delete a["/"];

      return a;
    },
  },
};
</script>
