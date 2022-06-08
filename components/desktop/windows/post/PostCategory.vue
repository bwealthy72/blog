<template>
  <aside class="post-cate">
    <h3 class="post-cate__title">Category</h3>
    <ul class="post-cate__list">
      <li class="post-cate__item" v-for="(post, path) in postPaths" :key="path">
        <NuxtLink :to="path" class="link" :class="activeCategory(path)">
          <img
            class="link__img"
            :src="require(`~/assets/images/post/${post.name}.png`)"
            alt="name"
          />
          <h3 class="link__category">{{ post.name }}</h3>
          <h4 class="link__length">{{ post.length }}</h4>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  computed: {
    postPaths() {
      return this.$store.state.postPaths;
    },
  },
  methods: {
    activeCategory(path) {
      const re = /\/post\/?\w*/gm;
      const result = re.exec(this.$route.path);
      let currPath = result ? result[0] : "";

      if (currPath == "/post") {
        currPath += "/all";
      }

      return { active: currPath == path };
    },
  },
};
</script>
