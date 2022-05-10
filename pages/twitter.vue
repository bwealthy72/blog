<template>
  <div class="twitter-wrapper">
    <MacWindow windowWidth="300" windowHeight="700" uid="twitter">
      <div slot="body" class="twitter">
        <div class="user">
          <img class="user__profile" :src="user.profile_image_url" />
          <h2 class="user__name">{{ user.name }}</h2>
          <h3 class="user__uname">{{ user.username }}</h3>
          <p class="user__desc">{{ user.description }}</p>
          <div class="user__info">
            <div class="info">
              <p>{{ user.public_metrics.tweet_count }}</p>
              <p>Tweets</p>
            </div>
            <div class="info">
              <p>{{ user.public_metrics.followers_count }}</p>
              <p>Followers</p>
            </div>
            <div class="info">
              <p>{{ user.public_metrics.following_count }}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <section class="timeline">
          <a
            class="twitter-timeline"
            data-theme="dark"
            href="https://twitter.com/BlogWealthy?ref_src=twsrc%5Etfw"
            >Tweets</a
          >
        </section>
      </div>
    </MacWindow>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      script: [
        {
          async: true,
          src: "https://platform.twitter.com/widgets.js",
          charset: "utf-8",
        },
      ],
    };
  },
  transition(to, from) {
    return "app";
  },
  async asyncData() {
    const result = {};

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    };
    const user = await axios.get(
      "https://api.twitter.com/2/users/by/username/blogwealthy?user.fields=id,name,username,profile_image_url,location,url,description,public_metrics",
      headers
    );

    if (user.status == 200) {
      user.data.data.profile_image_url =
        user.data.data.profile_image_url.replace("_normal", "");
      result["user"] = user.data.data;
    }

    // const timeline = await axios.get(
    //   `https://api.twitter.com/2/users/${user.data.data.id}/tweets?max_results=5&exclude=replies,retweets&tweet.fields=created_at,text,referenced_tweets&media.fields=media_key, preview_image_url,type,url`,
    //   headers
    // );

    // if (timeline.status == 200) {
    //   for (const t of timeline.data.data.slice(0, 1)) {
    //     // console.log(t);
    //     // console.log(t.entities.urls);
    //   }
    //   result["timeline"] = timeline.data.data;
    //   console.log(result["timeline"]);
    // }

    return result;
  },
};
</script>
