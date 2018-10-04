import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://api.exchangeratesapi.io/latest"
});

export default instance;