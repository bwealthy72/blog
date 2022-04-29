<template>
  <div class="img-wrapper">
    <div
      class="lightbox"
      :class="{ active, zoom }"
      @click="lbClick"
      v-show="active"
    >
      <img
        class="lightbox__img fade-img"
        @click.stop="lbImgClick"
        :src="src"
        :alt="alt"
      />
    </div>

    <img
      :src="`${src}?nf_resize=fit&w=527&h=500`"
      :alt="alt"
      class="post-img"
      @click="imgClick"
    />
  </div>
</template>

<script>
export default {
  props: ["src", "alt"],
  data() {
    return {
      active: false,
      zoom: false,
    };
  },

  methods: {
    imgClick(e) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.height = "100%";
      this.active = true;
    },
    lbClick() {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector("body").style.height = "";
      this.active = false;
      this.zoom = false;
    },
    lbImgClick() {
      this.zoom = !this.zoom;
    },
  },
};
</script>
