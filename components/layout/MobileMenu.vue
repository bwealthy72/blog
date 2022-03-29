<template>
  <nav class="site-mobile-menu" :class="{ active: isActive }">
    <button class="hamburger-btn" @click="click">
      <div class="hamburger-btn__box">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </button>
    <ul class="nav">
      <li
        v-for="(name, path) of $store.state.routePaths"
        :key="path"
        class="nav__item"
      >
        <a class="nav__link" :href="path">
          <div class="nav__ico">
            <img :src="loadImage(name)" :alt="name" />
          </div>
          <h3 class="nav__name">{{ name }}</h3>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    loadImage(name) {
      return require(`~/assets/images/dock/${name}.png`);
    },
    click(e) {
      this.isActive = !this.isActive;
    },
  },
};
</script>
