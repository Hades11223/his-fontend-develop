import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const Mat = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    matPhaiKhongKinh,
    matPhaiCoKinh,
    matTraiKhongKinh,
    matTraiCoKinh,
    mat,
    phanLoaiThiLuc,
  } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["mat"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"mat"} header={"Mắt"}>
          <Row>
            <Col className="sub-label" span={6}>
              - Kết quả khám thị lực:
            </Col>
            <Col className="sub-label" span={3}>
              Không kính:
            </Col>
            <Col span={6}>
              <TextField
                label={`Mắt phải`}
                html={matPhaiKhongKinh}
                onChange={handleSetData(["nbKSK", "matPhaiKhongKinh"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
            <Col flex={"10px"}></Col>
            <Col span={6}>
              <TextField
                label={`Mắt trái`}
                html={matTraiKhongKinh}
                onChange={handleSetData(["nbKSK", "matTraiKhongKinh"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>

          <Row>
            <Col span={6}></Col>
            <Col className="sub-label" span={3}>
              Có kính:
            </Col>
            <Col span={6}>
              <TextField
                label={`Mắt phải`}
                html={matPhaiCoKinh}
                onChange={handleSetData(["nbKSK", "matPhaiCoKinh"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
            <Col flex={"10px"}></Col>
            <Col span={6}>
              <TextField
                label={`Mắt trái`}
                html={matTraiCoKinh}
                onChange={handleSetData(["nbKSK", "matTraiCoKinh"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>

          <TextField
            label={`- Các bệnh về mắt (nếu có)`}
            html={mat}
            onChange={handleSetData(["nbKSK", "mat"])}
            maxLength={2000}
            refsChild={refElement}
          />
          <TextField
            label={`- Phân loại`}
            html={phanLoaiThiLuc}
            onChange={handleSetData(["nbKSK", "phanLoaiThiLuc"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default Mat;
