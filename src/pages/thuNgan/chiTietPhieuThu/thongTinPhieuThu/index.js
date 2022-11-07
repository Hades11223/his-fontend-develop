import React, { useEffect, useRef, useState, useMemo } from "react";
import { ROLES, DOI_TUONG, ENUM, MA_BIEU_MAU_EDITOR } from "constants/index";
import { Main } from "./styled";
import { Collapse, Tooltip, DatePicker, Dropdown, Menu, message } from "antd";
import { Button, AuthWrapper } from "components";
import moment from "moment";
import IconCheckOut from "assets/images/thuNgan/icCheckout.svg";
import IconPrinter from "assets/images/thuNgan/icPrinter.svg";
import IconPrint from "assets/images/thuNgan/icPrint.svg";
import IconArrowDown from "assets/images/thuNgan/icArrowDown.svg";
import IconPanel from "assets/images/thuNgan/icPanel.svg";
import IconHDHD from "assets/images/thuNgan/icHDHD.svg";
import ModalPhuongThucThanhToan from "../ModalPhuongThucThanhToan";
import ModalDichVuThanhToan from "../ModalDichVuThanhToan";
import { formatDecimal } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ModalSignPrint from "components/ModalSignPrint";
import ModalNhapLyDo from "pages/kho/components/ModalNhapLyDo";
import { refConfirm } from "app";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
import { useTranslation } from "react-i18next";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { printJS } from "data-access/print-provider";
import { useEnum, useLoading, useStore } from "hook";

const { Panel } = Collapse;

