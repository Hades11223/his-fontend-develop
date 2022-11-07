import { Image, Space } from "antd";
import { HeaderSearch, TableWrapper } from "components";
import InputTimeout from "components/InputTimeout";
import React, { useState } from "react";
import { connect } from "react-redux";

const TableChiTietKichCo = ({
  currentVatTu,
  _createOrEdit,
  _listData = [],
  _onDelete,
  getKichCo,
  ...props
}) => {
  const [state, _setState] = useState({
    newData: {},
    editData: {},
    currentIndex: -1,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const [showRow, setShowRow] = useState(false);

  const onChangeData = (key, isEdit) => (e) => {
    if (isEdit) {
      setState({ editData: { ...state.editData, [key]: e } });
    } else {
      setState({ newData: { ...state.newData, [key]: e } });
    }
  };

  const onAdd = (index) => {
    const body = {
      ...(index === state.currentIndex ? state.editData : state.newData),
      dichVuId: currentVatTu?.dichVuId,
    };
    _createOrEdit(body).then((res) => {
      if (res && res.code === 0) {
        getKichCo({ dichVuId: currentVatTu?.dichVuId, size: 99 });
        setState({
          [index === state.currentIndex ? "editData" : "newData"]: {},
          currentIndex: -1,
        });
        setShowRow(false);
      }
    });
  };

  const onEdit = (record, index) => {
    if (state.currentIndex !== index) {
      setState({ editData: record });
      setState({ currentIndex: index });
    }
  };

  const onNew = () => {
    setShowRow(!showRow);
  };

  //   const onRow = (record = {}, index) => {
  //     return {
  //       onClick: (e) => {
  //         if (state.currentIndex !== index) {
  //           setState({ editData: record });
  //           setState({ currentIndex: index });
  //         }
  //       },
  //     };
  //   };

  const onDelete = (item) => {
    _onDelete(item.id);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (_, __, idx) => idx + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Mã kích cỡ"
          sort_key="ma"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập mã"
                onChange={onChangeData("ma")}
              />
            )
          }
        />
      ),
      width: 193,
      dataIndex: "ma",
      key: "ma",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập mã"
              value={state.editData?.ma}
              onChange={onChangeData("ma", true)}
            />
          );
        } else return item;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Tên kích cỡ"
          sort_key="ten"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tên"
                onChange={onChangeData("ten")}
              />
            )
          }
        />
      ),
      width: 208,
      dataIndex: "ten",
      key: "ten",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.ten}
              onChange={onChangeData("ten", true)}
            />
          );
        } else return item;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Mã tương đương"
          sort_key="maTuongDuong"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập mã tương đương"
                onChange={onChangeData("maTuongDuong")}
              />
            )
          }
        />
      ),
      width: 204,
      dataIndex: "maTuongDuong",
      key: "maTuongDuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập mã tương đương"
              value={state.editData?.maTuongDuong}
              onChange={onChangeData("maTuongDuong", true)}
            />
          );
        }
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên kích cỡ trúng thầu"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tên"
                onChange={onChangeData("tenTrungThau")}
              />
            )
          }
        />
      ),
      width: 104,
      dataIndex: "tenTrungThau",
      key: "tenTrungThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.tenTrungThau}
              onChange={onChangeData("tenTrungThau", true)}
            />
          );
        } else return item;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Actions"
          searchSelect={
            showRow && (
              <Image
                className="pointer"
                preview={false}
                src={require("assets/images/his-core/iconTick.png")}
                onClick={onAdd}
              />
            )
          }
        />
      ),
      width: 104,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, element, index) => {
        const isEdit = index === state.currentIndex;
        return isEdit ? (
          <Space>
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconTick.png")}
              onClick={() => onAdd(index)}
            />
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDelete(element);
              }}
            />
          </Space>
        ) : (
          <Space>
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconEdit.png")}
              onClick={() => onEdit(element, index)}
            />
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDelete(element);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="main-info">
      <div className="title-info">
        Chi tiết kích cỡ
        <span className="right-info" onClick={onNew}>
          + Thêm
        </span>
      </div>
      <div className="table-info">
        <TableWrapper
          columns={columns}
          dataSource={_listData}
          //   onRow={onRow}
        ></TableWrapper>
      </div>
    </div>
  );
};
export default connect(
  ({
    quyetDinhThauChiTiet: { dataEditDefault: currentVatTu },
    kichCo: { _listData },
  }) => ({
    currentVatTu,
    _listData,
  }),
  ({ kichCo: { _createOrEdit, _getList: getKichCo, _onDelete } }) => ({
    _createOrEdit,
    _onDelete,
    getKichCo,
  })
)(TableChiTietKichCo);
