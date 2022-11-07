import { Checkbox, Col, Form, Input, Row } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import React from "react";
import { connect, useDispatch } from "react-redux";
import Select from "components/Select";
import useListAll from "hook/useListAll";
import { TableWrapper } from "components";

const { ColumnInput, ColumnSelect } = TableWrapper;
const nameScreen = "diễn biến";

const MauDienBien = ({ filterListAllPhong }) => {
  const [listAllKhoa] = useListAll("khoa", { active: true });
  const [listAllPhong] = useListAll("phong", { active: true });
  const [listAllNhanVien] = useListAll("nhanVien", { active: true });

  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "Diễn biến",
      dataIndex: "dienBien",
      width: 200,
      ...rest,
    }),
    ColumnSelect({
      title: "Khoa chỉ định",
      dataIndex: "dsKhoaChiDinh",
      searchKey: "dsKhoaChiDinhId",
      sortKey: "dsKhoaChiDinhId",
      width: 200,
      dataSelect: listAllKhoa,
      render: (item) => item?.map((item) => item.ten).join(", "),
      ...rest,
    }),
    ColumnSelect({
      title: "Phòng thực hiện",
      dataIndex: "dsPhong",
      searchKey: "dsPhongId",
      sortKey: "dsPhongId",
      width: 200,
      dataSelect: listAllPhong,
      render: (item) => item?.map((item) => item.ten).join(", "),
      ...rest,
    }),
    ColumnSelect({
      title: "Bác sĩ",
      dataIndex: "dsBacSiChiDinh",
      searchKey: "dsBacSiChiDinhId",
      sortKey: "dsBacSiChiDinhId",
      width: 200,
      dataSelect: listAllNhanVien,
      render: (item) => item?.map((item) => item.ten).join(", "),
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <Row>
        <Col span={12}>
          <Form.Item
            label={`Mã ${nameScreen}`}
            name="ma"
            rules={[
              {
                required: true,
                message: `Vui lòng nhập mã ${nameScreen}!`,
              },
              {
                max: 20,
                message: `Vui lòng nhập mã ${nameScreen} không quá 20 ký tự!`,
              },
              {
                whitespace: true,
                message: `Vui lòng nhập mã ${nameScreen}!`,
              },
            ]}
          >
            <Input
              autoFocus={autoFocus}
              className="input-option"
              placeholder={`Vui lòng nhập mã ${nameScreen}`}
              ref={refAutoFocus}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={`Tên ${nameScreen}`}
            name="ten"
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${nameScreen}!`,
              },
              {
                max: 1000,
                message: `Vui lòng nhập ${nameScreen} không quá 1000 ký tự!`,
              },
              {
                whitespace: true,
                message: `Vui lòng nhập ${nameScreen}!`,
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder={`Vui lòng nhập ${nameScreen}`}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={`Diễn biến`}
            name="dienBien"
            rules={[
              {
                required: true,
                message: `Vui lòng nhập diễn biến!`,
              },
              {
                max: 1000,
                message: `Vui lòng nhập diễn biến không quá 1000 ký tự!`,
              },
              {
                whitespace: true,
                message: `Vui lòng nhập diễn biến!`,
              },
            ]}
          >
            <Input.TextArea
              className="input-option"
              placeholder={`Vui lòng nhập diễn biến`}
              rows={5}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={`Khoa chỉ định`} name="dsKhoaChiDinhId">
            <Select
              data={listAllKhoa}
              placeholder={`Vui lòng chọn khoa`}
              mode="multiple"
              onChange={(dsKhoaId) => {
                filterListAllPhong({ dsKhoaId });
                form.setFieldsValue({ dsPhongId: [] });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={`Phòng`} name="dsPhongId">
            <Select
              data={listAllPhong}
              placeholder={`Vui lòng chọn phòng`}
              mode="multiple"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={`Bác sĩ`} name="dsBacSiChiDinhId">
            <Select
              data={listAllNhanVien}
              placeholder={`Vui lòng chọn bác sĩ`}
              mode="multiple"
              onChange={(dsBacSiId) => {
                filterListAllPhong({ dsBacSiId });
                form.setFieldsValue({ dsBacSiId: [] });
              }}
            />
          </Form.Item>
        </Col>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </Row>
    );
  };

  const mapToForm = ({ dsPhongId, dsKhoaChiDinhId, ...data } = {}) => {
    filterListAllPhong();

    return {
      ...data,
      dsPhongId: dsPhongId ? dsPhongId : [],
      dsKhoaChiDinhId: dsKhoaChiDinhId ? dsKhoaChiDinhId : [],
    };
  };

  return (
    <BaseDmWrap
      titleMain={nameScreen}
      // titleTable={"Danh mục mẫu diễn biến"}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="MAU_DIEN_BIEN"
      classNameForm={"form-custom--one-line"}
      storeName="mauDienBien"
      mapToForm={mapToForm}
    />
  );
};

export default connect(
  () => ({}),
  ({ phong: { filterListAll: filterListAllPhong } }) => ({
    filterListAllPhong,
  })
)(MauDienBien);
