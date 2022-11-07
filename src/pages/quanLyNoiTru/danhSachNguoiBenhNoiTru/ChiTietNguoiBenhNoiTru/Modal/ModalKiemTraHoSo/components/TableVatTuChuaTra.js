import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useEffect,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Checkbox } from "antd";
import { useStore } from "hook";
import moment from "moment";
import { groupBy } from "lodash";
import { useDispatch } from "react-redux";

const TableVatTuChuaTra = ({ data = [] }, ref) => {
  const { getListKhoaTongHop } = useDispatch().khoa;
  const { getAllTongHop } = useDispatch().kho;
  const { listDataTongHop } = useStore("khoa", []);
  const { listAllKho } = useStore("kho", []);

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

  useEffect(() => {
    getListKhoaTongHop({ page: "", size: "", active: true });
    getAllTongHop({ active: true });
  }, []);

  useImperativeHandle(ref, () => ({
    getDeleteDvList: () => {
      return state.selectedRowItems;
    },
  }));

  const dataMemo = useMemo(() => {
    const _group = groupBy(data || [], "khoaChiDinhId");
    let newData = [];

    setState({ groupKeys: Object.keys(_group), groups: _group });
    Object.keys(_group).forEach((key) => {
      newData = [
        ...newData,
        {
          id: key,
          isGroupHeader: true,
          tenDichVu: listDataTongHop.find((x) => x.id == key)?.ten || "",
        },
        ..._group[key].map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      ];
    });

    return newData;
  }, [data, listDataTongHop]);

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
      render: (text, row, index) => (
        <div className="block-name">
          <div className="name">{text}</div>
        </div>
      ),
    },
    {
      title: <HeaderSearch title="SL trả" />,
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      width: "80px",
    },
    {
      title: <HeaderSearch title="ĐVT" />,
      dataIndex: "dvt",
      key: "dvt",
      width: "80px",
    },
    {
      title: <HeaderSearch title="Số phiếu trả" />,
      dataIndex: "soPhieuTra",
      key: "soPhieuTra",
      width: "180px",
    },
    {
      title: <HeaderSearch title="Kho" />,
      dataIndex: "khoId",
      key: "khoId",
      width: "180px",
      render: (item) => (listAllKho || []).find((x) => x.id == item)?.ten || "",
    },
    {
      title: <HeaderSearch title="Không tính tiền" />,
      dataIndex: "khongTinhTien",
      width: "120px",
      key: "khongTinhTien",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title="Tự trả" />,
      dataIndex: "tuTra",
      width: "120px",
      key: "tuTra",
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: <HeaderSearch title="Thời gian y lệnh" />,
      dataIndex: "thoiGianYLenh",
      width: 180,
      key: "thoiGianYLenh",
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

export default forwardRef(TableVatTuChuaTra);
