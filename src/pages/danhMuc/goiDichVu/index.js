import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import BaseDm3 from "../BaseDm3";
import TableWrapper from "components/TableWrapper";
import FormServiceInfo from "./components/FormServiceInfo";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import DichVuTrongGoi from "./components/DichVuTrongGoi";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  HAN_CHE_KHOA,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
  ROLES,
} from "constants/index";
import { SORT_DEFAULT } from "./configs";
import { Checkbox, Col, Input } from "antd";
import { checkRole } from "utils/role-utils";
import stringUtils from "mainam-react-native-string-utils";
const GoiDichVu = (props) => {
  const refTab = useRef();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const refClickBtnSave = useRef();
  const refSave1 = useRef();
  const refSave2 = useRef();
  const refSave3 = useRef();

  const {
    listloaiDichVu,
    listdoiTuongSuDung,
    listAccount,
    totalElements,
    currentItem,
    listAllNhanVien,
    getListAllNhanVien,
    getListAllLieuDung,
  } = props;
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const [state, _setState] = useState({
    listAllChuyenKhoa: [],
    listAllDonViTinh: [],
    listAllNhomDichVuCap1: [],
    listAllNhomDichVuCap2: [],
    listAllNhomDichVuCap3: [],
    listloaiDichVu: [],
    listdoiTuongSuDung: [],
    listAccount: [],
    listAllNhanVien: [],
    showFullTable: false,
    activeKeyTab: "1",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [collapseStatus, setCollapseStatus] = useState(false);
  const formServiceRef = useRef();
  useEffect(() => {
    props.onSizeChange({ size: 10, dataSortColumn: props.dataSortColumn });
    props.getUtils({ name: "loaiDichVu" });
    props.getUtils({ name: "doiTuongSuDung" });
    props.getListAccount({ page: 0 });
    props.getListAllNhanVien({ active: true });
    getListAllLieuDung();
  }, []);

  useEffect(
    () => {
      setState({
        listloaiDichVu: [{ id: "", ten: "Tất cả" }, ...listloaiDichVu],
        listdoiTuongSuDung: [{ id: "", ten: "Tất cả" }, ...listdoiTuongSuDung],
        listAccount: [{ id: "", ten: "Tất cả" }, ...listAccount],
        // listAllNhanVien: [{ id: "", ten: "Tất cả" }, ...listAllNhanVien],
      });
    },
    [listloaiDichVu],
    [listdoiTuongSuDung],
    [listAccount],
    [listAllNhanVien]
  );

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
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  refSelectRow.current = (index) => {
    const { listData } = props;
    const indexNextItem =
      (listData?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      props.updateData({
        currentItem: listData[indexNextItem],
      });
      setState({ currentItem: listData[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "2" && refSave2.current) refSave2.current(e);
    if (activeKeyTab === "3" && refSave3.current) refSave3.current(e);
  };

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

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
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  useEffect(() => {
    if (
      !currentItem?.hanCheKhoaChiDinh &&
      state.activeKeyTab === "khoaChiDinh"
    ) {
      setState({ activeKeyTab: "1" });
    }
  }, [currentItem]);

  const customNhanVien = useMemo(
    () =>
      listAllNhanVien?.map((item) => ({
        ...item,
        ten: `${item.ma} - ${item.ten}`,
      })),
    [listAllNhanVien]
  );

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã bộ chỉ định"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã bộ chỉ định"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên bộ chỉ định"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên bộ chỉ định"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "ten",
      key: "ten",
      render: (item) => {
        return item || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại dịch vụ"
          sort_key="dsLoaiDichVu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dsLoaiDichVu"] || 0}
          searchSelect={
            <Select
              mode={"multiple"}
              data={state.listloaiDichVu}
              placeholder="Chọn loại dịch vụ"
              onChange={onSearchInput("dsLoaiDichVu")}
            />
          }
        />
      ),
      width: "140px",
      dataIndex: "dsLoaiDichVu",
      key: "dsLoaiDichVu",
      render: (item = []) => {
        if (listloaiDichVu?.length) {
          let list =
            item
              ?.map((loaiDv, index) => {
                let x = listloaiDichVu.find((dv) => dv.id === loaiDv);
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
          title="Trường hợp kê DV"
          sort_key="dsDoiTuongSuDung"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dsDoiTuongSuDung"] || 0}
          searchSelect={
            <Select
              mode={"multiple"}
              data={state.listdoiTuongSuDung}
              placeholder="Chọn trường hợp kê DV"
              onChange={onSearchInput("dsDoiTuongSuDung")}
            />
          }
        />
      ),
      width: "140px",
      dataIndex: "dsDoiTuongSuDung",
      key: "dsDoiTuongSuDung",
      render: (item = []) => {
        if (listdoiTuongSuDung?.length) {
          let list =
            item
              ?.map((dtSuDung, index) => {
                let x = listdoiTuongSuDung.find((dt) => dt.id === dtSuDung);
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
          title="Tài khoản chỉ định bộ"
          sort_key="dsBacSiChiDinhId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dsBacSiChiDinhId"] || 0}
          searchSelect={
            <Select
              mode={"multiple"}
              data={customNhanVien}
              placeholder="Chọn tài khoản chỉ định bộ"
              onChange={onSearchInput("dsBacSiChiDinhId")}
            />
          }
        />
      ),
      width: "140px",
      dataIndex: "dsBacSiChiDinh",
      key: "dsBacSiChiDinh",
      render: (item) => {
        return (
          item &&
          item.length > 0 &&
          item.map((item) => `${item.ma || ""} - ${item.ten || ""}`).join(", ")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="hanCheKhoaChiDinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["hanCheKhoaChiDinh"] || 0}
          searchSelect={
            <Select
              data={HAN_CHE_KHOA}
              placeholder="Chọn hạn chế khoa chỉ định"
              onChange={onSearchInput("hanCheKhoaChiDinh")}
              value={props.dataSearch["hanCheKhoaChiDinh"] || ""}
            />
          }
          title="Hc khoa chỉ định"
        />
      ),
      width: "100px",
      dataIndex: "hanCheKhoaChiDinh",
      key: "hanCheKhoaChiDinh",
      align: "center",
      render: (item) => {
        return <Checkbox checked={!!item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Chọn tính tiền"
              onChange={onSearchInput("dichVu.khongTinhTien")}
              value={props.dataSearch["dichVu.khongTinhTien"] || ""}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: "100px",
      dataIndex: "dichVu",
      key: "dichVu",
      align: "center",
      render: (item) => {
        return item && <Checkbox checked={!!item.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="covid"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.covid || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("covid")}
              defaultValue=""
            />
          }
          title="Covid"
        />
      ),
      width: 120,
      dataIndex: "covid",
      key: "covid",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="thuocChiDinhNgoai"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.thuocChiDinhNgoai || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("thuocChiDinhNgoai")}
              defaultValue=""
            />
          }
          title="Bộ thuốc kê ngoài"
        />
      ),
      width: 120,
      dataIndex: "thuocChiDinhNgoai",
      key: "thuocChiDinhNgoai",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
              value={props.dataSearch["active"] || ""}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "100px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const listPanel = [
    {
      title: "Thông tin bộ chỉ định",
      key: 1,
      render: () => {
        return (
          <FormServiceInfo
            refCallbackSave={refSave1}
            currentItem={currentItem}
            refTab={refTab}
          />
        );
      },
    },
    {
      key: 2,
      title: "Dịch vụ trong bộ",
      render: () => {
        return (
          <DichVuTrongGoi
            refCallbackSave={refSave2}
            dsLoaiDichVu={currentItem?.dsLoaiDichVu}
            boChiDinhId={currentItem?.id}
            isThuocChiDinhNgoai={currentItem?.thuocChiDinhNgoai}
          />
        );
      },
    },
    {
      // key: 3,
      title: "Khoa chỉ định dịch vụ",
      key: "khoaChiDinh",
      render: () => {
        return (
          <KhoaChiDinh
            layerId={refLayerHotKey.current}
            refCallbackSave={refSave3}
            boChiDinhId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].GOI_DICH_VU_THEM]}
            roleEdit={[ROLES["DANH_MUC"].GOI_DICH_VU_SUA]}
            editStatus={state.currentItem}
          />
        );
      },
    },
  ];

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    props.updateData({
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
    props.updateData({
      currentItem: {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    formServiceRef.current.resetFields();
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
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
  const setRowClassName = (record) => {
    let idDiff = state.currentItem?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  return (
    <BaseDm3
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục bộ chỉ định",
          link: "/danh-muc/bo-chi-dinh",
        },
      ]}
    >
      <Col
        {...(!state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
      >
        <TableWrapper
          layerId={refLayerHotKey.current}
          title="Danh mục bộ chỉ định"
          scroll={{ x: 1000 }}
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          buttonHeader={
            checkRole([ROLES["DANH_MUC"].GOI_DICH_VU_THEM])
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
                        component={collapseStatus ? extendTable : extendChiTiet}
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
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: handleCollapsePane,
                  },
                ]
          }
          columns={columns}
          dataSource={props.listData}
          onRow={onRow}
          rowClassName={setRowClassName}
        ></TableWrapper>
        {totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={props.page + 1}
            pageSize={props.size}
            total={totalElements}
            listData={props.listData}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
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
            ref={refTab}
            listPanel={listPanel}
            isBoxTabs={true}
            activeKey={state.activeKeyTab}
            onChange={(activeKeyTab) => setState({ activeKeyTab })}
          ></MultiLevelTab>
        </Col>
      )}
    </BaseDm3>
  );
};

const mapStateToProps = (state) => {
  const {
    goiDichVu: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    utils: { listloaiDichVu = [], listdoiTuongSuDung = [] },
    adminTaiKhoanHeThong: { listAccount = [] },
    nhanVien: { listAllNhanVien },
  } = state;

  return {
    listData,
    listloaiDichVu,
    listdoiTuongSuDung,
    listAccount,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    listAllNhanVien,
  };
};
const mapDispatchToProps = ({
  goiDichVu: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
  adminTaiKhoanHeThong: { onSearch: getListAccount },
  nhanVien: { getListAllNhanVien },
  lieuDung: { getListAllLieuDung },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  getListAccount,
  getListAllNhanVien,
  getListAllLieuDung,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoiDichVu);
