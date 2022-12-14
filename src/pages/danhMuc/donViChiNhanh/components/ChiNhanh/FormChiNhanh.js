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
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText="H???y"
        onOk={handleAddNew}
        okText="L??u [F4]"
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
                  label="M?? chi nh??nh"
                  name="ma"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? chi nh??nh!",
                    },
                    {
                      max: 20,
                      message: "Vui l??ng nh???p m?? chi nh??nh kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p m?? chi nh??nh!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui l??ng nh???p m?? chi nh??nh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="T??n chi nh??nh"
                  name="ten"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n chi nh??nh!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p t??n chi nh??nh!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p t??n chi nh??nh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="M?? ????n v??? y t???"
                  name="donViYTeId"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n ngu???n ng?????i b???nh!",
                    },
                  ]}
                >
                  <Select
                    // mode="multiple"
                    placeholder="Ch???n ????n v??? y t???"
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
                  <Checkbox>L?? c?? quan ch??? qu???n</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  valuePropName="checked"
                  name="tachMaNb"
                >
                  <Checkbox>Sinh d???i m?? ng?????i b???nh ri??ng</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  name="active"
                  valuePropName="checked"
                >
                  <Checkbox>C?? hi???u l???c</Checkbox>
                </Form.Item>
                {/* {dataEdit && (
                  <Form.Item
                    style={{ width: "100%" }}
                    name="active"
                    valuePropName="checked"
                  >
                    <Checkbox>C?? hi???u l???c</Checkbox>
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
