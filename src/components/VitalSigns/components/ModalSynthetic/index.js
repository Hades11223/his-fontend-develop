import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  Modal,
  Row,
  Col,
  Input,
  Checkbox,
  InputNumber,
  message,
  Card,
} from "antd";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import DateTimePicker from "components/DateTimePicker";
import { Button } from "components";
import moment from "moment";
const ModalSynthetic = (props, ref) => {
  const [state, _setState] = useState({
    values: {},
  });
  const dispatch = useDispatch();
  const { updateData, convertData } = dispatch.vitalSigns;
  const { isSaveSucces } = useSelector((state) => state.vitalSigns);
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const refCallback = useRef(null);
  const refMach = useRef(null);
  const refNhietDo = useRef(null);
  const refHuyetAp = useRef(null);
  const refNhiptho = useRef(null);
  const refCannang = useRef(null);
  const refHide = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (x, y, data, callback) => {
      setState({
        show: true,
      });
      const values = {
        auToAddNhietDo: data?.values[data?.index]?.auToAddNhietDo,
        auToAddMach: data?.values[data?.index]?.auToAddMach,
        nhipMachDefault: data?.values[data?.index]?.mach,
        nhietDefault: data?.values[data?.index]?.nhietDo,
        nhipMach: data?.values[data?.index]?.auToAddMach
          ? null
          : data?.values[data?.index]?.mach,
        nhietDo: data?.values[data?.index]?.auToAddNhietDo
          ? null
          : data?.values[data?.index]?.nhietDo,
        huyetApTamThu: data?.values[data?.index]?.huyetap?.split("/")[0],
        huyetApTamTruong: data?.values[data?.index]?.huyetap?.split("/")[1],
        nhipTho: data?.values[data?.index]?.nhipTho
          ? (data?.values[data?.index]?.nhipTho + "").split("/")[0]
          : "",
        bopBong: (data?.values[data?.index]?.nhipTho + "").includes("bb"),
        canNang: data?.values[data?.index]?.canNang,
        thoiGianThucHien: data?.values[data?.index]?.thoiGianThucHien,
      };
      setState({
        top: y + 10,
        left: x,
        show: true,
        values,
        dataType: data.type,
        isLastColumn: data.isLastColumn,
        data: data?.values,
        index: data.index,
      });
      if (refHide.current) {
        try {
          clearTimeout(refHide.current);
        } catch (error) {}
      }
      refHide.current = setTimeout(() => {
        setState({
          show: false,
        });
      }, 2000);
      refCallback.current = callback;
    },
  }));
  useEffect(() => {
    if (isSaveSucces) {
      setState({
        values: {},
      });
      updateData({
        isSaveSucces: false,
      });
    }
  }, [isSaveSucces]);
  useEffect(() => {
    switch (state.dataType) {
      case "nhipMach":
        if (refMach.current) {
          refMach.current.focus();
        }
        break;
      case "nhietDo":
        if (refNhietDo.current) {
          refNhietDo.current.focus();
        }
        break;
      case "huyetap":
        if (refHuyetAp.current) {
          refHuyetAp.current.focus();
        }
        break;
      case "nhipTho":
        if (refNhiptho.current) {
          refNhiptho.current.focus();
        }
        break;
      case "canNang":
        if (refCannang.current) {
          refCannang.current.focus();
        }
        break;
      default:
        break;
    }
  }, [state.dataType, state.show]);

  const onCancel = () => {
    setState({
      show: false,
    });
  };
  const onFocus = () => {
    if (refHide.current) {
      try {
        clearTimeout(refHide.current);
      } catch (error) {}
    }
  };
  const onBlur = () => {
    refHide.current = setTimeout(() => {
      setState({
        show: false,
      });
    }, 2000);
  };
  const onChange = (key) => (e) => {
    let value = null;
    if (key == "huyetApTamTruong") {
      if (e > state.values.huyetApTamThu) {
        message.error("Huyết áp tâm trương phải nhỏ hơn Huyết áp tâm thu");
        return;
      }
    }
    if (key == "date") {
      if (e?._d < new Date(infoPatient.ngayVaoVien)) {
        message.error("Vui lòng chọn ngày lớn hơn ngày vào viện");
        return;
      } else if (e?._d > new Date()) {
        message.error("Vui lòng chọn ngày nhỏ hơn ngày hiện tại");
        return;
      } else {
        value = e?._d;
      }
    } else if (e?.target) {
      value = e?.target?.checked;
    } else {
      value = e;
    }
    if (key == "nhipMach") {
      state.values.auToAddMach = false;
    }
    if (key == "nhietDo") {
      state.values.auToAddNhietDo = false;
    }
    let values = {
      ...state?.values,
      [key]: value,
    };
    setState({
      values,
    });
  };
  const onOk = async () => {
    const nhipTho = (state?.values?.nhipTho || "").toString();
    const bb = state?.values?.bopBong ? "/(bb)" : "";
    const hatThu = state?.values?.huyetApTamThu || "";
    const hatTruong = state?.values?.huyetApTamTruong
      ? "/" + state?.values?.huyetApTamTruong
      : "";
    const data = {
      ...state.data[state.index],
      auToAddNhietDo: state?.values?.auToAddNhietDo,
      auToAddMach: state?.values?.auToAddMach,
      canNang: state?.values?.canNang,
      huyetap: hatThu + hatTruong,
      nhietDo: state?.values?.auToAddNhietDo
        ? state?.values?.nhietDefault
        : state?.values?.nhietDo,
      mach: state?.values?.auToAddMach
        ? state?.values?.nhipMachDefault
        : state?.values?.nhipMach,
      nhipTho: nhipTho + bb || "",
      huyetApTamThu: state?.values?.huyetApTamThu,
      huyetApTamTruong: state?.values?.huyetApTamTruong,
      thoiGianThucHien: state?.values?.thoiGianThucHien,
    };
    const newData = cloneDeep(state.data);
    newData[state?.index] = data;
    const newDataConvert = await convertData(newData);
    updateData({
      values: newDataConvert,
    });
    refCallback.current(newDataConvert, {
      isCanvasBody: true,
      isCanvasFooter: true,
      isLastColumn: state?.isLastColumn,
    });
    setState({
      show: false,
    });
  };
  if (!state.show) return null;
  const left = () => {
    if (state.left) {
      if (window.innerWidth - state.left - 282 > 500) {
        return state.left;
      } else {
        return state.left - 550 > 0 ? state.left - 550 : 20;
      }
    } else {
      return "30%";
    }
  };

  return (
    <Main
      style={{
        top: state.top || "20%",
        left: left(),
      }}
      {...props}
    >
      <div className="card">
        <Row gutter={20}>
          <Col span={24} className="item">
            <label style={{ width: "100%" }}>Thời gian</label>
            <DateTimePicker
              showTime={{ format: "HH:mm" }}
              showToday={true}
              value={moment(state?.values?.thoiGianThucHien)}
              onChange={onChange("thoiGianThucHien")}
              style={{ minHeight: "32px" }}
              focus={onFocus}
            />
          </Col>
          <Col span={12} className="item">
            <label>Nhịp mạch (lần/phút)</label>
            <InputNumber
              value={state?.values?.nhipMach}
              onChange={onChange("nhipMach")}
              autoFocus={state.autoFocusMach}
              style={{ width: "100%" }}
              min={30}
              max={180}
              ref={refMach}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col span={12} className="item">
            <label>Nhiệt độ (°C)</label>
            <InputNumber
              value={state.values?.nhietDo}
              onChange={onChange("nhietDo")}
              autoFocus={state.autoFocusNhiet}
              style={{ width: "100%" }}
              min={21}
              max={42}
              ref={refNhietDo}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col span={12} className="item">
            <label>Huyết áp tâm thu (mmHg)</label>
            <InputNumber
              value={state?.values?.huyetApTamThu}
              onChange={onChange("huyetApTamThu")}
              autoFocus={state.autoFocusHATamThu}
              ref={refHuyetAp}
              style={{ width: "100%" }}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col span={12} className="item">
            <label>Huyết áp tâm trương (mmHg)</label>
            <InputNumber
              value={state?.values?.huyetApTamTruong}
              onChange={onChange("huyetApTamTruong")}
              autoFocus={state.autoFocusHATamTruong}
              style={{ width: "100%" }}
              max={state.values.huyetApTamThu}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col span={12} className="item">
            <label>Nhịp Thở (lần/phút)</label>
            <InputNumber
              value={state?.values?.nhipTho || ""}
              onChange={onChange("nhipTho")}
              style={{ width: "100%" }}
              ref={refNhiptho}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col
            span={12}
            className="item"
            style={{
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{
                paddingTop: "25px",
              }}
              checked={state?.values?.bopBong}
              onChange={onChange("bopBong")}
            >
              Bóp bóng
            </Checkbox>
          </Col>
          <Col span={12} className="item">
            <label>Cân nặng (kg)</label>
            <InputNumber
              value={state?.values?.canNang}
              onChange={onChange("canNang")}
              autoFocus={state.autoFocusCanNang}
              style={{ width: "100%" }}
              ref={refCannang}
              onFocus={onFocus}
              onBlur={onBlur}
            ></InputNumber>
          </Col>
          <Col span={12}></Col>
        </Row>
        <div className="action-bottom">
          <Button type="error" onClick={onCancel}>
            Huỷ
          </Button>
          <Button type="primary" onClick={onOk}>
            Đồng ý
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default forwardRef(ModalSynthetic);
