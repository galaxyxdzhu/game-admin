const state = {
  gameList: [],
};

const mutations = {
  setValue: (state, payload) => {
    const { name, value } = payload;
    state[name] = value;
  },
};

const actions = {
  setGameList({ commit }, payload) {
    commit("setValue", { name: "gameList", value: payload });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
