import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { DatePicker, Form, Input } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import moment from "moment";

const ModalHoanThanhBA = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const {
    dsLuuTruBa: { doiTrangThaiBA, getChiTietLuuTruBA },
  } = useDispatch();

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useImperativeHandle(ref, () => ({
    show: ({ data, listData }, callback) => {
      setState({ show: true, data, listData });

      const { lyDoTuChoi, thoiGianTuChoi } = data || {};

      form.setFieldsValue({
        lyDoTuChoi,
        thoiGianTuChoi: thoiGianTuChoi ? moment(thoiGianTuChoi) : moment(),
      });

      refCallback.current = callback;
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false, data: null, listData: null });
  };

  const onTuChoiBa = () => {
    form.validateFields().then((values) => {
      const { lyDoTuChoi, thoiGianTuChoi } = values;

      const payload = state.listData
        ? state.listData.map((x) => ({
            ...x,
            lyDoTuChoi,
            thoiGianTuChoi,
          }))
        : [{ ...state.data, lyDoTuChoi, thoiGianTuChoi }];

      doiTrangThaiBA(payload).then(() => {
        getChiTietLuuTruBA(state.data?.id);
        if (refCallback.current) refCallback.current();
        onClose();
      });
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ModalTemplate
      width={600}
      closable={true}
      ref={refModal}
      title={"Từ chối bệnh án"}
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
          Quay lại
        </Button.Text>
      }
      actionRight={
        <>
          <Button type="primary" onClick={onTuChoiBa}>
            Lưu
          </Button>
        </>
      }
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
          <Form.Item
            label="Lý do từ chối"
            name="lyDoTuChoi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do từ chối",
              },
            ]}
          >
            <Input placeholder="Nhập lý do từ chối" />
          </Form.Item>

          <Form.Item
            label="Ngày từ chối"
            name="thoiGianTuChoi"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày từ chối",
              },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm:ss" }}
              placeholder="Chọn thời gian từ chối"
              disabled={true}
            />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHoanThanhBA);
