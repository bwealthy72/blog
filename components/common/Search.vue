<template>
  <div class="site-search">
    <input
      type="text"
      placeholder="Search"
      @keyup.enter="search"
      v-model="keyword"
      class="site-search__input"
    />
    <img
      @click="search"
      class="site-search__ico"
      src="~/assets/images/search.svg"
      alt=""
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: null,
    };
  },
  methods: {
    search() {
      if (this.keyword) {
        this.$router.push(`/search/${this.keyword}`);
      }
    },
  },
};
</script>
