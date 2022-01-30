export const state = () => ({
  routePaths: {},
});

export const mutations = {
  setRoutePathName(state, routes) {
    for (const route of routes) {
      if (route.name) {
        state.routePaths[route.path] = route.name;
      }
    }
  },
};

export const actions = {
  nuxtServerInit(ctx) {
    ctx.commit("setRoutePathName", this.$router.options.routes);
  },
};
