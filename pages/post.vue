<template>
  <div class="post-wrapper" :class="postScreen">
    <MacWindow windowWidth="1080" windowHeight="700" uid="post">
      <div class="post-window" slot="body">
        <LayoutPostCategory></LayoutPostCategory>
        <LayoutPostList :postList="postList"></LayoutPostList>
        <LayoutPostContent :post="post"></LayoutPostContent>
      </div>
    </MacWindow>
  </div>
</template>
<script>
export default {
  transitions(from, to) {
    const re = /\/post/gm;
    const f = re.exec(from.path);
    const t = re.exec(to.path);
    if (f && t && f[0] == t[0]) {
      return "app";
    } else {
      return "";
    }
  },
  beforeCreate() {
    this.$store.commit("setTitle", "Blog post");
  },
  async asyncData(ctx) {
    const { post, postList } = await ctx.$getPosts();
    const postScreen = ctx.$postScreen();

    return { post, postList, postScreen };
  },
};
</script>
