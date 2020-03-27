import axios from '../js_sdk/gangdiedao-uni-axios/index.js'

// 创建自定义接口服务实例
const service = axios.create({
	timeout: 6000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true,
	// #endif
})

// 拦截器 在请求之前拦截
service.interceptors.request.use(config => {
	uni.showLoading({
		title: "加载中..."
	})
	return config
})

// 拦截器 在请求之后拦截
service.interceptors.response.use(response => {
	uni.hideLoading()
	return response
}, error => {
	return Promise.reject(error.message)
})

export default service