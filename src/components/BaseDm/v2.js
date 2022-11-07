import Icon from "@ant-design/icons";
import { Col, Form, Modal } from "antd";
import { checkRole } from "utils/role-utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import {
  CreatedWrapper,
  HomeWrapper,
  Pagination,
  TableWrapper,
} from "components";
import FormWraper from "components/FormWraper";
import { BASE_LAYOUT, PAGE_DEFAULT, SIZE_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { combineSort, emptyString } from "utils";
import { Main } from "./styled";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import moment from "moment";

let timer = null;

const BaseDm = ({
  customOnSearchInput, // function

  // remove
  page = 0,
  size = 10,
  onDelete = () => {},

  //
  autoFocus = true,
  titleTable,
  titleMain = "",
  totalElements,
  roleSave = [],
  roleEdit = [],
  listLink,
  initFormValue = {}, // khởi tạo giá trị cho form
  dataSearch = {},
  classNameForm = "",
  mapToForm = (data) => data,
  mapToBody = (data) => data,
  beforeSubmit = (data) => data,
  afterSubmit = () => {},
  onReset = () => {},
  addedDisabledOk = true,
  onShowUpdate,
  onCancel,
  isSubmit = () => true,

  // props
  onExport,
  onImport,

  // bắt buộc
  renderForm = () => {},
  getColumns = () => [],
  getData = () => {},
  createOrEdit,
  updateData,
  listData = [],
  dataEditDefault,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    editStatus: false,
    dataSortColumn: { createdAt: 2 },
    disabledBtnOk: true,
    layoutMode: "default", // collapse, fullTable
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { editStatus, dataSortColumn, layoutMode } = state;
  const refLayerHotKey = useRef(stringUtils.guid());
  const refAutoFocus = useRef();
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { canSave, canEdit } = useMemo(() => {
    return {
      canSave: checkRole(roleSave),
      canEdit: checkRole(roleEdit),
    };
  }, []);

  const setDefaultForm = () => {
    setState({ editStatus: false, disabledBtnOk: true });
    updateData({ _dataEdit: initFormValue });
    form.resetFields();
    form.setFieldsValue(initFormValue);
    onReset({ setState, updateData, form, refAutoFocus });
  };
  ///
  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { ...dataSearch, sort };
    getData(params);

    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    const res = combineSort(sort);
    setState({ dataSortColumn: sort });
    getData({
      isSave: true,
      ...dataSearch,
      page: PAGE_DEFAULT,
      sort: res,
    });
  };

  ///
  const onSearchInput = customOnSearchInput
    ? customOnSearchInput({ dataSortColumn })
    : (name) => (e) => {
        const value = e?.hasOwnProperty("target")
          ? e?.target?.type === "checkbox"
            ? e?.target?.checked
            : e?.target?.value
          : e?.hasOwnProperty("_d")
          ? moment(e._d)
          : e;
        getData({
          isSave: true,
          ...dataSearch,
          page: PAGE_DEFAULT,
          size,
          [name]: value,
          sort: combineSort(dataSortColumn),
        });
      };

  ///
  const onPageChange = (page) => {
    getData({
      isSave: true,
      ...dataSearch,
      page: page - 1,
      sort: combineSort(dataSortColumn),
    });
  };

  ///
  const onSizeChange = (size) => {
    getData({
      isSave: true,
      ...dataSearch,
      page: 0,
      size,
      sort: combineSort(dataSortColumn),
    });
  };

  ///
  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then(async (values) => {
        if ((state.disabledBtnOk && addedDisabledOk) || !isSubmit()) return;
        const body = await beforeSubmit({ ...values, id: dataEditDefault.id });
        if (!editStatus) {
          setState({ dataSortColumn: { createdAt: 2 } });
        }

        createOrEdit(mapToBody(body)).then((res) => {
          if (res && res.code === 0) {
            const params = {
              ...dataSearch,
              isSave: true,
              page: !editStatus ? dataSearch.page : PAGE_DEFAULT,
              sort: combineSort(
                dataEditDefault.id ? dataSortColumn : { createdAt: 2 }
              ),
            };
            setDefaultForm();
            getData(params);
            afterSubmit();
          }
        });
      })
      .catch(() => {});
  };

  ///
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        // onShowAndHandleUpdate(record);
        setState({ editStatus: true, disabledBtnOk: true });
        updateData({ _dataEdit: record, dataEditDefault: record });
        form.setFieldsValue(mapToForm(record));
        onShowUpdate && onShowUpdate({ form }, record);
      },
    };
  };

  ///
  const handleClickedBtnAdded = () => {
    setDefaultForm();
    updateData({
      dataEditDefault: initFormValue || {},
      _dataEdit: initFormValue || {},
    });
  };

  ///
  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(mapToForm(dataEditDefault));
    } else {
      setDefaultForm();
    }
    if (onCancel) onCancel({ form, dataEditDefault });
  };

  ///
  const handleDeleteItem = (item) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: t("common.banCoChacMuonXoaBanGhiNay"),
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          onDelete(item?.id);
        }
      );
  };

  ///
  const changeFullScreen = () => {
    setState({
      layoutMode: layoutMode === "fullTable" ? "default" : "fullTable",
    });
  };
  ///
  const handleCollapsePane = () => {
    if (layoutMode !== "fullTable") {
      setState({
        layoutMode: layoutMode === "default" ? "collapse" : "default",
      });
    }
  };

  ///
  const checkChangeField = (fieldName) => (data) => {
    const equalField = (formValue, editValue) =>
      formValue === editValue ||
      (emptyString(formValue) && emptyString(editValue));

    const values = form.getFieldsValue() || {};

    const mapBool = Object.keys(values).reduce(
      (acc, item) => ({
        ...acc,
        [item]: equalField(values[item], dataEditDefault[item]),
      }),
      {}
    );
    if (fieldName)
      mapBool[fieldName] = equalField(data, dataEditDefault[fieldName]);

    const disabledBtnOk = Object.values(mapBool).reduce(
      (acc, item) => acc && item,
      true
    );
    form.setFieldsValue({ [fieldName]: data });
    if (disabledBtnOk != state.disabledBtnOk) {
      setState({
        disabledBtnOk: disabledBtnOk,
      });
    }
  };
  return (
    <Main>
      <HomeWrapper change={true} title="Danh mục" listLink={listLink}>
        <Col
          {...BASE_LAYOUT[layoutMode].table} // layout
          className={`pr-3 transition-ease`}
        >
          <TableWrapper
            title={titleTable ? titleTable : `Danh mục ${titleMain}`}
            scroll={{ x: 800 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            buttonHeader={[
              ...(canSave
                ? [
                    {
                      type: "create",
                      title: "Thêm mới [F1]",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                  ]
                : []),
              {
                className: `btn-change-full-table ${
                  layoutMode === "fullTable" ? "small" : "large"
                }`,
                title: (
                  <Icon
                    component={layoutMode === "fullTable" ? thuNho : showFull}
                  />
                ),
                onClick: changeFullScreen,
              },
              {
                className: "btn-collapse",
                title: (
                  <Icon
                    component={
                      layoutMode === "collapse" ? extendTable : extendChiTiet
                    }
                  />
                ),
                onClick: handleCollapsePane,
              },
            ]}
            columns={getColumns({
              dataSearch,
              onClickSort,
              dataSortColumn,
              onSearchInput,
              handleDeleteItem,
              page: dataSearch.page || PAGE_DEFAULT,
              size: dataSearch.size || SIZE_DEFAULT,
            })}
            dataSource={listData}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
            onExport={onExport}
            onImport={onImport}
          ></TableWrapper>
          {!!totalElements && (
            <Pagination
              onChange={onPageChange}
              onShowSizeChange={onSizeChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listData}
              className="dm-footer-table"
            />
          )}
        </Col>
        <Col
          {...BASE_LAYOUT[layoutMode].form}
          className={`mt-3 transition-ease dm-focus-border`}
        >
          <CreatedWrapper
            title="Thông tin chi tiết"
            onCancel={handleCancel}
            cancelText="Hủy"
            onOk={handleSubmit}
            okText="Lưu [F4]"
            roleSave={roleSave}
            roleEdit={roleEdit}
            editStatus={editStatus}
            layerId={refLayerHotKey.current}
            disabledBtnOk={state.disabledBtnOk && addedDisabledOk}
          >
            <FormWraper
              disabled={editStatus ? !canEdit : !canSave}
              form={form}
              layout="vertical"
              className={`form-custom ${classNameForm}`}
              onFieldsChange={checkChangeField()}
            >
              {renderForm({
                form,
                editStatus,
                autoFocus,
                refAutoFocus,
                checkChangeField,
                dataEditDefault,
              })}
            </FormWraper>
          </CreatedWrapper>
        </Col>
      </HomeWrapper>
    </Main>
  );
};

export default BaseDm;
