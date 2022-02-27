<template>
  <nav class="site-dock" v-if="false">
    <ul class="dock" @mouseleave="mouseLeave" @mousemove="mouseMove">
      <li
        class="dock__item"
        v-for="(name, path) of $store.state.routePaths"
        :key="path"
      >
        <a class="link" :href="path">
          <img
            :src="loadImage(name)"
            :alt="name"
            class="ico"
            @mouseenter="$set(flags, idx, true)"
            @mouseleave="$set(flags, idx, false)"
          />
          <div :class="{ active: flags[idx] }" class="info">
            <h3 class="info__name">
              {{ name }}
            </h3>
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import variable from "~/assets/scss/base/variable.scss";
export default {
  data() {
    return {
      aniId: null,
    };
  },
  created() {
    const length = this.$store.state.routePaths.length;
    this.flags = Array.from({ length }, (i) => (i = false));
    this.widths = Array.from({ length }, (i) => (i = this.dockWidth));
  },
  methods: {
    loadImage(name) {
      console.log(name);
      return require(`~/assets/images/dock/${name}.png`);
    },
    mouseLeave() {
      console.log("mouseLeave");
      // 이전 애니메이션 취소
      // window.cancelAnimationFrame(this.aniId);
      this.aniId = null;
    },
    mouseMove() {
      window.cancelAnimationFrame;
      console.log("mouseMove");
    },
  },
};
</script>
