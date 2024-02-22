import axiosClient from '../axios.js';

export function login({commit},data)
{
    return axiosClient.post('/login',data)
        .then(({data})=>{
            commit('setUser',data.user);
            commit('setToken',data.token);
            return data;
        })
}
