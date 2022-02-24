<template>
  <div class="site-ad">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-8123307370591079"
      :data-ad-slot="adslot"
      :data-ad-format="format"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  props: {
    format: {
      type: String,
      default: "auto",
    },
    adslot: {
      type: String,
      required: true,
    },
  },
  mounted() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Adsbygoogle error is ", error);
    }
  },
};
</script>
