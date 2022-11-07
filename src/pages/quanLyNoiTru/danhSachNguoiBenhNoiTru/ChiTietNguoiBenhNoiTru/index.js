import React, {
  useEffect,
  memo,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import { Col, Row, Dropdown, Menu, message } from "antd";
import { Main, MainPage } from "./styled";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import ThongTinVaoVien from "./ThongTinVaoVien";
import ModalChuyenKhoa from "./Modal/ModalChuyenKhoa";
import ModalNghiDieuTri from "./Modal/ModalNghiDieuTri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CaretDownOutlined, PrinterOutlined } from "@ant-design/icons";
import ToDieuTri from "./ToDieuTri";
import ThongTinToDieuTri from "./ToDieuTri/ThongTinToDieuTri";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button, Card, Tabs } from "components";
import { DOI_TUONG_KCB, ROLES, TRANG_THAI_NB } from "constants/index";
import PhongGiuong from "./PhongGiuong";
import DieuTriSoKet from "./DieuTriSoKet";
import { useTranslation } from "react-i18next";
import ModalSignPrint from "components/ModalSignPrint";
import DvNgoaiTru from "./DvNgoaiTru";
import { checkRole } from "utils/role-utils";
import BienBanHoiChan from "./BienBanHoiChan";
import DvNgoaiDieuTri from "./DvNgoaiDieuTri";
import { useLoading, useStore } from "hook";
import { printJS } from "data-access/print-provider";
import ModalDongHoSo from "./Modal/ModalKetThucDieuTri";
import ModalChuyenVien from "./ThongTinVaoVien/ModalChuyenVien";
import IcThongTinChung from "assets/svg/noiTru/ic-thong-tin-chung.svg";
import IcPhongGiuong from "assets/svg/noiTru/ic-phong-giuong.svg";
import IcToDieuTri from "assets/svg/noiTru/ic-to-dieu-tri.svg";
import IcDoChiSoSong from "assets/svg/noiTru/ic-do-chi-so-song.svg";
import IcSoKet from "assets/svg/noiTru/ic-so-ket.svg";
import IcHoiChan from "assets/svg/noiTru/ic-hoi-chan.svg";
import IcDvNgoaiDieuTri from "assets/svg/noiTru/ic-dv-ngoai-dieu-tri.svg";
import IcXacNhanHIV from "assets/svg/noiTru/ic-xac-nhan-hiv.svg";
import IcDvNgoaiTru from "assets/svg/noiTru/ic-dv-ngoai-tru.svg";
import ModalDuKienRaVien from "./Modal/ModalDuKienRaVien";
import cacheUtils from "utils/cache-utils";
import ModalYeuCauMuonNb from "./Modal/ModalYeuCauMuonNb";
import ModalKiemTraHoSo from "./Modal/ModalKiemTraHoSo";
import ModalDuyetYeuCauMuonNb from "./Modal/ModalDuyetYeuCauMuonNb";
import ModalNgatDieuTri from "./Modal/ModalNgatDieuTri";
import SoDoPhongGiuong from "../../soDoPhongGiuong";
import ModalGiayChuyenTuyen from "./Modal/ModalGiayChuyenTuyen";
import ModalKhoaLamViec from "pages/phauThuatThuThuat/DanhSachNguoiBenh/ModalKhoaLamViec";
import ModalHoanThanhBA from "./Modal/ModalHoanThanhBA";
import GoiPtTt from "./GoiPtTt";
import IcPhauThuat from "assets/svg/noiTru/ic-phau-thuat-2.svg";
import VitalSigns from "components/VitalSigns";
import DvNoiTru from "./DvNoiTru";
import ModalInPhieuCongKhai from "./Modal/ModalInPhieuCongKhai";

