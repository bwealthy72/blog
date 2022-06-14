<template>
  <main class="post-content">
    <section class="post-content__main">
      <p class="post-content__date">{{ post.createdAt }}</p>
      <h2 class="post-content__title">{{ post.title }}</h2>
      <div class="post-content__info">
        <CommonTags :tags="post.tags"></CommonTags>
      </div>

      <div class="post-content__cover-img" v-if="post.coverImg">
        <img :src="`${post.coverImg}?nf_resize=fit&h=400`" alt="Cover Image" />
      </div>

      <nuxt-content :document="post" tag="article" />
    </section>
  </main>
</template>

<script>
export default {
  props: ["post"],
  head() {
    return {
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
          hid: "og:image",
          property: "og:image",
          content: this.post.coverImg
            ? this.post.coverImg
            : "https://www.blogwealthy.com/logo.png",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.post.path
            ? this.post.path
            : "https://www.blogwealthy.com/",
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
            ? this.post.coverImg
            : "https://www.blogwealthy.com/logo.png",
        },
      ],
    };
  },
};
</script>
