<template>
  <header class="site-header">
    <img class="main-logo" src="/favicon.ico" alt="logo" />
    <p class="main-title">{{ $store.state.title }}</p>
    <HeaderMusicPlayer></HeaderMusicPlayer>
    <!-- <HeaderTwitter></HeaderTwitter> -->
    <!-- <CommonSns></CommonSns> -->
    <p class="datetime">{{ datetime }}</p>
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
      let dateFormat = "%M월 %D일 (%d) %t  %h:%m";
      if (window.innerWidth < desktopWidth) {
        dateFormat = "%h:%m";
      }

      this.datetime = this.$dateFormat(new Date(), dateFormat);
    }, 1000);
  },
};
</script>
