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
  windowId: 1,
  windows: {},
});

export const mutations = {
  setPaths(state, postPaths) {
    state.postPaths = postPaths;
  },
  addWindowId(state) {
    return state.windowId++;
  },
  saveWindows(state, info) {
    state.windows[info.uid] = {
      top: info.top,
      left: info.left,
      width: info.width,
      height: info.height,
    };
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
