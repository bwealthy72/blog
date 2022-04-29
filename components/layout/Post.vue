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

      <div class="post__cover-img" v-show="post.coverImg">
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
  props: ["post"],
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style></style>
