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
  customOnSelectColumn,
  layerId,

  size,
  page,
  totalElements,
  ...props
}) => {
  const [state, _setState] = useState({
    isEdit: false,
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

    updateData({
      _dataSelect: {
        ...dataSelect,
        [key]: value,
      },
    });
  };

  const afterSubmitSuccess =
    ({ form }) =>
    () => {
      form.resetFields();
      updateData({
        _dataSelect: null,
      });
    };

  const renderForm = ({ form }) => {
    return (
      <ElementTable
        dataSort={dataSort}
        dataSource={dataSelect ? [dataSelect, ...dataSource] : dataSource}
        getColumns={getColumns}
        other={{ onChange, onDelete: handleDelete, form }}
        rowKey={(record) => record.id}
        customOnSelectColumn={customOnSelectColumn}
      />
    );
  };
  const contentHeader = ({ handleHiddenBtn, form }) => {
    const onClickNew = () => {
      form.resetFields();
      updateData({
        _dataSelect: { id: "" },
      });
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
  return (
    <FormElement
      dataEdit={dataEdit}
      roleSave={roleSave}
      roleEdit={roleEdit}
      title={title}
      renderForm={renderForm}
      contentHeader={contentHeader}
      classNameForm={"form-custom--one-line"}
      createOrEdit={createOrEdit}
      getData={getData}
      layerId={layerId}
      dataSearch={dataSearch}
      afterSubmitSuccess={afterSubmitSuccess}
    />
  );
};

export default FormTableElement;
