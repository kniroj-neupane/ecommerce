export function login({commit},data)
{
    return axios.post('api/login',data)
        .then(({data})=>{
            commit('setUser',data.user);
            commit('setToken',data.token);
            return data;
        })
}