import { Checkbox, Form, Input } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import useListAll from "hook/useListAll";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { combineSort, openInNewTab } from "utils";
import { Main } from "../styled";

// tododanhmuc
// nhóm dv cấp 1
const { ColumnSelect, ColumnInput } = TableWrapper;

const NoiLayBenhPham = ({
  dataEditDefault,
  updateData,
  nhomDichVuCap1,
  getNhomDichVuCap1,
  getAllDichVuCap2,
  listAllNhomDichVuCap2,
}) => {
  const [listAllKhoa] = useListAll("khoa");
  const [listAllToaNha] = useListAll("toaNha");
  const [listAllPhong] = useListAll("phong", {
    loaiPhong: 40,
    sort: combineSort({ active: 2, ten: 1 }),
  });

  useEffect(() => {
    getNhomDichVuCap1({
      path: "/nhom-dich-vu-cap1",
      loaiDichVu: 20,
    }).then((s) => {
      if (s && s?.payload) {
        let xetNghiem = s.payload.nhomDichVuCap1;
        updateData({ dataEditDefault: { tenNhomDichVuCap1: xetNghiem.ten } });
        getAllDichVuCap2({
          page: 0,
          size: 9999,
          nhomDichVuCap1Id: xetNghiem.id,
        });
      } else {
        getAllDichVuCap2({
          page: 0,
          size: 9999,
        });
      }
    });
  }, []);
  const getColumns = ({
    baseColumns,
    onClickSort,
    dataSortColumn,
    onSearchInput,
    ...rest
  }) => [
    baseColumns.stt,
    ColumnSelect({
      title: "Khoa chỉ định",
      dataIndex: "khoaChiDinh",
      sortKey: "khoaChiDinh.ten",
      searchKey: "khoaChiDinhId",
      dataSelect: [{ id: "", ten: "Tất cả" }, ...listAllKhoa],
      onClickSort,
      dataSortColumn,
      onSearchInput,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nhà chỉ định",
      dataIndex: "nhaChiDinh",
      sortKey: "nhaChiDinh.ten",
      searchKey: "nhaChiDinhId",
      dataSelect: [{ id: "", ten: "Tất cả" }, ...listAllToaNha],
      onClickSort,
      dataSortColumn,
      onSearchInput,
      render: (item) => item?.ten,
      ...rest,
    }),
    {
      title: (
        <HeaderSearch
          title="Nhóm DV cấp 2"
          // sort_key="nhomDichVuCap2.ten"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["nhomDichVuCap2.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllNhomDichVuCap2]}
              placeholder="Chọn nhóm DV cấp 2"
              defaultValue=""
              onChange={onSearchInput("nhomDichVuCap2Id")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsNhomDichVuCap2",
      key: "dsNhomDichVuCap2",
      render: (item) => {
        const ten = item?.length ? item.map((ten) => ten.ten).join(",") : "";
        return item?.length ? <span>{ten}</span> : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng lấy mẫu"
          sort_key="phongLayMau.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phongLayMau.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllPhong]}
              placeholder="Chọn phòng lấy mẫu"
              defaultValue=""
              onChange={onSearchInput("phongLayMauId")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "phongLayMau",
      key: "phongLayMau",
      render: (item) => {
        return item && <span>{item?.ten}</span>;
      },
    },
    ColumnInput({
      title: "Địa điểm",
      dataIndex: "diaDiem",
      onClickSort,
      dataSortColumn,
      onSearchInput,
      ...rest,
    }),
    baseColumns.active,
  ];

  const renderForm = ({ form, editStatus, autoFocus, refAutoFocus }) => {
    return (
      <>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa chỉ định
            </div>
          }
          name="khoaChiDinhId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập khoa chỉ định!",
            },
          ]}
        >
          <Select
            data={listAllKhoa}
            placeholder="Chọn khoa chỉ định"
            onChange={(e, list) => {
              form.setFieldsValue({
                nhaChiDinhId: list?.lists?.toaNhaId,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nhà chỉ định
            </div>
          }
          name="nhaChiDinhId"
        >
          <Select data={listAllToaNha} placeholder="Chọn nhà chỉ định" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
            >
              Nhóm DV cấp 1
            </div>
          }
          name="tenNhomDichVuCap1"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nhóm chỉ định cấp 1!",
            },
          ]}
        >
          <Input
            className="input-option"
            value={nhomDichVuCap1?.ten}
            placeholder="Chọn nhập nhóm DV cấp 1"
            disabled
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
            >
              Nhóm DV cấp 2
            </div>
          }
          name="dsNhomDichVuCap2Id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhóm DV cấp 2!",
            },
          ]}
        >
          <Select
            mode="multiple"
            data={listAllNhomDichVuCap2}
            placeholder="Chọn nhóm DV cấp 2"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phong")}
            >
              Phòng lấy mẫu
            </div>
          }
          name="phongLayMauId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phòng lấy mẫu!",
            },
          ]}
        >
          <Select
            data={listAllPhong}
            placeholder="Chọn phòng lấy mẫu"
            onChange={(e, list) => {
              form.setFieldsValue({ diaDiem: list?.lists?.diaDiem });
            }}
          />
        </Form.Item>
        <Form.Item label="Địa điểm" name="diaDiem">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập địa điểm"
            disabled
          />
        </Form.Item>
        <Form.Item label="SL hàng đợi" name="slBanLayBenhPham">
          <Input
            className="input-option"
            placeholder="Vui lòng nhập SL hàng đợi"
          />
        </Form.Item>
        {editStatus && (
          <Form.Item
            name="active"
            valuePropName="checked"
            style={{ marginTop: 32 }}
          >
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <Main>
      <BaseDmWrap
        storeName={"noiLayBenhPham"}
        titleMain={"nơi lấy bệnh phẩm"}
        // titleTable="Danh mục nơi lấy mẫu bệnh phẩm"
        getColumns={getColumns}
        renderForm={renderForm}
        roleName="NOI_LAY_BENH_PHAM"
        initFormValue={{
          tenNhomDichVuCap1:
            dataEditDefault.tenNhomDichVuCap1 ||
            dataEditDefault.nhomDichVuCap1?.ten,
        }}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    noiLayBenhPham: { dataEditDefault },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    thietLap: { nhomDichVuCap1 },
  } = state;

  return {
    dataEditDefault,
    listAllNhomDichVuCap2,
    nhomDichVuCap1,
  };
};
const mapDispatchToProps = ({
  noiLayBenhPham: { searchNoiLayBenhPham, updateData },
  thietLap: { getNhomDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2 },
}) => ({
  searchNoiLayBenhPham,
  updateData,
  getNhomDichVuCap1,
  getAllDichVuCap2,
});

export default connect(mapStateToProps, mapDispatchToProps)(NoiLayBenhPham);
