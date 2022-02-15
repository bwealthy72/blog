<template>
  <main class="post-list-wrapper">
    <article class="content">
      <h1 class="title">{{ $route.name }}</h1>
      <ul>
        <li class="post-item" v-for="post of postList" :key="post.title">
          <a :href="post.path" class="post-item__title">{{ post.title }}</a>

          <ul class="post-item__tag">
            <li class="tag-item" v-for="tag of post.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>

          <p class="post-item__date">
            <img
              class="calendar-ico"
              src="@/assets/images/calendar.svg"
              alt="calendar"
            />
            <span>{{ post.createdAt.slice(0, 10).replace(/-/gi, ".") }}</span>
          </p>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ route, $content }) {
    const path = route.path.split("/").slice(0, 2).join("/");

    const postList = await $content(path, { deep: true })
      .only(["title", "path", "tags", "createdAt"])
      .sortBy("createdAt", "desc")
      .fetch();

    return { postList };
  },
};
</script>
