import React, { useEffect, useRef, useState } from "react";
import { Main, WrapButtonRight, WrapperPopover, MainPage } from "./styled";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { useDispatch } from "react-redux";
import Button from "pages/kho/components/Button";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import ModalTaoPhieuLinh from "./PhieuLinh/ModalTaoPhieuLinh";
import ModalTaoPhieuSuatAn from "./PhieuLinhSuatAn/ModalTaoPhieu";
import SoDoPhongGiuong from "../soDoPhongGiuong";
import { TRANG_THAI_NB } from "constants/index";
import ModalTaoPhieuTra from "./PhieuTra/ModalTaoPhieuTra";
import ModalTaoPhieuTraSuatAn from "./PhieuTraSuatAn/ModalTaoPhieu";
import { useStore } from "hook";
import ModalKhoaLamViec from "pages/phauThuatThuThuat/DanhSachNguoiBenh/ModalKhoaLamViec";
import cacheUtils from "utils/cache-utils";
import IconEdit from "assets/images/noiTru/icEdit.png";
import { useTranslation } from "react-i18next";
import ModalSuaSoLuongLe from "./PhieuLinh/ModalSuaSoLuongLe";

const DanhSachNguoiBenhNoiTru = ({ history }) => {
  const { t } = useTranslation();

  const refModalPhieuLinh = useRef();
  const refModalPhieuTra = useRef();
  const refModalTaoPhieuSuatAn = useRef();
  const refSoDoPhongGiuong = useRef();
  const refKhoaLamViec = useRef();
  const refSuaSoLuongLe = useRef();
  const refModalTaoPhieuTraSuatAn = useRef();

  const {
    soDoPhongGiuong: { updateDataSearch },
    danhSachNguoiBenhNoiTru: { onChangeInputSearch },
  } = useDispatch();
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);
  const dataSearch = useStore("danhSachNguoiBenhNoiTru.dataSearch", {});

  const [state, _setState] = useState();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let dsTrangThaiMacDinh = [
    TRANG_THAI_NB.CHO_TIEP_NHAN_VAO_KHOA,
    TRANG_THAI_NB.DANG_DIEU_TRI,
    TRANG_THAI_NB.DANG_CHUYEN_KHOA,
    TRANG_THAI_NB.CHO_HOAN_TAT_THU_TUC_RA_VIEN,
  ];

  let dsTrangThai = [
    TRANG_THAI_NB.CHO_TIEP_NHAN_VAO_KHOA,
    TRANG_THAI_NB.DANG_DIEU_TRI,
    TRANG_THAI_NB.DANG_CHUYEN_KHOA,
    TRANG_THAI_NB.CHO_HOAN_TAT_THU_TUC_RA_VIEN,
    TRANG_THAI_NB.HEN_DIEU_TRI,
    TRANG_THAI_NB.DA_RA_VIEN,
    TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
    TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
  ];

  useEffect(() => {
    async function fetchData() {
      let khoaNbId = (listKhoaTheoTaiKhoan || []).map((item) => item?.id);
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
              onChangeInputSearch({
                dsKhoaNbId: data?.id,
                dsTrangThai:
                  dataSearch?.dsTrangThai === undefined
                    ? dsTrangThaiMacDinh
                    : dataSearch?.dsTrangThai,
                trangThaiTaiKhoa: 10,
              });
            });
        } else {
          cacheUtils.save(
            "DATA_KHOA_LAM_VIEC",
            "",
            listKhoaTheoTaiKhoan[0],
            false
          );
          khoaNbId = listKhoaTheoTaiKhoan[0]?.id;
        }
      } else {
        setState({ khoaLamViec });
        khoaNbId = khoaLamViec?.id;
      }
      onChangeInputSearch({
        dsKhoaNbId: khoaNbId,
        dsTrangThai:
          dataSearch?.dsTrangThai === undefined
            ? dsTrangThaiMacDinh
            : dataSearch?.dsTrangThai,
        trangThaiTaiKhoa: 10,
      });
    }
    fetchData();
  }, [listKhoaTheoTaiKhoan]);
  const clickTaoPhieuLinh = (e) => {
    if (
      refModalPhieuLinh.current &&
      (["svg", "SPAN"].every((i) => i !== e?.target?.nodeName) ||
        e?.target?.className == "label-btn")
    ) {
      refModalPhieuLinh.current.show(
        {},
        () => {},
        (data) => {
          refSuaSoLuongLe.current && refSuaSoLuongLe.current.show(data);
        }
      );
    }
  };
  const clickTaoPhieuTra = (e) => {
    if (
      refModalPhieuTra.current &&
      (["svg", "SPAN"].every((i) => i !== e?.target?.nodeName) ||
        e?.target?.className == "label-btn")
    ) {
      refModalPhieuTra.current.show();
    }
  };

  const onClickPhongGiuong = () => {
    updateDataSearch({
      nbDotDieuTriId: null,
      khoaId: state.khoaLamViec?.id || listKhoaTheoTaiKhoan[0]?.id,
    });

    refSoDoPhongGiuong.current && refSoDoPhongGiuong.current.show();
  };

  const onClickDsNbTraDv = () => {
    history.push("/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu");
  };

  const onShowKhoaLamViec = () => {
    refKhoaLamViec.current &&
      refKhoaLamViec.current.show(state?.khoaLamViec, (data) => {
        cacheUtils.save("DATA_KHOA_LAM_VIEC", "", data, false);
        setState({ khoaLamViec: data });
        onChangeInputSearch({
          dsKhoaNbId: data
            ? data?.id
            : (listKhoaTheoTaiKhoan || []).map((item) => item?.id),
        });
      });
  };
  return (
    <MainPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
      ]}
      title={
        <div className="title">
          <label>Danh sách người bệnh nội trú</label>
          <div className="khoaLamViec">
            <span>{state?.khoaLamViec?.ten}</span>
            <img src={IconEdit} alt="" onClick={onShowKhoaLamViec} />
          </div>
        </div>
      }
      titleRight={
        <WrapButtonRight>
          <Button onClick={onClickPhongGiuong}>Sơ đồ Phòng - Giường</Button>
          <Button
            className="btn_new"
            // type={"success"}
            onClick={clickTaoPhieuTra}
            rightIcon={
              <Popover
                trigger={"click"}
                content={
                  <WrapperPopover width={250}>
                    <div
                      className="item-popover"
                      onClick={() => {
                        history.push(
                          "/quan-ly-noi-tru/danh-sach-phieu-tra-suat-an"
                        );
                      }}
                    >
                      {t("quanLyNoiTru.danhSachPhieuTraSuatAn")}
                    </div>
                    <div
                      className="item-popover"
                      onClick={() => {
                        history.push("/quan-ly-noi-tru/danh-sach-phieu-tra");
                      }}
                    >
                      {t("quanLyNoiTru.danhSachPhieuTra")}
                    </div>
                    <div className="item-popover" onClick={clickTaoPhieuTra}>
                      {t("quanLyNoiTru.taoPhieuTra")}
                    </div>
                    <div className="item-popover" onClick={onClickDsNbTraDv}>
                      {t("quanLyNoiTru.danhSachNbChuaHoanTra")}
                    </div>
                  </WrapperPopover>
                }
              >
                <MoreOutlined className={"icon-more"} />
              </Popover>
            }
            iconHeight={20}
          >
            <span className="label-btn">{t("quanLyNoiTru.taoPhieuTra")}</span>
          </Button>
          <Button
            className="btn_new"
            // type={"success"}
            onClick={clickTaoPhieuLinh}
            rightIcon={
              <Popover
                trigger={"click"}
                content={
                  <WrapperPopover width={200}>
                    <div
                      className="item-popover"
                      onClick={() => {
                        history.push(
                          "/quan-ly-noi-tru/danh-sach-phieu-linh-suat-an"
                        );
                      }}
                    >
                      {t("quanLyNoiTru.danhSachPhieuLinhSuatAn")}
                    </div>
                    <div
                      className="item-popover"
                      onClick={() => {
                        history.push("/quan-ly-noi-tru/danh-sach-phieu-linh");
                      }}
                    >
                      {t("quanLyNoiTru.danhSachPhieuLinh")}
                    </div>
                    <div className="item-popover" onClick={clickTaoPhieuLinh}>
                      {t("quanLyNoiTru.taoPhieuLinh")}
                    </div>
                  </WrapperPopover>
                }
              >
                <MoreOutlined className="icon-more" />
              </Popover>
            }
            iconHeight={20}
          >
            <span className="label-btn">Tạo phiếu lĩnh</span>
          </Button>
        </WrapButtonRight>
      }
    >
      <Main>
        <TimKiemNb dsTrangThai={dsTrangThai} />
        <DanhSach dsTrangThai={dsTrangThai} />
        <ModalTaoPhieuLinh
          khoaLamViecId={state?.khoaLamViec?.id}
          ref={refModalPhieuLinh}
          refModalTaoPhieuSuatAn={refModalTaoPhieuSuatAn}
        />
        <ModalTaoPhieuTra
          ref={refModalPhieuTra}
          khoaLamViec={state?.khoaLamViec}
          refModalTaoPhieuTraSuatAn={refModalTaoPhieuTraSuatAn}
        />
        <ModalTaoPhieuSuatAn
          ref={refModalTaoPhieuSuatAn}
          khoaLamViecId={state?.khoaLamViec?.id}
        />
        <ModalTaoPhieuTraSuatAn
          ref={refModalTaoPhieuTraSuatAn}
          khoaLamViecId={state?.khoaLamViec?.id}
        />
        <SoDoPhongGiuong ref={refSoDoPhongGiuong} />
        <ModalKhoaLamViec ref={refKhoaLamViec} />
        <ModalSuaSoLuongLe ref={refSuaSoLuongLe} />
      </Main>
    </MainPage>
  );
};

export default DanhSachNguoiBenhNoiTru;
