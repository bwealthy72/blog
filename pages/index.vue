<template>
  <!-- <div class="home-wrapper">
    <div class="mobile">
      <ul class="apps">
        <li class="apps__item" v-for="(name, path) in appPaths" :key="path">
          <NuxtLink class="link" :to="path">
            <img class="link__img" :src="loadImage(name)" :alt="name" />
            <p class="link__name">{{ name }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div> -->

  <div></div>
</template>

<script>
export default {};

// export default {
//   methods: {
//     loadImage(name) {
//       return require(`~/assets/images/dock/${name}.png`);
//     },
//   },
//   computed: {
//     appPaths() {
//       const a = JSON.parse(JSON.stringify(this.$store.state.appPaths));
//       delete a["/"];

//       return a;
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.test1 {
  width: 500px;
  height: 600px;
}
.test2 {
  width: 300px;
  height: 300px;
}
.test3 {
  width: 400px;
  height: 200px;
}
</style>
