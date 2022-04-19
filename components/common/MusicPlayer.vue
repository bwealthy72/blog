<template>
  <div class="music-player">
    <div class="music-player__info">
      <p class="name">Dog and Pony Show</p>
      <p class="artist">Silent Partner</p>
      <div class="progress">
        <div class="progress__current" :style="{ width: progressBar }"></div>
      </div>
      <div class="time">
        <p class="time__curr">{{ currentTime }}</p>
        <p class="time__total">{{ totalTime }}</p>
      </div>
    </div>
    <button
      class="music-player__btn"
      :class="{ playing: isPlaying }"
      @click="playOrPause"
    ></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: null,
      isPlaying: false,
      progressBar: "0",
      currentTime: "00:00",
      totalTime: "00:00",
      track: [
        {
          name: "Dog and Pony Show",
          artist: "Silent Partner",
          src: "/audio/bgm.mp3",
        },
      ],
      trackIdx: 0,
    };
  },
  methods: {
    calcCurrTime() {
      const width = (100 / this.audio.duration) * this.audio.currentTime;
      this.progressBar = width + "%";

      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.currentTime = curmin + ":" + cursec;
      this.totalTime = durmin + ":" + dursec;

      this.isPlaying = !this.audio.paused;
    },
    playOrPause() {
      if (!this.isPlaying) {
        this.audio.play();
        this.isPlaying = true;
        window.sessionStorage.setItem("audioPlaying", true);
      } else {
        this.audio.pause();
        this.isPlaying = false;
        window.sessionStorage.setItem("audioPlaying", false);
      }
    },
  },
  mounted() {
    this.audio = new Audio("/audio/bgm.mp3");
    console.log("Audio", this.audio);
    this.audio.ontimeupdate = this.calcCurrTime;
    this.audio.onloadmetadata = this.calcCurrTime;

    if (JSON.parse(window.sessionStorage.getItem("audioPlaying"))) {
      this.playOrPause();
    }
  },
};
</script>
