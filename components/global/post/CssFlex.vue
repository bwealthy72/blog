<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="flex-wrapper">
    <div class="flex-container" :style="containerProps">
      <div
        class="flex-item"
        v-for="(item, index) of flexItems"
        :style="item"
        :key="index"
      >
        <div
          v-for="(v, k) in item"
          :key="k"
          v-show="
            ['flex-grow', 'flex-shrink', 'flex-basis'].includes(k) ||
            (v != defaultProps[k] && k != 'background-color')
          "
        >
          {{ k }}: {{ v }}
        </div>
        <div class="flex-item__close" @click="close($event, index)">x</div>
      </div>
    </div>
    <div class="flex-controller">
      <div class="item">
        <div class="flex-controller__title">flex-container</div>
        <div class="flex-controller__container">
          <div
            v-for="(val, key) in containerProps"
            :key="key"
            class="container-item"
          >
            <span>{{ key }}</span>
            <label v-for="prop of containerPropOptions[key]" :key="prop">
              <input
                type="radio"
                :name="key"
                :checked="val == prop"
                :value="prop"
                v-model="containerProps[key]"
              />
              <span>{{ prop }} </span>
            </label>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="flex-controller__title">flex-item</div>
        <div class="flex-controller__container">
          <div class="flex-item" v-for="(prop, name) in itemProps" :key="name">
            <span>{{ name }}</span>
            <div class="align-self" v-if="name === 'align-self'">
              <label v-for="val of alignSelf" :key="val">
                <input
                  type="radio"
                  name="align-self"
                  :checked="val == prop"
                  :value="val"
                  v-model="itemProps['align-self']"
                />
                <span>{{ val }}</span>
              </label>
            </div>
            <input
              type="color"
              v-if="name === 'background-color'"
              v-model="itemProps[name]"
            />
            <input
              type="text"
              v-model="itemProps[name]"
              v-if="!['background-color', 'align-self'].includes(name)"
            />
          </div>
        </div>

        <button class="push-btn" @click="pushItem">Add item</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containerPropOptions: {
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
      },
      alignSelf: [
        "auto",
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
      ],
      containerProps: {
        "justify-content": "flex-start",
        "align-items": "stretch",
        "flex-direction": "row",
        "flex-wrap": "nowrap",
        "align-content": "stretch",
      },
      defaultProps: {
        "flex-grow": 1,
        "flex-shrink": 1,
        "flex-basis": "auto",
        "align-self": "auto",
        order: 0,
        height: "auto",
        "background-color": "#cccccc",
      },
      itemProps: {
        "flex-grow": 1,
        "flex-shrink": 1,
        "flex-basis": "auto",
        "align-self": "auto",
        order: 0,
        height: "auto",
        "background-color": "#cccccc",
      },

      flexItems: [
        {
          "flex-grow": 1,
          "flex-shrink": 1,
          "flex-basis": "auto",
          "align-self": "auto",
          order: 0,
          height: "auto",
          "background-color": "#fbd9f3",
        },
        {
          "flex-grow": 0,
          "flex-shrink": 0,
          "flex-basis": "140px",
          "align-self": "auto",
          order: 0,
          height: "80px",
          "background-color": "#95bff0",
        },
        {
          "flex-grow": 0,
          "flex-shrink": 0,
          "flex-basis": "auto",
          "align-self": "auto",
          order: 0,
          height: "120px",
          "background-color": "#c4e6c7",
        },
      ],
    };
  },
  methods: {
    pushItem() {
      console.log(this.itemProps);
      this.flexItems.push(JSON.parse(JSON.stringify(this.itemProps)));
    },
    close(e, index) {
      this.flexItems.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-wrapper {
  margin: 3rem 0;

  .flex-container {
    background-color: white;
    border-radius: 8px;
    border: 1px dashed blue;
    display: flex;
    margin-bottom: 1rem;

    .flex-item {
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #eee;
      font-size: 16px;
      position: relative;
      &__close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 13px;
        height: 13px;
        cursor: pointer;
        background-color: #eee;
        border: 1px solid gray;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
      }
    }
  }

  .flex-controller {
    display: flex;
    flex-wrap: wrap;

    .item {
      margin-right: 10px;
      border-radius: 8px;
      background-color: #eee;
      padding: 10px 20px;
      width: 100%;
    }

    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background-color: #ffffc7;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }

    &__container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .container-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        border: 3px solid #ddd;
        padding: 5px;
        border-radius: 7px;

        > span {
          margin-bottom: 10px;
          text-align: center;
          color: #009535;
        }
      }
      .flex-item {
        display: flex;
        margin-right: 10px;
        margin-bottom: 10px;

        > span {
          margin-right: 10px;
          color: #009535;
        }
      }
    }

    &__item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 8px;

      span {
        margin-bottom: 8px;
        flex: 0 0 160px;
      }

      .align-self {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .push-btn {
    display: flex;
    padding: 10px 20px;
    cursor: pointer;
    margin: 2rem auto;
    background-color: #d5f3ff;
    border: 1px solid;
    border-radius: 5px;

    &:hover {
      background-color: #c0dde7;
    }
  }
}
</style>
