
export const state = () => ({
  errors: [],
  pending: [],
  rejected: [],
  approved: [],
});

export const mutations = {
  SET(state, [key, val]) {
    if (state[key] != undefined) {
      state[key] = val;
    }
  },
  SET_PENDING(state, posts) {
    state.pending = posts;
  },
  SET_REJECTED(state, posts) {
    state.rejected = posts;
  },
  SET_APPROVED(state, posts) {
    state.approved = posts;
  },
};

const handleError = (ctx, error) => ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]]); 

export const actions = {
  async FETCH_POSTS(ctx) {
    try {
      const posts = await this.$axios.$get('/api/post/');
      ctx.commit('SET', ['pending', posts.pending]);
      ctx.commit('SET', ['rejected', posts.rejected]);
      ctx.commit('SET', ['approved', posts.approved]);
    } catch (error) {
      handleError(ctx, error);
    }
  },
  async SUBMIT_POST(ctx, newPost) {
    try {
      await this.$axios.$post('/api/post/', newPost);
    } catch (error) {
      handleError(ctx, error);
    }
  },
};

