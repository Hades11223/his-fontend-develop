import React, { useState, useRef, useEffect } from "react";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ModalNhapLyDo from "pages/kho/components/ModalNhapLyDo";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { Button } from "components";
const ThongTinDonThuoc = ({ isThemMoi, layerId }) => {
  const refModalNotification = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const infoPatient = useStore("thuocChiTiet.infoPatient", {});
  const listAllKho = useStore("kho.listAllKho", []);
  const listKhoUser = useStore("kho.listKhoUser", []);
  const {
    thuocChiTiet: { updateData, updateGhiChuDonThuocById, searchDonThuoc },
    phatThuocNgoaiTru: { postDuyet, postHuyDuyet },
    kho: { getAllTongHop, getTheoTaiKhoan },
  } = useDispatch();
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);

  const { onRegisterHotkey } = useDispatch().phimTat;
  const refF4 = useRef();
  const refF12 = useRef();
  const refModalNhapLyDo = useRef(null);

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getTheoTaiKhoan({ nhaThuoc: true });
    getAllTongHop({ active: true });
    // đăng ký phím tắt
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refF4.current && refF4.current();
          },
        },
        {
          keyCode: 123, //F12
          onEvent: () => {
            if (refF12.current) refF12.current();
          },
        },
      ],
    });
  }, []);

  refF12.current = () => {
    if (
      !infoPatient?.phieuThu?.thanhToan &&
      (infoPatient?.phieuXuat?.trangThai === 10 ||
        infoPatient?.phieuXuat?.trangThai === 15 ||
        infoPatient?.phieuXuat?.trangThai === 20) &&
      refModalNotification.current
    )
      refModalNotification.current.show();
  };

  useEffect(() => {
    if (listKhoUser?.length === 1) {
      // default khoId , nếu kho chỉ có 1 giá trị
      setState({ khoId: listKhoUser[0].id });
      updateData({ khoId: listKhoUser[0].id });
    }
  }, [listKhoUser]);

  const onChange = (key) => (e) => {
    const value = (e?.target && e.target.value) || e;
    setState({ [key]: value });
    if (key === "khoId") {
      updateData({ khoId: value });
    }
  };

  const onHuyPhat = () => {
    refModalNhapLyDo.current &&
      refModalNhapLyDo.current.show(
        {
          title: "Lý do hủy phát ",
          message: "Điền lý do hủy phát",
        },
        (lyDo) => {
          postHuyDuyet({ id, lyDo }).then(() => {
            console.log("aaaaa");
            searchDonThuoc(id);
          });
        }
      );
  };
  const onPhat = () => {
    postDuyet({ id }).then((res) => {
      history.push("/kho/phat-thuoc-ngoai-tru");
    });
  };
  const renderButton = () => {
    return (
      <div className="footer">
        <Row className="select-row-last">
          {infoPatient?.phieuXuat?.trangThai !== 30 ? (
            <Button type="primary" minWidth={100} onClick={onPhat}>
              Phát
            </Button>
          ) : (
            <Button type="primary" minWidth={100} onClick={onHuyPhat}>
              Huỷ Phát
            </Button>
          )}
        </Row>
      </div>
    );
  };

  return (
    <Main>
      <div className="info">
        <div className="title">Thông tin đơn thuốc</div>
        <Row className="select-row-2">
          <div className="title-item">Kho:</div>
          <div className="title-item">
            <b>
              {(listAllKho || []).find((x) => x.id === infoPatient?.khoId)?.ten}
            </b>
          </div>
        </Row>
        <Row className="select-row-2">
          <div className="title-item">Thành tiền:</div>
          <div className="title-item">
            <b>
              {infoPatient?.dsThuoc
                ?.reduce(
                  (total, item) =>
                    (total = total + (item.nbDichVu.thanhTien || 0)),
                  0
                )
                .formatPrice()}
            </b>
          </div>
        </Row>

        <Row>
          <div
            xxl={24}
            className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}
          >
            Ghi chú
          </div>
          <textarea
            className="textarea"
            // defaultValue={selectedDonThuoc?.nbDichVu?.ghiChu}
            onChange={onChange("ghiChu")}
            defaultValue={infoPatient?.phieuXuat?.ghiChu}
            onBlur={(e) => {
              if (isThemMoi) {
              } else {
                updateGhiChuDonThuocById({
                  id,
                  phieuXuat: { ghiChu: e.target.value },
                });
              }
            }}
          ></textarea>
        </Row>

        <Row>
          <div
            className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}
          >
            Số phiếu: {infoPatient?.phieuXuat?.soPhieu}
          </div>
        </Row>

        <Row>
          <div
            className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}
          >
            Trạng thái đơn:
            <span
              style={{
                color:
                  infoPatient?.phieuXuat?.trangThai === 15 ? "red" : "#049254",
              }}
            >
              {` ${
                infoPatient?.phieuXuat?.trangThai
                  ? listTrangThaiPhieuNhapXuat?.find(
                      (item) => item.id === infoPatient?.phieuXuat?.trangThai
                    )?.ten || ""
                  : ""
              }`}
            </span>
          </div>
        </Row>
        <Row>
          <div
            className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}
          >
            Thời gian phát:
            {` ${
              infoPatient?.phieuXuat?.thoiGianDuyet
                ? moment(infoPatient?.phieuXuat?.thoiGianDuyet).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : ""
            }`}
          </div>
        </Row>
        <Row>
          <div
            className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}
          >
            Người phát:
            {` ${
              infoPatient?.phieuXuat?.nguoiDuyet?.ten
                ? infoPatient.phieuXuat.nguoiDuyet.ten
                : ""
            }`}
          </div>
        </Row>
      </div>
      <div>{renderButton()}</div>
      <ModalNhapLyDo ref={refModalNhapLyDo} />
    </Main>
  );
};

export default ThongTinDonThuoc;
