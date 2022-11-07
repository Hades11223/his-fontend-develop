import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DatePicker, Popover, Tooltip, message, Menu, Dropdown } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {
  TableWrapper,
  HeaderSearch,
  Checkbox,
  InputTimeout,
  Button,
} from "components";
import { isNumber, TRANG_THAI } from "../../configs";
import { Main, GlobalStyle } from "./styled";
import MainTable from "pages/chanDoanHinhAnh/components/TableCDHA";
import IcInfoFill from "assets/svg/ic-info-fill.svg";
import ModalChiTietDichVu from "pages/chanDoanHinhAnh/components/ModalChiTietDichVu";
import ModalPhanPhong from "pages/chanDoanHinhAnh/components/ModalPhanPhong";
import { refConfirm } from "app";
import ModalChiTietDichVuTiepNhan from "pages/chanDoanHinhAnh/components/ModalChiTietDichVuTiepNhan";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES, GIOI_TINH_BY_VALUE } from "constants/index";
import IcPdf from "assets/svg/ic-pdf.svg";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import IcViewImagePacsHide from "assets/svg/ic-view-pasc-hide.svg";
import printProvider from "data-access/print-provider";
import IcPdfHide from "assets/svg/ic-pdf-hide.svg";
import IcOption from "assets/svg/ic-option.svg";
import IcChangeService from "assets/images/xetNghiem/icChangeService.png";
import IcCreateService from "assets/images/xetNghiem/icCreateService.png";
import IcChangeServiceHide from "assets/images/xetNghiem/icChangeServiceHide.png";
import ModalChiDinhDichVuThem from "pages/chanDoanHinhAnh/tiepNhan/ModalChiDinhDichVuThem";
import ModalDoiDichVu from "pages/chanDoanHinhAnh/tiepNhan/ModalDoiDichVu";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import ModalHuyHoanDichVu from "components/ModalHuyHoanDichVu";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";
import { useTranslation } from "react-i18next";
import { groupBy } from "lodash";
import IcSetting from "assets/svg/ic-setting.svg";
import { useEnum, useLoading, useStore } from "hook";
import { printJS } from "data-access/print-provider";
const { Column } = TableWrapper;
let timer = null;

