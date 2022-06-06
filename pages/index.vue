<template>
  <div class="home-wrapper">
    <button type="button" @click="click">추가추가</button>
    <DesktopMacWindow
      v-for="(w, i) of windows"
      :key="i"
      :width="300"
      :height="300"
      uid="test"
    >
      <component :is="w"></component>
    </DesktopMacWindow>
  </div>
</template>

<script>
import TestComp from "~/components/TestComp.vue";
export default {
  data() {
    return {
      windows: [],
    };
  },
  components: { TestComp },
  methods: {
    click() {
      this.windows.push("TestComp");
    },
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 40px;
  background-color: gray;
  color: white;
}
</style>
