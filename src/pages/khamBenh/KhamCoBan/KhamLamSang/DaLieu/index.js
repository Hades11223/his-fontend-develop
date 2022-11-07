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

const DaLieu = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { daLieu, phanLoaiDaLieu } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["da-lieu"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"da-lieu"} header={"Da liễu"}>
          <AutoCompleteField
            defaultValue={daLieu}
            label={`Da liễu`}
            onChange={handleSetData(["nbKSK", "daLieu"])}
          />

          <TextField
            label={`Phân loại`}
            html={phanLoaiDaLieu}
            onChange={handleSetData(["nbKSK", "phanLoaiDaLieu"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default DaLieu;
