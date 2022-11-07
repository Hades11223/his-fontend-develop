import React, { useState } from "react";
import { Main } from "./styled";
import { Tabs } from "components";
import GoiDichVu from "../../components/GoiDichVu";
import DanhSachDichVu from "../../components/DanhSachDichVu";
import DichVuNgoaiHopDong from "../../components/DichVuNgoaiHopDong";
import {
  FileAddFilled,
  FileOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import MienGiamNgoaiHopDong from "../../components/MienGiamNgoaiHopDong";

const { TabPane } = Tabs;

const TabContent = (props) => {
  const [state, _setState] = useState({ activeKey: "0" });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (e) => {
    setState({ activeKey: e });
  };

  return (
    <Main className="content">
      <Tabs.Left
        defaultActiveKey={state.activeKey}
        tabPosition={"left"}
        tabWidth={220}
        type="card"
        moreIcon={<CaretDownOutlined />}
        onChange={onChange}
        className="tab-main"
      >
        <TabPane
          tab={
            <span>
              <FileOutlined />
              Gói dịch vụ
            </span>
          }
          key={0}
        >
          <div className="tab-content">
            <GoiDichVu />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <FileOutlined />
              Dịch vụ lẻ
            </span>
          }
          key={1}
        >
          <div className="tab-content">
            <DichVuNgoaiHopDong />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <FileAddFilled />
              Danh sách dịch vụ
            </span>
          }
          key={2}
        >
          <div className="tab-content">
            <DanhSachDichVu />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <FileAddFilled />
              Miễn giảm dịch vụ ngoài hợp đồng
            </span>
          }
          key={3}
        >
          <div className="tab-content">
            <MienGiamNgoaiHopDong />
          </div>
        </TabPane>
      </Tabs.Left>
    </Main>
  );
};

export default TabContent;
