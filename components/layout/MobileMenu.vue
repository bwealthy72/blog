<template>
  <nav class="site-mobile-menu">
    <button class="hamburger-btn" @click="click">
      <div class="hamburger-btn__box" :class="{ active: isActive }">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </button>
    <ul class="nav" :class="{ active: isActive }">
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
