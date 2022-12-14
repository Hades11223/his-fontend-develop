import { Checkbox, Form, Image, Input, InputNumber, Tooltip } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import ElementFormTable from "../../../../components/common/ElementFormTable/v2";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";
import phongProvider from "data-access/categories/dm-phong-provider";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import { YES_NO } from "../../../../constants";
import { InputNumberFormat } from "components/common";
import { MemoSelectPhong, MemoSelectLieuDung, MemoSelectDv } from "./memoInput";

const mapData = (i) => ({
  value: i.id,
  label: i.ten,
});

const DichVuTrongGoi = ({
  listVaiTroKiemKe,
  listAllNhanVien,
  _page,
  _size,
  _totalElements,
  _listDataTongHop,
  _dataEdit,
  _dataSelect,
  _dataSort,
  _dataSearch,
  _createOrEdit,
  _onDelete,
  updateData,
  getUtils,
  _getListTongHop,
  roleEdit,
  ...props
}) => {
  const refTimeout = useRef();
  const [state, _setState] = useState({});
  const setState = (data) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      _setState((pre) => ({ ...pre, ...data }));
    }, [500]);
  };

  const onRowSelect = ({ record }) => {
    _setState({
      phanTramGiamGia: record?.phanTramGiamGia,
      tienGiamGia: record?.phanTramGiamGia ? null : record?.tienGiamGia,
    });
  };

  useEffect(() => {
    getUtils({ name: "doiTuong" });
  }, []);
  const addParam = useMemo(
    () => ({ dsLoaiDichVu: _dataEdit.dsLoaiDichVu }),
    [_dataEdit.dsLoaiDichVu]
  );

  const getColumns = ({
    onClickSort,
    onChange,
    onDelete,
    onSearchInput,
    dataSort,
    dataSelect,
    form,
  }) => {
    const onChangeCheckbox = (key) => (e) => {
      if (
        key === "tuTra" &&
        e.target.checked &&
        form.getFieldValue("khongTinhTien")
      ) {
        form.setFieldsValue({ khongTinhTien: false, tuTra: true });
      } else if (
        key === "khongTinhTien" &&
        e.target.checked &&
        form.getFieldValue("tuTra")
      ) {
        form.setFieldsValue({ tuTra: false, khongTinhTien: true });
      }
    };

    const validator = (rule, value, callback) => {
      if (value > form.getFieldValue("soLuong")) {
        return Promise.reject(
          "Kh??ng ???????c nh???p S??? l?????ng m???c ?????nh l???n h??n S??? l?????ng khai b??o"
        );
      }
      return Promise.resolve();
    };
    return [
      {
        title: <HeaderSearch title="STT" />,
        width: 30,
        dataIndex: "index",
        key: "index",
        align: "center",
        render: (_, __, index) => index + 1,
      },
      {
        title: (
          <HeaderSearch
            title="T??n d???ch v???"
            sort_key="tenDichVu"
            onClickSort={onClickSort}
            dataSort={dataSort["tenDichVu"]}
            searchSelect={
              <Input
                placeholder="T??m t??n d???ch v???"
                onChange={onSearchInput("tenDichVu")}
              />
            }
          />
        ),
        width: 250,
        dataIndex: "tenDichVu",
        key: "tenDichVu",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="dichVuId"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n d???ch v???",
                  },
                ]}
              >
                <MemoSelectDv
                  api={dichVuProvider.searchAll}
                  mapData={mapData}
                  onChange={onChange("dichVuId")}
                  // value={_state.dsNhomDvKhoCap1Id}
                  keySearch={"ten"}
                  placeholder={"Ch???n nh??m h??ng h??a"}
                  className="input-filter"
                  addParam={addParam}
                  blurReset={true}
                  dataSelect={dataSelect}
                />
              </Form.Item>
            );
          } else return item;
        },
      },
      {
        title: (
          <HeaderSearch
            title="S??? l?????ng"
            sort_key="soLuong"
            onClickSort={onClickSort}
            dataSort={dataSort["soLuong"]}
            searchSelect={
              <InputNumber
                placeholder="T??m s??? l?????ng"
                onChange={onSearchInput("soLuong")}
              />
            }
          />
        ),
        width: 150,
        dataIndex: "soLuong",
        key: "soLuong",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p s??? l?????ng",
                  },
                ]}
                initialValue={1}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  // value={_dataSelect?.hoVaTen}
                  placeholder="Nh???p s??? l?????ng"
                  min={0}
                  onChange={onChange("soLuong")}
                />
              </Form.Item>
            );
          } else return data.soLuong;
        },
      },
      {
        title: (
          <HeaderSearch
            title="S??? l?????ng m???c ?????nh"
            sort_key="soLuongMacDinh"
            onClickSort={onClickSort}
            dataSort={dataSort["soLuongMacDinh"]}
            searchSelect={
              <InputNumber
                placeholder="T??m s??? l?????ng"
                onChange={onSearchInput("soLuongMacDinh")}
              />
            }
          />
        ),
        width: 150,
        dataIndex: "soLuongMacDinh",
        key: "soLuongMacDinh",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="soLuongMacDinh"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p s??? l?????ng",
                  },
                  { validator: validator },
                ]}
                initialValue={1}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  // value={_dataSelect?.hoVaTen}
                  placeholder="Nh???p s??? l?????ng"
                  min={0}
                  onChange={onChange("soLuongMacDinh")}
                />
              </Form.Item>
            );
          } else return data.soLuongMacDinh;
        },
      },
      {
        title: (
          <HeaderSearch
            title="????n gi?? kh??ng BH"
            sort_key="giaKhongBaoHiem"
            onClickSort={onClickSort}
            dataSort={dataSort["giaKhongBaoHiem"]}
            searchSelect={
              <InputNumber
                placeholder="T??m gi??"
                onChange={onSearchInput("giaKhongBaoHiem")}
              />
            }
          />
        ),
        width: 150,
        dataIndex: "giaKhongBaoHiem",
        key: "giaKhongBaoHiem",
        align: "right",
        render: (item, data) => {
          return item && item?.formatPrice();
        },
      },
      // {
      //   title: (
      //     <HeaderSearch
      //       title="% mi???n gi???m"
      //       sort_key="phanTramGiamGia"
      //       onClickSort={onClickSort}
      //       dataSort={dataSort["phanTramGiamGia"]}
      //       searchSelect={
      //         <InputNumber
      //           placeholder="T??m s??? l?????ng"
      //           onChange={onSearchInput("phanTramGiamGia")}
      //         />
      //       }
      //     />
      //   ),
      //   width: 150,
      //   dataIndex: "phanTramGiamGia",
      //   key: "phanTramGiamGia",
      //   render: (item, data) => {
      //     if (data?.id === dataSelect?.id) {
      //       return (
      //         <Form.Item name="phanTramGiamGia">
      //           <InputNumber
      //             style={{ width: "100%" }}
      //             // value={_dataSelect?.hoVaTen}
      //             placeholder="Nh???p s??? l?????ng"
      //             min={0}
      //             disabled={state.tienGiamGia}
      //             onChange={(e) => {
      //               onChange("phanTramGiamGia")(e);
      //               setState({ phanTramGiamGia: e });
      //             }}
      //           />
      //         </Form.Item>
      //       );
      //     } else return data.phanTramGiamGia;
      //   },
      // },
      // {
      //   title: (
      //     <HeaderSearch
      //       title="Ti???n mi???n gi???m"
      //       sort_key="tienGiamGia"
      //       onClickSort={onClickSort}
      //       dataSort={dataSort["tienGiamGia"]}
      //       searchSelect={
      //         <InputNumber
      //           placeholder="T??m gi??"
      //           onChange={onSearchInput("tienGiamGia")}
      //         />
      //       }
      //     />
      //   ),
      //   width: 150,
      //   dataIndex: "tienGiamGia",
      //   key: "tienGiamGia",
      //   align: "right",
      //   render: (item, data) => {
      //     if (data?.id === dataSelect?.id) {
      //       return (
      //         <Form.Item name="tienGiamGia">
      //           <InputNumberFormat
      //             placeholder="Nh???p gi??"
      //             min={0}
      //             disabled={state.phanTramGiamGia}
      //             onChange={(e) => {
      //               onChange("tienGiamGia")(e);
      //               setState({ tienGiamGia: e.target.value });
      //             }}
      //           />
      //         </Form.Item>
      //       );
      //     } else return data.tienGiamGia?.formatPrice();
      //   },
      // },
      // {
      //   title: (
      //     <HeaderSearch
      //       title="Ti???n mi???n gi???m g??i"
      //       sort_key="tienGiamGiaGoiDv"
      //       onClickSort={onClickSort}
      //       dataSort={dataSort["tienGiamGiaGoiDv"]}
      //       searchSelect={
      //         <InputNumber
      //           placeholder="T??m gi??"
      //           onChange={onSearchInput("tienGiamGiaGoiDv")}
      //         />
      //       }
      //     />
      //   ),
      //   width: 170,
      //   dataIndex: "tienGiamGiaGoiDv",
      //   key: "tienGiamGiaGoiDv",
      //   align: "right",
      //   render: (item, data) => {
      //     if (data?.id === dataSelect?.id) {
      //       return (
      //         <Form.Item name="tienGiamGiaGoiDv">
      //           <InputNumberFormat
      //             placeholder="Nh???p gi??"
      //             min={0}
      //             onChange={(e) => {
      //               onChange("tienGiamGiaGoiDv")(e);
      //               setState({ tienGiamGiaGoiDv: e.target.value });
      //             }}
      //           />
      //         </Form.Item>
      //       );
      //     } else return data.tienGiamGiaGoiDv?.formatPrice();
      //   },
      // },
      {
        title: (
          <HeaderSearch
            title="Ph??ng"
            sort_key="phong.ten"
            onClickSort={onClickSort}
            dataSort={dataSort["phong.ten"]}
            searchSelect={
              <Input
                placeholder="T??m t??n ph??ng"
                onChange={onSearchInput("phong.ten")}
              />
            }
          />
        ),
        width: 250,
        dataIndex: "phong",
        key: "phong",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item name="phongId">
                <MemoSelectPhong
                  api={phongProvider.searchAll}
                  mapData={mapData}
                  onChange={onChange("phongId")}
                  keySearch={"ten"}
                  placeholder={"Ch???n ph??ng"}
                  className="input-filter"
                  blurReset={true}
                  dataSelect={dataSelect}
                />
              </Form.Item>
            );
          } else return data.tenPhong;
        },
      },
      {
        title: (
          <HeaderSearch
            title="Li???u d??ng - c??ch d??ng"
            sort_key="lieuDung.ten"
            onClickSort={onClickSort}
            dataSort={dataSort["lieuDung.ten"]}
            searchSelect={
              <Input
                placeholder="T??m t??n li???u d??ng"
                onChange={onSearchInput("lieuDung.ten")}
              />
            }
          />
        ),
        width: 250,
        dataIndex: "lieuDung",
        key: "lieuDung",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item name="lieuDungId">
                <MemoSelectLieuDung
                  api={lieuDungProvider.searchAll}
                  mapData={mapData}
                  onChange={onChange("lieuDungId")}
                  keySearch={"ten"}
                  placeholder={"Ch???n li???u d??ng"}
                  className="input-filter"
                  blurReset={true}
                  dataSelect={dataSelect}
                />
              </Form.Item>
            );
          } else return data.lieuDung?.ten;
        },
      },
      {
        title: (
          <HeaderSearch
            title="Kh??ng t??nh ti???n"
            sort_key="khongTinhTien"
            onClickSort={onClickSort}
            dataSort={dataSort["khongTinhTien"]}
            searchSelect={
              <Select
                data={YES_NO}
                placeholder="Ch???n kh??ng t??nh ti???n"
                defaultValue=""
                onChange={onSearchInput("khongTinhTien")}
              />
            }
          />
        ),
        width: 150,
        dataIndex: "khongTinhTien",
        key: "khongTinhTien",
        align: "center",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item name="khongTinhTien" valuePropName="checked">
                <Checkbox onChange={onChangeCheckbox("khongTinhTien")} />
              </Form.Item>
            );
          } else return <Checkbox checked={data.khongTinhTien} />;
        },
      },
      {
        title: (
          <HeaderSearch
            title="T??? tr???"
            sort_key="tuTra"
            onClickSort={onClickSort}
            dataSort={dataSort["tuTra"]}
            searchSelect={
              <Select
                data={YES_NO}
                placeholder="Ch???n t??? tr???"
                defaultValue=""
                onChange={onSearchInput("tuTra")}
              />
            }
          />
        ),
        width: 150,
        dataIndex: "tuTra",
        key: "tuTra",
        align: "center",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item name="tuTra" valuePropName="checked">
                <Checkbox onChange={onChangeCheckbox("tuTra")} />
              </Form.Item>
            );
          } else return <Checkbox checked={data.tuTra} />;
        },
      },
      {
        title: (
          <HeaderSearch
            searchSelect={
              <Select
                data={HIEU_LUC}
                placeholder="Ch???n hi???u l???c"
                defaultValue=""
                onChange={onSearchInput("active")}
              />
            }
            sort_key="active"
            onClickSort={onClickSort}
            dataSort={dataSort.active}
            title="C?? hi???u l???c"
          />
        ),
        width: 150,
        dataIndex: "active",
        key: "active",
        align: "center",
        render: (item, data) => {
          if (data?.id === dataSelect?.id) {
            return (
              <Form.Item
                name="active"
                initialValue={true}
                valuePropName="checked"
              >
                <Checkbox onChange={onChange("active")} />
              </Form.Item>
            );
          } else return <Checkbox checked={item} />;
        },
      },
      {
        title: <HeaderSearch title="Ti???n ??ch" />,
        width: 70,
        key: "actions",
        align: "center",
        render: (_, item) => {
          return dataSelect?.id === "" ? (
            <></>
          ) : (
            <Tooltip title="X??a">
              <Image
                preview={false}
                src={require("assets/images/his-core/iconDelete.png")}
                onClick={() => {
                  onDelete(item);
                }}
              />
            </Tooltip>
          );
        },
      },
    ];
  };

  const customCreateOrEdit = (values, { dataEdit, resetField, prevent }) => {
    if (prevent) return;
    const dataSubmit = {
      ...values,
      id: dataEdit?.id,
      goiDvId: _dataEdit?.id,
      tienGiamGia: dataEdit.tienGiamGia
        ? (dataEdit.tienGiamGia + "")?.replaceAll(".", "")
        : null,
    };
    return _createOrEdit(dataSubmit);
  };

  return (
    <ElementFormTable
      title="D???ch v??? trong g??i"
      dataEdit={_dataEdit}
      getColumns={getColumns}
      dataSort={_dataSort}
      dataSource={_listDataTongHop}
      updateData={updateData}
      page={_page}
      size={_size}
      totalElements={_totalElements}
      dataSelect={_dataSelect}
      dataSearch={_dataSearch}
      createOrEdit={customCreateOrEdit}
      getData={_getListTongHop}
      // roleSave={[ROLES["DANH_MUC"].HOI_DONG_THEM]}
      roleEdit={roleEdit}
      onDelete={_onDelete}
      onRowSelect={onRowSelect}
      {...props}
    />
  );
};

export default connect(
  ({
    goiDV: { _dataEdit },
    goiDVChiTiet: {
      _page,
      _size,
      _totalElements,
      _dataSelect,
      _dataSort,
      _dataSearch,
      _listDataTongHop,
    },
    nhanVien: { listAllNhanVien },
    utils: { listVaiTroKiemKe },
  }) => ({
    _page,
    _size,
    _totalElements,
    _dataSelect,
    _listDataTongHop,
    _dataEdit,
    _dataSort,
    _dataSearch,
    listVaiTroKiemKe,
    listAllNhanVien,
  }),
  ({
    goiDVChiTiet: { _getListTongHop, _createOrEdit, updateData, _onDelete },
    utils: { getUtils },
  }) => ({
    _getListTongHop,
    updateData,
    _createOrEdit,
    getUtils,
    _onDelete,
  })
)(DichVuTrongGoi);
