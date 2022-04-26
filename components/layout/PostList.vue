<template>
  <aside class="post-list">
    <header class="post-list__head">
      <!-- <CommonSearch></CommonSearch> -->
    </header>
    <div class="post-list__wrap" ref="postlist">
      <nuxt-link
        :to="p.path"
        class="post-list__box"
        v-for="p of postList"
        :key="p.slug"
      >
        <div class="post-list__texts">
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
        </div>
        <div class="post-list__img" v-if="p.coverImg">
          <img :src="p.coverImg" alt="cover-image" />
        </div>
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["postList", "scrollTop"],
  mounted() {
    this.$el.querySelector(".post-list__wrap").scrollTo(0, this.scrollTop);

    this.$refs.postlist.addEventListener("scroll", (e) => {
      this.$emit("listScroll", this.$refs.postlist.scrollTop);
    });
  },
};
</script>
