import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { Checkbox, Form, message } from "antd";
import { Main } from "./styled";
import { Button, HeaderSearch, ModalTemplate, TableWrapper } from "components";
import { useEnum, useStore } from "hook";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { ENUM } from "constants/index";

const { Column } = TableWrapper;

const ModalTraSuatAn = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN);

  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const { tenNb, tuoi } = infoPatient || {};
  const age = tuoi ? ` - ${tuoi} tuổi` : "";

  const { listToDieuTri } = useSelector((state) => state.toDieuTri);
  const { listDvSuatAn } = useSelector((state) => state.chiDinhSuatAn);

  const {
    chiDinhSuatAn: { traSuatAn, huyTraSuatAn },
  } = useDispatch();

  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const [state, _setState] = useState({
    show: false,
    isCheckedAll: false,
    selectedRowKeys: [],
    selectedRows: [],
    type: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
      {}
    );
  }, [infoPatient, listGioiTinh]);

  const listDvSuatAnMemo = useMemo(() => {
    if (state.type == 1)
      return listDvSuatAn.filter(
        (item) => [20].includes(item.trangThai) && !item.phieuTraId
      );
    else
      return listDvSuatAn.filter(
        (item) => [30].includes(item.trangThai) && !item.phieuTraId
      );
  }, [listDvSuatAn, state.type]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    form.setFieldsValue({});
  }, [listToDieuTri]);

  useImperativeHandle(ref, () => ({
    show: ({ type, traDotXuat }, callback) => {
      //type = 1: trả suất ăn, 2: hủy trả
      setState({ show: true, traDotXuat, type });

      refCallback.current = callback;
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({
      show: false,
      isCheckedAll: false,
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  const onTraSuatAn = () => {
    const payload = (state.selectedRows || []).map((item) => ({
      id: item.id,
      traDotXuat: state.traDotXuat,
    }));

    if (payload.length === 0) {
      message.error("Vui lòng chọn suất ăn để trả!");
      return;
    }

    traSuatAn(payload).then(() => {
      onClose();
      refCallback.current && refCallback.current();
    });
  };

  const onHuyTraSuatAn = () => {
    const payload = (state.selectedRows || []).map((item) => ({
      id: item.id,
    }));

    if (payload.length === 0) {
      message.error("Vui lòng chọn suất ăn để trả!");
      return;
    }

    huyTraSuatAn(payload).then(() => {
      onClose();
      refCallback.current && refCallback.current();
    });
  };

  const columns = [
    Column({
      title: "Tên dịch vụ",
      width: "200px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "quanLyNoiTru.suatAn.tenDichVu",
    }),
    Column({
      title: "Loại bữa ăn",
      width: "120px",
      dataIndex: "tenLoaiBuaAn",
      key: "tenLoaiBuaAn",
      i18Name: "quanLyNoiTru.suatAn.tenLoaiBuaAn",
    }),
    Column({
      title: "SL",
      width: "50px",
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: "quanLyNoiTru.suatAn.soLuong",
    }),
    Column({
      title: "ĐVT",
      width: "50px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      i18Name: "quanLyNoiTru.suatAn.tenDonViTinh",
    }),
    Column({
      title: "Thành tiền",
      width: "120px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      i18Name: "quanLyNoiTru.suatAn.thanhTien",
    }),
    Column({
      title: "Trạng thái",
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item, list) => {
        return listTrangThai.find((x) => x.id === item)?.ten;
      },
      i18Name: "quanLyNoiTru.suatAn.trangThai",
    }),
  ];

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (listDvSuatAnMemo.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
        selectedRows: data,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
        selectedRows: data,
      });
    }
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <ModalTemplate
      width={800}
      closable={true}
      ref={refModal}
      title={
        state.type == 1 ? "Yêu cầu trả suất ăn" : "Yêu cầu hủy trả suất ăn"
      }
      rightTitle={`${tenNb} - ${gioiTinh.ten}${age}`}
      onCancel={onClose}
      actionLeft={
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={() => {
            onClose();
          }}
          leftIcon={<IcArrowLeft />}
        >
          Hủy
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          onClick={state.type == 1 ? onTraSuatAn : onHuyTraSuatAn}
        >
          Đồng ý
        </Button>
      }
    >
      <Main>
        <div className="content">
          <div className="header">
            Đã chọn <b>{state.selectedRowKeys?.length || 0}</b> dịch vụ
          </div>

          <div className="table">
            <TableWrapper
              columns={columns}
              dataSource={listDvSuatAnMemo || []}
              rowKey={(record) => `${record.id}`}
              rowSelection={rowSelection}
              styleWrap={{ height: 350 }}
            />
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalTraSuatAn);
