import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import ThongTinChiTiet from "./ThongTinChiTiet";
import DanhSachThuoc from "./DanhSachThuoc";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";

const LieuDungBacSy = ({
  listAllDuongDung,
  listAccount,
  listLieuDung,
  onSizeChange,
  updateData,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearchLieuDung,
  dataEditDefault,
  onSearchThuocByLieuDung,
  updateDataThuoc,
  getListAllDuongDung,
  onSearchTaiKhoan,
  ...props
}) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    editStatus: false,
    isSelected: false,
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const bacSiId = useSelector((state) => state.auth.auth);
  useEffect(() => {
    updateData({
      dataSearch: { bacSiId: bacSiId.nhanVienId, lieuDungBacSi: true },
    });
    onSizeChange({ size: 10 });
    getListAllDuongDung({ page: "", size: "" });
    onSearchTaiKhoan({ page: "0", size: "2000" });
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
    const indexNextItem =
      (listLieuDung?.findIndex((item) => item.id === dataEditDefault?.id) ||
        0) + index;
    if (-1 < indexNextItem && indexNextItem < listLieuDung.length) {
      updateData({ dataEditDefault: listLieuDung[indexNextItem] });
      onSearchThuocByLieuDung({
        dataSearch: {
          lieuDungId: listLieuDung[indexNextItem].id,
          lieuDungBacSi: true,
        },
      });
      setState({
        editStatus: true,
        isSelected: true,
      });
      form.setFieldsValue(listLieuDung[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + listLieuDung[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      isSelected: true,
    });
    updateData({
      dataEditDefault: {
        bacSiId: bacSiId.nhanVienId,
      },
    });
    updateDataThuoc({ listData: [] });
    form.resetFields();
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    onSearchThuocByLieuDung({
      dataSearch: { lieuDungId: data.id, lieuDungBacSi: true },
    });
    setState({
      editStatus: true,
      isSelected: true,
    });
    form.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const onClickSort = (key, value) => {
    onSortChange({
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
        onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const onChangePage = (page) => {
    onSearchLieuDung({ page: page - 1 });
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "70px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã liều dùng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã liều dùng"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Liều dùng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên liều dùng"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "250px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="SL sáng"
          sort_key="slSang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["slSang"] || 0}
          search={
            <Input
              placeholder="Tìm số lượng sáng"
              onChange={onSearchInput("slSang")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "slSang",
      key: "slSang",
    },
    {
      title: (
        <HeaderSearch
          title="SL chiều"
          sort_key="slChieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["slChieu"] || 0}
          search={
            <Input
              placeholder="Tìm số lựợng chiều"
              onChange={onSearchInput("slChieu")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "slChieu",
      key: "slChieu",
    },
    {
      title: (
        <HeaderSearch
          title="SL tối"
          sort_key="slToi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["slToi"] || 0}
          search={
            <Input
              placeholder="Tìm số lượng tối"
              onChange={onSearchInput("slToi")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "slToi",
      key: "slToi",
    },
    {
      title: (
        <HeaderSearch
          title="SL đêm"
          sort_key="slDem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["slDem"] || 0}
          search={
            <Input
              placeholder="Tìm số lượng đêm"
              onChange={onSearchInput("slDem")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "slDem",
      key: "slDem",
    },
    {
      title: (
        <HeaderSearch
          title="Thời điểm dùng"
          sort_key="thoiDiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiDiem"] || 0}
          search={
            <Input
              placeholder="Tìm thời điểm dùng"
              onChange={onSearchInput("thoiDiem")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "thoiDiem",
      key: "thoiDiem",
    },
    {
      title: (
        <HeaderSearch
          title="Đường dùng"
          sort_key="duongDung.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["duongDung.ten"] || 0}
          searchSelect={
            <Select
              defaultValue={null}
              data={[{ id: null, ten: "Tất cả" }, ...(listAllDuongDung || [])]}
              placeholder="Chọn đường dùng"
              onChange={onSearchInput("duongDungId")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "duongDung",
      key: "duongDung",
      render: (record) => record?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn in nhanh"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const listPanel = [
    {
      title: "Thông tin chi tiết",
      key: 1,
      render: () => {
        return (
          <ThongTinChiTiet
            layerId={refLayerHotKey.current}
            stateParent={state}
            setStateParent={setState}
          />
        );
      },
    },
    {
      key: 6,
      title: "Danh sách thuốc",
      render: () => {
        return (
          <DanhSachThuoc
            stateParent={state}
            setStateParent={setState}
            roleSave={[ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM]}
            roleEdit={[ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA]}
            editStatus={
              state.editStatus
                ? !checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_SUA])
                : !checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM])
            }
            currentItemRowParent={dataEditDefault}
          />
        );
      },
    },
  ];
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
            title="DANH MỤC LIỀU DÙNG - BÁC SĨ"
            scroll={{ x: 1200 }}
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
              checkRole([ROLES["DANH_MUC"].LIEU_DUNG_BS_THEM])
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
            dataSource={listLieuDung}
            onRow={onRow}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listLieuDung}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
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
          >
            <MultiLevelTab
              defaultActiveKey={1}
              listPanel={listPanel}
              isBoxTabs={true}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  lieuDung: {
    listLieuDung,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  duongDung: { listAllDuongDung },
  adminTaiKhoanHeThong: { listAccount },
}) => {
  return {
    listLieuDung,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listAccount,
    listAllDuongDung,
  };
};
const mapDispatchToProps = ({
  lieuDung: {
    onSearch: onSearchLieuDung,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  lieuDungThuoc: {
    onSearch: onSearchThuocByLieuDung,
    updateData: updateDataThuoc,
  },
  duongDung: { getListAllDuongDung },
  adminTaiKhoanHeThong: { onSearch: onSearchTaiKhoan },
}) => ({
  onSearchLieuDung,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  onSearchThuocByLieuDung,
  updateDataThuoc,
  getListAllDuongDung,
  onSearchTaiKhoan,
});
export default connect(mapStateToProps, mapDispatchToProps)(LieuDungBacSy);
