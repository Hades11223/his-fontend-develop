import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Popover, Radio, Space, message, Dropdown, Menu, Select } from "antd";
import { Main, GlobalStyle } from "./styled";
import { FRAME_TITLE } from "../../configs";
import IcPrint from "assets/images/utils/print.png";
import { printJS } from "data-access/print-provider";
import { flatten } from "lodash";
import ModalSignPrint from "components/ModalSignPrint";
import SettingIc from "assets/images/utils/setting.png";
import ModalInChiDinhTheoDV from "./ModalInChiDinhTheoDV";
import ModalHoSoBenhAn from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/Modal/ModalHoSoBenhAn";
import nbDvKyThuat from "data-access/nb-dv-ky-thuat-provider.js";
import { Button } from "components";
import { useTranslation } from "react-i18next";
import { useLoading, useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import ModalDoiPhong from "./ModalDoiPhong";
import { TRANG_THAI_DICH_VU, ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";

const StepWrapper = ({ customHeaderRight, children, activeTab, layerId }) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const infoNb = useStore("khamBenh.infoNb", {});
  const configData = useStore("chiDinhKhamBenh.configData", null);
  const listNbGoiDv = useStore("nbGoiDv.listNbGoiDv", []);

  const refModalHoSoBenhAn = useRef(null);
  const isKsk = useMemo(() => {
    return infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;
  }, [infoNb]);

  const refModalSignPrint = useRef(null);
  const refModalInChiDinhTheoDV = useRef(null);
  const refDoiPhong = useRef(null);
  const {
    khamBenh: { doiTrangThai, getTatCaGiayChiDinh },
    phieuIn: {
      getListPhieu,
      getDataDanhSachPhieu,
      showFileEditor,
      getFilePhieuIn,
    },
    nbGoiDv: { getByNbThongTinId },
    giayNghiHuong: { dayGiayNghiBaoHiemById },
  } = useDispatch();
  const [state, _setState] = useState({
    visible: false,
    popoverVisible: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    isCheckAll: false,
    indeterminate: false,
    loadingChiDinh: false,
    isGoiDichVu: false,
    thanhTien: 0,
    listAllDichVu: [],
    nhatKyDieuTriVisible: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    cacheUtils
      .read("", "KHAM_BENH_OPTION_IN_PHIEU_CHI_DINH", 1)
      .then((valuePhieuChiDinh) => {
        setState({ valuePhieuChiDinh });
      });
  }, []);

  useEffect(() => {
    if (configData) {
      getByNbThongTinId({
        nbThongTinId: configData.nbThongTinId,
      });
    }
  }, [configData]);

  useEffect(() => {
    if (thongTinChiTiet.nbDotDieuTriId) {
      getListPhieu({
        nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
        chiDinhTuDichVuId: thongTinChiTiet.id,
        maManHinh: "003",
        maViTri: "00303",
      }).then((listPhieu) => {
        setState({
          listPhieu: listPhieu,
        });
      });
    }
  }, [thongTinChiTiet]);

  // --------------------------------------------------------------------------------------------------------------------------------
  const onRenderFrameTitle = () => {
    return t(FRAME_TITLE[activeTab]);
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrint = async () => {
    let res = await getTatCaGiayChiDinh({
      nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
      chiDinhTuDichVuId: thongTinChiTiet.id,
    });
    const dsFilePdf = res?.reduce((acc, item) => {
      if (Array.isArray(item)) {
        // xử lý phiếu , có những phiếu có mảng con bên trong
        let list = item.map((itemChild) => itemChild.file.pdf);
        acc = [...acc, [...list]];
        return acc;
      }
      acc = [...acc, ...item.filePdf];
      return acc;
    }, []);
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrintPhieuChuaIn = async () => {
    let res = await getTatCaGiayChiDinh({
      nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
      chiDinhTuDichVuId: thongTinChiTiet.id,
      inPhieuChiDinh: false,
    });
    if (res?.length === 0) {
      message.error(t("khamBenh.khongConPhieuChiDinhChuaIn"));
      return null;
    }
    const dsFilePdf = res?.reduce((acc, item) => {
      if (Array.isArray(item)) {
        // xử lý phiếu , có những phiếu có mảng con bên trong
        let list = item.map((itemChild) => itemChild.file.pdf);
        acc = [...acc, [...list]];
        return acc;
      }
      acc = [...acc, ...item.filePdf];
      return acc;
    }, []);
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrintTheoDichVu = async () => {
    let res = await nbDvKyThuat.getDvPhieuChiDinh({
      nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
      chiDinhTuDichVuId: thongTinChiTiet.id,
      chiDinhTuLoaiDichVu: 10,
    });
    refModalInChiDinhTheoDV.current.show(res.data);
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const contentPhieuChiDinh = () => {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Radio.Group
          value={state.valuePhieuChiDinh || 2}
          onChange={(e) => {
            setState({
              valuePhieuChiDinh: e.target.value,
              popoverVisible: false,
            });
            cacheUtils.save(
              "",
              "KHAM_BENH_OPTION_IN_PHIEU_CHI_DINH",
              e.target.value
            );
          }}
        >
          <Space direction="vertical">
            <Radio value={1}>{t("khamBenh.tatCaChiDinh")}</Radio>
            <Radio value={2}>{t("khamBenh.chiDinhChuaIn")}</Radio>
            <Radio value={3}>{t("khamBenh.inChiDinhTheoDichVu")}</Radio>
          </Space>
        </Radio.Group>
      </div>
    );
  };
  // --------------------------------------------------------------------------------------------------------------------------------
  const onPrintPhieuChiDinh = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    showLoading();
    switch (state.valuePhieuChiDinh) {
      case 1: {
        // tất cả chỉ định
        await onPrint();
        break;
      }
      case 2: {
        // chỉ định chưa in
        await onPrintPhieuChuaIn();
        break;
      }
      case 3: {
        // in chỉ định theo dịch vụ
        await onPrintTheoDichVu();
        break;
      }
      default:
        // tất cả chỉ định
        await onPrint();
        break;
    }
    hideLoading();
  };
  const onPrintPhieu = (item) => async () => {
    if (item.type == "editor") {
      showFileEditor({
        phieu: item,
        nbDvKhamId: thongTinChiTiet?.id,
        nbThongTinId: infoNb?.nbThongTinId,
        nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
        goiDvId: listNbGoiDv[0]?.id,
      });
    } else {
      switch (item.ma) {
        case "P049":
          refModalSignPrint.current.show({
            nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
            chiDinhTuDichVuId: thongTinChiTiet?.id,
            maManHinh: "003",
            maViTri: "00301",
          });
          break;
        case "P051":
          refModalSignPrint.current.show({
            nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
            chiDinhTuDichVuId: thongTinChiTiet?.id,
            maManHinh: "003",
            maViTri: "00302",
          });
          break;
        default:
          try {
            showLoading();
            console.log("item", item);
            const { finalFile, dsPhieu } = await getFilePhieuIn({
              listPhieus: [item],
              nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
              chiDinhTuDichVuId: thongTinChiTiet?.id,
              trangThai: 20,
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
  // --------------------------------------------------------------------------------------------------------------------------------

  const contentPhieuNhatKyDieuTri = () => {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="nhat-ky"
      >
        {listNbGoiDv.map((x) => {
          return (
            <span
              onClick={() => window.open("/editor/bao-cao/EMR_BA156/" + x.id)}
            >
              {x.tenGoiDv}
            </span>
          );
        })}
      </div>
    );
  };

  const content = (
    <Menu
      items={(state.listPhieu || [])
        .filter((item) => isKsk || item.ma != "P053")
        .map((item, index) => {
          if (item.ma == "P048") {
            return {
              key: index + "",
              label: (
                <div style={{ display: "flex" }}>
                  <div onClick={onPrintPhieuChiDinh} style={{ flex: 1 }}>
                    {item.ten || item.tenBaoCao}
                  </div>

                  <Popover
                    getPopupContainer={(trigger) => trigger.parentNode}
                    overlayClassName={"step-wrapper-in-options right"}
                    placement="rightTop"
                    content={contentPhieuChiDinh()}
                    trigger="click"
                    visible={state.popoverVisible}
                  >
                    <img
                      src={SettingIc}
                      alt=""
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setState({ popoverVisible: !state.popoverVisible });
                      }}
                    />
                  </Popover>
                </div>
              ),
            };
          }
          if (item.ma == "P040" && listNbGoiDv?.length > 1) {
            return {
              key: index + "",
              label: (
                <div style={{ display: "flex" }}>
                  <Popover
                    getPopupContainer={(trigger) => trigger.parentNode}
                    overlayClassName={"step-wrapper-in-options-dieu-tri right"}
                    placement="rightTop"
                    content={contentPhieuNhatKyDieuTri()}
                  >
                    <div style={{ flex: 1 }}>{item.ten || item.tenBaoCao}</div>
                  </Popover>
                </div>
              ),
            };
          }
          return {
            key: index + "",
            label: (
              <div onClick={onPrintPhieu(item)}>
                {item.ten || item.tenBaoCao}
              </div>
            ),
          };
        })}
    />
  );

  const onHandleTienIchkhac = (e) => () => {
    switch (e) {
      case 1:
        doiTrangThaiFunc();
        break;
      case 2:
        refDoiPhong.current && refDoiPhong.current.show();
        break;
      case 3:
        refModalHoSoBenhAn.current &&
          refModalHoSoBenhAn.current.show({
            nbThongTinId: infoNb.nbThongTinId,
            nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
          });
        break;
    }
  };

  const contentDoiPhong = () => {
    const huyKham =
      checkRole([ROLES["KHAM_BENH"].DOI_TRANG_THAI]) &&
      ![TRANG_THAI_DICH_VU.CHO_KHAM, TRANG_THAI_DICH_VU.DA_KET_LUAN].includes(
        thongTinChiTiet?.nbDvKyThuat?.trangThai
      )
        ? {
            id: 1,
            ten: t("khamBenh.huyKham"),
          }
        : null;
    const doiPhong = [
      TRANG_THAI_DICH_VU.CHO_KHAM,
      TRANG_THAI_DICH_VU.DANG_KHAM,
      TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU,
      TRANG_THAI_DICH_VU.CHO_KET_LUAN,
      TRANG_THAI_DICH_VU.DANG_KET_LUAN,
    ].includes(thongTinChiTiet?.nbDvKyThuat?.trangThai)
      ? {
          id: 2,
          ten: t("khamBenh.doiPhongThucHien"),
        }
      : null;

    const hsba = {
      id: 3,
      ten: t("quanLyNoiTru.xemHoSoBenhAn"),
    };

    const guiGiamDinhBHXH = {
      id: 4,
      ten: t("khamBenh.guiGiamDinhBHXH"),
      onClick: async () => {
        try {
          showLoading();
          await dayGiayNghiBaoHiemById(thongTinChiTiet.nbDotDieuTriId);
        } catch (error) {
        } finally {
          hideLoading();
        }
      },
    };

    const options = [huyKham, doiPhong, hsba, guiGiamDinhBHXH].filter(
      (item) => item
    );
    return (
      <Menu
        items={(options || []).map((item, index) => {
          return {
            key: index + 1,
            label: (
              <div onClick={item.onClick || onHandleTienIchkhac(item?.id)}>
                {item.ten}
              </div>
            ),
          };
        })}
      />
    );
  };

  const onShowPrintOption = async () => {
    if (thongTinChiTiet.nbDotDieuTriId) {
      try {
        setState({
          loadingPhieuIn: true,
        });
        const listPhieu = await getListPhieu({
          nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
          chiDinhTuDichVuId: thongTinChiTiet.id,
          maManHinh: "003",
          maViTri: "00303",
        });
        setState({
          listPhieu: listPhieu,
          loadingPhieuIn: false,
        });
      } catch (error) {
        message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        setState({
          loadingPhieuIn: false,
        });
      } finally {
      }
    }
  };

  // ----------------------------------------------------RETURN----------------------------------------------------------------------------

  const doiTrangThaiFunc = () => {
    doiTrangThai([
      {
        id: thongTinChiTiet?.nbDvKyThuat?.id,
        nbDvKyThuat: { trangThai: 20 },
      },
    ]).then((res) => {
      window.location.href = window.location.href;
    });
  };

  return (
    <Main>
      <GlobalStyle />
      <div className="section-header">
        <div className="create-title">
          {onRenderFrameTitle()}
          <div className="sub">{t("khamBenh.bamCtrlSDeLuu")}</div>
        </div>
        <div className="btn-action">
          <div className="btn-action__left"></div>
          <div className="btn-action__right">
            <Dropdown overlay={contentDoiPhong} trigger={["click"]}>
              <Button style={{ marginRight: 10 }} type="default">
                <span>{t("khamBenh.tienIchKhac")}</span>
              </Button>
            </Dropdown>
            <Dropdown overlay={content} trigger={["click"]}>
              <Button
                style={{ marginRight: 10 }}
                type="default"
                onClick={onShowPrintOption}
                rightIcon={
                  <img
                    style={{ margin: 0, marginLeft: 10 }}
                    src={IcPrint}
                    alt=""
                  />
                }
                iconHeight={20}
              >
                <span>{t("khamBenh.inGiayTo")}</span>
              </Button>
            </Dropdown>
            {customHeaderRight}
          </div>
        </div>
      </div>
      <div
        className="element section-body"
        style={{
          position: "relative",
          height: `calc(100vh - 290px)`,
          overflowY: "scroll",
        }}
      >
        {children}
      </div>

      <ModalSignPrint ref={refModalSignPrint} />
      <ModalInChiDinhTheoDV ref={refModalInChiDinhTheoDV} />
      <ModalHoSoBenhAn ref={refModalHoSoBenhAn} />
      <ModalDoiPhong ref={refDoiPhong} />
    </Main>
  );
};

export default StepWrapper;
