import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AutoCompleteField from "../../components/AutoCompleteField";

const { Panel } = Collapse;

const KhamNgoaiKhoa = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { ngoaiKhoa, phanLoaiNgoaiKhoa } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["kham-ngoai-khoa"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"kham-ngoai-khoa"} header={"Khám ngoại khoa"}>
          <AutoCompleteField
            defaultValue={ngoaiKhoa}
            label={`a) Ngoại khoa`}
            onChange={handleSetData(["nbKSK", "ngoaiKhoa"])}
          />

          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiNgoaiKhoa}
            onChange={handleSetData(["nbKSK", "phanLoaiNgoaiKhoa"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default KhamNgoaiKhoa;
