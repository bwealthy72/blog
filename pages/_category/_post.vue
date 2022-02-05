<template>
  <main class="post-wrapper">
    <div class="header">
      <a :href="post.dir" class="category">{{ post.category }}</a>
      <h1 class="title">{{ post.title }}</h1>

      <ul class="tag">
        <li class="tag__item" v-for="tag of post.tags" :key="tag">{{ tag }}</li>
      </ul>

      <div class="date">
        <div class="created-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span>Created : {{ post.createdAt }}</span>
        </div>

        <div class="upated-date">
          <img class="date-ico" src="@/assets/images/calendar.svg" alt="cal" />
          <span>Updated : {{ post.updatedAt }}</span>
        </div>
      </div>
    </div>
    <div class="cover-img" v-if="post.coverImg">
      <img :src="post.coverImg" alt="Cover Image" />
    </div>
    <article class="post">
      <div class="toc"></div>
      <div class="content">
        <nuxt-content :document="post" />
      </div>
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ store, route, $content, $dateFormat }) {
    const post = await $content(decodeURI(route.path)).fetch();
    post.createdAt = $dateFormat(new Date(post.createdAt));
    post.updatedAt = $dateFormat(new Date(post.updatedAt));
    post.dir = route.path.split("/").slice(0, 2).join("/");
    post.category = store.state.routePaths[post.dir];

    return { post };
  },
};
</script>
