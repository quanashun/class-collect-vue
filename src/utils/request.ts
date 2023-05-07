import axios, {AxiosInstance} from 'axios';
import {UserInfoStore} from "../store/UserInfoStore.ts";

let userInfoStore = UserInfoStore();
const host = "http://localhost:8080/class-collect/api";

const service: AxiosInstance = axios.create({
    baseURL: host,
    timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (userInfoStore.userInfo.token != "") {
        config.headers.set("Authorization", userInfoStore.userInfo.token);
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default service;
