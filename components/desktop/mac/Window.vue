<template>
  <main class="mac-window" :style="windowStyle" @mousedown="focus">
    <div
      class="mac-window__header"
      @dblclick.self="maxOrUnMax"
      @mousedown="moveWindowStart"
    >
      <DesktopMacWindowBtn
        @close="close"
        @minimize="minimize"
        @maximize="maximize"
      ></DesktopMacWindowBtn>
    </div>

    <div class="mac-window__body">
      <slot name="body"></slot>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      // 최대화
      isMaximized: false,
      maximizeDuration: 0.3,

      // window
      rect: {
        x: 0,
        y: 0,
        w: this.width,
        h: this.height,
      },

      boundary: {
        top: 0,
        left: 0,
      },

      // Move
      isMoving: false,
      moveStartPos: {
        x: 0,
        y: 0,
      },
    };
  },

  computed: {
    windowStyle() {
      const r = this.rect;

      return {
        left: r.x + "px",
        top: r.y + "px",
        width: r.w + "px",
        height: r.h + "px",
        "z-index": this.zIndex,
      };
    },
  },
  watch: {
    windowStyle() {
      this.$store.commit("updateWindowPos", [
        this.name,
        [this.rect.x, this.rect.y],
      ]);
    },
  },

  created() {
    this.boundary.top = this.$getScssVariable("headerHeight");
    this.boundary.left =
      this.$getScssVariable("dockWidth") +
      this.$getScssVariable("dockWPad") * 2 +
      this.$getScssVariable("dockMarginLeft");

    const window = this.$store.state.windows[this.name];

    if (window.x == -1 && window.y == -1) {
      this.rect.x = this.boundary.left;
      this.rect.y = this.boundary.top;
    } else {
      this.rect.x = window.x;
      this.rect.y = window.y;
    }
  },
  mounted() {
    document.addEventListener("mousemove", this.moveWindow);
    document.addEventListener("mouseup", this.moveWindowEnd);
  },

  beforeUnmount() {
    document.removeEventListener("mousemove", this.moveWindow);
    document.removeEventListener("mouseup", this.moveWindowEnd);
  },

  methods: {
    close() {
      this.$store.commit("closeWindow", this.name);
    },
    minimize() {
      this.close();
    },
    maximize() {
      if (!this.isMaximized) {
        this.windowRectBackup = this.$deepCopy(this.rect);

        this.rect = {
          x: this.boundary.left,
          y: this.boundary.top,
          w: window.innerWidth - this.boundary.left,
          h: window.innerHeight - this.boundary.top,
        };

        this.playAni();
        this.isMaximized = true;
      }
    },
    focus() {
      this.$store.commit("focusWindow", this.name);
    },
    unMaximize() {
      this.rect = this.$deepCopy(this.windowRectBackup);
      this.playAni();
      this.isMaximized = false;
    },
    maxOrUnMax() {
      if (this.isMaximized) {
        this.unMaximize();
      } else {
        this.maximize();
      }
    },
    playAni() {
      // 잠시 transition 값을 넣고 해당 값까지 transtion이 되도록 한다.
      this.$el.classList.add("animated");
      setTimeout(() => {
        this.$el.classList.remove("animated");
      }, this.maximizeDuration * 1000);
    },
    moveWindowStart(e) {
      this.moveStartPos.x = e.clientX;
      this.moveStartPos.y = e.clientY;
      this.isMoving = true;
    },
    changePos(e) {
      if (this.isMoving) {
        const dx = e.clientX - this.moveStartPos.x;
        const dy = e.clientY - this.moveStartPos.y;

        this.rect.x += dx;
        this.rect.y += dy;

        if (this.rect.y < this.boundary.top) {
          this.rect.y = this.boundary.top;
        }

        this.moveStartPos = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    },
    moveWindow(e) {
      this.changePos(e);
    },
    moveWindowEnd(e) {
      this.changePos(e);
      this.isMoving = false;
    },
  },
};
</script>
