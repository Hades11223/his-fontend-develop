import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Checkbox,
  Input,
  Form,
  DatePicker,
  Button,
  Row,
  Col,
  InputNumber,
} from "antd";
import { InputDecimal } from "components/common";
import { CreatedWrapper, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import DanhSachNb from "./DanhSachNb";
const FormChuongTrinh = (
  {
    handleSubmit,
    onCancel,
    onComplete,
    onUndoComplete,
    onVerify,
    onUndoVerify,
    edited,
    dataSort,
    trangThai,
    onCreateMulti,
    editStatus,

    layerId,
    ...props
  },
  ref
) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const [addMultiple, setAddMultiple] = useState(false);
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
  const listAllChuongTrinhGiamGia = useSelector(
    (state) => state.chuongTrinhGiamGia.listAllChuongTrinhGiamGia
  );
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

  const onSave = () => {
    form
      .validateFields()
      .then(({ soLuongConLai, ...values }) => {
        if (addMultiple) {
          onCreateMultiVoucher(values);
        } else {
          handleSubmit(values);
        }
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = onSave;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setDataEdit(null);
    setAddMultiple(false);
    if (refAutoFocus.current) refAutoFocus.current.focus();
  };

  const onCreateMultiVoucher = (values) => {
    let data = [];
    for (let index = values.maSoBatDau; index <= values.maSoKetThuc; index++) {
      let voucher = Object.assign({}, values);
      delete voucher.maSoBatDau;
      delete voucher.maSoKetThuc;
      voucher.ma = `${values.ma}${index}`;
      data.push(voucher);
    }
    onCreateMulti(data);
  };

  const onChangeAddMultiple = () => {
    setAddMultiple(!addMultiple);
  };

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue(data?.info);
          setDataEdit(data?.info);
          setAddMultiple(false);
        } else {
          form.resetFields();
          setDataEdit(null);
          setAddMultiple(false);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setDataEdit(null);
        setAddMultiple(false);
        setTimeout(() => {
          if (refAutoFocus.current) refAutoFocus.current.focus();
        }, 50);
      },
    }),
    []
  );

  // useEffect(() => {
  //   console.log("refAutoFocus", refAutoFocus);
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEdit]);

  return (
    <>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText={"H???y"}
        onOk={onSave}
        okText={"L??u [F4]"}
        roleSave={[ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA_THEM]}
        roleEdit={[ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA_THEM]) &&
            !editStatus
          }
        >
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="Ch????ng tr??nh gi???m gi??"
              name="chuongTrinhGiamGiaId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n ch????ng tr??nh gi???m gi??!",
                },
              ]}
            >
              <Select
                refSelect={refAutoFocus}
                data={listAllChuongTrinhGiamGia}
                placeholder="Vui l??ng nh???p m?? voucher"
              />
            </Form.Item>
            {!dataEdit && (
              <Form.Item label=" " name="addMultiple" valuePropName="checked">
                <Checkbox onChange={onChangeAddMultiple}>
                  Th??m m???i h??ng lo???t
                </Checkbox>
              </Form.Item>
            )}
            {dataEdit && <Form.Item />}
            <Form.Item
              label="M?? voucher"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? voucher!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? voucher"
              />
            </Form.Item>
            {addMultiple && (
              <Form.Item
                label="M?? s??? b???t ?????u"
                name="maSoBatDau"
                style={{ width: "25%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? s??? b???t ?????u!",
                  },
                ]}
              >
                <InputNumber
                  className="input-option"
                  placeholder="M?? s??? b???t ?????u"
                  min={0}
                />
              </Form.Item>
            )}
            {addMultiple && (
              <Form.Item
                label="M?? s??? k???t th??c"
                name="maSoKetThuc"
                style={{ width: "25%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? s??? k???t th??c!",
                  },
                ]}
              >
                <InputNumber
                  className="input-option"
                  placeholder="M?? s??? k???t th??c"
                  min={1}
                />
              </Form.Item>
            )}
            <Form.Item
              label="S??? l?????ng"
              name="soLuong"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p s??? l?????ng!",
                },
                {
                  validator: (_, value, callback) => {
                    if (value < form.getFieldValue("soLuongDaSuDung")) {
                      callback(
                        new Error("S??? l?????ng ph???i >= s??? l?????ng ???? s??? d???ng")
                      );
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            >
              <InputDecimal placeholder="Vui l??ng nh???p s??? l?????ng" min={1} />
            </Form.Item>

            <Form.Item label="S??? l?????ng ???? s??? d???ng" name="soLuongDaSuDung">
              <Input
                className="input-option"
                readOnly
                placeholder="Vui l??ng nh???p s??? l?????ng ???? s??? d???ng"
              />
            </Form.Item>

            <Form.Item
              label="S??? l?????ng c??n l???i"
              name="soLuongConLai"
              valuePropName="none"
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p s??? l?????ng"
                readOnly
                value={
                  parseInt(form.getFieldValue("soLuong") || 0) -
                  parseInt(form.getFieldValue("soLuongDaSuDung") || 0)
                }
              />
            </Form.Item>
            {addMultiple && <Form.Item />}
            <Form.Item
              label="M?? t???"
              name="moTa"
              style={{ width: "200%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? t???!",
                },
              ]}
            >
              <TextArea placeholder="Vui l??ng nh???p m?? t???" />
            </Form.Item>

            {dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
        <DanhSachNb />
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(FormChuongTrinh);
