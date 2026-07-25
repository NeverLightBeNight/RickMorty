import axios from "axios"
import { defaultBaseUrl } from "../ts/typization";

export const defaultSettingAxios = axios.create({
    baseURL: defaultBaseUrl.BASE_URL,
    timeout: 10000,
});