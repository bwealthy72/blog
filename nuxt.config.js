export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "BWealthy의 부자 일기",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "부자가 되고싶은 프론트엔드 블로거 BWealthy",
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "BWealthy의 부자 일기",
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website",
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://www.blogwealthy.com/logo.png",
      },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://www.blogwealthy.com/",
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "부자가 되고싶은 프론트엔드 블로거 BWealthy",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "BWealthy의 부자 일기",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "부자가 되고싶은 프론트엔드 블로거 BWealthy",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://www.blogwealthy.com/logo.png",
      },
      {
        name: "naver-site-verification",
        content: "54004839529af92189883c24186cf4f461c357d1",
      },
      {
        name: "google-site-verification",
        content: "nuVt3j9_boL7DPlserZqpS5CpTfVa0CXQ2nbWSVajko",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/utils.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/image", "@nuxtjs/moment"],

  // https://www.npmjs.com/package/@nuxtjs/moment
  moment: {
    timezone: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //https://github.com/dword-design/nuxt-content-git
    "nuxt-content-git",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // https://sitemap.nuxtjs.org/guide/setup
    "@nuxtjs/sitemap",
    // https://www.npmjs.com/package/@nuxtjs/robots
    "@nuxtjs/robots",
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: false,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    extendRoutes(routes, resolve) {
      // routes 리셋
      routes.length = 0;

      const postListComp = resolve(__dirname, "pages/_category/index.vue");
      const postComp = resolve(__dirname, "pages/_category/_post.vue");
      routes.push({
        path: "/",
        component: resolve(__dirname, "pages/index.vue"),
        name: "Home",
      });

      function addCategory(path, name) {
        routes.push({
          path: "/" + path,
          component: postListComp,
          name,
        });
        routes.push({
          path: "/" + path + "/:year/:month/:post",
          component: postComp,
        });
      }

      // addCategory("html", "HTML");
      // addCategory("css", "CSS");
      // addCategory("js", "Javascript");
      addCategory("tips", "Tips");
      addCategory("blog", "Blog");
      addCategory("diary", "Diary");
    },
  },

  sitemap: {
    hostname: "https://www.blogwealthy.com/",
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
  },

  generate: {
    async routes() {
      const { $content } = require("@nuxt/content");
      const files = await $content({ deep: true }).only(["path"]).fetch();

      return files.map((file) => (file.path === "/index" ? "/" : file.path));
    },
  },
};
