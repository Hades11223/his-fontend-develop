import React, { useEffect, useRef } from "react";
import { Row } from "antd";
import { Button } from "components";
import { Main } from "./styled";
import { checkRole } from "utils/role-utils";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

function Index({
  layerId,
  onOk,
  classNameWrapperChildren = "",
  disabledBtnOk,
  border = true,
  additionBtn = null,
  ...props
}) {
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
            onEvent: () => {
              refClickBtnSave.current && refClickBtnSave.current();
            },
          },
        ],
      });
  }, []);

  refClickBtnSave.current = onOk;

  const hanldeHiddenCancel = () => {
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        if (props.roleSave) {
          return !checkRole(props.roleSave);
        } else return !checkRole(props.roleEdit);
      }
    } else {
      return props.hiddenOk ? props.hiddenOk : false;
    }
  };
  const hanldeHiddenSave = () => {
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        if (props.roleSave) {
          return !checkRole(props.roleSave);
        } else return !checkRole(props.roleEdit);
      }
    } else {
      return props.hiddenOk ? props.hiddenOk : false;
    }
  };

  return (
    <Main className="create-wrapper-style" border={border}>
      {props.title && (
        <div className="header-create">
          <div className="create-title">{props.title}</div>
          {props.icon1}
          {props.icon2}
        </div>
      )}
      <div className={`create-body ${classNameWrapperChildren}`}>
        <Row>{props.children}</Row>
      </div>
      <div className="button-bottom-modal">
        <Button
          type={"default"}
          onClick={props.onCancel}
          hidden={hanldeHiddenCancel()}
          rightIcon={<CloseOutlined />}
          iconHeight={15}
          minWidth={100}
        >
          {props.cancelText ? props.cancelText : "Hủy"}
        </Button>
        {additionBtn && (
          <Button
            type={"primary"}
            onClick={additionBtn?.onClick}
            rightIcon={additionBtn?.rightIcon}
            iconHeight={15}
            minWidth={100}
          >
            {additionBtn?.text}
          </Button>
        )}
        <Button
          type={"primary"}
          onClick={onOk}
          loading={props.loading}
          hidden={hanldeHiddenSave()}
          disabled={disabledBtnOk}
          rightIcon={
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            />
          }
          iconHeight={15}
          minWidth={100}
        >
          {props.okText ? props.okText : "Thêm mới"}
        </Button>
      </div>
    </Main>
  );
}

export default Index;
