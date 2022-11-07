import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { Main, InputNumberCustom } from "./styled";
import { Row, Form, Checkbox } from "antd";
import Select from "components/Select";
import { useDispatch } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { GIOI_TINH_BY_VALUE } from "../../../../../constants";
import { useParams } from "react-router-dom";
import { ModalTemplate, Button } from "components";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";
import { useStore, useListAll } from "hook";
import { cloneDeep } from "lodash";

const ModalHoanThuoc = (props, ref) => {
  const { id } = useParams();
  const refOk = useRef(null);
  const refModal = useRef(null);
  const { t } = useTranslation();
  const {
    nbDvHoan: { traNhaThuoc, huyYeuCau },
    thuocChiTiet: { searchDonThuoc },
  } = useDispatch();
  const [listAllLyDoDoiTra] = useListAll("lyDoDoiTra");
  const infoPatient = useStore("thuocChiTiet.infoPatient");
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: (data = [], selectedRowKeys, onOk, onCancel, options) => {
      const { type } = options || {};
      let checkedAll;
      let listKeys = (data || []).map((item) => {
        item.nbDichVu.soLuongChanged = item.nbDichVu.soLuong;
        return item?.id;
      });
      let selectedKey = selectedRowKeys ? selectedRowKeys : listKeys;
      if (data?.length === selectedKey?.length) checkedAll = true;
      else checkedAll = false;
      setState({
        show: true,
        currentItem: data,
        selectedRowKeys: selectedKey,
        isCheckedAll: checkedAll,
        listKeys,
        type,
      });
      refOk.current = onOk;
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };

  const onOk = () => {
    form.submit();
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
      dataIndex: "id",
      key: "id",
      width: "200px",
      render: (stuff, item) => {
        return item?.nbDichVu?.dichVu?.ten;
      },
    },
    {
      title: <HeaderSearch title="SL bán" />,
      dataIndex: "id",
      key: "id",
      width: "80px",
      align: "right",
      render: (stuff, item) => {
        return item?.nbDichVu?.soLuong;
      },
    },
    {
      title: <HeaderSearch title="SL hoàn" />,
      dataIndex: "id",
      key: "id",
      width: "80px",
      align: "right",
      render: (stuff, item) => {
        if (state?.type === "huyHoan") {
          return item?.nbDvKho?.soLuongYeuCauTra;
        } else {
          return (
            <InputNumberCustom
              value={
                item?.nbDichVu.soLuongChanged
                  ? item?.nbDichVu.soLuongChanged
                  : item?.nbDichVu.soLuong
              }
              style={{ textAlign: "right" }}
              max={item?.nbDichVu.soLuong}
              min={1}
              onChange={(e) => {
                let currentItemClone = cloneDeep(state.currentItem);
                currentItemClone.find((itemLoop) => {
                  if (itemLoop.id == item.id) {
                    itemLoop.nbDichVu.soLuongChanged = e;
                  }
                });
                setState({ currentItem: currentItemClone });
              }}
            />
          );
        }
      },
    },
  ];

  const onHandleSubmit = (values) => {
    let data = state?.currentItem
      ?.filter((item) =>
        state?.selectedRowKeys?.some((item2) => item?.id == item2)
      )
      .map((item) => ({
        nbDichVuCuId: item?.id,
        soLuong:
          state?.type === "huyHoan"
            ? item?.nbDvKho?.soLuongYeuCauTra
            : item?.nbDichVu?.soLuongChanged,
      }));
    const { lyDo } = values;
    data = {
      dsDichVu: data,
      lyDo,
    };
    if (state.type === "huyHoan") {
      data.lyDoDoiTraId = data.lyDo;
      delete data.lyDo;
      huyYeuCau(state?.currentItem?.[0]?.nbDichVu?.phieuDoiTraId, data).then(
        async (res) => {
          await searchDonThuoc(id);
        }
      );
    } else {
      traNhaThuoc(data).then(async () => {
        if (refOk.current) refOk.current();
        await searchDonThuoc(id);
      });
    }
    onCancel();
  };
  return (
    <ModalTemplate
      width={960}
      ref={refModal}
      title={t("nhaThuoc.yeuCauHoanThuoc")}
      rightTitle={
        <div className="header__right">
          <span style={{ color: "#7A869A", fontWeight: "bold" }}>
            {`${
              infoPatient?.nbDotDieuTri && infoPatient?.nbDotDieuTri?.tenNb
            } - ${
              infoPatient?.nbDotDieuTri?.gioiTinh
                ? GIOI_TINH_BY_VALUE[infoPatient?.nbDotDieuTri?.gioiTinh]
                : ""
            }  ${`${
              infoPatient?.nbDotDieuTri?.thangTuoi > 36 ||
              infoPatient?.nbDotDieuTri?.tuoi
                ? ` - ${infoPatient?.nbDotDieuTri?.tuoi} tuổi`
                : infoPatient?.nbDotDieuTri?.thangTuoi
                ? ` - ${infoPatient?.nbDotDieuTri?.thangTuoi} tháng`
                : ""
            }`}`}
          </span>
        </div>
      }
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button type="primary" minWidth={100} onClick={onOk} iconHeight={20}>
          {t("common.dongY")}
        </Button>
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
              <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
                Chọn dịch vụ muốn hoàn
              </span>
              <div className="table-service">
                <Row className="header-table" justify="space-between">
                  <div className="header-table__left">{`Đã chọn ${state?.selectedRowKeys?.length} dịch vụ`}</div>
                  <div style={{ color: "white" }}>
                    Kho trả : {infoPatient && infoPatient?.phieuXuat?.kho?.ten}
                  </div>
                </Row>
                <TableWrapper
                  columns={columns}
                  dataSource={state?.currentItem}
                  rowSelection={rowSelection}
                  // onRow={onRow}
                  scroll={{ y: 265 }}
                  rowKey={(record) => record?.id}
                />
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
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHoanThuoc);
