import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button as AntButton,
  Card,
  Input,
  Row,
  Col,
  message,
  Upload,
  Slider,
} from "antd";
import {
  SaveOutlined,
  SettingOutlined,
  EyeOutlined,
  SnippetsOutlined,
  CopyOutlined,
  UploadOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Main } from "./styled";
import { getState } from "redux-store/stores";
import stringUtils from "mainam-react-native-string-utils";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import TextTool from "../EditorTool/TextTool";

const FormInfo = ({ form, setZoomValue, zoomValue, ...props }) => {
  const { t } = useTranslation();
  const { id: configId, formInfo = {} } = useSelector((state) => state.config);
  const {
    config: { updateData, onPasteLayout, onCopyLayout },
    component: { init },
  } = useDispatch();
  const layoutCopy = useStore("config.layoutCopy", {});
  const history = useHistory();

  const onCopy = () => {
    message.success(t("editor.daCopyVaoBoNho"));
    const { components, lines } = getState().config;
    onCopyLayout({ components: components, lines: lines });
  };

  const handlePasteLayout = () => {
    onPasteLayout(layoutCopy);
  };

  const onExport = () => {
    const { components, lines } = getState().config;
    const formData = {
      props: formInfo,
      components: components,
      lines: lines,
    };

    const str = JSON.stringify(formData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(str);
    let a = document.createElement("a");
    a.href = dataUri;
    a.download = `${formInfo.ten}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onImport = ({ file }) => {
    const reader = new FileReader();

    if (file.status === "uploading") {
      reader.onload = (function () {
        return function (e) {
          const formData = JSON.parse(e.target.result);
          onPasteLayout({
            components: formData.components,
            lines: formData.lines,
          });
          updateData({
            formInfo: formData.props,
          });
        };
      })(file);

      reader.readAsText(file.originFileObj);
    }
  };

  const onHandleZome = (value) => {
    setZoomValue && setZoomValue(value);
  };

  const onSave = () => {
    props.handleSubmit && props.handleSubmit(formInfo);
  };
  const onConfig = () => {
    init({ type: "formConfig", key: stringUtils.guid() });
  };

  const onChange = (type) => (e) => {
    switch (type) {
      case "ma":
      case "ten":
      case "apiTemplate":
      case "api":
        updateData({
          formInfo: { ...formInfo, [type]: e?.target?.value || e },
        });
        break;
      default:
        break;
    }
  };

  const onBack = () => {
    history.push(`/danh-muc/bao-cao`);
  };

  return (
    <Main>
      <Card
        bordered={false}
        title={
          <>
            <span
              style={{ color: "#08AAA8", cursor: "pointer" }}
              onClick={onBack}
            >
              <ArrowLeftOutlined style={{ marginRight: "12px" }} />
            </span>
            {formInfo?.ten}
          </>
        }
        size={"small"}
        extra={
          <div className={"extra-content"}>
            <div className={"zoom-tool"}>
              <span>{"Zoom "}</span>

              <Slider
                className={"slider-tool"}
                value={zoomValue}
                onChange={onHandleZome}
              />

              <Input
                onChange={(e) => {
                  onHandleZome(e.target.value);
                }}
                size={"small"}
                suffix={"%"}
                value={zoomValue}
                style={{ marginLeft: 6, width: 66 }}
              />
            </div>

            <AntButton
              className={"extra-item"}
              size={"small"}
              icon={<DownloadOutlined />}
              onClick={onExport}
              title={"Export"}
            />

            <Upload
              showUploadList={false}
              onChange={onImport}
              accept={".json"}
              className={"custom-style"}
            >
              <AntButton
                className={"extra-item"}
                size={"small"}
                icon={<UploadOutlined />}
                title={"Import"}
              />
            </Upload>

            <AntButton
              className={"extra-item"}
              icon={<CopyOutlined />}
              size={"small"}
              title={"Copy layout"}
              onClick={onCopy}
            />

            <AntButton
              className={"extra-item"}
              size={"small"}
              icon={<SnippetsOutlined />}
              title={"Paste layout"}
              disabled={
                layoutCopy.components?.length < 1 &&
                layoutCopy.lines?.length < 1
              }
              onClick={handlePasteLayout}
            />

            <a href={`/editor/preview/${configId}`} target={"_blank"}>
              <AntButton
                className={"extra-item"}
                size={"small"}
                icon={<EyeOutlined />}
                title={"Preview"}
              />
            </a>
          </div>
        }
      >
        <div className="form-info">
          <Row className="form-info-detail" gutter={[12, 12]}>
            <Col sm={24} md={8}>
              <label>Mã phiếu:</label>
              <InputTimeout
                size={"small"}
                onChange={onChange("ma")}
                value={formInfo?.ma}
              />
            </Col>
            <Col sm={24} md={8}>
              <label>Tên phiếu:</label>
              <InputTimeout
                size={"small"}
                onChange={onChange("ten")}
                value={formInfo?.ten}
              />
            </Col>
            <Col sm={24} md={8}>
              <label>Api:</label>
              <InputTimeout
                size={"small"}
                onChange={onChange("api")}
                value={formInfo?.api}
              />
            </Col>
            <Col sm={24} md={8}>
              <label>Api Template:</label>
              <InputTimeout
                size={"small"}
                onChange={onChange("apiTemplate")}
                value={formInfo?.apiTemplate}
              />
            </Col>
            <Col sm={24} md={8}>
              <label>Style chữ</label>
              <TextTool type="config" />
            </Col>
          </Row>
          <div className="form-info-action">
            <AntButton
              icon={<SaveOutlined />}
              size={"small"}
              type={"primary"}
              onClick={onSave}
            >
              {"Lưu"}
            </AntButton>
            <AntButton
              icon={<SettingOutlined />}
              size={"small"}
              type={"dashed"}
              onClick={onConfig}
            >
              {"Cấu hình"}
            </AntButton>
          </div>
        </div>
      </Card>
    </Main>
  );
};

export default FormInfo;
