import React from "react";
import { Checkbox, Form, InputNumber } from "antd";
import { HeaderSearch, Select } from "components";
import BaseDm from "components/BaseDm";
import { HIEU_LUC, PAGE_DEFAULT } from "constants/index";
import useListAll from "hook/useListAll";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  combineSort,
  handleBlurInput,
  handleKeypressInput,
  openInNewTab,
} from "utils";
import { Main } from "./styled";

let timer = null;

const ThietLapChonKho = (props) => {
  const {
    listThietLapChonKho,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  } = useSelector((state) => state.thietLapChonKho);
  const { listAllKho } = useSelector((state) => state.kho);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const { listAllPhong } = useSelector((state) => state.phong);
  const [listChucVu] = useListAll("chucVu");
  const { listAccount } = useSelector((state) => state.adminTaiKhoanHeThong);
  const { listloaiDichVuKho, listdoiTuong } = useSelector(
    (state) => state.utils
  );
  const { listAllLoaiDoiTuong, listLoaiDoiTuong } = useSelector(
    (state) => state.loaiDoiTuong
  );

  const {
    thietLapChonKho: {
      getListThietLapChonKho,
      createOrEdit,
      onDelete,
      updateData,
    },
    kho: { getAllTongHop: getAllKhoTongHop },
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    loaiDoiTuong: { getListAllLoaiDoiTuong, getListLoaiDoiTuong },
    chucVu: { getListChucVu },
    adminTaiKhoanHeThong: { onSearch: getListAccount },
    utils: { getUtils },
  } = useDispatch();
  const [doiTuong, setDoiTuong] = useState();
  const [state, _setState] = useState({
    showFullTable: false,
    listLoaiDv: listloaiDichVuKho,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getAllKhoTongHop({});
    getListAllKhoa();
    getListAllPhong({});
    getListAllLoaiDoiTuong({});
    getListLoaiDoiTuong({ active: "true" });
    getListAccount({ noSize: true });
    getUtils({ name: "loaiDichVuKho" });
    getUtils({ name: "doiTuong" });
  }, []);

  useEffect(() => {
    setState({ listLoaiDv: listloaiDichVuKho });
  }, [listloaiDichVuKho]);

  const YES_NO = [
    { id: null, ten: "Tất cả" },
    { id: true, ten: "Có" },
    { id: false, ten: "Không" },
  ];

  const getColumns = ({
    onClickSort,
    dataSortColumn,
    onSearchInput,
    page,
    size,
  }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      fixed: "left",
      render: (_, __, idx) => page * size + idx + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Kho"
          sort_key="khoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.kho || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAllKho}
              onChange={(value) => {
                onSearchInput(value, "khoId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "kho",
      key: "kho",
      fixed: "left",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          sort_key="khoaChiDinhId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaChiDinhId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "khoaChiDinhId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa NB"
          sort_key="khoaNbId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaNBId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "khoaNbId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "khoaNb",
      key: "khoaNb",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại đối tượng"
          sort_key="loaiDoiTuongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.listAllLoaiDoiTuong || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={[{ id: "", ten: "Tất cả" }, ...(listAllLoaiDoiTuong || [])]}
              onChange={(value) => {
                onSearchInput(value, "loaiDoiTuongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={[{ id: "", ten: "Tất cả" }, ...(listdoiTuong || [])]}
              onChange={(value) => {
                onSearchInput(value, "doiTuong");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        if (item && listdoiTuong) {
          const index = listdoiTuong.findIndex((e) => e.id === item);
          return listdoiTuong[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Nội trú"
              onChange={(value) => {
                onSearchInput(value, "noiTru");
              }}
            />
          }
          sort_key="noiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiTru || 0}
          title="Nội trú"
        />
      ),
      width: 100,
      dataIndex: "noiTru",
      key: "noiTru",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Là cấp cứu"
              onChange={(value) => {
                onSearchInput(value, "capCuu");
              }}
            />
          }
          sort_key="capCuu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.capCuu || 0}
          title="Là cấp cứu"
        />
      ),
      width: 130,
      dataIndex: "capCuu",
      key: "capCuu",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Cận lâm sàng"
              onChange={(value) => {
                onSearchInput(value, "canLamSang");
              }}
            />
          }
          sort_key="canLamSang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.canLamSang || 0}
          title="Cận lâm sàng"
        />
      ),
      width: 150,
      dataIndex: "canLamSang",
      key: "canLamSang",
      align: "center",
      render: (item) => {
        return <div>{YES_NO.find((x) => x.id === item)?.ten}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="phongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.phongId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAllPhong}
              onChange={(value) => {
                onSearchInput(value, "phongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "phong",
      key: "phong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Chức vụ"
          sort_key="chucVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.chucVuId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listChucVu}
              onChange={(value) => {
                onSearchInput(value, "chucVuId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "chucVu",
      key: "chucVu",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tài khoản"
          sort_key="nhanVienId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhanVienId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAccount}
              onChange={(value) => {
                onSearchInput(value, "nhanVienId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "nhanVien",
      key: "nhanVien",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ưu tiên"
          sort_key="uuTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.uuTien || 0}
          search={
            <InputNumber
              placeholder="Tìm kiếm"
              onChange={(value) => {
                onSearchInput(value, "uuTien");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "uuTien",
      key: "uuTien",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 108,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const customOnSearchInput =
    ({ dataSortColumn }) =>
    (value, name) => {
      let nameSearch = "";
      if (name === "noiTru" || name === "canLamSang" || name === "capCuu") {
        nameSearch = `${name}TatCa`;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateData({
          dataSearch: {
            ...dataSearch,
            [name]: value,
            [nameSearch]: value === null || value === undefined ? true : null,
          },
        });
        getListThietLapChonKho({
          ...dataSearch,
          page: PAGE_DEFAULT,
          size,
          [name]: value,
          [nameSearch]: value === null || value === undefined ? true : null,
          sort: combineSort(dataSortColumn),
        });
      }, 300);
    };

  const onChangeField = (form, value, variables) => {
    if ("doiTuong" === variables) {
      if (value) {
        form.setFieldsValue({ loaiDoiTuongId: null });
      }
      setDoiTuong(value);
    }
    if (value == undefined) {
      form.setFieldsValue({ [variables]: null });
    }
  };

  const customSetFieldsValue =
    ({ form }) =>
    (data) => {
      setDoiTuong(data.doiTuong);
      form.setFieldsValue(data);
    };

  const customShowUpdate =
    ({ updateData, setFieldsValue, setEditStatus, form }) =>
    (data) => {
      setState({
        listLoaiDv: listloaiDichVuKho.filter((item) =>
          data.kho?.dsLoaiDichVu?.some((dv) => dv === item.id)
        ),
      });
      setEditStatus(true);
      updateData({ dataEditDefault: data });
      setFieldsValue(data);
    };

  const validator = (rule, value, callback) => {
    if (value) {
      if (Number(value) > 2147483647) {
        callback(new Error("Vui lòng nhập ưu tiên nhỏ hơn 2147483648!"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  const onChange = (key, form) => (value, item) => {
    if (key === "khoId") {
      const { lists } = item;
      const newListLoaiDv = listloaiDichVuKho.filter((ds) =>
        lists.dsLoaiDichVu?.some((dv) => dv === ds.id)
      );
      setState({ listLoaiDv: newListLoaiDv });
      form.setFieldsValue({ loaiDichVu: null });
    }
  };

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Kho"
          name="khoId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn kho!",
            },
          ]}
        >
          <Select
            ref={refAutoFocus}
            placeholder="Tìm kho"
            data={listAllKho}
            autoFocus={true}
            onChange={onChange("khoId", form)}
          />
        </Form.Item>
        <Form.Item
          label="Loại DV"
          name="loaiDichVu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại DV!",
            },
          ]}
        >
          <Select
            placeholder="Vui lòng chọn loại DV"
            data={state.listLoaiDv || []}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa NB
            </div>
          }
          name="khoaNbId"
          initialValue={null}
        >
          <Select
            placeholder="Vui lòng chọn khoa NB"
            data={listAllKhoa || []}
            onChange={(e, list) => onChangeField(form, e, "khoaNbId")}
          />
        </Form.Item>
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
          initialValue={null}
        >
          <Select
            placeholder="Vui lòng chọn khoa chỉ định"
            data={listAllKhoa || []}
            onChange={(e, list) => onChangeField(form, e, "khoaChiDinhId")}
          />
        </Form.Item>
        <Form.Item label="Đối tượng" name="doiTuong" initialValue={null}>
          <Select
            placeholder="Vui lòng chọn đối tượng"
            data={listdoiTuong || []}
            onChange={(e, list) => onChangeField(form, e, "doiTuong")}
          />
        </Form.Item>
        <Form.Item label="Nội trú" name="noiTru" initialValue={null}>
          <Select
            placeholder="Vui lòng chọn nội trú"
            data={YES_NO.filter((x) => x.id !== null)}
            onChange={(e, list) => onChangeField(form, e, "noiTru")}
          />
        </Form.Item>
        <Form.Item
          label="Loại đối tượng"
          name="loaiDoiTuongId"
          initialValue={null}
        >
          <Select
            placeholder="Vui lòng chọn loại đối tượng"
            data={
              doiTuong
                ? (listLoaiDoiTuong || []).filter(
                    (e) => e.doiTuong === doiTuong
                  )
                : listAllLoaiDoiTuong || []
            }
            onChange={(e, list) => onChangeField(form, e, "loaiDoiTuongId")}
          />
        </Form.Item>
        <Form.Item label="Là cấp cứu" name="capCuu" initialValue={null}>
          <Select
            placeholder="Vui lòng chọn cấp cứu"
            data={YES_NO.filter((x) => x.id !== null)}
            onChange={(e, list) => onChangeField(form, e, "capCuu")}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phong")}
            >
              Phòng
            </div>
          }
          name="phongId"
          initialValue={null}
        >
          <Select
            placeholder="Vui lòng chọn phòng"
            data={listAllPhong || []}
            onChange={(e, list) => onChangeField(form, e, "phongId")}
          />
        </Form.Item>
        <Form.Item label="Cận lâm sàng" name="canLamSang" initialValue={null}>
          <Select
            placeholder="Vui lòng chọn cận lâm sàng"
            data={YES_NO.filter((x) => x.id !== null)}
            onChange={(e, list) => onChangeField(form, e, "canLamSang")}
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/chuc-vu")}
            >
              Chức vụ
            </div>
          }
          name="chucVuId"
          initialValue={null}
        >
          <Select
            placeholder="Vui lòng chọn chức vụ"
            data={listChucVu || []}
            onChange={(e, list) => onChangeField(form, e, "chucVuId")}
          />
        </Form.Item>
        <Form.Item label="Tài khoản" name="nhanVienId" initialValue={null}>
          <Select
            placeholder="Vui lòng chọn tài khoản"
            data={listAccount || []}
            onChange={(e, list) => onChangeField(form, e, "nhanVienId")}
          />
        </Form.Item>
        <Form.Item
          label="Mức độ ưu tiên"
          name="uuTien"
          rules={[
            {
              validator: validator,
              required: true,
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập mức độ ưu tiên"
            onKeyDown={handleKeypressInput}
            onBlur={handleBlurInput}
            min={1}
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
    <Main>
      <BaseDm
        titleTable="Thiết lập kho chỉ định"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListThietLapChonKho}
        listData={listThietLapChonKho}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[]}
        roleEdit={[]}
        customSetFieldsValue={customSetFieldsValue}
        customOnSearchInput={customOnSearchInput}
        customShowUpdate={customShowUpdate}
        listLink={[
          { title: "Kho", link: "/kho" },
          {
            title: "Thiết lập kho chỉ định",
            link: "/kho/thiet-lap-kho-chi-dinh",
          },
        ]}
      />
    </Main>
  );
};

export default ThietLapChonKho;
