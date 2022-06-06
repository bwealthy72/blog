<template>
  <main class="post-content">
    <header class="post-content__head">
      <NuxtLink class="subject" :to="post.dir">
        <img
          class="subject__arrow"
          src="~/assets/images/left-arrow.png"
          alt="left-arrow"
        />
        <img
          class="subject__img"
          :src="require(`~/assets/images/post/${post.category}.png`)"
          alt=""
        />
        <p class="subject__text">{{ post.category }}</p>
      </NuxtLink>
      <div class="post-content__to-top"></div>
      <div class="post-content__toc"></div>
      <div class="post-content__to-comment"></div>
    </header>
    <article class="post-content__main">
      <p class="post-content__date">{{ post.createdAt }}</p>
      <h2 class="post-content__title">{{ post.title }}</h2>
      <div class="post-content__info">
        <CommonTags :tags="post.tags"></CommonTags>
      </div>

      <div class="post-content__cover-img" v-show="post.coverImg">
        <img :src="post.coverImg" alt="Cover Image" />
      </div>

      <nuxt-content :document="post" tag="article" />
      <!--
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
      </div> -->
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
