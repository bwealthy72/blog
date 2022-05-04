<template>
  <div class="post-wrapper">
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
  async asyncData(ctx) {
    return await ctx.$getPosts();
  },
};
</script>
