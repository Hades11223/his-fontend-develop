import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form } from "antd";
import { CreatedWrapper, Select } from "components";
import { ROLES, THIET_LAP_CHUNG } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch, useSelector } from "react-redux";
import DsDichVuTrongGoi from "./DsDichVuTrongGoi";
import { InputNumberFormat } from "components/common";
import { useThietLap } from "hook";

const FormGoiPtTt = (
  { handleSubmit, onCancel, editStatus, layerId, listAllPhong },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const { getAllTongHopDichVuCap1 } = useDispatch().nhomDichVuCap1;
  const [dataNHOM_DV_GOI10NGAY] = useThietLap(
    THIET_LAP_CHUNG.NHOM_DV_GOI10NGAY
  );
  const { listAllNhomDichVuCap1 = [] } = useSelector(
    (state) => state.nhomDichVuCap1
  );

  console.log("dataNHOM_DV_GOI10NGAY", dataNHOM_DV_GOI10NGAY);

  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setdataEdit] = useState(null);
  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        const nhomDichVuCap1Id = (listAllNhomDichVuCap1 || []).find(
          (x) => x.ma == dataNHOM_DV_GOI10NGAY
        )?.id;
        const giaKhongBaoHiem =
          values?.giaKhongBaoHiem?.toString().replaceAll(".", "") || null;

        const { ma, ten, ghiChu, active } = values;

        const payload = {
          phongThucHienId: values.phongThucHienId,
          dichVu: {
            ma,
            ten,
            giaKhongBaoHiem,
            nhomDichVuCap1Id,
            ghiChu,
          },
          active,
        };

        handleSubmit(payload);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setdataEdit(null);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
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

    getAllTongHopDichVuCap1();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.editGoiPtTtId) {
          const { ma, ten, giaKhongBaoHiem, ghiChu } = data?.info?.dichVu || {};

          form.setFieldsValue({
            ...data?.info,
            ma,
            ten,
            giaKhongBaoHiem,
            ghiChu,
          });
          setdataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setdataEdit(null);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setdataEdit(null);
      },
    }),
    []
  );
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEdit]);
  return (
    <>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText="H???y"
        onOk={handleAddNew}
        okText="L??u [F4]"
        roleSave={[ROLES["DANH_MUC"].NHOM_DICH_VU_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NHOM_DICH_VU_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].NHOM_DICH_VU_THEM]) && !editStatus
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
              label="M?? g??i"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? g??i!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? g??i kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? g??i c???p 1!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? g??i"
              />
            </Form.Item>
            <Form.Item
              label="T??n g??i"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n g??i!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n g??i kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n g??i!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n g??i"
              />
            </Form.Item>
            <Form.Item
              label="????n gi?? kh??ng BH"
              name="giaKhongBaoHiem"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ????n gi?? kh??ng BH!",
                },
              ]}
            >
              <InputNumberFormat
                placeholder="Vui l??ng nh???p ????n gi?? kh??ng BH"
                className="input-option"
                isAllowed={(values, sourceInfo) => {
                  const { value } = values;
                  return value >= 0;
                }}
              />
            </Form.Item>
            <Form.Item
              label="Ph??ng th???c hi???n"
              name="phongThucHienId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n ph??ng th???c hi???n!",
                },
              ]}
            >
              <Select
                data={[...listAllPhong]}
                placeholder="Ch???n ph??ng th???c hi???n"
              />
            </Form.Item>
            <Form.Item label="Ghi ch??" name="ghiChu">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p ghi ch??"
              />
            </Form.Item>

            <Form.Item label="Nh??m DV C???p 1">
              <Input
                className="input-option"
                style={{ backgroundColor: "#f5f5f5" }}
                disabled={true}
                value={
                  (listAllNhomDichVuCap1 || []).find(
                    (x) => x.ma == dataNHOM_DV_GOI10NGAY
                  )?.ten
                }
              />
            </Form.Item>
            {dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}

            {dataEdit && <DsDichVuTrongGoi goiPtTtId={dataEdit} />}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(FormGoiPtTt);
