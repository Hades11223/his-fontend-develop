import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { InputNumber, Upload, Button, Checkbox, Row, Col, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import fileProvider from "data-access/file-provider";
import { Main } from "./styled";
import InputPixcel from "components/editor/config/InputPixcel";
import MarginConfig from "components/editor/config/MarginConfig";
import FieldName from "components/editor/config/EditorTool/FieldName";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";

const ImageProps = (props, ref) => {
  const { t } = useTranslation();
  const api = useSelector((state) => state.config.formInfo?.api);
  const { apiFields } = props;
  const [state, _setState] = useState({
    defaultImageUpload: [],
    fieldName: "",
    width: "",
    height: "",
    nameImage: "",
    fromEMR: false,
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
    allowSelectImage: true,
    selectMultilImage: false,
    countImageOnRow: 1,
    totalImage: 1,
    fileList: [],
    removeOnPrint: false,
    isLogo: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.props) {
      setState({
        fieldName: props.state.props.fieldName,
        width: props.state.props.width,
        height: props.state.props.height,
        defaultImageUpload: props.state.props.defaultImageUpload || [],
        fromEMR: props.state.props.fromEMR,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        allowSelectImage: props.state.props.allowSelectImage !== false,
        marginTop: props.state.props.marginTop,
        marginRight: props.state.props.marginRight,
        marginLeft: props.state.props.marginLeft,
        marginBottom: props.state.props.marginBottom,
        selectMultilImage: props.state.props.selectMultilImage,
        countImageOnRow: props.state.props.countImageOnRow || 1,
        totalImage: props.state.props.totalImage || 1,
        removeOnPrint: props.state.props.removeOnPrint || false,
        isLogo: props.state.props.isLogo || false,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    width: state.width,
    height: state.height,
    defaultImageUpload: state.defaultImageUpload,
    fromEMR: state.fromEMR,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
    allowSelectImage: state.allowSelectImage,
    marginTop: state.marginTop,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    marginBottom: state.marginBottom,
    totalImage: state.totalImage,
    countImageOnRow: state.countImageOnRow,
    selectMultilImage: state.selectMultilImage,
    removeOnPrint: state.removeOnPrint,
    isLogo: state.isLogo,
  }));

  const handleChangeImage = async (info, fileList) => {
    if (!api) {
      message.error(t("editor.chuaCauHinhApi"));
      return;
    }
    if (state.selectMultilImage) {
      if (
        fileList.length + state.defaultImageUpload.length >
        state.totalImage
      ) {
        message.error(
          t("editor.soLuongAnhPhaiNhoHon").replace("{0}", state.totalImage)
        );
      } else {
        setState({
          fileList: fileList,
        });
      }
    } else {
      setState({
        fileList: fileList,
      });
    }
    return false;
  };

  useEffect(() => {
    if (state.fileList && state.fileList.length) {
      fileProvider
        .uploadMultilImage({ api, files: state.fileList })
        .then((s) => {
          setState({
            defaultImageUpload: state.selectMultilImage
              ? [
                  ...state.defaultImageUpload,
                  ...(s.data || []).map((item) => item?.data),
                ].filter((item) => item)
              : [`${s.data[0]?.data}`],
            fileList: [],
          });
        });
    }
  }, [state.fileList]);
  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const changeCheckbox = (type) => (e) => {
    if (type == "selectMultilImage") {
      if (
        Array.isArray(state.defaultImageUpload) &&
        state.defaultImageUpload.length
      ) {
        setState({ defaultImageUpload: [state.defaultImageUpload.pop()] });
      } else {
        setState({ defaultImageUpload: [] });
      }
    }
    onChangeValue(type)(e.target.checked);
  };

  const onChangeMargin = (type, value) => {
    let key = null;
    switch (type) {
      case "top":
        key = "marginTop";
        break;
      case "bottom":
        key = "marginBottom";
        break;
      case "left":
        key = "marginLeft";
        break;
      case "right":
        key = "marginRight";
        break;
    }
    setState({
      [key]: value,
    });
  };
  const handleDeleteImageDefault = (link) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("editor.xoaAnhDaChon")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          const newListImageDefault = state.defaultImageUpload.filter(
            (image) => image !== link
          );
          setState({
            defaultImageUpload: newListImageDefault,
          });
        }
      );
  };
  const renderName = () => {
    if (state.selectMultilImage) {
      return state.defaultImageUpload.map((name, index) => (
        <div className="image-default-name" key={index}>
          <Button
            size="small"
            className="icon-remove"
            icon={<CloseOutlined />}
            onClick={handleDeleteImageDefault(name)}
          ></Button>
          <span title={name}>{name.split("/").pop()}</span>
        </div>
      ));
    } else {
      return (
        <div className="image-default-name" title={state.defaultImageUpload[0]}>
          {(state.defaultImageUpload[0] || "").split("/").pop()}
        </div>
      );
    }
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Ảnh logo: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("isLogo")}
            checked={state.isLogo}
          />
        </Col>
      </Row>
      {state.isLogo ? (
        <Row gutter={[12, 12]} style={{ marginTop: 10 }}>
          <Col span={8}>
            <span>{"Rộng: "}</span>
          </Col>
          <Col span={16}>
            <InputPixcel
              size={"small"}
              value={state.width}
              onChange={onChangeValue("width")}
            />
          </Col>
          <Col span={8}>
            <span>{"Cao: "}</span>
          </Col>
          <Col span={16}>
            <InputPixcel
              size={"small"}
              value={state.height}
              onChange={onChangeValue("height")}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row gutter={[12, 12]} style={{ marginTop: 10 }}>
            <Col span={8}>
              <span>{"Field name: "}</span>
            </Col>
            <Col span={16}>
              <FieldName
                style={{ width: "100%" }}
                onSelect={onChangeValue("fieldName")}
                value={state.fieldName}
                apiFields={apiFields || []}
              />
            </Col>
            <Col span={8}>
              <span>{"Ảnh mặc định: "}</span>
            </Col>
            <Col span={16}>
              <Upload
                beforeUpload={handleChangeImage}
                showUploadList={false}
                multiple={true}
                fileList={state.fileList}
                accept=".png,.jpg,.jpeg,.bmp"
              >
                <Button size={"small"}>
                  <UploadOutlined /> Upload
                </Button>
              </Upload>
              <span className={"name-image"}>{renderName()}</span>
            </Col>
            <Col span={8}>
              <span>{"Rộng: "}</span>
            </Col>
            <Col span={16}>
              <InputPixcel
                size={"small"}
                value={state.width}
                onChange={onChangeValue("width")}
              />
            </Col>
            <Col span={8}>
              <span>{"Cao: "}</span>
            </Col>
            <Col span={16}>
              <InputPixcel
                size={"small"}
                value={state.height}
                onChange={onChangeValue("height")}
              />
            </Col>
            <Col span={8}>
              <span>{"Khoá ở cấp ký: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                value={state.blockSignLevel}
                onChange={onChangeValue("blockSignLevel")}
                size={"small"}
              />
            </Col>
            <Col span={8}>
              <span>{"Cho phép chọn ảnh: "}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={changeCheckbox("allowSelectImage")}
                checked={state.allowSelectImage}
              />
            </Col>
            <Col span={8}>
              <span>{"Hiển thị nhiều ảnh:"}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={changeCheckbox("selectMultilImage")}
                checked={state.selectMultilImage}
              />
            </Col>
            {state.selectMultilImage && (
              <>
                <Col span={8}>
                  <span>{"Số lượng ảnh : "}</span>
                </Col>
                <Col span={16}>
                  <InputNumber
                    value={state.totalImage}
                    onChange={onChangeValue("totalImage")}
                    size={"small"}
                  />
                </Col>
                <Col span={8}>
                  <span>{"Số lượng cột : "}</span>
                </Col>
                <Col span={16}>
                  <InputNumber
                    value={state.countImageOnRow}
                    onChange={onChangeValue("countImageOnRow")}
                    size={"small"}
                  />
                </Col>
              </>
            )}
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span>{"Read Only: "}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={changeCheckbox("readOnly")}
                checked={state.readOnly}
              />
            </Col>
            <Col span={8}>
              <span>{"Ẩn ảnh mặc định khi in: "}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={changeCheckbox("removeOnPrint")}
                checked={state.removeOnPrint}
              />
            </Col>
          </Row>
        </>
      )}
      {/* <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("fromEMR")}
            checked={state.fromEMR}
          />
        </Col> */}
      <Row gutter={[12, 12]} style={{ marginTop: 10 }}>
        <Col span={8}>
          <span>{"Khoảng Cách Ngoài: "}</span>
        </Col>

        <Col span={16}>
          <MarginConfig
            onChange={onChangeMargin}
            top={state.marginTop}
            bottom={state.marginBottom}
            right={state.marginRight}
            left={state.marginLeft}
          />
        </Col>
      </Row>

      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {/* {state.fromEMR && (
        <Row gutter={[12, 12]} style={{ marginBottom: 50 }}>
          <Col span={8}>
            <span>{"Giá trị ban đầu từ HIS: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              onChange={changeCheckbox("defaultFromHIS")}
              checked={state.defaultFromHIS}
            />
          </Col>
        </Row>
      )} */}
    </Main>
  );
};

export default forwardRef(ImageProps);

// export default connect(mapState, mapDispatch)(ImageProps);
