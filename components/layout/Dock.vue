<template>
  <nav class="site-dock">
    <ul id="dock" class="dock" @mouseleave="mouseLeave" @mousemove="mouseMove">
      <li
        v-for="(name, path, idx) of $store.state.routePaths"
        :key="path"
        class="dock__item"
      >
        <NuxtLink class="link" :to="path">
          <img
            :src="loadImage(name)"
            :alt="name"
            class="ico"
            @mousemove.self="$set(flags, idx, true)"
            @mouseleave.self="$set(flags, idx, false)"
          />
          <div class="info" :class="{ active: flags[idx] }">
            <h3 class="info__name">
              {{ name }}
            </h3>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      aniID: null,
      flags: [],
      widths: [],
      speed: 4,
      scale: 2.4,
    };
  },
  created() {
    const dockWidth = this.$getScssVariable("dockWidth");
    for (const c in this.$store.state.routePaths) {
      this.flags.push(false);
      this.widths.push(dockWidth);
    }
  },
  methods: {
    loadImage(name) {
      return require(`~/assets/images/dock/${name}.png`);
    },
    mouseLeave() {
      // 이전 애니메이션 취소
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      const dockWidth = this.$getScssVariable("dockWidth");

      // 이벤트가 끝나도 계속 실행할 지 여부 = 모두 정상크기로 돌아왔는지
      let allDone = true;
      this.$el.querySelectorAll(".dock__item .ico").forEach((v, i) => {
        if (this.widths[i] > dockWidth) {
          this.widths[i] = Math.max(dockWidth, this.widths[i] - this.speed);
          v.style.width = `${this.widths[i]}px`;
          v.style.height = `${this.widths[i]}px`;
          allDone = false;
        }
      });

      if (!allDone) {
        this.aniID = window.requestAnimationFrame(this.mouseLeave);
      }
    },
    mouseMove(e) {
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      const dockWidth = this.$getScssVariable("dockWidth");

      const dockRect = e.target.getBoundingClientRect();
      const y = e.clientY - dockRect.top;

      let allDone = true;
      this.$el.querySelectorAll(".dock__item .ico").forEach((d, i) => {
        const itemRect = d.getBoundingClientRect();
        const itemHeight = itemRect.height / 2;

        const itemTop = itemRect.top - dockRect.top;
        const itemCenter = itemTop + itemHeight / 2;
        const distFromItem = Math.abs(itemCenter - y);

        // 해당 dock item이 가져야할 width
        // 거리가 멀어짐에 따라 크기가 작아야한다.
        const goalWidth = Math.round(
          Math.max(
            dockWidth,
            dockWidth * this.scale - Math.max(0, distFromItem / 3)
          )
        );

        // goal 보다 크면 줄이고 작으면 키운다.
        // 같으면 놔두기
        if (this.widths[i] < goalWidth) {
          this.widths[i] = Math.min(goalWidth, this.widths[i] + this.speed);
          allDone = false;
        } else if (this.widths[i] > goalWidth) {
          this.widths[i] = Math.max(goalWidth, this.widths[i] - this.speed);
          allDone = false;
        }
        // 길이 반영
        d.style.width = `${this.widths[i]}px`;
        d.style.height = `${this.widths[i]}px`;
      });
      if (!allDone) {
        this.aniID = window.requestAnimationFrame(() => {
          this.mouseMove(e);
        });
      }
    },
  },
};
</script>
