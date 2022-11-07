import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Checkbox, Input, Form } from "antd";
import { Select } from "components";
import { connect } from "react-redux";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import FormWraper from "components/FormWraper";
const ChiTietKetQua = (props, ref) => {
  const [state, _setState] = useState({});
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const [form] = Form.useForm();
  // const formRef = React.useRef();
  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        if (state.dataEditDefault?.id) {
          values = { ...values, id: state.dataEditDefault.id };
        }
        props.createOrEdit(values).then((s) => {
          if (!state.dataEditDefault?.id) {
            onResetForm();
          }
        });
      })
      .catch((error) => {});
  };
  props.refClickBtnSave.current = handleAddNew;

  useImperativeHandle(
    ref,
    () => ({
      setFields: (data) => {
        setState({ showBox: true, dataEditDefault: data });
        form.setFieldsValue({
          ...data,
          dsDichVuId: (data?.dsDichVuId?.length && data.dsDichVuId) || [],
        });
      },
      resetFields: () => {
        onResetForm();
        refAutoFocus.current.focus();
      },
    }),
    []
  );
  const onResetForm = () => {
    setState({ showBox: false, dataEditDefault: {} });
    form.resetFields();
  };
  const onCancel = () => {
    if (state.dataEditDefault?.id) {
      form.setFieldsValue(state.dataEditDefault);
    } else {
      onResetForm();
    }
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [state.dataEditDefault]);
  return (
    <>
      <EditWrapper
        title="Chi tiết mẫu kết quả"
        onCancel={onCancel}
        onSave={handleAddNew}
        showAdded={false}
        isHiddenButtonAdd
        isShowSaveButton={true}
        isShowCancelButton={true}
        roleSave={[ROLES["DANH_MUC"].MAU_KET_QUA_XN_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MAU_KET_QUA_XN_SUA]}
        editStatus={state.showBox}
      >
        <FormWraper
          disabled={
            state.showBox
              ? !checkRole([ROLES["DANH_MUC"].MAU_KET_QUA_XN_SUA])
              : !checkRole([ROLES["DANH_MUC"].MAU_KET_QUA_XN_THEM])
          }
          // ref={formRef}
          form={form}
          layout="vertical"
          className="form-custom"
        >
          <Form.Item
            label="Mã"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã!",
              },
              // {
              //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
              //   message: "Mã phải có ít nhất một ký tự là chữ!",
              // },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã"
              ref={refAutoFocus}
            />
          </Form.Item>
          <Form.Item
            label="Tên mẫu"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên mẫu!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên mẫu không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên mẫu!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên mẫu"
            />
          </Form.Item>
          <Form.Item
            label="Kết luận"
            name="ketLuan"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập kết luận!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập kết luận!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập kết luận"
            />
          </Form.Item>
          <Form.Item
            label="Kết quả"
            name="ketQua"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập kết quả!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập kết quả!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập kết quả"
              maxLength={2000}
            />
          </Form.Item>
          <Form.Item
            label="Vị thể"
            name="viThe"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vị thể!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập vị thể!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập vị thể"
            />
          </Form.Item>
          <Form.Item
            label="Đại thể"
            name="daiThe"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đại thể!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập đại thể!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập đại thể"
            />
          </Form.Item>
          <Form.Item
            label="Tên xét nghiệm"
            name="dsDichVuId"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tên xét nghiệm!",
              },
            ]}
          >
            <Select
              data={props.listAllDVXetNghiem}
              placeholder="Vui lòng chọn xét nghiệm"
              mode="multiple"
              className="dsDichVu"
            />
          </Form.Item>
          {state.showBox && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </FormWraper>
      </EditWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: { listAllDVXetNghiem = [] },
  } = state;
  return { listAllDVXetNghiem };
};
const mapDispatchToProps = ({ mauKetQuaXN: { createOrEdit, updateData } }) => ({
  createOrEdit,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ChiTietKetQua));
