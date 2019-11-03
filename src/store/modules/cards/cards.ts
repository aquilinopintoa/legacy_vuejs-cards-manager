import getters from './state/getters';
import mutations from './state/mutations';
import actions from './state/actions';

export default {
    namespaced: true,

    state: {
        cards: {}
    },

    getters,
    mutations,
    actions
};
