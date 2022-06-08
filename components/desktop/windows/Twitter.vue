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
              {{ user.public_metrics ? user.public_metrics.tweet_count : "" }}
            </p>
            <p>Tweets</p>
          </div>
          <div class="info">
            <p>
              {{
                user.public_metrics ? user.public_metrics.followers_count : ""
              }}
            </p>
            <p>Followers</p>
          </div>
          <div class="info">
            <p>
              {{
                user.public_metrics ? user.public_metrics.following_count : ""
              }}
            </p>
            <p>Following</p>
          </div>
        </div>
      </div>
      <section class="timeline">
        <a
          class="twitter-timeline"
          data-theme="dark"
          href="https://twitter.com/BlogWealthy?ref_src=twsrc%5Etfw"
          data-chrome="noheader noborders transparent"
          data-align="center"
        ></a>
      </section>
    </div>
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
  data() {
    return {
      user: {},
      timeline: {},
    };
  },
  async fetch() {
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
      this.user = user.data.data;
    }

    const timeline = await axios.get(
      `https://api.twitter.com/2/users/${user.data.data.id}/tweets?max_results=5&expansions=attachments.media_keys&exclude=replies,retweets&tweet.fields=attachments,public_metrics,created_at,entities&media.fields=preview_image_url,type,url`,
      headers
    );

    if (timeline.status == 200) {
      for (const t of timeline.data.data) {
        const re = /(.*)(https:\/\/.*)/gm;
        const result = re.exec(t.text);
        if (result) {
          t.text = result[1];
          t.mediaURL = result[2];
        }
        if (t.entities) {
          for (const u of t.entities.urls) {
            t.text = t.text.replace(u.url, u.display_url);
          }
        }
        t.url = `https://twitter.com/${user.data.data.username}/status/${t.id}`;
        t.created_at = this.$dateFormat(
          new Date(t.created_at),
          "%Y. %M. %D %h:%m"
        );
      }
      this.timeline = timeline.data.data;
    }
  },
};
</script>
