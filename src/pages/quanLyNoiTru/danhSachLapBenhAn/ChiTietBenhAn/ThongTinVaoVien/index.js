import { Checkbox, Col, Row } from "antd";
import { Button } from "components";
import React, { useRef } from "react";
import { Main } from "./styled";
import IcLapBenhAn from "assets/images/noiTru/icLapBenhAn.png";
import { useDispatch, useSelector } from "react-redux";
import ModalLapBenhAn from "../ModalLapBenhAn";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";
const ThongTinVaoVien = (props) => {
  const modalLapBenhAnRef = useRef(null);
  const { id } = props;
  const { nbLapBenhAn } = useSelector((state) => state.quanLyNoiTru);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  const {
    quanLyNoiTru: { xoaBenhAn, getNbLapBenhAnById, huyBenhAn },
  } = useDispatch();
  const onLapBenhAn = () => {
    modalLapBenhAnRef.current && modalLapBenhAnRef.current.show();
  };
  const onXoaBenhAn = () => {
    xoaBenhAn(id).then((s) => getNbLapBenhAnById(id));
  };

  const onHuyBenhAn = () => {
    huyBenhAn(id).then((s) => getNbLapBenhAnById(id));
  };
  return (
    <Main>
      <div className="middile">
        <label className="title">Thông tin vào viện</label>
        <Row className="info">
          <Col span={6}>
            <span>Loại bệnh án: </span>
            <b>{nbLapBenhAn.tenLoaiBenhAn}</b>
          </Col>
          <Col span={6}>
            <span>Khoa nhập viện: </span>
            <b>{nbLapBenhAn.tenKhoaNhapVien}</b>
          </Col>
          <Col span={6}>
            <span>Đối tượng KCB: </span>
            <b>
              {
                (listDoiTuongKcb || []).find(
                  (x) => x.id === nbLapBenhAn.doiTuongKcb
                )?.ten
              }
            </b>
          </Col>
          <Col span={6}>
            <span>Trạng thái NB: </span>
            <b>
              {
                (listTrangThaiNb || []).find(
                  (x) => x.id === nbLapBenhAn.trangThai
                )?.ten
              }
            </b>
          </Col>
        </Row>
        <Row className="info">
          <Col span={6}>
            <span>Bác sĩ chỉ định nhập viện: </span>
            <b>{nbLapBenhAn.tenBacSiKetLuan}</b>
          </Col>
          <Col span={6}>
            <span>Khoa chỉ định nhập viện: </span>
            <b>{nbLapBenhAn.tenKhoaChiDinhNhapVien}</b>
          </Col>
          <Col span={6}>
            <Checkbox checked={nbLapBenhAn.dangGiuThe}> Giữ thẻ BHYT</Checkbox>
          </Col>
        </Row>
        <Row className="info">
          <Col span={12}>
            <span>Chẩn đoán vào viện: </span>
            <b>{nbLapBenhAn.cdChinh}</b>
          </Col>
          <Col span={12}>
            <span>Chẩn đoán (mô tả chi tiết): </span>
            <b>{nbLapBenhAn.cdKemTheo}</b>
          </Col>
        </Row>
        <Row className="info">
          <Col span={12}>
            <span>Nơi đăng ký: </span>
            <b>{nbLapBenhAn.tenNoiDangKy}</b>
          </Col>
          <Col span={12}>
            <span>Nơi giới thiệu: </span>
            <b>{nbLapBenhAn.tenNoiGioiThieu}</b>
          </Col>
        </Row>
      </div>

      <Row className="action-bottom">
        {nbLapBenhAn.maBenhAn &&
          checkRole([ROLES["QUAN_LY_NOI_TRU"].XOA_BO_BENH_AN]) && (
            <Button type="error" onClick={onXoaBenhAn}>
              <span>Xóa bỏ mã bệnh án</span>
            </Button>
          )}
        {nbLapBenhAn.trangThai !== 200 &&
          nbLapBenhAn.maBenhAn &&
          checkRole([ROLES["QUAN_LY_NOI_TRU"].HUY_BENH_AN]) && (
            <Button type="default" onClick={onHuyBenhAn}>
              <span>Hủy bệnh án</span>
            </Button>
          )}
        {(!nbLapBenhAn.maBenhAn || nbLapBenhAn.trangThai === 200) &&
          checkRole([ROLES["QUAN_LY_NOI_TRU"].LAP_BENH_AN]) && (
            <Button
              type="primary"
              onClick={onLapBenhAn}
              iconHeight={20}
              rightIcon={<img src={IcLapBenhAn} alt={IcLapBenhAn} />}
            >
              <span>Lập bệnh án</span>
            </Button>
          )}
      </Row>
      <ModalLapBenhAn ref={modalLapBenhAnRef} id={id} />
    </Main>
  );
};
export default ThongTinVaoVien;
