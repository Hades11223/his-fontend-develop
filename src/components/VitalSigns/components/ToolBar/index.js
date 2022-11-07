import React, { memo, useCallback, useMemo, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { Radio, Popover, Row, Col } from "antd";
import { cloneDeep } from "lodash";
import { refClickCanvas } from "../CanvasTouchable";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import {
  FormOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ModalVitalSigns from "../ModalVitalSigns";
const ToolBar = memo(function ToolBar(props) {
  const { t } = useTranslation();
  const {
    onValueChange,
    onDelete,
    onUpdate,
    onCancelUpdate,
    isDeleting,
    onAddSurgery,
    draw,
    refCanvasFooter,
    refCanvas,
    isEdit = true,
  } = props;
  const { id } = useParams();

  const onPrint = () => {
    window.open("/chi-so-song/" + id);
  };
  const {
    auth: {
      auth: { authorities },
    },
    vitalSigns: {
      isEditing,
      allowEdit,
      typeValue,
      currentCol = 0,
      values = [],
    },
  } = useSelector((state) => state);
  const {
    vitalSigns: { updateData, onCreate },
  } = useDispatch();
  const refModalVitaSigns = useRef(null);

  const currentVitalSign = useMemo(() => {
    return values[currentCol] || {};
  }, [values, currentCol]);
  const isDisabled = useCallback(() => {
    return isEditing ? true : false;
  }, [isEditing]);
  const handleCreate = () => {
    refClickCanvas.current = false;
    onCreate({ nbDotDieuTriId: id }).then((values) => {
      if (values) {
        updateData({ isSaveSucces: true });
        onValueChange(values, { isCanvasFooter: true });
      }
    });
  };
  const ToolTipButton = (props) => {
    if (props.disabled) {
      return (
        <Popover content={props.title} trigger="hover">
          {props.children}
        </Popover>
      );
    } else return props.children;
  };
  const onSetEditMode = () => {
    updateData({
      isEditing: true,
      preValues: cloneDeep(values),
    });
  };
  const handleDelete = () => {
    onDelete();
    updateData({ isSaveSucces: true });
  };
  const handleUpdate = () => {
    refClickCanvas.current = false;
    onUpdate({ nbDotDieuTriId: id });
    updateData({ isSaveSucces: true });
  };
  const onShowModal = () => {
    refModalVitaSigns.current &&
      refModalVitaSigns.current.show({ refCanvas, refCanvasFooter }, draw);
  };
  return (
    <Main>
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="toolbar-head">
            <div className="toolbar-right">
              {props.isModal ? (
                <>
                  <Button
                    icon={<PrinterOutlined />}
                    size="small"
                    onClick={onPrint}
                    disabled={isDeleting || isEditing}
                  >
                    {t("common.in")}
                  </Button>
                  <ToolTipButton
                    disabled={!currentVitalSign.id || currentVitalSign.ptTtId}
                    title="Chọn Ngày trên Bảng chức năng sống tương ứng để sử dụng tính năng"
                  >
                    <div>
                      <Button
                        icon={<FormOutlined />}
                        onClick={onAddSurgery}
                        disabled={
                          !currentVitalSign.id || currentVitalSign.ptTtId
                        }
                        size="small"
                      >
                        + {t("quanLyNoiTru.chiSoSong.themPhauThuat")}
                      </Button>
                    </div>
                  </ToolTipButton>

                  {!isEditing && !isDeleting ? (
                    <>
                      <ToolTipButton
                        disabled={!allowEdit}
                        title={t("quanLyNoiTru.chiSoSong.chonNgayTrenBangCNS")}
                      >
                        <div>
                          <Button
                            icon={<EditOutlined />}
                            onClick={onSetEditMode}
                            size="small"
                            disabled={!allowEdit}
                          >
                            {t("common.sua")}
                          </Button>
                        </div>
                      </ToolTipButton>

                      <ToolTipButton
                        disabled={!allowEdit}
                        title={t("quanLyNoiTru.chiSoSong.chonNgayTrenBangCNS")}
                      >
                        <Button
                          icon={<DeleteOutlined />}
                          type={"error"}
                          onClick={handleDelete}
                          disabled={!allowEdit}
                          size="small"
                        >
                          {t("common.xoa")}
                        </Button>
                      </ToolTipButton>
                    </>
                  ) : (
                    <>
                      <Button
                        icon={<DeleteOutlined />}
                        type={"error"}
                        size="small"
                        onClick={onCancelUpdate}
                        disabled={!allowEdit}
                      >
                        {t("common.huy")}
                      </Button>
                    </>
                  )}
                  {isEditing || isDeleting ? (
                    <>
                      {isEditing ? (
                        <Button
                          icon={<SaveOutlined />}
                          type={"primary"}
                          onClick={handleUpdate}
                          size="small"
                        >
                          {t("common.luu")}
                        </Button>
                      ) : (
                        <Button
                          icon={<DeleteOutlined />}
                          type={"error"}
                          onClick={handleUpdate}
                          size="small"
                        >
                          {t("common.xoa")}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      icon={<SaveOutlined />}
                      type={"primary"}
                      onClick={handleCreate}
                      size="small"
                      // disabled={isDisabled()}
                    >
                      {t("common.luu")}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    rightIcon={<PrinterOutlined />}
                    size="small"
                    onClick={onPrint}
                    disabled={isDeleting || isEditing}
                  >
                    {t("common.in")}
                  </Button>
                  <ToolTipButton disabled={!allowEdit}>
                    {isEdit && (
                      <Button
                        rightIcon={<EditOutlined />}
                        onClick={onShowModal}
                        size="small"
                        type="success"
                        // disabled={!allowEdit}
                      >
                        {t("quanLyNoiTru.chiSoSong.chinhSua")}
                      </Button>
                    )}
                  </ToolTipButton>
                </>
              )}
            </div>
          </div>
          <Radio.Group
            className="radio-nhip-mach"
            value={typeValue}
            onChange={(val) => {
              if (props.isModal) {
                updateData({
                  typeValue: val.target.value,
                  isNotFirstClick: true,
                });
              }
            }}
          >
            <Radio value={1}>
              <span
                style={{
                  marginTop: "-3px",
                  color: "#E74C3C",
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                x
              </span>
              <span className="radio-content">
                {t("quanLyNoiTru.chiSoSong.nhipMach")}
              </span>
            </Radio>
            <Radio value={2}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#3498DB",
                    marginHorizontal: 5,
                  }}
                ></span>
                <span className="radio-content">
                  {t("quanLyNoiTru.chiSoSong.nhietDo")}
                </span>
              </span>
            </Radio>
            <label
              className="ant-radio-wrapper"
              onClick={() => {
                updateData({
                  typeValue: 3,
                  isNotFirstClick: true,
                });
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  marginHorizontal: 5,
                }}
              />
              <img
                src={require("../../images/huyet_ap.png")}
                width={10}
                style={{
                  marginHorizontal: 5,
                  marginRight: 5,
                }}
                alt=""
              />
              <span>{t("quanLyNoiTru.chiSoSong.huyetAp")}</span>
            </label>
          </Radio.Group>
        </div>
      </div>
      <ModalVitalSigns ref={refModalVitaSigns}></ModalVitalSigns>
    </Main>
  );
});

ToolBar.defaultProps = {
  onValueChange: () => {},
};
export default ToolBar;
