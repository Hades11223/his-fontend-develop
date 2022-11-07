import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Form, Radio, Checkbox, message } from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { TableWrapper, ModalTemplate, Button } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { TRANG_THAI_HOAN } from "pages/chanDoanHinhAnh/configs";
import { useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";

const ModalHoanDichVu = forwardRef((props, ref) => {
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const { t } = useTranslation();

  const { listAllLyDoDoiTra } = useSelector((state) => state.lyDoDoiTra);
  const { listDvVatTu } = useSelector((state) => state.chiDinhDichVuVatTu);
  const { listDvThuoc } = useSelector((state) => state.chiDinhDichVuTuTruc);
  const { auth } = useSelector((state) => state.auth);
  const {
    nbDvHoan: { traDichVu },
    chiDinhDichVuVatTu: { getListDichVuVatTu },
    chiDinhDichVuTuTruc: { getListDichVuThuoc },
    lyDoDoiTra: { getListAllLyDoDoiTra },
  } = useDispatch();
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 2,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: ({ data, selectedRowKeys }, callback) => {
      let checkedAll;
      let listData = (data || []).filter(
        (x) =>
          x.thanhToan &&
          x.trangThaiHoan === 0 &&
          (TRANG_THAI_HOAN[x.loaiDichVu]
            ? TRANG_THAI_HOAN[x.loaiDichVu].includes(x.trangThai)
            : true)
      );

      if (!listData || listData.length == 0) {
        message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
        return;
      }

      let listKeys = listData.map((item) => {
        return item?.id;
      });
      let selectedKey = selectedRowKeys ? selectedRowKeys : listKeys;
      if (listData?.length === selectedKey?.length) checkedAll = true;
      else checkedAll = false;
      form.resetFields();
      setState({
        show: true,
        currentItem: listData,
        selectedRowKeys: selectedKey,
        isCheckedAll: checkedAll,
        listKeys,
      });
      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    if (state.currentItem && state.show) {
      getListDichVuVatTu({
        nbDotDieuTriId: state.currentItem[0]?.nbDotDieuTriId,
      });
      getListDichVuThuoc({
        nbDotDieuTriId: state.currentItem[0]?.nbDotDieuTriId,
      });
    }
  }, [state?.currentItem, state.show]);

  useEffect(() => {
    if (state.show) getListAllLyDoDoiTra();
  }, [state.show]);

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (state?.currentItem.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
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
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const columns = [
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "200px",
    },
    {
      title: <HeaderSearch title="Thành tiền" />,
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Đơn giá không BH" />,
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      width: "90px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Đơn giá BH" />,
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Phụ thu" />,
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
  ];

  const onChangeRadio = (e) => {
    setState({ hoanThuoc: e.target.value });
  };

  const onHandleSubmit = (values) => {
    let dsDichVu = state.selectedRowKeys.map((item) => {
      return { nbDichVuCuId: item };
    });
    const { lyDo } = values;
    let data = {
      hoanThuocVatTu: state?.hoanThuoc === 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId: lyDo,
      nbDotDieuTriId: state?.currentItem[0]?.nbDotDieuTriId,
      nguoiYeuCauId: auth?.nhanVienId,
    };
    traDichVu(data).then(() => {
      refCallback.current && refCallback.current();
    });
    onOK(false)();
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOK = (isOk) => () => {
    if (isOk) {
      form.submit();
    } else setState({ show: false });
  };

  return (
    <ModalTemplate
      width={960}
      ref={refModal}
      title="Yêu cầu hoàn dịch vụ"
      onCancel={onOK(false)}
      closable={false}
      rightTitle={
        <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
          state?.currentItem && state?.currentItem[0]?.tenNb
        } - ${state?.currentItem?.[0]?.gioiTinh} - ${
          state?.currentItem && state?.currentItem[0]?.tuoi
        }`}</span>
      }
      actionRight={
        <>
          <Button minWidth={100} onClick={onOK(false)}>
            {t("common.huy")}
          </Button>

          <Button type="primary" minWidth={100} onClick={onOK(true)}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
          <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
            Cảnh báo tồn tại thuốc / vật tư kèm theo
          </span>
        )}
        <Form
          form={form}
          layout="vertical"
          className="form-custom"
          style={{ width: "100%" }}
          onFinish={onHandleSubmit}
        >
          {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
            <Form.Item>
              <Radio.Group
                onChange={onChangeRadio}
                defaultValue={state?.hoanThuoc}
              >
                <Radio value={1}>Hoàn thuốc / vật tư kèm theo</Radio>
                <Radio value={2}>Không hoàn thuốc / vật tư kèm theo</Radio>
              </Radio.Group>
            </Form.Item>
          )}
          <Form.Item>
            <div className="cdha-content">
              <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
                Chọn dịch vụ muốn hoàn
              </span>
              <div className="table-service">
                <Row className="header-table">
                  <div className="header-table__left">{`Đã chọn ${state?.selectedRowKeys?.length} dịch vụ`}</div>
                </Row>
                <TableWrapper
                  columns={columns}
                  dataSource={state?.currentItem}
                  rowSelection={rowSelection}
                  // onRow={onRow}
                  scroll={{ y: 200 }}
                  rowKey={(record) => record?.id}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label="Lý do"
            name="lyDo"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn lý do",
              },
            ]}
          >
            <Select data={listAllLyDoDoiTra}></Select>
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
});

export default ModalHoanDichVu;
