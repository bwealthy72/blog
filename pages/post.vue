<template>
  <div class="post-wrapper" ref="post">
    <aside class="category">
      <header class="category__head">
        <div class="window-btns">
          <button class="window-btns__close"></button>
          <button class="window-btns__minimize"></button>
          <button class="window-btns__maximize"></button>
        </div>
      </header>
      <h3 class="category__title">Category</h3>
      <ul class="category__list">
        <li class="category__item"></li>
      </ul>
    </aside>

    <aside class="posts">
      <header class="posts__head">
        <!-- <CommonSearch></CommonSearch> -->
      </header>
      <ul class="posts__list">
        <li class="posts__item" v-for="p of postList" :key="p"></li>
      </ul>
    </aside>

    <LayoutPost></LayoutPost>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: null,
    };
  },
  mounted() {
    const post = this.$refs.post;
    const h = post.clientHeight;
    const w = post.clientWidth;

    post.style.top = (window.innerHeight - h) / 2 + "px";
    post.style.left = (window.innerWidth - w) / 2 + "px";

    this.$setMovable(post);
  },
};
</script>
