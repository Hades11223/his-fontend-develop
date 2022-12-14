import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { combineSort } from "utils";
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
} from "constants/index";
import { Checkbox, Col, Form, InputNumber, Modal } from "antd";
import { handleBlurInput, handleKeypressInput } from "utils";
import { openInNewTab } from "utils";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import stringUtils from "mainam-react-native-string-utils";

let timer = null;

const ThietLapChonKho = (props) => {
  const {
    listThietLapChonKho,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  } = useSelector((state) => state.thietLapChonKho);
  const { listAllKho } = useSelector((state) => state.kho);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const { listAllPhong } = useSelector((state) => state.phong);
  const { listChucVu } = useSelector((state) => state.chucVu);
  const { listAccount } = useSelector((state) => state.adminTaiKhoanHeThong);
  const { listloaiDichVuKho, listdoiTuong } = useSelector(
    (state) => state.utils
  );
  const { listAllLoaiDoiTuong, listLoaiDoiTuong } = useSelector(
    (state) => state.loaiDoiTuong
  );

  const {
    thietLapChonKho: {
      getListThietLapChonKho,
      createOrEdit,
      onDelete,
      updateData,
    },
    kho: { getAllTongHop: getAllKhoTongHop },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    loaiDoiTuong: { getListAllLoaiDoiTuong, getListLoaiDoiTuong },
    adminTaiKhoanHeThong: { onSearch: getListAccount },
    utils: { getUtils },
  } = useDispatch();

  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({
    active: 2,
    createdAt: 2,
  });
  const [data, setData] = useState([]);
  const [doiTuong, setDoiTuong] = useState();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();

  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListThietLapChonKho(params);
    getAllKhoTongHop({});
    getListAllKhoa();
    getListAllPhong({});
    getListAllLoaiDoiTuong({});
    getListLoaiDoiTuong({ active: "true" });
    getListAccount({ noSize: true });
    getUtils({ name: "loaiDichVuKho" });
    getUtils({ name: "doiTuong" });
  }, []);

  useEffect(() => {
    const data = listThietLapChonKho.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listThietLapChonKho, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListThietLapChonKho({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const YES_NO = [
    { id: null, ten: "T???t c???" },
    { id: true, ten: "C??" },
    { id: false, ten: "Kh??ng" },
  ];

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Kho"
          sort_key="khoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.kho || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listAllKho}
              onChange={(value) => {
                onSearchInput(value, "khoId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "kho",
      key: "kho",
      fixed: "left",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa ch??? ?????nh"
          sort_key="khoaChiDinhId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaChiDinhId || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "khoaChiDinhId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa NB"
          sort_key="khoaNbId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaNBId || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "khoaNbId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "khoaNb",
      key: "khoaNb",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i ?????i t?????ng"
          sort_key="loaiDoiTuongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.listAllLoaiDoiTuong || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={[{ id: "", ten: "T???t c???" }, ...(listAllLoaiDoiTuong || [])]}
              onChange={(value) => {
                onSearchInput(value, "loaiDoiTuongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="?????i t?????ng"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={[{ id: "", ten: "T???t c???" }, ...(listdoiTuong || [])]}
              onChange={(value) => {
                onSearchInput(value, "doiTuong");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        if (item && listdoiTuong) {
          const index = listdoiTuong.findIndex((e) => e.id === item);
          return listdoiTuong[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="N???i tr??"
              onChange={(value) => {
                onSearchInput(value, "noiTru");
              }}
            />
          }
          sort_key="noiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiTru || 0}
          title="N???i tr??"
        />
      ),
      width: 100,
      dataIndex: "noiTru",
      key: "noiTru",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="L?? c???p c???u"
              onChange={(value) => {
                onSearchInput(value, "capCuu");
              }}
            />
          }
          sort_key="capCuu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.capCuu || 0}
          title="L?? c???p c???u"
        />
      ),
      width: 130,
      dataIndex: "capCuu",
      key: "capCuu",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="C???n l??m s??ng"
              onChange={(value) => {
                onSearchInput(value, "canLamSang");
              }}
            />
          }
          sort_key="canLamSang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.canLamSang || 0}
          title="C???n l??m s??ng"
        />
      ),
      width: 150,
      dataIndex: "canLamSang",
      key: "canLamSang",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ph??ng"
          sort_key="phongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.phongId || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listAllPhong}
              onChange={(value) => {
                onSearchInput(value, "phongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "phong",
      key: "phong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ch???c v???"
          sort_key="chucVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.chucVuId || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listChucVu}
              onChange={(value) => {
                onSearchInput(value, "chucVuId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "chucVu",
      key: "chucVu",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??i kho???n"
          sort_key="nhanVienId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhanVienId || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
              data={listAccount}
              onChange={(value) => {
                onSearchInput(value, "nhanVienId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "nhanVien",
      key: "nhanVien",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="??u ti??n"
          sort_key="uuTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.uuTien || 0}
          search={
            <InputNumber
              placeholder="T??m ki???m"
              onChange={(value) => {
                onSearchInput(value, "uuTien");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "uuTien",
      key: "uuTien",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="C?? hi???u l???c"
        />
      ),
      width: 108,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    let nameSearch = "";
    if (name === "noiTru" || name === "canLamSang" || name === "capCuu") {
      nameSearch = `${name}TatCa`;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearch: {
          ...dataSearch,
          [name]: value,
          [nameSearch]: value === null ? true : null,
        },
      });
      getListThietLapChonKho({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        [nameSearch]: value === null ? true : null,
        sort: combineSort(dataSortColumn),
      });
    }, 300);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListThietLapChonKho({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListThietLapChonKho({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListThietLapChonKho(params);
        });
      })
      .catch((error) => {});
  };

  const onChangeField = (value, variables) => {
    if ("doiTuong" === variables) {
      if (value) {
        form.setFieldsValue({ loaiDoiTuongId: null });
      }
      setDoiTuong(value);
    }
    if (value == undefined) {
      form.setFieldsValue({ [variables]: null });
    }
  };

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "B???n c?? ch???c ch???n x??a b???n ghi n??y kh??ng?",
      onOk() {
        onDelete(item.id);
      },
      onCancel() {},
    });
  };

  const setFieldsValue = (data) => {
    setDoiTuong(data.doiTuong);
    form.setFieldsValue(data);
  };

  const resetFields = () => {
    setDoiTuong();
    form.resetFields();
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    setFieldsValue(data);
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        onShowAndHandleUpdate(record.action);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    resetFields();
    updateData({ dataEditDefault: {} });
  };

  const handleCancel = () => {
    if (editStatus) {
      setFieldsValue(dataEditDefault);
    } else {
      resetFields();
    }
  };

  const validator = (rule, value, callback) => {
    if (value) {
      if (Number(value) > 2147483647) {
        callback(new Error("Vui l??ng nh???p ??u ti??n nh??? h??n 2147483648!"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEditDefault]);
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
  return (
    <Main>
      <HomeWrapper title="Kho">
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
            title="Thi???t l???p kho ch??? ?????nh"
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
            buttonHeader={[
              {
                type: "create",
                title: "Th??m m???i",
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
                  <Icon component={state.showFullTable ? thuNho : showFull} />
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
            ]}
            columns={columns}
            dataSource={data}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              listData={data}
              total={totalElements}
              onShowSizeChange={onSizeChange}
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
            <CreatedWrapper
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u"
              layerId={refLayerHotKey.current}
            >
              <Form
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Kho"
                  name="khoId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n kho!",
                    },
                  ]}
                >
                  <Select
                    ref={refAutoFocus}
                    placeholder="T??m kho"
                    data={listAllKho}
                    autoFocus={true}
                  />
                </Form.Item>
                <Form.Item
                  label="Lo???i DV"
                  name="loaiDichVu"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n lo???i DV!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Vui l??ng ch???n lo???i DV"
                    data={listloaiDichVuKho}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/khoa")}
                    >
                      Khoa NB
                    </div>
                  }
                  name="khoaNbId"
                >
                  <Select
                    placeholder="Vui l??ng ch???n khoa NB"
                    data={[{ id: null, ten: "T???t c???" }, ...listAllKhoa]}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "khoaNbId")}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/khoa")}
                    >
                      Khoa ch??? ?????nh
                    </div>
                  }
                  name="khoaChiDinhId"
                >
                  <Select
                    placeholder="Vui l??ng ch???n khoa ch??? ?????nh"
                    data={[{ id: null, ten: "T???t c???" }, ...listAllKhoa]}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "khoaChiDinhId")}
                  />
                </Form.Item>
                <Form.Item label="?????i t?????ng" name="doiTuong">
                  <Select
                    placeholder="Vui l??ng ch???n ?????i t?????ng"
                    data={[
                      { id: null, ten: "T???t c???" },
                      ...(listdoiTuong || []),
                    ]}
                    onChange={(e, list) => onChangeField(e, "doiTuong")}
                    defaultValue={null}
                  />
                </Form.Item>
                <Form.Item label="N???i tr??" name="noiTru">
                  <Select
                    placeholder="Vui l??ng ch???n n???i tr??"
                    data={YES_NO}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "noiTru")}
                  />
                </Form.Item>
                <Form.Item label="Lo???i ?????i t?????ng" name="loaiDoiTuongId">
                  <Select
                    placeholder="Vui l??ng ch???n lo???i ?????i t?????ng"
                    data={
                      doiTuong
                        ? [
                            { id: null, ten: "T???t c???" },
                            ...(listLoaiDoiTuong || []),
                          ].filter((e) => e.doiTuong === doiTuong)
                        : [
                            { id: null, ten: "T???t c???" },
                            ...(listAllLoaiDoiTuong || []),
                          ]
                    }
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "loaiDoiTuongId")}
                  />
                </Form.Item>
                <Form.Item label="L?? c???p c???u" name="capCuu">
                  <Select
                    placeholder="Vui l??ng ch???n c???p c???u"
                    data={YES_NO}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "capCuu")}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/phong")}
                    >
                      Ph??ng
                    </div>
                  }
                  name="phongId"
                >
                  <Select
                    placeholder="Vui l??ng ch???n ph??ng"
                    data={[{ id: null, ten: "T???t c???" }, ...listAllPhong]}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "phongId")}
                  />
                </Form.Item>
                <Form.Item label="C???n l??m s??ng" name="canLamSang">
                  <Select
                    placeholder="Vui l??ng ch???n c???n l??m s??ng"
                    data={YES_NO}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "canLamSang")}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/chuc-vu")}
                    >
                      Ch???c v???
                    </div>
                  }
                  name="chucVuId"
                >
                  <Select
                    placeholder="Vui l??ng ch???n ch???c v???"
                    data={[{ id: null, ten: "T???t c???" }, ...listChucVu]}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "chucVuId")}
                  />
                </Form.Item>
                <Form.Item label="T??i kho???n" name="nhanVienId">
                  <Select
                    placeholder="Vui l??ng ch???n t??i kho???n"
                    data={[{ id: null, ten: "T???t c???" }, ...listAccount]}
                    defaultValue={null}
                    onChange={(e, list) => onChangeField(e, "nhanVienId")}
                  />
                </Form.Item>
                <Form.Item
                  label="M???c ????? ??u ti??n"
                  name="uuTien"
                  rules={[
                    {
                      validator: validator,
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="input-option"
                    placeholder="Vui l??ng nh???p m???c ????? ??u ti??n"
                    onKeyDown={handleKeypressInput}
                    onBlur={handleBlurInput}
                    min={1}
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item name="active" valuePropName="checked">
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                )}
              </Form>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default ThietLapChonKho;
