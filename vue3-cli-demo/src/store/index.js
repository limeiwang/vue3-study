import Vuex from 'vuex'

export default Vuex.createStore({
    state: {
        count: 0
    },
    mutations: {
        addCount() {
            this.state.count++
        }
    },
    actions: {},
    modules: {}
});