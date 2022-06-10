<template>
  <div class="window-wrapper">
    <DesktopMacWindow
      v-for="(window, name) in windows"
      :key="name"
      :width="window.width"
      :height="window.height"
      :zIndex="window.zIndex"
      :name="name"
      v-show="window.open"
    >
      <!-- <component slot="body" :is="name" :props="window.props"></component> -->
      <PostVue slot="body" :props="window.props"></PostVue>
    </DesktopMacWindow>
  </div>
</template>

<script>
import PostVue from "~/components/desktop/windows/Post.vue";

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
        let props = null;

        if (key === "Post") {
          props = { post: this.post, postList: this.postList };
        }

        w[key] = {
          props,
          ...val,
        };
      }
      return w;
    },
  },

  components: { PostVue },
};
</script>
