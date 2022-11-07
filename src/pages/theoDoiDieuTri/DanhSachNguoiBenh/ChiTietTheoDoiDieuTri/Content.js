import { Col, Row, Select, Tabs, Button } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useState, useCallback, useRef } from "react";
import DsTrieuChung from "./containers/DsTrieuChung";
import DonThuocTheoDoi from "./containers/DonThuocTheoDoi";
import TTCoBan from "./containers/TTCoBan";
import { Body } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import ModalKetThucDieuTri from "./containers/ModalKetThucDieuTri";
import { withRouter } from "react-router-dom";

const { Option } = Select;

const Content = ({ ...props }) => {
  const { listChiTietTheoDoiNguoiBenh } = useSelector(state => state.chiTietTheoDoiNguoiBenh)
  const { selectedId } = useSelector(state => state.danhSachCovid)
  const refKetThucDieuTri = useRef(null)
  const { themThongTinNgayDieuTri } = useDispatch().chiTietTheoDoiNguoiBenh

  const [activeTab, setActiveTab] = useState(0);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  // const getDataFromStateChildren = useCallback(
  //   (data) => {
  //     console.log('data: ', data);
  //     setState({ dataSubmit: data })
  //   },
  //   [],
  // )
  const onSubmit = () => {
    refKetThucDieuTri.current && refKetThucDieuTri.current.show()
    // if (listChiTietTheoDoiNguoiBenh.length === 0) {
    //   themThongTinNgayDieuTri({
    //     ...state?.dataSubmit["1"],
    //     nbDotDieuTriId: selectedId
    //   })
    // }
  }
  return (
    <Body>
      {/* <Row justify="space-between" align="middle">
        <Col span={6}>
          <Row >
            <div>Đơn thuốc điều trị ngày 24/08/2021</div>
            <img
              style={{ width: 20, height: 20 }}
              src={require("assets/images/theoDoiDieuTri/time.png")}
              alt=""
            />
          </Row>
        </Col>
        <Col span={18}>
          <Row justify="end">
            <Button style={{ background: "#0762f7", color: "white" }} onClick={onSubmit}> Kết thúc điều trị </Button>
          </Row>
        </Col>
      </Row> */}
      <Row>
        <Col span={6} style={{ background: "white" , borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <DonThuocTheoDoi />
        </Col>
      
        <Col span={18} style={{ paddingLeft: 16 }}>
          <Row justify="space-between" align="middle" style={{ background: "white" , borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <div style={{fontWeight: 700 , paddingLeft: 16 , fontSize: 16}}>Theo dõi triệu chứng</div>
            <Button style={{ background: "#0762f7", color: "white" ,borderRadius: 10}} onClick={onSubmit}> Kết thúc điều trị </Button>
          </Row>
          <DsTrieuChung />
          {/* <Tabs
          defaultActiveKey={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
          }}
        >
          <Tabs.TabPane tab="Hồ sơ khám chữa bệnh" key={1}>
              <HoSoKhamBenh />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách dịch vụ" key={2}>
              <DsDichVu />
          </Tabs.TabPane>
        </Tabs> */}
        </Col>
      </Row>
      <ModalKetThucDieuTri ref={refKetThucDieuTri} {...props} />
    </Body>
  );
};

export default withRouter(Content);
