import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Checkbox } from "antd";
import moment from "moment";
import { groupBy } from "lodash";
import { KhoaTitleStyled } from "../styled";

const TableVatTuChuaLinh = ({ data = [] }, ref) => {
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

  useImperativeHandle(ref, () => ({
    getDeleteDvList: () => {
      return state.selectedRowItems;
    },
  }));

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

  const sharedOnCell = (_, index) => {
    if (_.isGroupHeader) {
      return {
        colSpan: 0,
      };
    }

    return {};
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
      title: <HeaderSearch title="Tên hàng hóa" />,
      width: 260,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      onCell: (_, index) => {
        if (_.isGroupHeader) {
          return {
            colSpan: 8,
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
      title: <HeaderSearch title="SL chỉ định" />,
      width: 80,
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="ĐVT" />,
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      width: "80px",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="Số phiếu lĩnh" />,
      dataIndex: "soPhieuLinh",
      width: "100px",
      key: "soPhieuLinh",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="Kho" />,
      dataIndex: "tenKho",
      width: 160,
      key: "tenKho",
      onCell: sharedOnCell,
    },
    {
      title: <HeaderSearch title="Không tính tiền" />,
      width: "80px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      onCell: sharedOnCell,
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title="Tự trả" />,
      width: "80px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      onCell: sharedOnCell,
      render: (item) => <Checkbox checked={item} />,
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

export default forwardRef(TableVatTuChuaLinh);
