import { Checkbox, Form, Input, InputNumber } from "antd";
import { ListImage } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React from "react";
import fileUtils from "utils/file-utils";

// tododanhmuc

const screenName = "hạng thẻ";

const HangThe = ({}) => {
  const getColumns = ({ baseColumns = {}, onClickSort, dataSortColumn }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    {
      title: (
        <HeaderSearch
          title="Số điểm tối thiểu"
          sort_key="diemToiThieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diemToiThieu || 0}
          // search={
          //   <Input
          //     placeholder="Tìm tên hạng thẻ"
          //     onChange={(e) => {
          //       onSearchInput(e.target.value, "ten");
          //     }}
          //   />
          // }
        />
      ),
      width: 260,
      dataIndex: "diemToiThieu",
      key: "diemToiThieu",
    },
    {
      title: <HeaderSearch title="Icon" />,
      width: 150,
      dataIndex: "icon",
      key: "icon",
      render: (item) => {
        return (
          <div>
            <img
              style={{ maxWidth: 100, maxHeight: 100 }}
              src={item ? fileUtils.absoluteFileUrl(item) : ""}
            />
          </div>
        );
      },
    },
    baseColumns.active,
  ];

  const renderForm = ({ editStatus, checkChangeField }) => {
    return (
      <>
        <Form.Item
          label={"Mã " + screenName}
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã " + screenName,
            },
            {
              max: 20,
              message:
                "Vui lòng nhập mã " + screenName + " không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã " + screenName,
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label={"Tên " + screenName}
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên " + screenName,
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên " + screenName + " không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên " + screenName,
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập tên" />
        </Form.Item>

        <Form.Item
          label="Số điểm tối thiểu"
          name="diemToiThieu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điểm tối thiểu!",
            },
          ]}
        >
          <InputNumber
            type="number"
            className="input-option"
            placeholder="Vui lòng nhập số điểm tối thiểu"
          />
        </Form.Item>

        <Form.Item label="Icon" name="icon">
          <ListImage
            uploadImage={checkChangeField("icon")}
            provider="hangThe"
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
      titleMain={screenName}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="HANG_THE"
      storeName="hangThe"
    />
  );
};

export default HangThe;
