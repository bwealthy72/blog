<template>
  <header class="site-header">
    <NuxtLink to="/">
      <img class="main-logo" src="/favicon.ico" alt="logo" />
    </NuxtLink>
    <p class="main-title">{{ title }}</p>
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
  computed: {
    title() {
      return this.$store.state.title ? this.$store.state.title : "";
    },
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
