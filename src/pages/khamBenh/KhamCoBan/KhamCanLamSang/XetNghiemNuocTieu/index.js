import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const XetNghiemNuocTieu = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { duong, protein, xnNuocTieuKhac } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["xet-nghiem-nuoc-tieu"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"xet-nghiem-nuoc-tieu"} header={"Xét nghiệm nước tiểu"}>
          <TextField
            label={`a) Đường`}
            html={duong}
            onChange={handleSetData(["nbKSK", "duong"])}
            maxLength={2000}
            refsChild={refElement}
          />
          <TextField
            label={`b) Prôtêin`}
            html={protein}
            onChange={handleSetData(["nbKSK", "protein"])}
            maxLength={2000}
            refsChild={refElement}
          />
          <TextField
            label={`c) Khác (nếu có)`}
            html={xnNuocTieuKhac}
            onChange={handleSetData(["nbKSK", "xnNuocTieuKhac"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default XetNghiemNuocTieu;
