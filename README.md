# Meting API

> 本仓库已经合并至 [PublicAPI](https://github.com/Motues/PublicAPI)

![meting](./doc/meting.png)

基于 [Meting](https://github.com/metowolf/meting) 的 实现的 API，支持网易云、QQ等音乐平台

## 快速开始

1. 下载代码
    ```bash
    git clone https://github.com/Motues/meting-api.git
    cd meting-api
    ```
2. 安装依赖，编译代码并启动
   ```
   pnpm install
   pnpm build
   pnpm start
   ```
3. 默认监听 `3000` 端口，可以通过 `.env` 文件进行修改

## 参数说明

[API 接口参考](./doc/api.md) 

## 环境变量

存放在 `.env` 文件

| 变量名 | 说明 | 
| ------ | ---- | 
| `PORT` | 端口号，默认为 3000 |
| `ALLOW_ORIGIN` | 允许跨域访问的域名，多个域名用英文逗号隔开， `*` 为允许所有域名跨域访问 |

> Made with ❤️ by [Motues](https://www.motues.top)