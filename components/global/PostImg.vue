<template>
  <a :href="src">
    <nuxt-img :src="src"></nuxt-img>
  </a>
</template>

<script>
export default {
  props: ["src"],
};
</script>
