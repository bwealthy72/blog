<template>
  <div class="post-wrapper">
    <PostCategory></PostCategory>
    <PostList :postList="postList"></PostList>
    <PostContent :post="post"></PostContent>
  </div>
</template>

<script>
import PostCategory from "./post/PostCategory.vue";
import PostList from "./post/PostList.vue";
import PostContent from "./post/PostContent.vue";

export default {
  props: ["props"],
  computed: {
    post() {
      return this.props["post"];
    },
    postList() {
      return this.props["postList"];
    },
  },
  components: { PostCategory, PostList, PostContent },
};
</script>
