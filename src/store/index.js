import { createStore } from 'vuex';
import { getDimensions } from '@/utils/window.js';

export default createStore({
  state: {
    categories: [
      {
        type: 'illustration',
        projects: [
          {
            title: 'dummy title',
            thumbnail:
              'https://images.unsplash.com/photo-1533122250115-6bb28e9a48c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80',
          },
        ],
      },
      {
        type: 'graphic design',
        projects: [
          {
            title: 'dummy title',
            thumbnail:
              'https://images.unsplash.com/photo-1533122250115-6bb28e9a48c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80',
          },
        ],
      },
    ],
    activeCategoryIndex: 0,
    activeProjectIndex: 0,
    openProject: false,
    pageDimensions: getDimensions(),
  },
  mutations: {
    setActiveProjectIndex(state, index) {
      state.activeProjectIndex = index;
    },
    setActiveCategoryIndex(state, index) {
      state.activeCategoryIndex = index;
    },
    setOpenProject(state, bool) {
      state.openProject = bool;
    },
    setProjects(state, data) {
      state.categories = data;
    },
    setPageDimensions(state, data) {
      state.pageDimensions = data;
    },
  },
  actions: {
    toggleOpenProject({ commit, state }) {
      commit('setOpenProject', !state.openProject);
    },
  },
  modules: {},
});
