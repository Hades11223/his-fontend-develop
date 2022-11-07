import React, {
  memo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import T from "prop-types";
import { useSelector } from "react-redux";
import ConfigRender from "./ConfigRender";
import EditingRender from "./EditingRender";
import { Popover, Button } from "antd";
import { MODE } from "utils/editor-utils";
import { useTranslation } from "react-i18next";
import {
  PicLeftOutlined,
  PicRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const Block = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const {
    component: { currentComponent },
  } = useSelector((state) => state.config);

  const comRef = useRef(null);

  const {
    item,
    component,
    updateComponents,
    verticalLine,
    children,
    mode,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    values,
    valuesHIS,
    formChange,
    formId,
    fileTemplate,
    fileConfig,
    capKyDienTuHienTai,
    level,
    layoutType,
  } = props;
  const itemProps = component.props || {};

  const valuesLocal = useMemo(() => {
    if (!values || !itemProps) return {};
    if (
      // values[itemProps.fieldName] !== "" &&
      values[itemProps.fieldName] !== null &&
      values[itemProps.fieldName] !== undefined
    )
      return values;
    else {
      return {
        ...values,
        [itemProps.fieldName]: itemProps.defaultValue, //được gán băng giá trị defaultValue
      };
    }
  }, [values, itemProps]);

  // useEffect(() => {
  //   if (
  //     (itemProps
  //       //  && itemProps.disabled
  //        ) ||
  //     ["title", "layout", "image", "barcode"].includes(component.type)
  //   ) {
  //     const valuesLocal =
  //       values.takeMe || values.patientDocument || itemProps.defaultFromHIS //nếu có gía trị valuesHIS hoặc được đánh dấu là lấy mặc định dữ liệu từ HIS
  //         ? {
  //             ...values,
  //             [itemProps.fieldName]: valuesHIS[itemProps.fieldName], //thì lấy dữ liệu từ HIS
  //           }
  //         : valuesHIS;

  //     if (
  //       itemProps.fromEMR && //được đánh dấu là lấy từ EMR
  //       ["image", "barcode"].includes(component.type) // và thuộc loại image hoặc loại barcode
  //     ) {
  //       if (values[itemProps.fieldName] || !itemProps.defaultFromHIS)
  //         // Nếu có dữ liệu EMR hoặc đánh dấu là ko lấy dữ liệu mặc định từ HIS thì set bằng giá trị hiện tại của EMR
  //         valuesLocal[itemProps.fieldName] = values[itemProps.fieldName];
  //     }
  //     setState({
  //       localValues: valuesLocal,
  //     });
  //   } else {
  //     if (
  //       !values[itemProps.fieldName] && //nếu không có dữ liệu EMR
  //       itemProps.defaultFromHIS && //và đánh dấu là có dữ liệu mặc định từ HIS
  //       !itemProps.defaultValue //và không có defaut value
  //     ) {
  //       const valuesLocal = {
  //         ...values,
  //         [itemProps.fieldName]: valuesHIS[itemProps.fieldName], //thì update lại giá trị bằng giá trị từ HIS
  //       };
  //       setState({
  //         localValues: valuesLocal,
  //       });
  //     } else {
  //       if (
  //         // values[itemProps.fieldName] !== "" &&
  //         values[itemProps.fieldName] !== null &&
  //         values[itemProps.fieldName] !== undefined
  //       )
  //         //nếu có dữ liệu
  //         setState({
  //           localValues: values,
  //         });
  //       else {
  //         const valuesLocal = {
  //           ...values,
  //           [itemProps.fieldName]: itemProps.defaultValue, //được gán băng giá trị defaultValue
  //         };
  //         setState({
  //           localValues: valuesLocal,
  //         });
  //       }
  //     }
  //   }
  // }, [values, valuesHIS]);

  useImperativeHandle(ref, () => ({
    collect: () => {
      let data = {
        components:
          comRef.current && comRef.current.collectComponent
            ? comRef.current.collectComponent()
            : [],
        component: {
          ...component,
          value:
            comRef.current && comRef.current.collectValue
              ? comRef.current.collectValue()
              : "",
          props: {
            ...component.props,
            labelValue: null,
            defaultData:
              comRef.current && comRef.current.collectDefault
                ? comRef.current.collectDefault()
                : {},
            lines:
              comRef.current && comRef.current.collectLines
                ? comRef.current.collectLines()
                : [],
            label:
              comRef.current && comRef.current.collectLabel
                ? comRef.current.collectLabel()
                : "",
            checkList:
              comRef.current && comRef.current.collectCheckList
                ? comRef.current.collectCheckList()
                : [],
            ...(comRef.current?.collectProps
              ? comRef.current?.collectProps()
              : {} ?? {}),
          },
        },
        item,
      };
      return data;
    },
  }));

  const updateContent = (res) => {
    updateComponents(res);
  };

  const onRemove = () => {
    if (props.onRemove) props.onRemove();
  };
  const onMoveRight = () => {
    if (props.onMoveRight) props.onMoveRight();
  };
  const onMoveLeft = () => {
    if (props.onMoveLeft) props.onMoveLeft();
  };
  const menu = (
    <Button.Group>
      <Button
        disabled={!props.allowMoveLeft}
        icon={<PicLeftOutlined />}
        size={"small"}
        title={t("editor.diChuyenKhoiSangTrai")}
        onClick={onMoveLeft}
      />
      <Button
        disabled={!props.allowMoveRight}
        icon={<PicRightOutlined />}
        size={"small"}
        title={t("editor.diChuyenKhoiSangPhai")}
        onClick={onMoveRight}
      />
      <Button
        disabled={!props.allowRemove}
        icon={<CloseOutlined />}
        size={"small"}
        title={t("editor.xoaKhoi")}
        onClick={onRemove}
      />
    </Button.Group>
  );
  const block =
    mode === MODE.editing ? (
      <EditingRender
        component={component}
        item={item}
        mode={mode}
        formChange={formChange}
        itemProps={itemProps}
        formId={formId}
        //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
        //values = valueEMR khi không nằm trong replication row
        valueEMR={valueEMR}
        values={valuesLocal}
        valuesHIS={valuesHIS} //[dataFromHis]
        fileTemplate={fileTemplate}
        fileConfig={fileConfig}
        template={fileTemplate[itemProps.fieldName] || {}}
        capKyDienTuHienTai={capKyDienTuHienTai}
        level={level}
        layoutType={layoutType}
        disable={props.disable} //sử dụng trong trường hợp khoá component layout theo cấp ký
        rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
        lineHeightText={props.lineHeightText} //dùng trong tính năng set line height của văn bản
        fontSize={props.fontSize} //parrent font size
      >
        {children}
      </EditingRender>
    ) : (
      <ConfigRender
        component={component}
        item={item}
        mode={mode}
        updateContent={updateContent}
        itemProps={itemProps}
        formId={formId}
        verticalLine={verticalLine}
        comRef={comRef}
        updateComponents={updateComponents}
        currentComponent={currentComponent}
        level={level}
        layoutType={layoutType}
        totalBlockInLine={props.totalBlockInLine} //sử dụng để tính toán xem line được chia thành bao nhiêu phần
        rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
        lineHeightText={props.lineHeightText} //dùng trong tính năng set line height của văn bản
        fontSize={props.fontSize} //parrent font size
      >
        {children}
      </ConfigRender>
    );
  if (props.allowShowAction && mode == MODE.config) {
    return (
      <Popover content={menu}>
        <div>{block}</div>
      </Popover>
    );
  }
  return block;
});

Block.defaultProps = {
  focusing: false,
  item: {},
  component: {},
  formChange: {},
  valuesHIS: {},
  values: {},
  fileTemplate: {},
  updateComponents: () => {},
};

Block.propTypes = {
  focusing: T.bool,
  item: T.shape({}),
  component: T.shape({}),
  formChange: T.shape({}),
  values: T.shape({}),
  valuesHIS: T.shape({}),
  fileTemplate: T.shape({}),
  updateComponents: T.func,
};

export default memo(Block);
