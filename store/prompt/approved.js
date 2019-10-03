import prompt from '@/util/vuex-models/prompt'

export const state = prompt.createState();

export const mutations = prompt.createMutations();

export const actions = prompt.createActions({ promptEndpoint: 'approved' });

export const getters = prompt.createGetters();
