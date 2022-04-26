<template>
  <main class="post">
    <header class="post__head">
      <h2 class="post__title">{{ post.title }}</h2>
      <div class="post__category">
        <img
          :src="require(`~/assets/images/post/${post.category}.png`)"
          alt=""
        />
        <p>{{ post.category }}</p>
      </div>
    </header>
    <article class="post__content">
      <div class="post__info">
        <CommonTags :tags="post.tags"></CommonTags>
        <p class="post__date">{{ post.createdAt }}</p>
      </div>

      <div class="post__cover-img" v-if="post.coverImg">
        <img :src="post.coverImg" alt="Cover Image" />
      </div>

      <nuxt-content :document="post" tag="article" />

      <div class="comments">
        <script
          src="https://utteranc.es/client.js"
          repo="bwealthy72/blog"
          issue-term="title"
          label="Comment"
          theme="github-dark"
          crossorigin="anonymous"
          async
        ></script>
      </div>
    </article>
  </main>
</template>

<script>
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
export default {
  data() {
    return {
      post: null,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  async fetch() {
    let path = this.$route.path;

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
    const postList = await this.$content(category, { deep: true })
      .only(["title", "createdAt", "description", "path", "tags", "dir"])
      .sortBy("createdAt", "desc")
      .sortBy("title", "desc")
      .fetch();

    for (const p of postList) {
      const re = new RegExp(cateRegex);
      p.createdAt = this.$dateFormat(new Date(p.createdAt));
      p.dir = re.exec(p.path)[1];
      p.category = this.$store.state.routePaths[p.dir];
    }

    let post;
    if (this.$route.params.post) {
      // 포스트 URL 이라면
      post = await this.$content(path).fetch();
    } else {
      // 카테고리 URL 이라면
      post = await this.$content(postList[0].path).fetch();
    }

    const re = new RegExp(cateRegex);
    post.createdAt = this.$dateFormat(
      new Date(post.createdAt),
      "%Y년 %M월 %D일 %t %h:%m"
    );
    post.dir = re.exec(post.path)[1];
    post.category = this.$store.state.routePaths[post.dir];

    this.post = post;
    this.postList = postList;
  },
};
</script>

<style></style>