function ThongTinPhieuThu(props) {
  const { t } = useTranslation();
  const refModalPhuongThucThanhToan = useRef(null);
  const { thongTinPhieuThu } = useSelector((state) => state.thuNgan);
  const { listData } = useSelector((state) => state.danhSachDichVu);
  const { tienDieuTri, thongTinBenhNhan } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);

  const {
    phieuIn: { getListPhieu, showFileEditor, getFilePhieuIn },
    danhSachPhieuYeuCauHoan: { sinhPhieuChi },
    thuNgan: { getThongTinPhieuThu, kiemTraQuyetToanBH, taoDayHoSo },
  } = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  const {
    phieuThuId,
    nbDotDieuTriId,
    layerId,
    refSinhPhieuChi,
    hienThiThanhToan,
    handleAfterSubmit,
    nhaTamUngId,
  } = props;
  const {
    thanhTien,
    tienNbCungChiTra,
    tongTien,
    tienMienGiam,
    tienMienGiamPhieuThu,
    tienBhThanhToan,
    dsPhuongThucTt,
    tienNbTuTra,
    tienNbPhuThu,
    tienNguonKhac,
    tienMienGiamDichVu,
    phanTramMienGiam,
    thanhToan,
    tenThuNgan,
    thoiGianThanhToan,
    dsMaGiamGia = [],
    maChuanChi,
    soPhieu,
    tienGiamGia,
    loaiPhieuThu,
    doiTuongKcb,
  } = thongTinPhieuThu;
  const {
    danhSachPhieuYeuCauHoan: { chiPhieuThu },
    thuNgan: { huyThanhToan, updateThoiGianTT },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  const refModalDichVuThanhToan = useRef();
  const refBtnInPhieuThu = useRef(null);
  const refBtnSinhPhieuChi = useRef(null);
  const history = useHistory();
  const refModalSignPrint = useRef(null);
  const refNhapLyDo = useRef(null);
  const [editTime, setEditTime] = useState(false);
  const [updateTime, setUpdateTime] = useState(null);
  const [listPhieu, setListPhieu] = useState([]);
  const [showBtnQuyetToan, setShowBtnQuyetToan] = useState(false);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 119, //F8
          onEvent: () => {
            refBtnInPhieuThu.current && refBtnInPhieuThu.current.click();
          },
        },
        // {
        //   keyCode: 120, //F9
        //   onEvent: () => {
        //     refBtnSinhPhieuChi.current && refBtnSinhPhieuChi.current.click();
        //   },
        // },
        {
          keyCode: 123, //F12
          onEvent: () => {
            onClickThanhToan();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    getListPhieu({
      nbDotDieuTriId,
      maManHinh: "004",
      maViTri: "00401",
    }).then((listPhieu) => {
      setListPhieu(listPhieu);
    });

    kiemTraQuyetToanBH(nbDotDieuTriId).then((res) => {
      setShowBtnQuyetToan(res || false);
    });
  }, [phieuThuId]);

  const onClickThanhToan = () => {
    refModalPhuongThucThanhToan.current &&
      refModalPhuongThucThanhToan.current.show(
        {
          tongTien: thanhTien,
          phieuThuId,
          nbDotDieuTriId,
          nbThongTinId: thongTinBenhNhan.nbThongTinId,
          maChuanChi,
          nhaTamUngId,
          loaiPhieuThu,
          doiTuongKcb,
        },
        ({ tongTien, tienDaNhan, dsPhuongThucTt, hoanUng }) => {
          if (tongTien <= tienDaNhan) handleAfterSubmit();
          else {
            refModalDichVuThanhToan.current &&
              refModalDichVuThanhToan.current.show({
                phieuThuId,
                nbDotDieuTriId,
                tienDaNhan,
                dsPhuongThucTt,
                hoanUng,
              });
          }
        },
        () => {}
      );
  };

  const onClickHuyThanhToan = () => {
    huyThanhToan(phieuThuId)
      .then(() => handleAfterSubmit())
      .catch((s) => {
        refConfirm.current &&
          refConfirm.current.show({
            typeModal: "warning",
            cancelText: t("common.quayLai"),
            title: t("common.thongBao"),
            content: s?.message,
          });
      });
  };

  const onClickQuyetToan = () => {
    taoDayHoSo(nbDotDieuTriId).then(() => {
      setTimeout(() => {
        history.go();
      }, 2000);
    });
  };

  const handleClickBtnPrinter = () => {
    history.push(
      `/thu-ngan/tao-hoa-don-dien-tu/${nbDotDieuTriId}/${thongTinPhieuThu?.soPhieu}/${phieuThuId}`
    );
  };

  const customIcon = (panelProps) => {
    const { isActive } = panelProps;
    return (
      <span
        className={`anticon anticon-right ant-collapse-arrow ${
          isActive ? "" : "ant-collapse-arrow--revert"
        }`}
      >
        <IconPanel />
      </span>
    );
  };

  const onPrintPhieuThu = async () => {
    if (refModalSignPrint.current) {
      refModalSignPrint.current.show({
        nbDotDieuTriId,
        phieuThuId,
        // isThuNgan: true,
        maManHinh: "004",
        maViTri: "00401",
      });
    }
  };

  const onPrintPhieu = (item) => async () => {
    if (item.key == 0) {
      onPrintPhieuThu();
    } else {
      if (item.type == "editor") {
        showFileEditor({
          phieu: item,
          nbDotDieuTriId,
          nbThongTinId: thongTinBenhNhan.nbThongTinId,
          id: nbDotDieuTriId,
          ma: item.ma,
          maBaoCao: MA_BIEU_MAU_EDITOR[item.ma].maBaoCao,
        });
      } else {
        try {
          showLoading();
          let listItems = [item];

          //nếu là phiếu thu thì in phiếu hiện tại
          if (item.ma == "P033") {
            const dsSoPhieu = (item.dsSoPhieu || []).filter(
              (x) => x.soPhieu == phieuThuId
            );
            if (dsSoPhieu.length === 0) {
              message.error(t("thuNgan.khongTonTaiPhieuThuPhuHop"));
              return;
            }
            listItems = [{ ...item, dsSoPhieu }];
          }
          //nếu là phiếu chi thì in tất cả phiếu
          if (item.ma == "P034") {
            listItems = [];
            (item.dsSoPhieu || []).forEach((element) => {
              listItems.push({ ...item, dsSoPhieu: [element] });
            });
          }

          const { finalFile, dsPhieu } = await getFilePhieuIn({
            listPhieus: listItems,
            nbDotDieuTriId: nbDotDieuTriId,
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
    const phieus = [
      { key: 0, ten: t("phieuIn.inTatCa") },
      ...(listPhieu || []),
    ];
    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a onClick={onPrintPhieu(item)}>{item.ten || item.tenBaoCao}</a>
          ),
        }))}
      />
    );
  }, [listPhieu]);

  // nhieuPhieu=true: sinh phiếu chi cho các phiếu đã thanh toán
  const onClickSinhPhieuChi = (nhieuPhieu) => () => {
    refNhapLyDo.current &&
      refNhapLyDo.current.show(
        {
          title: t("thuNgan.lyDoSinhPhieuChi"),
          message: t("thuNgan.dienLyDoSinhPhieuChi"),
        },
        (lyDo) => {
          if (tienDieuTri?.phieuThuNhoHonMucCungChiTra && nhieuPhieu) {
            sinhPhieuChi({ lyDo });
          } else {
            chiPhieuThu({ dsPhieuThuId: [phieuThuId], lyDo, nbDotDieuTriId });
          }
        }
      );
  };

  refSinhPhieuChi.current = onClickSinhPhieuChi(true);

  const showBtnXuatHDDD = () => {
    const checkXuatHDDT = (value) => {
      return !(
        !value?.phatHanhHoaDon &&
        value?.trangThaiHoan === 0 &&
        value?.thanhTien > 0
      );
    };

    if (!listData.every(checkXuatHDDT) && thanhToan) {
      return true;
    } else {
      return false;
    }
  };

  const onDeleteVoucher = (item) => {
    let payload = {
      dsMaGiamGiaId: dsMaGiamGia
        .filter((x) => x.id !== item?.id)
        .map((x1) => x1?.id),
    };
    mienGiamProvider.addOrUpdateVoucher(payload, phieuThuId).then((res) => {
      handleAfterSubmit();
    });
  };

  function onSaveThoiGianTT() {
    updateThoiGianTT({
      id: thongTinPhieuThu?.id,
      thoiGianThanhToan: updateTime,
    }).then(() => {
      setEditTime(false);
      getThongTinPhieuThu(phieuThuId);
    });
  }

  function onChangeThoiGianTT(e) {
    setUpdateTime(e?._d);
  }
  return (
    <Main>
      <div className="top-header">
        <span className="top-header__title">
          {t("thuNgan.thongTinPhieuThu")}
        </span>
        {!thanhToan && hienThiThanhToan && (
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THANH_TOAN]}>
            <Button
              type={"success"}
              rightIcon={<IconCheckOut />}
              onClick={onClickThanhToan}
              className="btn-thanhToan"
            >
              {t("common.thanhToan")} [F12]
            </Button>
          </AuthWrapper>
        )}
        {showBtnXuatHDDD() && (
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].XUAT_HDDT]}>
            <Button
              rightIcon={<IconPrinter />}
              onClick={handleClickBtnPrinter}
              type="primary"
              borderColor="#FFFFFF20"
            >
              {t("thuNgan.xuatHDDT")}
            </Button>
          </AuthWrapper>
        )}
      </div>
      <div className="content-box">
        <Collapse
          defaultActiveKey={[1, 2]}
          bordered={false}
          expandIcon={customIcon}
        >
          <Panel
            header={
              <div className="info-payment info-payment--pd0-header">
                <div className="info-payment__title info-payment__title--bs">
                  {t("common.tongTien")}
                </div>
                <div className="info-payment__price info-payment__price--bs">
                  {formatDecimal(tongTien || 0)} đ
                </div>
              </div>
            }
            key="1"
          >
            {thongTinBenhNhan.doiTuong === DOI_TUONG.BAO_HIEM && (
              <>
                <div className="info-payment">
                  <div className="info-payment__title">
                    {t("thuNgan.bhChiTra")}
                  </div>
                  <div className="info-payment__price">
                    {formatDecimal(tienBhThanhToan || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">
                    {t("thuNgan.nbCungChiTra")}
                  </div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbCungChiTra || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">
                    {t("thuNgan.nbTuTra")}
                  </div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbTuTra || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">
                    {t("thuNgan.phuThu")}
                  </div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbPhuThu || 0)} đ
                  </div>
                </div>
              </>
            )}
            <div className="info-payment">
              <div className="info-payment__title">
                {t("thuNgan.nguonKhac")}
              </div>
              <div className="info-payment__price">
                {formatDecimal(tienNguonKhac || 0)} đ
              </div>
            </div>
          </Panel>
          {(tienMienGiam > 0 || dsMaGiamGia?.length) && (
            <Panel
              header={
                <div className="info-payment info-payment--pd0-header">
                  <div className="info-payment__title info-payment__title--bs">
                    {t("thuNgan.tongTienMienGiam")}
                  </div>
                  <div className="info-payment__price info-payment__price--bs">
                    {formatDecimal(tienMienGiam + tienGiamGia || 0)} đ
                  </div>
                </div>
              }
              key="2"
            >
              <div className="info-payment">
                <div className="info-payment__title">{t("thuNgan.theoDv")}</div>
                <div className="info-payment__price">
                  {formatDecimal(tienMienGiamDichVu || 0)} đ
                </div>
              </div>
              <div className="info-payment">
                <div className="info-payment__title">
                  {t("thuNgan.theoPhieuThu")}
                </div>
                <div className="info-payment__price">
                  <IconArrowDown style={{ verticalAlign: "middle" }} />
                  {phanTramMienGiam || 0} %
                </div>
              </div>
              {phanTramMienGiam <= 0 && tienMienGiamPhieuThu > 0 && (
                <div className="info-payment">
                  <div className="info-payment__title"></div>
                  <div className="info-payment__price">
                    <IconArrowDown style={{ verticalAlign: "middle" }} />
                    {formatDecimal(tienMienGiamPhieuThu || 0)} đ
                  </div>
                </div>
              )}
              {!!dsMaGiamGia?.length && (
                <div className="info-payment">
                  <div className="info-payment__title">Voucher</div>{" "}
                  <div
                    className="info-payment__price"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    {(dsMaGiamGia || []).map((item) => {
                      return (
                        <Tooltip title={item?.moTa} color="#108ee9">
                          <div
                            className="info-payment__voucher"
                            style={{ marginBottom: "5px", marginLeft: "5px" }}
                          >
                            {item?.maVoucher}
                            <span
                              className="close"
                              onClick={() => onDeleteVoucher(item)}
                            >
                              X
                            </span>
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <b style={{ fontSize: "16px" }}>
                  {t("thuNgan.quanLyTamUng.ghiChu")}:
                </b>
                <div style={{ paddingLeft: "4px" }}>
                  {thongTinPhieuThu?.ghiChu}
                </div>
              </div>
            </Panel>
          )}
        </Collapse>
        <div className="info-payment info-payment--pd0">
          <div className="info-payment__title info-payment__title--fixed">
            {t("thuNgan.soTienNbPhaiTra")}
          </div>
          <div className="info-payment__price info-payment__price--fixed">
            {formatDecimal(String(thanhTien) || 0)} đ
          </div>
        </div>

        <div className="info-payment info-payment--pdt">
          <div className="info-payment__title info-payment__title--bs">
            {t("thuNgan.trangThaiPhieuThu")}
          </div>
          <div
            className={`info-payment__price ${
              thanhToan
                ? "info-payment__price--green"
                : "info-payment__price--orange"
            }`}
          >
            {thanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
          </div>
        </div>
        <div className="info-payment">
          <div className="info-payment__title">{t("thuNgan.tenThuNgan")}</div>
          <div className="info-payment__price">{tenThuNgan}</div>
        </div>
        {thanhToan && (
          <div className="info-payment">
            <div className="info-payment__title">
              {t("thuNgan.tgThanhToan")}
            </div>
            <div className="info-payment__price">
              {editTime ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DatePicker
                    showTime
                    placeholder="Chọn ngày"
                    format="DD/MM/YYYY HH:mm:ss"
                    value={moment(updateTime)}
                    // disabledDate={(currentDate) =>
                    //   currentDate.isBefore(
                    //     moment(thongTinBenhNhan?.thoiGianVaoVien)
                    //   )
                    // }
                    onChange={onChangeThoiGianTT}
                  />
                  &emsp;
                  <SaveOutlined onClick={onSaveThoiGianTT} />
                </div>
              ) : (
                thoiGianThanhToan &&
                moment(thoiGianThanhToan).format("DD/MM/YYYY HH:mm")
              )}

              {!editTime && (
                <AuthWrapper
                  accessRoles={[ROLES["THU_NGAN"].SUA_THOI_GIAN_THANH_TOAN]}
                >
                  &emsp;
                  <EditOutlined
                    onClick={() => {
                      setEditTime(true);
                      setUpdateTime(thoiGianThanhToan);
                    }}
                  />
                </AuthWrapper>
              )}
            </div>
          </div>
        )}
        {soPhieu && (
          <div className="info-payment">
            <div className="info-payment__title">{t("thuNgan.soPhieuThu")}</div>
            <div className="info-payment__price">{soPhieu}</div>
          </div>
        )}

        {dsPhuongThucTt && (
          <div className="info-payment info-payment--pdt">
            <div className="info-payment__title info-payment__title--bs">
              {t("thuNgan.chiTietPhuongThucTt")}
            </div>
            <div className="info-payment__price"></div>
          </div>
        )}
        {dsPhuongThucTt &&
          dsPhuongThucTt.map((ds) => (
            <div className="info-payment" key={ds.id}>
              <div className="info-payment__title">
                <div>{ds.tenPhuongThucTt}</div>
                {ds.maChuanChi && (
                  <div className="maChuanChi">{t("thuNgan.maChuanChi")}</div>
                )}
              </div>
              <div className="info-payment__price">
                <div>{formatDecimal(ds.tongTien || 0)} đ</div>
                <div className="maChuanChi">{ds.maChuanChi}</div>
              </div>
            </div>
          ))}

        <div className="bottom-group">
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].IN_PHIEU_THU]}>
            <Dropdown overlay={menu} placement="topCenter">
              <Button
                // onClick={onPrintPhieuThu}
                ref={refBtnInPhieuThu}
                type="info"
                rightIcon={<IconPrint />}
                iconHeight={15}
                minWidth={120}
              >
                {t("thuNgan.inGiayTo")}
              </Button>
            </Dropdown>
          </AuthWrapper>
          {thanhToan && (
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].PHIEU_CHI]}>
              <Button
                onClick={onClickSinhPhieuChi(false)}
                ref={refBtnSinhPhieuChi}
                type="info"
                rightIcon={<IconHDHD />}
                minWidth={120}
              >
                {t("thuNgan.sinhPhieuChi")}
              </Button>
            </AuthWrapper>
          )}
        </div>

        {thanhToan && (
          <div className="bottom-group">
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].HUY_THANH_TOAN]}>
              <Button type="info" onClick={onClickHuyThanhToan} minWidth={105}>
                {t("thuNgan.huyThanhToan")}
              </Button>
            </AuthWrapper>

            {showBtnQuyetToan && (
              <Button type="info" onClick={onClickQuyetToan} minWidth={105}>
                {"Quyết toán BH"}
              </Button>
            )}
          </div>
        )}
      </div>

      <ModalPhuongThucThanhToan ref={refModalPhuongThucThanhToan} />
      <ModalDichVuThanhToan ref={refModalDichVuThanhToan} />
      <ModalSignPrint ref={refModalSignPrint} />
      <ModalNhapLyDo ref={refNhapLyDo} />
    </Main>
  );
}

export default ThongTinPhieuThu;
