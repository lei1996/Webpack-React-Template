# Setup Webpack and Babel for React

项目说明: 
Docker 前端容器化部署, 宿主机 nginx 反向代理到内部容器, 可以对服务进行隔离, 做负载均衡等等. 外网的流量都是走的前端代理服务器,

从 0 开始配置 Webpack, 集成了Jest 单元测试, 写 mobx / redux 状态管理代码时, 极大的降低了后期维护的成本, 同时提高了代码的健壮性. 
集成 linaria css in js 方案, 写 js 模板一样的嵌入 css 样式, 使代码更优雅 可读, 可维护. React 组件可以直接定位到目标css 进行样式修改. 且可重用.

集成 基于hooks 的 react-spring动画库, 使 js 控制动画更简单
集成 基于hooks 的 react-use-gesture手势库, 能够写出 native 那样的动画效果. 提升用户体验.
集成 Jest 单元测试, 写出更健壮的代码
集成 @reach-router , 写前端路由更简单
集成 Babel v7, 运行时转成 es5 代码

支持 hot 热重载

## Quick start

```
# Install dependencies
npm install

# Run Server
npm run serve

# Server run on http://localhost:8080/
```
