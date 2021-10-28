import axios from "axios";
import { Message } from 'element-ui';

const baseUrl = "";

// 响应拦截器，对错误信息做统一处理
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    if (success.status && success.status === 200) {
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) return Message.error(success.data.message);
        if (success.data.message) Message.success(success.data.message);
    }
    return success.data; // 返回业务数据
}, error => {
    if (error.response.code === 504) return Message.error("请求超时...");
    if (error.response.code === 404) return Message.error("资源跑路咯！");
    if (error.response.code === 403) return Message.error("权限不足，请联系管理员！");
    if (error.response.code === 401) return Message.error("客官贵姓？请先登录吧！"); // TODO:跳转到登录页
    if (error.response.data.message) return Message.error(error.response.data.message);
    return Message.error("莫名出现的错误，等待解决！");
});

// post请求封装
export const post = (url, params) => {
    return axios({
        method: "post",
        url: `${baseUrl}${url}`,
        data: params
    });
}