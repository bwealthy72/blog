<template>
  <nav class="dock" @mousemove="mouseMove" @mouseleave="mouseLeave">
    <div
      class="dock__item"
      v-for="(app, key, idx) in apps"
      :key="key"
      @click="openWindow(app.name)"
    >
      <img
        :src="app.img"
        :alt="app.name"
        :style="icoWidth.length > 0 ? { width: icoWidth[idx] + 'px' } : null"
        @mouseover="$set(nameShow, idx, true)"
        @mouseleave="$set(nameShow, idx, false)"
        class="dock__ico"
        ref="apps"
      />
      <div class="dock__name" v-show="nameShow[idx]">
        {{ app.name }}
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dockWidth: null,
      icoWidth: [],
      nameShow: [],
      animationId: null,
      speed: 5,
      goalWidth: 80,
    };
  },
  computed: {
    apps() {
      return this.$store.state.apps;
    },
  },
  created() {
    this.dockWidth = this.$getScssVariable("dockWidth");
    for (const c in this.apps) {
      this.icoWidth.push(this.dockWidth);
    }
  },
  methods: {
    openWindow(name) {
      this.$store.commit("openWindow", name);
    },
    changeIcoWidth(goalWidths) {
      // 움직이고 있던 애니메이션 제거
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;

      let isAllDone = true;
      this.$refs.apps.forEach((appEl, idx) => {
        // 목표 크기와 현재 크기를 비교해서
        // 차이가 나면 일정 값을 더하거나 빼서 그 값에 가깝게 한다.
        let changedWidth = null;
        if (goalWidths[idx] < this.icoWidth[idx]) {
          changedWidth = Math.max(
            this.icoWidth[idx] - this.speed,
            goalWidths[idx]
          );
        } else if (goalWidths[idx] > this.icoWidth[idx]) {
          changedWidth = Math.min(
            this.icoWidth[idx] + this.speed,
            goalWidths[idx]
          );
        }

        if (changedWidth) {
          // 변화를 감지해야 리렌더링하기 때문에 $set 함수를 사용
          this.$set(this.icoWidth, idx, changedWidth);
          isAllDone = false;
        }
      });

      // 모두 끝날 때까지 계속 다시 animation 실행
      if (!isAllDone) {
        this.animationId = window.requestAnimationFrame(() => {
          this.changeIcoWidth(goalWidths);
        });
      }
    },

    mouseLeave(e) {
      // 원래 크기로 되돌림
      const goalWidths = [];
      for (const appEl of this.$refs.apps) {
        goalWidths.push(this.dockWidth);
      }

      this.changeIcoWidth(goalWidths);
    },

    mouseMove(e) {
      // Dock 안에서의 마우스의 위치를 구한다.
      const dockRect = e.target.getBoundingClientRect();
      const y = e.clientY - dockRect.top;

      const goalWidths = [];
      for (const appEl of this.$refs.apps) {
        // 각 app 아이콘에서 중심 위치를 구한다.
        const rect = appEl.getBoundingClientRect();
        const center = rect.top - dockRect.top + rect.height / 2;

        // 목표크기에서 (거리 / 3) 의 크기를 뺀다.
        // 가까울 수록 목표크기에 가까울 것이다.
        const dist = Math.abs(center - y);
        goalWidths.push(Math.max(this.goalWidth - dist / 3, this.dockWidth));
      }

      // 목표 크기에 맞게 아이콘 크기를 변경한다.
      this.changeIcoWidth(goalWidths);
    },
  },
};
</script>
