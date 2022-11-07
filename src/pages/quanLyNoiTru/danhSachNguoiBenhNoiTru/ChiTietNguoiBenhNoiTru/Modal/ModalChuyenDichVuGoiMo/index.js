import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";

const ModalChuyenDichVuGoiMo = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refCallBack = useRef(null);

  const { listNbGoiPTTT } = useSelector((state) => state.chiDinhGoiPTTT);
  const { updateDichVuNbGoiPTTT } = useDispatch().chiDinhGoiPTTT;

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ id }, callback) => {
      setState({ show: true, currentId: id });

      refCallBack.current = callback;
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      form.setFieldsValue();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };
  const onSubmit = () => {
    form.validateFields().then((values) => {
      const { nbGoiPtTtId } = values;

      updateDichVuNbGoiPTTT([{ id: state.currentId, nbGoiPtTtId }]).then(() => {
        refCallBack.current && refCallBack.current();

        onCancel();
      });
    });
  };

  return (
    <ModalTemplate
      width={"60%"}
      ref={refModal}
      title={"Sửa"}
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
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <FormWraper
          form={form}
          labelAlign={"left"}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: "100%" }}
        >
          <Form.Item
            label="Gói mổ"
            name="nbGoiPtTtId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn gói mổ!",
              },
            ]}
          >
            <Select
              data={(listNbGoiPTTT || []).map((item) => ({
                ...item,
                ten: item.tenGoiPtTt,
              }))}
              placeholder="Chọn gói mổ"
            />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChuyenDichVuGoiMo);
