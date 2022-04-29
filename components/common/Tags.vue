<template>
  <div class="tags" v-show="tags">
    <img class="tags__ico" src="@/assets/images/tag.svg" alt="tag" />
    <ul class="tags__list">
      <li class="tags__item" v-for="tag of tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["tags"],
};
</script>
