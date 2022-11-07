import { Checkbox, Image, Space } from "antd";
import { HeaderSearch, Select, TableWrapper } from "components";
import InputTimeout from "components/InputTimeout";
import { LOAI_DICH_VU } from "constants/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TableChiTietKichCo = (props) => {
  const { selectedVatTuCon, listVatTuCon } = props;
  const [state, _setState] = useState({
    newData: {},
    editData: {},
    currentIndex: -1,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const {
    donViTinh: { getListAllDonViTinh },
    danhMucVatTu: { createOrEdit, getListVatTuBo, onDelete },
  } = useDispatch();
  const {
    donViTinh: { listAllDonViTinh },
    danhMucVatTu: { listDataVatTuBo, currentItem: currentVatTu },
  } = useSelector((state) => state);
  const [showRow, setShowRow] = useState(false);
  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "" });
  }, []);

  useEffect(() => {
    if (currentVatTu?.id) getListVatTuBo({ vatTuBoId: currentVatTu.id , ["dichVu.loaiDichVu"] : LOAI_DICH_VU.VAT_TU });
  }, [currentVatTu]);
  const onChangeData = (key, object, isEdit) => (e) => {
    let keyData = "";
    let data = {};
    let value = "";
    if (e?.target?.hasOwnProperty("checked")) {
      value = e.target.checked;
    } else {
      value = e;
    }
    if (isEdit) {
      data = state.editData;
      keyData = "editData";
    } else {
      data = state.newData;
      keyData = "newData";
    }
    if (object) {
      setState({
        [keyData]: {
          ...data,
          dichVu: {
            ...data?.dichVu,
            [key]: value,
          },
        },
      });
    } else {
      setState({ [keyData]: { ...data, [key]: value } });
    }
  };
  const onAdd = (index) => {
    if (currentVatTu) {
      let data = index === state.currentIndex ? state.editData : state.newData;
      const body = {
        ...data,
        vatTuBoId: currentVatTu?.id,
      };
      createOrEdit({ ...body }).then((res) => {
        getListVatTuBo({ vatTuBoId: currentVatTu.id });
        setState({
          [index === state.currentIndex ? "editData" : "newData"]: {},
          currentIndex: -1,
        });
        setShowRow(false);
      });
    } else {
      let listSelectionVatTuCon = listVatTuCon || [];
      let data = index === state.currentIndex ? state.editData : state.newData;
      if (index === state.currentIndex) {
        listSelectionVatTuCon[index] = data;
        setState({
          currentIndex: -1,
        });
      } else {
        listSelectionVatTuCon.push(state.newData);
      }
      selectedVatTuCon([...listSelectionVatTuCon]);
      setShowRow(false);
    }
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
          title="Mã chi tiết"
          sort_key="ma"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập mã"
                onChange={onChangeData("ma", "dichVu")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "dichVu",
      key: "ma",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập mã"
              value={state.editData?.dichVu?.ma}
              onChange={onChangeData("ma", "dichVu", true)}
            />
          );
        } else return item?.ma;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Tên chi tiết"
          sort_key="ten"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tên"
                onChange={onChangeData("ten", "dichVu")}
              />
            )
          }
        />
      ),
      width: 250,
      dataIndex: "dichVu",
      key: "ten",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.dichVu.ten}
              onChange={onChangeData("ten", "dichVu", true)}
            />
          );
        } else return item?.ten;
      },
    },

    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="donViTinhId"
          searchSelect={
            showRow && (
              <Select
                placeholder="Chọn đơn vị tính"
                data={listAllDonViTinh}
                onChange={onChangeData("donViTinhId", "dichVu")}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "donViTinhId",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              placeholder="Chọn đơn vị tính"
              value={state.editData?.dichVu?.donViTinhId}
              data={listAllDonViTinh}
              onChange={onChangeData("donViTinhId", "dichVu", true)}
            />
          );
        }
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng theo bộ"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập số lượng"
                onChange={onChangeData("slTrongBo")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "slTrongBo",
      key: "slTrongBo",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập số lượng"
              value={state.editData?.slTrongBo}
              onChange={onChangeData("slTrongBo", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập sau VAT"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập giá"
                onChange={onChangeData("giaNhapSauVat")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập giá"
              value={state.editData?.giaNhapSauVat}
              onChange={onChangeData("giaNhapSauVat", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉ lệ thanh toán"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tỉ lệ thanh toán"
                onChange={onChangeData("tyLeBhTt", "dichVu")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "dichVu",
      key: "tyLeBhTt",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tỉ lệ thanh toán"
              value={state.editData?.dichVu?.tyLeBhTt}
              onChange={onChangeData("tyLeBhTt", "dichVu", true)}
            />
          );
        } else return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã ánh xạ"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập mã"
                onChange={onChangeData("maTuongDuong", "dichVu")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "dichVu",
      key: "maTuongDuong",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập mã"
              value={state.editData?.dichVu?.maTuongDuong}
              onChange={onChangeData("maTuongDuong", "dichVu", true)}
            />
          );
        } else return item?.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên chi tiết trúng thầu"
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
      width: 200,
      dataIndex: "tenTrungThau",
      key: "tenTrungThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.tenTrungThau}
              onChange={onChangeData("tenTrungThau", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hiệu lực"
          searchSelect={
            showRow && (
              <Checkbox
                defaultChecked={true}
                onChange={onChangeData("active")}
              />
            )
          }
        />
      ),
      width: 104,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              checked={state.editData?.active}
              onChange={onChangeData("active","", true)}
            />
          );
        } else return <Checkbox checked={item} />;
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
          </Space>
        ) : (
          <Space>
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconEdit.png")}
              onClick={() => onEdit(element, index)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="main-info">
      <div className="title-info">
        Chi tiết bộ phận
        <button className="right-info" onClick={onNew}>
          + Thêm
        </button>
      </div>
      <div className="table-info">
        <TableWrapper
          columns={columns}
          dataSource={currentVatTu ? listDataVatTuBo : listVatTuCon}
          //   onRow={onRow}
        ></TableWrapper>
      </div>
    </div>
  );
};
export default TableChiTietKichCo;
