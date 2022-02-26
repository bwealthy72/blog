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
              <Tags :tags="post.tags"></Tags>
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
    let path, search, where;
    // 경로가 /search로 시작하는 경우 검색 화면
    const isSearch = route.path.slice(0, 7) === "/search";
    const isTag = route.path.slice(0, 4) === "/tag";

    if (isTag) {
      path = "";
      where = { tags: { $contains: route.params.tag } };
      search = [""];
    } else if (isSearch) {
      path = "";
      where = null;
      search = ["title", route.params.keyword];
    } else {
      path = route.path.split("/").slice(0, 2).join("/");
      where = null;
      search = [""];
    }

    const postList = await $content(path, { deep: true })
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
      .search(...search)
      .where(where)
      .fetch();

    for (const post of postList) {
      if (isSearch) {
        const dir = route.path.split("/");
        post.dir = "/" + dir[dir.length - 1];
        post.category = store.state.routePaths[post.dir];
      } else {
        post.dir = route.path;
        post.category = store.state.routePaths[post.dir];
      }
    }

    return { postList };
  },
};
</script>
