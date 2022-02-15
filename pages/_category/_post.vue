<template>
  <main class="post-wrapper">
    <div class="header">
      <a :href="post.dir" class="category">{{ post.category }}</a>
      <h1 class="title">{{ post.title }}</h1>

      <div class="date">
        <div class="created-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span> Date - {{ post.createdAt }}</span>
        </div>

        <div class="upated-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span> Updated - {{ post.updatedAt }}</span>
        </div>
      </div>
    </div>

    <article class="post">
      <PostToc :toc="post.toc"></PostToc>

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
    const post = this.post;
    const hostURL = "https://www.blogwealthy.com";
    const imgURL = post.coverImg
      ? encodeURI(hostURL + post.coverImg)
      : hostURL + "/logo.png";

    const _meta = {
      description: post.description,
      "og:title": post.title,
      "og:type": "article",
      "og:image": imgURL,
      "og:image:secure_url": imgURL,
      "og:image:alt": post.title,
      "og:url": encodeURI(hostURL + post.path),
      "og:image": imgURL,
      "og:description": post.description,
      "twitter:card": "summary_large_image",
      "twitter:title": post.title,
      "twitter:description": post.description,
      "twitter:image": imgURL,
    };

    const meta = [];
    for (const [key, val] in _meta) {
      meta.push({
        hid: key,
        name: key,
        content: val,
      });
    }

    return {
      title: post.title,
      meta,
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
