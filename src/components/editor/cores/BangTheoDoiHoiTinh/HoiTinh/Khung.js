import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { cloneDeep, get, isEmpty } from "lodash";
import { Checkbox, Input } from "antd";
import { SIZE } from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/utils/vital-signs/constants";
import { NHIETS, MACHS, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import { handleBloodPressure } from "utils/vital-signs/canvas-utils";
import { Fragment } from "react";
import VitalSigns from "./VitalSigns";
import { useSelector } from "react-redux";
import { combineFields, appendPrefix } from "utils/editor-utils";
import { convert } from "components/File/constants";
import DeboundInput from "components/editor/config/DeboundInput";
import DropDownList from "../../BangTheoDoiBenhNhanHSTC/DropDownList";
import DatePicker from "components/editor/cores/DatePicker";
import CheckGroups from "components/editor/cores/CheckGroups";
import EMRContext from "pages/editor/context/EMR";
const Khung = (
  {
    mode,
    itemProps,
    form,
    formChange,
    block,
    refModalBloodPressure,
    refModalInputRespiratory,
    khung,
    khungIndex,
    refModalSelectCSS,
    canvasWidth,
    canvasHeight,
    columnWidth,
    onRemove,
    disabled,
    ...props
  },
  refs
) => {
  const context = useContext(EMRContext);  
  const maHoSo = context.patient?.maHoSo;
  const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const ROWS = [1, 2, 3, 4, 5];
  const KIEU_TT_CH_HT = ["Tự thở", "CPAP", "SIMV", "ACV", "PCV", "Bilevel"];
  const TIEU_CHUAN_VALUE = [0, 1];
  const TIEU_CHUAN_COLS = [1, 2, 3, 4, 5, 6, 7];
  const TIEU_CHUAN = [
    { value: "spo2", label: "SpO2>95%(thở air/10 phút)" },
    { value: "tho", label: "Thở 14-28 lần/phút, ho tốt" },
    { value: "tinh", label: "Tỉnh hoặc dễ đánh thức" },
    { value: "cua2Chan", label: "Cựa hai chân bình thường" },
    { value: "ha", label: "Thay đổi HA<20%HA cũ" },
    { value: "nhipTim", label: "Thay đổi nhịp tim < 20% nhịp cũ" },
    { value: "nhietDo", label: "T° > 36°C" },
    { value: "khongTimTai", label: "Không vân tím da" },
    { value: "khongChayMau", label: "Không nghi chảy máu" },
    { value: "khongRetRun", label: "Không rét run" },
    { value: "khongKichDong", label: "Không kích động" },
    { value: "khongDau", label: "Không hoặc ít đau (VAS < 4 điểm)" },
    { value: "khongNon", label: "Không hoặc ít nôn" },
    { value: "khongCauBangQuang", label: "Không có cầu bàng quang" },
    { value: "tongDiem", label: "Tổng điểm" },
  ];
  const LEFT_COLUMN_ITEM_MRLEFT = 15;
  const refState = useRef({
    data: [],
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
  useEffect(() => {
    khung.rangeBloodPressure = getRangeBloodPressure(khung || {});
    setState(khung || {});
  }, [khung]);

  const getHuyetAp = (index) => {
    const tamThu =
      state[
        [
          "bangTheoDoi",
          "chiSo",
          "cot" + (index + 1),
          "chiSoSong",
          "huyetApTamThu",
        ].join("_")
      ];
    const tamTruong =
      state[
        [
          "bangTheoDoi",
          "chiSo",
          "cot" + (index + 1),
          "chiSoSong",
          "huyetApTamTruong",
        ].join("_")
      ];
    if (tamThu && tamTruong) {
      return `${tamThu}/${tamTruong}`;
    } else {
      return tamThu || "";
    }
  };
  const onChangeHuyetApp = (index) => () => {
    const huyetAp = getHuyetAp(index) || "";
    refModalBloodPressure.current.show({ value: huyetAp }, (s) => {
      const arr = s.split("/");
      const key = ["bangTheoDoi", "chiSo", "cot" + (index + 1)];
      const newState = {
        [[...key, "chiSoSong", "huyetApTamThu"].join("_")]: arr[0],
        [[...key, "chiSoSong", "huyetApTamTruong"].join("_")]: arr[1] || "",
      };
      newState.rangeBloodPressure = getRangeBloodPressure({
        ...state,
        ...newState,
      });

      setState(newState);
      formChange.setMultiData({
        [[...key, "chiSoSong", "maHoSo"].join("_")]: maHoSo,
        [[...key, "chiSoSong", "huyetApTamThu"].join("_")]: arr[0],
        [[...key, "chiSoSong", "huyetApTamTruong"].join("_")]: arr[1] || "",
        [[...key, "coThayDoi"].join("_")]: true,
      });
    });
  };

  const onChangeValueChiSoSong =
    (type, colIndex, saveToState = true) =>
    (value = "") => {
      let fieldName = "";
      if (Array.isArray(type)) {
        fieldName = type.join("_");
        if (saveToState) {
          setState({ [fieldName]: value });
        } else {
          silentUpdateState({ [fieldName]: value });
        }
        const key = ["bangTheoDoi", "chiSo", "cot" + (colIndex + 1)];
        formChange.setMultiData({
          [[...key, "chiSoSong", "maHoSo"].join("_")]: maHoSo,
          [[...key, "coThayDoi"].join("_")]: true,
          [[fieldName].join("_")]: value,
        });
        return;
      }
    };

  const onShowDatePicker = (index) => () => {
    const key = ["bangTheoDoi", "chiSo", "cot" + (index + 1), "chiSoSong"];
    let date = state[[...key, "thoiGian"].join("_")] || new Date();
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    let chiSoSong = get(convert(state), key.join("."));
    refModalSelectCSS.current &&
      refModalSelectCSS.current.show({ chiSoSong }, (css = {}) => {
        if (!chiSoSong) chiSoSong = {};
        chiSoSong.id = null;
        let listField = combineFields(chiSoSong);
        for (let x in listField) {
          listField[x] = null;
        }
        listField = appendPrefix(listField, key.join("_") + "_");
        let obj = {
          ...listField,
          ...combineFields(appendPrefix(css, key.join("_") + "_")),
        };
        setState(obj);
        obj[
          ["bangTheoDoi", "chiSo", "cot" + (index + 1), "coThayDoi"].join("_")
        ] = true;
        formChange.setMultiData(obj);
      });
  };

  const onChangeValueKhung =
    (type, saveToState = true) =>
    (value = "") => {
      if (!formChange) return;
      let fieldName = "";
      if (Array.isArray(type)) {
        fieldName = type.join("_");
        if (saveToState) {
          setState({ [fieldName]: value });
        } else {
          silentUpdateState({ [fieldName]: value });
        }
        formChange.onChange([...type].join("_"), value);
      }
    };

  const getRangeBloodPressure = (state) => {
    const values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    values.forEach((item, index) => {
      const key = ["bangTheoDoi", "chiSo", "cot" + (index + 1), "chiSoSong"];
      const tamThu = state[[...key, "huyetApTamThu"].join("_")];
      const tamTruong = state[[...key, "huyetApTamTruong"].join("_")];
      if (tamThu && tamTruong) {
        item.huyetAp = `${tamThu}/${tamTruong}`;
      }
    });
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

  const isDisable = (index, key) => {
    if (
      [
        "nhietDo",
        "huyetAp",
        "mach",
        "nhipTho",
        "fio2",
        "feco2",
        "spo2",
        "chieuCao",
        "canNang",
      ].includes(key?.slice(-1)[0])
    ) {
      const fieldName = [
        "bangTheoDoi",
        "chiSo",
        "cot" + (index + 1),
        "chiSoSong",
        "thoiGian",
      ].join("_");
      if (!state[fieldName]) return true;
    }
    return disabled;
    // return false;
  };

  const getValuesVitalSigns = () => {
    const values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    values.forEach((item, index) => {
      const key = ["bangTheoDoi", "chiSo", "cot" + (index + 1), "chiSoSong"];
      let fieldName = [...key, "nhietDo"];
      item.nhietDo = state[fieldName.join("_")];
      fieldName = [...key, "mach"];
      item.mach = state[fieldName.join("_")];
      const tamThu = state[[...key, "huyetApTamThu"].join("_")];
      const tamTruong = state[[...key, "huyetApTamTruong"].join("_")];
      if (tamThu && tamTruong) {
        item.huyetAp = `${tamThu}/${tamTruong}`;
      }
    });
    return values;
  };

  const showDateValue = (date) => {
    if (!date) return "";
    if (date.toDateObject) {
      return date.toDateObject()?.format("HH:mm");
    } else return date.format("HH:mm");
  };

  return (
    <Fragment>
      <table className="khung1">
        <tbody>
          <tr>
            <td colSpan={16} className="bold center p22">
              THEO DÕI
            </td>
          </tr>
          <tr>
            <td className="col-lv1 bold center"></td>
            <td colSpan={3} className="bold center vamid">
              <div className="vital-sign-left-column">GIỜ</div>
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "chiSoSong",
                "thoiGian",
              ];
              return (
                <td
                  className="col-lv5 center"
                  key={index}
                  onClick={!isDisable(index) ? onShowDatePicker(index) : null}
                >
                  <div className="time">
                    {showDateValue(state[key.join("_")])}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr style={{ height: 343 }}>
            <td rowSpan={4} className="bold center vamid">
              Tuần hoàn
            </td>
            <td colSpan={3}>
              <table className="table-left-vital-signs">
                <tbody>
                  <tr className="left-column-row-height">
                    <td className="bold center w75 vamid fo8">NHIỆT ĐỘ</td>
                    <td className="bold center w75 vamid fo8">MẠCH</td>
                    <td className="bold center w75 vamid fo8">HUYẾT ÁP</td>
                  </tr>
                  <tr style={{ height: "329px" }}>
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
                  </tr>
                </tbody>
              </table>
            </td>
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
                values={getValuesVitalSigns()}
                bonusSize={2}
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
            <td colSpan={3} className="bold center vamid">
              Nhiệt độ
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "chiSoSong",
                "nhietDo",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={34}
                    max={42}
                    value={state[key.join("_")]}
                    onChange={onChangeValueChiSoSong(key, index)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="bold center vamid">
              Mạch
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "chiSoSong",
                "mach",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    type="number"
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={20}
                    max={180}
                    value={state[key.join("_")]}
                    onChange={onChangeValueChiSoSong(key, index)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="bold center vamid">
              Huyết áp
            </td>
            {COLUMNS.map((item, index) => {
              return (
                <td className="col-lv5 center" key={index}>
                  <Input
                    readOnly={true}
                    onClick={
                      !isDisable(index, ["huyetAp"])
                        ? onChangeHuyetApp(index)
                        : null
                    }
                    size={"small"}
                    value={getHuyetAp(index)}
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td rowSpan={8} className="bold center vamid">
              Hô hấp
            </td>
            <td colSpan={3} className="vamid p02">
              ALTMTƯ
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "altm",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={99}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td colSpan={3} className="vamid p02">
              Kiểu TT/ CH/ HT
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "kieuHoHap",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DropDownList
                    disabled={isDisable(index, key)}
                    title="Kiểu TT/ CH/ HT"
                    className={"f1 drop-list"}
                    dataSource={KIEU_TT_CH_HT}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="vamid p02">
              FiO2
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "chiSoSong",
                "fio2",
              ];

              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={999}
                    value={state[key.join("_")]}
                    onChange={onChangeValueChiSoSong(key, index)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="vamid p02">
              SpO2
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "chiSoSong",
                "spo2",
              ];

              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={999}
                    value={state[key.join("_")]}
                    onChange={onChangeValueChiSoSong(key, index)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="vamid p02">
              VT
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "vt",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={99.9}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="vamid p02">
              PetCO2
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "petCo2",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={99.9}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={3} className="vamid p02">
              ALĐT
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "aldt",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={99.9}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td colSpan={3} className="vamid p02">
              Khác
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "khac",
              ];
              return (
                <td className="col-lv5" key={index}>
                  <DeboundInput
                    rows={2}
                    className={`${isDisable(index, key) ? "disabled" : ""}`}
                    readOnly={isDisable(index, key)}
                    value={state[key.join("_")] || ""}
                    onChange={onChangeValueKhung(key, false)}
                    type="multipleline"
                    lineHeightText={1}
                    fontSize={9}
                    minHeight={9 * 2 + 6}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td rowSpan={1} className="bold center vamid"></td>
            <td colSpan={3} className="vamid p02">
              Đường máu mao mạch
            </td>
            {COLUMNS.map((item, index) => {
              const key = [
                "bangTheoDoi",
                "chiSo",
                "cot" + (index + 1),
                "hoHap",
                "duongMauMaoMach",
              ];
              return (
                <td className="col-lv5 center" key={index}>
                  <DeboundInput
                    readOnly={isDisable(index, key)}
                    size={"small"}
                    step={1}
                    min={0}
                    max={99.9}
                    value={state[key.join("_")]}
                    onChange={onChangeValueKhung(key, false)}
                    type="number"
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="vamid p02"></td>
            <td colSpan={4} className="vamid p02 center bold">
              VÀO
            </td>
            <td colSpan={3} className="vamid p02 center bold">
              RA
            </td>
            <td colSpan={9} rowSpan={9} className="p22">
              <label className="bold">Nhận xét của BS gây mê: </label>
              <DeboundInput
                rows={2}
                className={`${
                  isDisable(null, ["bangTheoDoi", "dich", "nhanXet"])
                    ? "disabled"
                    : ""
                }`}
                readOnly={isDisable(null, ["bangTheoDoi", "dich", "nhanXet"])}
                value={
                  state[["bangTheoDoi", "dich", "nhanXet"].join("_")] || ""
                }
                onChange={onChangeValueKhung(
                  ["bangTheoDoi", "dich", "nhanXet"],
                  false
                )}
                type="multipleline"
                lineHeightText={1}
                fontSize={9}
                minHeight={9 * 17 + 6}
              />
            </td>
          </tr>

          <tr>
            <td className="vamid p02 center boldf">Thời gian</td>
            <td className="vamid p02 center fixWidth1">Dịch</td>
            <td className="vamid p02 center fixWidth1">Keo</td>
            <td className="vamid p02 center fixWidth1">Máu</td>
            <td className="vamid p02 center fixWidth1">Khác</td>
            <td className="vamid p02 center">Nước tiểu</td>
            <td className="vamid p02 center">Dẫn lưu</td>
            <td className="vamid p02 center">Khác</td>
          </tr>
          {ROWS.map((item, index) => {
            const key = [
              "bangTheoDoi",
              "dich",
              "hang" + (index < 4 ? index + 1 : "Tong"),
            ];
            return (
              <tr key={index}>
                <td className="vamid p02 dich-time">
                  {index < 4 ? (
                    <DatePicker
                      component={{
                        props: {
                          contentAlign: "center",
                          dateTimeFormat: "HH:mm D/M/Y",
                          fieldName: "value",
                        },
                      }}
                      form={{ value: state[[...key, "thoiGian"].join("_")] }}
                      mode={mode}
                      formChange={{
                        value: (value) => {
                          onChangeValueKhung(
                            [...key, "thoiGian"],
                            false
                          )(value);
                        },
                      }}
                    />
                  ) : (
                    <div className="bold center vamid">Tổng số</div>
                  )}
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 || isDisable(null, [...key, "dichVao", "dich"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichVao", "dich"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichVao", "dich"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 || isDisable(null, [...key, "dichVao", "keo"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichVao", "keo"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichVao", "keo"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 || isDisable(null, [...key, "dichVao", "mau"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichVao", "mau"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichVao", "mau"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 || isDisable(null, [...key, "dichVao", "khac"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichVao", "khac"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichVao", "khac"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 ||
                      isDisable(null, [...key, "dichRa", "nuocTieu"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichRa", "nuocTieu"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichRa", "nuocTieu"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 ||
                      isDisable(null, [...key, "dichRa", "danLuu"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichRa", "danLuu"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichRa", "danLuu"],
                      false
                    )}
                    type="number"
                  />
                </td>
                <td className="vamid p02 col-dich">
                  <DeboundInput
                    readOnly={
                      index == 4 || isDisable(null, [...key, "dichRa", "khac"])
                    }
                    size={"small"}
                    step={1}
                    min={0}
                    max={9999}
                    value={state[[...key, "dichRa", "khac"].join("_")]}
                    onChange={onChangeValueKhung(
                      [...key, "dichRa", "khac"],
                      false
                    )}
                    type="number"
                  />
                </td>
              </tr>
            );
          })}
          <tr className="tong-cu">
            <td className="vamid p02 bold center">Tổng cũ</td>
            <td colSpan={4} className="vamid p02 bold col-dich">
              <div className="flex acenter">
                <span style={{ width: "140px" }}>Tổng tất cả dịch vào cũ:</span>
                {/* {state[["bangTheoDoi", "dich", "tongDichVaoCu"].join("_")] || 0} */}
                <DeboundInput
                  readOnly={isDisable(null, [
                    ["bangTheoDoi", "dich", "tongDichVaoCu"].join("_"),
                  ])}
                  size={"small"}
                  step={1}
                  min={0}
                  value={
                    state[["bangTheoDoi", "dich", "tongDichVaoCu"].join("_")] ||
                    0
                  }
                  onChange={onChangeValueKhung(
                    [["bangTheoDoi", "dich", "tongDichVaoCu"].join("_")],
                    false
                  )}
                  type="number"
                />
              </div>
            </td>
            <td colSpan={3} className="vamid p02 bold col-dich">
              <div className="flex acenter">
                <span style={{ width: "155px" }}> Tổng tất cả dịch ra cũ:</span>
                {/* {state[["bangTheoDoi", "dich", "tongDichRaCu"].join("_")] || 0} */}
                <DeboundInput
                  readOnly={isDisable(null, [
                    ["bangTheoDoi", "dich", "tongDichRaCu"].join("_"),
                  ])}
                  size={"small"}
                  step={1}
                  min={0}
                  value={
                    state[["bangTheoDoi", "dich", "tongDichRaCu"].join("_")] ||
                    0
                  }
                  onChange={onChangeValueKhung(
                    [["bangTheoDoi", "dich", "tongDichRaCu"].join("_")],
                    false
                  )}
                  type="number"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="vamid p02 bold center">Tổng</td>
            <td colSpan={4} className="vamid p02 bold">
              Tổng tất cả dịch vào:{" "}
              {(state[["bangTheoDoi", "dich", "tongDichVao"].join("_")] || 0) +
                (state[["bangTheoDoi", "dich", "tongDichVaoCu"].join("_")] ||
                  0)}
            </td>
            <td colSpan={3} className="vamid p02 bold">
              Tổng tất cả dịch ra:{" "}
              {(state[["bangTheoDoi", "dich", "tongDichRa"].join("_")] || 0) +
                (state[["bangTheoDoi", "dich", "tongDichRaCu"].join("_")] || 0)}
            </td>
          </tr>
          <tr>
            <td className="vamid p02 bold center"> BILAN</td>
            <td colSpan={7} className="vamid p02 center bold">
              {((value) => (value > 0 ? "+" + value : value))(
                (state[["bangTheoDoi", "dich", "biLan"].join("_")] || 0) +
                  ((state[["bangTheoDoi", "dich", "tongDichVaoCu"].join("_")] ||
                    0) -
                    (state[["bangTheoDoi", "dich", "tongDichRaCu"].join("_")] ||
                      0))
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="khung2">
        <tbody>
          <tr>
            <td colSpan={8} className="bold center p22">
              TIÊU CHUẨN VỀ BUỒNG BỆNH: đạt 14 điểm + đủ thời gian theo dõi
            </td>
          </tr>
          <tr>
            <td className="bold vamid">I. Đạt 14 thông số</td>
            <td className="center bold vamid">Đến</td>
            <td className="center bold vamid">30'</td>
            <td className="center bold vamid">60'</td>
            <td className="center bold vamid">90'</td>
            <td className="center bold vamid">120'</td>
            <td className="center bold vamid">150'</td>
            <td className="center bold vamid">180'</td>
          </tr>
          {TIEU_CHUAN.map((item, index) => {
            return (
              <tr key={index}>
                <td className="vamid bold">{`${index + 1}. ${item.label}`}</td>
                {TIEU_CHUAN_COLS.map((col, index2) => {
                  const key = [
                    "bangTheoDoi",
                    "tieuChuan",
                    `cot${index2 + 1}`,
                    item.value,
                  ];

                  return (
                    <td key={index2} className="w50 vamid col-dich center">
                      {index == TIEU_CHUAN.length - 1 ? (
                        state[key.join("_")]
                      ) : (
                        <DropDownList
                          disabled={isDisable(null, key)}
                          title="Chọn giá trị"
                          className={"f1 drop-list"}
                          dataSource={TIEU_CHUAN_VALUE}
                          value={state[key.join("_")]}
                          onChange={(value) =>
                            onChangeValueKhung(key, false)(value.join())
                          }
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td colSpan={8}>
              <label className="p22 bold">
                II. Đủ thời gian theo dõi tối thiểu ở phòng hồi tỉnh
              </label>
              <CheckGroups
                component={{
                  props: {
                    type: "multiple",
                    checkList: [
                      {
                        value: "1h",
                        label:
                          "1 giờ: đã dùng thuốc giảm đau TW hoặc chống nôn",
                      },
                      { value: "1h_30", label: "1 giờ 30 phút : đã có NKQ" },
                      { value: "2h", label: "2 giờ sau co thắt thanh quản" },
                      {
                        value: "2h30",
                        label:
                          "2 giờ 30 phút: đã dùng thuốc giãn cơ không khử cực",
                      },
                      {
                        value: "18h",
                        label: "18 giờ : Dùng Morphin tủy sống",
                      },
                    ].map((item, index) => {
                      const time = new Date().getTime();
                      return {
                        value: item.value,
                        key: time + index,
                        label: item.label,
                      };
                    }),
                    fieldName: "value",
                  },
                }}
                mode={mode}
                form={{
                  value:
                    state[
                      ["bangTheoDoi", "tieuChuan", "thoiGianTheoDoi"].join("_")
                    ],
                }}
                formChange={{
                  value: (value) => {
                    onChangeValueKhung(
                      ["bangTheoDoi", "tieuChuan", "thoiGianTheoDoi"],
                      false
                    )(value);
                  },
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Khung;
