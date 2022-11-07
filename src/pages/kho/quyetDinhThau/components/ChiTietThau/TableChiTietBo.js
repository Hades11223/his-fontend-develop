import { Checkbox, Image, InputNumber, message, Space } from "antd";
import { HeaderSearch, Select, TableWrapper } from "components";
import InputTimeout from "components/InputTimeout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
const TableChiTietKichCo = (props) => {
  const { selectedVatTuCon, listVatTuCon, vatTuCha } = props;
  const [state, _setState] = useState({
    newData: {},
    editData: {},
    currentIndex: -1,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { getListAllDonViTinh } = useDispatch().donViTinh;
  const {
    createOrEdit,
    getListVatTuBo: getListVatTuBoQuyetDinhThau,
    onDelete,
  } = useDispatch().quyetDinhThauChiTiet;
  const { getListVatTuBo: getListVatTuBoDanhMuc } = useDispatch().danhMucVatTu;
  const { onSearchTongHopVatTuCon } = useDispatch().nhomChiPhi;

  const { listAllDonViTinh } = useSelector((state) => state.donViTinh);
  const { listDataVatTuBo: listDataVatTuBoQuyetDinhThau, dataEditDefault } =
    useSelector((state) => state.quyetDinhThauChiTiet);
  const { listDataVatTuBo: listDataVatTuBoDanhMuc } = useSelector(
    (state) => state.danhMucVatTu
  );

  const [showRow, setShowRow] = useState(false);
  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "" });
    onSearchTongHopVatTuCon({});
  }, []);
  useEffect(() => {
    if (vatTuCha?.id) getListVatTuBoQuyetDinhThau({ vatTuBoId: vatTuCha.id });
    if (vatTuCha?.dichVu?.id)
      getListVatTuBoDanhMuc({
        vatTuBoId: vatTuCha?.dichVu?.id,
        ["dichVu.loaiDichVu"]: vatTuCha?.dichVu?.loaiDichVu,
      });
  }, [vatTuCha]);
  console.log("listDataVatTuBoDanhMuc", listDataVatTuBoDanhMuc)
  const onChangeData = (key, object, isEdit) => (e) => {
    if (
      key === "soLuongDuocPhepMua" &&
      (isEdit
        ? e > state?.editData.soLuongThau * 1.2
        : e > state?.newData.soLuongThau * 1.2)
    ) {
      message.error("Không được phép nhập SL > 120% SL thầu");
      return null;
    }

    if (
      key === "tranBaoHiem" &&
      (e > (isEdit ? state?.editData.giaBaoHiem : state?.newData.giaBaoHiem) ||
        e < 0)
    ) {
      message.error(
        "Lỗi Trần bảo hiểm không thỏa mãn yêu cầu: 0<=Trần bảo hiểm <= Đơn giá BHYT"
      );
      return null;
    }
    if (key === "dichVuId") {
      onSearchTongHopVatTuCon({ dichVuId: e });
    }
    if (object === "dichVu") {
      let data = (listDataVatTuBoDanhMuc || []).find((x) => x.id === e);
      let newData = {
        giaNhapSauVat: data.giaNhapSauVat,
        maTuongDuong: data?.dichVu?.maTuongDuong,
        dvtSoCapId: data?.dichVu?.dvtSoCapId,
        tyLeBhTt: data?.tyLeBhTt || 0,
        tranBaoHiem: data?.tranBaoHiem,
        giaBaoHiem: data?.tyLeBhTt > 0 ? data?.giaNhapSauVat : 0,
        soLuongThau: vatTuCha.soLuongThau * data?.slTrongBo,
        soLuongDuocPhepMua: vatTuCha.soLuongThau * data?.slTrongBo,
        nguongThau: vatTuCha.soLuongThau * data?.slTrongBo,
        dichVuId: data?.id,
        nhaCungCapId: vatTuCha.nhaCungCapId,
        quyCach: data?.quyCach || vatTuCha?.quyCach,
      };
      setState({ newData: newData });
    } else {
      if (isEdit) {
        setState({ editData: { ...state.editData, [key]: e } });
      } else {
        setState({ newData: { ...state.newData, [key]: e } });
      }
    }
  };
  const onAdd = (index) => {
    if (dataEditDefault) {
      let data = index === state.currentIndex ? state.editData : state.newData;
      const body = {
        ...data,
        vatTuBoId: vatTuCha?.id,
        quyetDinhThauId: vatTuCha?.quyetDinhThauId,
      };
      createOrEdit({ ...body }).then((res) => {
        getListVatTuBoQuyetDinhThau({ vatTuBoId: vatTuCha.id });
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
      onSearchTongHopVatTuCon({ dichVuId: record?.dichVuId });
    }
  };

  useEffect(() => {
    if (listVatTuCon?.length) {
      let data = listVatTuCon.map((item) => {
        return {
          ...item,
          giaNhapSauVat: item.giaNhapSauVat,
          maTuongDuong: item?.dichVu?.maTuongDuong,
          dvtSoCapId: item?.dichVu?.dvtSoCapId,
          tyLeBhTt: item?.tyLeBhTt || 0,
          tranBaoHiem: item?.tranBaoHiem,
          giaBaoHiem: item?.tyLeBhTt > 0 ? data?.giaNhapSauVat : 0,
          dichVuId: item?.id,
          quyCach: item?.quyCach,
        };
      });
      setState({ dataVatTuCon: data });
    } else {
      setState({ dataVatTuCon: [] });
    }
  }, [listVatTuCon]);

  const onNew = (e) => {
    setShowRow(!showRow);
  };

  const onDeleted = (item) => {
    if (dataEditDefault) {
      onDelete(item.id).then((s) => {
        getListVatTuBoQuyetDinhThau({ vatTuBoId: vatTuCha.id });
      });
    } else {
      selectedVatTuCon([...listVatTuCon.filter((x) => x.id !== item.id)]);
    }
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
          title="Tên chi tiết"
          sort_key="ten"
          searchSelect={
            showRow && (
              <Select
                data={listDataVatTuBoDanhMuc.map((item) => item.dichVu)}
                placeholder="Chọn tên"
                onChange={onChangeData("dichVuId", "dichVu")}
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
            <Select
              data={listDataVatTuBoDanhMuc.map((item) => item.dichVu)}
              placeholder="Chọn tên"
              onChange={onChangeData("dichVuId", "", true)}
            />
          );
        } else return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên trúng thầu"
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
          title="Mã trúng thầu"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tên"
                onChange={onChangeData("maTrungThau")}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "maTrungThau",
      key: "maTrungThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.maTrungThau}
              onChange={onChangeData("maTrungThau", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã đấu thầu"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập tên"
                onChange={onChangeData("maDauThau")}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "maDauThau",
      key: "maDauThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập tên"
              value={state.editData?.maDauThau}
              onChange={onChangeData("maDauThau", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng thầu"
          searchSelect={
            showRow && (
              <InputNumber
                placeholder="Nhập tên"
                onChange={onChangeData("soLuongThau")}
                value={state?.newData?.soLuongThau}
                min={0}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              placeholder="Nhập tên"
              value={state.editData?.soLuongThau}
              onChange={onChangeData("soLuongThau", "", true)}
              min={0}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng được phép mua"
          searchSelect={
            showRow && (
              <InputNumber
                placeholder="Nhập tên"
                onChange={onChangeData("soLuongDuocPhepMua")}
                value={state?.newData?.soLuongDuocPhepMua}
                min={0}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "soLuongDuocPhepMua",
      key: "soLuongDuocPhepMua",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              placeholder="Nhập tên"
              value={state.editData?.soLuongDuocPhepMua}
              onChange={onChangeData("soLuongDuocPhepMua", "", true)}
              min={0}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngưỡng thầu"
          searchSelect={
            showRow && (
              <InputNumber
                placeholder="Nhập tên"
                onChange={onChangeData("nguongThau")}
                value={state?.newData?.nguongThau}
                min={0}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "nguongThau",
      key: "nguongThau",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              placeholder="Nhập tên"
              value={state.editData?.nguongThau}
              onChange={onChangeData("nguongThau", "", true)}
              min={0}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng đã nhập"
          searchSelect={
            showRow && (
              <InputTimeout onChange={onChangeData("soLuongNhap")} disabled />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "soLuongNhap",
      key: "soLuongNhap",
      align: "center",
      render: (item, list, index) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng trả lại NCC"
          searchSelect={
            showRow && (
              <InputTimeout onChange={onChangeData("soLuongTra")} disabled />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      align: "center",
      render: (item, list, index) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng còn lại"
          searchSelect={
            showRow && (
              <InputTimeout onChange={onChangeData("soLuongCon")} disabled />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "soLuongCon",
      key: "soLuongCon",
      align: "center",
      render: (item, list, index) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá sau VAT"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập giá"
                onChange={onChangeData("giaNhapSauVat")}
                value={state?.newData?.giaNhapSauVat}
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
          title="Tỷ lệ thanh toán BH"
          searchSelect={
            showRow && (
              <InputNumber
                className="input-option"
                placeholder="Nhập tỷ lệ thanh toán BH"
                value={state.editData?.tyLeBhTt}
                min={0}
                max={100}
                onChange={onChangeData("tyLeBhTt")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "tyLeBhTt",
      key: "tyLeBhTt",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              className="input-option"
              placeholder="Nhập tỷ lệ thanh toán BH"
              value={state.editData?.tyLeBhTt}
              min={0}
              max={100}
              onChange={onChangeData("tyLeBhTt", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập giá"
                onChange={onChangeData("giaKhongBaoHiem")}
                value={state?.newData?.giaKhongBaoHiem}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập giá"
              value={state.editData?.giaKhongBaoHiem}
              onChange={onChangeData("giaKhongBaoHiem", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BHYT"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập giá"
                onChange={onChangeData("giaBaoHiem")}
                value={state?.newData?.giaBaoHiem}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập giá"
              value={state.editData?.giaBaoHiem}
              onChange={onChangeData("giaBaoHiem", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá phụ thu"
          searchSelect={
            showRow && (
              <InputTimeout
                placeholder="Nhập giá"
                onChange={onChangeData("giaPhuThu")}
                value={state?.newData?.giaPhuThu}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập giá"
              value={state.editData?.giaPhuThu}
              onChange={onChangeData("giaPhuThu", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trần BHYT"
          searchSelect={
            showRow && (
              <InputNumber
                className="input-option"
                placeholder="Nhập trân bảo hiểm"
                value={state.newData?.tranBaoHiem}
                min={0}
                onChange={onChangeData("tranBaoHiem")}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              className="input-option"
              placeholder="Nhập trân bảo hiểm"
              value={state.editData?.tranBaoHiem}
              min={0}
              max={100}
              onChange={onChangeData("tranBaoHiem", "", true)}
            />
          );
        } else return item;
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
                onChange={onChangeData("maTuongDuong")}
                value={state?.newData?.maTuongDuong}
              />
            )
          }
        />
      ),
      width: 100,
      dataIndex: "maTuongDuong",
      key: "maTuongDuong",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputTimeout
              placeholder="Nhập mã"
              value={state.editData?.maTuongDuong}
              onChange={onChangeData("maTuongDuong", "", true)}
            />
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="dvtSoCapId"
          searchSelect={
            showRow && (
              <Select
                placeholder="Chọn đơn vị tính"
                data={listAllDonViTinh}
                onChange={onChangeData("dvtSoCapId")}
                value={state?.newData?.dvtSoCapId}
              />
            )
          }
        />
      ),
      width: 200,
      dataIndex: "dvtSoCap",
      key: "dvtSoCapId",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              placeholder="Chọn đơn vị tính"
              value={state.editData?.dvtSoCapId}
              data={listAllDonViTinh}
              onChange={onChangeData("dvtSoCapId", "", true)}
            />
          );
        }
        return item?.ten;
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
              onChange={onChangeData("active", true)}
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
            <Image
              className="pointer"
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDeleted(element);
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
                onDeleted(element);
              }}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <Main>
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
            dataSource={
              Object.keys(dataEditDefault).length > 0 
                ? listDataVatTuBoQuyetDinhThau
                : state?.dataVatTuCon
            }
            //   onRow={onRow}
          ></TableWrapper>
        </div>
      </div>
    </Main>
  );
};
export default TableChiTietKichCo;
