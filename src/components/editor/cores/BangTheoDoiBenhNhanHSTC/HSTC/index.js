import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { cloneDeep, isEmpty } from "lodash";
import { Input, message } from "antd";
import { SIZE } from "../VitalSigns/utils/vital-signs/constants";
import VitalSigns from "components/editor/cores/BangTheoDoiBenhNhanGMHS/GMHS/VitalSigns";
import { NHIETS, MACHS, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import { handleBloodPressure } from "utils/vital-signs/canvas-utils";
import { Main } from "./styled";
import ModalBloodPressure from "pages/vital-signs/components/ModalBloodPressure";
import ModalInputRespiratory from "pages/vital-signs/components/ModalInputRespiratory";
import ElectronicSignature from "../../ElectronicSignature";
import SelectNurse from "../SelectNurse";
import ModalChangeDate from "pages/vital-signs/components/ModalChangeDate";
import DropDownList from "../DropDownList";
import stringUtils from "mainam-react-native-string-utils";
import ToggleValue from "../ToggleValue";
import DeboundInput from "components/editor/config/DeboundInput";

const HSTC = ({ itemProps, form, formChange, block, ...props }, refs) => {
  const DOM_MAUS = ["Xanh", "Trắng", "Đục", "Máu", "Vàng", "Hồng"];
  const DOM_SOLUONGS = ["Nhiều", "Vừa", "Ít"];
  const PHAN_MAUS = ["Đen", "Vàng", "Xanh", "Sống", "Máu"];
  const PHAN_TINH_CHAT = ["Rắn", "Lỏng", "Bọt", "Bình thường"];
  const TU_THE = ["Phải", "Trái", "Ngửa", "Sấp", "Ngồi dậy"];
  const LEFT_VITAL_SIGNS = 220;
  const TOTAL_COL = 12;
  const LEFT_COLUMN_ITEM_MRLEFT = 30;
  const refModalBloodPressure = useRef(null);
  const refModalInputRespiratory = useRef(null);
  const refChangeDate = useRef(null);
  const refState = useRef({
    values: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    rangeBloodPressure: BLOOD_PRESSURE[0].listShow,
  });
  const [state, _setState] = useState(refState.current);
  const setState = (data = {}) => {
    _setState((state) => {
      refState.current = { ...refState.current, ...data };
      return refState.current;
    });
  };
  const silentUpdateState = (data = {}) => {
    refState.current = { ...refState.current, ...data };
    for (let key in refState.current) {
      state[key] = refState.current[key];
    }
  };
  const refMain = useRef(null);

  useEffect(() => {
    if (itemProps.fieldName && form) {
      let values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      let hasValueMachNhiet = false;
      values.forEach((item, index) => {
        const cot = getValue("cot_cot" + (index + 1));
        if (cot) item.date = cot.toDateObject();
        item.nhietDo = getValue("nhietDo_cot" + (index + 1)) || "";
        item.mach = getValue("mach_cot" + (index + 1)) || "";
        if (item.mach || item.nhietDo) hasValueMachNhiet = true;
        item.huyetAp = getValue("huyetAp_cot" + (index + 1)) || "";
        item.ghiChu = getValue("ghiChu_cot" + (index + 1)) || "";
        item.dom_mauDom = getValue("dom_mauDom_cot" + (index + 1)) || [];
        item.dom_soLuongDom =
          getValue("dom_soLuongDom_cot" + (index + 1)) || [];
        item.phan_soLan = getValue("phan_soLan_cot" + (index + 1)) || "";
        item.phan_mauPhan = getValue("phan_mauPhan_cot" + (index + 1)) || [];
        item.phan_tinhChat = getValue("phan_tinhChat_cot" + (index + 1)) || [];
        item.spo2 = getValue("spo2_cot" + (index + 1)) || "";
        item.nhipTho = getValue("nhipTho_cot" + (index + 1)) || "";
        item.glassgow = getValue("glassgow_cot" + (index + 1)) || "";
        item.thoMay_mode = getValue("thoMay_mode_cot" + (index + 1)) || "";
        item.thoMay_tv = getValue("thoMay_tv_cot" + (index + 1)) || "";
        item.thoMay_tanSo = getValue("thoMay_tanSo_cot" + (index + 1)) || "";
        item.thoMay_peakLow =
          getValue("thoMay_peakLow_cot" + (index + 1)) || "";
        item.thoMay_fio2 = getValue("thoMay_fio2_cot" + (index + 1)) || "";
        item.thoMay_peepCpapEpap =
          getValue("thoMay_peepCpapEpap_cot" + (index + 1)) || "";
        item.thoMay_psIpap = getValue("thoMay_psIpap_cot" + (index + 1)) || "";

        item.thoOxy_gongKinh =
          getValue("thoOxy_gongKinh_cot" + (index + 1)) || "";
        item.thoOxy_mask = getValue("thoOxy_mask_cot" + (index + 1)) || "";
        item.thoOxy_maskTui =
          getValue("thoOxy_maskTui_cot" + (index + 1)) || "";

        item.dich_dichVao_dichThuoc =
          getValue("dich_dichVao_dichThuoc_cot" + (index + 1)) || "";
        item.dich_dichVao_an =
          getValue("dich_dichVao_an_cot" + (index + 1)) || "";
        item.dich_dichVao_khac =
          getValue("dich_dichVao_khac_cot" + (index + 1)) || "";

        if (
          item.dich_dichVao_dichThuoc ||
          item.dich_dichVao_an ||
          item.dich_dichVao_khac
        ) {
          item.dich_dichVao_dichVaoTong_tong =
            getValue("dich_dichVao_dichVaoTong_tong" + (index + 1)) || "";
        }

        item.dich_dichRa_dichTieu =
          getValue("dich_dichRa_dichTieu_cot" + (index + 1)) || "";
        item.dich_dichRa_dichRaKhac =
          getValue("dich_dichRa_dichRaKhac_cot" + (index + 1)) || "";
        item.dich_dichRa_ghiChu =
          getValue("dich_dichRa_ghiChu_cot" + (index + 1)) || "";
        if (item.dich_dichRa_dichTieu || item.dich_dichRa_dichRaKhac) {
          item.dich_dichRa_dichRaTong_tong =
            getValue("dich_dichRa_dichRaTong_tong" + (index + 1)) || "";
        }
        if (
          item.dich_dichRa_dichRaTong_tong ||
          item.dich_dichVao_dichVaoTong_tong
        )
          item.dich_dichTong_tong =
            getValue("dich_dichTong_tong" + (index + 1)) || "";

        item.chamSocDieuDuong_dichTonDaDay =
          getValue("chamSocDieuDuong_dichTonDaDay_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_duongMauMaoMach =
          getValue("chamSocDieuDuong_duongMauMaoMach_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_hutDom =
          getValue("chamSocDieuDuong_hutDom_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_tuThe =
          getValue("chamSocDieuDuong_tuThe_cot" + (index + 1)) || [];
        item.chamSocDieuDuong_tamGoi =
          getValue("chamSocDieuDuong_tamGoi_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_goiDau =
          getValue("chamSocDieuDuong_goiDau_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_thayBang =
          getValue("chamSocDieuDuong_thayBang_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_veSinh =
          getValue("chamSocDieuDuong_veSinh_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_viTriNKQ =
          getValue("chamSocDieuDuong_viTriNKQ_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_soNgayDatNKQ =
          getValue("chamSocDieuDuong_soNgayDatNKQ_cot" + (index + 1)) || "";
        item.chamSocDieuDuong_apLuc =
          getValue("chamSocDieuDuong_apLuc_cot" + (index + 1)) || "";
        item.chanKy = getValue("chanKy_cot" + (index + 1));
      });
      setState({
        hasValueMachNhiet,
        values,
        rangeBloodPressure: getRangeBloodPressure(values),
        dich_dichVao_dichVaoTong_tongCu: getValue(
          "dich_dichVao_dichVaoTong_tongCu"
        ),
        dich_dichRa_dichRaTong_tongCu: getValue(
          "dich_dichRa_dichRaTong_tongCu"
        ),
      });
    }
  }, [form, itemProps]);
  const getValue = (fieldName, options = {}) => {
    if (!form) return null;
    if (options.exact == true) {
      return form[fieldName];
    }
    return form[itemProps.fieldName + "_" + fieldName];
  };

  const canvasWidth = useMemo(() => {
    const tableWidth = block?.width || refMain.current?.clientWidth;
    return tableWidth - LEFT_VITAL_SIGNS;
  }, [block, refMain.current]);

  const columnWidth = useMemo(() => {
    return (canvasWidth - 12) / TOTAL_COL - 1;
  }, [block, refMain.current]);

  const canvasHeight = useMemo(() => {
    return SIZE.rowHeight * 80 + SIZE.headerHeight;
  }, []);

  const onChangeHuyetApp = (item, index) => () => {
    refModalBloodPressure.current.show({ value: item.huyetAp }, (s) => {
      onChangeValue(index, "huyetAp")(s);
    });
  };

  const onChangeNhipTho = (item, index) => () => {
    refModalInputRespiratory.current.show({ value: item.nhipTho }, (s) => {
      onChangeValue(index, "nhipTho")(s);
    });
  };

  const onChangeValue =
    (index, type, saveToState = true) =>
    (value = "") => {
      if (!formChange) return;
      const newState = {};
      if (type == "ghiChu" && value && value.trim()) {
        const getText = (value = "", length) => {
          if (value.length < length) return value;
          for (let i = length; i >= 0; i--) {
            if (value[i] === " ") return value.slice(0, i);
          }
          return value[length];
        };
        let arr = value.split("\n");
        if (arr[0].length > 10) {
          value = value.replaceAll("\n", "");
        }
        if (arr.length == 1) {
          if (arr[0].length > 10) {
            arr[0] = getText(value, 10);
            arr[1] = value.slice(arr[0].length + 1, arr[0].length + 1 + 9);
          }
          value = arr.join("\n");
        } else {
          arr[1] = getText(arr[1], 10);
          arr = arr.slice(0, 2);
          value = arr.join("\n");
        }
      }
      if (
        type == "dich_dichVao_dichVaoTong_tongCu" ||
        type == "dich_dichRa_dichRaTong_tongCu"
      ) {
        newState[type] = value;
        const fieldName = itemProps.fieldName + "_" + type;
        if (formChange[fieldName]) formChange[fieldName](value);
      } else {
        let values = [...state.values];
        if (type) values[index][type] = value;
        newState.values = values;
        if (type == "mach") {
          const fieldName =
            itemProps.fieldName + "_" + type + "_cot" + (index + 1);
          if (value >= 20 && value <= 180) {
            // redraw({ values, isCanvasBody: true, index });
            if (formChange[fieldName]) formChange[fieldName](value);
          } else if (!value) {
            if (formChange[fieldName]) formChange[fieldName]("");
          }
        } else if (type == "nhietDo") {
          const fieldName =
            itemProps.fieldName + "_" + type + "_cot" + (index + 1);
          if (value >= 34 && value <= 42) {
            // redraw({ values, isCanvasBody: true, index });
            if (formChange[fieldName]) formChange[fieldName](value);
          } else if (!value) {
            if (formChange[fieldName]) formChange[fieldName]("");
          }
        } else {
          if (type == "huyetAp") {
            newState.rangeBloodPressure = getRangeBloodPressure(values);
          }
          const fieldName =
            itemProps.fieldName + "_" + type + "_cot" + (index + 1);
          if (formChange[fieldName]) formChange[fieldName](value);
        }
      }
      if (saveToState) setState(newState);
      else silentUpdateState(newState);
    };

  const getRangeBloodPressure = (values) => {
    const cloneValues = cloneDeep(values);
    const indexOfLastItemHasValue =
      cloneValues.length -
      1 -
      cloneValues.reverse().findIndex((item) => !!item.huyetAp);
    const newValue = handleBloodPressure(
      values[indexOfLastItemHasValue] && values[indexOfLastItemHasValue].huyetAp
    );

    const listShow =
      BLOOD_PRESSURE.find(
        (item) => item.min <= newValue.systolic && newValue.systolic <= item.max
      ) &&
      BLOOD_PRESSURE.find(
        (item) => item.min <= newValue.systolic && newValue.systolic <= item.max
      ).listShow;
    if (!isEmpty(listShow)) {
      return listShow || [];
    } else {
      return BLOOD_PRESSURE[0].listShow;
    }
  };

  const onChangeDieuDuong = (type) => (value) => {
    const fieldName = itemProps.fieldName + "_" + type;
    if (formChange[fieldName]) formChange[fieldName](value);
  };
  const onShowDatePicker = (index) => () => {
    let date = state.values[index].date || new Date();
    refChangeDate.current &&
      refChangeDate.current.show(date || new Date(), index, (date) => {
        if (date > new Date()) {
          message.error("Vui lòng chọn thời gian nhỏ hơn thời gian hiện tại");
          return false;
        }
        const fieldName = itemProps.fieldName + "_" + "cot_cot" + (index + 1);
        if (formChange[fieldName]) {
          formChange[fieldName](date.format("yyyy-MM-dd HH:mm"));
          const values = [...state.values];
          values[index].date = date;
          setState({ values });
        }
      });
  };
  const onClearSignature = (index) => () => {
    const values = [...refState.current.values];
    values[index]["chanKy"] = null;
    setState({
      values,
    });
  };
  const isDisable = (index) => {
    if (state.values && state.values[index].chanKy?.chuKy) {
      return true;
    }
  };

  const renderSignature = useMemo(() => {
    return Array(TOTAL_COL)
      .fill({})
      .map((item, index) => {
        return (
          <td className="col-lv4" key={index} rowSpan={3}>
            <div className="sign-area">
              <ElectronicSignature
                component={{
                  props: {
                    width: 45,
                    height: 40,
                    allowReset: true,
                    buttonSignText: "Ký",
                    fieldName:
                      itemProps.fieldName + "_chanKy_cot" + (index + 1),
                  },
                }}
                form={form}
                formChange={formChange}
                mode={props.mode}
                onClearSignature={onClearSignature(index)}
              />
            </div>
          </td>
        );
      });
  }, [form, formChange, itemProps]);

  const renderCaDieuDuong = (label, index) => {
    return (
      <div className={"flex acenter"}>
        {label}
        <SelectNurse
          value={
            form
              ? form[
                  itemProps.fieldName + "_dieuDuongTheoDoi_dieuDuongCa" + index
                ]
              : ""
          }
          onChange={onChangeDieuDuong("dieuDuongTheoDoi_dieuDuongCa" + index)}
        />
      </div>
    );
  };

  return (
    <Main
      ref={refMain}
      leftColumnWidth={LEFT_VITAL_SIGNS}
      columnWidth={columnWidth}
    >
      <table>
        <tbody>
          <tr>
            <td colSpan={4} className="bold center">
              <div className="leftColumnWidth">GIỜ</div>
            </td>
            {state.values.map((item, index) => {
              return (
                <td
                  className="col-lv4 center"
                  key={index}
                  onClick={!isDisable(index) ? onShowDatePicker(index) : null}
                >
                  {item?.date?.format("HH:mm")}
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={4} rowSpan={2} className="pr">
              <table className="table-left-vital-signs">
                <tbody>
                  <tr className="left-column-row-height">
                    <td className="bold center">HUYẾT ÁP</td>
                    <td className="bold center w75">MẠCH</td>
                    <td className="bold center w75">NHIỆT ĐỘ</td>
                  </tr>
                  <tr style={{ height: "329px" }}>
                    <td className="pr">
                      {state.rangeBloodPressure?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="pa"
                            style={{
                              top: 5 + index * SIZE.rowHeight * 10,
                              left: LEFT_COLUMN_ITEM_MRLEFT,
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </td>
                    <td className="pr">
                      {MACHS.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="pa"
                            style={{
                              top: 5 + index * SIZE.rowHeight * 10,
                              left: LEFT_COLUMN_ITEM_MRLEFT,
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </td>
                    <td className="pr">
                      {NHIETS.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="pa"
                            style={{
                              top: 5 + index * SIZE.rowHeight * 10,
                              left: LEFT_COLUMN_ITEM_MRLEFT,
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            {state.values.map((item, index) => {
              return (
                <td
                  className="col-lv4 center"
                  key={index}
                  onClick={!isDisable(index) ? onShowDatePicker(index) : null}
                >
                  {item?.date?.format("dd/MM")}
                </td>
              );
            })}
          </tr>
          <tr>
            <td
              style={{
                position: "relative",
                height: `${canvasHeight - 3}px`,
              }}
            >
              <VitalSigns
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                columnWidth={columnWidth}
                rangeBloodPressure={state.rangeBloodPressure || []}
                values={state.values}
                bonusSize={1.2}
              />
            </td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td
              colSpan={1}
              rowSpan={4}
              className="col-lv0 no-border-right"
            ></td>
            <td colSpan={1} rowSpan={4} className="col-lv1 no-border-left"></td>
            <td colSpan={2} className="col-lv2 bold">
              Nhiệt độ
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={1 + index * 39}
                    readOnly={isDisable(index)}
                    size={"small"}
                    step={1}
                    min={34}
                    max={42}
                    value={item.nhietDo}
                    onChange={onChangeValue(index, "nhietDo")}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2 bold">
              Mạch
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 2}
                    readOnly={isDisable(index)}
                    size={"small"}
                    step={1}
                    min={20}
                    max={180}
                    value={item.mach}
                    onChange={onChangeValue(index, "mach")}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2 bold">
              Huyết áp
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <Input
                    tabIndex={index * 39 + 3}
                    readOnly={true}
                    onClick={
                      !isDisable(index) ? onChangeHuyetApp(item, index) : null
                    }
                    // onFocus={
                    //   !isDisable(index) ? onChangeHuyetApp(item, index) : null
                    // }
                    size={"small"}
                    value={item.huyetAp}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2 bold red">
              Ghi chú
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4 red" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 4}
                    rows={2}
                    className="red"
                    readOnly={isDisable(index)}
                    value={item.ghiChu}
                    size={"small"}
                    onChange={onChangeValue(index, "ghiChu")}
                    type="textarea"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} rowSpan={3}></td>
            <td colSpan={2} className="col-lv2 bold">
              SPO2
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 5}
                    readOnly={isDisable(index)}
                    size={"small"}
                    value={item.spo2}
                    onChange={onChangeValue(index, "spo2", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2 bold">
              NHỊP THỞ
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <Input
                    tabIndex={index * 39 + 6}
                    readOnly={true}
                    onClick={
                      !isDisable(index) ? onChangeNhipTho(item, index) : null
                    }
                    size={"small"}
                    value={item.nhipTho}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              GLASSGOW
            </td>

            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 7}
                    readOnly={isDisable(index)}
                    size={"small"}
                    value={item.glassgow}
                    onChange={onChangeValue(index, "glassgow", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          {/* -------------------------- */}
          <tr>
            <td colSpan={2} rowSpan={7} className="col-lv0 center bold vamid">
              THỞ MÁY
            </td>
            <td colSpan={2} className="col-lv2">
              MODE
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 8}
                    readOnly={isDisable(index)}
                    size={"small"}
                    value={item.thoMay_mode}
                    onChange={onChangeValue(index, "thoMay_mode", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              TV
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 9}
                    readOnly={isDisable(index)}
                    size={"small"}
                    max={999}
                    value={item.thoMay_tv}
                    onChange={onChangeValue(index, "thoMay_tv", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              TẦN SỐ
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 10}
                    readOnly={isDisable(index)}
                    size={"small"}
                    max={99}
                    value={item.thoMay_tanSo}
                    onChange={onChangeValue(index, "thoMay_tanSo", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              I/E - I TIME - PEAK LOW
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 11}
                    readOnly={isDisable(index)}
                    size={"small"}
                    value={item.thoMay_peakLow}
                    onChange={onChangeValue(index, "thoMay_peakLow", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              FIO2 (%)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 12}
                    type="number"
                    readOnly={isDisable(index)}
                    max={100}
                    min={21}
                    value={item.thoMay_fio2}
                    size={"small"}
                    onChange={onChangeValue(index, "thoMay_fio2", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              PEEP/CPAP/EPAP
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 13}
                    type="number"
                    readOnly={isDisable(index)}
                    max={99}
                    value={item.thoMay_peepCpapEpap}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "thoMay_peepCpapEpap",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              {itemProps.textPSIPAP === undefined
                ? "PS/IPAP"
                : itemProps.textPSIPAP}
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 14}
                    type="number"
                    readOnly={isDisable(index)}
                    max={99}
                    value={item.thoMay_psIpap}
                    size={"small"}
                    onChange={onChangeValue(index, "thoMay_psIpap", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} rowSpan={3} className="col-lv0 center bold vamid">
              THỞ OXY
            </td>
            <td colSpan={2} className="col-lv2">
              Gọng kính(1/p)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 15}
                    readOnly={isDisable(index)}
                    size={"small"}
                    max={99}
                    value={item.thoOxy_gongKinh}
                    onChange={onChangeValue(index, "thoOxy_gongKinh", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Mask(1/p)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 16}
                    readOnly={isDisable(index)}
                    size={"small"}
                    max={99}
                    value={item.thoOxy_mask}
                    onChange={onChangeValue(index, "thoOxy_mask", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Mask túi(1/p)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 17}
                    readOnly={isDisable(index)}
                    size={"small"}
                    max={99}
                    value={item.thoOxy_maskTui}
                    onChange={onChangeValue(index, "thoOxy_maskTui", false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td colSpan={2} rowSpan={9} className="col-lv0 bold center vamid">
              DỊCH
            </td>
            <td rowSpan={4} className="col-lv2 bold center lh15">
              DỊCH VÀO
            </td>
            <td className="col-lv3">Dịch, thuốc</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 18}
                    type="number"
                    readOnly={isDisable(index)}
                    value={item.dich_dichVao_dichThuoc}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "dich_dichVao_dichThuoc",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3">Ăn</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 19}
                    type="number"
                    readOnly={isDisable(index)}
                    value={item.dich_dichVao_an}
                    size={"small"}
                    onChange={onChangeValue(index, "dich_dichVao_an", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3">Khác</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 20}
                    type="number"
                    readOnly={isDisable(index)}
                    value={item.dich_dichVao_khac}
                    size={"small"}
                    onChange={onChangeValue(index, "dich_dichVao_khac", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3 center bold">
              <div className="flex">
                <div>Tổng cũ: </div>
                <DeboundInput
                  type="number"
                  className="old-value"
                  value={state.dich_dichVao_dichVaoTong_tongCu}
                  onChange={onChangeValue(0, "dich_dichVao_dichVaoTong_tongCu")}
                />
                <div>Tổng</div>
              </div>
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4 center bold" key={index}>
                  {item.dich_dichVao_dichVaoTong_tong}
                </td>
              );
            })}
          </tr>
          <tr>
            <td rowSpan={4} className="col-lv2 bold center lh15">
              DỊCH RA
            </td>
            <td className="col-lv3">Tiểu</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 21}
                    type="number"
                    readOnly={isDisable(index)}
                    value={item.dich_dichRa_dichTieu}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "dich_dichRa_dichTieu",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3">Khác</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 22}
                    type="number"
                    readOnly={isDisable(index)}
                    value={item.dich_dichRa_dichRaKhac}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "dich_dichRa_dichRaKhac",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3">Ghi chú</td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 23}
                    readOnly={isDisable(index)}
                    value={item.dich_dichRa_ghiChu}
                    size={"small"}
                    onChange={onChangeValue(index, "dich_dichRa_ghiChu", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="col-lv3 center bold">
              <div className="flex">
                <div>Tổng cũ: </div>
                <DeboundInput
                  type="number"
                  className="old-value"
                  value={state.dich_dichRa_dichRaTong_tongCu}
                  onChange={onChangeValue(
                    0,
                    "dich_dichRa_dichRaTong_tongCu",
                    false
                  )}
                />
                <div>Tổng</div>
              </div>
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4 center bold" key={index}>
                  {item.dich_dichRa_dichRaTong_tong}
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2 bold center">
              DỊCH VÀO - DỊCH RA
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4 center bold" key={index}>
                  {item.dich_dichTong_tong}
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} rowSpan={2} className="col-lv0 center bold vamid">
              ĐỜM
            </td>
            <td colSpan={2} className="col-lv2">
              Màu (Xanh - Trắng - Đục - Máu)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DropDownList
                    tabIndex={index * 39 + 24}
                    disabled={isDisable(index)}
                    title="Chọn màu đờm"
                    className={"drop-list"}
                    dataSource={DOM_MAUS}
                    value={item.dom_mauDom}
                    onChange={(values) => {
                      onChangeValue(index, "dom_mauDom", false)(values);
                    }}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Số lượng
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DropDownList
                    tabIndex={index * 39 + 25}
                    disabled={isDisable(index)}
                    title="Chọn số lượng đờm"
                    className={"drop-list"}
                    dataSource={DOM_SOLUONGS}
                    value={item.dom_soLuongDom}
                    onChange={(values) => {
                      onChangeValue(index, "dom_soLuongDom", false)(values);
                    }}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} rowSpan={3} className="col-lv0 center bold vamid">
              PHÂN
            </td>
            <td colSpan={2} className="col-lv2">
              {itemProps?.textSoLan === undefined
                ? "Số lần"
                : itemProps?.textSoLan}
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 26}
                    type="number"
                    max={9999}
                    readOnly={isDisable(index)}
                    value={item.phan_soLan}
                    size={"small"}
                    onChange={onChangeValue(index, "phan_soLan", false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Màu
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DropDownList
                    tabIndex={index * 39 + 27}
                    disabled={isDisable(index)}
                    title="Chọn màu phân"
                    className={"drop-list"}
                    dataSource={PHAN_MAUS}
                    value={item.phan_mauPhan}
                    onChange={(values) => {
                      onChangeValue(index, "phan_mauPhan", false)(values);
                    }}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Tính chất
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DropDownList
                    tabIndex={index * 39 + 28}
                    disabled={isDisable(index)}
                    title="Chọn tính chất phân"
                    className={"drop-list"}
                    dataSource={PHAN_TINH_CHAT}
                    value={item.phan_tinhChat}
                    onChange={(values) => {
                      onChangeValue(index, "phan_tinhChat", false)(values);
                    }}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} rowSpan={11} className="col-lv0 bold center vamid">
              <div> CHĂM SÓC ĐIỀU DƯỠNG</div>
            </td>
            <td colSpan={2} className="col-lv2">
              Dịch tồn dư dạ dày
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 29}
                    type="number"
                    readOnly={isDisable(index)}
                    max={999}
                    value={item.chamSocDieuDuong_dichTonDaDay}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_dichTonDaDay",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Đường máu mao mạch……giờ/lần
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 30}
                    readOnly={isDisable(index)}
                    value={item.chamSocDieuDuong_duongMauMaoMach}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_duongMauMaoMach",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Hút đờm
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <ToggleValue
                    tabIndex={index * 39 + 31}
                    valueToggle={"x"}
                    value={item.chamSocDieuDuong_hutDom}
                    disabled={isDisable(index)}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_hutDom",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Tư thế
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DropDownList
                    tabIndex={index * 39 + 32}
                    disabled={isDisable(index)}
                    title="Chọn thư thế"
                    className={"drop-list"}
                    dataSource={TU_THE}
                    value={item.chamSocDieuDuong_tuThe}
                    onChange={(values) => {
                      onChangeValue(
                        index,
                        "chamSocDieuDuong_tuThe",
                        false
                      )(values);
                    }}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Tắm
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <ToggleValue
                    tabIndex={index * 39 + 33}
                    valueToggle={"x"}
                    value={item.chamSocDieuDuong_tamGoi}
                    disabled={isDisable(index)}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_tamGoi",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Gội đầu
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <ToggleValue
                    tabIndex={index * 39 + 34}
                    valueToggle={"x"}
                    value={item.chamSocDieuDuong_goiDau}
                    disabled={isDisable(index)}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_goiDau",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Thay băng
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <ToggleValue
                    tabIndex={index * 39 + 35}
                    valueToggle={"x"}
                    value={item.chamSocDieuDuong_thayBang}
                    disabled={isDisable(index)}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_thayBang",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Vệ sinh răng miệng - mũi
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <ToggleValue
                    tabIndex={index * 39 + 36}
                    valueToggle={"x"}
                    value={item.chamSocDieuDuong_veSinh}
                    disabled={isDisable(index)}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_veSinh",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Vị trí NKQ (cm)
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 37}
                    type="number"
                    readOnly={isDisable(index)}
                    max={99}
                    value={item.chamSocDieuDuong_viTriNKQ}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_viTriNKQ",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Số ngày đặt NKQ / MKQ
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 38}
                    type="number"
                    readOnly={isDisable(index)}
                    max={999}
                    value={item.chamSocDieuDuong_soNgayDatNKQ}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_soNgayDatNKQ",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={2} className="col-lv2">
              Áp lực cuff
            </td>
            {state.values.map((item, index) => {
              return (
                <td className="col-lv4" key={index}>
                  <DeboundInput
                    tabIndex={index * 39 + 39}
                    type="number"
                    readOnly={isDisable(index)}
                    max={999}
                    value={item.chamSocDieuDuong_apLuc}
                    size={"small"}
                    onChange={onChangeValue(
                      index,
                      "chamSocDieuDuong_apLuc",
                      false
                    )}
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td className="col-lv0 vertical bold" rowSpan={3}>
              <svg width="20" height="40">
                <text x="32" y="45" transform="rotate(-90, 20, 50)">
                  Tên ĐD
                </text>
              </svg>
            </td>
            <td colSpan={3} className="col-lv1">
              {renderCaDieuDuong("Ca1: ", 1)}
            </td>
            {renderSignature}
          </tr>
          <tr>
            <td colSpan={3} className="col-lv1">
              {renderCaDieuDuong("Ca2: ", 2)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="col-lv1">
              {renderCaDieuDuong("Ca3: ", 3)}
            </td>
          </tr>
        </tbody>
      </table>
      <ModalBloodPressure ref={refModalBloodPressure} />
      <ModalInputRespiratory ref={refModalInputRespiratory} />
      <ModalChangeDate
        ref={refChangeDate}
        columnWidth={columnWidth}
        marginLeft={LEFT_VITAL_SIGNS + 3}
      />
    </Main>
  );
};

export default HSTC;
