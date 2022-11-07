import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FormWraper from "components/FormWraper";
import { Form, Input, Select as AntdSelect } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { Option } = AntdSelect;

const ModalSaoChepBaoGia = (props, ref) => {
  const [form] = Form.useForm();
  const { id } = props;
  const history = useHistory();
  const refModal = useRef(null);

  //redux
  const {
    doiTac: { listAllDoiTac },
  } = useSelector((state) => state);

  const {
    doiTac: { getListAllDoiTac },
    khamSucKhoe: { saoChepPhieu },
  } = useDispatch();

  //state
  const [state, _setState] = useState({});

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
      form.resetFields();
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  //memo
  const optionsDoiTac = useMemo(() => {
    let options = listAllDoiTac?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [listAllDoiTac]);

  //effect
  useEffect(() => {
    getListAllDoiTac({ dsLoaiDoiTac: 40, active: true });
  }, []);

  const onOk = (isOk) => () => {
    if (isOk) {
      form.validateFields().then((values) => {
        const { doiTacId, ten } = values;

        saoChepPhieu({ id, doiTacId, ten }).then((res) => {
          history.push(`/kham-suc-khoe/phieu-bao-gia/chi-tiet/${res?.id}`);
        });
        onOk(false)();
      });
    } else {
      setState({
        show: false,
      });
    }
  };

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  return (
    <ModalTemplate
      ref={refModal}
      width="45%"
      closable={false}
      onCancel={onOk(false)}
      title={<b>Sao chép báo giá</b>}
      actionLeft={
        <Button.Text
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
          leftIcon={<ArrowLeftOutlined />}
        >
          Quay lại
        </Button.Text>
      }
      actionRight={
        <Button type="primary" onClick={onOk(true)}>
          Lưu
        </Button>
      }
    >
      <Main>
        <FormWraper
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout={"horizontal"}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            label="Tên phiếu báo giá"
            name="ten"
            rules={[
              {
                required: true,
                message: "Tên phiếu báo giá là bắt buộc!",
              },
            ]}
          >
            <Input placeholder="Nhập tên phiếu" />
          </Form.Item>

          <Form.Item label="Công ty báo giá" name="doiTacId">
            <AntdSelect
              placeholder="Nhập tên công ty cần báo giá"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {optionsDoiTac}
            </AntdSelect>
          </Form.Item>
        </FormWraper>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSaoChepBaoGia);
