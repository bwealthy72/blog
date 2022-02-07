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
      <div class="toc"></div>
      <div class="content">
        <div class="tag" v-if="post.tags">
          <img class="tag__ico" src="@/assets/images/tag.svg" alt="tag" />
          <ul class="tag__list">
            <li class="tag__item" v-for="tag of post.tags" :key="tag">
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
  </main>
</template>

<script>
export default {
  async asyncData({ store, route, $content, $dateFormat }) {
    let path = route.path;
    if (path[path.length - 1] === "/") {
      path = decodeURI(path.split("/").slice(0, -1).join("/"));
    }

    const post = await $content(path).fetch();
    post.createdAt = $dateFormat(new Date(post.createdAt));
    post.updatedAt = $dateFormat(new Date(post.updatedAt));
    post.dir = route.path.split("/").slice(0, 2).join("/");
    post.category = store.state.routePaths[post.dir];

    return { post };
  },
};
</script>
