<template>
  <div class="site-home">
    <div class="site-home__block about">
      <h3 class="sub-title">About</h3>
    </div>
    <div class="site-home__block youtube">
      <h3 class="sub-title">Youtube</h3>
      <CommonYoutube></CommonYoutube>
    </div>

    <div class="site-home__block twitter">
      <h3 class="sub-title">Twitter</h3>
      <a
        class="twitter-timeline"
        data-height="600"
        data-theme="light"
        href="https://twitter.com/BlogWealthy?ref_src=twsrc%5Etfw"
        >Tweets by BlogWealthy</a
      >
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
    <div class="site-home__block instagram">
      <h3 class="sub-title">Instagram</h3>
      <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      <div class="elfsight-app-c3fbb74d-4767-49d4-a1ed-f6f668301329"></div>
    </div>
    <div class="site-home__block github">
      <h3 class="sub-title">Github</h3>
    </div>
  </div>
</template>
