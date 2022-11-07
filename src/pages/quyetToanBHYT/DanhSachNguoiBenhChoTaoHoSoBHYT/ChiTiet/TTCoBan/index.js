import { Col, Row, Select, Tooltip, Popover } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useRef } from "react";
import RankGoldIcon from "assets/svg/hoSoBenhAn/rankGold.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { Main } from "./styled";
import { connect, useSelector } from "react-redux";
import moment from "moment"
import fileUtils from "utils/file-utils";
// import ThongTinNB from "../../../ThongTinNB";

const { Option } = Select;

const TTCoBan = ({
  thongTinBenhNhan,
  listgioiTinh,
  getUtils,
  onClick = () => { },
  listData
}) => {
  const { dataCurrent } = useSelector(state => state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT)
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  return (
    <Main>
      <div className="left">
        <div className="ma-nb ml2">Mã HS-{dataCurrent.maHoSo}</div>
        <div className="tt-nb ml2">
          <Row>
            <Col span={24}>
              <b>{dataCurrent?.tenNb}</b> (
              {
                listgioiTinh.find((item) => item.id === dataCurrent?.gioiTinh)
                  ?.ten
              }{" "}
          - {dataCurrent?.tuoi} tuổi){" "}
            </Col>
            <Col span={24}>
              <b>Số bảo hiểm</b> : {dataCurrent?.maTheBhyt} ({dataCurrent?.mucHuongTheBhyt}%) - <b>Giá trị thẻ BH</b>: Từ {dataCurrent?.tuNgayTheBhyt && moment(dataCurrent?.tuNgayTheBhyt).format("DD/MM/YYYY")} đến {dataCurrent?.denNgayTheBhyt && moment(dataCurrent?.denNgayTheBhyt).format("DD/MM/YYYY")} - <b>Ngày đăng ký</b>: {dataCurrent?.thoiGianVaoVien && moment(dataCurrent?.thoiGianVaoVien).format("DD/MM/YYYY HH:mm:ss")} - <b>Mã NB</b>: {dataCurrent?.maNb}
            </Col>
          </Row>
        </div>
      </div>
    </Main>
  );
};

export default connect(
  ({ nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
    lichSuKyDanhSachPhieu: { listData },
  }) => ({
    thongTinBenhNhan,
    listgioiTinh,
    listData
  }),
  ({ utils: { getUtils } }) => ({ getUtils })
)(TTCoBan);
