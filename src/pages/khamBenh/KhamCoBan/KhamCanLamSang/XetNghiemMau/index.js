import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse, Row, Col } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const XetNghiemMau = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    slHongCau,
    slBachCau,
    slTieuCau,
    duongMau,
    ure,
    creatinin,
    asat,
    alat,
    xnMauKhac,
  } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["xet-nghiem-mau"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"xet-nghiem-mau"} header={"Xét nghiệm máu"}>
          <Row>
            <Col span={5}>{`a) Công thức máu:`}</Col>
            <Col span={12}>
              <TextField
                label={`Số lượng HC`}
                html={slHongCau}
                onChange={handleSetData(["nbKSK", "slHongCau"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}></Col>
            <Col span={12}>
              <TextField
                label={`Số lượng Bạch cầu `}
                html={slBachCau}
                onChange={handleSetData(["nbKSK", "slBachCau"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}></Col>
            <Col span={12}>
              <TextField
                label={`Số lượng Tiểu cầu`}
                html={slTieuCau}
                onChange={handleSetData(["nbKSK", "slTieuCau"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>

          <TextField
            label={`b) Sinh hóa máu: Đường máu`}
            html={duongMau}
            onChange={handleSetData(["nbKSK", "duongMau"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <Row>
            <Col flex={"20px"}></Col>
            <Col span={10}>
              <TextField
                label={`Urê`}
                html={ure}
                onChange={handleSetData(["nbKSK", "ure"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
            <Col span={10}>
              <TextField
                label={`Creatinin`}
                html={creatinin}
                onChange={handleSetData(["nbKSK", "creatinin"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>
          <Row>
            <Col flex={"20px"}></Col>
            <Col span={10}>
              <TextField
                label={`ASAT (GOT)`}
                html={asat}
                onChange={handleSetData(["nbKSK", "asat"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
            <Col span={10}>
              <TextField
                label={`ALAT (GPT)`}
                html={alat}
                onChange={handleSetData(["nbKSK", "alat"])}
                maxLength={2000}
                refsChild={refElement}
              />
            </Col>
          </Row>

          <TextField
            label={`c) Khác (nếu có)`}
            html={xnMauKhac}
            onChange={handleSetData(["nbKSK", "xnMauKhac"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default XetNghiemMau;
