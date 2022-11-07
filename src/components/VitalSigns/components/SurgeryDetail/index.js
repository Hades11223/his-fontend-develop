import React, { useState, useRef, Fragment } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal, Popover, Button as ButtonAntd } from "antd";
import { Button } from "components";
import { SIZE } from "utils/vital-signs/constants";
import { ModalSurgeryInformation } from "../";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { t } from "i18next";
function SurgeryDetail(props, refs) {
  const refModalSurgeryInformation = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    vitalSigns: { values },
  } = useSelector((state) => state);
  const {
    vitalSigns: { updateData, onUpdate },
  } = useDispatch();
  const onClick = (item, isEdit, index) => () => {
    setState({
      ["visible" + index]: false,
    });
    let date = item.thoiGianThucHien.format("dd/MM/yyyy");
    if (isEdit) {
      props.onUpdateSurgery(item);
    } else {
      Modal.confirm({
        title: "Thông báo",
        content: `Bạn có chắc muốn xóa thông tin phẫu thuật ngày ${date} không ?`,
        okText: "Đồng ý",
        cancelText: "Huỷ",
        cancelButtonProps: { type: "danger", style: { width: 73 } },
        onOk: async () => {
          updateData({
            currentCol: index,
          });
          values[index].ptTtId = null;
          const data = await onUpdate();
        },
      });
    }
  };
  const handleVisibleChange = (index) => (visible) => {
    setState({
      ["visible" + index]: visible,
    });
  };
  return (
    <div
      style={{
        position: "absolute",
        marginBottom: 2,
        top: 80,
        height: 40,
        zIndex: 101,
        flexDirection: "row",
        display: "flex",
        width: state.canvasWidth,
        left: SIZE.leftColumnWidth,
      }}
    >
      {((values) => {
        let _item = null;
        let _index = 0;
        let _date = null;
        let dateSurgery = null;
        return values.map((item, i) => {
          if (item.ptTtId) {
            _item = item;
            _index = 1;
            _date = item.thoiGianThucHien;
            dateSurgery = item.thoiGianThucHien;
            return (
              <Popover
                style={{}}
                key={i}
                visible={state["visible" + i]}
                onVisibleChange={handleVisibleChange(i)}
                title={
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}> Thông tin phẫu thuật</div>
                    <div style={{ alignSelf: "flex-end" }}>
                      <ButtonAntd
                        icon={<EditOutlined />}
                        type="primary"
                        style={{ marginRight: 5 }}
                        onClick={onClick(item, true, i)}
                        size="small"
                      >
                        {t("common.sua")}
                      </ButtonAntd>
                      <ButtonAntd
                        icon={<DeleteOutlined />}
                        type="danger"
                        onClick={onClick(item, false, i)}
                        size="small"
                      >
                        {t("common.xoa")}
                      </ButtonAntd>
                    </div>
                  </div>
                }
                content={
                  <div style={{ width: 400 }}>
                    <div>
                      <div style={{ fontWeight: "700", color: "#08aaa8" }}>
                        Bác sĩ :
                      </div>
                      <div>
                        <b>
                          {item.tenBacSiPtTt}
                          <br />
                        </b>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 5,
                        fontWeight: "700",
                        color: "#08aaa8",
                      }}
                    >
                      Phương pháp phẫu thuật:
                    </div>
                    <div>{item.phuongPhapPtTt}</div>
                  </div>
                }
              >
                <ButtonAntd
                  type="danger"
                  style={{
                    position: "absolute",
                    top: 5,
                    left: i * SIZE.columnWidth + 10,
                    width: SIZE.columnWidth - 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={i}
                >
                  1
                </ButtonAntd>
              </Popover>
            );
          } else {
            if (
              _item &&
              (!_date ||
                _date?.ddmmyyyy() !== item?.thoiGianThucHien?.ddmmyyyy())
            ) {
              const surgerysDay = moment(dateSurgery, "YYYY-MM-YY").set({
                hour: 0,
                minute: 0,
                second: 0,
              });
              const newDate = moment(item.thoiGianThucHien, "YYYY-MM-YY").set({
                hour: 0,
                minute: 0,
                second: 0,
              });
              const diff = newDate.diff(surgerysDay, "day");
              _date = item.thoiGianThucHien;
              _index++;

              return (
                <Popover
                  style={{}}
                  key={i}
                  visible={state["visible" + i]}
                  onVisibleChange={handleVisibleChange(i)}
                  title={
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: 1 }}> Thông tin phẫu thuật</div>
                    </div>
                  }
                  content={
                    <div style={{ width: 400 }}>
                      <div>
                        <div style={{ fontWeight: "700", color: "#08aaa8" }}>
                          Bác sĩ :
                        </div>
                        <div>
                          <b>
                            {item.tenBacSiPtTt}
                            <br />
                          </b>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          fontWeight: "700",
                          color: "#08aaa8",
                        }}
                      >
                        Phương pháp phẫu thuật:
                      </div>
                      <div>{_item.phuongPhapPtTt}</div>
                    </div>
                  }
                >
                  <ButtonAntd
                    type="danger"
                    style={{
                      position: "absolute",
                      top: 5,
                      left: i * SIZE.columnWidth + 10,
                      width: SIZE.columnWidth - 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    key={i}
                  >
                    {diff + 1}
                  </ButtonAntd>
                </Popover>
              );
            }
          }
          return null;
        });
      })(props.values)}
      <ModalSurgeryInformation ref={refModalSurgeryInformation} />
    </div>
  );
}
SurgeryDetail.defaultProps = {
  onValueChange: () => {},
  onUpdateSurgery: () => {},
};

export default connect(
  (state) => {
    return {
      values: state.vitalSigns.values || [],
      isEditing: state.vitalSigns.isEditing,
      isDeleting: state.vitalSigns.isDeleting,
      currentCol: state.vitalSigns.currentCol,
    };
  },
  ({
    vitalSigns: {
      updateData,
      onUpdate,
      onCancel,
      onCreate,
      onCreateSurgery,
      onRemoveSurgery,
    },
  }) => ({
    updateData,
    onUpdate,
    onCancel,
    onCreate,
    onCreateSurgery,
    onRemoveSurgery,
  })
)(SurgeryDetail);
