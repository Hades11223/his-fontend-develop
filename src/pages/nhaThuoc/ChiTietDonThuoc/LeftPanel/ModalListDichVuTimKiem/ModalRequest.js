import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { DatePicker, Select } from "antd";
import {
  Footer,
  InputCustom,
  SelectCustom,
  TableWrapperStyled,
} from "./styled";
import Button from "pages/kho/components/Button";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";
import ModalTemplate from "pages/kho/components/ModalTemplate";
const { RangePicker } = DatePicker;
const { Option } = Select;

const ModalRequest = ({ closable, ...props }, ref) => {
  const refCallback = useRef(null);
  const refModal = useRef(null);
  const [state, _setState] = useState({ open: false, itemSelected: {} });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    lieuDung: { listAllLieuDung },
    thuocChiTiet: { nguoiBenhId, dsThuocEdit, dsThuocTamThoi },
  } = useSelector((state) => state);

  const {
    thuocChiTiet: { updateData, onSaveDsThuoc },
  } = useDispatch();

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const blockInvalidChar2 = (e) => {
    if (e.key === "Backspace" || e.keyCode === 37 || e.keyCode === 39) {
    } else if (
      ["e", "E", "+", "-"].includes(e.key) ||
      e.target.value.length >= 3
    ) {
      return e.preventDefault();
    }
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          sort_key="index"
          // dataSort={dataSortColumn["stt"] || 0}
          // onClickSort={onClickSort}
          // search={
          //   <Input
          //     placeholder="Nhập số khám"
          //     // onChange={onSearchInput("soKham")}
          //   />
          // }
        />
      ),
      align: "center",
      width: "20px",
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Tên thuốc"
          sort_key="ten"
          // dataSort={dataSortColumn["maHoSo"] || 0}
          // onClickSort={onClickSort}
          // search={
          //   <Input
          //     placeholder="Nhập mã hồ sơ"
          //     // onChange={onSearchInput("maHoSo")}
          //   />
          // }
        />
      ),
      width: "80px",
      dataIndex: "ten",
      key: "ten",
      render: (item, itemAll) => {
        return `${item} - ${itemAll?.hamLuong ? itemAll?.hamLuong : ""}`;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          // dataSort={dataSortColumn["tenNb"] || 0}
          // onClickSort={onClickSort}
          // search={
          //   <Input
          //     placeholder="Nhập Tên - Tuổi - Địa chỉ"
          //     // onChange={onSearchInput("tenNb")}
          //   />
          // }
        />
      ),
      width: "50px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item) => {
        return (
          <InputCustom
            type="number"
            defaultValue={1}
            placeholder="Nhập số lượng"
            onChange={onChange("soLuong")}
            onKeyDown={blockInvalidChar}
            min={1}
            // onChange={onSearchInput("tenNb")}
          />
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key="tenDonViTinh"
          // dataSort={dataSortColumn["maHoSo"] || 0}
          // onClickSort={onClickSort}
          // search={
          //   <Input
          //     placeholder="Nhập mã hồ sơ"
          //     // onChange={onSearchInput("maHoSo")}
          //   />
          // }
        />
      ),
      width: "20px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      render: (item, itemAll) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Liều dùng - Cách dùng"
          sort_key="lieuDungId"
          // dataSort={dataSortColumn["trangThai"] || 0}
          // onClickSort={onClickSort}
          // searchSelect={
          //   <Select
          //     placeholder="Chọn trạng thái"
          //     // onChange={onSearchInput("trangThai")}
          //     // data={[{ id: "", ten: "Tất cả" }, ...TRANG_THAI_KHAM_BN]}
          //     defaultValue=""
          //   />
          // }
        />
      ),
      width: "100px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      render: (item) => {
        return (
          <SelectCustom
            placeholder="Nhập liều dùng - cách dùng"
            onChange={onChange("lieuDungId")}
            defaultValue={state.itemSelected.lieuDungId}
            // onChange={onSearchInput("tenNb")}
          >
            {listAllLieuDung.map((o) => {
              return (
                <Option key={o.id} value={o.id}>
                  {o.ten}
                </Option>
              );
            })}
          </SelectCustom>
        );
      },
      // render: (item) => {
      //   const res = TRANG_THAI_KHAM_BN.find((el) => el.id === item) || {};
      //   return res.ten;
      // },
    },
    {
      title: <HeaderSearch title="Đợt dùng" />,
      width: "60px",
      dataIndex: "dotDung",
      key: "dotDung",
      render: (item) => {
        return (
          <InputCustom
            type="number"
            onKeyDown={blockInvalidChar2}
            onChange={onChange("dotDung")}
            placeholder="Nhập đợt dùng"
            defaultValue={state.itemSelected.dotDung}
            min={1}
            value={state.dotDung}
            // onChange={onSearchInput("tenNb")}
          />
        );
      },
    },
    {
      title: <HeaderSearch title="Thời gian dùng" />,
      width: "100px",
      dataIndex: "tenNhaSanXuat",
      key: "tenNhaSanXuat",
      render: (item, record) => {
        return (
          <RangePicker
            format="DD/MM/YYYY"
            className="range-picker"
            placeholder={["Từ ngày", "đến ngày"]}
            onChange={onChangeDate("dotDung")}
            defaultValue={() => {
              const ngayThucHienTu =
                state.itemSelected?.ngayThucHienTu &&
                moment(state.itemSelected.ngayThucHienTu);
              const ngayThucHienDen =
                state.itemSelected?.ngayThucHienDen &&
                moment(state.itemSelected.ngayThucHienDen);
              return [ngayThucHienTu, ngayThucHienDen];
            }}
            // // bordered={false}
            // onChange={onChangeDate(item)}
            separator={<div>-</div>}
          ></RangePicker>
        );
      },
    },
    {
      title: <HeaderSearch title="Ghi chú" />,
      width: "50px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "center",
      render: (item, record) => {
        return (
          <InputCustom
            placeholder="Nhập lưu ý"
            onChange={onChange("ghiChu")}
            defaultValue={state.itemSelected.ghiChu}
          />
        );
      },
    },
  ];
  const onChange = (key) => (e) => {
    let value = e?.target?.value || e;
    if ((key === "soLuong" || key === "dotDung") && Number(value) <= 0) {
      // message.error("Vui lòng nhập số lượng > 0");
      value = 1;
    }
    setState({ [key]: value });
  };
  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    setState({ [`ngayThucHienTu`]: value, [`ngayThucHienDen`]: value1 });
  };

  const rowClassName = (record) => {
    // return record.id === infoNb?.id ? "active" : "";
  };
  useImperativeHandle(ref, () => ({
    show: ({ itemSelected }, callback) => {
      itemSelected.soLuong = 1;
      setState({ open: true, itemSelected });
      refCallback.current = callback;
      refModal.current && refModal.current.show();
    },
  }));
  const onCancel = () => {
    setState({ open: false });
    refModal.current && refModal.current.hide();
  };
  const onSubmitModal = () => {
    const key = stringUtils.guid();

    if (props.isThemMoi) {
      let obj = {
        key: key,
        index: dsThuocTamThoi.length + 1,
        dotDung: state.dotDung || state.itemSelected.dotDung,
        ngayThucHienTu:
          state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
        ngayThucHienDen:
          state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
        lieuDungId: state.lieuDungId || state.itemSelected.ngayThucHienDen,
        nbDichVu: {
          dichVuId: state.itemSelected.dichVuId,
          soLuong: state.soLuong || state.itemSelected.soLuong,
          giaKhongBaoHiem: state.itemSelected.giaKhongBaoHiem,
          ghiChu: state.ghiChu || state.itemSelected.ghiChu,
          dichVu: {
            ...state.itemSelected,
          },
        },
        nbDvKho: {
          soLuongKhaDung: state.itemSelected.soLuongKhaDung,
        },
      };
      let objGuiDi = {
        id: null,
        dotDung: state.dotDung || state.itemSelected.dotDung,
        ngayThucHienTu:
          state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
        ngayThucHienDen:
          state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
        lieuDungId: state.lieuDungId || state.itemSelected.lieuDungId,
        nbDichVu: {
          dichVuId: state.itemSelected.dichVuId,
          soLuong: state.soLuong || state.itemSelected.soLuong,
          ghiChu: state.ghiChu || state.itemSelected.ghiChu,
        },
      };
      updateData({
        dsThuocTamThoi: [...dsThuocTamThoi, obj],
        dsThuocEdit: [...dsThuocEdit, objGuiDi],
      });
      refCallback.current && refCallback.current(key);
      onCancel();
    } else {
      let obj = {
        id: null,
        dotDung: state.dotDung || state.itemSelected.dotDung,
        ngayThucHienTu:
          state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
        ngayThucHienDen:
          state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
        lieuDungId: state.lieuDungId || state.itemSelected.lieuDungId,
        nbDichVu: {
          dichVuId: state.itemSelected.dichVuId,
          soLuong: state.soLuong || state.itemSelected.soLuong,
          ghiChu: state.ghiChu || state.itemSelected.ghiChu,
        },
      };

      onSaveDsThuoc({ id: nguoiBenhId, dsThuoc: [...dsThuocEdit, obj] })
        .then((s) => {
          refCallback.current &&
            refCallback.current(s?.dsThuoc?.[s?.dsThuoc?.length - 1]?.id);
          onCancel();
        })
        .catch((err) => {});
    }
  };
  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  return (
    <ModalTemplate
      ref={refModal}
      title="Thông tin thuốc"
      onCancel={onCancel}
      closable={closable}
    >
      <TableWrapperStyled
        // rowSelection={{
        //   type: "radio",
        // }}
        // className="table"
        rowClassName={rowClassName}
        columns={columns}
        onRow={onRow}
        dataSource={([state.itemSelected] || []).map((item, index) => {
          item.index = index + 1;
          return item;
        })}
        // onRow={onRow}
        // scroll={{ y: 450 }}
        rowKey={(record) => `${record.ma}`}
      />
      <Footer align="end">
        <Button type="default" onClick={onCancel} minWidth={100}>
          Hủy
        </Button>
        <Button type="primary" onClick={onSubmitModal} minWidth={100}>
          Đồng ý
        </Button>
      </Footer>
    </ModalTemplate>
  );
};

export default connect(null, null, null, {
  forwardRef: true,
})(forwardRef(ModalRequest));
