<template>
  <div class="container">
    <layout-header></layout-header>
    <Dock></Dock>
    <nuxt />
    <layout-footer></layout-footer>
  </div>
</template>

<script>
export default {
  mounted() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-RXEC8C1Z2C");
  },
};
</script>
