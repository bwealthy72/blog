<template>
  <div class="home-wrapper">
    <div class="mobile">
      <ul class="apps">
        <li class="apps__item" v-for="(app, key) in apps" :key="key">
          <NuxtLink class="link" :to="app.to">
            <div class="link__icon">
              <img class="link__img" :src="app.img" :alt="app.name" />
              <p class="link__name">{{ app.name }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  transition: "app",
  computed: {
    apps() {
      return this.$store.state.apps;
    },
  },
  async created() {
    // axios.get(
    //   "/api/test",
    //   // "https://api.twitter.com/2/users/by/blogwealthy?usernames=twitterdev,twitterapi,adsapi&user.fields=created_at&expansions=pinned_tweet_id&tweet.fields=author_id,created_at",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    //     },
    //   }
    // );

    const data = await axios.get("https://api.hnpwa.com/v0/news/1.json");
    console.log(data);
  },
};
</script>
