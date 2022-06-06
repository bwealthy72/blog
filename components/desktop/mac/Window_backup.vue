<template>
  <section
    class="mac-window"
    @mousedown="startDragWindow"
    @mousemove="dragMoveWindow"
    @mouseup="endDragWindow"
    :style="windowStyle"
  >
    <div
      class="mac-window__header"
      @dblclick.self="resetWindow"
      @mousedown.self="moveStart"
    >
      <DesktopMacWindowBtn
        @close="close"
        @minimize="minimize"
        @maximize="maximize"
      ></DesktopMacWindowBtn>
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
      headerHeight: null,

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

      // 창의 경계
      boundary: { top: 0, left: 0 },

      // 움직이고 있는지 여부
      isMoving: false,
      zIndex: 0,
      borderRadius: 0,

      // 홈으로 이동하기 위한 제스쳐 시작 위치(y)
      isMotionStart: false,
      motionStart: {
        y: null,
        top: null,
        left: null,
        width: null,
        height: null,
      },
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
        borderRadius: this.borderRadius + "px",
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
      this.width = this.windowWidth;
      this.height = this.windowHeight;
      this.top = this.boundary.top;
      this.left = this.boundary.left;
    }

    this.addEvents();
  },

  methods: {
    startDragWindow(e) {
      const y = e.layerY;

      if (y > window.innerHeight - this.homeMotionLimit) {
        this.isMotionStart = true;
        this.motionStart.y = y;
        this.motionStart.top = this.top;
        this.motionStart.left = this.left;
        this.motionStart.width = this.width;
        this.motionStart.height = this.height;
        this.borderRadius = 15;
      }
    },
    dragMoveWindow(e) {
      if (this.isMotionStart) {
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        const diff = window.innerHeight - y;
        this.width = window.innerWidth - (diff * 2) / 5;
        this.height = window.innerHeight - (diff * 7) / 5;
        this.left = x - this.width / 2;
        this.top = y - this.height;
      }
    },
    endDragWindow(e) {
      if (this.isMotionStart) {
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        const diff = window.innerHeight - y;
        if (diff > 150) {
          this.$router.push("/");
        } else {
          this.width = this.motionStart.width;
          this.height = this.motionStart.height;
          this.left = this.motionStart.left;
          this.top = this.motionStart.top;
        }

        this.isMotionStart = false;
        this.borderRadius = 0;
        document.querySelector(".site-header").style.opacity = 1;
        document.querySelector(".container .blur-bg").style.backdropFilter =
          "blur(0px)";
      }
    },
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

      return { top: headerHeight, left: dockRight };
    },
    activateAni() {
      this.$el.classList.add("animated");
      setTimeout(() => {
        this.$el.classList.remove("animated");
      }, 500);
    },

    close() {
      this.removeEvents();

      this.$router.push("/");
      // // https://stackoverflow.com/questions/40445125/how-can-component-delete-itself-in-vue-2-0
      // // destroy the vue listeners, etc
      // this.$destroy();

      // // remove the element from the DOM
      // this.$el.parentNode.removeChild(this.$el);
    },
    minimize() {
      this.close();
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
    resetWindow() {
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
