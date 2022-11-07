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

const KhamSanPhuKhoa = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { sanPhuKhoa, phanLoaiSanPhuKhoa } = thongTinKSK || {};

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
        <Panel key={"kham-ngoai-khoa"} header={"Khám sản phụ khoa"}>
          <AutoCompleteField
            defaultValue={sanPhuKhoa}
            label={`a) Sản phụ khoa`}
            onChange={handleSetData(["nbKSK", "sanPhuKhoa"])}
          />
          <TextField
            label={<span>&emsp;Phân loại</span>}
            html={phanLoaiSanPhuKhoa}
            onChange={handleSetData(["nbKSK", "phanLoaiSanPhuKhoa"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default KhamSanPhuKhoa;
