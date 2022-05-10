<template>
  <div class="container">
    <keep-alive>
      <CommonDock></CommonDock>
    </keep-alive>
    <keep-alive>
      <LayoutHeader></LayoutHeader>
    </keep-alive>
    <Nuxt />
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.commit(
      "setIsMobile",
      window.innerWidth < this.$getScssVariable("desktopWidth")
    );
  },
};
</script>
