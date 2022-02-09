<template>
  <main class="post-wrapper">
    <div class="header">
      <a :href="post.dir" class="category">{{ post.category }}</a>
      <h1 class="title">{{ post.title }}</h1>

      <div class="date">
        <div class="created-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span>생성일 - {{ post.createdAt }}</span>
        </div>

        <div class="upated-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span>수정일 - {{ post.updatedAt }}</span>
        </div>
      </div>
    </div>

    <article class="post">
      <div class="ad-wrapper">
        <Ad adslot="3845475151"></Ad>
      </div>
      <div class="toc"></div>
      <div class="content">
        <div class="tags" v-if="post.tags">
          <img class="tags__ico" src="@/assets/images/tag.svg" alt="tag" />
          <ul class="tags__list">
            <li class="tags__item" v-for="tag of post.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>
        </div>

        <div class="cover-img" v-if="post.coverImg">
          <img :src="post.coverImg" alt="Cover Image" />
        </div>

        <nuxt-content :document="post" />
      </div>
    </article>
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
  </main>
</template>

<script>
export default {
  head() {
    const hostURL = "https://www.blogwealthy.com";
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.post.title,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.post.coverImg
            ? hostURL + this.post.coverImg
            : hostURL + "/logo.png",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: hostURL + this.post.path,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.description,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.post.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.post.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.post.coverImg
            ? hostURL + this.post.coverImg
            : hostURL + "/logo.png",
        },
      ],
    };
  },

  async asyncData({ store, route, $content, $dateFormat }) {
    let path = route.path;
    if (path[path.length - 1] === "/") {
      path = path.split("/").slice(0, -1).join("/");
    }

    const post = await $content(decodeURI(path)).fetch();
    post.createdAt = $dateFormat(new Date(post.createdAt));
    post.updatedAt = $dateFormat(new Date(post.updatedAt));
    post.dir = route.path.split("/").slice(0, 2).join("/");
    post.category = store.state.routePaths[post.dir];

    return { post };
  },
};
</script>
