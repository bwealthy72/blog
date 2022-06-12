export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  server: {
    host: "0", // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MinFEK's World",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "블로그에 나의 모든 것을 기록한다.",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "MinFEK의 세상",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://www.blogwealthy.com/logo.png",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.blogwealthy.com/",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "블로그에 나의 모든 것을 기록한다.",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "MinFEK의 세상",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "블로그에 나의 모든 것을 기록한다.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://www.blogwealthy.com/logo.png",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "google-site-verification",
        content: "ATpYT_Au2DP8g9uGoqHtH4vr3mRnviGGddp8STio4RA",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/utils.js", "~/plugins/BlogPost.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/google-analytics"],

  googleAnalytics: {
    // Options
    id: "G-6CDC8DXMP3",
  },

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
        theme: "prism-themes/themes/prism-material-dark.css",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: "src",
        },
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      // routes 리셋
      routes.length = 0;

      routes.push({
        path: "/",
        redirect: "/post",
      });

      // routes.push({
      //   path: "/tag/:tag",
      //   component: resolve(__dirname, "pages/post.vue"),
      // });

      // routes.push({
      //   path: "/search/:keyword",
      //   component: resolve(__dirname, "pages/post.vue"),
      // });

      routes.push({
        path: "/post",
        component: resolve(__dirname, "pages/index.vue"),
      });

      // 모바일에서 모든 포스트가 보이는 리스트
      routes.push({
        path: "/post/all",
        component: resolve(__dirname, "pages/index.vue"),
        name: "전체보기",
      });

      function addCategory(path, name) {
        routes.push({
          path: "/post/" + path,
          component: resolve(__dirname, "pages/index.vue"),
          name: name,
        });
        routes.push({
          path: "/post/" + path + "/:year/:month/:post",
          component: resolve(__dirname, "pages/index.vue"),
        });
      }

      // addCategory("html", "HTML");
      addCategory("css", "CSS");
      addCategory("js", "Javascript");
      addCategory("vue", "VueJS");
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

      return files.map((file) => "/post" + file.path);
    },
  },
  hooks: {
    "content:file:beforeInsert": (document) => {
      if (document.extension === ".md") {
        const { text } = require("reading-time")(document.text);

        document.readingTime = text;
      }
    },
  },
};
