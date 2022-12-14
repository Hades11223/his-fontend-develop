import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Checkbox, Input, Form, DatePicker, Image } from "antd";
import { CreatedWrapper, Select } from "components";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import ModalDichVu from "./ModalDichVu";
import ModalNhomDichVu from "./ModalNhomDichVu";
import NumberFormat from "react-number-format";
import { ENUM, ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useEnum } from "hook";
const FormChuongTrinh = (
  {
    handleSubmit,
    onCancel,
    editStatus,

    layerId,
    ...props
  },
  ref
) => {
  const [listHinhThucGiamGia] = useEnum(ENUM.HINH_THUC_GIAM_GIA);
  const [listCachThucGiamGia] = useEnum(ENUM.CACH_THUC_GIAM_GIA);
  const [listLoaiApDungGiamGia] = useEnum(ENUM.LOAI_AP_DUNG_GIAM_GIA);
  const [form] = Form.useForm();
  const formRef = useRef();
  const modalDichVuRef = useRef(null);
  const modalNhomDichVuRef = useRef(null);
  const dateFormat = "DD/MM/YYYY";

  const [state, _setState] = useState({
    visible: false,
    dataEdit: null,
    displayField: false,
    saved: false,
    dsDichVu: [],
    dsNhomDichVuCap1: [],
  });

  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
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

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        values.giaTri = state.giaTri;
        if (state.loaiApDungGiamGia === 20) {
          let dsDichVuId = state.dsDichVu?.map((e) => e.id);
          values = { ...values, dsDichVuId };
        } else if (state.loaiApDungGiamGia === 10) {
          let dsNhomDichVuCap1Id = state.dsNhomDichVuCap1?.map((e) => e.id);
          values = { ...values, dsNhomDichVuCap1Id };
        }
        handleSubmit(values);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = onSave;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setState({ dataEdit: null });
    setState({ displayField: false });
    if (refAutoFocus.current) refAutoFocus.current.focus();
  };

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          data.info.tuNgay =
            data.info?.tuNgay && moment(data.info.tuNgay, "YYYY-MM-DD");
          data.info.denNgay =
            data.info?.denNgay && moment(data.info.denNgay, "YYYY-MM-DD");
          form.setFieldsValue(data?.info);
          setState({
            dataEdit: data?.info,
            displayField: data?.info?.hinhThucGiamGia === 20,
            dsDichVu: data?.info.dsDichVu || [],
            dsNhomDichVuCap1: data?.info.dsNhomDichVuCap1 || [],
            loaiApDungGiamGia: data?.info.loaiApDungGiamGia,
          });
        } else {
          form.resetFields();
          setState({ dataEdit: null });
          setState({ displayField: false });
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setState({ dataEdit: null });
        setState({ displayField: false });
      },
    }),
    []
  );

  const onFieldsChangeForm = (changedFields, allFields) => {
    if (changedFields[0].name[0] === "hinhThucGiamGia") {
      setState({ displayField: changedFields[0].value === 20 });
    }
    if (changedFields[0].name[0] === "loaiApDungGiamGia") {
      setState({ loaiApDungGiamGia: changedFields[0].value });
    }
  };

  const handleChangeModal = () => {
    if (state.loaiApDungGiamGia === 20 && modalDichVuRef.current) {
      modalDichVuRef.current.show();
    }
    if (state.loaiApDungGiamGia === 10 && modalNhomDichVuRef.current) {
      modalNhomDichVuRef.current.show();
    }
  };

  const onSaveModal = (arr) => {
    if (state.loaiApDungGiamGia === 10) {
      setState({ dsNhomDichVuCap1: arr });
    } else if (state.loaiApDungGiamGia === 20) {
      setState({ dsDichVu: arr });
    }
  };
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [state.dataEdit]);
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
            onFieldsChange={onFieldsChangeForm}
            initialValues={{
              hinhThucGiamGia: 10,
              cachThucGiamGia: 10,
            }}
          >
            <Form.Item
              label="M?? ch????ng tr??nh"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? ch????ng tr??nh",
                },
              ]}
            >
              <Input
                autoFocus={true}
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? ch????ng tr??nh"
              />
            </Form.Item>
            <Form.Item
              label="T??n ch????ng tr??nh"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n ch????ng tr??nh!",
                },

                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n ch????ng tr??nh!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n ch????ng tr??nh"
              />
            </Form.Item>
            <Form.Item
              label="Gi?? tr???"
              name="giaTri"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p gi?? tr???!",
                },
              ]}
            >
              <NumberFormat
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                placeholder="Vui l??ng nh???p gi?? tr???"
                className="input-option"
                onValueChange={(val) => {
                  setState({ giaTri: val.floatValue });
                }}
              />
            </Form.Item>
            <Form.Item
              label="M?? t???"
              name="moTa"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? t???!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? t???"
              />
            </Form.Item>
            <Form.Item
              label="??p d???ng t??? ng??y"
              name="tuNgay"
              className="item-date"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n t??? ng??y ??p d???ng!",
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                placeholder="Vui l??ng ch???n t??? ng??y ??p d???ng"
              />
            </Form.Item>
            <Form.Item
              label="??p d???ng ?????n ng??y"
              name="denNgay"
              className="item-date"
            >
              <DatePicker
                format={dateFormat}
                placeholder="Vui l??ng ch???n ?????n ng??y ??p d???ng"
              />
            </Form.Item>
            <Form.Item
              label="H??nh th???c mi???n gi???m"
              name="hinhThucGiamGia"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n h??nh th???c gi???m gi??!",
                },
              ]}
            >
              <Select
                data={listHinhThucGiamGia}
                defaultValue={10}
                placeholder="Vui l??ng ch???n h??nh th???c gi???m gi??"
              />
            </Form.Item>
            <Form.Item
              label="C??ch th???c mi???n gi???m"
              name="cachThucGiamGia"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n c??ch th???c gi???m gi??!",
                },
              ]}
            >
              <Select
                data={listCachThucGiamGia}
                defaultValue={10}
                placeholder="Vui l??ng ch???n c??ch th???c gi???m gi??"
              />
            </Form.Item>
            {state.displayField && (
              <Form.Item
                label="Lo???i ??p d???ng"
                name="loaiApDungGiamGia"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n lo???i ??p d???ng gi???m gi??!",
                  },
                ]}
              >
                <Select
                  data={listLoaiApDungGiamGia}
                  placeholder="Vui l??ng ch???n lo???i mi???n gi???m"
                />
              </Form.Item>
            )}
            {state.displayField && (
              <Form.Item label=" " name="chonLaiDichVu" valuePropName="checked">
                <Checkbox>Ch???n l???i d???ch v???</Checkbox>
              </Form.Item>
            )}

            {state.displayField && (
              <Form.Item
                label={
                  <div>
                    DV, nh??m DV ??p d???ng{" "}
                    <Image
                      preview={false}
                      src={require("assets/images/his-core/iconEdit.png")}
                      style={{ cursor: "pointer" }}
                      alt=""
                      onClick={handleChangeModal}
                    />
                  </div>
                }
                style={{ width: "200%" }}
              >
                {state.loaiApDungGiamGia === 20 && (
                  <Input.TextArea
                    disabled
                    value={
                      state.dsDichVu?.length > 0 &&
                      state.dsDichVu?.map((item) => item?.ten)
                    }
                  />
                )}
                {state.loaiApDungGiamGia === 10 && (
                  <Input.TextArea
                    disabled
                    value={
                      state.dsNhomDichVuCap1?.length > 0 &&
                      state.dsNhomDichVuCap1?.map((item) => item?.ten)
                    }
                  />
                )}
              </Form.Item>
            )}

            {state.dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
      <ModalDichVu
        dsDichVu={state.dsDichVu}
        ref={modalDichVuRef}
        modalCheckoutRef={modalDichVuRef}
        onSaveModal={onSaveModal}
      />
      <ModalNhomDichVu
        dsNhomDichVuCap1={state.dsNhomDichVuCap1}
        ref={modalNhomDichVuRef}
        modalCheckoutRef={modalNhomDichVuRef}
        onSaveModal={onSaveModal}
      />
    </>
  );
};

export default forwardRef(FormChuongTrinh);
