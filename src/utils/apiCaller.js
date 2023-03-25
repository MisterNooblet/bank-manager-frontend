import axios from "axios";
const API_PATH = process.env.REACT_APP_API_ROUTE


const apiCaller = {
    async getItems(target) {
        const response = await axios.get(`${API_PATH}/${target}`)
        return response.data
    }
}

export default apiCaller

