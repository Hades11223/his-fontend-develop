import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import CollapseIconblue from "assets/images/utils/collapse-blue.png";
import ModalChiTietTaoHoSo from "../ModalChiTietTaoHoSo";
import { formatDecimal } from "../../../../thuNgan/danhSachPhieuThu/configs";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { useParams } from "react-router-dom";
import { Button } from "components";
const DanhSach = (props) => {
  const history = useHistory();
  const { dataCurrent } = useSelector(
    (state) => state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT
  );
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const {  updateData, searchById } =
    useDispatch().danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT;
  const { id } = useParams();
  const refModalChiTietTaoHoSo = useRef(null);
  useEffect(() => {
    if (Object.keys(dataCurrent).length <= 0) {
      searchById({ id: id });
    }
    return () => {
      updateData({
        dataCurrent: {},
      });
    };
  }, []);
  return (
    <Main>
      <div className="wrapped-1">
        <div className="title">Thông tin chi tiết</div>
        <hr />
        <Row gutter={[8]} className="row-1">
          {/* Cột 1 -------------------------------- */}
          <Col span={6}>
            <Row>
              <Col span={8}>Tổng chi phí:</Col>
              <Col style={{ textAlign: "right", paddingRight: 60 }} span={12}>
                <b>{formatDecimal(dataCurrent?.tongTien)}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>BHYT chi trả:</Col>
              <Col style={{ textAlign: "right", paddingRight: 60 }} span={12}>
                <b>{formatDecimal(dataCurrent?.tienBhThanhToan)}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>NB phải trả:</Col>
              <Col style={{ textAlign: "right", paddingRight: 60 }} span={12}>
                <b>{formatDecimal(dataCurrent?.thanhTien)}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>Nguồn khác:</Col>
              <Col style={{ textAlign: "right", paddingRight: 60 }} span={12}>
                <b>{formatDecimal(dataCurrent?.tienNguonKhac)}</b>
              </Col>
            </Row>
          </Col>
          {/* Cột 2 -------------------------------- */}
          <Col span={6}>
            <Row>
              <Col span={12}>Trạng thái thanh toán:</Col>
              <Col span={12}>
                <b>
                  {dataCurrent?.thanhToan ? "Đã thanh toán" : "chưa thanh toán"}
                </b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>Thời gian thanh toán:</Col>
              <Col span={12}>
                <b>
                  {dataCurrent?.thoiGianThanhToan &&
                    moment(dataCurrent?.thoiGianThanhToan).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>Thu ngân:</Col>
              <Col span={12}>
                <b>{dataCurrent?.tenThuNgan}</b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>Số phiếu thu:</Col>
              <Col span={12}>
                <b>{dataCurrent?.soPhieuThu}</b>
              </Col>
            </Row>
          </Col>
          {/* Cột 3 -------------------------------- */}
          <Col span={6}>
            <Row>
              <Col span={8}>Đối tượng:</Col>
              <Col span={12}>
                <b>
                  {
                    listDoiTuong?.find(
                      (item) => item.id === dataCurrent?.doiTuong
                    )?.ten
                  }
                </b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>Loại đối tượng:</Col>
              <Col span={12}>
                <b>{dataCurrent?.tenLoaiDoiTuong}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>Khoa:</Col>
              <Col span={12}>
                <b>{dataCurrent?.tenKhoaNb}</b>
              </Col>
            </Row>
            <Row>
              <Col span={8}>Số phơi TT:</Col>
              <Col span={12}>
                <b>{dataCurrent?.soPhoi}</b>
              </Col>
            </Row>
          </Col>
          {/* Cột 4 -------------------------------- */}
          <Col span={6}>
            <Row>
              <Col span={12}>Đối tượng KCB:</Col>
              <Col span={12}>
                <b>
                  {
                    listDoiTuongKcb?.find(
                      (item) => item.id === dataCurrent?.doiTuongKcb
                    )?.ten
                  }
                </b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>Tháng quyết toán:</Col>
              <Col span={12}>
                <b>
                  {dataCurrent?.thoiGianThanhToan &&
                    moment(dataCurrent?.thoiGianThanhToan).get("month") + 1}
                </b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>Năm quyết toán:</Col>
              <Col span={12}>
                <b>
                  {dataCurrent?.thoiGianThanhToan &&
                    moment(dataCurrent?.thoiGianThanhToan).get("year")}
                </b>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="wrapped-2">
        <div className="title">Danh sách dịch vụ</div>
        <hr />
        <div className="row-2">
          <div
            className="detail-button"
            style={{ cursor: "pointer", width: "fit-content" }}
            onClick={() =>
              history.push(
                `/ho-so-benh-an/chi-tiet-nguoi-benh/${dataCurrent?.nbDotDieuTriId}`
              )
            }
          >
            Xem chi tiết
            <img src={CollapseIconblue} alt="..." />
          </div>
        </div>
      </div>
      <div className="action-bottom">
        <Button
          type="primary"
          minWidth={200}
          onClick={() => refModalChiTietTaoHoSo.current.show({ open: true })}
        >
          Tạo hồ sơ quyết toán
        </Button>
      </div>
      <ModalChiTietTaoHoSo
        ref={refModalChiTietTaoHoSo}
        id={id}
      />
    </Main>
  );
};
export default DanhSach;
