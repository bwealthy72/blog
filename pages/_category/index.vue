<template>
  <main class="post-list-wrapper">
    <article class="content">
      <h1 class="main-title">{{ $route.name }}</h1>
      <ul>
        <li class="post-item" v-for="post of postList" :key="post.title">
          <a class="post-item__img" v-if="post.coverImg" :href="post.path">
            <img :src="post.coverImg" alt="cover" />
          </a>
          <div class="post-item__info">
            <a :href="post.path">
              <h2 class="title">{{ post.title }}</h2>
              <p class="desc">{{ post.description }}</p>
            </a>

            <div class="sub-info">
              <ul class="tags">
                <li class="tags__item" v-for="tag of post.tags" :key="tag">
                  {{ tag }}
                </li>
              </ul>
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
  async asyncData({ store, route, $content }) {
    const path = route.path.split("/").slice(0, 2).join("/");

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
      .fetch();

    for (const post of postList) {
      post.dir = route.path;
      post.category = store.state.routePaths[post.dir];
    }

    return { postList };
  },
};
</script>
