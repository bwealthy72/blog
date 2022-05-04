<template>
  <div class="music-player">
    <button class="header-icon">
      <img src="~/assets/images/audio/music.png" />
    </button>

    <div class="window" v-show="showPlayer">
      <img
        class="window__background"
        v-show="track[trackIdx].image"
        :src="track[trackIdx].image"
      />
      <div class="window__info">
        <div class="img" :class="{ playing: isPlaying }">
          <img v-show="track[trackIdx].image" :src="track[trackIdx].image" />
        </div>
        <h2 class="title">{{ track[trackIdx].title }}</h2>
        <p class="artist">{{ track[trackIdx].artist }}</p>
      </div>
      <div class="window__progress" @mousedown.self="progressControl">
        <div class="curr-bar" :style="{ width: progressBar + '%' }"></div>
        <div class="curr-dot" :style="{ left: progressBar + '%' }"></div>
      </div>
      <div class="window__time">
        <p class="curr-time">{{ currentTime }}</p>
        <p class="total-time">{{ totalTime }}</p>
      </div>
      <div class="window__btns">
        <button class="btn prev" @click="prevTrack">
          <img src="~/assets/images/audio/prev.svg" />
        </button>
        <button class="btn play" @click="play">
          <img src="~/assets/images/audio/play.svg" v-show="!isPlaying" />
          <img
            class="pause-img"
            src="~/assets/images/audio/pause.svg"
            v-show="isPlaying"
          />
        </button>
        <button class="btn next" @click="nextTrack">
          <img src="~/assets/images/audio/next.svg" />
        </button>
      </div>
      <div class="window__sound">
        <img class="sound-ico" src="~/assets/images/audio/mute.svg" />
        <div class="sound-bar" @mousedown.self="volumeControl">
          <div class="curr-bar" :style="{ width: volume * 100 + '%' }"></div>
          <div class="curr-dot" :style="{ left: volume * 100 + '%' }"></div>
        </div>
        <img class="sound-ico" src="~/assets/images/audio/fullsound.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      track: [
        {
          title: "별의 다과회(星茶会)",
          artist: "Kuroba",
          src: "/audio/별의다과회.mp3",
          image: require("~/assets/images/audio/track/별의다과회.png"),
        },
        {
          title: "Flowering (너로 피어오라)",
          artist: "릴파 (Lilpa)",
          src: "/audio/너로피어오라.mp3",
          image: require("~/assets/images/audio/track/너로피어오라.jpeg"),
        },
      ],
      showPlayer: false,
      trackIdx: 0,
      audio: null,
      progressBar: 0,
      isCurrTimeChanging: false,
      currentTime: "00:00",
      totalTime: "00:00",
      isPlaying: false,
      volume: 0.3,
      isVolumeChanging: false,
    };
  },

  methods: {
    calcCurrTime() {
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

      this.progressBar = (100 / this.audio.duration) * this.audio.currentTime;
    },
    play() {
      if (!this.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.isPlaying = !this.isPlaying;
    },
    firstPlay() {
      if (!this.isPlaying) {
        this.play();
      }
    },
    prevTrack() {
      this.trackIdx =
        this.trackIdx - 1 < 0 ? this.track.length - 1 : this.trackIdx - 1;
    },
    nextTrack() {
      this.trackIdx = (this.trackIdx + 1) % this.track.length;
      if (this.track.length == 1) {
        this.audio.currentTime = 0;
        this.audio.load();
        this.audio.play();
      }
    },
    progressControl(e) {
      const rect = e.target.getBoundingClientRect();

      const changeCurrTime = (e) => {
        let percent = 0;
        if (e.clientX < rect.left) {
          percent = 0;
        } else if (rect.right < e.clientX) {
          percent = 0.99;
        } else {
          percent = (e.clientX - rect.left) / rect.width;
        }

        this.audio.pause();
        this.audio.currentTime = this.audio.duration * percent;
      };
      const _checkEnd = (e) => {
        this.audio.play();

        window.removeEventListener("mousemove", changeCurrTime);
        window.removeEventListener("mouseup", _checkEnd);
      };

      changeCurrTime(e);
      window.addEventListener("mousemove", changeCurrTime);
      window.addEventListener("mouseup", _checkEnd);
    },
    volumeControl(e) {
      const rect = e.target.getBoundingClientRect();
      const changeVolume = (e) => {
        if (e.clientX < rect.left) {
          this.volume = 0;
        } else if (rect.right < e.clientX) {
          this.volume = 1;
        } else {
          this.volume = (e.clientX - rect.left) / rect.width;
        }
      };
      const _checkEnd = (e) => {
        window.removeEventListener("mousemove", changeVolume);
        window.removeEventListener("mouseup", _checkEnd);
      };

      changeVolume(e);
      window.addEventListener("mousemove", changeVolume, { passive: true });
      window.addEventListener("mouseup", _checkEnd, { passive: true });
    },
    onended() {
      this.nextTrack();
    },
    ontimeupdate() {
      this.calcCurrTime();
    },
    onloadedmetadata() {
      this.calcCurrTime();
    },
    showOrHide(e) {
      const rect = this.$el.querySelector(".window").getBoundingClientRect();
      const icoRect = this.$el
        .querySelector(".header-icon")
        .getBoundingClientRect();

      if (
        e.clientX >= icoRect.left &&
        e.clientX <= icoRect.right &&
        e.clientY >= icoRect.top &&
        e.clientY <= icoRect.bottom
      ) {
        if (!this.showPlayer) {
          this.showPlayer = true;
        } else {
          this.showPlayer = false;
        }
        return;
      }

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        this.showPlayer = false;
      }
    },
  },
  watch: {
    trackIdx(v) {
      this.audio.src = this.track[v].src;
      this.audio.load();
      this.audio.play();
    },
    volume(v) {
      this.audio.volume = this.volume;
    },
  },
  mounted() {
    this.audio = new Audio(this.track[this.trackIdx].src);
    this.audio.ontimeupdate = this.ontimeupdate;
    this.audio.onloadedmetadata = this.onloadedmetadata;
    this.audio.onended = this.onended;
    this.audio.volume = this.volume;

    window.addEventListener("click", this.firstPlay, { once: true });
    window.addEventListener("mousedown", this.showOrHide);
  },
};
</script>
