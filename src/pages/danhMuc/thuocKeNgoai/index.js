import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
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
import ThongTinDichVu from "./ThongTinDichVu";
import LieuDung from "./LieuDung";
import IcCreate from "assets/images/kho/IcCreate.png";

const ThuocKeNgoai = ({
  listAllDonViTinh,
  listAllXuatXu,
  listThuocKeNgoai,
  onSizeChange,
  updateData,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  dataEditDefault,
  onSearchLieuDungByThuocId,
  getListAllDonViTinh,
  getListAllXuatXu,
  updateDataThuocKeNgoaiLieuDung,
  ...props
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    isSelected: false,
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onSizeChange({ size: 10 });
    getListAllDonViTinh({ page: "", size: "" });
    getListAllXuatXu({});
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      isSelected: true,
    });
    updateData({ dataEditDefault: {} });
    updateDataThuocKeNgoaiLieuDung({ listData: [] });
    form.resetFields();
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    onSearchLieuDungByThuocId({ dataSearch: { thuocChiDinhNgoaiId: data.id } });
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
      createdAt: 2,
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
    onSearch({ page: page - 1 });
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
          title="Mã thuốc"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input placeholder="Tìm mã thuốc" onChange={onSearchInput("ma")} />
          }
        />
      ),
      width: "200px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên thuốc"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên thuốc"
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
          title="Hoạt chất"
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenHoatChat"] || 0}
          search={
            <Input
              placeholder="Tìm hoạt chất"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="donViTinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["donViTinh.ten"] || 0}
          search={
            <Select
              className="test"
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listAllDonViTinh || [])]}
              placeholder="Chọn đơn vị tính"
              onChange={onSearchInput("donViTinhId")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "donViTinh",
      key: "donViTinh",
      render: (record) => record?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["hamLuong"] || 0}
          search={
            <Input
              placeholder="Tìm hàm lượng"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          title="Quy cách"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyCach"] || 0}
          search={
            <Input
              placeholder="Tìm quy cách"
              onChange={onSearchInput("quyCach")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title="Nước sản xuất"
          sort_key="xuatXu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu"] || 0}
          searchSelect={
            <Select
              defaultValue={null}
              data={[{ id: null, ten: "Tất cả" }, ...(listAllXuatXu || [])]}
              placeholder="Chọn nước sản xuất"
              onChange={onSearchInput("xuatXu")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "xuatXu",
      key: "xuatXu",
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

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    form.validateFields();
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return <ThongTinDichVu stateParent={state} setStateParent={setState} />;
      },
    },
    {
      key: 6,
      title: "LIỀU DÙNG",
      render: () => {
        return <LieuDung stateParent={state} setStateParent={setState} />;
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
            title="Danh mục thuốc kê ngoài"
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
              checkRole([ROLES["DANH_MUC"].THUOC_KE_NGOAI_THEM])
                ? [
                    {
                      title: "Thêm mới",
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
            dataSource={listThuocKeNgoai}
            onRow={onRow}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listThuocKeNgoai}
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
  thuocKeNgoai: {
    listThuocKeNgoai,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  donViTinh: { listAllDonViTinh },
  xuatXu: { listAllXuatXu },
}) => {
  return {
    listThuocKeNgoai,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listAllDonViTinh,
    listAllXuatXu,
  };
};
const mapDispatchToProps = ({
  thuocKeNgoai: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  thuocKeNgoaiLieuDung: {
    onSearch: onSearchLieuDungByThuocId,
    updateData: updateDataThuocKeNgoaiLieuDung,
  },
  donViTinh: { getListAllDonViTinh },
  xuatXu: { getListAllXuatXu },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  onSearchLieuDungByThuocId,
  getListAllDonViTinh,
  getListAllXuatXu,
  updateDataThuocKeNgoaiLieuDung,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThuocKeNgoai);
