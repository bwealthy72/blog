<template>
  <div class="shadow-box-wrapper">
    <div class="sample">
      <div class="sample__text" :style="sampleStyle">Hello</div>
      <img
        class="sample__img"
        :style="sampleStyle"
        src="@/assets/images/search.svg"
        alt=""
      />
    </div>

    <div class="controller">
      <div class="controller__type" v-for="(list, type) in shadows" :key="type">
        <div class="controller__title">{{ type }}</div>
        <div class="ctrl-list">
          <label
            class="ctrl-list__item"
            v-for="(val, name) in list"
            :key="name"
          >
            <span class="ctrl-list__name">
              {{ name }} : {{ val }}
              <span v-if="getPropType(name) === 'range'">px</span>
            </span>
            <input
              class="ctrl-list__val--range"
              type="range"
              :name="name"
              :min="getRangeMin(name)"
              :max="getRangeMax(name)"
              step="1"
              v-model="shadows[type][name]"
              v-if="getPropType(name) === 'range'"
            />
            <input
              class="ctrl-list__val--color"
              type="color"
              :name="name"
              v-model="shadows[type][name]"
              v-if="getPropType(name) === 'color'"
            />
            <input
              class="ctrl-list__val--checkbox"
              type="checkbox"
              :name="name"
              v-model="shadows[type][name]"
              v-if="getPropType(name) === 'checkbox'"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shadows: {
        "box-shadow": {
          "offset-x": 2,
          "offset-y": 2,
          blur: 1,
          spread: 0,
          color: "#aaaaaa",
          inset: false,
          active: true,
        },
        "text-shadow": {
          "offset-x": 2,
          "offset-y": 2,
          blur: 2,
          color: "#f8c4c4",
          active: true,
        },
        filter: {
          "offset-x": 2,
          "offset-y": 2,
          blur: 2,
          color: "#96a7ff",
          active: true,
        },
      },
    };
  },
  computed: {
    sampleStyle() {
      const style = {};
      for (const shadow in this.shadows) {
        if (!this.shadows[shadow].active) continue;
        let _s = "";

        if (shadow === "filter") {
          _s += "drop-shadow(";
        }

        for (const prop in this.shadows[shadow]) {
          const val = this.shadows[shadow][prop];
          const valType = this.getPropType(prop);

          if (prop === "active") continue;
          else if (valType === "range") {
            _s += val + "px ";
          } else if (valType === "checkbox") {
            if (val) {
              _s += prop + " ";
            }
          } else {
            _s += val + " ";
          }
        }
        if (shadow === "filter") {
          _s += ")";
        }
        style[shadow] = _s;
      }
      return style;
    },
  },
  methods: {
    getPropType(prop) {
      if (["inset", "active"].includes(prop)) {
        return "checkbox";
      } else if (prop == "color") {
        return "color";
      } else {
        return "range";
      }
    },
    getRangeMin(prop) {
      if (["blur", "spread"].includes(prop)) {
        return 0;
      } else {
        return -100;
      }
    },
    getRangeMax(prop) {
      if (["blur", "spread"].includes(prop)) {
        return 10;
      } else {
        return 100;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow-box-wrapper {
  margin: 3rem 0;
  user-select: none;
  .sample {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 10rem 0;
    width: 100%;

    &__text {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ddd;
      border-radius: 8px;
    }

    &__img {
      width: 100px;
      height: 100px;
      background-color: transparent;
      margin: 0 !important;
    }
  }
  .controller {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &__type {
      padding: 10px;
      flex: 1 1 30%;
    }

    &__title {
      margin-bottom: 15px;
    }

    .ctrl-list {
      &__item {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }

      &__name {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
