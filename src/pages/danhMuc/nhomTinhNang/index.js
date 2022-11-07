import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
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
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import BaseDm3 from "pages/danhMuc/BaseDm3";
import { Main } from "./styled";

let timer = null;

const FunctionalityGroup = ({
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
  onExport,
  onImport,
}) => {
  const { t } = useTranslation();

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
    onSizeChange({ size: 10 });
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
          giaTri: values?.giaTri?.trim(),
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
          title="Mã nhóm tính năng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã nhóm tính năng"
              onChange={onSearchInput("ma")}
            />
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
          title="Tên nhóm tính năng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm theo tên nhóm tính năng"
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
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || 0}
          search={
            <Input
              placeholder="Tìm theo mô tả"
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
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
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
        { title: t("danhMuc.quanTriHeThong"), link: "/quan-tri" },
        { title: t("danhMuc.nhomTinhNang"), link: "/quan-tri/nhom-tinh-nang" },
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
          title={t("danhMuc.nhomTinhNang")}
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
            checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG_THEM])
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
          onExport={onExport}
          onImport={onImport}
        />
        {!!totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            listData={listData}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={(size) => onSizeChange({ size })}
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
            title="Thông tin chi tiết"
            onCancel={handleCancel}
            cancelText="Hủy"
            onOk={handleAdded}
            okText="Lưu [F4]"
            roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG_THEM]}
            roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG_SUA]}
            editStatus={state.editStatus}
            layerId={refLayerHotKey.current}
          >
            <FormWraper
              disabled={
                state.editStatus
                  ? !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG_SUA])
                  : !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG_THEM])
              }
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              className="form-custom"
            >
              <Form.Item
                label="Mã nhóm tính năng"
                style={{ width: "100%" }}
                name="ma"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã nhóm tính năng!",
                  },
                  {
                    max: 20,
                    message:
                      "Vui lòng nhập mã nhóm tính năng không quá 20 ký tự!",
                  },
                  {
                    whitespace: true,
                    message: "Vui lòng nhập mã nhóm tính năng!",
                  },
                ]}
              >
                <Input
                  ref={refAutoFocus}
                  className="input-option"
                  placeholder="Vui lòng nhập mã nhóm tính năng"
                />
              </Form.Item>
              <Form.Item
                label="Tên nhóm tính năng"
                name="ten"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhóm tính năng!",
                  },
                  {
                    max: 1000,
                    message:
                      "Vui lòng nhập tên nhóm tính năng không quá 1000 ký tự!",
                  },
                  {
                    whitespace: true,
                    message: "Vui lòng nhập tên nhóm tính năng!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui lòng nhập tên nhóm tính năng"
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="moTa"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả!",
                  },
                  {
                    max: 1000,
                    message: "Vui lòng nhập mô tả không quá 1000 ký tự!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui lòng nhập mô tả"
                />
              </Form.Item>
              {state.editStatus && (
                <Form.Item label=" " name="active" valuePropName="checked">
                  <Checkbox>Có hiệu lực</Checkbox>
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
  nhomTinhNang: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    dataEditDefault,
  },
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
  };
};
const mapDispatchToProps = ({
  nhomTinhNang: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onExport,
    onImport,
  },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  onExport,
  onImport,
});
export default connect(mapStateToProps, mapDispatchToProps)(FunctionalityGroup);
