const now = new Date();
const frontendMonitorVersion = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

export default {
  // 配置服务器api地址
  server: process.env.NODE_ENV === "development" ? "//localhost:9200" : "",

  /**
   * 前端监控: https://yueying.effirst.com/index
   * 值为监控应用id, 为空则不启用监控
   */
  frontendMonitorAppId: process.env.frontendMonitorAppId || "",

  /**
   * 前端监控版本
   */
  frontendMonitorVersion: JSON.stringify(frontendMonitorVersion),

  /**
   * 是否分析打包 应用包大小
   */
  bundleAnalyzerReport: process.env.npm_config_report,

  /**
   * cdn 路径
   */
  cdnPath: process.env.cdn_path || "https://cdn.linairx.top/",
};
