import axios from "axios"
export const defaultSettingAxios = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
    timeout: 10000,
});