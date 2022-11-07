import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { HeaderSearch, TableWrapper, InputTimeout, Select } from "components";
import { Checkbox } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import moment from "moment";
import { isEmpty } from "lodash";

const TableDVKTChuaHoanThanh = ({ data = [] }, ref) => {
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const [state, _setState] = useState({
    isCheckedAll: false,
    selectedRowKeys: [],
    selectedRowItems: [],
    tenDichVu: "",
    tenKhoaThucHien: "",
    tenKhoaChiDinh: "",
    trangThai: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    getDeleteDvList: () => {
      return state.selectedRowItems;
    },
  }));

  const dataMemo = useMemo(() => {
    let dataFilter = data || [];
    if (!isEmpty(state?.tenDichVu)) {
      dataFilter = dataFilter.filter(
        (option) =>
          option?.tenDichVu
            ?.toLowerCase()
            .unsignText()
            .indexOf(state?.tenDichVu) >= 0
      );
    }

    if (!isEmpty(state?.tenKhoaThucHien)) {
      dataFilter = dataFilter.filter(
        (option) =>
          option?.tenKhoaThucHien
            ?.toLowerCase()
            .unsignText()
            .indexOf(state?.tenKhoaThucHien) >= 0
      );
    }

    if (!isEmpty(state?.tenKhoaChiDinh)) {
      dataFilter = dataFilter.filter(
        (option) =>
          option?.tenKhoaChiDinh
            ?.toLowerCase()
            .unsignText()
            .indexOf(state?.tenKhoaChiDinh) >= 0
      );
    }

    if (state?.trangThai) {
      dataFilter = dataFilter.filter(
        (option) => option?.trangThai === state?.trangThai
      );
    }

    return dataFilter.map((item, idx) => ({
      ...item,
      index: idx + 1,
    }));
  }, [
    data,
    state.tenDichVu,
    state.tenKhoaThucHien,
    state.tenKhoaChiDinh,
    state.trangThai,
  ]);

  const onSearchLocal = (key) => (e) => {
    if (key == "trangThai") {
      setState({ [key]: e });
      return;
    }
    const value = e?.trim().toLowerCase().unsignText() || "";
    setState({ [key]: value });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 50,
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <InputTimeout
              onChange={onSearchLocal("tenDichVu")}
              placeholder="Tìm kiếm"
            />
          }
        />
      ),
      width: 260,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (text, row, index) => (
        <div className="block-name">
          <div className="name">{text}</div>
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listTrangThaiDichVu]}
              placeholder="Chọn trạng thái"
              onChange={onSearchLocal("trangThai")}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "trangThai",
      key: "trangThai",
      align: "right",
      render: (item) => {
        return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      width: "180px",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa thực hiện"
          search={
            <InputTimeout
              onChange={onSearchLocal("tenKhoaThucHien")}
              placeholder="Tìm kiếm"
            />
          }
        />
      ),
      dataIndex: "tenKhoaThucHien",
      width: "180px",
      key: "tenKhoaThucHien",
    },
    {
      title: <HeaderSearch title="Ngày y lệnh" />,
      dataIndex: "thoiGianChiDinh",
      width: 150,
      key: "thoiGianChiDinh",
      render: (item) =>
        item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          search={
            <InputTimeout
              onChange={onSearchLocal("tenKhoaChiDinh")}
              placeholder="Tìm kiếm"
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
    },
  ];

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked
        ? (data || []).map((item) => {
            return item?.id;
          })
        : [],
      isCheckedAll: e.target?.checked,
      selectedRowItems: data,
    });
  };

  const onSelectChange = (selectedRowKeys, selectedRowItems) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if ((data || []).length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
        selectedRowItems: selectedRowItems,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
        selectedRowItems: selectedRowItems,
      });
    }
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={<Checkbox onChange={oncheckAll} checked={state.isCheckedAll} />}
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <>
      <TableWrapper
        bordered
        columns={columns}
        dataSource={dataMemo}
        onRow={onRow}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        styleWrap={{ height: 300 }}
      />
    </>
  );
};

export default forwardRef(TableDVKTChuaHoanThanh);
