import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Col, Row } from "antd";
import Navigation from "pages/chanDoanHinhAnh/tiepNhan/ThongTin/navigationPage";
import StepWrapper from "../StepWrapper";
import { Element } from "react-scroll";
import { listNav } from "pages/chanDoanHinhAnh/tiepNhan/ThongTin/config.js";
import ChiDinhDichVu from "pages/chanDoanHinhAnh/tiepNhan/ChiDinhDichVu";
import DonThuoc from "pages/chanDoanHinhAnh/tiepNhan/DonThuoc";
import useWindowSize from "hook/useWindowSize";
import IcClose from "assets/images/kho/icClose.png";
import VatTu from "pages/chanDoanHinhAnh/tiepNhan/VatTu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalChiDinh from "pages/chanDoanHinhAnh/tiepNhan/ModalChiDinh";
import { useTranslation } from "react-i18next";
const ModalChiDinhDichVuThem = (props, ref) => {
  const { t } = useTranslation();
  const [elementKey, setElementKey] = useState(0);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const {
    dsBenhNhan: { dsPhongThucHienId, khoaId },
    nhanVien: { listAllNhanVien },
    thietLapChonKho: { listThietLapChonKho },
    chiDinhDichVuCls: { neededUpdateRecord },
  } = useSelector((state) => state);

  const {
    thietLapChonKho: { getListThietLapChonKhoTheoTaiKhoan },
    chiDinhDichVuCls: { updateData: updateDataChiDinh },
  } = useDispatch();

  const windowSize = useWindowSize();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, data });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const handleScroll = (key) => {
    const keyNum = +key;
    setElementKey(keyNum);
  };

  useEffect(() => {
    let payload = {
      khoaNbId: state?.data?.khoaThucHienId,
      khoaChiDinhId: khoaId,
      doiTuong: state?.data?.doiTuong,
      loaiDoiTuongId: state?.data?.loaiDoiTuongId,
      capCuu: state?.data?.capCuu,
      phongId: dsPhongThucHienId,
      canLamSang: true,
      loaiDichVu: elementKey === 2 ? 100 : 90,
      noiTru: state?.data?.noiTru
    };
    getListThietLapChonKhoTheoTaiKhoan({ ...payload });
  }, [listAllNhanVien, state?.data, elementKey]);

  const onCancelUpdateRecord = () => {
    updateDataChiDinh({
      neededUpdateRecord: [],
    });
  };

  return (
    <ModalStyled
      width={1272}
      height={809}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <div className="dichvu">
              <span>{t("xetNghiem.chiTietDichVu")}: </span>
              <span style={{ fontWeight: "bold" }}>
                {state?.data?.tenDichVu}
              </span>
            </div>
            <div className="chandoan">
              <span>{t("xetNghiem.chanDoanSoBo")}: </span>
              <span style={{ fontWeight: "bold" }}>{state?.data?.cdSoBo} </span>
            </div>
          </div>
          <div className="header__right" onClick={onCancel}>
            <img src={IcClose} alt="..." />
          </div>
        </Row>
        <Row>
          <Col span={18}>
            <StepWrapper elementKey={elementKey}>
              <Element name={"0"} className="element element-page">
                <ChiDinhDichVu
                  dataNbChiDinh={state?.data}
                  elementKey={elementKey}
                />
              </Element>
              <Element name={"1"} className="element element-page">
                <DonThuoc
                  elementKey={elementKey}
                  dataNbChiDinh={state?.data}
                  dataKho={listThietLapChonKho || []}
                />
              </Element>
              <Element name={"2"} className="element element-page">
                <VatTu
                  elementKey={elementKey}
                  dataNbChiDinh={state?.data}
                  dataKho={listThietLapChonKho || []}
                />
              </Element>
            </StepWrapper>
          </Col>
          <Col span={6} style={{ paddingTop: 43 }}>
            {listNav.map((item) => {
              return (
                <Navigation
                  {...item}
                  key={item.title}
                  handleScroll={handleScroll}
                  padding={(windowSize.height - 700) / 10}
                />
              );
            })}
          </Col>
        </Row>
      </Main>
      <ModalChiDinh
        visible={neededUpdateRecord.length}
        dataSource={neededUpdateRecord}
        dataNbChiDinh={state?.data}
        onCancel={onCancelUpdateRecord}
      />
    </ModalStyled>
  );
};

export default forwardRef(ModalChiDinhDichVuThem);
