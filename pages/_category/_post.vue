<template>
  <main class="post-wrapper">
    <div class="header">
      <button class="category"></button>
      <h1 class="title"></h1>
      <p class="date">
        <span class="created"></span>
        <span class="updated"></span>
      </p>
    </div>
    <article class="post">
      <div class="toc"></div>
      <div class="content">
        <div class="tags"></div>
        <div class="cover-img">
          <img src="" alt="" />
        </div>
        <nuxt-content :document="post" />
      </div>
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ route, $content }) {
    const post = await $content(decodeURI(route.path)).fetch();

    return { post };
  },
};
</script>
