<template>
  <aside
    class="post-cate"
    @mousedown="mousedownHandler"
    @mousemove="mousemoveHandler"
    @mouseup="mouseupHandler"
    :style="style"
    :class="{ closed }"
  >
    <h3 class="post-cate__title">Category</h3>
    <ul class="post-cate__list">
      <li class="post-cate__item" v-for="(post, path) in postPaths" :key="path">
        <NuxtLink :to="path" class="link" :class="activeCategory(path)">
          <img
            class="link__img"
            :src="require(`~/assets/images/post/${post.name}.png`)"
            alt="name"
          />
          <h3 class="link__category">{{ post.name }}</h3>
          <h4 class="link__length">{{ post.length }}</h4>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      resizing: false,
      width: 200,
      cursor: "inherit",
      activeCloseWidth: 50, // 접히기 시작하는 가로크기
      closed: false,
    };
  },
  computed: {
    postPaths() {
      return this.$store.state.postPaths;
    },
    prevInfo() {
      return this.$store.state.postWindow.category;
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
      this.$store.commit("savePostWindowCate", [this.width, this.closed]);
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
    activeCategory(path) {
      const re = /\/post\/?\w*/gm;
      const result = re.exec(this.$route.path);
      let currPath = result ? result[0] : "";

      if (currPath == "/post") {
        currPath += "/all";
      }

      return { active: currPath == path };
    },
  },
  created() {
    this.closed = this.prevInfo.closed;
    this.width = this.prevInfo.width;
  },
  mounted() {
    document.addEventListener("mousemove", this.mousemoveHandler);
    document.addEventListener("mouseup", this.mouseupHandler);
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.mousemoveHandler);
    document.removeEventListener("mouseup", this.mouseupHandler);
  },
};
</script>
