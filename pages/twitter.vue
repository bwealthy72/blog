<template>
  <div class="twitter-wrapper">
    <MacWindow windowWidth="500" windowHeight="500" uid="twitter">
      <div slot="body" class="twitter"></div>
    </MacWindow>
  </div>
</template>

<script>
export default {
  transition(to, from) {
    return "app";
  },
};
</script>
