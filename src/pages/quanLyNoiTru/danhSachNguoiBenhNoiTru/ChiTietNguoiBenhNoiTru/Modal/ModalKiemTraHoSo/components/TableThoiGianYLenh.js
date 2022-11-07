import React from "react";
import { HeaderSearch, TableWrapper, InputTimeout } from "components";
import { Checkbox } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import moment from "moment";

const TableThoiGianYLenh = ({ data = [] }) => {
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 50,
    },
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
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
      title: <HeaderSearch title="Trạng thái" />,
      width: 100,
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
      title: <HeaderSearch title="Khoa thực hiện" />,
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
      title: <HeaderSearch title="Khoa chỉ định" />,
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

  const onSelectChange = (selectedRowKeys) => {};

  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox />} />,
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: [],
  };

  return (
    <>
      <TableWrapper
        bordered
        columns={columns}
        dataSource={(data || []).map((item, idx) => ({
          ...item,
          index: idx + 1,
        }))}
        onRow={onRow}
        rowKey={(record) => `${record.key}`}
        rowSelection={rowSelection}
        styleWrap={{ height: 300 }}
      />
    </>
  );
};

export default TableThoiGianYLenh;
