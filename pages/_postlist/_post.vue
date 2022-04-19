<template>
  <main class="post-wrapper">
    <div class="head">
      <a :href="post.dir" class="head__cate">{{ post.category }}</a>
      <h1 class="head__title">{{ post.title }}</h1>

      <p class="head__rt">{{ post.readingTime }}</p>

      <div class="head__date">
        <img class="ico" src="@/assets/images/calendar.svg" alt="cal" />
        <span> {{ post.createdAt }}</span>
      </div>
    </div>

    <article class="body">
      <LayoutPostToc class="body__toc" :toc="post.toc"></LayoutPostToc>
      <LayoutTags :tags="post.tags"></LayoutTags>

      <div class="body__post">
        <div class="body__cover" v-if="post.coverImg">
          <img :src="post.coverImg" alt="Cover Image" />
        </div>

        <nuxt-content :document="post" tag="article" />
      </div>
    </article>

    <!-- <div class="comments">
      <script
        src="https://utteranc.es/client.js"
        repo="bwealthy72/blog"
        issue-term="title"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async
      ></script>
    </div> -->
  </main>
</template>

<script>
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
export default {
  head() {
    const post = this.post;
    const hostURL = "https://www.blogwealthy.com";
    const imgURL = post.coverImg
      ? encodeURI(hostURL + post.coverImg)
      : hostURL + "/logo.png";

    let desc = post.description;
    if (!desc) {
      const firstChildren = post.body.children;
      if (firstChildren) {
        const childOfFirst = firstChildren[0].children;
        if (childOfFirst && childOfFirst[0].type == "text") {
          desc = childOfFirst[0].value;
        }
      }
    }

    const _meta = {
      description: desc,
      "og:title": post.title,
      "og:type": "article",
      "og:image": imgURL,
      "og:image:secure_url": imgURL,
      "og:image:alt": post.title,
      "og:url": encodeURI(hostURL + post.path),
      "og:image": imgURL,
      "og:description": desc,
      "twitter:card": "summary_large_image",
      "twitter:title": post.title,
      "twitter:description": desc,
      "twitter:image": imgURL,
    };

    const meta = [];
    for (const [key, val] of Object.entries(_meta)) {
      if (key.startsWith("og:")) {
        meta.push({
          hid: key,
          property: key,
          content: val,
        });
      } else {
        meta.push({
          hid: key,
          name: key,
          content: val,
        });
      }
    }

    return {
      title: post.title,
      meta,
    };
  },
  mounted() {
    Prism.highlightAll();
  },

  async asyncData({ store, route, $content, $dateFormat, error }) {
    let path = route.path;

    if (path[path.length - 1] === "/") {
      path = path.slice(0, -1);
    }

    let post;
    try {
      post = await $content(decodeURI(path)).fetch();
    } catch {
      return error({ statusCode: 404, message: "Article not found" });
    }

    post.createdAt = $dateFormat(new Date(post.createdAt));
    post.updatedAt = $dateFormat(new Date(post.updatedAt));
    post.dir = route.path.split("/").slice(0, 2).join("/");
    post.category = store.state.routePaths[post.dir];

    return { post };
  },
};
</script>
