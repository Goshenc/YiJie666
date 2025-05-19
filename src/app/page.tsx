"use client";
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// 注释原来的 App 导入
// import App from '../App';
import AppGarbage from '../AppGarbage'; // 导入 AppGarbage 组件

const Page = () => {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          {/* 注释原来的 App 渲染 */}
          {/* <App /> */}
          <AppGarbage />
        </React.StrictMode>
      );
    }
  }, []);

  return <div id="root"></div>;
};

export default Page;