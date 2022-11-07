import { Spin } from "antd";
import React from "react";

const Fallback = () => {
  return (
    <div className="suspense-loading-screen">
      <Spin tip="Vui lòng chờ" spinning={true} size="large"></Spin>
    </div>
  );
};
export default Fallback;
