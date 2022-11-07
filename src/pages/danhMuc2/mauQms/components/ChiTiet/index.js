import React, { useEffect, useRef, useState } from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { connect } from "react-redux";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import CreatedWrapper from "components/CreatedWrapper";
const ChiTiet = (props) => {
  const [form] = Form.useForm();
  const {
    getUtils,
    listloaiQms,
    createOrEdit,
    currentItem,
    onSearch,
    layerId,
    onRegisterHotkey,
  } = props;
  const refClickBtnSave = useRef();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getUtils({ name: "loaiQms" });
  }, []);

  const refAutoFocus = useRef(null);

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  const loadCurrentItem = (item) => {
    if (item) {
      const { ma, ten, loaiQms, url, id, active } = item || {};
      const data = {
        ma,
        ten,
        loaiQms,
        url,
        id,
        active,
      };

      form.setFieldsValue(data);
      setState({ currentId: id, currentData: data });
    } else {
      form.resetFields();
    }
  };

  const onSave = () => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  const onHanldeSubmit = (values) => {
    const { ma, ten, loaiQms, url, active } = values;
    const data = {
      ma,
      ten,
      loaiQms,
      url,
      id: state.currentId,
      active,
    };
    createOrEdit(data).then((s) => {
      form.resetFields();
      onSearch({});
    });
  };
  const handleHiddenButtonDependRole = () => {
    let roleSave = [ROLES["DANH_MUC"].MAU_QMS_THEM];
    let roleEdit = [ROLES["DANH_MUC"].MAU_QMS_SUA];
    if (roleEdit || roleSave) {
      if (props.stateParent.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };

  const onReset = () => {
    if (currentItem?.id) {
      loadCurrentItem(state.currentData);
    } else {
      loadCurrentItem();
    }
  };

  return (
    <Main>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onReset}
        cancelText="Hủy"
        onOk={onSave}
        okText="Lưu"
        roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
        editStatus={props.stateParent.editStatus}
      >
        <div className="info">
          <fieldset
            disabled={
              props.stateParent.editStatus
                ? !checkRole([ROLES["DANH_MUC"].MAU_QMS_SUA])
                : !checkRole([ROLES["DANH_MUC"].MAU_QMS_THEM])
            }
          >
            <div className="content">
              <Form
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
                onFinish={onHanldeSubmit}
              ></Form>
            </div>
            {/* <div className="footer">
              <div className="left"></div>
              <div className="right">
                {!handleHiddenButtonDependRole() && (
                  <Button className="btn-reset" onClick={onReset}>
                    Hủy
                  </Button>
                )}
                {!handleHiddenButtonDependRole() && (
                  <Button className="btn-save" onClick={onSave}>
                    <span>Lưu</span>
                    <img src={IcSave} />
                  </Button>
                )}
              </div>
            </div> */}
          </fieldset>
        </div>
      </CreatedWrapper>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    utils: { listloaiQms = [] },
    template: { currentItem },
  } = state;

  return {
    listloaiQms,
    currentItem,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  template: { createOrEdit, onSearch },
  phimTat: { onRegisterHotkey },
}) => ({
  getUtils,
  createOrEdit,
  onSearch,
  onRegisterHotkey,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChiTiet);
