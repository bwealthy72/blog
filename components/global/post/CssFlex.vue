<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="flex-wrapper">
    <div class="flex-wrapper__title">Flex 테스트!</div>
    <div class="flex-container" :style="flexContainerStyle">
      <div
        class="flex-item"
        v-for="(item, index) of flexItems"
        :style="item"
        :key="index"
      >
        <div class="flex-item__props" v-for="(v, k) in item" :key="k">
          <span
            v-show="
              ['flex-grow', 'flex-shrink', 'flex-basis'].includes(k) ||
              (k === 'align-self' && v != 'auto') ||
              (k === 'height' && v != 'auto') ||
              (k === 'order' && v != 0)
            "
          >
            {{ k }}: {{ v }}
          </span>
        </div>
        <div class="flex-item__close" @click="close($event, index)">x</div>
      </div>
    </div>

    <div class="flex-controller">
      <div class="ctrl-item" v-for="(list, type) in flex" :key="type">
        <div class="ctrl-item__title">{{ type }}</div>
        <div class="ctrl-item__list">
          <div
            v-for="(prop, name) in list"
            :key="name"
            class="ctrl-item__props"
          >
            <span class="name">{{ name }}</span>
            <select
              class="prop"
              :name="name"
              v-show="getPropType(name) == 'select'"
              v-model="controller[type][name]"
            >
              <option class="prop" :value="p" v-for="p of prop" :key="p">
                {{ p }}
              </option>
            </select>
            <input
              v-show="getPropType(name) != 'select'"
              class="prop"
              :class="{ range: getPropType(name) == 'range' }"
              :type="getPropType(name)"
              v-model="controller[type][name]"
              min="0"
              max="100"
              step="1"
              :name="name"
            />
          </div>

          <button
            @click="pushItem"
            class="push-btn"
            v-show="type == 'flex-item'"
          >
            Add flex item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    flexContainerStyle() {
      const c = JSON.parse(JSON.stringify(this.controller["flex-container"]));
      c.width += "%";
      if (c.height != "auto") {
        c.height += "px";
      }

      return c;
    },
  },
  data() {
    return {
      controller: {
        "flex-container": {
          "justify-content": "flex-start",
          "align-items": "stretch",
          "flex-direction": "row",
          "flex-wrap": "nowrap",
          "align-content": "stretch",
          width: 100,
          height: "auto",
        },
        "flex-item": {
          "flex-grow": 1,
          "flex-shrink": 1,
          "flex-basis": "auto",
          "align-self": "auto",
          order: 0,
          height: "auto",
          "background-color": "#dddddd",
        },
      },
      flexItems: [
        {
          "flex-grow": 0,
          "flex-shrink": 0,
          "flex-basis": "100px",
          "align-self": "auto",
          order: 0,
          height: "100px",
          "background-color": "#ffe5f6",
        },
        {
          "flex-grow": 0,
          "flex-shrink": 0,
          "flex-basis": "150px",
          "align-self": "auto",
          order: 0,
          height: "150px",
          "background-color": "#c9d6ff",
        },
        {
          "flex-grow": 0,
          "flex-shrink": 0,
          "flex-basis": "120px",
          "align-self": "auto",
          order: 0,
          height: "120px",
          "background-color": "#c9ffe5",
        },
      ],
      flex: {
        "flex-container": {
          "justify-content": [
            "flex-start",
            "flex-end",
            "center",
            "space-between",
            "space-around",
            "space-evenly",
          ],
          "align-items": [
            "stretch",
            "flex-start",
            "flex-end",
            "center",
            "baseline",
          ],
          "flex-direction": ["row", "column", "row-reverse", "column-reverse"],
          "flex-wrap": ["nowrap", "wrap", "wrap-reverse"],
          "align-content": [
            "stretch",
            "flex-start",
            "flex-end",
            "center",
            "space-between",
            "space-around",
            "space-evenly",
          ],
          width: "range",
          height: "range",
        },
        "flex-item": {
          "flex-grow": "text",
          "flex-shrink": "text",
          "flex-basis": "text",
          "align-self": [
            "auto",
            "stretch",
            "flex-start",
            "flex-end",
            "center",
            "baseline",
          ],
          order: "text",
          height: "text",
          "background-color": "color",
        },
      },
    };
  },
  methods: {
    getPropType(prop) {
      if (
        [
          "justify-content",
          "align-items",
          "flex-direction",
          "flex-wrap",
          "align-content",
          "align-self",
        ].includes(prop)
      ) {
        return "select";
      } else if (
        ["flex-grow", "flex-shrink", "flex-basis", "order", "height"].includes(
          prop
        )
      ) {
        return "text";
      } else if (prop == "background-color") {
        return "color";
      } else if (["width"].includes(prop)) {
        return "range";
      }
    },
    close(e, index) {
      this.flexItems.splice(index, 1);
    },
    pushItem() {
      this.flexItems.push(
        JSON.parse(JSON.stringify(this.controller["flex-item"]))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-wrapper {
  &__title {
    text-align: center;
    margin: 20px 0;
    font-size: 25px;
  }
  .flex-container {
    display: flex;
    border-radius: 8px;
    border: 1px dashed skyblue;

    .flex-item {
      border-radius: 8px;
      position: relative;
      border: 1px solid #ccc;

      &__props {
        font-size: 12px;
      }

      &__close {
        position: absolute;
        top: 5px;
        right: 5px;
        border-radius: 4px;
        width: 10px;
        height: 10px;
        font-size: 12px;
        border: 1px solid black;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .flex-controller {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    .ctrl-item {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      &__title {
        margin-top: 10px;
        text-align: center;
      }

      &__list {
        margin-top: 15px;

        .push-btn {
          width: 100%;
          margin-top: 10px;
          height: 40px;
        }
      }

      &__props {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .name {
          font-size: 13px;
          color: gray;
          flex: 1;
          margin-right: 10px;
        }

        .prop {
          flex: 0 0 100px;
          width: 100px;
          height: 30px;
          padding: 5px 10px;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #aaa;
          background-color: #eee;

          &.range {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