const DanhSachDichVu = ({ layerId }) => {
  const { t } = useTranslation();
  const refMaDV = useRef(null);
  const refCheckbox = useRef(null);
  const refSettings = useRef(null);
  const { showLoading, hideLoading } = useLoading();

  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const listTrangThaiHoan = useEnum(ENUM.TRANG_THAI_HOAN);
  const nguoiThucHienId = useStore("dsBenhNhan.nguoiThucHienId", null);
  const dieuDuongId = useStore("dsBenhNhan.dieuDuongId", null);
  const listNbGoiDv = useStore("nbGoiDv.listNbGoiDv", []);

  const listServices = useStore("choTiepDonDV.listServices", []);
  const nbDotDieuTriId = useStore("choTiepDonDV.nbDotDieuTriId", null);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const {
    choTiepDonDV: {
      getTongHopDichVuCLS,
      updateData,
      onChangeInputSearch,
      huyTiepNhanDv,
      tiepNhanDv,
      coKetQuaDv,
      huyKetQuaDv,
      boQua,
      getPhieuKetQua,
    },
    phieuIn: { getListPhieu, getFilePhieuIn, showFileEditor },
    pacs: { getUrl },
    phimTat: { onRegisterHotkey },
    nbDvHoan: { inPhieuHoanDoiTra },
    nbGoiDv: { getByNbThongTinId },
  } = useDispatch();

  const [state, _setState] = useState({
    isCheckedAll: false,
    listKeys: [],
    selectedRowKeys: [],
    status: null,
    selectedBtn: [],
    content: "",
    dsDichVuId: [],
    listDichVuId: [],
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const gioiTinh = GIOI_TINH_BY_VALUE?.[thongTinBenhNhan?.gioiTinh];
  const age = thongTinBenhNhan.tuoi
    ? `${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";
  const refChiTietDichVu = useRef(null);
  const refModalPhanPhong = useRef(null);
  const refModalChiTietDichVuTiepNhan = useRef(null);
  const ThongTinDichVuRef = useRef(null);
  const refModalChiDinhDichVuThem = useRef(null);
  const refModalDoiDichVu = useRef(null);
  const refModalHoanDichVu = useRef(null);
  const refModalHuyHoanDichVu = useRef(null);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refMaDV.current && refMaDV.current.focus();
          },
        },
      ],
    });
  }, []);

  const handleDichVu = (data) => {
    if (refChiTietDichVu.current) refChiTietDichVu.current.show(data);
  };

  const onChiDichDichVu = (data) => {
    if (refModalChiDinhDichVuThem.current)
      refModalChiDinhDichVuThem.current.show(data);
  };

  const onDoiDichVu = (data) => {
    if (
      TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
      data.trangThaiHoan === 0
    ) {
      if (refModalDoiDichVu.current)
        refModalDoiDichVu.current.show({
          ...data,
          gioiTinh: thongTinBenhNhan?.gioiTinh,
          tuoi: thongTinBenhNhan?.tuoi,
        });
    } else {
      return null;
    }
  };

  const onHuyHoan = (data) => {
    let gioiTinh = thongTinBenhNhan?.gioiTinh
      ? GIOI_TINH_BY_VALUE[thongTinBenhNhan?.gioiTinh]
      : "";

    let tuoi =
      thongTinBenhNhan?.thangTuoi > 36 || thongTinBenhNhan?.tuoi
        ? `${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
        : `${thongTinBenhNhan?.thangTuoi} ${t("common.thang")}`;

    data.gioiTinh = gioiTinh;
    data.tuoi = tuoi;
    refModalHuyHoanDichVu.current && refModalHuyHoanDichVu.current.show(data);
  };

  const onHoanDichVu = (data) => {
    if (data?.length) {
      data.forEach((element) => {
        element.gioiTinh = gioiTinh;
        element.tuoi = age;
      });
      if (refModalHoanDichVu.current)
        refModalHoanDichVu.current.show(
          {
            data: data,
            selectedRowKeys: state?.selectedRowKeys,
          },
          () => {
            onOkHoanDichVu();
          }
        );
    } else {
      message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
    }
  };

  const handleDichVuTiepNhan = (data) => {
    if (refModalChiTietDichVuTiepNhan.current) {
      refModalChiTietDichVuTiepNhan.current.show(data);
      updateData({ chiDinhTuDichVuId: data?.id });
    }
  };

  const handlePhong = (selectedRowKeys, dsDichVuId) => {
    refModalPhanPhong.current &&
      refModalPhanPhong.current.show(selectedRowKeys, dsDichVuId);
  };

  useEffect(() => {
    updateData({ dsTrangThai: [25, 35, 43] });
  }, []);

  useEffect(() => {
    let listStatus = (listServices || [])
      .filter((item) => state.selectedRowKeys.includes(item.id))
      .map((item) => item.trangThai);
    setState({ selectedBtn: [...new Set(listStatus)] });
  }, [state.selectedRowKeys]);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck).then((s) => {
        setState({
          isCheckedAll: false,
          selectedRowKeys: [],
          status: null,
          selectedBtn: [],
          content: "",
          dsDichVuId: [],
          listDichVuId: [],
        });
      });
    }
  }, [nbDotDieuTriId]);

  useEffect(() => {
    if (thongTinBenhNhan.nbThongTinId) {
      getByNbThongTinId({ nbThongTinId: thongTinBenhNhan?.nbThongTinId });
    }
  }, [thongTinBenhNhan]);

  const { listKeys, listDichVuId, dataSource } = useMemo(() => {
    try {
      let listAllKeys = []; // Id record format: {soPhieu}-{nhomDichVuCap2Id}-{dichVuId}
      let listAllDichVuId = [];
      const dataSource = (listServices || []).map((item, index) => {
        listAllKeys.push(item.id);
        listAllDichVuId.push(item.dichVuId);
        return { ...item, index: index + 1 };
      });
      return {
        listKeys: listAllKeys,
        listDichVuId: listAllDichVuId,
        dataSource,
      };
    } catch (error) {
      return {
        listKeys: [],
        listDichVuId: [],
        dataSource: [],
      };
    }
  }, [listServices]);

  const onSearchInput = (key, requiredNumber) => (e) => {
    if (!nbDotDieuTriId) return;
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch(
        {
          [key]: value,
        },
        paramCheck
      );
    }, 300);
  };

  // const renderContent = (type) => (value, row, index) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };

  //   if (type === "thoiGianChiDinh") {
  //     obj.children = moment(value).format("DD/MM/YYYY");
  //   }

  //   if (type === "trangThai") {
  //     let currentStatus = "";
  //     if (row.trangThaiHoan && row.trangThaiHoan !== 0) {
  //       currentStatus = (listTrangThaiHoan || []).find(
  //         (item) => item.id === row.trangThaiHoan
  //       );
  //     } else {
  //       currentStatus = (listTrangThaiDichVu || []).find(
  //         (item) => item.id === value
  //       );
  //     }
  //     obj.children = currentStatus?.ten;
  //   }

  //   if (type === "guiPacs" || type === "thanhToan") {
  //     obj.children = <Checkbox checked={value} onChange={() => {}} />;
  //   }

  //   if (["soPhieu", "dichVuCap2"].includes(row.type)) {
  //     obj.props.colSpan = 0;
  //   }
  //   return obj;
  // };

  const onCheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? listKeys : [],
      isCheckedAll: e.target?.checked,
      dsDichVuId: e.target?.checked ? listDichVuId : [],
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    let updateSelectDichVuId = data.map((item) => item.dichVuId);
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    updateSelectDichVuId = [...new Set(updateSelectDichVuId)];
    if ((listServices || []).length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
        dsDichVuId: updateSelectDichVuId,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
        dsDichVuId: updateSelectDichVuId,
      });
    }
  };
  const onTiepNhan = () => {
    let dataService = (listServices || [])
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            ` ${t("common.trangThai")} ` +
            (listTrangThaiDichVu || [])
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.canhBao"),
          content: t("cdha.nbCoDichVuKhongTheTiepNhan").replace(
            "{0}",
            dataService
          ),
          cancelText: t("common.quayLai"),
          showImg: false,
        });
    } else {
      let data = state.selectedRowKeys.map((item) => {
        return { id: item, nguoiThucHienId, dieuDuongId };
      });
      tiepNhanDv(data)
        .then((s) => {
          if (s) {
            getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
            setState({ isCheckedAll: false, selectedRowKeys: [] });
          }
        })
        .catch((error) => {
          if (error?.code === 7609) {
            ThongTinDichVuRef.current &&
              ThongTinDichVuRef.current.show({
                title: t("common.thongBao"),
                content: error.message,
                okText: t("common.dong"),
                classNameOkText: "button-closel",
                showBtnOk: true,
              });
          }
        });
    }
  };

  const onHuyTiepNhan = () => {
    let dataService = (listServices || [])
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            ` ${t("common.trangThai")} ` +
            (listTrangThaiDichVu || [])
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.canhBao"),
          content: t("cdha.nbCoDvKhongTheTiepNhan")?.replace(
            "{0}",
            dataService
          ),
          cancelText: t("common.quayLai"),
          showImg: false,
        });
    } else {
      huyTiepNhanDv(state.selectedRowKeys).then((s) => {
        getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
        setState({ isCheckedAll: false, selectedRowKeys: [] });
      });
    }
  };

  const handleCoKetQua = () => {
    let dataService = (listServices || [])
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            ` ${t("common.trangThai")} ` +
            (listTrangThaiDichVu || [])
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.canhBao"),
          content: t("cdha.nbCoDvKhongTheTiepNhanCoKetQua")?.replace(
            "{0}",
            dataService
          ),
          cancelText: t("common.quayLai"),
          showImg: false,
        });
    } else {
      coKetQuaDv(state.selectedRowKeys).then((s) => {
        getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
        setState({ isCheckedAll: false, selectedRowKeys: [] });
      });
    }
  };

  const onHuyKetQua = () => {
    let dataService = (listServices || [])
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_CO_KET_QUA"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            t("common.trangThai") +
            (listTrangThaiDichVu || [])
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.canhBao"),
          content: t("cdha.nbCoDvKhongTheTiepNhan")?.replace(
            "{0}",
            dataService
          ),
          cancelText: t("common.quayLai"),
          showImg: false,
        });
    } else {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.canhBao"),
            content: t("cdha.dvDaCoKetQua"),
            cancelText: t("common.quayLai"),
            showBtnOk: true,
          },
          () => {
            huyKetQuaDv(state.selectedRowKeys).then((s) => {
              getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
              setState({ isCheckedAll: false, selectedRowKeys: [] });
            });
          }
        );
    }
  };

  const printPdf = (data) => (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    getPhieuKetQua({
      nbDotDieuTriId: data?.nbDotDieuTriId,
      dsSoKetNoi: [data?.soKetNoi],
    }).then((s) => {
      onPrintMergePdf(s);
    });

    // if (data?.dsFileKetQua) printProvider.printMergePdf(data?.dsFileKetQua);
  };

  const openViewPacs = (data) => {
    // let payload = {
    //   dichVuId: data?.dichVuId,
    //   nbDotDieuTriId: data?.nbDotDieuTriId,
    // };
    if (
      TRANG_THAI.DA_CO_KET_QUA.includes(data?.trangThai) &&
      data?.trangThaiHoan === 0
    ) {
      getUrl({ id: data?.id }).then((s) => {
        window.open(s, "_blank").focus();
      });
    }
  };

  const content = (data) => (
    <div className="option">
      <div onClick={() => onDoiDichVu(data)} className="item">
        <img
          src={
            TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
            data.trangThaiHoan === 0
              ? IcChangeService
              : IcChangeServiceHide
          }
          alt="..."
        />
        <span
          style={{
            color: `${
              TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
              data.trangThaiHoan === 0
                ? ""
                : "#a6a6a6"
            }`,
          }}
        >
          {t("cdha.doiDv")}
        </span>
      </div>
      <div className="item" onClick={() => onChiDichDichVu(data)}>
        <img src={IcCreateService} alt="..." />
        <span>{t("cdha.chiDinhThem")}</span>
      </div>
      {data.trangThaiHoan === 10 && (
        <div className="item" onClick={() => onHuyHoan(data)}>
          <img src={IcHuyHoan} alt="..." />
          <span>{t("cdha.huyYcHoan")}</span>
        </div>
      )}
    </div>
  );

  const onIgnore = () => {
    let dataService = (listServices || [])
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["CHO_TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            t("common.trangThai") +
            (listTrangThaiDichVu || [])
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      refConfirm.current &&
        refConfirm.current.show({
          title: t("common.canhBao"),
          content: t("cdha.nbCoDvKhongTheTiepNhanBoQua")?.replace(
            "{0}",
            dataService
          ),
          cancelText: t("common.quayLai"),
          showImg: false,
        });
    } else {
      boQua(state.selectedRowKeys).then((s) => {
        if (s) {
          getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
          setState({ isCheckedAll: false, selectedRowKeys: [] });
        }
      });
    }
  };

  const onViewPdf = () => {
    let payload = {
      nbDotDieuTriId,
      dsNbDichVuId: state.selectedRowKeys.join(),
    };
    inPhieuHoanDoiTra(payload).then((s) => {
      let data = (s || []).map((item) => {
        return item.file.pdf;
      });
      printProvider.printMergePdf(data);
    });
  };

  const onPrintMergePdf = (s) => {
    const _dsPhieuPacs = groupBy(s?.dsPhieuPacs || [], "soPhieuId") || {};

    const printPdf = [
      ...(s?.dsPhieuHis || []).map((x) => x?.file?.pdf),
      ...Object.keys(_dsPhieuPacs).map(
        (x) => _dsPhieuPacs[x][_dsPhieuPacs[x].length - 1]?.duongDan
      ),
    ];

    if (printPdf.length > 0) printProvider.printMergePdf(printPdf);
  };

  const onInPhieuKetQua = () => {
    // phieuKetQua(state.selectedRowKeys[0]).then((s) => {
    //   if (s?.file.pdf) printProvider.printMergePdf([s?.file?.pdf]);
    // });
    const _dsSoKetNoi = state.selectedRowKeys
      .map((x) => dataSource.find((item) => item.id == x))
      .filter((x) => TRANG_THAI.DA_CO_KET_QUA.includes(x.trangThai))
      .map((x) => x.soKetNoi);

    if (_dsSoKetNoi && _dsSoKetNoi.length > 0) {
      getPhieuKetQua({
        nbDotDieuTriId: nbDotDieuTriId,
        dsSoKetNoi: _dsSoKetNoi,
      }).then((s) => {
        onPrintMergePdf(s);
      });
    }
  };
  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            ref={refCheckbox}
            onChange={onCheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        let updatedSelectedKeys = state?.selectedRowKeys || [];
        let updateSelectDichVuId = state?.dsDichVuId || [];
        // let updateSelectDichVuId = data.map((item) => item.dichVuId);
        if (state?.selectedRowKeys.includes(record?.id)) {
          updatedSelectedKeys = updatedSelectedKeys.filter(
            (item) => item !== record?.id
          );
        } else {
          updatedSelectedKeys.push(record?.id);
        }
        if (state?.dsDichVuId.includes(record?.id)) {
          updateSelectDichVuId = updateSelectDichVuId.filter(
            (item) => item !== record?.dichVuId
          );
        } else {
          updateSelectDichVuId.push(record?.dichVuId);
        }
        if ((listServices || []).length === updatedSelectedKeys.length) {
          setState({
            isCheckedAll: true,
            selectedRowKeys: [...updatedSelectedKeys],
            dsDichVuId: [...updateSelectDichVuId],
            record: { ...record, gioiTinh: gioiTinh, tuoi: age },
          });
        } else {
          setState({
            isCheckedAll: false,
            selectedRowKeys: [...updatedSelectedKeys],
            dsDichVuId: [...updateSelectDichVuId],
            record: { ...record, gioiTinh: gioiTinh, tuoi: age },
          });
        }
      },
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
      ignore: true,
    }),
    Column({
      title: t("xetNghiem.maDV"),
      width: "150px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      i18Name: "xetNghiem.maDV",
      renderSearch: (
        <InputTimeout
          type="number"
          placeholder={t("xetNghiem.timMaThietLap")}
          onChange={(e) => {
            onChangeInputSearch(
              {
                maDichVu: e,
              },
              paramCheck
            );
          }}
        />
      ),
    }),

    Column({
      title: t("common.tenDichVu"),
      width: "150px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
      renderSearch: (
        <InputTimeout
          type="number"
          placeholder={t("xetNghiem.timTheoGiaTri")}
          onChange={(e) => {
            onChangeInputSearch(
              {
                tenDichVu: e,
              },
              paramCheck
            );
          }}
        />
      ),
    }),
    Column({
      title: t("xetNghiem.soPhieu"),
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
      i18Name: "xetNghiem.soPhieu",
    }),

    Column({
      title: t("cdha.soKetNoi"),
      width: "100px",
      dataIndex: "soKetNoi",
      key: "soKetNoi",
      i18Name: "cdha.soKetNoi",
      renderSearch: (
        <InputTimeout
          type="number"
          placeholder={t("cdha.timTheoId")}
          onChange={(e) => {
            onChangeInputSearch(
              {
                soKetNoi: e,
              },
              paramCheck
            );
          }}
        />
      ),
    }),

    Column({
      title: t("common.trangThai"),
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "common.trangThai",
      align: "center",
      render: (value, record) => {
        let currentStatus = "";
        if (record.trangThaiHoan) {
          currentStatus = (listTrangThaiHoan || []).find(
            (item) => item.id === record.trangThaiHoan
          );
        } else {
          currentStatus = (listTrangThaiDichVu || []).find(
            (item) => item.id === value
          );
        }
        return currentStatus?.ten || "";
      },
    }),
    Column({
      title: t("cdha.daGuiPacs"),
      width: "100px",
      dataIndex: "guiPacs",
      key: "guiPacs",
      i18Name: "cdha.daGuiPacs",
      align: "center",
      render: (value, item, index) => {
        return <Checkbox checked={value}></Checkbox>;
      },
    }),

    Column({
      title: t("cdha.ngayChiDinh"),
      width: "100px",
      fixed: "center",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      i18Name: "cdha.ngayChiDinh",
      selectSearch: true,
      renderSearch: (
        <DatePicker
          placeholder={t("cdha.ngayChiDinh")}
          format="DD/MM/YYYY"
          onChange={onSearchInput("thoiGianChiDinh")}
          style={{ width: "100%" }}
        />
      ),
      render: (value, record) => {
        return value.toDateObject().format("dd/MM/yyyy");
      },
    }),
    Column({
      title: t("cdha.daTT"),
      width: "50px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      i18Name: "cdha.daTT",
      align: "center",
      render: (value, item, index) => {
        return <Checkbox checked={value}></Checkbox>;
      },
    }),
    Column({
      title: t("common.ghiChu"),
      width: "150px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      i18Name: "common.ghiChu",
      align: "center",
    }),
    Column({
      title: (
        <>
          {t("common.khac")}
          <IcSetting className="icon" onClick={onSettings} />
        </>
      ),
      width: 100,
      key: "khac",
      align: "center",
      fixed: "right",
      i18Name: "common.khac",
      ignore: true,
      render: (value, data) => {
        return (
          <div>
            <Tooltip title={t("xetNghiem.chiTietDichVu")} placement="bottom">
              <IcInfoFill
                className="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  paramCheck ? handleDichVuTiepNhan(data) : handleDichVu(data);
                }}
              />
            </Tooltip>
            {paramCheck && (
              <Tooltip title={t("cdha.xemKetQuaPdf")} placement="bottom">
                {TRANG_THAI.DA_CO_KET_QUA.includes(data.trangThai) ? (
                  <IcPdf onClick={printPdf(data)} className="icon" />
                ) : (
                  <IcPdfHide className="icon" onClick={printPdf(data)} />
                )}
              </Tooltip>
            )}
            {paramCheck && (
              <Tooltip title={t("cdha.xemKetQuaPacs")} placement="bottom">
                {TRANG_THAI.DA_CO_KET_QUA.includes(data.trangThai) &&
                data.trangThaiHoan === 0 ? (
                  <IcViewImagePacs
                    className="icon"
                    onClick={(event) => {
                      event.stopPropagation();
                      openViewPacs(data);
                    }}
                  />
                ) : (
                  <IcViewImagePacsHide className="icon" />
                )}
              </Tooltip>
            )}
            {paramCheck && (
              <Tooltip title={t("common.tuyChon")} placement="bottom">
                <Popover
                  trigger="click"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  content={content(data)}
                  placement="bottomLeft"
                  overlayClassName="popover-cdha"
                >
                  <IcOption className="icon" />
                </Popover>
              </Tooltip>
            )}
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    if (nbDotDieuTriId)
      getListPhieu({
        nbDotDieuTriId: nbDotDieuTriId,
        maManHinh: "012",
        maViTri: "01201",
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu });
      });
  }, [nbDotDieuTriId]);
  const onPrintPhieu = (item, nbDvKhamId) => async () => {
    if (item?.type == "editor") {
      showFileEditor({
        phieu: item,
        nbDotDieuTriId: nbDotDieuTriId,
        id: nbDotDieuTriId,
        nbThongTinId: thongTinBenhNhan?.nbThongTinId,
        nbDvKhamId: nbDvKhamId || item.dsSoPhieu[0]?.soPhieu,
        goiDvId: listNbGoiDv[0]?.id,
      });
    } else {
      try {
        showLoading();
        const { finalFile } = await getFilePhieuIn({
          listPhieus: [item],
          nbDotDieuTriId: nbDotDieuTriId,
          showError: true,
          id: nbDotDieuTriId,
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
  };

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
              onClick={() =>
                window.open("/editor/bao-cao/EMR_BA156/" + x.id)
              }
            >
              {x.tenGoiDv}
            </span>
          );
        })}
      </div>
    );
  };

  const menu = useMemo(() => {
    return (
      <Menu
        items={(state?.listPhieu || []).map((item, index) => {
          const children = {};
          if (item.dsSoPhieu?.length > 1)
            children.children = item.dsSoPhieu.map((phieu, index2) => {
              return {
                key: index + "-" + index2,
                label: (
                  <a
                    href={() => false}
                    onClick={onPrintPhieu(item, phieu.soPhieu)}
                  >
                    {`${phieu.ma} - ${phieu.ten}`}
                  </a>
                ),
              };
            });
          if (item.ma == "P040" && listNbGoiDv?.length > 1) {
            return {
              key: index + "",
              label: (
                <div style={{ display: "flex" }}>
                  <Popover
                    getPopupContainer={(trigger) => trigger.parentNode}
                    overlayClassName={"popover-cdha-dieu-tri"}
                    placement="left"
                    content={contentPhieuNhatKyDieuTri()}
                  >
                    <div style={{ flex: 1 }}>{item.ten || item.tenBaoCao}</div>
                  </Popover>
                </div>
              ),
            };
          }

          return {
            key: index,
            label: (
              <a
                href={() => false}
                onClick={
                  !item.dsSoPhieu || item.dsSoPhieu?.length <= 1
                    ? onPrintPhieu(item)
                    : null
                }
              >
                {item.ten || item.tenBaoCao}
              </a>
            ),
            ...children,
          };
        })}
      />
    );
  }, [state?.listPhieu, nbDotDieuTriId, thongTinBenhNhan, listNbGoiDv]);

  const renderHeaderRight = () => {
    const data = dataSource;
    return (
      <>
        {state.selectedBtn.length > 0 &&
          (!(data || []).find(
            (x) =>
              (x.trangThaiHoan !== 0 ||
                !x.thanhToan ||
                !TRANG_THAI["YEU_CAU_HOAN"].includes(x.trangThai)) &&
              state?.selectedRowKeys.includes(x.id)
          ) ? (
            <>
              <Button
                type="primary"
                onClick={() => onHoanDichVu(data, state?.selectedRowKeys)}
              >
                {t("xetNghiem.yeuCauHoan")}
              </Button>
            </>
          ) : (
            ""
          ))}
        {state.selectedBtn.some((item) =>
          TRANG_THAI["DA_TIEP_NHAN"].includes(item)
        ) && (
          <>
            {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].HUY_TIEP_NHAN_DICH_VU]) && (
              <Button type="default" onClick={onHuyTiepNhan}>
                {t("common.huyTiepNhan")}
              </Button>
            )}
            {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].CO_KET_QUA]) && (
              <Button type="primary" onClick={() => handleCoKetQua()}>
                {t("xetNghiem.coKetQua")}
              </Button>
            )}
          </>
        )}

        {state.selectedBtn.some((item) =>
          TRANG_THAI["TIEP_NHAN"].includes(item)
        ) &&
          !(data || [])?.find(
            (x) =>
              x.trangThaiHoan &&
              x.trangThaiHoan !== 0 &&
              state?.selectedRowKeys.includes(x.id)
          ) &&
          checkRole([ROLES["CHAN_DOAN_HINH_ANH"].TIEP_NHAN_DICH_VU]) && (
            <>
              <Button type="primary" onClick={onTiepNhan}>
                {t("common.tiepNhan")}
              </Button>
              <Button type="default" onClick={onIgnore}>
                {t("common.boQua")}
              </Button>
            </>
          )}

        {state.selectedBtn?.length === 1 &&
          state.selectedBtn.some((item) =>
            TRANG_THAI["DA_CO_KET_QUA"].includes(item)
          ) && (
            <>
              {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].IN_KET_QUA]) && (
                <Button type="primary" onClick={onInPhieuKetQua}>
                  {t("khamBenh.ketQua.inKetQua")}
                </Button>
              )}
            </>
          )}

        {state.selectedBtn.some((item) =>
          TRANG_THAI["DA_CO_KET_QUA"].includes(item)
        ) && (
          <>
            {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].HUY_CO_KET_QUA]) && (
              <Button type="primary" onClick={onHuyKetQua}>
                {t("xetNghiem.huyKetQua")}
              </Button>
            )}
          </>
        )}

        {state.selectedRowKeys?.length > 0 &&
          !paramCheck &&
          checkRole([ROLES["CHAN_DOAN_HINH_ANH"].PHAN_PHONG_CHO_TIEP_DON]) && (
            <>
              <Button
                type="primary"
                onClick={() =>
                  handlePhong(state.selectedRowKeys, state.dsDichVuId)
                }
              >
                {t("cdha.phanPhong")}
              </Button>
            </>
          )}
        {state.selectedBtn.length > 0 &&
          !(data || [])?.find(
            (x) =>
              x.trangThaiHoan === 0 && state?.selectedRowKeys.includes(x.id)
          ) && (
            <>
              <Button type="primary" onClick={onViewPdf}>
                {t("cdha.inPhieuYcHoanDoi")}
              </Button>
            </>
          )}
        {nbDotDieuTriId && (
          <>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button type="default">{t("cdha.inGiayTo")}</Button>
            </Dropdown>
          </>
        )}
      </>
    );
  };

  const onOkHoanDichVu = () => {
    getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
    setState({ isCheckedAll: false });
  };

  return (
    <Main>
      <GlobalStyle />
      <MainTable
        contentHeaderLeft={t("xetNghiem.danhSachDichVu")}
        contentHeaderRight={renderHeaderRight()}
      >
        <TableWrapper
          scroll={{ x: 1500 }}
          columns={columns}
          dataSource={dataSource}
          expandIconColumnIndex={3}
          className="custom-nestedtable"
          rowSelection={rowSelection}
          onRow={onRow}
          rowKey={(record) => record.id}
          tableName="table_ChanDoanHinhAnh_TiepNhan"
          ref={refSettings}
          expandable={{
            expandRowByClick: true,
            expandIcon: ({ expanded, onExpand, record }) => {
              if (!record.children?.length) return null;
              return expanded ? (
                <CaretDownOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <CaretUpOutlined onClick={(e) => onExpand(record, e)} />
              );
            },
          }}
        />
      </MainTable>
      <ModalChiTietDichVu ref={refChiTietDichVu} />
      <ModalPhanPhong ref={refModalPhanPhong} />
      <ModalChiTietDichVuTiepNhan ref={refModalChiTietDichVuTiepNhan} />
      <ModalNotification ref={ThongTinDichVuRef} />
      <ModalChiDinhDichVuThem ref={refModalChiDinhDichVuThem} />
      <ModalDoiDichVu ref={refModalDoiDichVu} />
      <ModalHoanDichVu ref={refModalHoanDichVu} />
      <ModalHuyHoanDichVu ref={refModalHuyHoanDichVu} />
    </Main>
  );
};

export default DanhSachDichVu;
