import { Col, Row, Select } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import TTCoBan from "./containers/TTCoBan";
import Content from "./Content";
import { Main } from "./styled";

const { Option } = Select;

const ChiTiet = ({
  getById,
  searchDsDv,
  searchNBDotDieuTri,
  getLichSuKham,
}) => {
  const search = window.location.pathname.split("/");
  const id = search[search.length - 1];

  useEffect(() => {
    getById(id);
    // searchDsDv({ nbDotDieuTriId: id });
    // searchNBDotDieuTri({ nbThongTinId: id });
    // getLichSuKham({ nbDotDieuTriId: id });
  }, []);
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Theo dõi người bệnh", link: "/theo-doi-nguoi-benh" },
          {
            title: "Danh sách người bệnh",
            link: "/theo-doi-nguoi-benh/danh-sach-nguoi-benh/",
          },
        ]}
      >
        <Row>
          <Col span={24}>
            {/* <div className="header-screen">
              <h3>Lịch sử khám bệnh</h3>
            </div> */}
            <TTCoBan />
            <Content />
          </Col>
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default connect(
  null,
  ({
    nbDotDieuTri: { getById, searchNBDotDieuTri },
    hoSoBenhAn: {  getLichSuKham },
  }) => ({
    getById,
    searchNBDotDieuTri,
    getLichSuKham,
  })
)(ChiTiet);
