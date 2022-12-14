import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm3 from "pages/danhMuc/BaseDm3";

let timer = null;

const Roles = ({
  listData,
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
  createOrEdit,
  getAllFuncGroup,
  listFuncGroup,
  exportData,
  onImport,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refAutoFocus = useRef();
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
    onSizeChange(10);
    getAllFuncGroup({ active: true });
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
    });
    updateData({ dataEditDefault: null });
    form.resetFields();

    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    setState({
      editStatus: true,
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

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let formattedData = {
          ...values,
          moTa: values?.moTa?.trim(),
          ma: values?.ma?.trim(),
          ten: values.ten?.trim(),
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
        });
      })
      .catch((error) => {});
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? quy???n"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input placeholder="T??m m?? quy???n" onChange={onSearchInput("ma")} />
          }
        />
      ),
      align: "left",
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n quy???n"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="T??m theo t??n quy???n"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "120px",
      align: "left",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="M?? t???"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || 0}
          search={
            <Input
              placeholder="T??m theo m?? t???"
              onChange={onSearchInput("moTa")}
            />
          }
        />
      ),
      width: "120px",
      align: "left",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: (
        <HeaderSearch
          // sort_key="dsNhomTinhNang"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn?.nhomTinhNangId || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "T???t c???" }, ...listFuncGroup]}
              placeholder="Ch???n nh??m t??nh n??ng"
              onChange={onSearchInput("nhomTinhNangId")}
            />
          }
          title="Nh??m t??nh n??ng"
        />
      ),
      width: "100px",
      dataIndex: "dsNhomTinhNang",
      key: "dsNhomTinhNang",
      align: "center",
      render: (item) => {
        return item.map((e) => e.ten).join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: "70px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
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
  return (
  <Main>
    <BaseDm3
      breadcrumb={[
        { title: "Qu???n tr???", link: "/quan-tri" },
        {
          title: "Danh m???c Quy???n",
          link: "/quan-tri/quyen",
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
          title="Danh m???c Quy???n"
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
          onExport={exportData}
          onImport={onImport}
          buttonHeader={
            checkRole([ROLES["QUAN_LY_TAI_KHOAN"].QUYEN_THEM])
              ? [
                  {
                    type: "create",
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
          dataSource={listData}
          onRow={onRow}
          layerId={refLayerHotKey.current}
          dataEditDefault={dataEditDefault}
          // rowClassName={setRowClassName}
        />
        {!!totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
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
          <CreatedWrapper
            title="Th??ng tin chi ti???t"
            onCancel={handleCancel}
            cancelText="H???y"
            onOk={handleAdded}
            okText="L??u [F4]"
            roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].QUYEN_THEM]}
            roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].QUYEN_SUA]}
            editStatus={state.editStatus}
            layerId={refLayerHotKey.current}
          >
            <FormWraper
              disabled={
                state.editStatus
                  ? !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].QUYEN_SUA])
                  : !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].QUYEN_THEM])
              }
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              className="form-custom"
            >
              <Form.Item
                label="M?? quy???n"
                style={{ width: "100%" }}
                name="ma"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? quy???n!",
                  },
                  {
                    max: 50,
                    message: "Vui l??ng nh???p m?? quy???n kh??ng qu?? 50 k?? t???!",
                  },
                  {
                    whitespace: true,
                    message: "Vui l??ng nh???p m?? quy???n!",
                  },
                ]}
              >
                <Input
                  ref={refAutoFocus}
                  className="input-option"
                  placeholder="Vui l??ng nh???p m?? quy???n"
                />
              </Form.Item>
              <Form.Item
                label="T??n quy???n"
                name="ten"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n quy???n!",
                  },
                  {
                    max: 1000,
                    message: "Vui l??ng nh???p t??n quy???n kh??ng qu?? 1000 k?? t???!",
                  },
                  {
                    whitespace: true,
                    message: "Vui l??ng nh???p t??n quy???n!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p t??n quy???n"
                />
              </Form.Item>
              <Form.Item
                label="M?? t???"
                name="moTa"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? t???!",
                  },
                  {
                    max: 1000,
                    message: "Vui l??ng nh???p m?? t??? kh??ng qu?? 1000 k?? t???!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p m?? t???"
                />
              </Form.Item>
              <Form.Item
                label="Nh??m t??nh n??ng"
                name="dsNhomTinhNangId"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n nh??m t??nh n??ng!",
                  },
                ]}
              >
                <Select
                  placeholder={"Ch???n nh??m t??nh n??ng"}
                  mode="multiple"
                  data={listFuncGroup}
                />
              </Form.Item>
              {state.editStatus && (
                <Form.Item label=" " name="active" valuePropName="checked">
                  <Checkbox>C?? hi???u l???c</Checkbox>
                </Form.Item>
              )}
            </FormWraper>
          </CreatedWrapper>
        </Col>
      )}
    </BaseDm3>
  </Main>
  );
};

const mapStateToProps = ({
  quyen: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    dataEditDefault,
  },
  nhomTinhNang: { listAllData = [] },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listFuncGroup: listAllData,
  };
};
const mapDispatchToProps = ({
  quyen: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    exportData,
    onImport,
  },
  nhomTinhNang: { onGetAll },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  getAllFuncGroup: onGetAll,
  exportData,
  onImport,
});
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
