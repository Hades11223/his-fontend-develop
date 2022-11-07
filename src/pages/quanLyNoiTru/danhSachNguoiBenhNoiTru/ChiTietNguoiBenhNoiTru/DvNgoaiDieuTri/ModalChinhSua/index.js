import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, ModalTemplate, Select } from "components";
import { Main } from "./styled";
import { Row, Col, Checkbox, Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormWraper from "components/FormWraper";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ModalChinhSua = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [form] = Form.useForm();

  const { updateNgoaiDieuTri } = useDispatch().dvNgoaiDieuTri;
  const { dsDvNgoaiDieuTri } = useSelector(
    (state) => state.chiDinhNgoaiDieuTri
  );
  const { getDsDvNgoaiDieuTri } = useDispatch().chiDinhNgoaiDieuTri;

  const [state, _setState] = useState({
    listChooseDv: [],
    selectedRowKeys: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ item: data });
      getDsDvNgoaiDieuTri({ page: 0, size: 500 });

      const { khongTinhTien, dichVuId, tuTra, ghiChu, soLuong } = data;
      form.setFieldsValue({
        khongTinhTien,
        dichVuId,
        tuTra,
        ghiChu,
        soLuong,
      });
      refModal.current && refModal.current.show();
    },
  }));

  const onCancel = () => {
    refModal.current && refModal.current.hide();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onSubmit() {
    form.validateFields().then((values) => {
      updateNgoaiDieuTri([
        { id: state.item?.id, nbDichVu: { ...values } },
      ]).then(() => {
        props.refreshList();
        onCancel();
      });
    });
  }

  return (
    <ModalTemplate
      ref={refModal}
      width={"50%"}
      title="Chỉnh sửa dịch vụ"
      onCancel={onCancel}
    >
      <Main>
        <FormWraper
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout={"vertical"}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row>
            <Col span={16}>
              <Form.Item label="Tên dịch vụ" name="dichVuId">
                <Select
                  data={(dsDvNgoaiDieuTri || []).map((x) => ({
                    id: x.dichVuId,
                    ten: x.ten,
                  }))}
                  placeholder="Chọn dịch vụ"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số lượng" name="soLuong">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item label="Lưu ý" name="ghiChu">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="khongTinhTien" valuePropName="checked">
                <Checkbox>Không tính tiền</Checkbox>
              </Form.Item>
              <Form.Item name="tuTra" valuePropName="checked">
                <Checkbox>Tự túc</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </FormWraper>

        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onCancel}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            minWidth={100}
            rightIcon={<SaveOutlined />}
            onClick={onSubmit}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};
export default forwardRef(ModalChinhSua);
