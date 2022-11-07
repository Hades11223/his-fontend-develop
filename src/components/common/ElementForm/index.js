import { CloseOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import { Button } from "components";
import { checkRole } from "utils/role-utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Main, WrapperStyledForm } from "./styled";

const FormElement = ({
  renderForm = () => <></>,
  // set mặc định lúc resetField form
  initValueForm ,
  // custom value set vào form lúc setFieldValue
  getFieldValue,
  layerId,
  loading,
  roleEdit,
  roleSave,
  dataEdit, // lấy trong redux
  createOrEdit, // là một promise
  // sau khi submit: () => () => {}
  afterSubmitSuccess,
  disabledFieldSet,

  // updateData _editData vào redux
  updateData = () => {},
  // load lại dữ liệu sau khi submit
  dataSearch = {},
  getData,

  classHeader = "",
  title,

  classNameForm,
  contentHeader,
  onCancel,
  mapToBody = (data) => data,
  payloadSubmit = {},
  widthItem = 50
  // isShowButtonNew,
  // onClickBtnNew = () => {},
}) => {
  const [form] = Form.useForm();
  const [_state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  // ----
  const resetField = () => {
    form.resetFields();
    if (initValueForm) initValueForm({ form });
  };
  const _getFieldValue = getFieldValue ? getFieldValue : (data) => data;
  // ---- end

  //----- phím tắt ------
  const refAutoFocus = useRef(null);
  const refClickBtnSave = useRef();
  const refClickBtnAdd = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    if (layerId) {
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 112, //F1
            onEvent: (e) => {
              refClickBtnAdd.current && refClickBtnAdd.current(e);
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
    }
  }, []);
  refClickBtnAdd.current = () => {
    resetField();
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    updateData({ _dataEdit: {} });
  };
  // --------

  useEffect(() => {
    if (Object.keys(dataEdit).length) {
      form.setFieldsValue(_getFieldValue(dataEdit));
    } else {
      resetField();
    }
  }, [dataEdit]);

  const _afterSubmitSucess = afterSubmitSuccess
    ? afterSubmitSuccess({ form })
    : () => {
        resetField();
      };
  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (createOrEdit)
          createOrEdit(mapToBody(values), {
            dataEdit,
            resetField,
            ...payloadSubmit,
          })
            .then((res) => {
              if (res && res.code === 0) {
                if (getData) getData(dataSearch);
                _afterSubmitSucess();
              }
            })
            .catch((e) => {
              if (e?.message) message.error(e?.message);
            });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleSubmit;

  // ấn nút hủy
  const __onCancel = () => {
    if (dataEdit?.id) {
      form.setFieldsValue(_getFieldValue(dataEdit));
    } else {
      resetField();
    }
  };

  const handleCancel = onCancel
    ? onCancel({ callback: __onCancel, form })
    : __onCancel;

  // --- check quyền để ẩn button
  const handleHiddenBtn = () => {
    if (roleEdit || roleSave) {
      return !checkRole(dataEdit?.id ? roleEdit : roleSave);
    } else {
      return false;
    }
  };
  return (
    <Main>
      <div
        className={
          classHeader ? `action-header ${classHeader}` : "action-header"
        }
      >
        <div className="align-center">
          {title && <span className="title">{title}</span>}
          {contentHeader && contentHeader({ handleHiddenBtn, form })}
        </div>
      </div>
      <WrapperStyledForm widthItem={widthItem}>
        <fieldset disabled={disabledFieldSet}>
          <Form
            disabled={
              dataEdit?.id ? !checkRole(roleEdit) : !checkRole(roleSave)
            }
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className={
              classNameForm ? `${classNameForm} form-custom` : "form-custom"
            }
          >
            {renderForm({ form, refAutoFocus, autoFocus: true })}
          </Form>
        </fieldset>
      </WrapperStyledForm>
      <div className="bottom-actions">
        <div className="button-bottom-modal">
          <Button
            type={"default"}
            onClick={handleCancel}
            hidden={handleHiddenBtn()}
            iconHeight={15}
            rightIcon={<CloseOutlined />}
            minWidth={100}
          >
            Hủy
          </Button>
          <Button
            type={"primary"}
            onClick={handleSubmit}
            loading={loading}
            hidden={handleHiddenBtn()}
            minWidth={100}
            rightIcon={
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            }
            iconHeight={15}
          >
            {layerId ? "Lưu [F4]" : "Lưu"}
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default FormElement;
