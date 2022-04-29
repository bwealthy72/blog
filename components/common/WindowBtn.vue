<template>
  <div class="window-btn">
    <nuxt-link to="/" class="window-btn__item">
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
    </nuxt-link>
    <nuxt-link to="/" class="window-btn__item">
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
    </nuxt-link>
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
