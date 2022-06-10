<template>
  <div class="twitter-wrapper">
    <div class="twitter">
      <div class="user">
        <a class="user__profile" :href="`https://twitter.com/${user.username}`">
          <img :src="user.profile_image_url" />
        </a>

        <a :href="`https://twitter.com/${user.username}`">
          <h2 class="user__name">{{ user.name }}</h2>
          <h3 class="user__uname">{{ user.username }}</h3>
          <p class="user__desc">{{ user.description }}</p>
        </a>

        <div class="user__follow">
          <a
            class="twitter-follow-button"
            data-show-count="false"
            :href="`https://twitter.com/${user.username}`"
          ></a>
        </div>

        <div class="user__info">
          <div class="info">
            <p>
              {{ user.public_metrics.tweet_count }}
            </p>
            <p>Tweets</p>
          </div>
          <div class="info">
            <p>
              {{ user.public_metrics.followers_count }}
            </p>
            <p>Followers</p>
          </div>
          <div class="info">
            <p>
              {{ user.public_metrics.following_count }}
            </p>
            <p>Following</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
    };
  },
  computed: {
    user() {
      let user = {
        username: "",
        name: "",
        description: "",
        public_metrics: {
          tweet_count: 0,
          followers_count: 0,
          following_count: 0,
        },
        ...this.userData,
      };
      return user;
    },
  },
  async fetch() {
    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    };
    const userResp = await axios.get(
      "https://api.twitter.com/2/users/by/username/blogwealthy?user.fields=id,name,username,profile_image_url,location,url,description,public_metrics",
      headers
    );
    if (userResp.status == 200) {
      userResp.data.data.profile_image_url =
        userResp.data.data.profile_image_url.replace("_normal", "");
      this.userData = userResp.data.data;
    }
  },
};
</script>
