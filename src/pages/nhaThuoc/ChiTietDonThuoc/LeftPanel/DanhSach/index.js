import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Row,
  DatePicker,
  Select as SelectAntd,
  message,
  Tooltip,
} from "antd";
import {
  Main,
  InputSearch,
  Header,
  InputText,
  PopoverCash,
  PopoverCustom,
} from "./styled";
import useWindowSize from "hook/useWindowSize";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import ModalListDichVuTimKiem from "../ModalListDichVuTimKiem";
import moment from "moment";
import { cloneDeep, orderBy } from "lodash";
import { TRANG_THAI_PHIEU_NHAP_XUAT } from "constants/index";
import {
  Card,
  InputTimeout,
  Button,
  HeaderSearch,
  TableWrapper,
} from "components";
import { useTranslation } from "react-i18next";
import IconMienGiam from "assets/images/thuNgan/icMienGiam.png";
import MienGiam from "../../MienGiam";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { refConfirm } from "app";
import IcSetting from "assets/svg/ic-setting.svg";

const { RangePicker } = DatePicker;

const DanhSach = ({ isThemMoi, layerId, className = "" }) => {
  const refInfoPatient = useRef(null);
  //get redux
  const { t } = useTranslation();
  const refMienGiam = useRef(null);
  const refSettings = useRef(null);

  const {
    thuocChiTiet: {
      isAdvised,
      infoPatient,
      dsThuocEdit,
      khoId,
      dsThuocTamThoi,
    },
    lieuDung: { listAllLieuDung },
  } = useSelector((state) => state);
  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);

  const {
    thuocChiTiet: {
      updateData,
      onRemoveThuocTrongDon,
      onAddThuocVaoDon,
      onSearchAllDichVuTonKho,
    },
    phimTat: { onRegisterHotkey },
    chiDinhDichVuThuoc: { tamTinhTien },
  } = useDispatch();

  const { nbDotDieuTri } = infoPatient || {};
  const nbDotDieuTriId = useStore(
    "thuocChiTiet.infoPatient.nbDotDieuTriId",
    null
  );
  const refModalListDichVuTimKiem = useRef(null);
  const refSearch = useRef();

  const [state, _setState] = useState({
    dsThuoc: [],
    discount: 1,
    listTypeDiscountInPopup: [],
    listVisiblePopupOnLine: [],
    dsDichVu: [],
    dataSortColumn: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const isVangLai = useMemo(() => {
    return nbDotDieuTri?.ngoaiVien;
  }, [nbDotDieuTri]);

  const size = useWindowSize();
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        updateData({ selectedDonThuoc: record });
        // onShowAndHandleUpdate(record);
      },
    };
  };
  useEffect(() => {
    // đăng ký phím tắt
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 9, //F6
          onEvent: () => {
            refSearch.current && refSearch.current.focus();
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    if (infoPatient?.dsThuoc) {
      //mặc định cho redux dsThuocEdit
      let dsThuocCustom = infoPatient.dsThuoc.reduce((init, item) => {
        let obj = {
          id: item.id,
          dotDung: item.dotDung,
          ngayThucHienTu: item.ngayThucHienTu,
          ngayThucHienDen: item.ngayThucHienDen,
          lieuDungId: item.lieuDungId,
          nbDichVu: {
            soLuong: item?.nbDichVu?.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            dichVuId: item.nbDichVu.dichVu.id || item.nbDichVu.dichVuId,
            tienNbTuTra: item?.nbDichVu?.tienNbTuTra || 0,
          },
        };
        return [...init, obj];
      }, []);
      updateData({ dsThuocEdit: dsThuocCustom });
    }
  }, [infoPatient?.dsThuoc]);

  const onTamTinhTien = async (item, index) => {
    const payload = {
      nbDotDieuTriId: nbDotDieuTriId,
      nbDichVu: {
        dichVuId: item?.nbDichVu?.dichVuId,
        soLuong: item?.nbDichVu?.soLuong,
      },
      nbDvKho: {
        khoId: infoPatient.khoId ? infoPatient.khoId : khoId,
      },
    };
    let thanhTien = await tamTinhTien([payload]).then((s) => {
      return s[0]?.nbDichVu?.thanhTien;
    });
    dataSource[index].nbDichVu.tienNbTuTra = thanhTien;
    dsThuocEdit[index].nbDichVu.tienNbTuTra = thanhTien;
  };

  const onChangeAdvise = (key, itemTable, index) => async (value) => {
    if (!isThemMoi) {
      if (index >= 0 && index < dsThuocEdit.length) {
        const obj = dsThuocEdit[index];
        obj.nbDichVu = { ...(obj.nbDichVu || {}), [key]: value };
        if (key === "soLuong") {
          await onTamTinhTien(obj, index);
        }
        updateData({ dsThuocEdit: [...dsThuocEdit] });
      }
    } else {
      if (index >= 0 && index < dsThuocTamThoi.length) {
        let obj = dsThuocTamThoi[index];
        obj.nbDichVu = { ...(obj.nbDichVu || {}), [key]: value };
        obj = dsThuocEdit[index];
        obj.nbDichVu = { ...(obj.nbDichVu || {}), [key]: value };
        if (key === "soLuong") {
          await onTamTinhTien(obj, index);
        }
        updateData({
          dsThuocTamThoi: [...dsThuocTamThoi],
          dsThuocEdit: [...dsThuocEdit],
        });
      }
    }
  };
  const onChangeDate = (item) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    dsThuocEdit.forEach((itemDs) => {
      if (item.id === itemDs.id) {
        itemDs.ngayThucHienTu = value;
        itemDs.ngayThucHienDen = value1;
      }
    });
  };

  const onChangePopupInHoverName = (item, key) => (e) => {
    if (key === "dotDung") {
      dsThuocEdit.forEach((itemDs) => {
        if (item.id === itemDs.id) {
          itemDs.dotDung = e.target.value;
        }
      });
      updateData({ dsThuocEdit });
    }
    if (key === "lieuDungId") {
      dsThuocEdit.forEach((itemDs) => {
        if (item.id === itemDs.id) {
          itemDs.lieuDungId = e;
        }
      });
      updateData({ dsThuocEdit });
    }
  };
  const contentNamePopover = (item) => {
    return (
      <div
        style={{
          pointerEvents:
            (isAdvised && !isVangLai) || isVangLai || isThemMoi
              ? "unset"
              : "none",
        }}
      >
        <div>
          <b>{`${item?.nbDichVu?.dichVu?.ma} - ${item?.nbDichVu?.dichVu?.ten} - ${item?.nbDichVu?.dichVu?.hamLuong}`}</b>
        </div>
        {/* <div>Cách dùng : <span>2</span></div> */}
        <div>
          {t("nhaThuoc.lieuDungCachDung")}:
          {/* <span>{listAllLieuDung.find(itemLieuDung => itemLieuDung.id === item?.lieuDung)?.ten}</span> */}
          <SelectAntd
            bordered={false}
            style={{
              marginLeft: 10,
              borderBottom: "1px solid black",
              width: 250,
            }}
            placeholder={t("nhaThuoc.nhapLieuDungCachDung")}
            onChange={onChangePopupInHoverName(item, "lieuDungId")}
            defaultValue={item?.lieuDungId}
            // onChange={onSearchInput("tenNb")}
          >
            {(listAllLieuDung || []).map((o) => {
              return (
                <SelectAntd.Option key={o?.id} value={o?.id}>
                  {o.ten}
                </SelectAntd.Option>
              );
            })}
          </SelectAntd>
        </div>

        <Row>
          <div>{t("nhaThuoc.dotDung")}:</div>
          <PopoverCash>
            <Input
              disabled={
                (isAdvised && !isVangLai) || isVangLai || isThemMoi
                  ? false
                  : true
              }
              value={
                state.dsDichVu.find((itemFind) => itemFind.id === item.id)
                  ?.phanTramMienGiamDichVu
              }
              className="input-discount"
              placeholder={t("nhaThuoc.nhapDotDung")}
              defaultValue={
                dsThuocEdit.find((itemDs) => itemDs.id === item.id)?.dotDung
              }
              type="number"
              min={1}
              maxLength={3}
              onChange={onChangePopupInHoverName(item, "dotDung")}
              onKeyUp={(e) => {
                if (Number(e.target.value) === 0) {
                  message.error(t("nhaThuoc.vuiLongNhapDotDungLonHon0"));
                  return e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "-" || e.key === "+" || e.key === "e") {
                  return e.preventDefault();
                }
              }}
              // onKeyUp={onKeyUpInputInPopup(item, "percent")}
            />
          </PopoverCash>
        </Row>
        <Row style={{ alignItems: "center" }}>
          <div>{t("nhaThuoc.thoiGianDung")}:</div>
          <PopoverCash>
            <RangePicker
              format="DD/MM/YYYY"
              className="range-picker"
              placeholder={[t("common.tuNgay"), t("common.denNgay")]}
              defaultValue={() => {
                const findItem = dsThuocEdit.find(
                  (itemDs) => itemDs.id === item.id
                );
                const ngayThucHienTu =
                  findItem?.ngayThucHienTu && moment(findItem.ngayThucHienTu);
                const ngayThucHienDen =
                  findItem?.ngayThucHienDen && moment(findItem.ngayThucHienDen);
                return [ngayThucHienTu, ngayThucHienDen];
              }}
              // bordered={false}
              onChange={onChangeDate(item)}
              separator={<div>-</div>}
            ></RangePicker>
          </PopoverCash>
        </Row>
        <div>
          {t("nhaThuoc.duongDung")}:{" "}
          <span>{item?.nbDichVu?.dichVu?.tenDuongDung}</span>
        </div>
        <div>
          {t("nhaThuoc.loNhap")}: <span>{item?.nbDvKho?.loNhap?.soLo}</span>
        </div>
        <br />
        <div>
          {t("nhaThuoc.trangThaiThanhToan")}:{" "}
          {`${
            !infoPatient?.phieuThu?.thanhToan
              ? t("nhaThuoc.chuaThanhToan")
              : t("nhaThuoc.daThanhToan")
          }`}
        </div>
        <div>
          {t("nhaThuoc.khoaChiDinh")}:{" "}
          <span>{item?.nbDichVu?.khoaChiDinh?.ten}</span>
        </div>
        <div>
          {t("nhaThuoc.ngayKe")}:{" "}
          <span>
            {item?.nbDichVu?.thoiGianChiDinh &&
              moment(item?.nbDichVu?.thoiGianChiDinh).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    );
  };

  const searchInput = (value) => {
    onSearchAllDichVuTonKho({
      timKiem: value,
      khoId: isThemMoi ? khoId : infoPatient.khoId,
      // ma: "CPM0001"
    }).then((res) => {
      if (value && res.length === 1 && !res[0].nhapDotDung) {
        let listSelected = isThemMoi ? dsThuocTamThoi : infoPatient?.dsThuoc;
        let itemDuplicate = listSelected.find(
          (itemLoop) => itemLoop.nbDichVu.dichVuId === res[0].dichVuId
        );

        const listSelectedKeys = isThemMoi
          ? listSelected.map((x) => x.key)
          : [];

        let onAddThuoc = () => {
          onAddThuocVaoDon({ isThemMoi, thuoc: res[0], listSelectedKeys }).then(
            (thuocId) => {
              setTimeout(() => {
                setState({ keyword: "" });

                let itemInputJustCreated = document.getElementById(thuocId);
                itemInputJustCreated.focus();
              }, 500);
            }
          );
        };

        if (itemDuplicate && Object.keys(itemDuplicate)?.length > 0) {
          // Check trùng thông tin
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: "",
                content: t("nhaThuoc.trungThongTinHangHoa").replace(
                  "{0}",
                  itemDuplicate?.nbDichVu?.dichVu?.ten
                ),
                // content: `Trùng thông tin hàng hóa. Tên hàng hóa: ${itemDuplicate?.nbDichVu?.dichVu?.ten}.<br/>Bạn có đồng ý tạo không?`,
                cancelText: t("common.dong"),
                okText: t("common.xacNhan"),
                showBtnOk: true,
                typeModal: "warning",
              },
              () => {
                onAddThuoc();
              },
              () => {
                setState({ keyword: "" });
              }
            );
          return null;
        } else {
          onAddThuoc();
        }
      } else {
        refModalListDichVuTimKiem.current.show(
          {
            khoId: isThemMoi ? khoId : infoPatient.khoId,
            keyword: value,
            isThemMoi: isThemMoi,
          },
          () => {
            setState({ keyword: "" });
          }
        );
      }
    });
  };

  const onClickSort = (key, value) => {
    setState({
      dataSortColumn: {
        ...state.dataSortColumn,
        [key]: value,
      },
    });
  };
  const combineSortCustom = (params = {}) => {
    const keys = Object.keys(params);
    const paramSort = keys.reduce(
      (result, key) =>
        params[key] &&
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
          ? [...result, `${key},${params[key] === 1 ? "asc" : "desc"}`]
          : [...result],
      []
    );
    return paramSort;
  };
  useEffect(() => {
    // set giá trị render lần đầu cho biến refInfoPatient, để xử lý sort
    if (
      refInfoPatient.current === null ||
      (refInfoPatient.current &&
        Object.keys(refInfoPatient.current).length === 0)
    ) {
      refInfoPatient.current = cloneDeep(infoPatient);
    }
  }, [infoPatient]);

  const dataSource = useMemo(() => {
    return isThemMoi ? dsThuocTamThoi : infoPatient?.dsThuoc;
  }, [isThemMoi, dsThuocTamThoi, infoPatient?.dsThuoc]);

  useEffect(() => {
    // useEffect này dùng để sort danh sách
    const dsThuocClone = cloneDeep(refInfoPatient?.current?.dsThuoc);
    const sortList = combineSortCustom(state.dataSortColumn);
    let keyListSort = [];
    let valueListSort = [];
    sortList.forEach((item) => {
      const splitItem = item.split(",");
      keyListSort = [...keyListSort, splitItem[0]];
      valueListSort = [...valueListSort, splitItem[1]];
    });
    if (infoPatient)
      infoPatient.dsThuoc = orderBy(dsThuocClone, keyListSort, valueListSort);
    updateData({ infoPatient });
  }, [state.dataSortColumn]);

  const onClickTaoMienGiam = () => {
    if (refMienGiam.current) {
      refMienGiam.current.show();
    }
  };

  const onSettings = () => {
    refSettings.current && refSettings.current.settings();
  };

  return (
    <Card noPadding={true} className={`${className}`}>
      <Main className="main" isThemMoi={isThemMoi}>
        <Header>
          <div className="header">
            <Row className="header-row">
              <Row>
                <div className="content">
                  {t("nhaThuoc.danhSachDichVu")}{" "}
                  <Tooltip title="Sắp xếp cột trong bảng">
                    <IcSetting onClick={onSettings} className="icon" />
                  </Tooltip>
                </div>
                <div className="content-note">
                  {(isVangLai ||
                    (isAdvised && !isVangLai) ||
                    isVangLai ||
                    isThemMoi) && (
                    // nếu nhấn tư vấn đơn (nb đã có hồ sơ mới hiển thị tư vấn đơn) hoặc là người bệnh vãng lai sẽ hiển thị ô search dich vụ

                    <InputSearch>
                      <img
                        src={IconSearch}
                        alt="IconSearch"
                        className="icon-search"
                      />
                      <InputTimeout
                        ref={refSearch}
                        placeholder={t(
                          "nhaThuoc.nhapHoacQuetMaDichVuTenDichVu"
                        )}
                        autoFocus
                        value={state.keyword}
                        onChange={(value) => {
                          setState({
                            keyword: value,
                          });
                        }}
                        onKeyPress={(e) => {
                          if (isThemMoi && !khoId) {
                            message.error(
                              t("nhaThuoc.batBuocChonKhoTruocKhiTimKiemHangHoa")
                            );
                            e.preventDefault();
                            return null;
                          }
                          if (e.key === "Enter") {
                            if (!e.target.value) {
                              refModalListDichVuTimKiem.current.show({
                                khoId: isThemMoi ? khoId : infoPatient.khoId,
                                isThemMoi,
                              });
                            } else {
                              searchInput(e.target.value);
                            }
                          }
                        }}
                      />
                    </InputSearch>
                  )}
                </div>
                <div className="mienGiam">
                  {!isThemMoi ? (
                    <Button
                      onClick={onClickTaoMienGiam}
                      rightIcon={<img src={IconMienGiam} alt="icontaomiengiam" />}
                      minWidth={100}
                      type="primary"
                      borderColor={"#ffffff20"}
                      iconHeight={15}
                    >
                      {t("thuNgan.taoMienGiam")}
                    </Button>
                  ) : null}
                </div>
              </Row>
            </Row>
          </div>
        </Header>
        <TableWrapper
          ref={refSettings}
          className="table"
          scroll={{ y: 453 }}
          rowKey={"id"}
          onRow={onRow}
          rowClassName={(record) =>
            record?.checked ? "background-checked" : ""
          }
          columns={[
            {
              title: <HeaderSearch title={t("common.stt")} />,
              width: size.width <= 1400 ? 64 : 64,
              dataIndex: "index",
              key: "index",
              hideSearch: true,
              align: "center",
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.tenDichVu")}
                  sort_key="nbDichVu.dichVu.ten"
                  onClickSort={onClickSort}
                  dataSort={state?.dataSortColumn["nbDichVu.dichVu.ten"] || ""}
                />
              ),
              width: 250,
              // dataIndex: "dsThuoc.nbDichVu",
              show: true,
              i18Name: "nhaThuoc.tenDichVu",
              key: "ten",
              type: true,
              hideSearch: true,

              render: (item, data, index) => {
                return (
                  <>
                    <PopoverCustom
                      className="popup-custom"
                      placement="right"
                      content={contentNamePopover(item)}
                      trigger={["hover", "click"]}
                    >
                      <div style={{ color: "#0762F7", fontWeight: "bold" }}>
                        {item?.nbDichVu?.dichVu?.ten}
                      </div>
                    </PopoverCustom>
                    <InputText
                      value={item.nbDichVu.ghiChu}
                      placeholder={t("nhaThuoc.ghiChu")}
                      isAdvised={isAdvised || isThemMoi || isVangLai}
                      onChange={onChangeAdvise("ghiChu", item, index)}
                    />
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.slKe")}
                  sort_key="nbDvKho.soLuongYeuCau"
                  onClickSort={onClickSort}
                  dataSort={
                    state?.dataSortColumn["nbDvKho.soLuongYeuCau"] || ""
                  }
                />
              ),
              // key: "id",
              width: size.width <= 1400 ? 83 : 83,
              // dataIndex: "dsThuoc.ten",
              show: true,
              i18Name: "nhaThuoc.slKe",
              hideSearch: true,
              align: "right",
              render: (item) => {
                return (
                  <>
                    <div>{item?.nbDvKho?.soLuongYeuCau}</div>
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.slBan")}
                  sort_key="nbDichVu.soLuong"
                  onClickSort={onClickSort}
                  dataSort={state?.dataSortColumn["nbDichVu.soLuong"] || ""}
                />
              ),
              width: size.width <= 1400 ? 83 : 83,
              // dataIndex: "soLuongBan",
              // key: "soLuongBan",
              show: true,
              i18Name: "nhaThuoc.slBan",
              hideSearch: true,
              align: "right",
              render: (item, data, index) => {
                const value =
                  item?.nbDichVu?.soLuong > 0 ? item?.nbDichVu?.soLuong : null;
                const defaultValue = isVangLai
                  ? value
                  : item?.nbDichVu?.soLuong;

                if (
                  infoPatient.phieuThu?.thanhToan ||
                  infoPatient.phieuXuat?.trangThai ===
                    TRANG_THAI_PHIEU_NHAP_XUAT.HOAN_THANH
                ) {
                  return (
                    <>
                      <div>{defaultValue}</div>
                    </>
                  );
                }

                return (
                  <>
                    <InputText
                      type="number"
                      id={item.key || item.id || item?.nbDichVu?.dichVuId}
                      key={"inputSoLuong" + index}
                      value={defaultValue}
                      isAdvised={isAdvised || isThemMoi || isVangLai}
                      onChange={onChangeAdvise("soLuong", item, index)}
                      min={1}
                      disabled={
                        infoPatient.phieuThu?.thanhToan ||
                        infoPatient.phieuXuat?.trangThai ===
                          TRANG_THAI_PHIEU_NHAP_XUAT.HOAN_THANH
                      }
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "+" || e.key === "e") {
                          return e.preventDefault();
                        }
                        if (
                          item?.nbDvKho?.soLuongKhaDung +
                            item?.nbDichVu?.soLuong ===
                          0
                        ) {
                          message.error(
                            t(
                              "nhaThuoc.khongTheKeThemSoLuongDoCoTonKhaDungBang0"
                            )
                          );
                          // return null;
                        }
                      }}
                    />
                    {/* <div contentEditable={isAdvised ? true : false} onKeyDown={onChangeAdvise}>{item.nbDichVu.soLuong}</div> */}
                  </>
                );
              },
            },
            ...(infoPatient?.phieuThu?.thanhToan &&
            infoPatient?.phieuXuat?.trangThai === 30
              ? [
                  {
                    title: (
                      <HeaderSearch
                        title={t("nhaThuoc.slHoan")}
                        sort_key="nbDvKho.soLuongTra"
                        onClickSort={onClickSort}
                        dataSort={
                          state?.dataSortColumn["nbDvKho.soLuongTra"] || ""
                        }
                      />
                    ),
                    // key: "id",
                    width: size.width <= 1400 ? 83 : 83,
                    // dataIndex: "dsThuoc.ten",
                    show: true,
                    i18Name: "nhaThuoc.slHoan",
                    hideSearch: true,
                    align: "right",
                    render: (item, obj) => {
                      return (
                        <>
                          <div>{obj?.nbDvKho?.soLuongTra}</div>
                        </>
                      );
                    },
                  },
                  {
                    title: (
                      <HeaderSearch
                        title={t("nhaThuoc.trangThaiHoan")}
                        sort_key="nbDichVu.trangThaiHoan"
                        onClickSort={onClickSort}
                        dataSort={
                          state?.dataSortColumn["nbDichVu.trangThaiHoan"] || ""
                        }
                      />
                    ),
                    width: size.width <= 1400 ? 130 : 130,
                    hideSearch: true,
                    show: true,
                    i18Name: "nhaThuoc.trangThaiHoan",
                    align: "right",
                    render: (item, obj) => {
                      return (
                        <>
                          <div>
                            {
                              listTrangThaiHoan?.find(
                                (itemFind) =>
                                  itemFind.id === obj?.nbDichVu?.trangThaiHoan
                              )?.ten
                            }
                          </div>
                        </>
                      );
                    },
                  },
                ]
              : []),
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.slKhaDung")}
                  sort_key="nbDvKho.soLuongKhaDung"
                  onClickSort={onClickSort}
                  dataSort={
                    state?.dataSortColumn["nbDvKho.soLuongKhaDung"] || ""
                  }
                />
              ),
              width: 130,
              show: true,
              i18Name: "nhaThuoc.slKhaDung",
              // dataIndex: "soLuongKhaDung",
              hideSearch: true,
              align: "right",
              // key: "soLuongKhaDung",
              render: (item) => {
                return (
                  <>
                    <div>{item?.nbDvKho?.soLuongKhaDung}</div>
                    {/* <div>{item.formatPrice()}</div> */}
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.dvt")}
                  sort_key="nbDichVu.dichVu.tenDonViTinh"
                  onClickSort={onClickSort}
                  dataSort={
                    state?.dataSortColumn["nbDichVu.dichVu.tenDonViTinh"] || ""
                  }
                />
              ),
              width: size.width <= 1400 ? 83 : 83,
              // dataIndex: "dvt",
              // key: "dvt",
              show: true,
              i18Name: "nhaThuoc.dvt",
              hideSearch: true,
              align: "right",
              render: (item) => {
                return (
                  <>
                    <div>{item?.nbDichVu?.dichVu?.tenDonViTinh}</div>
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.donGia")}
                  sort_key="nbDichVu.giaKhongBaoHiem"
                  onClickSort={onClickSort}
                  dataSort={
                    state?.dataSortColumn["nbDichVu.giaKhongBaoHiem"] || ""
                  }
                />
              ),
              width: 138,
              // dataIndex: "donGia",
              // key: "donGia",
              show: true,
              i18Name: "nhaThuoc.donGia",
              hideSearch: true,
              align: "right",
              render: (item) => {
                return (
                  <>
                    <div>{item?.nbDichVu?.giaKhongBaoHiem?.formatPrice()}</div>
                  </>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={t("nhaThuoc.thanhTien")}
                  sort_key="nbDichVu.tienNbTuTra"
                  onClickSort={onClickSort}
                  dataSort={state?.dataSortColumn["nbDichVu.tienNbTuTra"] || ""}
                />
              ),
              width: 174,
              // dataIndex: "thanhTien",
              // key: "thanhTien",
              show: true,
              i18Name: "nhaThuoc.thanhTien",
              hideSearch: true,
              align: "right",
              render: (item) => {
                return (
                  <div style={{ color: "#0762F7", fontWeight: "bold" }}>
                    {item?.nbDichVu?.tienNbTuTra?.formatPrice()}
                  </div>
                );
              },
            },
            {
              title: (
                <HeaderSearch
                  title={<div style={{ visibility: "hidden" }}>e</div>}
                />
              ),
              width: 25,
              hideSearch: true,
              align: "center",
              render: (item, data, index) => {
                if ((isAdvised && !isVangLai) || isVangLai || isThemMoi) {
                  return (
                    <Tooltip title={t("nhaThuoc.xoaThuoc")} placement="bottom">
                      <div
                        onClick={() => {
                          refConfirm.current &&
                            refConfirm.current.show(
                              {
                                title: t("common.xoaDuLieu"),
                                content: `${t("common.banChacChanMuonXoa")} ${
                                  item.nbDichVu.dichVu.ten
                                }?`,
                                cancelText: t("common.quayLai"),
                                okText: t("common.dongY"),
                                classNameOkText: "button-error",
                                showImg: true,
                                showBtnOk: true,
                              },
                              () => {
                                onRemoveThuocTrongDon({
                                  isThemMoi,
                                  id: item.id,
                                  index,
                                });
                              },
                              () => {}
                            );
                        }}
                      >
                        <img
                          src={require("assets/images/kho/delete.png")}
                          alt=""
                        ></img>
                      </div>
                    </Tooltip>
                  );
                }
                return <> </>;
              },
            },
          ]}
          dataSource={dataSource}
        ></TableWrapper>
        <MienGiam
          modalCheckoutRef={refMienGiam}
          phieuThuId={infoPatient?.phieuThu?.id}
        />

        <ModalListDichVuTimKiem
          ref={refModalListDichVuTimKiem}
          isThemMoi={isThemMoi}
        />
      </Main>
    </Card>
  );
};
export default memo(DanhSach);
