<template>
  <div class="post-wrapper" ref="postWrap">
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

    <LayoutPostList
      v-on:listScroll="listScroll"
      :postList="postList"
      :scrollTop="postListScrollTop"
    ></LayoutPostList>

    <LayoutPost :post="post"></LayoutPost>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      postList: null,
    };
  },
  methods: {
    listScroll(scrollY) {
      this.$route.meta.postListScrollY = scrollY;
    },
  },
  computed: {
    postListScrollTop() {
      try {
        return this.$route.meta.postListScrollY;
      } catch {
        return 0;
      }
    },
  },
  mounted() {
    const post = this.$refs.postWrap;
    const h = post.clientHeight;
    const w = post.clientWidth;

    post.style.top = (window.innerHeight - h) / 2 + "px";
    post.style.left = (window.innerWidth - w) / 2 + "px";

    this.$setMovable(post);
  },
  async asyncData({ store, route, $content, $dateFormat }) {
    let path = route.path;

    // 맨 뒤에 /가 있으면 못 찾는 경우가 있음
    if (path[path.length - 1] === "/") {
      path = path.slice(0, -1);
    }

    // Category
    const cateRegex = /(\/\w+)/gm;
    const match = cateRegex.exec(path);
    let category = "";
    if (match) {
      category = match[1];
    } else {
      console.error("정규식 에러");
    }

    // Post list
    const postList = await $content(category, { deep: true })
      .without(["body"])
      .sortBy("createdAt", "desc")
      .sortBy("title", "desc")
      .fetch();

    for (const p of postList) {
      const re = new RegExp(cateRegex);
      p.createdAt = $dateFormat(new Date(p.createdAt));
      p.dir = re.exec(p.path)[1];
      p.category = store.state.routePaths[p.dir];
    }

    let post;
    if (route.params.post) {
      // 포스트 URL 이라면
      post = await $content(path).fetch();
    } else {
      // 카테고리 URL 이라면
      post = await $content(postList[0].path).fetch();
    }

    const re = new RegExp(cateRegex);
    post.createdAt = $dateFormat(
      new Date(post.createdAt),
      "%Y년 %M월 %D일 %t %h:%m"
    );
    post.dir = re.exec(post.path)[1];
    post.category = store.state.routePaths[post.dir];

    return { post, postList };
  },
};
</script>
