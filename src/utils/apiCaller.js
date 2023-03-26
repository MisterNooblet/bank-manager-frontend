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
    async getAccout(id) {
        const response = await axios.get(`${API_PATH}/accounts/${id}`)
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
        await axios.post(`${API_PATH}/users`, params)
        const users = await this.getItems('users')
        return users.data
    },
    async deposit(amount, id) {
        const result = await axios.post(`${API_PATH}/accounts/${id}/insideactions`, { amount: amount })
        return result.data
    },
    async transfer(amount, recepient, id) {
        const result = await axios.post(`${API_PATH}/accounts/${id}/transfer`, { amount: amount, to: recepient })
        return result.data
    },
    async getAccountTransactions(id) {
        const result = await axios.get(`${API_PATH}/transactions/from`, { from: id })
        console.log(id);
        console.log(result);
        return result.data
    }
}

export default apiCaller

