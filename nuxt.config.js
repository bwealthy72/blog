export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  server: {
    host: "0", // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Frontend Blogger",
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
        property: "og:title",
        content: "BWealthy의 부자 일기",
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
    script: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-RXEC8C1Z2C",
      },
    ],
  },

  // $axios의 baseURL을 https://example.com:9000/로 설정
  axios: {
    host: "https://example.com",
    port: "9000",
    prefix: "/",
  },
  // ...(process.env.NODE_ENV === "development" && {
  //   proxy: {
  //     "/api": "http://localhost:8000",
  //   },
  // }),

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/utils.js", "~/plugins/BlogPost.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/google-analytics"],

  googleAnalytics: {
    id: "G-RXEC8C1Z2C",
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
        component: resolve(__dirname, "pages/index.vue"),
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
        path: "/twitter",
        component: resolve(__dirname, "pages/twitter.vue"),
      });

      routes.push({
        path: "/post",
        component: resolve(__dirname, "pages/post.vue"),
      });

      // 모바일에서 모든 포스트가 보이는 리스트
      routes.push({
        path: "/post/all",
        component: resolve(__dirname, "pages/post.vue"),
        name: "모든 포스트",
      });

      function addCategory(path, name) {
        routes.push({
          path: "/post/" + path,
          component: resolve(__dirname, "pages/post.vue"),
          name,
        });
        routes.push({
          path: "/post/" + path + "/:year/:month/:post",
          component: resolve(__dirname, "pages/post.vue"),
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
