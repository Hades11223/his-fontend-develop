import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import { HeaderSearch } from "components";
import BaseDm from "components/BaseDm";
import SelectCustome from "components/Select";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import { Main } from "./styled";

const { Option } = Select;

// tododanhmuc

const Index = ({
  listQuayTiepDon,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  searchQuayTiepDon,
  createOrEdit,
  onDelete,
  getUtils,
  listdoiTuongPhucVu,
  getListAllLoaGoiSo,
  getListAllKhoa,
  getListToaNha,
  listToaNha,
  getListAllToaNha,
  listAllToaNha,
  listAllLoaGoiSo,
  listAllKhoa,
}) => {
  const [doiTuong, setDoiTuong] = useState([]);
  const [uuTien, setUuTien] = useState([]);
  const [renderLoad, setRenderLoad] = useState(false);
  const customeSelect = {
    textAlign: "right",
  };

  const setDefaultForm = ({ form }) => {
    form.setFieldsValue({ soLuongHangDoi: 1 });
  };

  useEffect(() => {
    getUtils({ name: "doiTuongPhucVu" });
    getListAllLoaGoiSo();
    getListAllKhoa();
    getListAllToaNha({ page: 0, active: true, size: 500 });
  }, []);

  const getlistdsDoiTuong = (item) => {
    let res = listdoiTuongPhucVu.map((el) => {
      if (item && item.some((e) => e && e.doiTuong === el.id)) {
        return el.ten;
      }
    });
    return (res.length && res) || [];
  };
  const onUpdateData = (form, item, type, current) => {
    if (type === "uuTien") {
      let arr = [...uuTien];
      let currentIndex = arr.findIndex(
        (el) => Object.values(el)[0] === current
      );
      if (currentIndex !== -1) {
        arr[currentIndex] = { [item]: current };
      } else {
        arr.push({ [item]: current });
      }
      setUuTien(arr);
      form.setFieldsValue({ [type]: arr });
    } else {
      let currentItem;
      if (item.length < uuTien.length) {
        currentItem = uuTien.filter((e) =>
          item.some((el) => el === +Object.values(e)[0])
        );
      } else {
        currentItem = item.reduce(
          (arr, cur) =>
            uuTien.some((el) => +Object.values(el)[0] === cur)
              ? [
                  ...arr,
                  {
                    [`${
                      Object.keys(
                        uuTien[
                          uuTien.findIndex((el) => Object.values(el)[0] === cur)
                        ]
                      )[0]
                    }`]: cur,
                  },
                ]
              : [...arr, { 1: cur }],
          []
        );
      }
      setUuTien(currentItem);
      setDoiTuong(item);
      form.setFieldsValue({ [type]: item });
    }
  };
  const getColumns = ({
    baseColumns = {},
    onClickSort,
    dataSortColumn,
    onSearchInput,
  }) => [
    baseColumns.stt,
    {
      title: (
        <HeaderSearch
          title="M?? qu???y ti???p ????n"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m M?? qu???y ti???p ????n"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n qu???y ti???p ????n"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m T??n qu???y ti???p ????n"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="S??? l?????ng h??ng ?????i"
          sort_key="soLuongHangDoi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongHangDoi || 0}
          search={
            <Input
              type="number"
              placeholder="T??m s??? l?????ng h??ng ?????i"
              onChange={(e) => {
                onSearchInput(e.target.value, "soLuongHangDoi");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongHangDoi",
      key: "soLuongHangDoi",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoa.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoa.ten"] || 0}
          search={
            <Input
              placeholder="T??m khoa"
              onChange={(e) => {
                onSearchInput(e.target.value, "khoa.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??a nh??"
          sort_key="toaNha.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["toaNha.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??a nh??"
              onChange={(e) => {
                onSearchInput(e.target.value, "toaNha.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "toaNha",
      key: "toaNha",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loa g???i s???"
          sort_key="loaGoiSo.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaGoiSo.ten"] || 0}
          search={
            <Input
              placeholder="T??m loa g???i s???"
              onChange={(e) => {
                onSearchInput(e.target.value, "loaGoiSo.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaGoiSo",
      key: "loaGoiSo",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DS ?????i t?????ng"
          // onClickSort={onClickSort}
          // sort_key="dsDoiTuong"
          // dataSort={dataSort.key === "dsDoiTuong" ? dataSort.value : 0}
          searchSelect={
            <SelectCustome
              placeholder="T??m ds ?????i t?????ng"
              onChange={(e) => {
                onSearchInput(e, "dsLoaiDoiTuong");
              }}
              data={listdoiTuongPhucVu}
              mode="multiple"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsDoiTuong",
      key: "dsDoiTuong",
      render: (item) => {
        return getlistdsDoiTuong(item)
          .filter((item) => !!item)
          .join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <SelectCustome
              onChange={(e) => {
                onSearchInput(e, "active");
              }}
              defaultValue=""
              placeholder={"Ch???n hi???u l???c"}
              data={HIEU_LUC}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="M?? qu???y ti???p ????n"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p m?? qu???y ti???p ????n!",
            },
            {
              max: 20,
              message: "Vui l??ng nh???p m?? qu???y ti???p ????n kh??ng qu?? 20 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p m?? qu???y ti???p ????n!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui l??ng nh???p m?? qu???y ti???p ????n"
          />
        </Form.Item>
        <Form.Item
          label="T??n qu???y ti???p ????n"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n qu???y ti???p ????n!",
            },
            {
              max: 1000,
              message: "Vui l??ng nh???p t??n qu???y ti???p ????n kh??ng qu?? 1000 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p t??n qu???y ti???p ????n!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p t??n qu???y ti???p ????n"
          />
        </Form.Item>
        <Form.Item
          label="S??? l?????ng h??ng ?????i"
          name="soLuongHangDoi"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p s??? l?????ng h??ng ?????i!",
            },
            {
              pattern: new RegExp(/^.{1,2}$/),
              message: "Vui l??ng nh???p s??? l?????ng h??ng ?????i kh??ng qu?? 2 k?? t???!",
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui l??ng nh???p s??? l?????ng h??ng ?????i"
            type="number"
            min={1}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa
            </div>
          }
          name="khoaId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n khoa!",
            },
          ]}
        >
          <SelectCustome placeholder={"Ch???n khoa"} data={listAllKhoa} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              T??a nh??
            </div>
          }
          name="toaNhaId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n t??a nh??!",
            },
          ]}
        >
          <SelectCustome placeholder={"Ch???n t??a nh??"} data={listAllToaNha} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/loa-goi-so")}
            >
              Loa g???i s???
            </div>
          }
          name="loaGoiSoId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n loa g???i s???!",
            },
          ]}
        >
          <SelectCustome
            placeholder={"Ch???n loa g???i s???"}
            data={listAllLoaGoiSo}
          />
        </Form.Item>
        <Form.Item
          label="?????i t?????ng ti???p ????n"
          name="dsDoiTuong"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n ?????i t?????ng ti???p ????n!",
            },
          ]}
        >
          <Checkbox.Group onChange={(e) => onUpdateData(form, e, "dsDoiTuong")}>
            {listdoiTuongPhucVu.map((item) => {
              return (
                <Checkbox value={item.id} key={item.id}>
                  {item.ten}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="M???c ????? ??u ti??n" className="uuTien">
          {listdoiTuongPhucVu.map((item) => {
            return (
              <Select
                autoClearSearchValue
                onChange={(e) => {
                  onUpdateData(form, e, "uuTien", item.id);
                }}
                value={
                  (uuTien.findIndex(
                    (el) => Object.values(el)[0] === item.id
                  ) !== -1 &&
                    +Object.keys(
                      uuTien[
                        uuTien.findIndex(
                          (el) => Object.values(el)[0] === item.id
                        )
                      ]
                    )[0]) ||
                  1
                }
                disabled={!(doiTuong || []).some((el) => el === item.id)}
                key={item.id}
              >
                <Option value={1} style={customeSelect}>
                  M???c 1
                </Option>
                <Option value={2} style={customeSelect}>
                  M???c 2
                </Option>
                <Option value={3} style={customeSelect}>
                  M???c 3
                </Option>
              </Select>
            );
          })}
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>C?? hi???u l???c</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  const customDataBeforeSubmit = (values) => {
    let arr1 = [];
    if (uuTien.length) {
      arr1 = uuTien.reduce(
        (arr, item) => [
          ...arr,
          {
            doiTuong: Object.values(item)[0],
            uuTien: +Object.keys(item)[0],
          },
        ],
        []
      );
    }
    return {
      ...values,
      dsDoiTuong: arr1.filter((item) => item),
    };
  };

  const customShowUpdate =
    ({ form, updateData, setEditStatus, setFieldsValue, callback }) =>
    (data) => {
      let object = (data.dsDoiTuong || []).reduce(
        (arr, cur) => (cur ? [...arr, cur.doiTuong] : [...arr]),
        []
      );
      let el = (data.dsDoiTuong || []).reduce(
        (obj, cur) =>
          cur?.doiTuong ? [...obj, { [cur?.uuTien]: cur?.doiTuong }] : [...obj],
        []
      );
      let dataDt = {
        dsDoiTuong: object,
        uuTien: el,
      };
      setUuTien(el);
      setDoiTuong(object);
      setEditStatus(true);
      updateData({
        dataEditDefault: {
          ...data,
          ...dataDt,
        },
      });
      form.setFieldsValue({ ...data, ...dataDt });
    };

  return (
    <Main>
      <BaseDm
        titleTable="Danh m???c qu???y ti???p ????n"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={searchQuayTiepDon}
        listData={listQuayTiepDon}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].QUAY_THEM]}
        roleEdit={[ROLES["DANH_MUC"].QUAY_SUA]}
        setDefaultForm={setDefaultForm}
        customDataBeforeSubmit={customDataBeforeSubmit}
        customShowUpdate={customShowUpdate}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    quayTiepDon: {
      listQuayTiepDon = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    toaNha: { listToaNha, listAllToaNha },
    loaGoiSo: { listAllLoaGoiSo },
    khoa: { listAllKhoa },
    utils: { listdoiTuongPhucVu = [] },
  } = state;

  return {
    listToaNha,
    listAllToaNha,
    listAllLoaGoiSo,
    listAllKhoa,
    listQuayTiepDon,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listdoiTuongPhucVu,
  };
};
const mapDispatchToProps = ({
  quayTiepDon: { searchQuayTiepDon, createOrEdit, onDelete, updateData },
  utils: { getUtils },
  loaGoiSo: { getListAllLoaGoiSo },
  khoa: { getListAllKhoa },
  toaNha: { getListToaNha, getListAllToaNha },
}) => ({
  searchQuayTiepDon,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
  getListAllLoaGoiSo,
  getListAllKhoa,
  getListToaNha,
  getListAllToaNha,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
