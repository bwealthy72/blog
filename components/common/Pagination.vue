<template>
  <nav class="post-page">
    <ul class="post-page__list">
      <li class="post-page__item arrow">
        <a
          href="?page=1"
          class="post-page__link"
          :class="{ disabled: currPage == 1 }"
        >
          <img src="@/assets/images/arrow-left-double.svg" alt="start" />
        </a>
      </li>

      <li class="post-page__item arrow">
        <a
          :href="`?page=${Math.max(1, currPage - 1)}`"
          class="post-page__link"
          :class="{ disabled: currPage == 1 }"
        >
          <img src="@/assets/images/arrow-left.svg" alt="prev" />
        </a>
      </li>

      <!-- Number -->
      <li
        v-for="p of pages"
        :key="p"
        class="post-page__item num"
        :class="{ active: currPage == p }"
      >
        <a :href="`?page=${p}`" class="post-page__link">
          {{ p }}
        </a>
      </li>
      <!-- /Number -->

      <li class="post-page__item arrow">
        <a
          :href="`?page=${Math.min(totalPage, currPage + 1)}`"
          class="post-page__link"
          :class="{ disabled: currPage == totalPage }"
        >
          <img src="@/assets/images/arrow-right.svg" alt="next" />
        </a>
      </li>

      <li class="post-page__item arrow">
        <a
          :href="`?page=${totalPage}`"
          class="post-page__link"
          :class="{ disabled: currPage == totalPage }"
        >
          <img src="@/assets/images/arrow-right-double.svg" alt="end" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["totalPage", "currPage"],
  data() {
    return {
      surround: 2, // page 좌우 몇 개까지 나오게 할지
    };
  },
  computed: {
    pages() {
      let start = this.currPage - this.surround;
      let end = this.currPage + this.surround;
      if (start < 1) {
        start = 1;
        end = Math.min(this.totalPage, 1 + this.surround * 2);
      }
      if (end > this.totalPage) {
        end = this.totalPage;
        start = Math.max(1, this.totalPage - this.surround * 2);
      }
      const p = [];
      for (let i = start; i <= end; i++) {
        p.push(i);
      }
      return p;
    },
  },
};
</script>
