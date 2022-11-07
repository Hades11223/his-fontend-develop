import React from "react";
import { Input, Form, InputNumber } from "antd";
import { Main } from "./styled";
import FormWraper from "components/FormWraper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
const XML3 = ({ form3, state, setState, id }) => {
  const { getList, updateData, onSizeChange, onSortChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml3;
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml3
  );

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="MA_LK"
          sort_key="maLk"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maLk"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_LK",
      key: "MA_LK",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_NHOM"
          sort_key="maNhom"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maNhom"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_NHOM",
      key: "MA_NHOM",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DON_VI_TINH"
          sort_key="donViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["donViTinh"] || 0}
        />
      ),
      width: 150,
      dataIndex: "DON_VI_TINH",
      key: "DON_VI_TINH",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TEN_DICH_VU"
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDichVu"] || 0}
        />
      ),
      width: 150,
      dataIndex: "TEN_DICH_VU",
      key: "TEN_DICH_VU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SO_LUONG"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || 0}
        />
      ),
      width: 150,
      dataIndex: "SO_LUONG",
      key: "SO_LUONG",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DON_GIA"
          sort_key="donGia"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["donGia"] || 0}
        />
      ),
      width: 150,
      dataIndex: "DON_GIA",
      key: "DON_GIA",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TYLE_TT"
          sort_key="tyLeTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tyLeTt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "TYLE_TT",
      key: "TYLE_TT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="THANH_TIEN"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || 0}
        />
      ),
      width: 150,
      dataIndex: "THANH_TIEN",
      key: "THANH_TIEN",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_BNTT"
          sort_key="tBntt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tBntt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_BNTT",
      key: "T_BNTT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_BHTT"
          sort_key="tBhtt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tBhtt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_BHTT",
      key: "T_BHTT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_BNCCT"
          sort_key="tBncct"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tBncct"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_BNCCT",
      key: "T_BNCCT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_NGOAIDS"
          sort_key="tNgoaiDs"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tNgoaiDs"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_NGOAIDS",
      key: "T_NGOAIDS",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_NGUONKHAC"
          sort_key="tNguonKhac"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tNguonKhac"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_NGUONKHAC",
      key: "T_NGUONKHAC",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_TRANTT"
          sort_key="tTranTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tTranTt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "T_TRANTT",
      key: "T_TRANTT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_VAT_TU"
          sort_key="maVatTu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maVatTu"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_VAT_TU",
      key: "MA_VAT_TU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TEN_VAT_TU"
          sort_key="tenVatTu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenVatTu"] || 0}
        />
      ),
      width: 150,
      dataIndex: "TEN_VAT_TU",
      key: "TEN_VAT_TU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_GIUONG"
          sort_key="maGiuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maGiuong"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_GIUONG",
      key: "MA_GIUONG",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_DICH_VU"
          sort_key="maDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maDichVu"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_DICH_VU",
      key: "MA_DICH_VU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="NGAY_YL"
          sort_key="ngayYl"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayYl"] || 0}
        />
      ),
      width: 150,
      dataIndex: "NGAY_YL",
      key: "NGAY_YL",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="NGAY_KQ"
          sort_key="ngayKq"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayKq"] || 0}
        />
      ),
      width: 150,
      dataIndex: "NGAY_KQ",
      key: "NGAY_KQ",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="GOI_VTYT"
          sort_key="goiVtyt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["goiVtyt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "GOI_VTYT",
      key: "GOI_VTYT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_KHOA"
          sort_key="maKhoa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maKhoa"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_KHOA",
      key: "MA_KHOA",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TEN_KHOA"
          sort_key="tenKhoa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenKhoa"] || 0}
        />
      ),
      width: 150,
      dataIndex: "tenKhoa",
      key: "tenKhoa",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_BAC_SI"
          sort_key="maBacSi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maBacSi"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_BAC_SI",
      key: "MA_BAC_SI",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_PTTT"
          sort_key="maPttt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maPttt"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_PTTT",
      key: "MA_PTTT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_BENH"
          sort_key="maBenh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maBenh"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_BENH",
      key: "MA_BENH",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TT_THAU"
          sort_key="thongTinThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thongTinThau"] || 0}
        />
      ),
      width: 150,
      dataIndex: "TT_THAU",
      key: "TT_THAU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="PHAM_VI"
          sort_key="phamVi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phamVi"] || 0}
        />
      ),
      width: 150,
      dataIndex: "PHAM_VI",
      key: "PHAM_VI",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MUC_HUONG"
          sort_key="mucHuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["mucHuong"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MUC_HUONG",
      key: "MUC_HUONG",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="BV"
          // sort_key="bv"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["bv"] || 0}
        />
      ),
      width: 150,
      dataIndex: "BV",
      key: "BV",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="XML1"
          sort_key="nb79aXml1Id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nb79aXml1Id"] || 0}
        />
      ),
      width: 150,
      dataIndex: "nb79aXml1Id",
      key: "nb79aXml1Id",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DV tổng hợp"
          sort_key="nbDichVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nbDichVuId"] || 0}
        />
      ),
      width: 150,
      dataIndex: "nbDichVuId",
      key: "nbDichVuId",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thông tin DL lỗi"
          sort_key="thongTinDlLoi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thongTinDlLoi"] || 0}
        />
      ),
      width: 150,
      dataIndex: "thongTinDlLoi",
      key: "thongTinDlLoi",
      render: (item) => {
        return item;
      },
    },
  ];
  const onChangePage = (page) => {
    // getList({ page: page - 1 });
    getList({ id, activeKeyTab: "3", page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ id, activeKeyTab: "3", size });
  };
  const onRow = (record, index) => {
    return {
      onClick: async (event) => {
        await setState({
          selectedRow: record,
        });
        await updateData({ dataCurrent: record });
        await form3.setFieldsValue(record);
      },
    };
  };
  return (
    <Main>
      {state.selectedRow ? (
        <>
          <div
            className={"button-list"}
            onClick={() => setState({ selectedRow: null })}
          >
            Xem danh sách <img src={require("assets/images/utils/files.png")} />
          </div>

          <FormWraper
            readOnly={!state.saveState}
            form={form3}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item label="MA_LK" name="MA_LK">
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item label="MA_NHOM" name="MA_NHOM">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập MA_NHOM"
              />
            </Form.Item>
            <Form.Item label="DON_VI_TINH" name="DON_VI_TINH">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập DON_VI_TINH"
              />
            </Form.Item>
            <Form.Item label="TEN_DICH_VU" name="TEN_DICH_VU">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập TEN_DICH_VU"
              />
            </Form.Item>
            <Form.Item
              label="SO_LUONG"
              name="SO_LUONG"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập SO_LUONG!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập SO_LUONG"
              />
            </Form.Item>
            <Form.Item
              label="DON_GIA"
              name="DON_GIA"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập DON_GIA!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập DON_GIA"
              />
            </Form.Item>
            <Form.Item label="TYLE_TT" name="TYLE_TT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập TYLE_TT"
              />
            </Form.Item>
            <Form.Item label="THANH_TIEN" name="THANH_TIEN">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập THANH_TIEN"
              />
            </Form.Item>
            <Form.Item label="T_BNTT" name="T_BNTT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_BNTT"
              />
            </Form.Item>
            <Form.Item label="T_BHTT" name="T_BHTT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_BHTT"
              />
            </Form.Item>
            <Form.Item label="T_BNCCT" name="T_BNCCT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_BNCCT"
              />
            </Form.Item>
            <Form.Item label="T_NGOAIDS" name="T_NGOAIDS">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_NGOAIDS"
              />
            </Form.Item>
            <Form.Item label="T_NGUONKHAC" name="T_NGUONKHAC">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_NGUONKHAC"
              />
            </Form.Item>
            <Form.Item label="T_TRANTT" name="T_TRANTT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập T_TRANTT"
              />
            </Form.Item>
            <Form.Item label="MA_VAT_TU" name="MA_VAT_TU">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_VAT_TU"
              />
            </Form.Item>
            <Form.Item label="TEN_VAT_TU" name="TEN_VAT_TU">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập TEN_VAT_TU"
              />
            </Form.Item>
            <Form.Item label="MA_GIUONG" name="MA_GIUONG">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_GIUONG"
              />
            </Form.Item>
            <Form.Item label="MA_DICH_VU" name="MA_DICH_VU">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_DICH_VU"
              />
            </Form.Item>
            <Form.Item label="NGAY_YL" name="NGAY_YL">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập NGAY_YL"
              />
            </Form.Item>
            <Form.Item label="NGAY_KQ" name="NGAY_KQ">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập NGAY_KQ"
              />
            </Form.Item>
            <Form.Item label="GOI_VTYT" name="GOI_VTYT">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập GOI_VTYT"
              />
            </Form.Item>
            <Form.Item></Form.Item>
            {/* ----------------------------------------------------------------------- */}
            <Form.Item style={{ marginTop: 25 }} label="MA_KHOA" name="MA_KHOA">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_KHOA"
              />
            </Form.Item>
            <Form.Item
              style={{ marginTop: 25 }}
              label="TEN_KHOA"
              name="tenKhoa"
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item label="MA_BAC_SI" name="MA_BAC_SI">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_BAC_SI"
              />
            </Form.Item>
            <Form.Item label="MA_PTTT" name="MA_PTTT">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập MA_PTTT"
              />
            </Form.Item>
            <Form.Item label="MA_BENH" name="MA_BENH">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_BENH"
              />
            </Form.Item>
            <Form.Item label="TT_THAU" name="TT_THAU">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập TT_THAU"
              />
            </Form.Item>
            <Form.Item label="PHAM_VI" name="PHAM_VI">
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập PHAM_VI"
              />
            </Form.Item>
            <Form.Item label="MUC_HUONG" name="MUC_HUONG">
              <InputNumber className="input-option" />
            </Form.Item>
            {/* ----------------------------------------------------------------------- */}
            <Form.Item
              style={{ marginTop: 25 }}
              label="Mã BV"
              name="maBenhVien"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Mã BV!",
                },
              ]}
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item
              style={{ marginTop: 25 }}
              label="XML1"
              name="nb79aXml1Id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập XML1!",
                },
              ]}
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item
              label="DV tổng hợp"
              name="nbDichVuId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập DV tổng hợp!",
                },
              ]}
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item label="Thông tin DL lỗi" name="thongTinDlLoi">
              <Input disabled={true} className="input-option" />
            </Form.Item>
          </FormWraper>
        </>
      ) : (
        <>
          <TableWrapper
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            columns={columns}
            dataSource={listData}
            onRow={onRow}
          />
          {!!totalElements && (
            <Pagination
              listData={listData}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
            />
          )}
        </>
      )}
    </Main>
  );
};

export default XML3;
