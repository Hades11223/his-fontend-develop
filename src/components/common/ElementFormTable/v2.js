import { Button } from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ModalConfirm } from "components/ModalConfirm";
import React, { useRef, useState } from "react";
import FormElement from "../ElementForm";
import ElementTable from "../ElementTable";
import { Main } from "./styled";

const FormTableElement = ({
  roleSave,
  roleEdit,
  dataSort,
  dataSearch,
  dataEdit,
  dataSelect,
  title = "Tiêu đề",
  getColumns = () => [],
  listData = [],
  createOrEdit = () => {},
  updateData,
  onDelete = () => {},
  dataSource = [],
  getData = () => {},
  layerId,
  onRowSelect,

  size,
  page,
  totalElements,
  ...props
}) => {
  const [state, _setState] = useState({
    isCreate: false,
    isEdit: false,
    dataSelect: {},
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const handleDelete = (item) => {
    ModalConfirm({
      content: "Bạn có chắc chắn xóa bản ghi này không?",
      onOk: () => {
        updateData({ _dataSelect: null });
        onDelete(item.id);
      },
      onCancel: () => {},
    });
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e?.target?.hasOwnProperty("checked")) value = e?.target?.checked;
      else value = e?.target?.value;
    } else value = e;

    setState({
      dataSelect: {
        ...state.dataSelect,
        [key]: value,
      },
    });
  };

  const afterSubmitSuccess =
    ({ form }) =>
    () => {
      form.resetFields();
      setState({
        isCreate: false,
        dataSelect: {},
      });
    };

  const customOnSelectColumn =
    ({ form }) =>
    () =>
    (record) => {
      if (record.id !== state.dataSelect?.id) {
        setState({ isCreate: false, dataSelect: record });
        form.setFieldsValue(record);
        if (onRowSelect) onRowSelect({ record, form });
      }
    };

  const renderForm = ({ form }) => {
    return (
      <ElementTable
        dataSort={dataSort}
        updateData={updateData}
        dataSource={
          state.isCreate ? [state.dataSelect, ...dataSource] : dataSource
        }
        getColumns={getColumns}
        other={{
          onChange,
          onDelete: handleDelete,
          form,
          dataSelect: state.dataSelect,
        }}
        getData={getData}
        rowKey={(record) => record.id}
        customOnSelectRow={customOnSelectColumn({ form })}
        page={page}
        size={size}
        totalElements={totalElements}
        scroll={{ x: 600, y: 400 }}
        dataSearch={dataSearch}
      />
    );
  };
  const contentHeader = ({ handleHiddenBtn, form }) => {
    const onClickNew = () => {
      form.resetFields();
      setState({ isCreate: true, dataSelect: { id: "" } });
    };
    return (
      <Button
        type="default"
        className="btn btn-added"
        onClick={onClickNew}
        // hiển thị thêm mới button khi chọn 1 row , (đã xác nhận với Vân chuyên viên)
        hidden={handleHiddenBtn() || !dataEdit?.id}
      >
        Thêm mới
        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
      </Button>
    );
  };

  const onCancel =
    ({ form }) =>
    () => {
      setState({ isCreate: false, dataSelect: {} });
      form.resetFields();
    };

  return (
    <Main>
      <FormElement
        dataEdit={state.dataSelect}
        roleSave={roleSave}
        roleEdit={roleEdit}
        title={title}
        renderForm={renderForm}
        contentHeader={contentHeader}
        classNameForm={"form-custom--one-line"}
        createOrEdit={createOrEdit}
        payloadSubmit={{ prevent: !state.dataSelect?.id && !state.isCreate }}
        getData={getData}
        layerId={layerId}
        dataSearch={dataSearch}
        afterSubmitSuccess={afterSubmitSuccess}
        onCancel={onCancel}
      />
    </Main>
  );
};

export default FormTableElement;
