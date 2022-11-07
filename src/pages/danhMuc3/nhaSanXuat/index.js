import { Checkbox, Col, DatePicker, Form, Input, InputNumber } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "components/Pagination";
import moment from "moment";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import MultiLevelTab from "components/MultiLevelTab";
import { checkRole } from "utils/role-utils";
import { combineSort } from "utils";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
} from "constants/index";
import ThongTinChiTiet from "./thongTinChiTiet";
import LichSuThayDoiThongTin from "./lichSuThayDoiThongTin";

let timer = null;

const Index = (props) => {
  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({});
  const {
    nhaSanXuat: { getListNhaSanXuat, createOrEdit, updateData },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    utils: { getUtils },
  } = useDispatch();
  const {
    nhaSanXuat: {
      listNhaSanXuat,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    utils: { listloaiDoiTac = [], listloaiDichVu = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
  } = useSelector((state) => state);
  const [state, _setState] = useState({
    editStatus: false,
    showFullTable: false,
    activeKeyTab: "1",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSave1 = useRef();
  const refSave2 = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const refSelectRow = useRef();

  useEffect(() => {
    getListNhaSanXuat({ page: 0 });
    getUtils({ name: "loaiDoiTac" });
    getUtils({ name: "loaiDichVu" });
    getAllTongHopDichVuCap1({ page: 0, size: 9999 });
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
  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "6" && refSave2.current) refSave2.current(e);
  };
  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      isSelected: true,
    });
    form.resetFields();
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListNhaSanXuat({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListNhaSanXuat({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 500);
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
          title="Mã đối tác"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm Mã đối tác"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên đối tác"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm Tên đối tác"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã số thuế"
          onClickSort={onClickSort}
          sort_key="maSoThue"
          dataSort={dataSortColumn.maSoThue || 0}
          search={
            <Input
              placeholder="Tìm mã số thuế"
              onChange={(e) => {
                onSearchInput(e.target.value, "maSoThue");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm DV"
          onClickSort={onClickSort}
          sort_key="dsNhomDichVuCap1Id"
          dataSort={dataSortColumn["dsNhomDichVuCap1Id"] || 0}
          searchSelect={
            <Select
              // mode="multiple"
              placeholder={"Tìm nhóm DV"}
              data={listAllNhomDichVuCap1}
              onChange={(e) => {
                onSearchInput(e, "NhomDichVuCap1Id");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dsNhomDichVuCap1Id",
      key: "dsNhomDichVuCap1Id",
      render: (item) =>
        (listAllNhomDichVuCap1 || [])
          .filter((val) => (item || []).some((id) => id === val.id))
          .map((item) => item.ten)
          .join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Loại đối tác"
          onClickSort={onClickSort}
          sort_key="dsLoaiDoiTac"
          dataSort={dataSortColumn["dsLoaiDoiTac"] || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "dsLoaiDoiTac");
              }}
              defaultValue=""
              placeholder={"Chọn loại đối tác"}
              data={[{ id: "", ten: "Tất cả" }, ...listloaiDoiTac]}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsLoaiDoiTac",
      key: "dsLoaiDoiTac",
      render: (item) =>
        (listloaiDoiTac || [])
          .filter((val) => item.some((doiTacId) => doiTacId === val.id))
          .map((item) => item.ten)
          .join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Loại dịch vụ"
          onClickSort={onClickSort}
          sort_key="dsLoaiDichVu"
          dataSort={dataSortColumn["dsLoaiDichVu"] || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "LoaiDichVu");
              }}
              defaultValue=""
              placeholder={"Chọn loại dịch vụ"}
              data={[{ id: "", ten: "Tất cả" }, ...listloaiDichVu]}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsLoaiDichVu",
      key: "dsLoaiDichVu",
      render: (item) =>
        (listloaiDichVu || [])
          .filter((val) => item?.some((doiTacId) => doiTacId === val.id))
          .map((item) => item.ten)
          .join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Số tài khoản"
          onClickSort={onClickSort}
          sort_key="soTaiKhoan"
          dataSort={dataSortColumn["soTaiKhoan"] || 0}
          search={
            <InputNumber
              placeholder="Tìm tài khoản"
              onChange={(e) => {
                onSearchInput(e.target.value, "soTaiKhoan");
              }}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soTaiKhoan",
      key: "soTaiKhoan",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm người đại diện"
              onChange={(e) => onSearchInput(e.target.value, "nguoiDaiDien")}
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
          dataSort={dataSortColumn["chucVuNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm chức vụ người đại diện"
              onChange={(e) =>
                onSearchInput(e.target.value, "chucVuNguoiDaiDien")
              }
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
          dataSort={dataSortColumn["sdtNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người đại diện"
              onChange={(e) => onSearchInput(e.target.value, "sdtNguoiDaiDien")}
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
          dataSort={dataSortColumn["nguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm người đầu mối"
              onChange={(e) => onSearchInput(e.target.value, "nguoiDauMoi")}
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
          dataSort={dataSortColumn["sdtNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người đầu mối"
              onChange={(e) => onSearchInput(e.target.value, "sdtNguoiDauMoi")}
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
          dataSort={dataSortColumn["emailNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="Tìm email người đầu mối"
              onChange={(e) =>
                onSearchInput(e.target.value, "emailNguoiDauMoi")
              }
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
          dataSort={dataSortColumn["tenNganHang"] || 0}
          search={
            <Input
              placeholder="Tìm tên ngân hàng"
              onChange={(e) => onSearchInput(e.target.value, "tenNganHang")}
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
          dataSort={dataSortColumn["chuTaiKhoan"] || 0}
          search={
            <Input
              placeholder="Tìm chủ tài khoản ngân hàng"
              onChange={(e) => onSearchInput(e.target.value, "chuTaiKhoan")}
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
          dataSort={dataSortColumn["nguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="Tìm người chi cộng tác"
              onChange={(e) => onSearchInput(e.target.value, "nguoiChiCongTac")}
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
          dataSort={dataSortColumn["sdtNguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="Tìm SĐT người chi cộng tác"
              onChange={(e) =>
                onSearchInput(e.target.value, "sdtNguoiChiCongTac")
              }
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
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tuNgay"] || 0}
          search={
            <DatePicker
              style={{ width: "100%", height: "30px", border: "none" }}
              placeholder="chọn thời gian"
              onChange={(e) =>
                onSearchInput(moment(e).format("DD/MM/YYYY"), "tuNgay")
              }
            ></DatePicker>
          }
          title="Áp dụng từ ngày"
        />
      ),
      width: "150px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      align: "left",
      render: (item) => (item ? moment(item).format("DD/MM/YYYY") : ""),
    },
    {
      title: (
        <HeaderSearch
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["denNgay"] || 0}
          search={
            <DatePicker
              style={{ width: "100%", height: "30px", border: "none" }}
              placeholder="chọn thời gian"
              onChange={(e) =>
                onSearchInput(moment(e).format("DD/MM/YYYY"), "denNgay")
              }
            ></DatePicker>
          }
          title="Áp dụng đến ngày"
        />
      ),
      width: "150px",
      dataIndex: "denNgay",
      key: "denNgay",
      align: "left",
      render: (item) => (item ? moment(item).format("DD/MM/YYYY") : ""),
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          onClickSort={onClickSort}
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || 0}
          search={
            <Input
              placeholder="Tìm địa chỉ"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaChi");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "diaChi",
      key: "diaChi",
    },

    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
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
      render: (item, a) => {
        return <Checkbox checked={item} />;
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
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          tuNgay:
            values.tuNgay instanceof moment
              ? values.tuNgay.format("YYYY-MM-DD")
              : values.tuNgay,
          denNgay:
            values.denNgay instanceof moment
              ? values.denNgay.format("YYYY-MM-DD")
              : values.denNgay,
          dsNhomDichVuCap1: listAllNhomDichVuCap1.filter((item) =>
            (values.dsNhomDichVuCap1Id || []).some(
              (dichVu) => dichVu === item.id
            )
          ),
        };
        if (state.editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
          };
          if (state.editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListNhaSanXuat(params);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  refSave1.current = handleAdded;
  const onShowAndHandleUpdate = (data = {}) => {
    setState({
      editStatus: true,
    });
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
  };
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate({
          ...record,
          denNgay: record.denNgay ? moment(record.denNgay) : null,
          tuNgay: record.tuNgay ? moment(record.tuNgay) : null,
        });
      },
    };
  };
  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListNhaSanXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };
  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListNhaSanXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };
  const listPanel = [
    {
      title: "Thông tin chi tiết",
      key: 1,
      render: () => {
        return (
          <ThongTinChiTiet
            editStatus={state.editStatus}
            handleCancel={handleCancel}
            listloaiDoiTac={listloaiDoiTac}
            listloaiDichVu={listloaiDichVu}
            listAllNhomDichVuCap1={listAllNhomDichVuCap1}
            handleAdded={handleAdded}
            dataEditDefault={dataEditDefault}
            form={form}
          ></ThongTinChiTiet>
        );
      },
    },
    {
      title: "LỊCH SỬ THAY ĐỔI THÔNG TIN",
      key: 2,
      render: () => {
        return <LichSuThayDoiThongTin />;
      },
    },
  ];

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
            title="DANH MỤC ĐỐI TÁC"
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
              checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM])
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
            dataSource={listNhaSanXuat}
            onRow={onRow}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listNhaSanXuat}
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
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
              activeKey={state.activeKeyTab}
              onChange={(activeKeyTab) => setState({ activeKeyTab })}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};
export default Index;
