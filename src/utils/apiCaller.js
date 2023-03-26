import axios from "axios";
const API_PATH = process.env.REACT_APP_API_ROUTE


const apiCaller = {
    async getItems(target, query) {
        if (!query) {
            const response = await axios.get(`${API_PATH}/${target}`)
            return response.data
        } else {
            const response = await axios.get(`${API_PATH}/${target}/${query}`)
            return response.data
        }
    },

    async getUser(id) {
        const response = await axios.get(`${API_PATH}/users/${id}`)
        return response.data
    },
    async updateUser(id, name) {
        const response = await axios.put(`${API_PATH}/users/${id}`, { name: name })
        return response.data
    },
    async deleteUser(id) {
        const response = await axios.delete(`${API_PATH}/users/${id}`)
        return response.data
    },
    async addAccount(id) {
        const response = await axios.post(`${API_PATH}/users/${id}/addaccount`)
        return response.data
    },
    async addNewUser(params) {
        await axios.post(`${API_PATH}/users`, params, {
            headers: ["Content-Type": "application/json"]
        })
        const users = await this.getItems('users')
        return users.data
    }
}

export default apiCaller

