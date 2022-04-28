<template>
  <header class="m-header">
    <div class="m-header__group">
      <p class="datetime">{{ datetime }}</p>
    </div>
    <div class="m-header__group right"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      datetime: null,
    };
  },
  created() {
    this.datetime = this.$dateFormat(new Date(), "%h:%m");
    setInterval(() => {
      this.datetime = this.$dateFormat(new Date(), "%h:%m");
    }, 1000);
  },
};
</script>

<style></style>
