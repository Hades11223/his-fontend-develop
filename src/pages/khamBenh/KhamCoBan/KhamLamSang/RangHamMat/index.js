import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse, Row, Col } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AutoCompleteField from "../../components/AutoCompleteField";

const { Panel } = Collapse;

const RangHamMat = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const { hamTren, hamDuoi, rangHamMat, phanLoaiRangHamMat } =
    thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["rang-ham-mat"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"rang-ham-mat"} header={"Răng-Hàm-Mặt"}>
          <Row>
            <Col span={4}>Kết quả khám:</Col>
            <Col span={12}>
              <AutoCompleteField
                defaultValue={hamTren}
                label={`+ Hàm trên`}
                onChange={handleSetData(["nbKSK", "hamTren"])}
              />
            </Col>
          </Row>

          <Row>
            <Col span={4}></Col>
            <Col span={12}>
              <AutoCompleteField
                defaultValue={hamDuoi}
                label={`+ Hàm dưới`}
                onChange={handleSetData(["nbKSK", "hamDuoi"])}
              />
            </Col>
          </Row>

          <AutoCompleteField
            defaultValue={rangHamMat}
            label={`Các bệnh về Răng-Hàm-Mặt (nếu có)`}
            onChange={handleSetData(["nbKSK", "rangHamMat"])}
          />

          <TextField
            label={`Phân loại`}
            html={phanLoaiRangHamMat}
            onChange={handleSetData(["nbKSK", "phanLoaiRangHamMat"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default RangHamMat;
