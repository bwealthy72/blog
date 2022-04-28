export const state = () => ({
  postPaths: {},
  appPaths: {
    "/": "Home",
    "/post": "Post",
  },
  isMobile: false,
});

export const mutations = {
  setPaths(state, postPaths) {
    state.postPaths = postPaths;
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
};

export const actions = {
  async nuxtServerInit(ctx) {
    const routes = this.$router.options.routes;
    const postPaths = {};
    for (const r of routes) {
      if (r.name) {
        const re = /\/post(\/\w+)/gm;

        const result = re.exec(r.path);
        let path = result ? result[1] : "";

        if (path == "/all") {
          path = "";
        }

        const posts = await this.$content(path, { deep: true })
          .only([""])
          .fetch();
        postPaths[r.path] = {
          name: r.name,
          length: posts.length,
        };
      }
    }
    ctx.commit("setPaths", postPaths);
  },
};
