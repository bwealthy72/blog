<template>
  <div class="window-wrapper">
    <DesktopMacWindow
      :width="postWindow.width"
      :height="postWindow.height"
      :zIndex="postWindow.zIndex"
      name="Post"
      v-show="postWindow.open"
    >
      <Post slot="body" :post="post" :postList="postList"></Post>
    </DesktopMacWindow>
    <DesktopMacWindow
      v-for="(window, name) in windows"
      :key="name"
      :width="window.width"
      :height="window.height"
      :zIndex="window.zIndex"
      :name="name"
      v-show="window.open"
    >
      <component slot="body" :is="name"></component>
    </DesktopMacWindow>
  </div>
</template>

<script>
import Post from "~/components/desktop/windows/Post.vue";
import Twitter from "@/components/desktop/windows/Twitter.vue";

export default {
  async asyncData(ctx) {
    const { post, postList } = await ctx.$getPosts();
    return { post, postList };
  },
  computed: {
    windows() {
      const w = {};

      // 열려있는 window만 값을 가져온다.
      for (const [key, val] of Object.entries(this.$store.state.windows)) {
        if (val.open && key != "Post") {
          w[key] = val;
        }
      }
      return w;
    },
    postWindow() {
      return this.$store.state.windows["Post"];
    },
  },

  components: { Post, Twitter },
};
</script>
