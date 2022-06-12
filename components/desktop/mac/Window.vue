<template>
  <main class="mac-window" :style="windowStyle" @mousedown="moveStartWindow">
    <div class="mac-window__header" @dblclick.self="maxOrUnMax" ref="header">
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
      cursor: "default",

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
      interactMode: null,
      interactStartPos: {
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
        cursor: this.cursor,
      };
    },
  },
  watch: {
    windowStyle() {
      this.$store.commit("updateWindowPos", [
        this.name,
        [this.rect.x, this.rect.y],
      ]);
      this.$store.commit("updateWindowSize", [
        this.name,
        [this.rect.w, this.rect.h],
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
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  },

  beforeUnmount() {
    document.removeEventListener("mousemove", this.mouseMoveHandler);
    document.removeEventListener("mouseup", this.mouseUpHandler);
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
    resize(mode, newPt) {
      const [x, y] = newPt;
      const right = this.rect.x + this.rect.w;
      const bottom = this.rect.y + this.rect.h;

      // border radius로 인해 마우스가 이탈하면 커서가 바뀌지 않기 때문에 여분을 남긴다.
      const margin = 8;

      if (mode === "resize-tl") {
        this.rect = {
          x: x - margin,
          y: y - margin,
          w: right - x + margin,
          h: bottom - y + margin,
        };
      } else if (mode === "resize-tr") {
        this.rect.w = x - this.rect.x + margin;
        this.rect.h = bottom - y + margin;
        this.rect.y = y - margin;
      } else if (mode === "resize-bl") {
        this.rect.w = right - x + margin;
        this.rect.h = y - this.rect.y + margin;
        this.rect.x = x - margin;
      } else if (mode === "resize-br") {
        this.rect.w = x - this.rect.x + margin;
        this.rect.h = y - this.rect.y + margin;
      } else if (mode === "resize-t") {
        this.rect.h = bottom - y + margin;
        this.rect.y = y - margin;
      } else if (mode === "resize-b") {
        this.rect.h = y - this.rect.y;
      } else if (mode === "resize-l") {
        this.rect.w = right - x + margin;
        this.rect.x = x - margin;
      } else if (mode === "resize-r") {
        this.rect.w = x - this.rect.x;
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

    changePos(e) {
      const dx = e.clientX - this.interactStartPos.x;
      const dy = e.clientY - this.interactStartPos.y;

      this.rect.x += dx;
      this.rect.y += dy;

      if (this.rect.y < this.boundary.top) {
        this.rect.y = this.boundary.top;
      }

      this.interactStartPos = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    moveStartWindow(e) {
      const mp = this.checkMousePos(e);
      if (mp == null) {
        this.focus();
      } else if (mp == "head") {
        this.interactStartPos.x = e.clientX;
        this.interactStartPos.y = e.clientY;
        this.interactMode = "move";
        this.focus();
      } else if (mp && mp.startsWith("resize")) {
        this.interactMode = mp;
        this.changeResizeCursor(mp);
      }
    },
    mouseMoveHandler(e) {
      if (this.interactMode == null) {
        if (this.$store.state.focusedWindow === this.name) {
          const mp = this.checkMousePos(e);
          this.changeResizeCursor(mp);
        }
      } else if (this.interactMode == "move") {
        this.changePos(e);
      } else if (this.interactMode.startsWith("resize")) {
        this.resize(this.interactMode, [e.clientX, e.clientY]);
      }
    },
    mouseUpHandler(e) {
      if (this.interactMode == "move") {
        this.changePos(e);
      }
      this.interactMode = null;
      this.cursor = "default";
    },
    checkMousePos(e) {
      // 마우스 위치에 따라 윈도우의 동작을 달리한다.
      // 상하좌우, 대각선 끝 위치 (크기 조정)
      // 끝 위치를 제외하고 상단 (이동)
      const [x, y] = [e.clientX, e.clientY];
      const rect = this.$el.getBoundingClientRect();
      const windowHeaderBottom = this.$el
        .querySelector(".mac-window__header")
        .getBoundingClientRect().bottom;

      const error = 5; // 끝에서 어느 정도 오차까지 인정할지
      const edge = 10; // 어디까지 대각선 위치로 포함할지

      if (
        (Math.abs(x - rect.left) < edge && Math.abs(y - rect.top) < error) ||
        (Math.abs(x - rect.left) < error && Math.abs(y - rect.top) < edge)
      ) {
        return "resize-tl";
      } else if (
        (Math.abs(x - rect.right) < edge && Math.abs(y - rect.top) < error) ||
        (Math.abs(x - rect.right) < error && Math.abs(y - rect.top) < edge)
      ) {
        return "resize-tr";
      } else if (
        (Math.abs(x - rect.left) < edge && Math.abs(y - rect.bottom) < error) ||
        (Math.abs(x - rect.left) < error && Math.abs(y - rect.bottom) < edge)
      ) {
        return "resize-bl";
      } else if (
        (Math.abs(x - rect.right) < edge &&
          Math.abs(y - rect.bottom) < error) ||
        (Math.abs(x - rect.right) < error && Math.abs(y - rect.bottom) < edge)
      ) {
        return "resize-br";
      } else if (Math.abs(y - rect.top) < error) {
        return "resize-t";
      } else if (Math.abs(y - rect.bottom) < error) {
        return "resize-b";
      } else if (Math.abs(x - rect.left) < error) {
        return "resize-l";
      } else if (Math.abs(x - rect.right) < error) {
        return "resize-r";
      } else if (y < windowHeaderBottom) {
        return "head";
      }
    },
    changeResizeCursor(mousePos) {
      let cursor = "default";
      if (mousePos == "resize-tl" || mousePos == "resize-br") {
        cursor = "nwse-resize";
      } else if (mousePos == "resize-tr" || mousePos == "resize-bl") {
        cursor = "nesw-resize";
      } else if (mousePos == "resize-t" || mousePos == "resize-b") {
        cursor = "ns-resize";
      } else if (mousePos == "resize-l" || mousePos == "resize-r") {
        cursor = "ew-resize";
      }
      this.cursor = cursor;
    },
  },
};
</script>
