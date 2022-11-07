import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Row, Col, Button as AntButton } from "antd";
import { Button } from "components";
import { Main } from "./styled";
import CoresProps from "components/editor/cores/Props";
import components from "components/editor/cores";
import Descriptions from "../Description";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Properties = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const desRef = useRef(null);
  const configRef = useRef(null);
  const { id } = useSelector((state) => state.config);
  const { apiFields = [] } = useSelector((state) => state.files);
  const component = useSelector((state) => state.component);
  const {
    config: { updateComponents, onRemoveComponent, onCopyComponent },
  } = useDispatch();

  const [state, setState] = useState({});
  const [desVisible, setDesVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      collectProps: () => {
        const advance = desRef.current;
        const info = configRef.current;
        return { ...advance, ...info, id, key: component.key };
      },
    };
  });

  useEffect(() => {
    if (!component || !component.key) {
      setState({});
    } else {
      setState(component);
    }
  }, [component]);

  const onDelete = () => {
    onRemoveComponent(component);
  };

  const onCopy = () => {
    onCopyComponent(component);
  };

  const handleShowDrawer = () => {
    setDesVisible(true);
  };

  const handleHideDrawer = () => {
    setDesVisible(false);
  };

  const getComponentName = () => {
    if (state.type == "formConfig") {
      return t("editor.cauHinhBieuMau");
    }
    return components[state.type]?.name || "";
  };

  const getComponent = () => {
    return React.createElement(CoresProps[state.type], {
      ref: configRef,
      state,
      updateComponents,
      apiFields,
      handleSubmit,
    });
  };

  return (
    <Main>
      <div className={"properties-contain"}>
        {state.key ? (
          <>
            <Row gutter={[12, 12]} className="info-component">
              <Col span={8}>
                <div className={"c-name-label"}>{"Component :"}</div>
              </Col>
              <Col span={16}>
                <div className={"component-name"}>
                  <span>{getComponentName()}</span>
                  {state.type != "formConfig" && (
                    <AntButton
                      title={t("editor.vietMoTaChoComponent")}
                      onClick={handleShowDrawer}
                      icon={<EditOutlined />}
                      size={"small"}
                    />
                  )}
                </div>
              </Col>
            </Row>
            <div className="component-config-body">{getComponent()}</div>
            {state.type != "formConfig" && (
              <div className="action-bottom">
                <Button
                  block
                  onClick={onCopy}
                  rightIcon={<CopyOutlined />}
                  size={"small"}
                  type={"default"}
                >
                  {"Copy Component"}
                </Button>
                <Button
                  block
                  onClick={onDelete}
                  rightIcon={<DeleteOutlined />}
                  size={"small"}
                  type={"error"}
                >
                  {"Xoá Component"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Empty description={t("editor.vuiLongChonComponent")} />
        )}
      </div>

      <Descriptions
        ref={desRef}
        visible={desVisible}
        onClose={handleHideDrawer}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Main>
  );
});

export default Properties;
