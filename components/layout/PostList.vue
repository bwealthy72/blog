<template>
  <aside class="post-list">
    <header class="post-list__head" ref="head">
      <NuxtLink class="subject-text" to="/post">
        <img
          class="subject-text__arrow"
          src="~/assets/images/left-arrow.png"
          alt="left-arrow"
        />
        <h2 class="subject-text__text">Category</h2>
      </NuxtLink>
      <div class="subject">
        <img
          class="subject__arrow"
          src="~/assets/images/left-arrow.png"
          alt="left-arrow"
        />
        <img
          class="subject__img"
          :src="category ? require(`~/assets/images/post/${category}.png`) : ''"
        />
        <h2 class="subject__text">{{ category }}</h2>
      </div>
      <!-- <CommonSearch></CommonSearch> -->
    </header>
    <div class="post-list__wrap" ref="postlist">
      <nuxt-link
        :to="'/post' + p.path"
        class="post-list__box"
        v-for="(p, index) of postList"
        :key="p.slug"
        :class="{
          'nuxt-link-active': p.active,
          'nuxt-link-active': index == 0 && $route.name,
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
    isAllPost() {
      return this.$route.name === "모든 포스트";
    },
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
  mounted() {
    const activedPost = this.$el.querySelector(".nuxt-link-active");
    if (activedPost) {
      const pos = activedPost.getBoundingClientRect();

      this.$refs.postlist.scrollTo({
        top: pos.top - this.$refs.head.clientHeight - 10,
      });
    }
  },
};
</script>
