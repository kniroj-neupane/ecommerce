import {createStore} from "vuex";

import * as actions from './actions.js';
import * as mutations from './mutations.js';

const store = createStore({
    state:  {
        user:{
            token: null,
            email: '',
            password: '',
            remember: false,
            data: {
                name: 'niroj'
            }
        }

    },
    getters:  {},
    actions,
    mutations,
})
export default store