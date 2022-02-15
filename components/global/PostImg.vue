<template>
  <a :href="src">
    <nuxt-img :src="src" :alt="alt"></nuxt-img>
  </a>
</template>

<script>
export default {
  props: ["src", "alt"],
};
</script>
