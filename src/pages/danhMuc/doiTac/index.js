import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import ThongTinDoiTac from "./components/ThongTinDoiTac";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";
import { checkData } from "utils";
import { Main } from "./styled";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ROLES,
} from "constants/index";

import { SORT_DEFAULT } from "./configs";
import { Checkbox, Col, Input } from "antd";
import { checkRole } from "utils/role-utils";
import stringUtils from "mainam-react-native-string-utils";

const GoiDichVu = (props) => {
  const { listloaiDoiTac, totalElements, currentItem, getUtils } = props;
  const [collapseStatus, setCollapseStatus] = useState(false);
  const formServiceRef = useRef();

  const [state, _setState] = useState({
    showFullTable: false,
  });
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnSave = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props.onSearch({ page: 0, size: 10, dataSortColumn: { active: 2 } });
    getUtils({ page: PAGE_DEFAULT, size: 1000, name: "loaiDoiTac" });
  }, []);

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
          title="Mã đối tác"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã đối tác"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên đối tác"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên đối tác"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã số thuế"
          sort_key="maSoThue"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["maSoThue"] || 0}
          search={
            <Input
              placeholder="Tìm mã số thuế"
              onChange={onSearchInput("maSoThue")}
            />
          }
        />
      ),
      width: "140px",
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: (
        <HeaderSearch
          sort_key="soTaiKhoan"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soTaiKhoan || 0}
          search={
            <Input
              placeholder="Tìm số tài khoản"
              onChange={onSearchInput("soTaiKhoan")}
            />
          }
          title="Số tài khoản"
        />
      ),
      width: "150px",
      dataIndex: "soTaiKhoan",
      key: "soTaiKhoan",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          sort_key="diaChi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["diaChi"] || 0}
          search={
            <Input
              placeholder="Tìm địa chỉ"
              onChange={onSearchInput("diaChi")}
            />
          }
          title="Địa chỉ"
        />
      ),
      width: "100px",
      dataIndex: "diaChi",
      key: "diaChi",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          sort_key="loaiDoiTac"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiDoiTac"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listloaiDoiTac]}
              placeholder="Chọn loại đối tác"
              onChange={onSearchInput("loaiDoiTac")}
              value={props.dataSearch["loaiDoiTac"] || ""}
            />
          }
          title="Loại đối tác"
        />
      ),
      width: "150px",
      dataIndex: "loaiDoiTac",
      key: "loaiDoiTac",
      align: "center",
      render: (item) => {
        return checkData(item, listloaiDoiTac).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm người đại diện"
              onChange={onSearchInput("nguoiDaiDien")}
            />
          }
          title="Người đại diện"
        />
      ),
      width: "150px",
      dataIndex: "nguoiDaiDien",
      key: "nguoiDaiDien",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="chucVuNguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chucVuNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm chức vụ người đại diện"
              onChange={onSearchInput("chucVuNguoiDaiDien")}
            />
          }
          title="Chức vụ người đại diện"
        />
      ),
      width: "150px",
      dataIndex: "chucVuNguoiDaiDien",
      key: "chucVuNguoiDaiDien",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["sdtNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người đại diện"
              onChange={onSearchInput("sdtNguoiDaiDien")}
            />
          }
          title="SĐT người đại diện"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiDaiDien",
      key: "sdtNguoiDaiDien",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm người đầu mối"
              onChange={onSearchInput("nguoiDauMoi")}
            />
          }
          title="Người đầu mối"
        />
      ),
      width: "150px",
      dataIndex: "nguoiDauMoi",
      key: "nguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["sdtNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người đầu mối"
              onChange={onSearchInput("sdtNguoiDauMoi")}
            />
          }
          title="SĐT người đầu mối"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiDauMoi",
      key: "sdtNguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="emailNguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["emailNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm email người đầu mối"
              onChange={onSearchInput("emailNguoiDauMoi")}
            />
          }
          title="Email người đầu mối"
        />
      ),
      width: "150px",
      dataIndex: "emailNguoiDauMoi",
      key: "emailNguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="tenNganHang"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["tenNganHang"] || 0}
          search={
            <Input
              placeholder="Tìm tên ngân hàng"
              onChange={onSearchInput("tenNganHang")}
            />
          }
          title="Tên ngân hàng"
        />
      ),
      width: "150px",
      dataIndex: "tenNganHang",
      key: "tenNganHang",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="chuTaiKhoan"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chuTaiKhoan"] || 0}
          search={
            <Input
              placeholder="Tìm chủ tài khoản ngân hàng"
              onChange={onSearchInput("chuTaiKhoan")}
            />
          }
          title="Chủ tài khoản ngân hàng"
        />
      ),
      width: "150px",
      dataIndex: "chuTaiKhoan",
      key: "chuTaiKhoan",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiChiCongTac"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="Tìm người chi cộng tác"
              onChange={onSearchInput("nguoiChiCongTac")}
            />
          }
          title="Người chi cộng tác"
        />
      ),
      width: "150px",
      dataIndex: "nguoiChiCongTac",
      key: "nguoiChiCongTac",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiChiCongTac"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["sdtNguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người chi cộng tác"
              onChange={onSearchInput("sdtNguoiChiCongTac")}
            />
          }
          title="SĐT người chi cộng tác"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiChiCongTac",
      key: "sdtNguoiChiCongTac",
      align: "left",
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
      title: "Thông tin chi tiết",
      key: 1,
      render: () => {
        return (
          <ThongTinDoiTac
            listPartnerType={listloaiDoiTac}
            currentItem={currentItem}
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
        setState({
          dataEdit: record,
        });
      },
    };
  };

  const handleClickedBtnAdded = () => {
    props.updateData({
      currentItem: null,
    });
  };

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
    let idDiff = state.dataEdit?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
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
            title="Danh mục đối tác"
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
              checkRole([ROLES["DANH_MUC"].DOI_TAC_THEM])
                ? [
                    {
                      type: "create",
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
            dataSource={props.listData}
            onRow={onRow}
            // rowClassName={setRowClassName}
            layerId={refLayerHotKey.current}
            dataEditDefault={state.dataEdit}
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
          >
            <ThongTinDoiTac
              listPartnerType={listloaiDoiTac}
              currentItem={currentItem}
              refCallbackSave={refClickBtnSave}
            />
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    doiTac: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    utils: { listloaiDoiTac = [] },
  } = state;

  return {
    listData,
    listloaiDoiTac,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
  };
};
const mapDispatchToProps = ({
  doiTac: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoiDichVu);
