<template>
  <main class="post-content">
    <secion class="post-content__main">
      <p class="post-content__date">{{ post.createdAt }}</p>
      <h2 class="post-content__title">{{ post.title }}</h2>
      <div class="post-content__info">
        <CommonTags :tags="post.tags"></CommonTags>
      </div>

      <div class="post-content__cover-img" v-show="post.coverImg">
        <img :src="post.coverImg" alt="Cover Image" />
      </div>

      <nuxt-content :document="post" tag="article" />
    </secion>
  </main>
</template>

<script>
export default {
  props: ["post"],
};
</script>
