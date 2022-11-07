import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { formatNumberInput, openInNewTab, formatNumber } from "utils";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
} from "components";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
  ENUM,
} from "constants/index";
import { Checkbox, Col, Input, Form, InputNumber } from "antd";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import ThongTinDichVu from "./components/ThongTinDichVu";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
import { useEnum } from "hook";
import { useTranslation } from "react-i18next";

const HoaChat = (props) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();

  const {
    danhMucHoaChat: { 
      onSearch,
      createOrEdit,
      updateData,
      onChangeInputSearch,
      onSortChange,
      onSizeChange,
    },
    donViTinh: { getListAllDonViTinh },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    nhomDichVuCap2: { getAllTongHopDichVuCap2 },
    nhomDichVuCap3: { getAllTongHopDichVuCap3 },
    nhomVatTu: { getListSuppliesGroupTongHop },
    utils: { getUtils },
    doiTac: { getListAllNhaSanXuat, getListAllNhaCungCap },
    xuatXu: { getListAllXuatXu },
  } = useDispatch();
  const {
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSortColumn,
    currentItem,
  } = useSelector((state) => state.danhMucHoaChat);
  const [listnhomChiPhiBh] = useEnum(ENUM.NHOM_CHI_PHI);
  const [listnguonKhacChiTra] = useEnum(ENUM.NGUON_KHAC_CHI_TRA);
  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  const [editStatus, setEditStatus] = useState(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    // const sort = combineSort(dataSortColumn);
    const params = {
      page,
      size,
      sort: dataSortColumn,
      ...dataSearch,
      loaiDichVu: 110,
    };
    onSearch(params);
    getListSuppliesGroupTongHop({
      page: 0,
      size: 9999,
      active: true,
      loaiDichVu: 110,
    });
    getListAllDonViTinh({ page: "", size: "", active: true });
    getAllTongHopDichVuCap1({});
    getAllTongHopDichVuCap2({});
    getAllTongHopDichVuCap3({});
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
      loaiDichVu: 110,
    });
    getListAllNhaCungCap({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [20],
      loaiDichVu: 110,
    });
    getUtils({ name: "nhomChiPhiBh" });
    getUtils({ name: "nguonKhacChiTra" });
    getListAllXuatXu({ size: 1000, active: true });
  }, []);

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e.target.nodeName != "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e.target.nodeName != "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      updateData({ currentItem: {} });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listData?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      onShowAndHandleUpdate(listData[indexNextItem]);
      setState({ currentItem: listData[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    onSortChange(
      {
        [key]: value,
      },
      110
    );
  };

  const getNhomChiPhi = (item) => {
    let res = listnhomChiPhiBh.filter((el) => el.id === item);
    return (res.length && res[0]) || {};
  };
  // const onSearchInput = (key) => (e) => {
  //   let value = "";
  //   if (e?.target) {
  //     if (e.target.hasOwnProperty("checked")) value = e.target.checked;
  //     else value = e.target.value;
  //   } else value = e;
  //   onChangeInputSearch(
  //     {
  //       [key]: value,
  //     },
  //     110
  //   );
  // };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        onChangeInputSearch(
          {
            [key]: value,
          },
          110
        );
      },
      500,
      key,
      e?.target
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hóa chất"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã hóa chất"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên hóa chất"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên hóa chất"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm hóa chất"
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhóm hóa chất"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nước sản xuất"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nước sản xuất"
              onChange={onSearchInput("tenXuatXu")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà sản xuất"
          sort_key="nhaSanXuat.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaSanXuat.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhà sản xuất"
              onChange={onSearchInput("nuocSanXuat.ten")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuat",
      key: "nhaSanXuat",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="nhaCungCap.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaCungCap.ten"] || 0}
          search={
            <InputNumber
              placeholder="Tìm nhà cung cấp"
              onChange={onSearchInput("nhaCungCap.ten")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quy cách"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="Tìm quy cách"
              onChange={onSearchInput("quyCach")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <InputNumber
              placeholder="Tìm giá nhập"
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Giá trần"
          sort_key="giaTran"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaTran || 0}
          search={
            <InputNumber
              placeholder="Tìm giá trần"
              onChange={onSearchInput("giaTran")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giaTran",
      align: "right",
      key: "giaTran",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Trần bảo hiểm"
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm trần bảo hiểm"
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm chi phí"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...listnhomChiPhiBh]}
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
              placeholder="Chọn nhóm chi phí"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return getNhomChiPhi(item?.nhomChiPhiBh).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉ lệ BH thanh toán"
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeBhTt"] || 0}
          search={
            <Input
              placeholder="Tìm tỉ lệ BH thanh toán"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỷ lệ thanh toán DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeTtDv"] || 0}
          search={
            <Input
              placeholder="Tìm tỷ lệ thanh toán DV"
              onChange={onSearchInput("dichVu.tyLeTtDv")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeTtDv;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 1"
          sort_key="dichVu.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap1.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhóm dv cấp 1"
              onChange={onSearchInput("tenNhomDichVuCap1")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 2"
          sort_key="dichVu.nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap2.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhóm dv cấp 2"
              onChange={onSearchInput("tenNhomDichVuCap2")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dv cấp 3"
          sort_key="dichVu.nhomDichVuCap3.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap3.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhóm dv cấp 3"
              onChange={onSearchInput("tenNhomDichVuCap3")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã tương đương"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm mã tương đương"
              onChange={onSearchInput("maTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên tương đương"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm tên tương đương"
              onChange={onSearchInput("tenTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.tenTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.mucDichSuDung")}
          sort_key="dsMucDichSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dsMucDichSuDung"] || 0}
          // searchSelect={
          //   <Select
          //     data={[{ id: "", ten: t("common.tatCa") }, ...listDsMucDichSuDung]}
          //     placeholder="Chọn mục đích sử dụng"
          //     onChange={onSearchInput("dsMucDichSuDung")}
          //   />
        // }
        />
      ),
      width: "150px",
      dataIndex: "dsMucDichSuDung",
      key: "dsMucDichSuDung",
      render: (item) => {
        let arr = [];
        if (item?.length && listDsMucDichSuDung) {
          item.forEach(mucDichSuDungItem => {
            const tenMucDIchSuDung = listDsMucDichSuDung.find(item => item.id === mucDichSuDungItem)
            if (tenMucDIchSuDung) arr.push(tenMucDIchSuDung.ten)
          })
        }
        return arr.join(", ")
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn chi trả khác"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Chọn nguồn chi trả khác"
              onChange={onSearchInput("dichVu.dsNguonKhacChiTra")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        if ((listnguonKhacChiTra || [])?.length) {
          let list =
            (item?.dsNguonKhacChiTra || [])
              ?.map((el, index) => {
                let x = (listnguonKhacChiTra || []).find((dv) => dv.id === el);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Chọn không tính tiền"
              defaultValue=""
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          title="Không tính tiền"
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item?.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onChangePage = (page) => {
    onSearch({ page: page - 1, loaiDichVu: 110 });
  };

  const onHandleSizeChange = (size) => {
    onSizeChange({ size: size, loaiDichVu: 110 });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
        setState({ currentItem: record });
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    updateData({
      currentItem: {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;
 
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const refAutoFocus = useRef(null);
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEditDefault]);
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <ThongTinDichVu
            updateData={updateData}
            currentItem={currentItem}
          />
        );
      },
    },
    {
      title: "Nhóm chi phí",
      key: 2,
      render: () => <NhomChiPhi dichVuId={currentItem?.id} />,
    },
  ]
  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh mục hóa chất"
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].HOA_CHAT_THEM])
                ? [
                    {
                      title: "Thêm mới [F1]",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: `btn-change-full-table ${
                        state?.showFullTable ? "small" : "large"
                      }`,
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: `btn-change-full-table ${
                        state?.showFullTable ? "small" : "large"
                      }`,
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements > 0 && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listData}
              total={totalElements}
              onShowSizeChange={onHandleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          )}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
           <MultiLevelTab
              listPanel={listPanel}
              isBoxTabs={true}
              activeKey={state.activeKeyTab}
              onChange={(activeKeyTab) => setState({ activeKeyTab })}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default HoaChat;
