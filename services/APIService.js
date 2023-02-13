const url= 'http://195.179.193.144:1506'
// const url= 'http://localhost:5000';

import axios from 'axios'

export const apiService = {

    refreshAccessToken(data) {
        return axios
            .post(`${url}/api/auth/token`, data)
    },
    login(logs) {
        return axios
            .post(`${url}/api/auth/login`, logs)
    },
    get(ressource) {
        return axios.get(`${url}/api/${ressource}`)
    },
    post(ressource, data, param = {}) {
        return axios
            .post(`${url}/api/${ressource}`, data, param)
    },
    put(ressource, data) {
        return axios
            .put(`${url}/api/${ressource}`, data)
    },
    delete(ressource, data) {
        return axios
            .delete(`${url}/api/${ressource}`, data)
    },
}
  