import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, Menu, message, Row } from "antd";
import ThongTinBenhNhan from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ThongTinBenhNhan";
import ThongTinToDieuTri from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/ThongTinToDieuTri";
import { Main, MainPage } from "./styled";
import ChiDinhDichVu from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/ChiDinhDichVu";
import { Button, Card } from "components";
import IcSave from "assets/images/thuNgan/icSave.png";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLoading, useStore } from "hook";
import { refConfirm } from "app";
import cacheUtils from "utils/cache-utils";
import { ROLES, TRANG_THAI_NB } from "constants/index";
import { checkRole } from "utils/role-utils";
import { ModalSaoChepThuoc } from "../../modals";
import IcPrint from "assets/svg/pttt/ic-print.svg";
import printJS from "print-js";

const ChiTietToDieuTri = () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const refModalSaoChepThuoc = useRef(null);
  const { showLoading, hideLoading } = useLoading();
  const {
    danhSachNguoiBenhNoiTru: { getNbNoiTruById, getDanhSachMuonNb },
    maBenh: { getListAllMaBenh },
    toDieuTri: { getToDieuTriById, patch, updateData, onDelete },
    chiDinhVatTu: { getListDichVuVatTu },
    nhanVien: { getListNhanVienTongHop },
    chiDinhDichVuThuoc: { getListDichVuThuoc, getListDichVuThuocKeNgoai },
    chiDinhHoaChat: { getListDichVuHoaChat },
    phieuIn: { getFilePhieuIn, getListPhieu, showFileEditor },
  } = useDispatch();

  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const { nbDaChuyenKhoa } = useSelector(
    (state) => state.danhSachNguoiBenhNoiTru
  );

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refThongTinToDieuTri = useRef(null);
  useEffect(() => {
    getListAllMaBenh({ page: "", size: "" });
  }, []);
  useEffect(() => {
    if (id) {
      getToDieuTriById(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentToDieuTri?.nbDotDieuTriId) {
      getNbNoiTruById(currentToDieuTri?.nbDotDieuTriId);
      getListDichVuVatTu({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuDichVuId: currentToDieuTri?.id,
        chiDinhTuLoaiDichVu: 210,
      });
      getListDichVuThuoc({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuDichVuId: currentToDieuTri?.id,
        chiDinhTuLoaiDichVu: 210,
      });
      getListDichVuHoaChat({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuDichVuId: currentToDieuTri?.id,
        chiDinhTuLoaiDichVu: 210,
      });
      getDanhSachMuonNb({
        khoaId: currentToDieuTri?.khoaChiDinhId,
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
      });
      getListNhanVienTongHop({ khoaId: currentToDieuTri?.khoaChiDinhId });
      getListDichVuThuocKeNgoai({
        nbDotDieuTriId : currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuDichVuId: currentToDieuTri.id,
        chiDinhTuLoaiDichVu:  210,
      });
    }
  }, [currentToDieuTri]);

  const onSave = () => {
    const data = refThongTinToDieuTri.current
      ? refThongTinToDieuTri.current.getData()
      : {};
    if (!data.dienBienBenh) {
      message.error(t("quanLyNoiTru.vuiLongNhapDienBienBenh"));
    } else {
      const payload = {
        ...data,
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        id: id,
        khoaChiDinhId: currentToDieuTri?.khoaNbId,
        thoiGianYLenh: moment(data?.thoiGianYLenh).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        thoiGianKham: moment(data?.thoiGianKham).format("YYYY-MM-DD HH:mm:ss"),
      };
      patch({
        ...payload,
      });
    }
  };

  const onClose = () => {
    updateData({ activeKey: "2" });
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${currentToDieuTri?.nbDotDieuTriId}`
    );
  };

  const onDeleteToDieuTri = () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("quanLyNoiTru.toDieuTri.banChacChanMuonXoaToDieuTri")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "error",
        },
        () => {
          onDelete(currentToDieuTri.id).then(() => {
            history.push(
              `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${currentToDieuTri?.nbDotDieuTriId}`
            );
          });
        }
      );
  };

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      if (khoaLamViec) {
        setState({ khoaLamViec: khoaLamViec });
      }
    }
    fetchData();
  }, []);

  const handleInGiayTo = () => {
    if (id) {
      window.open(`/editor/bao-cao/EMR_BA077/${id}`);
    }
  };
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
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA]) &&
      !nbDaChuyenKhoa
    );
  }, [infoPatient, state?.khoaLamViec, nbDaChuyenKhoa]);

  const onSaoChepThuocVT = () => {
    refModalSaoChepThuoc.current &&
      refModalSaoChepThuoc.current.show({ toDieuTriId: id });
  };
  useEffect(() => {
    if (id)
      getListPhieu({
        nbDotDieuTriId: id,
        maManHinh: "007",
        maViTri: "00701",
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu });
      });
  }, [id]);

  const onPrintPhieu = (item) => async () => {
    if (item.key == 0) {
    } else {
      if (item.type == "editor") {
        showFileEditor({
          phieu: item,
          id: id,
          nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
        });
      } else {
        try {
          showLoading();
          const { finalFile, dsPhieu } = await getFilePhieuIn({
            listPhieus: [item],
            nbDotDieuTriId: currentToDieuTri.id,
            showError: true,
          });
          printJS({
            printable: finalFile,
            type: "pdf",
          });
        } catch (error) {
        } finally {
          hideLoading();
        }
      }
    }
  };
  const menu = useMemo(() => {
    return (
      <Menu
        items={(state.listPhieu || []).map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={onPrintPhieu(item)}>
              {item.ten || item.tenBaoCao}
            </a>
          ),
        }))}
      />
    );
  }, [state?.listPhieu, id, currentToDieuTri]);
  return (
    <MainPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
      ]}
      title={t("quanLyNoiTru.toDieuTri.title")}
      titleRight={
        <>
          <img src={require("assets/images/utils/location.png")} alt="" />
          {infoPatient?.maKhoaNb && infoPatient?.tenKhoaNb && (
            <b>
              {infoPatient?.maKhoaNb} - {infoPatient?.tenKhoaNb}
            </b>
          )}
        </>
      }
    >
      <Main>
        <div className="main-body">
          <div className="header-left" span={24}>
            <ThongTinBenhNhan />
          </div>
          <Card top={16} bottom={16}>
            <ThongTinToDieuTri
              currentToDieuTri={currentToDieuTri}
              ref={refThongTinToDieuTri}
              isReadonly={isReadonly}
            />
          </Card>

          <ChiDinhDichVu isReadonly={isReadonly} />
        </div>
        <Row className="action-bottom">
          <div className="button-left">
            <Button minWidth={100} onClick={onSaoChepThuocVT}>
              {t("quanLyNoiTru.toDieuTri.saoChepDichVu")}
            </Button>

            {!isReadonly && (
              <Button minWidth={100} onClick={onDeleteToDieuTri}>
                {" "}
                {t("common.xoa")}{" "}
              </Button>
            )}
          </div>

          <div className="button-right">
            <Dropdown overlay={menu} trigger={["click"]} placement="top">
              <Button
                type="default"
                rightIcon={<IcPrint className="ic-print" />}
                minWidth={100}
              >
                {t("khamBenh.inGiayTo")}
              </Button>
            </Dropdown>
            <Button minWidth={100} onClick={onClose}>
              {" "}
              {t("common.quayLai")}{" "}
            </Button>
            {!isReadonly && (
              <Button
                minWidth={100}
                type="primary"
                iconHeight={15}
                onClick={() => onSave()}
                rightIcon={<img src={IcSave} alt={IcSave} />}
              >
                {" "}
                {t("common.luu")}{" "}
              </Button>
            )}
          </div>
        </Row>
      </Main>

      <ModalSaoChepThuoc ref={refModalSaoChepThuoc} />
    </MainPage>
  );
};

export default ChiTietToDieuTri;
