import React, { useMemo, useState } from "react";
import { HeaderSearch, TableWrapper } from "components";
import moment from "moment";
import { groupBy } from "lodash";
import { KhoaTitleStyled } from "../styled";

const TableDVThieuThoiGian = ({ data = [] }) => {
  const [state, _setState] = useState({
    isCheckedAll: false,
    selectedRowKeys: [],
    selectedRowItems: [],
    groupKeys: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const sharedOnCell = (_, index) => {
    if (_.isGroupHeader) {
      return {
        colSpan: 0,
      };
    }

    return {};
  };

  const dataMemo = useMemo(() => {
    const _group = groupBy(data || [], "tenKhoaThucHien");
    let newData = [];

    setState({ groupKeys: Object.keys(_group), groups: _group });
    Object.keys(_group).forEach((key) => {
      newData = [
        ...newData,
        { id: key, isGroupHeader: true, tenDichVu: key },
        ..._group[key].map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      ];
    });

    return newData;
  }, [data]);

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
          {row.isGroupHeader ? (
            <KhoaTitleStyled>{text}</KhoaTitleStyled>
          ) : (
            <div className="name">{text}</div>
          )}
        </div>
      ),
      onCell: (_, index) => {
        if (_.isGroupHeader) {
          return {
            colSpan: 5,
          };
        }

        return {};
      },
    },
    {
      title: <HeaderSearch title="Thời gian có kết quả" />,
      dataIndex: "thoiGianCoKetQua",
      width: 150,
      key: "thoiGianCoKetQua",
      onCell: sharedOnCell,
      render: (item) =>
        item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: <HeaderSearch title="Ngày y lệnh" />,
      dataIndex: "thoiGianChiDinh",
      width: 150,
      key: "thoiGianChiDinh",
      onCell: sharedOnCell,
      render: (item) =>
        item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      width: "180px",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="Khoa chỉ định" />,
      width: "180px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      onCell: sharedOnCell,
    },
  ];

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  console.log("data", data);

  return (
    <>
      <TableWrapper
        bordered
        columns={columns}
        dataSource={dataMemo}
        onRow={onRow}
        rowKey={(record) => record.id}
        styleWrap={{ height: 300 }}
      />
    </>
  );
};

export default TableDVThieuThoiGian;
