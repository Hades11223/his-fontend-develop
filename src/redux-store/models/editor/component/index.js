
export default {
  state: {}, // initial state
  reducers: {
    // handle state changes with pure functions
    init(state, payload) {
      return {...state, ...payload};
    },
    updateOne(state, payload) {
      return {...state, [payload.key]: payload.content};
    },
    remove(state, payload) {
      return {...state, [payload.key]: null}
    },
  },
  effects: dispatch => ({
    async fetchDocument(payload, rootState) {
    }
  })
}
