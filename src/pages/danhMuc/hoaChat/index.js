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
          title="M?? h??a ch???t"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? h??a ch???t"
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
          title="T??n h??a ch???t"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n h??a ch???t"
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
          title="Nh??m h??a ch???t"
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m h??a ch???t"
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
          title="N?????c s???n xu???t"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          search={
            <Input
              placeholder="T??m n?????c s???n xu???t"
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
          title="Nh?? s???n xu???t"
          sort_key="nhaSanXuat.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaSanXuat.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh?? s???n xu???t"
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
          title="Nh?? cung c???p"
          sort_key="nhaCungCap.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaCungCap.ten"] || 0}
          search={
            <InputNumber
              placeholder="T??m nh?? cung c???p"
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
          title="Quy c??ch"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="T??m quy c??ch"
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
          title="Gi?? nh???p"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <InputNumber
              placeholder="T??m gi?? nh???p"
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
          title="Gi?? tr???n"
          sort_key="giaTran"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaTran || 0}
          search={
            <InputNumber
              placeholder="T??m gi?? tr???n"
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
          title="Tr???n b???o hi???m"
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="T??m tr???n b???o hi???m"
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
          title="Nh??m chi ph??"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "T???t c???" }, ...listnhomChiPhiBh]}
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
              placeholder="Ch???n nh??m chi ph??"
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
          title="T??? l??? BH thanh to??n"
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeBhTt"] || 0}
          search={
            <Input
              placeholder="T??m t??? l??? BH thanh to??n"
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
          title="T??? l??? thanh to??n DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeTtDv"] || 0}
          search={
            <Input
              placeholder="T??m t??? l??? thanh to??n DV"
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
          title="Nh??m dv c???p 1"
          sort_key="dichVu.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap1.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 1"
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
          title="Nh??m dv c???p 2"
          sort_key="dichVu.nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap2.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 2"
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
          title="Nh??m dv c???p 3"
          sort_key="dichVu.nhomDichVuCap3.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap3.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 3"
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
          title="M?? t????ng ??????ng"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m m?? t????ng ??????ng"
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
          title="T??n t????ng ??????ng"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m t??n t????ng ??????ng"
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
          //     placeholder="Ch???n m???c ????ch s??? d???ng"
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
          title="Ngu???n chi tr??? kh??c"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Ch???n ngu???n chi tr??? kh??c"
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
              placeholder="Ch???n kh??ng t??nh ti???n"
              defaultValue=""
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          title="Kh??ng t??nh ti???n"
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
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="C?? hi???u l???c"
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
      title: "Th??ng tin d???ch v???",
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
      title: "Nh??m chi ph??",
      key: 2,
      render: () => <NhomChiPhi dichVuId={currentItem?.id} />,
    },
  ]
  return (
    <Main>
      <HomeWrapper title="Danh m???c">
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
            title="Danh m???c h??a ch???t"
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
                      title: "Th??m m???i [F1]",
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
