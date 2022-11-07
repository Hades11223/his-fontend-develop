import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import { Checkbox, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InputNumberFormat } from "components/common";
import SelectLoadMore from "components/SelectLoadMore";
import danhSachDichVuKhoProvider from "data-access/kho/danh-sach-dich-vu-kho-provider";
import { normalizeNumber } from "utils";

const ModalCapNhatGia = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const refModal = useRef(null);
  const refCallback = useRef(null);

  const { getTheoTaiKhoan: getKhoTheoTaiKhoan } = useDispatch().kho;
  const { capNhatGia } = useDispatch().danhSachDichVuKho;
  const { listKhoUser } = useSelector((state) => state.kho);
  const { selectedHangHoa } = useSelector((state) => state.danhSachDichVuKho);

  useImperativeHandle(ref, () => ({
    show: (data = {}, onOK) => {
      setState({ show: true, currentItem: data });
      console.log("data", data);
      getKhoTheoTaiKhoan({ active: true });
      if (data) {
        form.setFieldsValue({
          dichVuId: data.dichVuId,
          loNhapId: data.loNhapId,
        });
      }

      refCallback.current = onOK;
    },
  }));

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    form.resetFields();
    setState({ show: false });
  };

  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        const {
          capNhatGiaChoNb,
          khoId,
          giaNhapSauVat,
          giaNhapTruocVat,
          giaKhongBaoHiem,
          dichVuId,
        } = values;

        capNhatGia({
          khoId,
          dichVuId,
          giaNhapSauVat: normalizeNumber(giaNhapSauVat),
          giaNhapTruocVat: normalizeNumber(giaNhapTruocVat),
          giaKhongBaoHiem: normalizeNumber(giaKhongBaoHiem),
          capNhatGiaChoNb: capNhatGiaChoNb || false,
          loNhapId: state.currentItem?.loNhapId || null,
        });
      })
      .then(() => {
        onCancel();
      });
  };

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function onValuesChange(changedValues, allValues) {
    if (changedValues.giaNhapSauVat) {
      const giaNhapTruocVat =
        Math.round(
          (normalizeNumber(changedValues.giaNhapSauVat) /
            (1 + state.currentItem.vat / 100)) *
            100
        ) / 100;

      form.setFieldsValue({
        giaNhapTruocVat,
      });
    }

    if (changedValues.giaNhapTruocVat) {
      const giaNhapSauVat =
        Math.round(
          normalizeNumber(changedValues.giaNhapTruocVat) *
            (1 + state.currentItem.vat / 100) *
            100
        ) / 100;

      form.setFieldsValue({
        giaNhapSauVat,
      });
    }
  }

  return (
    <ModalTemplate
      width={600}
      ref={refModal}
      title={"Cập nhật giá"}
      onCancel={onCancel}
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
        <Button
          type="primary"
          minWidth={100}
          onClick={onSave}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <FormWraper
          name="basic"
          form={form}
          onFinish={onFinish}
          layout={"vertical"}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          autoComplete="off"
        >
          <Row>
            <Col span={12} className="form-item">
              <Form.Item
                label="Tên hàng hóa"
                name="dichVuId"
                rules={[
                  {
                    required: true,
                    message: "Tên hàng hóa là bắt buộc!",
                  },
                ]}
              >
                {selectedHangHoa ? (
                  <span>
                    <Input value={selectedHangHoa?.ten} disabled={true} />
                  </span>
                ) : (
                  <SelectLoadMore
                    placeholder="Chọn hàng hóa"
                    api={danhSachDichVuKhoProvider.searchTheoLoConTon}
                    mapData={(i) => ({
                      value: i.id,
                      label: i.ten,
                    })}
                  />
                )}
              </Form.Item>
            </Col>

            <Col span={12} className="form-item">
              <Form.Item
                label="Kho"
                name="khoId"
                rules={[
                  {
                    required: true,
                    message: "Tên kho là bắt buộc!",
                  },
                ]}
              >
                <Select placeholder="Chọn kho" data={listKhoUser} />
              </Form.Item>
            </Col>

            <Col span={12} className="form-item">
              <Form.Item
                label="Giá nhập trước VAT"
                name="giaNhapTruocVat"
                rules={[
                  {
                    required: true,
                    message: "Giá nhập trước VAT là bắt buộc!",
                  },
                ]}
              >
                <InputNumberFormat placeholder="Nhập giá nhập sau VAT" />
              </Form.Item>
            </Col>

            <Col span={12} className="form-item">
              <Form.Item
                label="Giá nhập sau VAT"
                name="giaNhapSauVat"
                rules={[
                  {
                    required: true,
                    message: "Giá nhập sau VAT là bắt buộc!",
                  },
                ]}
              >
                <InputNumberFormat placeholder="Nhập giá nhập sau VAT" />
              </Form.Item>
            </Col>

            <Col span={12} className="form-item">
              <Form.Item
                label="Đơn giá BH"
                name="giaKhongBaoHiem"
                rules={[
                  {
                    required: true,
                    message: "Đơn giá BH là bắt buộc!",
                  },
                ]}
              >
                <InputNumberFormat placeholder="Nhập đơn giá BH" />
              </Form.Item>
            </Col>

            <Col span={12} className="form-item">
              <Form.Item
                label=""
                name="capNhatGiaChoNb"
                valuePropName="checked"
              >
                <Checkbox>Cập nhật giá cho NB</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalCapNhatGia);
