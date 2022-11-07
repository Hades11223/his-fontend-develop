import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import useListAll from "hook/useListAll";
import React from "react";
import { openInNewTab } from "utils";

const { TextArea } = Input;
const { ColumnInput, ColumnSelect } = TableWrapper;

const TheBaoHiem = ({}) => {
  const [listAllNgheNghiep] = useListAll("ngheNghiep", { active: true });

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Mức hưởng",
      dataIndex: "mucHuong",
      width: 150,
      render: (item) => {
        return item && <span>{`${item}%`}</span>;
      },
      ...rest,
    }),
    ColumnSelect({
      title: "Nghề nghiệp",
      dataIndex: "ngheNghiep",
      searchKey: "ngheNghiepId",
      sortKey: "ngheNghiep.ten",
      dataSelect: listAllNgheNghiep,
      width: 150,
      render: (item) => item?.ten,
      ...rest,
    }),
    baseColumns.ghiChu,
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã thẻ bảo hiểm"
          name="ma"
          rules={[
            { required: true, message: "Vui lòng nhập mã thẻ BH!" },
            {
              max: 20,
              message: "Vui lòng nhập mã thẻ BH không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã thẻ BH!",
            },
            {
              pattern: /\D+/,
              message: "Mã phải có ít nhất một ký tự là chữ!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Nhập mã thẻ bảo hiểm"
          />
        </Form.Item>
        <Form.Item
          label="Tên thẻ bảo hiểm"
          name="ten"
          rules={[
            { required: true, message: "Vui lòng nhập tên thẻ BH!" },
            {
              max: 1000,
              message: "Vui lòng nhập tên thẻ BH không quá 1000 ký tự!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Nhập tên thẻ bảo hiểm" />
        </Form.Item>

        <Form.Item
          label="Mức hưởng"
          name="mucHuong"
          rules={[{ required: true, message: "Vui lòng nhập mức hưởng!" }]}
        >
          <Input
            className="input-option"
            type="number"
            placeholder="Nhập mức hưởng"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nghe-nghiep")}
            >
              Nghề nghiệp
            </div>
          }
          name="ngheNghiepId"
        >
          <Select
            data={listAllNgheNghiep}
            placeholder="Chọn nghề nghiệp"
          ></Select>
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <TextArea
            rows={4}
            placeholder="Nhập ghi chú"
            maxLength={1000}
            showCount
          />
        </Form.Item>
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <BaseDmWrap
      titleMain="thẻ bảo hiểm"
      roleName="THE_BAO_HIEM"
      storeName="theBaoHiem"
      renderForm={renderForm}
      getColumns={getColumns}
    />
  );
};

export default TheBaoHiem;
