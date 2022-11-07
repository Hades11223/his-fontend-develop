import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const CDHA = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { cdha } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["cdha"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"cdha"} header={"Chẩn đoán hình ảnh"}>
          <TextField
            label={`Chẩn đoán hình ảnh`}
            html={cdha}
            onChange={handleSetData(["nbKSK", "cdha"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default CDHA;
