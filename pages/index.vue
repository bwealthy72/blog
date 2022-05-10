<template>
  <div class="home-wrapper">
    <div class="mobile">
      <ul class="apps">
        <li class="apps__item" v-for="(app, key) in apps" :key="key">
          <NuxtLink class="link" :to="app.to">
            <div class="link__icon">
              <img class="link__img" :src="app.img" :alt="app.name" />
              <p class="link__name">{{ app.name }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  transition: "app",
  computed: {
    apps() {
      return this.$store.state.apps;
    },
  },
};
</script>
