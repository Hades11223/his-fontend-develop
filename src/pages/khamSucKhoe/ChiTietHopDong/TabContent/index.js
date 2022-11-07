import React, { useState } from "react";
import { Main } from "./styled";
import { Tabs } from "components";
import GoiDichVu from "../../components/GoiDichVu";
import DanhSachDichVu from "../../components/DanhSachDichVu";
import DichVuNgoaiHopDong from "../../components/DichVuNgoaiHopDong";
import {
  FileAddFilled,
  FileOutlined,
  InfoCircleOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import ThongTinHopDong from "../../components/ThongTinHopDong";
import DanhSachNguoiBenh from "../../components/DanhSachNguoiBenh";

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
              Danh sách người bệnh
            </span>
          }
          key={0}
        >
          <div className="tab-content">
            <DanhSachNguoiBenh />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <FileAddFilled />
              Danh sách dịch vụ
            </span>
          }
          key={1}
        >
          <div>
            <SubTab />
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <InfoCircleOutlined />
              Thông tin thanh toán hợp đồng
            </span>
          }
          key={2}
        >
          <div className="tab-content">
            <ThongTinHopDong />
          </div>
        </TabPane>
      </Tabs.Left>
    </Main>
  );
};

const SubTab = () => {
  return (
    <Tabs tabPosition="top">
      <TabPane
        tab={
          <span>
            <FileAddFilled />
            Danh sách dịch vụ
          </span>
        }
        key={0}
      >
        <div className="tab-content">
          <DanhSachDichVu />
        </div>
      </TabPane>

      <TabPane
        tab={
          <span>
            <FileOutlined />
            Gói dịch vụ
          </span>
        }
        key={1}
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
        key={2}
      >
        <div className="tab-content">
          <DichVuNgoaiHopDong />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default TabContent;
