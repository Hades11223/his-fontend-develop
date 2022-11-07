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
import { BASE_LAYOUT, PAGE_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { combineSort, emptyString } from "utils";
import { Main } from "./styled";
import utilColumns from "./columns";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";

let timer = null;

const BaseDm = ({
  totalElements,
  page = 0,
  size = 10,
  dataEditDefault,
  dataSearch,
  titleTable,
  initFormValue = {}, // khởi tạo giá trị cho form
  renderForm = () => {},
  getColumns = () => [],
  getData = () => {},
  createOrEdit,
  updateData,
  onDelete = () => {},
  listData = [],
  roleSave = [],
  roleEdit = [],
  classNameForm = "",
  customShowUpdate, // function
  customSetFieldsValue, // function
  customOnSearchInput, // function
  customCancel, // function
  customClickedBtnAdded, // function
  isSubmit = () => true,
  // map lại data trước khi submit
  customDataBeforeSubmit,
  mapToForm = (data) => data,
  autoFocus = true,
  afterSubmit = () => {},
  listLink,
  titleMain = "",
  addedDisabledOk = true,
  onClickBtnAdd,
  onClickCancel,

  // remove
  setDefaultForm = () => {},
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
  const refAutoFocus = useRef({});
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    setDefaultForm({ form });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const resetFields = () => {
    form.resetFields();
    form.setFieldsValue(initFormValue);
  };

  useEffect(() => {
    form.setFieldsValue(initFormValue);
  }, [initFormValue]);

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { ...dataSearch, page, size, sort };
    getData(params);
  }, []);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    setState({ dataSortColumn: sort });
    const res = combineSort(sort);
    getData({
      ...dataSearch,
      page: PAGE_DEFAULT,
      size,
      sort: res,
    });
  };

  const onSearchInput = customOnSearchInput
    ? customOnSearchInput({ dataSortColumn })
    : (value, name) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          updateData({ dataSearch: { ...dataSearch, [name]: value } });
          getData({
            ...dataSearch,
            page: PAGE_DEFAULT,
            size,
            [name]: value,
            sort: combineSort(dataSortColumn),
          });
        }, 500);
      };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getData({
      ...dataSearch,
      ...params,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getData({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then(async (values) => {
        if ((state.disabledBtnOk && addedDisabledOk) || !isSubmit()) return;
        const body = { ...values, id: dataEditDefault.id };
        values = customDataBeforeSubmit
          ? await customDataBeforeSubmit(body)
          : body;

        if (!editStatus) {
          setState({ dataSortColumn: { createdAt: 2 } });
        }
        createOrEdit(values).then((res) => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(
              dataEditDefault.id ? dataSortColumn : { createdAt: 2 }
            ),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
          }
          if (res && res.code === 0) {
            resetFields();
            getData(params);
            afterSubmit();
          }
        });
      })
      .catch((error) => {});
  };

  const setFieldsValue = customSetFieldsValue
    ? customSetFieldsValue({
        form,
      })
    : (data = {}) => {
        setState({ disabledBtnOk: true });
        form.setFieldsValue(mapToForm(data));
      };

  const _onShowData = (data = {}) => {
    setState({ editStatus: true });
    updateData({ _dataEdit: data, dataEditDefault: data });
    setFieldsValue(data);
  };
  const onShowAndHandleUpdate = customShowUpdate
    ? customShowUpdate({
        form,
        updateData,
        setEditStatus: (editStatus) => setState({ editStatus }),
        setFieldsValue,
        callback: _onShowData,
      })
    : _onShowData;

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        if (event?.target?.className?.indexOf("ig-e-onRow") !== -1) {
          return;
        }
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = customClickedBtnAdded
    ? customClickedBtnAdded({ updateData, refAutoFocus, form, setState })
    : () => {
        setState({ editStatus: false, disabledBtnOk: true });
        resetFields();
        setDefaultForm({ form });
        updateData({
          dataEditDefault: initFormValue || {},
          _dataEdit: initFormValue || {},
        });
        if (onClickBtnAdd)
          onClickBtnAdd({ updateData, refAutoFocus, form, setState });
      };

  const handleCancel = customCancel
    ? customCancel({ form, dataEditDefault })
    : () => {
        if (editStatus) {
          setFieldsValue(dataEditDefault);
        } else {
          resetFields();
        }
        if (onClickCancel) onClickCancel();
      };

  const handleDeleteItem = (item) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("common.banCoChacMuonXoa")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          onDelete(item?.id).then((res) => {
            if (res && res.code === 0) {
              afterSubmit();
            }
          });
        }
      );
  };

  const changeFullScreen = () => {
    setState({
      layoutMode: layoutMode === "fullTable" ? "default" : "fullTable",
    });
  };
  const handleCollapsePane = () => {
    if (layoutMode !== "fullTable") {
      setState({
        layoutMode: layoutMode === "default" ? "collapse" : "default",
      });
    }
  };
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
      <HomeWrapper title="Danh mục" listLink={listLink}>
        <Col
          {...BASE_LAYOUT[layoutMode].table} // layout
          className={`pr-3 transition-ease`}
        >
          <TableWrapper
            title={titleTable ? titleTable : `Danh mục ${titleMain}`}
            scroll={{ x: 800 }}
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
              ...(checkRole(roleSave)
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
              onClickSort,
              dataSortColumn,
              onSearchInput,
              handleDeleteItem,
              page,
              size,
              baseColumns: utilColumns({
                onClickSort,
                dataSortColumn,
                onSearchInput,
                handleDeleteItem,
                page,
                size,
                titleMain,
              }),
            })}
            dataSource={listData}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
          ></TableWrapper>
          {!!totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listData}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
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
            onOk={handleAdded}
            okText="Lưu [F4]"
            roleSave={roleSave}
            roleEdit={roleEdit}
            editStatus={editStatus}
            layerId={refLayerHotKey.current}
            disabledBtnOk={state.disabledBtnOk && addedDisabledOk}
          >
            <FormWraper
              disabled={
                editStatus ? !checkRole(roleEdit) : !checkRole(roleSave)
              }
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              className={`form-custom ${classNameForm}`}
              onFieldsChange={checkChangeField()}
            >
              {renderForm({
                form,
                editStatus,
                autoFocus,
                refAutoFocus,
                checkChangeField,
              })}
            </FormWraper>
          </CreatedWrapper>
        </Col>
      </HomeWrapper>
    </Main>
  );
};

BaseDm.Column = ({ ...props }) => {};

export default BaseDm;
