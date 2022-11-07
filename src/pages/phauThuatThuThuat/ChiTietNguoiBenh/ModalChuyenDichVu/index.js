import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { Checkbox, Form, Input, Row } from "antd";
import { Button, HeaderSearch, Select, TableWrapper } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { MainTeamplate } from "./styled";
import { useStore } from "hook";
const ModalChuyenDichVu = (props, ref) => {
  const { chinhSuaDichVu } = props;
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dataDetail = useStore("pttt.dataDetail", {});
  const listFilter = useStore("pttt.listFilter", {});

  const [state, _setState] = useState({ show: false });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data, onOk) => {
      let listKeys = null;
      let isShowTable = false;
      if (Array.isArray(data)) {
        listKeys = data.map((item) => {
          return item?.id;
        });
        isShowTable = true;
      } else {
        listKeys = data?.id;
      }
      setState({
        show: true,
        data,
        isCheckedAll: true,
        selectedRowKeys: listKeys,
        listKeys,
        isShowTable,
      });
      refCallback.current = onOk;
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      form.setFieldsValue({ tenDichVuCu: dataDetail?.tenDichVu });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const columns = [
    {
      title: <HeaderSearch title={t("pttt.tenThuocVtyt")} />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "200px",
      render: (item, data) => data?.tenDichVu || data?.ten,
    },
    {
      title: <HeaderSearch title={t("pttt.slThucDung")} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "80px",
      align: "center",
    },
    {
      title: <HeaderSearch title={t("pttt.kho")} />,
      dataIndex: "tenKho",
      key: "tenKho",
      width: "90px",
    },
    {
      title: <HeaderSearch title={t("pttt.daDuyetPhat")} />,
      dataIndex: "phat",
      key: "phat",
      width: "80px",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
  ];

  const listDsPttt = useMemo(() => {
    return (listFilter || [])
      .filter((x) => x.id !== dataDetail?.id)
      .map((item) => ({
        id: item?.id,
        ten: item?.tenDichVu,
      }));
  }, [listFilter, dataDetail]);

  const onOK = (isOk) => {
    if (isOk) {
      form.submit();
    } else {
      setState({ show: false });
    }
  };
  const onHandleSubmit = (values) => {
    let payload = [];
    if (Array.isArray(state?.selectedRowKeys)) {
      payload = (state?.selectedRowKeys || []).map((item) => ({
        id: item,
        nbDichVu: {
          chiDinhTuDichVuId: values?.chiDinhTuDichVuId,
        },
      }));
    } else {
      payload = [
        {
          id: state?.selectedRowKeys,
          nbDichVu: {
            chiDinhTuDichVuId: values?.chiDinhTuDichVuId,
          },
        },
      ];
    }

    chinhSuaDichVu(payload)
      .then((s) => {
        if (s?.code === 0) {
          refCallback.current();
        }
        setState({ show: false });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    setState({
      isCheckedAll:
        state?.data.length === updatedSelectedKeys.length ? true : false,
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
  return (
    <ModalTemplate
      ref={refModal}
      width={state?.isShowTable ? 1000 : 600}
      title={t("pttt.chuyenDichVu")}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={() => onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          iconHeight={15}
          onClick={() => onOK(true)}
        >
          {t("common.luu")}
        </Button>
      }
      onCancel={() => onOK(false)}
    >
      <MainTeamplate>
        {state?.isShowTable && (
          <div className="table-service">
            <Row className="header-table">
              <div className="header-table__left">{`Đã chọn ${
                state?.selectedRowKeys?.length || 0
              } dịch vụ`}</div>
            </Row>
            <TableWrapper
              columns={columns}
              dataSource={state?.data}
              rowSelection={rowSelection}
              // onRow={onRow}
              scroll={{ y: 200 }}
              rowKey={(record) => record?.id}
            />
          </div>
        )}
        <Form form={form} layout="vertical" onFinish={onHandleSubmit}>
          <Form.Item label={t("pttt.dichVuCu")} name="tenDichVuCu">
            <Input disabled></Input>
          </Form.Item>
          <Form.Item
            label={t("pttt.dichVuMoi")}
            name="chiDinhTuDichVuId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn dịch vụ!",
              },
            ]}
          >
            <Select data={listDsPttt}></Select>
          </Form.Item>
        </Form>
      </MainTeamplate>
    </ModalTemplate>
  );
};
export default forwardRef(ModalChuyenDichVu);
