import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { Checkbox, Input, Form, InputNumber } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import Select from "components/Select";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import { useDispatch } from "react-redux";
const CreateOrUpdateGroupService1 = (
  {
    handleSubmit,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap1,
    onCancel,
    listtrangThaiHoanThanh,
    listtrangThaiKhongHoanThanh,
    listtrangThaiDichVu,
    dataSearch,
    getAllDichVuCap2,
    listAllBaoCao,
    getListAllBaoCao,
    editStatus,
    layerId,
  },
  ref
) => {
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState(null);
  useEffect(() => {
    form.resetFields();
    if (dataSearch?.nhomDichVuCap2Id) {
      form.setFieldsValue({
        nhomDichVuCap2Id: dataSearch?.nhomDichVuCap2Id || null,
      });
    }
    if (dataSearch?.nhomDichVuCap1Id) {
      form.setFieldsValue({
        nhomDichVuCap1Id: dataSearch.nhomDichVuCap1Id || null,
      });
    }

    if (!listAllBaoCao?.length) {
      getListAllBaoCao({ page: "", size: "" });
    }
  }, [dataSearch]);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.editGroup3Id) {
          form.setFieldsValue({
            ...data?.info,
            nhomDichVuCap1Id: data?.info?.nhomDichVuCap1?.id,
          });
          setdataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setdataEdit(null);
        }
      },
      resetFields: () => {
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
  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit({ ...values });
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
  }, []);

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
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="M?? nh??m dv c???p 3"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 3!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 3 kh??ng qu?? 20 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p m?? nh??m dv c???p 3!",
                },
                // {
                //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
                //   message: 'M?? ph???i c?? ??t nh???t m???t k?? t??? l?? ch???!'
                // }
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? nh??m dv c???p 3"
              />
            </Form.Item>
            <Form.Item
              label="T??n nh??m dv c???p 3"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n nh??m dv c???p 3!",
                },
                {
                  max: 1000,
                  message:
                    "Vui l??ng nh???p t??n nh??m dv c???p 3 kh??ng qu?? 1000 k?? t???!",
                },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p t??n nh??m dv c???p 3!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p nh??m dv c???p 3"
              />
            </Form.Item>
            <Form.Item
              label="T??n nh??m nh??m dv c???p 1"
              name="nhomDichVuCap1Id"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n nh??m nh??m dv c???p 1!",
                },
              ]}
            >
              <Select
                data={listAllNhomDichVuCap1}
                placeholder="Ch???n nh??m dv c???p 1"
                onChange={(e) => {
                  if (e) {
                    getAllDichVuCap2({
                      page: 0,
                      size: 9999,
                      nhomDichVuCap1Id: e,
                    });
                  } else {
                    getAllDichVuCap2({
                      page: 0,
                      size: 9999,
                    });
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label="T??n nh??m nh??m dv c???p 2"
              name="nhomDichVuCap2Id"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n nh??m nh??m dv c???p 2!",
                },
              ]}
            >
              <Select
                data={listAllNhomDichVuCap2}
                placeholder="Ch???n nh??m dv c???p 2"
              />
            </Form.Item>

            <Form.Item
              label="STT tr??n b??o c??o"
              name="stt"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p STT!",
                },
              ]}
            >
              <InputNumber
                className="input-option"
                type="number"
                min={"1"}
                placeholder="Nh???p STT"
              />
            </Form.Item>

            <Form.Item label="T??n b??o c??o" name="phieuChiDinhId">
              <Select data={listAllBaoCao} placeholder="Ch???n b??o c??o" />
            </Form.Item>

            <Form.Item
              label="Tr???ng th??i ho??n th??nh dv"
              name="trangThaiHoanThanh"
            >
              <Select
                data={[...listtrangThaiHoanThanh]}
                placeholder="Ch???n tr???ng th??i ho??n th??nh dv"
              />
            </Form.Item>
            <Form.Item
              label="Tr???ng th??i kh??ng ho??n th??nh dv"
              name="dsTrangThaiKhongDuocHoanThanh"
            >
              <Select
                mode="multiple"
                showArrow={true}
                data={listtrangThaiKhongHoanThanh}
                placeholder="Ch???n tr???ng th??i kh??ng ho??n th??nh dv"
              />
            </Form.Item>
            <Form.Item label="Tr???ng th??i sinh s??? th??? t???" name="trangThaiLayStt">
              <Select
                showArrow={true}
                data={listtrangThaiDichVu}
                placeholder="Ch???n tr???ng th??i sinh s??? th??? t???"
              />
            </Form.Item>
            <Form.Item name="boQuaKetQuaLau" valuePropName="checked">
              <Checkbox>B??? qua k???t qu??? l??u</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttUuTien" valuePropName="checked">
              <Checkbox>Sinh s??? ri??ng cho NB ??u ti??n</Checkbox>
            </Form.Item>
            <Form.Item name="tachSttNoiTru" valuePropName="checked">
              <Checkbox>Sinh s??? ri??ng cho NB N???i tr??</Checkbox>
            </Form.Item>
            <Form.Item name="theoYeuCau" valuePropName="checked">
              <Checkbox>Dv theo y??u c???u</Checkbox>
            </Form.Item>
            {dataEdit && (
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
              </Form.Item>
            )}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdateGroupService1);
