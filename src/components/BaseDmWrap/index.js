import { Checkbox, Form, Input } from "antd";
import { TableWrapper, HeaderSearch } from "components";
import { ROLES } from "constants/index";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDm from "../BaseDm/v2";

const { Column, ColumnInput, ColumnCheckbox } = TableWrapper;

const BaseDmWrap = ({
  storeName,
  roleName,
  roleSave,
  roleEdit,
  getColumns,
  renderForm,
  titleMain,
  ...props
}) => {
  const { _listData, _totalElements, _page, _size, _dataEdit, _dataSearch } =
    useSelector((state) => state[storeName]);

  const { updateData, _getList, _createOrEdit, _onDelete } =
    useDispatch()[storeName];

  const [_roleSave, _roleEdit] = useMemo(
    () =>
      roleName
        ? [
            ROLES["DANH_MUC"][roleName + "_THEM"],
            ROLES["DANH_MUC"][roleName + "_SUA"],
          ]
        : [roleSave, roleEdit],
    []
  );

  const columnDanhMuc = (payload) => ({
    stt: {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "stt",
      render: (_, __, index) =>
        index + 1 + (payload.page || 0) * (payload.size || 0),
    },
    ma: ColumnInput({
      title: `Mã ${titleMain}`,
      dataIndex: "ma",
      width: 150,
      ...payload,
    }),
    ten: ColumnInput({
      title: `Tên ${titleMain}`,
      dataIndex: "ten",
      width: 150,
      ...payload,
    }),
    moTa: ColumnInput({
      title: "Mô tả",
      dataIndex: "moTa",
      width: 180,
      ...payload,
    }),
    ghiChu: ColumnInput({
      title: "Ghi chú",
      dataIndex: "ghiChu",
      width: 180,
      ...payload,
    }),
    active: ColumnCheckbox({
      title: "Hiệu lực",
      dataIndex: "active",
      width: 120,
      dataSearch: ["Có hiệu lực", "Không hiệu lực"],
      ...payload,
    }),
  });

  const _getColumns = getColumns
    ? (payload) => {
        const baseColumns = columnDanhMuc(payload);
        return getColumns({ ...payload, baseColumns });
      }
    : (payload) => {
        const baseColumns = columnDanhMuc(payload);
        return [
          baseColumns.stt,
          baseColumns.ma,
          baseColumns.ten,
          baseColumns.active,
        ];
      };

  const _renderForm = renderForm
    ? renderForm
    : ({ editStatus, refAutoFocus }) => {
        return (
          <>
            <Form.Item
              label={`Mã ${titleMain}`}
              name="ma"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập mã ${titleMain}!`,
                },
                {
                  max: 20,
                  message: `Vui lòng nhập mã ${titleMain} không quá 20 ký tự!`,
                },
                {
                  whitespace: true,
                  message: `Vui lòng nhập mã ${titleMain}!`,
                },
              ]}
            >
              <Input
                autoFocus
                className="input-option"
                placeholder={`Vui lòng nhập mã ${titleMain}`}
                ref={refAutoFocus}
              />
            </Form.Item>
            <Form.Item
              label={`Tên ${titleMain}`}
              name="ten"
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập tên ${titleMain}!`,
                },
                {
                  max: 1000,
                  message: `Vui lòng nhập tên ${titleMain} không quá 1000 ký tự!`,
                },
                {
                  whitespace: true,
                  message: `Vui lòng nhập tên ${titleMain}!`,
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder={`Vui lòng nhập tên ${titleMain}`}
              />
            </Form.Item>
            {editStatus && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item>
            )}
          </>
        );
      };

  return (
    <BaseDm
      // state
      listData={_listData}
      totalElements={_totalElements}
      page={_page}
      size={_size}
      dataEditDefault={_dataEdit}
      dataSearch={_dataSearch}
      // dispatch
      getData={_getList}
      createOrEdit={_createOrEdit}
      updateData={updateData}
      onDelete={_onDelete}
      // props
      roleSave={_roleSave ? [_roleSave] : []}
      roleEdit={_roleEdit ? [_roleEdit] : []}
      getColumns={_getColumns}
      renderForm={_renderForm}
      titleMain={titleMain}
      {...props}
    ></BaseDm>
  );
};

export default BaseDmWrap;
