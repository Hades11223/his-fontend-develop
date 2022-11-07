import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  memo,
} from "react";
import { Row, Col, Form, InputNumber, Input } from "antd";
import Select from "components/Select";
import { PrinterWrapper } from "../styled";

const PrinterInfo = (
  { data, listkhoGiay, listhuongGiay, index, manualPrint, dataKey },
  ref
) => {
  const [form] = Form.useForm();
  const [isRequiredWH, setIsRequiredWH] = useState();
  const [isRequiredHuongGiay, setIsRequiredHuongGiay] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      ten: data.ten,
      khoGiay: data.dsKhoGiay?.[0]?.khoGiay,
      chieuDoc: data.dsKhoGiay?.[0]?.chieuDoc,
      chieuNgang: data.dsKhoGiay?.[0]?.chieuNgang,
      huongGiay: data.dsKhoGiay?.[0]?.huongGiay,
    });
  }, [data]);

  useEffect(() => {
    setIsRequiredHuongGiay(manualPrint);
  }, [manualPrint])

  useEffect(() => {
    form.validateFields();
    if (!manualPrint) {
      form.resetFields();
    }
  }, [isRequiredWH, manualPrint]);

  useImperativeHandle(
    ref,
    () => ({
      validateFields: () => {
        return new Promise((resolve, reject) => {
          form
            .validateFields()
            .then((values) => {
              return resolve({
                ...values,
                dataKey,
              });
            })
            .catch((e) => {
              return reject("Fail");
            });
        });
      },
    }),
    []
  );

  const handleOnchange = (value) => {
    setIsRequiredWH(value === 200);
  };

  return (
    <PrinterWrapper key={`${index}-${data.ten}`} manualPrint={manualPrint}>
      <Form form={form} id="form-printer">
        <Row gutter={12}>
          <Col span={4}>
            <Form.Item label="Tên máy in" name="ten" initialValue={data.ten}>
              <Input.TextArea disabled />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Khổ giấy"
              name="khoGiay"
              rules={[
                {
                  required: manualPrint,
                  message: "Vui lòng chọn khổ giấy!",
                },
              ]}
            >
              <Select
                data={listkhoGiay}
                placeholder="Chọn khổ giấy"
                onChange={handleOnchange}
                disabled={!manualPrint}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Kích thước chiều dọc"
              name="chieuDoc"
              rules={[
                {
                  required: isRequiredWH,
                  message: "Vui lòng nhập kích thước chiều dọc!",
                },
                {
                  pattern: /^[\d]{0,4}$/,
                  message:
                    "Vui lòng nhập kích thước chiều dọc không quá 4 ký tự!",
                },
              ]}
            >
              <InputNumber
                placeholder="Vui lòng nhập kích thước chiều dọc"
                type="number"
                disabled={!manualPrint}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Kích thước chiều ngang"
              name="chieuNgang"
              rules={[
                {
                  required: isRequiredWH,
                  message: "Vui lòng nhập kích thước chiều ngang!",
                },
                {
                  pattern: /^[\d]{0,4}$/,
                  message:
                    "Vui lòng nhập kích thước chiều ngang không quá 4 ký tự!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                placeholder="Vui lòng nhập kích thước chiều ngang"
                type="number"
                disabled={!manualPrint}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Hướng giấy"
              name="huongGiay"
              rules={[
                {
                  required: isRequiredHuongGiay,
                  message: "Vui lòng chọn hướng giấy!",
                },
              ]}
            >
              <Select
                data={listhuongGiay}
                placeholder="Chọn hướng giấy"
                disabled={!manualPrint}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </PrinterWrapper>
  );
};

export default memo(forwardRef(PrinterInfo));
