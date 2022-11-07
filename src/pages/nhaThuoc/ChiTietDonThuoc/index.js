import { Col, Row, Tooltip } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import ThongTinDonThuoc from "./RightPanel/ThongTinDonThuoc";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import IcCreate from "assets/svg/thuNgan/iconCreate.svg";
import IcDelete from "assets/svg/chuanDoanHinhAnh/delete.svg";
import TrangThai from "pages/kho/components/TrangThai";
import Header from "pages/kho/components/Header";
import MainPage from "pages/kho/components/MainPage";
import ThongTinNguoiBenh from "./LeftPanel/ThongTinNguoiBenh";
import ThemMoi from "./LeftPanel/ThemMoi";
import DanhSach from "./LeftPanel/DanhSach";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";

const ChiTietDonThuoc = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();

  const { chains } = useMemo(() => {
    return {
      chains: [
        { link: "/quan-ly-nha-thuoc", title: t("nhaThuoc.nhaThuoc") },
        { link: "/nha-thuoc", title: t("nhaThuoc.donThuoc") },
        { link: "/nha-thuoc/chi-tiet" + id, title: t("common.chiTiet") },
      ],
    };
  }, [window.location]);

  const { infoPatient, khoId, dsPhuongThucTt } = useSelector(
    (state) => state.thuocChiTiet
  );


  const refLayerHotKey = useRef(stringUtils.guid());

  const {
    phimTat: { onAddLayer, onRemoveLayer },
    thuocChiTiet: {
      clearData,
      searchDonThuoc,
      getPhuongThucTT,
      deleteDonThuoc,
    },
    themMoiThuoc: { macDinh },
    lieuDung: { getListAllLieuDung },
    bacSiNgoaiVien: { getListAllBacSiNgoaiVien },
    vanBang: { getListAllVanBang },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    getListAllBacSiNgoaiVien({ page: "", size: "", active: true });
    getListAllVanBang({ page: "", size: "", active: true });
    getListNhanVienTongHop({
      dsMaThietLapVanBang: "BAC_SI",
      page: "",
      size: "",
      active: true,
    });
    return () => {
      clearData({});
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const isThemMoi = useMemo(() => {
    return id === undefined;
  }, [id]);
  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianTaoPhieu } = infoPatient?.phieuXuat || {};
    return [thoiGianTaoPhieu, thoiGianDuyet].map((item) => item);
  }, [infoPatient?.phieuXuat]);

  useEffect(() => {
    macDinh();
    getPhuongThucTT({ page: 0, active: true, size: 1000 });
    getListAllLieuDung({ page: "", size: "" });
  }, []);
  useEffect(() => {
    if (id) {
      searchDonThuoc(id);
    }
  }, [id]);
  const onDelete = () => {
    refConfirm &&
      refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Thông báo",
          content: `Xác nhận xóa đơn thuốc?`,
          cancelText: "Huỷ",
          okText: "Đồng ý",
          showBtnOk: true,
        },
        async () => {
          await deleteDonThuoc(id);
          history.push("/nha-thuoc");
        },
        () => {}
      );
  };

  return (
    <Main>
      <Header>
        <Breadcrumb chains={chains}></Breadcrumb>
        <TrangThai times={times} type={3} />
      </Header>
      <MainPage
        title={
          <div>
            Đơn thuốc
            <div className="header-action">
              <div
                className="action-btn"
                onClick={() => {
                  clearData({ khoId: khoId, dsPhuongThucTt });
                  history.push("/nha-thuoc/them-moi");
                }}
              >
                <Tooltip title={`Tạo mới đơn thuốc cho người bệnh vãng lai`}>
                  <IcCreate />
                </Tooltip>
              </div>
              {!infoPatient?.phieuThu?.thanhToan &&
                infoPatient?.phieuXuat?.trangThai === 15 && (
                  <div className="action-btn" onClick={onDelete}>
                    <Tooltip title={`Xóa đơn thuốc`}>
                      <IcDelete />
                    </Tooltip>
                  </div>
                )}
            </div>
          </div>
        }
      >
        <Row gutter={[12, 12]} style={{ height: "100%" }}>
          <Col xl={17} xxl={19} className="flexc">
            {isThemMoi ? (
              <ThemMoi layerId={refLayerHotKey.current} />
            ) : (
              <ThongTinNguoiBenh layerId={refLayerHotKey.current} />
            )}
            <DanhSach
              isThemMoi={isThemMoi}
              layerId={refLayerHotKey.current}
              className="flex1"
            />
          </Col>
          <Col xl={7} xxl={5} className="flexc">
            <ThongTinDonThuoc
              className="flex2"
              isThemMoi={isThemMoi}
              layerId={refLayerHotKey.current}
            />
          </Col>
        </Row>
      </MainPage>
    </Main>
  );
};

export default ChiTietDonThuoc;
