<template>
  <header class="site-header">
    <div class="site-header__group">
      <img class="main-logo" src="/favicon.ico" alt="logo" />
      <p class="main-title">Frontend Blogger</p>
    </div>
    <div class="site-header__group right">
      <CommonSns></CommonSns>
      <p class="datetime">{{ datetime }}</p>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      datetime: null,
    };
  },
  mounted() {
    const desktopWidth = this.$getScssVariable("desktopWidth");

    let dateFormat = "%M월 %D일 (%d) %t  %h:%m";
    if (window.innerWidth < desktopWidth) {
      dateFormat = "%h:%m";
    }

    this.datetime = this.$dateFormat(new Date(), dateFormat);
    setInterval(() => {
      this.datetime = this.$dateFormat(new Date(), dateFormat);
    }, 1000);
  },
};
</script>