const ChiTietNguoiBenhNoiTru = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const keyRouteProvider = ["to-dieu-tri/them-moi"];
  const { id } = useParams();
  const refChuyenKhoa = useRef(null);
  const refSoDoPhongGiuong = useRef(null);
  const refModalNghiDieuTri = useRef(null);
  const refThongTinToDieuTri = useRef(null);
  const refModalSignPrint = useRef(null);
  const refModalDongHoSo = useRef(null);
  const refModalChuyenVien = useRef(null);
  const refModalDuKienRaVien = useRef(null);
  const refModalYeuCauMuonNb = useRef(null);
  const refKiemTraHoSo = useRef(null);
  const refModalDuyetYeuCauMuonNb = useRef(null);
  const refModalNgatDieuTri = useRef(null);
  const refModalGiayChuyenTuyen = useRef(null);
  const refKhoaLamViec = useRef();
  const refModalHoanThanhBA = useRef(null);
  const refModalInPhieuCongKhai = useRef(null);

  const { infoPatient, keyRoute, toDieuTriThemMoi } = useStore(
    "danhSachNguoiBenhNoiTru",
    {}
  );
  const { activeKey } = useStore("toDieuTri", null);
  const { listKhoaTheoTaiKhoan } = useStore("khoa", []);

  const { trangThai, khoaNbId } = infoPatient || {};

  const {
    danhSachNguoiBenhNoiTru: {
      getNbNoiTruById,
      updateData,
      tiepNhanVaoKhoa,
      tuChoiVaoKhoa,
      huyTiepNhanVaoKhoa,
      choVaoVienLai,
      getDanhSachMuonNb,
    },
    maBenh: { getListAllMaBenh },
    toDieuTri: { getToDieuTri, updateData: updateDataToDieuTri, createOrEdit },
    nhanVien: { getListNhanVienTongHop },
    phieuIn: { getListPhieu, getFilePhieuIn, showFileEditor },
    nbDotDieuTri: { getThongTinRaVien, updateData: updateNbDotDieuTri },
    quanLyNoiTru: { getGiayChuyenVienById },
    soDoPhongGiuong: { updateDataSearch },
    nbDvKho: { getNbTonTaiTraKho },
    dsLuuTruBa: { getChiTietLuuTruBA },
  } = useDispatch();
  const { nbTonTaiVatTu } = useSelector((state) => state.nbDvKho);
  const { chiTietLuuTru } = useSelector((state) => state.dsLuuTruBa);
  const { nbThongTinRaVien, coTheRaVien } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const listDsMuonNb = useStore("danhSachNguoiBenhNoiTru.listDsMuonNb", []);
  const { showLoading, hideLoading } = useLoading();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  // -------------------------------------------------------------------------
  useEffect(() => {
    // dùng compare route vì người dùng nhấn quay lại của browser sẽ quay lại danh sách
    let keyRoute = "";
    if (props?.location?.pathname?.includes(keyRouteProvider[0])) {
      keyRoute = keyRouteProvider[0];
    }
    updateData({ keyRoute });
  }, [props?.location?.pathname]);

  useEffect(() => {
    getListAllMaBenh({ active: true, page: "", size: "" });
  }, []);

  useEffect(() => {
    if (infoPatient) {
      getListNhanVienTongHop({ khoaId: infoPatient?.khoaNbId });
      if (state?.khoaLamViec?.id) {
        getDanhSachMuonNb({
          nbDotDieuTriId: infoPatient?.id,
          tuKhoaId: state?.khoaLamViec?.id,
        });
      }
    }
  }, [infoPatient, state?.khoaLamViec]);
  useEffect(() => {
    if (infoPatient) {
      if (state?.khoaLamViec?.id) {
        getNbTonTaiTraKho({
          nbDotDieuTriId: infoPatient?.id,
          khoaChiDinhId: state?.khoaLamViec?.id,
        });
      }
    }
  }, [infoPatient, state?.khoaLamViec]);
  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      if (!khoaLamViec) {
        if (listKhoaTheoTaiKhoan.length > 1) {
          refKhoaLamViec.current &&
            refKhoaLamViec.current.show({}, (data) => {
              cacheUtils.save("DATA_KHOA_LAM_VIEC", "", data, false);
              setState({ khoaLamViec: data });
            });
        } else {
          cacheUtils.save(
            "DATA_KHOA_LAM_VIEC",
            "",
            listKhoaTheoTaiKhoan[0],
            false
          );
          setState({ khoaLamViec: listKhoaTheoTaiKhoan[0] });
        }
      } else {
        setState({ khoaLamViec });
      }
    }
    fetchData();
  }, [listKhoaTheoTaiKhoan]);

  const isReadonly = useMemo(() => {
    return (
      (infoPatient?.khoaNbId !== state?.khoaLamViec?.id ||
        [
          TRANG_THAI_NB.DANG_CHUYEN_KHOA,
          TRANG_THAI_NB.HEN_DIEU_TRI,
          TRANG_THAI_NB.DA_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
        ].includes(infoPatient?.trangThai)) &&
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA])
    );
  }, [infoPatient, state?.khoaLamViec]);
  // -------------------------------------------------------------------------
  const listTabs = [
    {
      name: "Thông tin chung",
      component: <ThongTinVaoVien />,
      iconTab: <IcThongTinChung />,
    },
    {
      name: "Phòng, giường",
      component: <PhongGiuong isReadonly={isReadonly} />,
      iconTab: <IcPhongGiuong />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].PHONG_GIUONG],
    },
    {
      name: "Tờ điều trị, chỉ định",
      component: <ToDieuTri isReadonly={isReadonly} />,
      iconTab: <IcToDieuTri />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].TO_DIEU_TRI],
    },
    {
      name: "Gói mổ 10 ngày",
      component: <GoiPtTt />,
      iconTab: <IcPhauThuat />,
      accessRoles: [],
    },
    {
      name: "Đo chỉ số sống",
      component: (
        <VitalSigns
          isReadonly={isReadonly}
          isEdit={
            infoPatient?.trangThai !== TRANG_THAI_NB.CHO_TIEP_NHAN_VAO_KHOA
          }
        />
      ),
      iconTab: <IcDoChiSoSong />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].DO_CHI_SO_SONG],
    },
    {
      name: "Sơ kết 15 ngày",
      component: <DieuTriSoKet />,
      iconTab: <IcSoKet />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].SO_KET_15_NGAY],
    },
    {
      name: "Hội chẩn",
      component: <BienBanHoiChan />,
      iconTab: <IcHoiChan />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].HOI_CHAN],
    },
    {
      name: "DV ngoài điều trị",
      component: <DvNgoaiDieuTri isReadonly={isReadonly} />,
      iconTab: <IcDvNgoaiDieuTri />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].DV_NGOAI_DIEU_TRI],
    },
    {
      name: "Xác nhận HIV",
      iconTab: <IcXacNhanHIV />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].XAC_NHAN_HIV],
    },
    {
      name: "DV ngoại trú",
      component: <DvNgoaiTru />,
      iconTab: <IcDvNgoaiTru />,
      accessRoles: [ROLES["QUAN_LY_NOI_TRU"].DV_NGOAI_TRU],
    },
    {
      name: "DV nội trú",
      component: <DvNoiTru />,
      iconTab: <IcDvNgoaiTru />,
      accessRoles: [],
    },
  ];

  useEffect(() => {
    if (id) {
      getNbNoiTruById(id).then((res) => {
        if (
          res?.trangThai &&
          [
            TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
            TRANG_THAI_NB.DA_RA_VIEN,
          ].includes(res?.trangThai)
        ) {
          getChiTietLuuTruBA(id);
        }
      });
      getToDieuTri({ nbDotDieuTriId: id });
      getThongTinRaVien(id);

      Promise.all([
        getListPhieu({
          nbDotDieuTriId: id,
          maManHinh: "006",
          maViTri: "00601",
          chiDinhTuLoaiDichVu: 200,
        }),
        getListPhieu({
          nbDotDieuTriId: id,
          maManHinh: "006",
          maViTri: "00602",
          chiDinhTuLoaiDichVu: 200,
        }),
      ])
        .then((listPhieu) => {
          setState({
            listPhieuBacSi: listPhieu[0] || [],
            listPhieuDieuDuong: listPhieu[1] || [],
          });
        })
        .catch((e) => {
          // debugger;
        });
    }
  }, [id]);

  useEffect(() => {
    if (!coTheRaVien) {
      refKiemTraHoSo.current &&
        refKiemTraHoSo.current.show({ khoaLamViec: state.khoaLamViec });
      refModalDongHoSo.current && refModalDongHoSo.current.hide();

      updateNbDotDieuTri({ coTheRaVien: true });
    }
  }, [coTheRaVien]);

  const onChuyenKhoa = () => {
    getNbNoiTruById(id);
    refChuyenKhoa.current && refChuyenKhoa.current.show();
  };
  const onSubmit = useCallback(
    async (e) => {
      let name = e?.currentTarget?.name;
      if (name === "huyTiepNhanNb") {
        await huyTiepNhanVaoKhoa({ id: infoPatient?.id });
      } else if (name === "tiepNhanVaoKhoa") {
        await tiepNhanVaoKhoa({ id: infoPatient?.id });
      } else if (name === "tuChoiTiepNhanVaoKhoa") {
        await tuChoiVaoKhoa({ id: infoPatient?.id });
      }
      getNbNoiTruById(id);
    },
    [infoPatient?.id, id]
  );

  const onChange = (e) => {
    updateDataToDieuTri({ activeKey: e });
  };
  const onSave = () => {
    const data = refThongTinToDieuTri.current
      ? refThongTinToDieuTri.current.getData()
      : {};

    if (!data.dienBienBenh) {
      message.error(t("quanLyNoiTru.vuiLongNhapDienBienBenh"));
    } else {
      const payload = {
        ...data,
        nbDotDieuTriId: id,
        khoaChiDinhId: infoPatient?.khoaNbId,
        thoiGianYLenh: moment(data?.thoiGianYLenh).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        thoiGianKham: moment(data?.thoiGianKham).format("YYYY-MM-DD HH:mm:ss"),
      };
      createOrEdit({
        ...payload,
      }).then((s) => {
        history.push(
          `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/to-dieu-tri/${s?.id}`
        );
      });
    }
  };
  const onPrint = (type) => () => {
    refModalSignPrint.current.show({
      nbDotDieuTriId: id,
      maManHinh: "006",
      maViTri: type == 0 ? "00601" : "00602",
      chiDinhTuLoaiDichVu: 201,
    });
  };

  const getFileAndPrint = async (payload) => {
    try {
      showLoading();
      const { finalFile } = await getFilePhieuIn(payload);
      printJS({
        printable: finalFile,
        type: "pdf",
      });
    } catch (error) {
    } finally {
      hideLoading();
    }
  };
  const onPrintPhieu = (type, item) => async () => {
    if (item.key == 0) {
      onPrint(type)();
    } else {
      if (item.type == "editor") {
        showFileEditor({ phieu: item, nbDotDieuTriId: id });
      } else if (item.ma == "P092") {
        refModalInPhieuCongKhai.current &&
          refModalInPhieuCongKhai.current.show(
            { khoaLamViec: state.khoaLamViec },
            async (data) => {
              const {
                tuThoiGianThucHien,
                denThoiGianThucHien,
                nhomDichVuCap1Id,
                khoaChiDinhId,
              } = data;

              await getFileAndPrint({
                listPhieus: [item],
                showError: true,
                nbDotDieuTriId: id,
                tuThoiGianThucHien,
                denThoiGianThucHien,
                nhomDichVuCap1Id,
                khoaChiDinhId,
              });
            }
          );
      } else {
        await getFileAndPrint({
          listPhieus: [item],
          nbDotDieuTriId: id,
          chiDinhTuLoaiDichVu: 201,
          showError: true,
        });
      }
    }
  };

  const onDongHoSo = () => {
    refModalDongHoSo.current && refModalDongHoSo.current.show();
  };

  const onChoVaoVienLai = () => {
    choVaoVienLai({ id }).then(() => {
      getNbNoiTruById(id);
    });
  };

  const onDuKienRaVien = () => {
    refModalDuKienRaVien.current && refModalDuKienRaVien.current.show();
  };

  const onYeuCauMuonNb = () => {
    refModalYeuCauMuonNb.current && refModalYeuCauMuonNb.current.show();
  };

  const onDuyetYeuCauMuonNb = () => {
    refModalDuyetYeuCauMuonNb.current &&
      refModalDuyetYeuCauMuonNb.current.show();
  };

  const onNgatDieuTri = () => {
    refModalNgatDieuTri.current && refModalNgatDieuTri.current.show();
  };

  const onShowDsGiayChuyenTuyen = () => {
    refModalGiayChuyenTuyen.current && refModalGiayChuyenTuyen.current.show();
  };

  const menuBacSi = useMemo(() => {
    // debugger;
    const phieus = [
      { key: 0, ten: t("phieuIn.inTatCa") },
      ...(state.listPhieuBacSi || []),
    ];
    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={onPrintPhieu(0, item)}>
              {item.ten || item.tenBaoCao}
            </a>
          ),
        }))}
      />
    );
  }, [state.listPhieuBacSi]);
  const menuDieuDuong = useMemo(() => {
    // debugger;
    const phieus = [
      { key: 0, ten: t("phieuIn.inTatCa") },
      ...(state.listPhieuDieuDuong || []),
    ];

    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a onClick={onPrintPhieu(1, item)}>{item.ten || item.tenBaoCao}</a>
          ),
        }))}
      />
    );
  }, [state.listPhieuDieuDuong]);
  const onNghiDieuTri = () => {
    refModalNghiDieuTri.current &&
      refModalNghiDieuTri.current.show({
        nbDotDieuTri: id,
      });
  };

  const onShowModalChuyenVien = (dsCdRaVienId) => {
    //
    if (refModalChuyenVien.current) {
      // getGiayChuyenVienById(infoPatient.id).then((s) => {
      setState({
        nbChanDoan: {
          dsCdChinhId: dsCdRaVienId
            ? dsCdRaVienId
            : infoPatient?.dsCdRaVienId || null,
        },
        nbChuyenVien: {
          nbDotDieuTriId: infoPatient.id,
        },
      });
      refModalChuyenVien.current.show();
      // });
    }
  };

  const dsKhoaId = useMemo(() => {
    if (state?.khoaLamViec?.id) {
      return [state?.khoaLamViec?.id];
    } else {
      return listKhoaTheoTaiKhoan.map((item) => item?.id);
    }
  }, [state?.khoaLamViec, listKhoaTheoTaiKhoan]);

  const onKiemTraHoSo = () => {
    refKiemTraHoSo.current &&
      refKiemTraHoSo.current.show({ khoaLamViec: state.khoaLamViec });
  };

  const onHoanThanhBa = () => {
    refModalHoanThanhBA.current && refModalHoanThanhBA.current.show();
  };

  const renderContent = useCallback(() => {
    switch (keyRoute) {
      case keyRouteProvider[0]: {
        return (
          <>
            <Card className="content">
              <ThongTinToDieuTri ref={refThongTinToDieuTri} />
            </Card>
            <Row className="action-bottom">
              <div className="button-right">
                <Button
                  minWidth={100}
                  onClick={() => {
                    history.push(
                      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${id}`
                    );
                  }}
                >
                  Quay lại
                </Button>
                <Button type="primary" minWidth={100} onClick={() => onSave()}>
                  Lưu
                </Button>
              </div>
            </Row>
          </>
        );
      }
      default: {
        return (
          <>
            <Card className="content">
              <Tabs.Left
                defaultActiveKey={activeKey || "0"}
                tabPosition={"left"}
                tabWidth={220}
                type="card"
                moreIcon={<CaretDownOutlined />}
                onChange={onChange}
                className="tab-main"
              >
                {[...listTabs].map((obj, i) => {
                  return (
                    <Tabs.TabPane
                      key={i}
                      tab={
                        <div>
                          {obj?.iconTab}
                          {obj?.name}
                        </div>
                      }
                    >
                      {checkRole(obj.accessRoles) && obj?.component}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs.Left>
            </Card>

            <Row className="action-bottom">
              <div className="button-left">
                {(trangThai === TRANG_THAI_NB.DA_RA_VIEN ||
                  trangThai === TRANG_THAI_NB.HEN_DIEU_TRI) && (
                  <Button onClick={() => onChoVaoVienLai()}>
                    {t("quanLyNoiTru.choVaoVienLai")}
                  </Button>
                )}

                <div style={{ display: "flex" }}>
                  {trangThai === TRANG_THAI_NB.DANG_DIEU_TRI &&
                    (dsKhoaId || []).includes(khoaNbId) && (
                      <>
                        <Button onClick={onSubmit} name="huyTiepNhanNb">
                          {t("quanLyNoiTru.huyTiepNhanNb")}
                        </Button>
                        <Button onClick={onNghiDieuTri}>
                          {t("quanLyNoiTru.nghiDieuTri")}
                        </Button>
                        <Button onClick={() => onChuyenKhoa()}>
                          {t("quanLyNoiTru.chuyenKhoan")}
                        </Button>
                        <Button onClick={() => onDuKienRaVien()}>
                          {t("quanLyNoiTru.duKienRaVien")}
                        </Button>
                        {!!(listDsMuonNb || []).filter(
                          (x) => x.trangThai === 10
                        )?.length && (
                          <Button onClick={() => onDuyetYeuCauMuonNb()}>
                            {t("quanLyNoiTru.duyetYeuCauMuonNb")}
                          </Button>
                        )}
                      </>
                    )}

                  {[
                    TRANG_THAI_NB.DANG_DIEU_TRI,
                    TRANG_THAI_NB.CHO_HOAN_TAT_THU_TUC_RA_VIEN,
                  ].includes(trangThai) &&
                    (dsKhoaId || []).includes(khoaNbId) && (
                      <>
                        <Button onClick={onDongHoSo}>
                          {t("quanLyNoiTru.ketThucDieuTri")}
                        </Button>

                        {infoPatient?.doiTuongKcb ===
                          DOI_TUONG_KCB.DIEU_TRI_NGOAI_TRU && (
                          <Button onClick={() => onNgatDieuTri()}>
                            {t("quanLyNoiTru.ngatDieuTri")}
                          </Button>
                        )}
                      </>
                    )}
                </div>
                {trangThai === TRANG_THAI_NB.DANG_DIEU_TRI &&
                  state?.khoaLamViec &&
                  khoaNbId !== state?.khoaLamViec?.id && (
                    <div style={{ display: "flex" }}>
                      <Button onClick={() => onYeuCauMuonNb()}>
                        {t("quanLyNoiTru.yeuCauMuonNb")}
                      </Button>
                    </div>
                  )}
                {nbThongTinRaVien?.huongDieuTri === 40 && (
                  <Button onClick={() => onShowDsGiayChuyenTuyen()}>
                    {"Giấy chuyển tuyến"}
                  </Button>
                )}

                {trangThai === TRANG_THAI_NB.HEN_DIEU_TRI &&
                  infoPatient?.doiTuongKcb ===
                    DOI_TUONG_KCB.DIEU_TRI_NGOAI_TRU &&
                  (dsKhoaId || []).includes(khoaNbId) && (
                    <Button>{t("quanLyNoiTru.tiepDonHenDieuTri")}</Button>
                  )}

                <Button onClick={onKiemTraHoSo}>
                  {t("quanLyNoiTru.kiemTraHoSo")}
                </Button>
                {nbTonTaiVatTu && (
                  <Button
                    onClick={() => {
                      history.push(
                        "/quan-ly-noi-tru/tra-hang-hoa/" + infoPatient?.id
                      );
                    }}
                    name="traThuocVatTuHoaChat"
                  >
                    {t("quanLyNoiTru.traThuocVatTuHoaChat")}
                  </Button>
                )}

                {[
                  TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
                  TRANG_THAI_NB.DA_RA_VIEN,
                ].includes(trangThai) && (
                  <>
                    {[20, 40].includes(chiTietLuuTru?.trangThaiBenhAn) && (
                      <Button onClick={() => onHoanThanhBa()}>
                        {t("quanLyNoiTru.huyHoanThanhBa")}
                      </Button>
                    )}

                    {[null, 10].includes(chiTietLuuTru?.trangThaiBenhAn) && (
                      <Button onClick={() => onHoanThanhBa()}>
                        {t("quanLyNoiTru.hoanThanhBa")}
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className="button-right">
                {trangThai === TRANG_THAI_NB.DANG_CHUYEN_KHOA && (
                  <Button onClick={onSubmit} name="tuChoiTiepNhanVaoKhoa">
                    {t("quanLyNoiTru.tuChoiTiepNhanVaoKhoa")}
                  </Button>
                )}
                {(trangThai === TRANG_THAI_NB.CHO_TIEP_NHAN_VAO_KHOA ||
                  trangThai === TRANG_THAI_NB.DANG_CHUYEN_KHOA) && (
                  <Button
                    type="primary"
                    onClick={onSubmit}
                    name="tiepNhanVaoKhoa"
                  >
                    {t("quanLyNoiTru.tiepNhanVaoKhoa")}
                  </Button>
                )}
                <Dropdown overlay={menuBacSi}>
                  <Button
                    // onClick={onPrint(0)}
                    rightIcon={<PrinterOutlined />}
                    iconHeight={15}
                  >
                    {t("quanLyNoiTru.inBacSi")}
                  </Button>
                </Dropdown>
                <Dropdown overlay={menuDieuDuong}>
                  <Button
                    // onClick={onPrint(0)}
                    rightIcon={<PrinterOutlined />}
                    iconHeight={15}
                  >
                    {t("quanLyNoiTru.inDieuDuong")}
                  </Button>
                </Dropdown>
                {/* <Button
                  // onClick={onPrint(1)}
                  rightIcon={<PrinterOutlined />}
                  iconHeight={15}
                >
                  {t("quanLyNoiTru.inDieuDuong")}
                </Button> */}
              </div>
            </Row>
          </>
        );
      }
    }
  }, [
    keyRoute,
    toDieuTriThemMoi,
    id,
    infoPatient,
    trangThai,
    state.listPhieuBacSi,
    state.listPhieuDieuDuong,
    isReadonly,
    state?.khoaLamViec,
    nbTonTaiVatTu,
    chiTietLuuTru?.trangThaiBenhAn,
  ]);
  console.log("render");
  const openModalPhongGiuong = () => {
    updateDataSearch({
      nbDotDieuTriId: infoPatient?.id,
      khoaId: infoPatient?.khoaNbId,
    });
    refSoDoPhongGiuong.current && refSoDoPhongGiuong.current.show();
  };

  return (
    <MainPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          link: `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${infoPatient?.id}`,
          title: "Điều trị nội trú",
        },
      ]}
    >
      <Main activeKey={activeKey}>
        <Row>
          <h1>{t("quanLyNoiTru.dieuTriNoiTru")}</h1>
          <span style={{ flex: 1, textAlign: "right" }}>
            <img src={require("assets/images/utils/location.png")} alt="" />
            {state?.khoaLamViec && (
              <b>
                {state?.khoaLamViec?.ma} - {state?.khoaLamViec?.ten}
              </b>
            )}
          </span>
        </Row>
        <Row>
          <Col className="header-left" span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        {renderContent()}
        <ModalChuyenKhoa
          refChuyenKhoa={refChuyenKhoa}
          onKiemTraHoSo={onKiemTraHoSo}
        />
        <ModalNghiDieuTri ref={refModalNghiDieuTri} />
      </Main>
      <ModalKiemTraHoSo
        ref={refKiemTraHoSo}
        openModalPhongGiuong={openModalPhongGiuong}
      />
      <ModalSignPrint ref={refModalSignPrint} />
      <ModalDongHoSo
        ref={refModalDongHoSo}
        onShowModalChuyenVien={onShowModalChuyenVien}
      />
      <ModalChuyenVien
        refModalChuyenVien={refModalChuyenVien}
        infoNb={infoPatient}
        thongTinChiTiet={{
          nbChanDoan: state?.nbChanDoan,
          nbChuyenVien: state?.nbChuyenVien,
        }}
      ></ModalChuyenVien>
      <ModalDuKienRaVien ref={refModalDuKienRaVien} />
      <ModalYeuCauMuonNb ref={refModalYeuCauMuonNb} />
      <ModalDuyetYeuCauMuonNb ref={refModalDuyetYeuCauMuonNb} />
      <ModalNgatDieuTri ref={refModalNgatDieuTri} />
      <SoDoPhongGiuong ref={refSoDoPhongGiuong} />
      <ModalGiayChuyenTuyen ref={refModalGiayChuyenTuyen} />
      <ModalKhoaLamViec ref={refKhoaLamViec} />
      <ModalHoanThanhBA ref={refModalHoanThanhBA} />
      <ModalInPhieuCongKhai ref={refModalInPhieuCongKhai} />
    </MainPage>
  );
};

export default memo(ChiTietNguoiBenhNoiTru);
