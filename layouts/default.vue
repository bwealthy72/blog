<template>
  <div class="container" :class="{ mobile: $device.isMobile }">
    <DesktopDock v-if="$device.isDesktop"></DesktopDock>
    <DesktopHeader v-if="$device.isDesktop"></DesktopHeader>
    <Nuxt />
  </div>
</template>
