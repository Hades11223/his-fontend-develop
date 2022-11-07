import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form, Col, Row, Select } from "antd";
import { CreatedWrapper } from "components";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
const CreateOrUpdate = (
  { handleSubmit, onCancel, editStatus, layerId },
  ref
) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
  const { listAllDonViYTe } = useSelector((state) => state.donViYTe);
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setDataEdit(null);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
  const filterOption = (input, option) => {
    return (
      (option.props.name || option.props.children)
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue(data?.info);
          setDataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setDataEdit(null);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setDataEdit(null);
        if (refAutoFocus.current) {
          setTimeout(() => {
            refAutoFocus.current.focus();
          }, 50);
        }
      },
    }),
    []
  );
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEdit]);
  return (
    <>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
        // roleSave={[ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM]}
        // roleEdit={[ROLES["DANH_MUC"].NGUON_NGUOI_BENH_SUA]}
        editStatus={editStatus}
      >
        <fieldset
        // disabled={
        //   !checkRole([ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM]) && !editStatus
        // }
        >
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Row gutter={[8, 8]} style={{ width: "100%" }}>
              <Col span={12}>
                <Form.Item
                  label="Mã chi nhánh"
                  name="ma"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã chi nhánh!",
                    },
                    {
                      max: 20,
                      message: "Vui lòng nhập mã chi nhánh không quá 20 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã chi nhánh!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui lòng nhập mã chi nhánh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên chi nhánh"
                  name="ten"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên chi nhánh!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập tên chi nhánh!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên chi nhánh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mã đơn vị y tế"
                  name="donViYTeId"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn nguồn người bệnh!",
                    },
                  ]}
                >
                  <Select
                    // mode="multiple"
                    placeholder="Chọn đơn vị y tế"
                    allowClear
                    filterOption={filterOption}
                  >
                    {listAllDonViYTe?.map((item, index) => (
                      <Option key={index} value={item?.id}>
                        <span title={`${item?.ma}-${item?.ten}`}>
                          {item?.ma}-{item?.ten}
                        </span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  valuePropName="checked"
                  name="chuQuan"
                >
                  <Checkbox>Là cơ quan chủ quản</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  valuePropName="checked"
                  name="tachMaNb"
                >
                  <Checkbox>Sinh dải mã người bệnh riêng</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  name="active"
                  valuePropName="checked"
                >
                  <Checkbox>Có hiệu lực</Checkbox>
                </Form.Item>
                {/* {dataEdit && (
                  <Form.Item
                    style={{ width: "100%" }}
                    name="active"
                    valuePropName="checked"
                  >
                    <Checkbox>Có hiệu lực</Checkbox>
                  </Form.Item>
                )} */}
              </Col>
            </Row>
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdate);
