<template>
  <ul class="sns">
    <li class="sns__item" v-for="(v, k) in sns" :key="k">
      <a :href="v.link">
        <img :src="v.img" :alt="k" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      sns: {
        gmail: {
          img: require("@/assets/images/sns/gmail.svg"),
          link: "mailto:bwealthy72@gmail.com",
        },
        youtube: {
          img: require("@/assets/images/sns/youtube.svg"),
          link: "https://www.youtube.com/channel/UC3v_FOvgnU77TaPqKpCPUBw",
        },
        instagram: {
          img: require("@/assets/images/sns/instagram.svg"),
          link: "https://www.instagram.com/blogwealthy",
        },
        twitter: {
          img: require("@/assets/images/sns/twitter.svg"),
          link: "https://twitter.com/BlogWealthy",
        },
      },
    };
  },
};
</script>

<style></style>
