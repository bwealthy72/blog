<template>
  <div class="shadow-box">
    <div class="shadow-box__sample">
      <div class="text">Hello</div>
      <img class="img" src="@/assets/images/search.svg" alt="" />
    </div>

    <div class="shadow-box__ctrls">
      <div
        class="ctrl"
        v-for="(shadow, key) in shadowItems"
        :key="key"
        :class="key"
      >
        <div class="ctrl__title">{{ key }}</div>
        <div class="ctrl__list" v-for="(val, name) in shadow" :key="name">
          <label class="ctrl__item" v-if="name != 'color'">
            <span class="ctrl__name"> {{ name }} : {{ val }}px</span>
            <input
              class="ctrl__bar"
              :data-shadow="key"
              type="range"
              :name="name"
              :min="name == 'blur' || name == 'spread' ? 0 : -100"
              :max="name == 'blur' || name == 'spread' ? 10 : 100"
              step="1"
              :value="val"
              @input="change"
            />
          </label>
          <label class="ctrl__item" :for="name" v-if="name == 'color'">
            <span class="ctrl__name"> {{ name }}: {{ val }}</span>
            <input
              class="ctrl__color"
              :data-shadow="key"
              type="color"
              :name="name"
              :id="name"
              :value="val"
              @input="change"
            />
          </label>
        </div>
        <label for="ctrl__item" v-if="key == 'box'">
          <span class="ctrl__name"> Inset </span>
          <input
            class="ctrl__inset"
            type="checkbox"
            @change="inset($event, key)"
          />
        </label>
        <label for="ctrl__item">
          <span class="ctrl__name"> Active </span>
          <input
            class="ctrl__active"
            type="checkbox"
            @change="toggle($event, key)"
            checked
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shadowItems: {
        box: {
          offsetX: 2,
          offsetY: 2,
          blur: 6,
          spread: 1,
          color: "#ffbdbd",
        },
        text: {
          offsetX: 3,
          offsetY: 3,
          blur: 3,
          color: "#5353cf",
        },
        filter: {
          offsetX: 2,
          offsetY: 2,
          blur: 2,
          color: "#7bea97",
        },
      },
    };
  },
  methods: {
    changeStyle(type, s, active = true, inset) {
      let newShadow, prop;
      if (type === "box") {
        newShadow = `${s["offsetX"]}px ${s["offsetY"]}px ${s["blur"]}px ${s["spread"]}px ${s["color"]}`;
        prop = "boxShadow";
        if (inset) {
          newShadow += " inset";
        }
      } else if (type === "text") {
        newShadow = `${s["offsetX"]}px ${s["offsetY"]}px ${s["blur"]}px ${s["color"]}`;
        prop = "textShadow";
        if (inset) {
          newShadow += " inset";
        }
      } else if (type === "filter") {
        newShadow = `drop-shadow(${s["offsetX"]}px ${s["offsetY"]}px ${s["blur"]}px ${s["color"]})`;
        prop = "filter";
      }

      this.$el.querySelector(".shadow-box__sample .text").style[prop] = active
        ? newShadow
        : null;
      this.$el.querySelector(".shadow-box__sample .img").style[prop] = active
        ? newShadow
        : null;

      console.log("active", active);
      console.log(
        "props",
        this.$el.querySelector(".shadow-box__sample .text").style[prop]
      );
    },
    toggle(e, type) {
      let inset = false;
      if (type == "box") {
        inset = this.$el.querySelector(`.${type} .ctrl__inset`).checked;
      }
      this.changeStyle(type, this.shadowItems[type], e.target.checked, inset);
    },

    inset(e, type) {
      const active = this.$el.querySelector(`.${type} .ctrl__active`).checked;
      this.changeStyle(type, this.shadowItems[type], active, e.target.checked);
    },

    change(e) {
      const property = e.target.name;
      const type = e.target.dataset.shadow;
      let val = e.target.value;

      const s = this.shadowItems[type];
      s[property] = val;

      let inset = false;
      if (type === "box") {
        inset = this.$el.querySelector(`.${type} .ctrl__inset`).checked;
      }
      const active = this.$el.querySelector(`.${type} .ctrl__active`).checked;

      this.changeStyle(type, s, active, inset);
    },
  },
  mounted() {
    for (const [key, val] of Object.entries(this.shadowItems)) {
      this.changeStyle(key, val);
    }
  },
};
</script>

<style lang="scss" scoped>
.shadow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;

  &__sample {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 10rem 0;
    width: 100%;

    .text {
      width: 100px;
      height: 100px;
      background-color: gray;
    }

    .img {
      width: 100px;
      height: 100px;
      background-color: transparent;
      margin: 0 !important;
    }
  }

  &__ctrls {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    .ctrl {
      flex: 1 1 30%;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      &__title {
        text-align: center;
        font-size: 2rem;
        margin: 2rem 0;
        font-weight: bold;
      }

      &__item {
        display: flex;
        align-items: center;
      }

      &__name {
        flex: 0 0 45%;
        white-space: nowrap;
      }

      &__bar {
        flex: 1;
      }
    }
  }
}
</style>
