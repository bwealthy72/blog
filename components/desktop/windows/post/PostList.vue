<template>
  <aside
    class="post-list"
    @mousedown="mousedownHandler"
    @mousemove="mousemoveHandler"
    @mouseup="mouseupHandler"
    :style="style"
  >
    <div class="post-list__wrap" ref="postlist">
      <nuxt-link
        :to="'/post' + p.path"
        class="post-list__box"
        v-for="(p, index) of postList"
        :key="p.slug"
        :class="{
          'nuxt-link-active':
            p.active ||
            (index == 0 && ($route.name || $route.path === '/post')),
        }"
      >
        <div class="text">
          <h4 class="text__category">{{ p.category }}</h4>
          <h3 class="text__title">{{ p.title }}</h3>
          <p class="text__date">{{ p.createdAt }}</p>
          <p class="text__desc">{{ p.description }}</p>
        </div>
        <div class="img" v-show="p.coverImg">
          <img :src="p.coverImg" alt="cover-image" />
        </div>
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["postList"],
  data() {
    return {
      resizing: false,
      width: 350,
      cursor: "inherit",
    };
  },
  computed: {
    category() {
      const path = this.$route.path;
      const re = /\/post\/?\w+/gm;
      const result = re.exec(path);
      let c;
      if (path === "/post") {
        c = this.$store.state.postPaths[path];
      } else if (result) {
        c = this.$store.state.postPaths[result[0]];
      }

      if (c) {
        return c.name;
      }
    },
    prevInfo() {
      return this.$store.state.postWindow.postList;
    },
    style() {
      return {
        width: this.width + "px",
        cursor: this.cursor,
      };
    },
  },
  watch: {
    style() {
      this.$store.commit("savePostWindowList", this.width);
    },
  },
  methods: {
    isResizable(x) {
      const bound = this.$el.getBoundingClientRect();
      return Math.abs(x - bound.right) < 10;
    },
    mousedownHandler(e) {
      this.resizing = this.isResizable(e.clientX);
    },
    mousemoveHandler(e) {
      if (this.resizing) {
        const rect = this.$el.getBoundingClientRect();
        this.width = e.clientX - rect.left;

        // 일정 이하 크기로 줄어드면 그냥 접히게 하기
        this.closed = this.width < this.activeCloseWidth;
      } else {
        if (this.isResizable(e.clientX)) {
          this.cursor = "ew-resize";
        } else {
          this.cursor = "inherit";
        }
      }
    },
    mouseupHandler(e) {
      this.resizing = false;
      this.cursor = "inherit";
    },
  },
  created() {
    this.closed = this.prevInfo.closed;
    this.width = this.prevInfo.width;
  },
  mounted() {
    document.addEventListener("mousemove", this.mousemoveHandler);
    document.addEventListener("mouseup", this.mouseupHandler);

    const activedPost = this.$el.querySelector(".nuxt-link-active");
    if (activedPost) {
      const pos = activedPost.getBoundingClientRect();
      const windowHeadHeight = this.$getScssVariable("windowHeadHeight");
      const headerHeight = this.$getScssVariable("headerHeight");
      const margin = 10;

      this.$el.scrollTo({
        top: pos.top - windowHeadHeight - headerHeight - margin,
      });
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.mousemoveHandler);
    document.removeEventListener("mouseup", this.mouseupHandler);
  },
  // mounted() {

  // },
};
</script>
