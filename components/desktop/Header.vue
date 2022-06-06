<template>
  <header class="site-header">
    <NuxtLink to="/">
      <img class="main-logo" src="@/assets/images/apple-ico.svg" alt="logo" />
    </NuxtLink>
    <p class="main-title">{{ title }}</p>
    <MusicPlayer></MusicPlayer>
    <p class="datetime">{{ datetime }}</p>
  </header>
</template>

<script>
import MusicPlayer from "./header/MusicPlayer.vue";

export default {
  data() {
    return {
      datetime: null,
    };
  },
  computed: {
    title() {
      return this.$route.name || "";
    },
  },
  mounted() {
    let dateFormat = "%M월 %D일 (%d) %t  %h:%m";
    this.datetime = this.$dateFormat(new Date(), dateFormat);
    setInterval(() => {
      this.datetime = this.$dateFormat(new Date(), dateFormat);
    }, 1000);
  },
  components: { MusicPlayer },
};
</script>
