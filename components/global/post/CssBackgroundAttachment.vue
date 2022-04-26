<template>
  <div class="bg-attach">
    <div class="bg-attach__group">
      <div
        v-for="item of atItem"
        :key="item"
        class="bg-attach__item"
        :style="{ 'background-attachment': item }"
      >
        <div class="guide" v-for="i of 7" :key="i">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atItem: ["fixed", "scroll", "local"],
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-attach {
  height: 300px;
  &__title {
    font-size: 20px;
    text-align: center;
  }

  &__group {
    display: flex;
    height: 100%;
    gap: 20px;
  }

  &__item {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    border: 1px solid black;
    background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IU_in_%22Love_Poem%22_Concert_in_Seoul_on_23rd_November_2019.jpg/500px-IU_in_%22Love_Poem%22_Concert_in_Seoul_on_23rd_November_2019.jpg);
    background-size: auto;
    background-position: top;

    .guide {
      padding: 5px 10px;
      border: 1px solid black;
      border-radius: 7px;
      width: fit-content;
      margin: 50px auto;
      opacity: 0.7;
      &:nth-of-type(1) {
        background-color: red;
      }
      &:nth-of-type(2) {
        background-color: orange;
      }
      &:nth-of-type(3) {
        background-color: yellow;
      }
      &:nth-of-type(4) {
        background-color: green;
      }
      &:nth-of-type(5) {
        background-color: blue;
      }
      &:nth-of-type(6) {
        background-color: navy;
      }
      &:nth-of-type(7) {
        background-color: purple;
      }
    }
  }
  &::-webkit-scrollbar,
  &__item::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb,
  &__item::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track,
  &__item::-webkit-scrollbar-track {
    background-color: transparent;
  }
}
</style>
