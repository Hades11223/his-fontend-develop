import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Main } from "./styled";
import { Row, Form, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Button } from "components";
const ModalHuyHoanDichVu = (props, ref) => {
  const { data } = props;
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const { t } = useTranslation();
  const {
    nbDvHoan: { listData },
  } = useSelector((state) => state);
  const {
    nbDvHoan: { huyYeuCau, getDsDichVu },
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

  useEffect(() => {}, [data]);

  useImperativeHandle(ref, () => ({
    show: (data, callback) => {
      if (data?.phieuDoiTraId) {
        getDsDichVu(data?.phieuDoiTraId);
        setState({
          currentItem: data.concat(data,data,data,data,data,data,data,data,data,data,data,data,data,data,data,data),
          selectedRowKeys: [data?.id],
          show: true
        });
      }
      refCallback.current = callback;
    },
  }));

  useEffect(() => {
    if (listData?.dsDichVuHoan?.length) {
      let listKeys = (listData?.dsDichVuHoan || []).map((item) => {
        return item?.nbDichVuCuId;
      });
      setState({
        isCheckedAll:
          state.selectedRowKeys?.length === listData?.dsDichVuHoan?.length,
        listKeys,
      });
    }
  }, [listData]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    setState({
      isCheckedAll:
        listData?.dsDichVuHoan?.length === updatedSelectedKeys?.length,
      selectedRowKeys: updatedSelectedKeys,
    });
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
      width: "100px",
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

  const onHandleSubmit = () => {
    let dsDichVu = state.selectedRowKeys.map((item) => {
      return { nbDichVuCuId: item };
    });
    let data = {
      dsDichVu,
    };
    huyYeuCau(state?.currentItem?.phieuDoiTraId, data).then(() => {
      refCallback.current && refCallback.current();
    });
    onOK(false)();
  };
  const onOK = (isOk) => () => {
    if (isOk) {
      form.submit();
    } else {
      setState({ show: false });
      form.resetFields();
    }
  };

  return (
    <ModalTemplate
      width={960}
      ref={refModal}
      title={t("khamBenh.chiDinh.yeuCauHoanDichVu")}
      rightTitle={
        <div className="header__right">
          <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
            state?.currentItem && state?.currentItem?.tenNb
          } - ${state?.currentItem?.gioiTinh} - ${
            state?.currentItem && state?.currentItem?.tuoi
          }`}</span>
        </div>
      }
      onCancel={onOK(false)}
      closable={false}
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
        <Row style={{ background: "#fff", padding: "20px" }}>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            <Form.Item>
              <div>
                <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
                  {t("khamBenh.chiDinh.chonDichVuMuonHuyYeuCauHoan")}
                </span>
                <div className="table-service">
                  <Row className="header-table">
                    <div className="header-table__left">{`Đã chọn ${
                      state?.selectedRowKeys?.length || 0
                    } dịch vụ`}</div>
                  </Row>
                  <TableWrapper
                    columns={columns}
                    dataSource={listData?.dsDichVuHoan || []}
                    rowSelection={rowSelection}
                    // onRow={onRow}
                    scroll={{ y: 322 }}
                    rowKey={(record) => record?.nbDichVuCuId}
                  />
                </div>
              </div>
            </Form.Item>
          </Form>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHuyHoanDichVu);
