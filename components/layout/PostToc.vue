<template>
  <nav class="toc-wrapper" v-if="toc.length > 0">
    <div class="toc">
      <h2 class="toc__title">Table of Content</h2>
      <ul class="toc__list">
        <li v-for="t of toc" :key="t.id" :class="`h${t.depth}`">
          <a :href="`#${t.id}`">
            {{ t.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      default: [],
    },
  },
};
</script>
