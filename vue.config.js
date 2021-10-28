module.exports = {
    devServer: {
        host: "localhost",
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081', // 接口域名
                changeOrigin: true, // 是否支持跨域
                ws: false, // 是否要开通链接websoket请求
                pathRewrite: {
                    '^/api': '', // 重写以"/api"开始的接口路径
                }
            }
        }
    }
}