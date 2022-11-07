import React from "react";
import { CollapseWrapper } from "../styled";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Collapse, Row, Col } from "antd";
import TextField from "components/TextField";
import { refElement } from "../../../ThongTin";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const TaiMuiHong = (props) => {
  const { handleSetData } = props;
  const { t } = useTranslation();

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    taiTraiNoiThuong,
    taiTraiNoiTham,
    taiPhaiNoiThuong,
    taiPhaiNoiTham,
    taiMuiHong,
    phanLoaiTaiMuiHong,
    phanLoaiNoiSoiTmh,
    noiSoiTmh,
  } = thongTinKSK || {};

  return (
    <div className="collapse-content">
      <CollapseWrapper
        bordered={false}
        defaultActiveKey={["tai-mui-hong"]}
        expandIcon={({ isActive }) =>
          isActive ? <CaretDownOutlined /> : <CaretUpOutlined />
        }
        className="site-collapse-custom-collapse"
        // onChange={onCollapsed}
      >
        <Panel key={"tai-mui-hong"} header={"Tai-Mũi-Họng"}>
          <div>- Kết quả khám thính lực:</div>

          <Row>
            <Col className="sub-label" span={3}>
              Tai trái:
            </Col>
            <Col span={6}>
              <TextField
                label={`Nói thường`}
                html={taiTraiNoiThuong}
                onChange={handleSetData(["nbKSK", "taiTraiNoiThuong"])}
                maxLength={20}
                refsChild={refElement}
              />
            </Col>
            <Col className="sub-label" flex={"80px"}>
              m hoặc Hz;
            </Col>
            <Col flex={"20px"}></Col>

            <Col span={6}>
              <TextField
                label={`Nói thầm`}
                html={taiTraiNoiTham}
                onChange={handleSetData(["nbKSK", "taiTraiNoiTham"])}
                maxLength={20}
                refsChild={refElement}
              />
            </Col>
            <Col className="sub-label" flex={"80px"}>
              m hoặc Hz;
            </Col>
          </Row>

          <Row>
            <Col className="sub-label" span={3}>
              Tai phải:
            </Col>
            <Col span={6}>
              <TextField
                label={`Nói thường`}
                html={taiPhaiNoiThuong}
                onChange={handleSetData(["nbKSK", "taiPhaiNoiThuong"])}
                maxLength={20}
                refsChild={refElement}
              />
            </Col>
            <Col className="sub-label" flex={"80px"}>
              m hoặc Hz;
            </Col>
            <Col flex={"20px"}></Col>

            <Col span={6}>
              <TextField
                label={`Nói thầm`}
                html={taiPhaiNoiTham}
                onChange={handleSetData(["nbKSK", "taiPhaiNoiTham"])}
                maxLength={20}
                refsChild={refElement}
              />
            </Col>
            <Col className="sub-label" flex={"80px"}>
              m hoặc Hz;
            </Col>
          </Row>

          <TextField
            label={`- Các bệnh về tai mũi họng (nếu có)`}
            html={taiMuiHong}
            onChange={handleSetData(["nbKSK", "taiMuiHong"])}
            maxLength={2000}
            refsChild={refElement}
          />
          <TextField
            label={`- Phân loại`}
            html={phanLoaiTaiMuiHong}
            onChange={handleSetData(["nbKSK", "phanLoaiTaiMuiHong"])}
            maxLength={2000}
            refsChild={refElement}
          />

          <div>
            <b>Nội soi Tai - Mũi - Họng</b>
          </div>

          <TextField
            label={`- Phân loại`}
            html={phanLoaiNoiSoiTmh}
            onChange={handleSetData(["nbKSK", "phanLoaiNoiSoiTmh"])}
            maxLength={2000}
            refsChild={refElement}
          />
          <TextField
            label={`- Kết luận`}
            html={noiSoiTmh}
            onChange={handleSetData(["nbKSK", "noiSoiTmh"])}
            maxLength={2000}
            refsChild={refElement}
          />
        </Panel>
      </CollapseWrapper>
    </div>
  );
};

export default TaiMuiHong;
