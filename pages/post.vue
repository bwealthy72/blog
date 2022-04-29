<template>
  <div class="post-wrapper" ref="postWrap" :class="mobileDisplay">
    <LayoutPostCategory></LayoutPostCategory>
    <LayoutPostList :postList="postList"></LayoutPostList>
    <LayoutPostContent :post="post"></LayoutPostContent>

    <CommonWindowBtn @maximize="maximize"></CommonWindowBtn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      postList: null,
      isWindowMovable: false,
    };
  },
  methods: {
    maximize() {
      const headerHeight = document
        .querySelector(".site-header")
        .getBoundingClientRect().height;
      const dockRight = document
        .querySelector(".dock")
        .getBoundingClientRect().right;

      const post = this.$refs.postWrap;
      post.style.top = headerHeight + "px";
      post.style.left = dockRight + "px";
      post.style.width = window.innerWidth - dockRight + "px";
      post.style.height = window.innerHeight - headerHeight + "px";
    },
    desktopWindowSet() {
      const desktopWidth = this.$getScssVariable("desktopWidth");
      const post = this.$refs.postWrap;

      // desktop인 상태에서 돌리기
      if (window.innerWidth >= desktopWidth) {
        if (!this.isWindowMovable) {
          const h = post.clientHeight;
          const w = post.clientWidth;

          post.style.top = (window.innerHeight - h) / 2 + "px";
          post.style.left = (window.innerWidth - w) / 2 + "px";

          this.$setMovable(post);
          this.isWindowMovable = true;
        }
      } else {
        if (this.isWindowMovable) {
          this.$clearMovable(post);
          this.isWindowMovable = false;
        }
      }
    },
  },
  computed: {
    mobileDisplay() {
      if (this.$route.path == "/post") {
        return { "mode-category": true };
      } else if (this.$route.name) {
        return { "mode-list": true };
      } else {
        return { "mode-post": true };
      }
    },
  },
  created() {},
  mounted() {
    this.desktopWindowSet();
    window.addEventListener("resize", this.desktopWindowSet);
  },
  beforeDestroy() {
    const post = this.$refs.postWrap;
    this.$clearMovable(post);
    window.removeEventListener("resize", this.desktopWindowSet);
  },
  async asyncData({ store, route, $content, $dateFormat, error }) {
    let path = route.path;

    // 맨 뒤에 /가 있으면 못 찾는 경우가 있음
    if (path[path.length - 1] === "/") {
      path = path.slice(0, -1);
    }

    // Category
    const cateRegex = /\/post(\/\w+)/gm;
    const match = cateRegex.exec(path);
    let category = "";
    if (match) {
      category = match[1];
    }

    try {
      if (category == "/all") {
        category = "";
      }
      // Post list
      const postList = await $content(category, { deep: true })
        .without(["body"])
        .sortBy("createdAt", "desc")
        .sortBy("title", "desc")
        .fetch();

      for (const p of postList) {
        const re = /(\/\w+)\//gm;
        p.createdAt = $dateFormat(new Date(p.createdAt), "%Y. %M. %D");
        const result = re.exec(p.path);
        if (result) {
          p.dir = "/post" + result[1];
          p.category = store.state.postPaths[p.dir].name;
        } else {
          console.error("post asnycData] path에 문제 있음");
        }
      }

      let post;
      if (route.params.post) {
        // 포스트 URL 이라면
        const postPathRegex = /\/post(.*)/gm;
        const result = postPathRegex.exec(path);
        if (result) {
          post = await $content(result[1]).fetch();
        } else {
          console.error("post asnycData] path에 문제 있음");
        }
      } else {
        // 카테고리 URL 이라면
        post = await $content(postList[0].path).fetch();

        // 글이 아닌 글 목록 창이면 맨 위에 글이 active 되도록 하기 위함
        postList[0].active = true;
      }

      const re = /(\/\w+)/gm;
      post.createdAt = $dateFormat(
        new Date(post.createdAt),
        "%Y년 %M월 %D일 %t %h:%m"
      );

      const result = re.exec(post.path);
      if (result) {
        post.dir = "/post" + result[1];
        post.category = store.state.postPaths[post.dir].name;
      } else {
        console.error("post asnycData] path에 문제 있음");
      }
      return { post, postList };
    } catch {
      error({ statusCode: 404, message: "Not Found" });
    }
  },
};
</script>
