<template>
  <main class="post-list">
    <div class="header">공사중</div>
    <article class="list-wrapper">
      <h1 class="category">{{ $route.name }}</h1>
      <ul class="post-list">
        <li class="post" v-for="post of postList" :key="post.title">
          <a :href="post.path" class="title">{{ post.title }}</a>

          <ul class="tag">
            <li class="tag__item" v-for="tag of post.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>

          <p class="date">
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
    const postList = await $content(route.path, { deep: true })
      .only(["title", "path", "tags", "createdAt"])
      .sortBy("createdAt")
      .fetch();

    return { postList };
  },
};
</script>
