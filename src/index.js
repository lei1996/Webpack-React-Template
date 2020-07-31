import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// dev模式 会报warning
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import "mobx-react-lite/batchingForReactDom";

import config from "../config/client";

// 注册 Service Worker
if (window.location.protocol === "https:" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// 如果配置了前端监控, 动态加载并启动监控
if (config.frontendMonitorAppId) {
  // @ts-ignore
  import(/* webpackChunkName: "frontend-monitor" */ "wpk-reporter").then(
    (module) => {
      const WpkReporter = module.default;

      const __wpk = new WpkReporter({
        bid: config.frontendMonitorAppId,
        spa: true,
        rel: config.frontendMonitorVersion,
        uid: () => localStorage.getItem("username") || "",
        plugins: [],
      });

      __wpk.installAll();
    }
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
