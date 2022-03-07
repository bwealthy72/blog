<template>
  <main class="post-list-wrapper">
    <article class="content">
      <h1 class="main-title">{{ mainTitle }}</h1>
      <ul>
        <li class="post-item" v-for="post of postList" :key="post.title">
          <a class="post-item__img" v-if="post.coverImg" :href="post.path">
            <img :src="post.coverImg" alt="cover" />
          </a>
          <div class="post-item__info">
            <a :href="post.dir" class="category">{{ post.category }}</a>
            <a :href="post.path" class="main-info">
              <h2 class="title">{{ post.title }}</h2>
              <p class="desc">{{ post.description }}</p>
            </a>

            <div class="sub-info">
              <LayoutTags :tags="post.tags"></LayoutTags>
              <p class="date">
                <img
                  class="calendar-ico"
                  src="@/assets/images/calendar.svg"
                  alt="calendar"
                />
                <span>{{
                  post.createdAt.slice(0, 10).replace(/-/gi, ".")
                }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
export default {
  head() {
    const isSearch = this.$route.path.slice(0, 7) === "/search";
    if (isSearch) {
      return {
        title: `"${this.$route.params.keyword}"의 검색 결과`,
      };
    }
  },
  computed: {
    mainTitle() {
      let title = "";
      const r = this.$route;
      if (r.params.keyword) {
        title = `"${r.params.keyword}"의 검색 결과`;
      } else if (r.params.tag) {
        title = `"${r.params.tag}" 태그 결과`;
      } else if (r.name) {
        title = r.name;
      }
      return title;
    },
  },
  async asyncData({ store, route, $content }) {
    const postList = await $content("/", { deep: true })
      .only([
        "title",
        "path",
        "tags",
        "createdAt",
        "coverImg",
        "description",
        "dir",
      ])
      .sortBy("createdAt", "desc")
      .fetch();

    for (const post of postList) {
      post.dir = "/";
      post.category = "전체보기";
    }

    return { postList };
  },
};
</script>
