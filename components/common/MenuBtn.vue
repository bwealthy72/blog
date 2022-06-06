<template>
  <button type="button" class="menu-btn" @click="click">1</button>
</template>

<script>
export default {
  methods: {
    click(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
.menu-btn {
  width: 100px;
  height: 30px;
}
</style>
