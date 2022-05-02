<template>
  <div class="window-btn">
    <button class="window-btn__item" @click="$emit('close')">
      <img
        class="main"
        src="~/assets/images/mac-close-btn.png"
        alt="close-btn"
      />
      <img
        class="hover"
        src="~/assets/images/mac-close-btn_active.png"
        alt="close-btn"
      />
    </button>
    <button class="window-btn__item" @click="$emit('minimize')">
      <img
        class="main"
        src="~/assets/images/mac-min-btn.png"
        alt="minimize-btn"
      />
      <img
        class="hover"
        src="~/assets/images/mac-min-btn_active.png"
        alt="minimize-btn"
      />
    </button>
    <button class="window-btn__item" @click="$emit('maximize')">
      <img
        class="main"
        src="~/assets/images/mac-max-btn.png"
        alt="maximize-btn"
      />
      <img
        class="hover"
        src="~/assets/images/mac-max-btn_active.png"
        alt="maximize-btn"
      />
    </button>
  </div>
</template>
