import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Card, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Properties from "./components/Properties";
import Config from "components/editor";
import TextTool from "components/editor/config/EditorTool/TextTool";
import { Main } from "./styled";
import FormInfo from "components/editor/config/FormInfo";
import { useTranslation } from "react-i18next";
import { EMRProvider } from "../context/EMR";
import { checkComponentDisable } from "utils/editor-utils";
import { useStore } from "hook";

const ConfigPage = (props) => {
  const { t } = useTranslation();
  const { getById, onUpdate } = useDispatch().config;
  const { loading } = useSelector((state) => state.config);
  const { width: windowWidth } = useSelector((state) => state.application);
  const { layoutType = "default" } = useSelector(
    (state) => state.config.formInfo || {}
  );
  const auth = useStore("auth.auth", {});
  const refContextValue = useRef({
    isDisable: (...rest) => {
      return checkComponentDisable(auth, ...rest);
    },
  });
  const [state, _setState] = useState({
    zoomValue: 100,
    expandSidebar: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const configRef = useRef(null);
  const propRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    setState({
      zoomValue: layoutType === "default" ? 100 : 70,
    });
  }, [layoutType]);

  useEffect(() => {
    if (params.formId) {
      getById({ id: params.formId });
    }
  }, [params.formId]);

  const handleSubmit = (formInfo = {}) => {
    if (params.formId) {
      const payload = {
        id: params.formId,
        ...configRef.current.collect(),
        properties: {
          ...propRef.current.collectProps(),
        },
        formInfo: formInfo,
      };
      onUpdate(payload);
    }
  };

  const changeState = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const toggerSidebar = () => {
    setState({
      expandSidebar: !state.expandSidebar,
    });
  };
  useEffect(() => {
    setState({
      expandSidebar: windowWidth > 1300,
    });
  }, [windowWidth]);

  return (
    <EMRProvider value={refContextValue.current}>
      <Main>
        <div className="layout-body">
          <div className="layout-middle" style={{}}>
            <div className="toolbar-top">
              <FormInfo
                handleSubmit={handleSubmit}
                zoomValue={state.zoomValue}
                setZoomValue={changeState("zoomValue")}
                expandSidebar={state.expandSidebar}
              />
              {/* <TextTool /> */}
            </div>
            <Spin spinning={loading}>
              <Config zoomValue={state.zoomValue / 100} ref={configRef} />
            </Spin>
          </div>
          <div
            className={`layout-right-side ${
              state.expandSidebar ? "expand" : "collape"
            }`}
          >
            <Card
              title={
                <div className="header">
                  <Button
                    className="expand"
                    onClick={toggerSidebar}
                    // type="primary"
                    // onClick={this.toggleCollapsed}
                    size={"small"}
                  >
                    {state.expandSidebar ? (
                      <MenuUnfoldOutlined />
                    ) : (
                      <MenuFoldOutlined />
                    )}
                  </Button>
                  <span>{t("editor.catDatThuocTinh")}</span>
                </div>
              }
              size={"small"}
              bordered={false}
            >
              <div className="properties-label">{t("editor.thuocTinh")}</div>
              <Properties ref={propRef} handleSubmit={handleSubmit} />
            </Card>
          </div>
        </div>
      </Main>
    </EMRProvider>
  );
};

export default ConfigPage;
