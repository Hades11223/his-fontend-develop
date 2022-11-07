import { Checkbox, Form, Input } from "antd";
import { InputTimeout, Select, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { useStore } from "hook";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openInNewTab } from "utils";
const nameScreen = "dịch vụ";

// tododanhmuc
const {ColumnInput,ColumnSelect} = TableWrapper;

const DichVuAn = ({}) => {
  const {
    donViTinh: { getListAllDonViTinh },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    nhomDichVuCap2: { getAllTongHopDichVuCap2 },
    nhomDichVuCap3: { getAllTongHopDichVuCap3 },
  } = useDispatch();
  const listAllDonViTinh = useStore("donViTinh.listAllDonViTinh", []);
  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );
  const listAllNhomDichVuCap2 = useStore(
    "nhomDichVuCap2.listAllNhomDichVuCap2",
    []
  );
  const listAllNhomDichVuCap3 = useStore(
    "nhomDichVuCap3.listAllNhomDichVuCap3",
    []
  );

  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "", active: true });
    getAllTongHopDichVuCap1({ page: "", size: "", active: true });
    getAllTongHopDichVuCap2({ page: "", size: "", active: true });
    getAllTongHopDichVuCap3({ page: "", size: "", active: true });
  }, []);
  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    ColumnInput({
      title: "Mã dịch vụ",
      dataIndex: "dichVu.ma",
      render: (_, data) => data.dichVu?.ma,
      ...rest,
    }),
    ColumnInput({
      title: "Tên dịch vụ",
      dataIndex: "dichVu.ten",
      width: 250,
      render: (_, data) => data.dichVu?.ten,
      ...rest,
    }),
    ColumnInput({
      title: "Đơn giá BH",
      dataIndex: "dichVu.giaBaoHiem",
      formatPrice: true,
      width: 150,
      render: (_, data) => data.dichVu?.giaBaoHiem?.formatPrice(),
      ...rest,
    }),
    ColumnInput({
      title: "Đơn giá không BH",
      dataIndex: "dichVu.giaKhongBaoHiem",
      formatPrice: true,
      width: 150,
      render: (_, data) => data.dichVu?.giaKhongBaoHiem?.formatPrice(),
      ...rest,
    }),
    ColumnInput({
      title: "Phụ thu",
      dataIndex: "dichVu.giaPhuThu",
      formatPrice: true,
      width: 150,
      render: (_, data) => data?.dichVu?.giaPhuThu?.formatPrice(),
      ...rest,
    }),
    ColumnSelect({
      title: "ĐVT",
      dataIndex: "donViTinhId",
      searchKey: "dichVu.donViTinhId",
      sortKey: "dichVu.donViTinh.ten",
      dataSelect: listAllDonViTinh,
      width: 150,
      render: (_, data) => data?.dichVu?.donViTinh?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nhóm dịch vụ cấp 1",
      dataIndex: "nhomDichVuCap1Id",
      searchKey: "dichVu.nhomDichVuCap1Id",
      sortKey: "dichVu.nhomDichVuCap1Id",
      dataSelect: listAllNhomDichVuCap1,
      width: 250,
      render: (_, data) => data?.dichVu?.nhomDichVuCap1?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nhóm dịch vụ cấp 2",
      dataIndex: "nhomDichVuCap2Id",
      searchKey: "dichVu.nhomDichVuCap2Id",
      sortKey: "dichVu.nhomDichVuCap2Id",
      dataSelect: listAllNhomDichVuCap2,
      width: 250,
      render: (_, data) => data?.dichVu?.nhomDichVuCap2?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nhóm dịch vụ cấp 3",
      dataIndex: "nhomDichVuCap3Id",
      searchKey: "dichVu.nhomDichVuCap3Id",
      sortKey: "dichVu.nhomDichVuCap3Id",
      dataSelect: listAllNhomDichVuCap3,
      width: 250,
      render: (_, data) => data?.dichVu?.nhomDichVuCap3?.ten,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({
    form,
    editStatus,
    refAutoFocus,
    autoFocus,
    dataEditDefault,
  }) => {
    const { nhomDichVuCap2, nhomDichVuCap3 } = dataEditDefault?.dichVu || {};

    return (
      <>
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

        <Form.Item label="Đơn giá BH" name="giaBaoHiem">
          <InputTimeout
            formatPrice={true}
            type="number"
            placeholder="Vui lòng nhập đơn giá BH"
            className="input-option"
          />
        </Form.Item>
        <Form.Item
          label="Đơn giá không BH"
          name="giaKhongBaoHiem"
          rules={[
            {
              required: true,
              message: `Vui lòng nhập đơn giá không BH!`,
            },
          ]}
        >
          <InputTimeout
            formatPrice={true}
            type="number"
            placeholder="Vui lòng nhập không BH"
            className="input-option"
          />
        </Form.Item>
        <Form.Item label="Phụ thu" name="giaPhuThu">
          <InputTimeout
            formatPrice={true}
            type="number"
            placeholder="Vui lòng nhập Phụ thu"
            className="input-option"
          />
        </Form.Item>

        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
            >
              ĐVT
            </div>
          }
          name="donViTinhId"
        >
          <Select
            data={listAllDonViTinh}
            placeholder="Vui lòng chọn đơn vị tính"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
            >
              Nhóm DV Cấp 1
            </div>
          }
          name="nhomDichVuCap1Id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhóm dịch vụ cấp 1",
            },
          ]}
        >
          <Select
            placeholder="Vui lòng chọn nhóm dịch vụ cấp 1"
            data={listAllNhomDichVuCap1}
            onChange={(e) => {
              if (e) {
                getAllTongHopDichVuCap2({ nhomDichVuCap1Id: e });
              } else {
                getAllTongHopDichVuCap2();
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
            >
              Nhóm DV Cấp 2
            </div>
          }
          name="nhomDichVuCap2Id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhóm dịch vụ cấp 2",
            },
          ]}
        >
          <Select
            placeholder="Vui lòng chọn nhóm dịch vụ cấp 2"
            data={[
              ...(nhomDichVuCap2 ? [nhomDichVuCap2] : []),
              ...listAllNhomDichVuCap2.filter(
                (i) => i.id !== nhomDichVuCap2?.id
              ),
            ]}
            onChange={(e) => {
              if (e) {
                getAllTongHopDichVuCap3({ nhomDichVuCap2Id: e });
              } else {
                getAllTongHopDichVuCap3();
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
            >
              Nhóm DV Cấp 3
            </div>
          }
          name="nhomDichVuCap3Id"
        >
          <Select
            placeholder="Vui lòng chọn nhóm dịch vụ cấp 3"
            data={[
              ...(nhomDichVuCap3 ? [nhomDichVuCap3] : []),
              ...listAllNhomDichVuCap3.filter(
                (i) => i.id !== nhomDichVuCap3?.id
              ),
            ]}
          />
        </Form.Item>
        {/* <Form.Item label="Trường hợp kê DV" name="doiTuongSuDung">
          <Select
            placeholder="Vui lòng chọn trường hợp kê dv"
            data={listDoiTuongSuDung}
          />
        </Form.Item> */}
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  const mapToBody = (data) => ({
    dichVu: {
      ...data,
      loaiDichVu: 50,
    },
  });

  const mapToForm = ({ dichVu } = {}) => dichVu;

  return (
    <BaseDmWrap
      titleTable="Danh mục Dịch vụ ăn"
      titleMain={nameScreen}
      getColumns={getColumns}
      renderForm={renderForm}
      roleName="DICH_VU_AN"
      mapToBody={mapToBody}
      mapToForm={mapToForm}
      // classNameForm={"form-custom--one-line"}
      storeName="dichVuAn"
    />
  );
};

export default DichVuAn;
