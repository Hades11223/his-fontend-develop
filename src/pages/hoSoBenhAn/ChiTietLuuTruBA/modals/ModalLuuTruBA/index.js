import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import FormWraper from "components/FormWraper";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ModalLuuTruBA = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const [listSoNamLuuTru] = useEnum(ENUM.SO_NAM_LUU_TRU);
  const [listLoaiLuuTru] = useEnum(ENUM.LOAI_LUU_TRU);

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

      const { soNamLuuTru, loaiLuuTru } = data || {};

      form.setFieldsValue({
        soNamLuuTru,
        loaiLuuTru,
      });

      refCallback.current = callback;
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false, data: null, listData: null });
  };

  const onLuuTruBa = () => {
    form.validateFields().then((values) => {
      const { soNamLuuTru, loaiLuuTru } = values;

      const payload = state.listData
        ? state.listData((x) => ({ ...x, soNamLuuTru, loaiLuuTru }))
        : [{ ...state.data, soNamLuuTru, loaiLuuTru }];

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
      title={"Lưu trữ bệnh án"}
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
          <Button type="primary" onClick={onLuuTruBa}>
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
            label="Loại lưu trữ"
            name="loaiLuuTru"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại lưu trữ",
              },
            ]}
          >
            <Select data={listLoaiLuuTru} placeholder="Chọn loại lưu trữ" />
          </Form.Item>

          <Form.Item
            label="Số năm lưu trữ"
            name="soNamLuuTru"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn số năm lưu trữ",
              },
            ]}
          >
            <Select data={listSoNamLuuTru} placeholder="Chọn số năm lưu trữ" />
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalLuuTruBA);
