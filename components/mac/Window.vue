<template>
  <section class="mac-window" :style="windowStyle">
    <div
      class="mac-window__header"
      @dblclick.self="returnInitialPos"
      @mousedown.self="moveStart"
    >
      <MacWindowBtn
        @close="close"
        @minimize="minimize"
        @maximize="maximize"
      ></MacWindowBtn>
      <slot name="header"></slot>
    </div>

    <div class="mac-window__body">
      <slot name="body"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    windowWidth: {
      default: null,
    },
    windowHeight: {
      default: null,
    },
    uid: {},
  },
  data() {
    return {
      isMaximized: false,
      // 최대화 하기 전 위치와 크기
      initial: { x: null, y: null, w: null, h: null },
      // 움직일 때 시작 좌표( 움직이면서 계속 변경 )
      startX: 0,
      startY: 0,
      // 창 위치 크기
      top: 0,
      left: 0,
      width: null,
      height: null,
      // 창이 있어도 되는 경계
      boundary: { top: 0, left: 0, right: 5000, bottom: 5000 },
      // 움직이고 있는지 여부
      isMoving: false,
      zIndex: 0,
    };
  },
  computed: {
    windowStyle() {
      const style = {
        top: this.top + "px",
        left: this.left + "px",
        width: this.width ? this.width + "px" : "auto",
        height: this.height ? this.height + "px" : "auto",
        "z-index": this.zIndex,
      };

      return style;
    },
  },
  watch: {
    top() {
      this.updateInfo();
    },
    left() {
      this.updateInfo();
    },
    width() {
      this.updateInfo();
    },
    height() {
      this.updateInfo();
    },
  },
  mounted() {
    this.boundary = this.getBoundary();
    const prevWindow = this.$store.state.windows[this.uid];
    if (prevWindow) {
      this.width = prevWindow.width;
      this.height = prevWindow.height;
      this.top = prevWindow.top;
      this.left = prevWindow.left;
    } else {
      this.width = this.windowWidth ? this.windowWidth : null;
      this.height = this.windowHeight ? this.windowHeight : null;

      this.top = this.boundary.top;
      this.left = this.boundary.left;
    }

    this.addEvents();
  },

  methods: {
    updateInfo() {
      this.$store.commit("saveWindows", {
        uid: this.uid,
        top: this.top,
        left: this.left,
        width: this.width,
        height: this.height,
      });
    },
    addEvents() {
      document.addEventListener("mousemove", this.moving);
      document.addEventListener("mouseup", this.moveEnd);
    },
    removeEvents() {
      document.removeEventListener("mousemove", this.moving);
      document.removeEventListener("mouseup", this.moveEnd);
    },
    getBoundary() {
      const headerHeight = document
        .querySelector(".site-header")
        .getBoundingClientRect().height;
      const dockRight = document
        .querySelector(".dock")
        .getBoundingClientRect().right;

      return {
        top: headerHeight,
        left: dockRight,
        right: window.innerWidth,
        bottom: window.innerHeight,
      };
    },
    activateAni() {
      this.$el.classList.add("animated");
      setTimeout(() => {
        this.$el.classList.remove("animated");
      }, 500);
    },

    close() {
      this.removeEvents();
      // https://stackoverflow.com/questions/40445125/how-can-component-delete-itself-in-vue-2-0
      // destroy the vue listeners, etc
      this.$destroy();

      // remove the element from the DOM
      this.$el.parentNode.removeChild(this.$el);
    },
    minimize() {
      this.close();
    },
    returnInitialPos() {
      if (this.isMaximized) {
        this.left = this.initial.x;
        this.top = this.initial.y;
        this.width = this.initial.w;
        this.height = this.initial.h;
        this.activateAni();
        this.isMaximized = false;
      } else {
        this.maximize();
      }
    },
    maximize() {
      if (window) {
        if (!this.isMaximized) {
          this.initial = {
            x: this.left,
            y: this.top,
            w: this.width,
            h: this.height,
          };

          this.left = this.boundary.left;
          this.top = this.boundary.top;
          this.width = window.innerWidth - this.boundary.left;
          this.height = window.innerHeight - this.boundary.top;
          this.activateAni();
          this.isMaximized = true;
        }
      }
    },
    moveStart(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.isMoving = true;
    },
    changePos(e) {
      if (this.isMoving) {
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        this.left += dx;
        this.top += dy;
        const headerHeight = this.$getScssVariable("headerHeight");
        if (this.top < headerHeight) {
          this.top = headerHeight;
        }

        this.startX = e.clientX;
        this.startY = e.clientY;
      }
    },

    moving(e) {
      this.changePos(e);
    },
    moveEnd(e) {
      this.changePos(e);
      this.isMoving = false;
    },
  },
};
</script>
