<template>
  <div class="tags" v-if="tags">
    <img class="tags__ico" src="@/assets/images/tag.svg" alt="tag" />
    <ul class="tags__list">
      <li class="tags__item" v-for="tag of tags" :key="tag">
        <a :href="`/tag/${tag}`">
          {{ tag }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["tags"],
};
</script>
