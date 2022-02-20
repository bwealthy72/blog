<template>
  <a :href="src">
    <img :src="`${src}?nf_resize=fit&w=527&h=500`" :alt="alt" />
  </a>
</template>

<script>
export default {
  props: ["src", "alt"],
};
</script>
