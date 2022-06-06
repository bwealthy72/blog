<template>
  <div class="menu-btn-group" @click="click">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    click(e) {
      console.log("클릭 그룹", e);
    },
  },
  mounted() {
    console.log(this.$el.children);
  },
};
</script>

<style></style>
