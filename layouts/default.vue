<template>
  <div class="container">
    <DesktopDock v-if="!$store.state.isMobile"></DesktopDock>
    <DesktopHeader v-if="!$store.state.isMobile"></DesktopHeader>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware(ctx) {
    if (process.server) {
      // const userAgent = ctx.req.headers["user-agent"];
      // const isMobile =
      //   userAgent.match(
      //     /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
      //   ) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null;
      // ctx.store.commit("setIsMobile", isMobile);
    }
  },
};
</script>
