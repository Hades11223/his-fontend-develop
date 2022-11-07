import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Checkbox } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import moment from "moment";
import { groupBy } from "lodash";
import { KhoaTitleStyled } from "../styled";

const TableThoiGianCoKetQua = ({ data = [] }, ref) => {
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
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);

  useImperativeHandle(ref, () => ({
    getDeleteDvList: () => {
      return state.selectedRowItems;
    },
  }));

  const sharedOnCell = (_, index) => {
    if (_.isGroupHeader) {
      return {
        colSpan: 0,
      };
    }

    return {};
  };

  const dataMemo = useMemo(() => {
    const _group = groupBy(data || [], "tenKhoaChiDinh");
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
      onCell: (_, index) => {
        if (_.isGroupHeader) {
          return {
            colSpan: 7,
          };
        }

        return {};
      },
      render: (text, row, index) => (
        <div className="block-name">
          {row.isGroupHeader ? (
            <KhoaTitleStyled>{text}</KhoaTitleStyled>
          ) : (
            <div className="name">{text}</div>
          )}
        </div>
      ),
    },
    {
      title: <HeaderSearch title="Trạng thái" />,
      width: 100,
      dataIndex: "trangThai",
      key: "trangThai",
      align: "right",
      onCell: sharedOnCell,
      render: (item) => {
        return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Thời gian chỉ định" />,
      dataIndex: "thoiGianChiDinh",
      width: 150,
      key: "thoiGianChiDinh",
      onCell: sharedOnCell,
      render: (item) =>
        item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : "",
    },
    {
      title: <HeaderSearch title="Thời gian thực hiện" />,
      dataIndex: "thoiGianThucHien",
      width: 150,
      key: "thoiGianThucHien",
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
      title: <HeaderSearch title="Khoa thực hiện" />,
      dataIndex: "tenKhoaThucHien",
      width: "180px",
      key: "tenKhoaThucHien",
      onCell: sharedOnCell,
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
    getCheckboxProps: (record) => {
      if (record.isGroupHeader) {
        return {
          style: { display: "none" },
        };
      }
      return {};
    },
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

export default forwardRef(TableThoiGianCoKetQua);
