import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupBy } from "lodash";
import moment from "moment";
import { Input, message, Tooltip } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { TableWrapper, Select, Button } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Checkbox from "components/Checkbox";
import {
  isNumber,
  TRANG_THAI,
  TRANG_THAI_FILTER,
  LOAI_KET_QUA,
} from "pages/xetNghiem/configs";
import { Main } from "./styled";
import MainTable from "pages/xetNghiem/components/tableXetNghiem";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import printProvider from "data-access/print-provider";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

let timer = null;

const DanhSachDichVu = ({ layerId, onChangeInputSearch, onShowInfo }) => {
  const { t } = useTranslation();

  const refNotification = useRef(null);
  const refInputMaDv = useRef(null);
  const [state, _setState] = useState({
    isCheckedAll: false,
    actionXNSuccess: false,
    dataTable: [],
    listKeys: [],
    selectedBtn: [],
    selectedRowKeys: [], // [{soPhieu}-{nhomDichVuCap2Id}-{dichVuId}]
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [listKetQuaXetNghiem] = useEnum(ENUM.KET_QUA_XET_NGHIEM);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listPhanLoaiKetQuaXetNghiem] = useEnum(
    ENUM.PHAN_LOAI_KET_QUA_XET_NGHIEM
  );

  const {
    xnHuyetHocSinhHoa: { listServices = [], nbDotDieuTriId },
    nbXetNghiem: { listData: listNb },
    maMay: { listDataTongHop = [] },
    donViTinh: { listAllDonViTinh },
  } = useSelector((state) => state);
  const {
    xnHuyetHocSinhHoa: {
      getDsDichVuChiDinhXN,
      capNhatKetQua,
      xacNhanKetQua,
      duyetKetQua,
      xacNhanTiepNhanMau,
      updateData,
      getPhieuKetQua,
    },
    layMauXN: { xacNhanlayMau },
    maMay: { getDataTongHop = [] },
    donViTinh: { getListAllDonViTinh },
    phimTat: { onRegisterHotkey },
    nbHoSo: { getFilePdf, getKetQuaXNPdf },
  } = useDispatch();
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refInputMaDv.current && refInputMaDv.current.focus();
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    updateData({ dsTrangThai: [66] });
    getDataTongHop({ size: 1000 });
    getListAllDonViTinh({ page: "", size: "" });
  }, []);

  useEffect(() => {
    const index = listNb.findIndex((item) => item.id === nbDotDieuTriId);

    if (index === -1) {
      updateData({ nbDotDieuTriId: null });
    }
  }, [listNb, nbDotDieuTriId]);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getDsDichVuChiDinhXN({
        nbDotDieuTriId,
        dataSortColumnDSDV: { maDichVu: 1 },
      }).then((s) => {
        if (s.length <= 0) {
          message.error(t("common.khongTonTaiDichVuNguoiBenh"));
        }
      });
    }
    setState({
      selectedRowKeys: [],
      isCheckedAll: false,
    });
  }, [nbDotDieuTriId]);

  useEffect(() => {
    const data = formatDataIds(state.selectedRowKeys);
    const listStatus = state.dataTable
      .filter((d) => d.nbDotDieuTriId)
      .filter((item) => data.includes(item.recordId))
      .map((u) => u.trangThai);
    setState({
      selectedBtn: [...new Set(listStatus)],
    });
  }, [state.selectedRowKeys]);

  useEffect(() => {
    let listAllKeys = []; // Id record format: {soPhieu}-{nhomDichVuCap2Id}-{dichVuId}
    let dataTable = [];
    const groupBySoPhieu = groupBy(listServices, "soPhieu");
    Object.keys(groupBySoPhieu).forEach((item) => {
      const dataSoPhieu = groupBySoPhieu[item];
      const groupByDichVu = groupBy(dataSoPhieu, "tenNhomDichVuCap2");
      dataTable.push({
        type: "soPhieu",
        stt: `${t("xetNghiem.soPhieu")}: ${item}`,
        id: item,
      });
      listAllKeys.push(item);

      Object.keys(groupByDichVu).forEach((d) => {
        let dichVu = groupByDichVu[d];
        dichVu = dichVu.map((v, idx) => {
          const children = v.dsChiSoCon.map((chiso) => ({
            ...chiso,
            maDichVu: chiso.maChiSoCon,
            tenDichVu: chiso.tenChiSoCon,
            isChiSoCon: true,
            trangThai: v.trangThai,
          }));
          listAllKeys.push(`${item}-${v.nhomDichVuCap2Id}-${v.id}`);
          return {
            ...v,
            children,
            stt: idx + 1,
            id: `${item}-${v.nhomDichVuCap2Id}-${v.id}`,
            recordId: v.id,
            donVi: listAllDonViTinh?.find((item) => item?.id == v?.donViTinhId)
              ?.ten,
          };
        });
        dataTable.push({
          type: "dichVuCap2",
          stt: d,
          id: `${item}-${groupByDichVu[d]?.[0]?.nhomDichVuCap2Id}`,
        });
        listAllKeys.push(`${item}-${groupByDichVu[d]?.[0]?.nhomDichVuCap2Id}`);
        dataTable = [...dataTable, ...dichVu];
      });
    });
    setState({
      listKeys: listAllKeys,
      dataTable,
    });
  }, [listServices]);

  const formatDataIds = (data) => {
    const listServiceIds = [];
    data.forEach((item) => {
      if (
        item.indexOf("-") > 0 &&
        item.indexOf("-") !== item.lastIndexOf("-")
      ) {
        const id = item.slice(item.lastIndexOf("-") + 1, item.length);
        listServiceIds.push(parseInt(id));
      }
    });
    return listServiceIds;
  };

  const handleCancel = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error(t("xetNghiem.moiChonDichVu"));
      return;
    }
    xacNhanlayMau({ data, status }).then((s) => {
      if (s.code === 0) {
        getDsDichVuChiDinhXN({ nbDotDieuTriId });
      }
    });
  };

  const handleSubmit = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error(t("xetNghiem.moiChonDichVu"));
      return;
    }

    xacNhanTiepNhanMau({ data, status }).then((res) => {
      if (res.code === 0) {
        const selectedBtn =
          status === "accept"
            ? [TRANG_THAI["XAC_NHAN_KET_QUA"][0]]
            : [TRANG_THAI["XAC_NHAN_TIEP_NHAN_MAU"][0]];
        const dataTable = state.dataTable.map((item) => ({
          ...item,
          ...(data.includes(item.recordId)
            ? { trangThai: TRANG_THAI["XAC_NHAN_KET_QUA"][0] }
            : {}),
        }));
        setState({
          dataTable,
          selectedBtn: selectedBtn,
        });
        getDsDichVuChiDinhXN({ nbDotDieuTriId });
      }

      if (res.code == 7609) {
        refNotification.current &&
          refNotification.current.show({
            title: t("common.thongBao"),
            content: res.message,
            okText: t("common.dong"),
            classNameOkText: "button-closel",
            showBtnOk: true,
          });
      }
    });
  };

  const onUpdateResult = () => {
    const data = state.dataTable
      .filter((d) => d.nbDotDieuTriId)
      .map((item) => {
        const id = item.id.slice(item.id.lastIndexOf("-") + 1, item.id.length);
        return {
          id: parseInt(id),
          ketQua: item.ketQua || "",
          banLuan: item.banLuan || "",
          ketLuan: item.ketLuan || "",
          maMayId: item.maMayId || "",
          dsChiSoCon: item.dsChiSoCon,
        };
      });

    if (!data.length) {
      message.error(t("xetNghiem.moiChonDichVu"));
      return;
    }
    capNhatKetQua({ data }).then((s) => {
      getDsDichVuChiDinhXN({ nbDotDieuTriId });
    });
  };

  const onResult = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error(t("xetNghiem.moiChonDichVu"));
      return;
    }
    xacNhanKetQua({ data, status }).then((res) => {
      if (res?.code === 0) {
        const selectedBtn =
          status === "accept"
            ? [TRANG_THAI["CO_KET_QUA"][0]]
            : [TRANG_THAI["XAC_NHAN_KET_QUA"][0]];
        debugger;
        const dataTable = state.dataTable.map((item) => ({
          ...item,
          ...(data.includes(item.recordId)
            ? { trangThai: TRANG_THAI["CO_KET_QUA"][0] }
            : {}),
        }));
        setState({
          dataTable,
          selectedBtn: selectedBtn,
        });
        getDsDichVuChiDinhXN({ nbDotDieuTriId });
      }
    });
  };

  const onConfirmResult = (isConfirm) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error(t("xetNghiem.moiChonDichVu"));
      return;
    }
    duyetKetQua({ data, status: isConfirm }).then((s) => {
      if (s.code === 0) {
        getDsDichVuChiDinhXN({ nbDotDieuTriId });
      }
    });
  };

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
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const showInfo = (data) => () => {
    onShowInfo(data);
    setState({
      dataTable: null,
    });
  };

  const onChangeEditBox = (type, index, record) => (e) => {
    if (type == "ketQua") {
      const value = e.target ? e.target?.value : e;
      if (`${value}`.length > 1500) {
        message.error(t("xetNghiem.vuiLongNhapKetQuaKhongQua1500KyTu"));
        return;
      }
    }
    let tableChildren = state.dataTable.find(
      (x) => x.recordId == record?.nbDvXetNghiemId
    );
    let idx = state.dataTable.indexOf(tableChildren);
    let value = "";
    if (state.dataTable) {
      if (e?.target) {
        value = e.target.value;
      } else {
        value = e ? String(e) : "";
      }
      if (idx) {
        state.dataTable[idx].dsChiSoCon[index][type] = value;
      } else {
        state.dataTable[index][type] = value;
      }
    }
  };
  const renderKetQua = (record, value, type, index) => {
    const isEdittable = TRANG_THAI["XAC_NHAN_KET_QUA"].includes(
      record.trangThai
    );
    switch (record.loaiKetQua) {
      case LOAI_KET_QUA.SO:
        return isEdittable ? (
          <Input
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value}
            type="number"
            onChange={onChangeEditBox(type, index, record)}
          />
        ) : (
          value
        );
      case LOAI_KET_QUA.CHON_GIA_TRI:
        return isEdittable ? (
          <Select
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value ? parseInt(value) : ""}
            onChange={onChangeEditBox(type, index, record)}
            placeholder={t("xetNghiem.chonKetQua")}
            data={listKetQuaXetNghiem}
            allowClear={false}
          />
        ) : (
          listKetQuaXetNghiem.find((d) => d.id === parseInt(value))?.ten
        );
      default:
        return isEdittable ? (
          <Input
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value}
            onChange={onChangeEditBox(type, index, record)}
          />
        ) : (
          value
        );
    }
  };

  const renderExclamation = (type) => (value, row, index) => {
    if (row.nbDvXetNghiemId) return null;
    const obj = {
      children: (
        <Tooltip title={t("xetNghiem.chiTietDichVu")} placement="bottom">
          <img
            src={require(`assets/images/xetNghiem/exclamation.png`)}
            alt="exclamation"
            onClick={showInfo(row)}
          />
        </Tooltip>
      ),
      props: {},
    };
    if (["soPhieu", "dichVuCap2"].includes(row.type)) {
      obj.children = null;
    }
    return obj;
  };

  const renderContent = (type) => (value, row, index) => {
    let children = null;
    switch (type) {
      case "thoiGianThucHien":
        children = moment(value).format("DD/MM/YYYY");
        break;
      case "ketQua":
        children = renderKetQua(row, value, type, index);
        break;
      case "trangThai":
        const currentItem = listTrangThaiDichVu.find((d) => d.id === value);
        children = currentItem?.ten;
        break;
      case "maMayId":
        const item = listDataTongHop.find((x) => x.id == value);
        if (TRANG_THAI["XAC_NHAN_KET_QUA"].includes(row.trangThai)) {
          children = row.isChiSoCon ? (
            item?.ten
          ) : (
            <Select
              data={listDataTongHop}
              defaultValue={item?.ten}
              onChange={onChangeEditBox(type, index, row)}
            ></Select>
          );
        } else {
          children = value;
        }
        break;
      default:
        if (
          (("banLuan" === type && !row.isChiSoCon) || "ketLuan" === type) &&
          TRANG_THAI["XAC_NHAN_KET_QUA"].includes(row.trangThai)
        ) {
          children = (
            <Input
              defaultValue={value}
              rows={2}
              onChange={onChangeEditBox(type, index, row)}
            />
          );
        } else children = value;
    }

    const obj = {
      children,
      props: {},
    };

    if (["soPhieu", "dichVuCap2"].includes(row.type)) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    let updatedSelectedKeys = selectedRowKeys;

    const isAdding = state.selectedRowKeys.length < selectedRowKeys.length;
    const selectedKey = isAdding
      ? selectedRowKeys
          .filter((x) => !state.selectedRowKeys.includes(x))
          .toString()
      : state.selectedRowKeys
          .filter((x) => !selectedRowKeys.includes(x))
          .toString();
    if (isAdding) {
      if (selectedKey.indexOf("-") < 0) {
        // select all sophieu => add all dich vu + nhom dich vu thuoc so phieu
        const newList = state.listKeys.filter(
          (item) => item.includes(`${selectedKey}-`) || item === selectedKey
        );
        updatedSelectedKeys = [...updatedSelectedKeys, ...newList];
        updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
      } else if (selectedKey.indexOf("-") === selectedKey.lastIndexOf("-")) {
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        const newList = state.listKeys.filter((item) =>
          item.includes(`${selectedKey}-`)
        );

        updatedSelectedKeys = [...updatedSelectedKeys, ...newList];
        updatedSelectedKeys = [...new Set(updatedSelectedKeys)];

        const itemNotSelectedInsoPhieu = state.listKeys.filter((item) => {
          if (
            item.indexOf("-") !== item.lastIndexOf("-") &&
            !updatedSelectedKeys.includes(item) &&
            item.slice(0, item.indexOf("-")) === soPhieu
          )
            return true;
          return false;
        });
        if (!itemNotSelectedInsoPhieu.length) {
          updatedSelectedKeys = [...updatedSelectedKeys, soPhieu];
        }
      } else {
        const group = selectedKey.slice(0, selectedKey.lastIndexOf("-"));
        const currentItemsInGroup = state.selectedRowKeys.filter((item) =>
          item.includes(group)
        ).length;
        const itemsInGroup = state.listKeys.filter((item) =>
          item.includes(group)
        ).length;
        if (currentItemsInGroup + 2 === itemsInGroup) {
          updatedSelectedKeys = [...updatedSelectedKeys, group];
        }
      }
    } else {
      if (selectedKey.indexOf("-") < 0) {
        // select all sophieu => remove all dich vu + nhom dich vu thuoc so phieu
        updatedSelectedKeys = state.selectedRowKeys.filter(
          (item) => !item.includes(`${selectedKey}-`) && item !== selectedKey
        );
      } else if (selectedKey.indexOf("-") === selectedKey.lastIndexOf("-")) {
        // select tenNhomDichVuCap2 => remove all dich vu thuoc nhom dich vu cap 2
        updatedSelectedKeys = state.selectedRowKeys.filter(
          (item) => !item.includes(`${selectedKey}-`) && item !== selectedKey
        );
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        const otherItemInsoPhieu = updatedSelectedKeys.filter((item) =>
          item.includes(`${soPhieu}-`)
        );
        if (!otherItemInsoPhieu.length) {
          // Remove all sophieu
          updatedSelectedKeys = updatedSelectedKeys.filter(
            (item) => item !== soPhieu
          );
        }
      } else {
        const soPhieuNhomdichVu = selectedKey.slice(
          0,
          selectedKey.lastIndexOf("-")
        );
        const otherItemInDichVu = state.selectedRowKeys.filter(
          (item) =>
            item.includes(`${soPhieuNhomdichVu}-`) && item !== selectedKey
        );
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        if (!otherItemInDichVu.length) {
          // Remove all dichvu
          updatedSelectedKeys = state.selectedRowKeys.filter(
            (item) =>
              !item.includes(`${soPhieuNhomdichVu}-`) &&
              item !== soPhieuNhomdichVu
          );
        }
        const otherItemInsoPhieu = updatedSelectedKeys.filter((item) =>
          item.includes(`${soPhieu}-`)
        );
        if (!otherItemInsoPhieu.length) {
          // Remove all sophieu
          updatedSelectedKeys = updatedSelectedKeys.filter(
            (item) => item !== soPhieu
          );
        }
      }
    }
    setState({ selectedRowKeys: updatedSelectedKeys });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={<Checkbox onChange={oncheckAll} checked={state.isCheckedAll} />}
      />
    ),
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const showClassByInput = (item) => {
    let strClass = "";
    if (item == 0) {
      strClass = "input-center";
    }
    if (item == 10) {
      strClass = "input-left";
    }
    if (item == 20 || item == 30) {
      strClass = "input-right";
    }
    return strClass;
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "40px",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, row, index) => {
        if (!["soPhieu", "dichVuCap2"].includes(row.type)) {
          return <span>{text}</span>;
        }
        return {
          children: <span>{text}</span>,
          props: {
            colSpan: 13,
            style: {
              textAlign: "left",
              fontSize: 18,
              fontWeight: "bold",
              ...(row.type === "soPhieu"
                ? { background: "#054ab9", color: "#ffffff" }
                : {}),
            },
          },
        };
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.maDV")}
          search={
            <Input
              ref={refInputMaDv}
              placeholder={t("xetNghiem.timMaThietLap")}
              onChange={onSearchInput("maDichVu")}
            />
          }
        />
      ),
      align: "left",
      width: "100px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      render: renderContent("maDichVu"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoGiaTri")}
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "250px",
      align: "left",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: renderContent("tenDichVu"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThai")}
          searchSelect={
            <Select
              defaultValue=""
              data={[
                { id: "", ten: t("common.tatCa") },
                ...listTrangThaiDichVu.filter((item) =>
                  TRANG_THAI_FILTER.includes(item.id)
                ),
              ]}
              placeholder={t("common.chonTrangThai")}
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: "150px",
      align: "left",
      dataIndex: "trangThai",
      key: "trangThai",
      render: renderContent("trangThai"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ketQua")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoMoTa")}
              onChange={onSearchInput("ketQua", true)}
            />
          }
        />
      ),
      width: "140px",
      textAlign: "left",
      dataIndex: "ketQua",
      key: "ketQua",
      render: renderContent("ketQua"),
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.giaTriThamChieu")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoMoTa")}
              onChange={onSearchInput("ketQuaThamChieu", true)}
            />
          }
        />
      ),
      width: "140px",
      textAlign: "left",
      dataIndex: "ketQuaThamChieu",
      key: "ketQuaThamChieu",
      render: renderContent("ketQuaThamChieu"),
    },
    {
      title: (
        <HeaderSearch
          search={
            <Input
              placeholder={t("xetNghiem.timTheoChiSoThap")}
              onChange={onSearchInput("chiSoThap", true)}
            />
          }
          title={t("xetNghiem.chiSoThap")}
        />
      ),
      width: "120px",
      dataIndex: "chiSoThap",
      key: "chiSoThap",
      align: "right",
      render: renderContent("chiSoThap"),
    },
    {
      title: (
        <HeaderSearch
          search={
            <Input
              placeholder={t("xetNghiem.timTheoChiSoCao")}
              onChange={onSearchInput("chiSoCao", true)}
            />
          }
          title={t("xetNghiem.chiSoCao")}
        />
      ),
      width: "120px",
      dataIndex: "chiSoCao",
      key: "chiSoCao",
      align: "right",
      render: renderContent("guiLis"),
    },
    {
      title: <HeaderSearch title={t("xetNghiem.danhGiaKetQua")} />,
      width: "100px",
      align: "center",
      dataIndex: "phanLoaiKetQua",
      key: "phanLoaiKetQua",
      render: (item, data) => {
        return listPhanLoaiKetQuaXetNghiem.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.donVi")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoMoTa")}
              onChange={onSearchInput("donVi")}
            />
          }
        />
      ),
      width: "100px",
      align: "left",
      dataIndex: "donVi",
      key: "donVi",
      render: renderContent("donVi"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ketLuan")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoMoTa")}
              onChange={onSearchInput("ketLuan")}
            />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "ketLuan",
      key: "ketLuan",
      render: renderContent("ketLuan"),
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.banLuan")}
          search={
            <Input
              placeholder={t("xetNghiem.timTheoMoTa")}
              onChange={onSearchInput("banLuan")}
            />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "banLuan",
      key: "banLuan",
      render: renderContent("banLuan"),
    },
    {
      title: (
        <HeaderSearch
          title={t("xetNghiem.maMay")}
          searchSelect={
            <Select
              placeholder={t("xetNghiem.timMaMay")}
              data={listDataTongHop}
            />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "maMayId",
      key: "maMayId",
      render: renderContent("maMayId"),
    },
    {
      title: <HeaderSearch title={t("common.chiTiet")} />,
      width: "70px",
      dataIndex: "exclamation",
      fixed: "right",
      key: "exclamation",
      align: "center",
      render: renderExclamation("exclamation"),
    },
  ];
  const onPriviewPdf = () => {
    getPhieuKetQua({}).then((s) => {
      let data = s.map((item) => {
        return item.file.pdf;
      });
      printProvider.printMergePdf(data);
    });
  };

  const onViewFileKetQua = (data) => {
    const soPhieus = [];
    state.selectedRowKeys.forEach((item) => {
      if (item.indexOf("-") < 0) {
        soPhieus.push(parseInt(item));
      }
    });

    const setId = new Set();
    state.dataTable.forEach((item) => {
      if (item.soPhieuId) {
        setId.add(item.soPhieuId);
      }
    });

    let payload = { nbDotDieuTriId, dsSoPhieuId: Array.from(setId) };

    getKetQuaXNPdf(payload).then((s) => {
      if (s.dsPhieuHis && s.dsPhieuHis.length > 0) {
        printProvider.printMergePdf([
          ...(s.dsPhieuHis || []).map((item) => {
            return item.file.pdf;
          }),
          ...(s.dsPhieuLis || []).map((item) => {
            return item.duongDan;
          }),
        ]);
      } else {
        printProvider.printMergePdf(
          s.dsPhieuLis.map((item) => {
            return item.duongDan;
          })
        );
      }
    });
  };
  const renderHeaderRight = () => (
    <>
      {state.selectedBtn.some((item) =>
        TRANG_THAI["XAC_NHAN_TIEP_NHAN_MAU"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["XET_NGHIEM"].HUY_MAU_HH]) && (
            <Button type="default" height={30} onClick={handleCancel("cancel")}>
              {t("xetNghiem.huyMau")}
            </Button>
          )}
          {checkRole([ROLES["XET_NGHIEM"].TIEP_NHAN_MAU_HH]) && (
            <Button type="primary" height={30} onClick={handleSubmit("accept")}>
              {t("xetNghiem.tiepNhanMau")}
            </Button>
          )}
        </>
      )}
      {state.selectedBtn.some((item) =>
        TRANG_THAI["XAC_NHAN_KET_QUA"].includes(item)
      ) &&
        checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_HH]) && (
          <>
            <Button type="default" height={30} onClick={handleSubmit("cancel")}>
              {t("xetNghiem.huyTiepNhanMau")}
            </Button>
            <Button type="primary" height={30} onClick={onUpdateResult}>
              {t("xetNghiem.luuKetQua")}
            </Button>
            <Button type="primary" height={30} onClick={onResult("accept")}>
              {t("xetNghiem.coKetQua")}
            </Button>
          </>
        )}

      {state.selectedBtn.some((item) =>
        TRANG_THAI["CO_KET_QUA"].includes(item)
      ) &&
        checkRole([ROLES["XET_NGHIEM"].DUYET_KET_QUA_HH]) && (
          <>
            <Button type="default" height={30} onClick={onResult("cancel")}>
              {t("xetNghiem.huyKetQua")}
            </Button>
            <Button
              type="primary"
              height={30}
              onClick={onConfirmResult("accept")}
            >
              {t("xetNghiem.duyetKetQua")}
            </Button>
          </>
        )}
      {state.selectedBtn.some((item) =>
        TRANG_THAI["DUYET_KET_QUA"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["XET_NGHIEM"].HUY_DUYET_KET_QUA_HH]) && (
            <Button
              type="default"
              height={30}
              onClick={onConfirmResult("cancel")}
            >
              {t("xetNghiem.huyDuyetKetQua")}
            </Button>
          )}
        </>
      )}
      {/* {state.selectedBtn.some((item) => TRANG_THAI["IN"].includes(item)) &&
        checkRole([ROLES["XET_NGHIEM"].IN_KET_QUA_HH]) && (
          <>
            <Button type="default" height={30} onClick={() => onPriviewPdf()}>
              {t("xetNghiem.inKetQua")}
            </Button>
          </>
        )} */}
      {state.selectedBtn.some(
        (item) =>
          TRANG_THAI["CO_KET_QUA"].includes(item) ||
          TRANG_THAI["DUYET_KET_QUA"].includes(item)
      ) && (
        <>
          <Button type="default" height={30} onClick={() => onViewFileKetQua()}>
            {t("xetNghiem.luuKetQuaPdf")}
          </Button>
        </>
      )}
    </>
  );

  return (
    <Main>
      <MainTable
        contentHeaderLeft={t("xetNghiem.danhSachDichVu")}
        contentHeaderRight={renderHeaderRight()}
      >
        <TableWrapper
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={state.dataTable}
          expandIconColumnIndex={3}
          className="custom-nestedtable"
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          rowClassName={(record) =>
            record.type === "soPhieu" ? "sophieu" : ""
          }
          expandable={{
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
        <ModalNotification ref={refNotification} />
      </MainTable>
    </Main>
  );
};

export default DanhSachDichVu;
