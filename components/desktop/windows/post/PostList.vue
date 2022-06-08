<template>
  <aside class="post-list">
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
  },
  // mounted() {
  //   const activedPost = this.$el.querySelector(".nuxt-link-active");
  //   if (activedPost) {
  //     const pos = activedPost.getBoundingClientRect();

  //     this.$refs.postlist.scrollTo({
  //       top: pos.top - this.$refs.head.clientHeight - 10,
  //     });
  //   }
  // },
};
</script>
