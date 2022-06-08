const getPostPath = async function (routes, content) {
  const postPaths = {};
  for (const r of routes) {
    if (r.name) {
      const re = /\/post(\/\w+)/gm;

      const result = re.exec(r.path);
      let path = result ? result[1] : "";

      if (path == "/all") {
        path = "";
      }

      const posts = await content(path, { deep: true }).only([""]).fetch();
      postPaths[r.path] = {
        name: r.name,
        length: posts.length,
      };
    }
  }
  return postPaths;
};

export const state = () => ({
  postPaths: {},
  apps: {
    post: {
      name: "Post",
      to: "/post",
      img: require("~/assets/images/dock/Post.png"),
    },
    twitter: {
      name: "Twitter",
      to: "/twitter",
      img: require("~/assets/images/dock/twitter.png"),
    },
  },
  // Mac window들에 대한 정보를 담고있다.
  windows: {
    Post: {
      open: true,
      x: -1,
      y: -1,
      width: 1080,
      height: 700,
      zIndex: 0,
    },
    Twitter: {
      open: true,
      x: -1,
      y: -1,
      width: 300,
      height: 700,
      zIndex: -1,
    },
  },
  windowIdx: 1,
  focusedWindow: "Post",
});

export const mutations = {
  setPaths(state, postPaths) {
    state.postPaths = postPaths;
  },
  updateWindowPos(state, [name, [x, y]]) {
    state.windows[name].x = x;
    state.windows[name].y = y;
  },
  closeWindow(state, name) {
    state.windows[name].open = false;
  },
  openWindow(state, name) {
    state.windows[name].open = true;
    state.windows[name].zIndex = state.windowIdx++;
    state.focusedWindow = name;
  },
  focusWindow(state, name) {
    state.windows[name].zIndex = state.windowIdx++;
    state.focusedWindow = name;
  },
};

export const actions = {
  async nuxtServerInit(store) {
    const postPaths = await getPostPath(
      this.$router.options.routes,
      this.$content
    );
    store.commit("setPaths", postPaths);
  },
};
