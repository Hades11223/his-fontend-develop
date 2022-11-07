import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import { Button } from "components";
import { checkRole } from "utils/role-utils";
import { CloseOutlined } from "@ant-design/icons";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch } from "react-redux";

function EditWrapper(props) {
  const {
    title,
    onCancel,
    onSave,
    onAddNewRow,
    actionHeaderClass,
    isShowTitle,
    isShowSaveButton = true,
    isShowCancelButton = true,
    layerId,
    leftActions,
    roleSave,
    roleEdit,
    isShowCoppyButton = false,
    onCoppy
  } = props;
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    if (layerId)
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
  refClickBtnSave.current = onSave;

  const hanldeHiddenCancel = () => {
    if (props.forceShowButtonCancel) {
      return false;
    }
    if (roleEdit || roleSave) {
      if (props.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return props.isShowCancelButton ? false : true;
    }
  };

  const hanldeHiddenSave = () => {
    if (props.forceShowButtonSave) {
      return false;
    }
    if (roleEdit || roleSave) {
      if (props.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return props.isShowSaveButton ? false : true;
    }
  };

  const hanldeHiddenNew = () => {
    if (props.isHiddenButtonAdd) {
      return true;
    }
    if (props.isEditAndPressRow) {
      // hiển thị thêm mới button khi chọn 1 row , (đã xác nhận với Vân chuyên viên)
      return false;
    }
    if (roleSave && props.showAdded) {
      return !checkRole(roleSave);
    } else {
      return props.showAdded ? false : true;
    }
  };

  return (
    <Main className="edit-wrapper">
      <div
        className={
          actionHeaderClass
            ? `action-header ${actionHeaderClass}`
            : "action-header"
        }
      >
        <div className="align-center">
          {isShowTitle == false ? null : <span className="title">{title}</span>}
          {!hanldeHiddenNew() && (
            <Button
              type="success"
              onClick={onAddNewRow}
              rightIcon={<img src={IcCreate} alt="" />}
              iconHeight={15}
              minWidth={100}
            >
              Thêm mới
            </Button>
          )}
        </div>
      </div>
      <div className="children">{props.children}</div>
      <div className="bottom-actions">
        <div className="left-actions">{leftActions}</div>
        <div className="button-bottom-modal">
          {isShowCancelButton && (
            <Button
              type="default"
              onClick={onCancel}
              hidden={hanldeHiddenCancel()}
              rightIcon={<CloseOutlined />}
              iconHeight={15}
              minWidth={100}
            >
              {"Hủy"}
            </Button>
          )}

          {isShowSaveButton && (
            <Button
              type="primary"
              onClick={onSave}
              hidden={hanldeHiddenSave()}
              rightIcon={
                <img src={require("assets/images/kho/save.png")}></img>
              }
              iconHeight={15}
              minWidth={100}
            >
              Lưu [F4]
            </Button>
          )}
          {isShowCoppyButton && (
            <Button
              type="default"
              onClick={onCoppy}
              iconHeight={15}
              minWidth={100}
            >
              {"Sao chép"}
            </Button>
          )}
        </div>
      </div>
    </Main>
  );
}

export default EditWrapper;
