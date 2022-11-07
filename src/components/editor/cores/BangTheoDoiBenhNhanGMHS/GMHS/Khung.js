import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { cloneDeep, get, isEmpty } from "lodash";
import { Button, Checkbox, Icon, Input, InputNumber, message } from "antd";
import { SIZE } from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/utils/vital-signs/constants";
import { NHIETS, MACHS, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import { handleBloodPressure } from "utils/vital-signs/canvas-utils";
import ModalChangeDate from "pages/vital-signs/components/ModalChangeDate";
import DropDownList from "../../BangTheoDoiBenhNhanHSTC/DropDownList";
import { Fragment } from "react";
import VitalSigns from "./VitalSigns";
import Arrow from "./Arrow";
import { useSelector } from "react-redux";
import { combineFields, appendPrefix } from "utils/editor-utils";
import { convert } from "components/File/constants";
import DeboundInput from "components/editor/config/DeboundInput";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import EMRContext from "pages/editor/context/EMR";

const Khung = (
  {
    itemProps,
    form,
    formChange,
    block,
    refModalBloodPressure,
    refModalInputRespiratory,
    khung,
    khungIndex,
    rowId,
    refModalAddLabel,
    refModalInputDongTu,
    refModalSelectCSS,
    refModalRemoveColunm,
    canvasWidth,
    canvasHeight,
    columnWidth,
    onRemove,
    disabled,
    idNhanGayMe,
    ...props
  },
  refs
) => {
  const context = useContext(EMRContext);  
  const maHoSo = context.patient?.maHoSo;
  const ASA = ["I", "II", "III", "IV", "V"];
  const MALALMAPATI = ["I", "II", "III", "IV"];
  const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const LEFT_VITAL_SIGNS = 325;
  const LEFT_COLUMN_ITEM_MRLEFT = 15;
  const refChangeDate = useRef(null);
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
        ["chiSo", "cot" + (index + 1), "chiSoSong", "huyetApTamThu"].join("_")
      ];
    const tamTruong =
      state[
        ["chiSo", "cot" + (index + 1), "chiSoSong", "huyetApTamTruong"].join(
          "_"
        )
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
      const key = ["chiSo", "cot" + (index + 1)];
      const newState = {
        [[...key, "chiSoSong", "huyetApTamThu"].join("_")]: arr[0],
        [[...key, "chiSoSong", "huyetApTamTruong"].join("_")]: arr[1] || "",
      };
      newState.rangeBloodPressure = getRangeBloodPressure({
        ...state,
        ...newState,
      });

      setState(newState);
      formChange.setMultiData(rowId, {
        [[getKhung(), ...key, "chiSoSong", "maHoSo"].join("_")]: maHoSo,
        [[getKhung(), ...key, "chiSoSong", "huyetApTamThu"].join("_")]: arr[0],
        [[getKhung(), ...key, "chiSoSong", "huyetApTamTruong"].join("_")]:
          arr[1] || "",
        [[getKhung(), ...key, "coThayDoi"].join("_")]: true,
      });
    });
  };

  const onChangeDongTu = (index) => () => {
    const key = ["chiSo", "cot" + (index + 1)];
    refModalInputDongTu.current.show(
      { value: state[[...key, "dongTu"].join("_")] },
      (s) => {
        onChangeValueKhung([...key, "dongTu"])(s);
      }
    );
  };

  const getNhipTho = (index) => {
    const nhipTho =
      state[["chiSo", "cot" + (index + 1), "chiSoSong", "nhipTho"].join("_")];
    const bopBong =
      state[["chiSo", "cot" + (index + 1), "chiSoSong", "bopBong"].join("_")] ||
      [];
    if (bopBong && bopBong.includes && bopBong.includes("Có")) {
      return `${nhipTho}/(bb)`;
    } else {
      return nhipTho;
    }
  };
  const onChangeNhipTho = (index) => () => {
    const nhipTho = getNhipTho(index) || "";
    refModalInputRespiratory.current.show({ value: nhipTho }, (s) => {
      const arr = s.split("/");
      const key = ["chiSo", "cot" + (index + 1)];
      const newState = {
        [[...key, "chiSoSong", "nhipTho"].join("_")]: arr[0],
        [[...key, "chiSoSong", "bopBong"].join("_")]: arr[1] ? ["Có"] : [],
      };
      setState(newState);
      formChange.setMultiData(rowId, {
        [[getKhung(), ...key, "chiSoSong", "maHoSo"].join("_")]: maHoSo,
        [[getKhung(), ...key, "chiSoSong", "nhipTho"].join("_")]: arr[0],
        [[getKhung(), ...key, "chiSoSong", "bopBong"].join("_")]: arr[1]
          ? ["Có"]
          : [],
        [[getKhung(), ...key, "coThayDoi"].join("_")]: true,
      });
    });
  };

  const getChecked = (type, value) => {
    try {
      return state[type].includes(value);
    } catch (error) {
      return false;
    }
  };
  const onChangeChecked = (type, value) => () => {
    let data = [];
    try {
      data = state[type] || [];
      if (!data.length) {
        data.push(value);
      } else {
        if (data.includes(value)) {
          data = [];
        } else {
          data = [value];
        }
      }
    } catch (error) {
      data = [value];
    }
    onChangeValueKhung([type])(data);
  };

  const onAddNhan = (index) => () => {
    //kiểm tra nếu chưa thêm thời gian thì bỏ qua
    if (
      !state[["chiSo", "cot" + (index + 1), "chiSoSong", "thoiGian"].join("_")]
    )
      return;
    if (disabled) return;
    const type = ["chiSo", "cot" + (index + 1), "nhanTheoDoi"];
    const data = state[type.join("_")] || [];
    refModalAddLabel.current &&
      refModalAddLabel.current.show({ data }, (data) => {
        onChangeValueKhung(type)(data);
      });
  };
  const onChangeThuoc = (thuoc, index) => (value) => {
    thuoc["cot" + (index + 1)] = value;
    onChangeValueKhung(["thuocDichTruyen"], false)(state.thuocDichTruyen);
  };
  const onChangeTextGhiChu = (thuoc, index) => (value) => {
    thuoc["ghiChu"] = value;
    onChangeValueKhung(["thuocDichTruyen"], false)(state.thuocDichTruyen);
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
        const key = ["chiSo", "cot" + (colIndex + 1)];
        formChange.setMultiData(rowId, {
          [[getKhung(), ...key, "chiSoSong", "maHoSo"].join("_")]: maHoSo,
          [[getKhung(), ...key, "coThayDoi"].join("_")]: true,
          [[getKhung(), fieldName].join("_")]: value,
        });
        return;
      }
    };
  const getKhung = () => {
    if (rowId) return "khung2";
    return "khung1";
  };

  const onShowDatePicker = (index) => () => {
    const key = ["chiSo", "cot" + (index + 1), "chiSoSong"];
    const keyPrev = ["chiSo", "cot" + index, "chiSoSong"];
    let date = null;
    if (!state[[...key, "thoiGian"].join("_")]) {
      date = state[[...keyPrev, "thoiGian"].join("_")]
        ? moment(state[[...keyPrev, "thoiGian"].join("_")]).add(10, "minutes")
        : null;
    } else {
      date = moment(state[[...key, "thoiGian"].join("_")]);
    }
    let chiSoSong = get(convert(state), key.join("."));
    refModalSelectCSS.current &&
      refModalSelectCSS.current.show(
        { chiSoSong, dateDefault: date },
        (css = {}) => {
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
          obj[["chiSo", "cot" + (index + 1), "coThayDoi"].join("_")] = true;
          obj = appendPrefix(obj, getKhung() + "_");
          formChange.setMultiData(rowId, obj);
        }
      );
    // refChangeDate.current &&
    //   refChangeDate.current.show(date || new Date(), index, (date) => {
    //     if (date > new Date()) {
    //       message.error("Vui lòng chọn thời gian nhỏ hơn thời gian hiện tại");
    //       return false;
    //     }
    //     setState({
    //       [[...key, "chiSoSong", "thoiGian"].join("_")]:
    //         date.format("yyyy/MM/dd HH:mm"),
    //     });
    //     formChange.setMultiData(rowId, {
    //       [[getKhung(), ...key, "chiSoSong", "thoiGian"].join("_")]: date,
    //       [[getKhung(), ...key, "coThayDoi"].join("_")]: true,
    //     });
    //   });
  };
  const handleRemoveColunm = () => {
    let values = {};
    for (let i = 1; i <= 12; i++) {
      const field = "chiSo_" + "cot" + i + "_chiSoSong";
      Object.keys(state).forEach((key) => {
        if (key.includes(field)) {
          if (!values[i]) values[i] = {};
          values[i][key] = state[key];
        }
      });
    }
    if (refModalRemoveColunm.current) {
      refModalRemoveColunm.current.show({ values }, (cols) => {
        let obj = {};
        cols.forEach((col) => {
          const key = ["chiSo", "cot" + col];
          let chiSo = get(convert(state), key.join("."));
          let listField = combineFields(chiSo);
          for (let x in listField) {
            listField[x] = null;
          }
          listField = appendPrefix(listField, key.join("_") + "_");
          obj = {
            ...obj,
            ...listField,
          };
          obj[["chiSo", "cot" + col, "coThayDoi"].join("_")] = true;
        });
        setState(obj);
        obj = appendPrefix(obj, getKhung() + "_");
        formChange.setMultiData(rowId, obj);
      });
    }
  };
  const onChangeValueKhung =
    (type, saveToState = true) =>
    (value = "") => {
      const indexColumn = type[2].replace("cot");
      if (!formChange) return;
      let fieldName = "";
      if (Array.isArray(type)) {
        fieldName = type.join("_");
        if (saveToState) {
          setState({ [fieldName]: value });
        } else {
          silentUpdateState({ [fieldName]: value });
        }
        formChange.onChange(rowId, [getKhung(), ...type].join("_"), value);
      }
    };
  const onChangeValueChung =
    (type, saveToState = true) =>
    (value = "") => {
      if (!formChange) return;
      const newState = {};
      if (
        [
          "asa",
          "daDayDay",
          "capCuu",
          "malalmapati",
          "diUng",
          "tienSuGayMeGayTe",
          "thuocDangDieuTri",
          "xetNghiemBatThuong",
        ].includes(type)
      ) {
        if (["daDayDay", "capCuu"].includes(type)) {
          value = value.target.checked;
          newState[type] = value;
          if ("daDayDay" == type) {
            value = value ? ["Da_Day_Day"] : [];
          }
          if ("capCuu" == type) {
            value = value ? ["Cap_Cuu"] : [];
          }
        } else {
          newState[type] = value;
        }
        formChange.onChange(null, type, value);
        if (saveToState) {
          setState(newState);
        } else {
          silentUpdateState(newState);
        }
      }
    };

  const getRangeBloodPressure = (state) => {
    const values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    values.forEach((item, index) => {
      const key = ["chiSo", "cot" + (index + 1), "chiSoSong"];
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

  const colTongCong = <td className="center bold vamid">TỔNG CỘNG</td>;

  const tongGayMe = () => {
    try {
      const dsGayMe = new Array(12)
        .fill({})
        .map((item, index) => {
          const keyNhan = ["chiSo", "cot" + (index + 1), "nhanTheoDoi"];
          const keyThoiGian = [
            "chiSo",
            "cot" + (index + 1),
            "chiSoSong",
            "thoiGian",
          ];
          const thoiGian = state[keyThoiGian.join("_")];
          const arrNhan = (thoiGian ? state[keyNhan.join("_")] || [] : [])
            .filter((item) => thoiGian && item.id == idNhanGayMe)
            .map((nhan, index) => {
              nhan.thoiGian = thoiGian;
              return nhan;
            });
          return arrNhan;
        })
        .reduce((a, b) => {
          return a.concat(b);
        }, []);
      if (dsGayMe.length) {
        let start, end;
        dsGayMe.forEach((item) => {
          if (!start && (item.loai || []).includes("Start")) {
            start = item;
          }
          if ((item.loai || []).includes("End")) {
            end = item;
          }
        });
        if (start && end) {
          start = moment(start.thoiGian)._d;
          end = moment(end.thoiGian)._d;
          return parseInt(Math.abs(end - start) / 60000) + " phút";
        }
      }
    } catch (error) {
      console.log(error);
    }

    return "";
  };
  const rowSpanHoHap = useMemo(() => {
    let row = 9;
    if (!itemProps.showMoreInfo) row--;
    if (!itemProps.showHalotan) row--;
    if (!itemProps.showDesflurane) row--;
    if (!itemProps.showServoran) row--;
    return row;
  }, [itemProps]);
  const rowSpanNhanXet = useMemo(() => {
    let row = 15;
    if (!itemProps.showALMPB) row--;
    if (!itemProps.showALTMTT) row--;
    if (!itemProps.showDongTu) row--;
    if (!itemProps.showKhac) row--;
    return row + rowSpanHoHap;
  }, [itemProps]);
  const renderThuoc = useMemo(() => {
    const dsThuoc = state.thuocDichTruyen || [];
    return dsThuoc.map((thuoc, index) => {
      return (
        <>
          <tr key={index}>
            {index == 0 && (
              <td rowSpan={dsThuoc.length} colSpan={1} className="col-lv1">
                THUỐC, DỊCH TRUYỀN
              </td>
            )}
            {khungIndex == 0 ? (
              <>
                <td colSpan={1} className="col-lv2 no-border-right"></td>
                <td colSpan={1} className="col-lv3 no-border-left"></td>
              </>
            ) : (
              <td colSpan={2} className="vamid center">
                {thuoc["tongCu"]}
              </td>
            )}
            <td colSpan={2} className="vamid p02">
              {thuoc.ten}
            </td>
            {COLUMNS.map((item, idx) => {
              const checkActive = idx === state?.indexColumn;
              return (
                <td
                  className={`col-lv6 center vamid a ${
                    checkActive ? " active-column" : ""
                  }`}
                  key={idx}
                >
                  <DeboundInput
                    readOnly={isDisable(idx)}
                    size={"small"}
                    step={1}
                    min={0}
                    value={thuoc["cot" + (idx + 1)]}
                    onChange={onChangeThuoc(thuoc, idx)}
                    type="number"
                  />
                </td>
              );
            })}
            <td className="vamid center" style={{ display: "flex" }}>
              <span style={{ width: "30%" }}>{thuoc.tong}</span>
              <span style={{ width: "70%" }}>
                <DeboundInput
                  rows={1}
                  readOnly={isDisable(index)}
                  value={thuoc?.ghiChu || ""}
                  onChange={onChangeTextGhiChu(thuoc, index)}
                  type="multipleline"
                  lineHeightText={1}
                  fontSize={9}
                  minHeight={9 + 6}
                />
              </span>
            </td>
          </tr>
        </>
      );
    });
  }, [state.thuocDichTruyen, state?.indexColumn]);
  const getValuesVitalSigns = () => {
    const values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    values.forEach((item, index) => {
      const key = ["chiSo", "cot" + (index + 1), "chiSoSong"];
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
  const onChangeindexColumn = (index) => () => {
    if (index !== state.indexColumn) {
      setState({
        indexColumn: index,
      });
    }
  };
  const changeindexColumn = (index) => {
    if (index !== state.indexColumn) {
      setState({
        indexColumn: index,
      });
    }
  };

  return (
    <Fragment>
      <tr>
        <td colSpan={3} className="bold center">
          {/* 
            nhưng khung2 được phép xuất hiện nút xóa khung
          */}
          <span className="btn-remove-col" onClick={handleRemoveColunm}>
            xóa cột
          </span>

          {rowId && !disabled && (
            <Button
              icon={<DeleteOutlined />}
              className="btn-remove-khung"
              size="small"
              onClick={onRemove}
            />
          )}
        </td>
        <td colSpan={2} className="bold center vamid">
          <div className="vital-sign-left-column">GIỜ</div>
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "thoiGian"];
          onChangeindexColumn(index);
          return (
            <td
              className="col-lv6 center"
              key={index}
              onClick={!isDisable(index) ? onShowDatePicker(index) : null}
            >
              <div className="time">{showDateValue(state[key.join("_")])}</div>
            </td>
          );
        })}
        <td className="col-lv7 p22 nhanXet" rowSpan={rowSpanNhanXet}>
          <div className="bold center fixWidth2 mb10">NHẬN XÉT VÀ KẾT LUẬN</div>
          <DeboundInput
            readOnly={rowId || isDisable(null, ["nhanXet"])}
            onChange={onChangeValueKhung(["nhanXet"], false)}
            type="multipleline"
            value={state.nhanXet || ""}
            lineHeightText={1}
            fontSize={9}
            minHeight={9 * 50 + 6}
          />
        </td>
      </tr>
      <tr style={{ height: 50 }}>
        <td rowSpan={6} colSpan={3} className="p02 danhGia">
          <div className="bold m20 fixWidth1">ĐÁNH GIÁ TRƯỚC MỔ:</div>
          <div className="flex mb5">
            <label>- ASA: </label>
            <DropDownList
              disabled={isDisable(null)}
              title="Chọn ASA"
              className={"f1 drop-list"}
              dataSource={ASA}
              value={state.asa}
              onChange={onChangeValueChung("asa")}
            />
          </div>
          <div className="cbox ml10 mb5">
            <Checkbox
              checked={state.daDayDay}
              onChange={onChangeValueChung("daDayDay")}
            />
            <label className="label">Dạ dày đầy</label>
          </div>
          <div className="cbox ml10 mb5">
            <Checkbox
              checked={state.capCuu}
              onChange={onChangeValueChung("capCuu")}
            />
            <label className="label">Cấp cứu</label>
          </div>
          <div className="flex mb5">
            <label>- Malalmapati: </label>
            <DropDownList
              disabled={isDisable(null)}
              title="Chọn Mallampati"
              className={"f1 drop-list"}
              dataSource={MALALMAPATI}
              value={state.malalmapati}
              onChange={onChangeValueChung("malalmapati")}
            />
          </div>
          <div className="flex fdc mb10">
            <label className="block mb5">- Dị ứng: </label>
            <DeboundInput
              value={state.diUng}
              rows={2}
              readOnly={rowId || isDisable(null, ["diUng"])}
              onChange={onChangeValueChung("diUng", false)}
              type="multipleline"
              lineHeightText={1}
              fontSize={9}
              minHeight={9 * 2 + 6}
            />
          </div>
          <div className="fdc mb10">
            <label className="block block mb5">
              - Tiền sử/ Thuốc liên quan GHMS:
            </label>
            <DeboundInput
              value={state.tienSuGayMeGayTe}
              readOnly={rowId || isDisable(null, ["tienSuGayMeGayTe"])}
              onChange={onChangeValueChung("tienSuGayMeGayTe", false)}
              type="multipleline"
              lineHeightText={1}
              fontSize={9}
              minHeight={9 * 2 + 6}
            />
            <DeboundInput
              value={state.thuocDangDieuTri}
              readOnly={rowId || isDisable(null, ["thuocDangDieuTri"])}
              onChange={onChangeValueChung("thuocDangDieuTri", false)}
              type="multipleline"
              lineHeightText={1}
              fontSize={9}
              minHeight={9 * 2 + 6}
            />
          </div>
          <div className="flex fdc mb10">
            <label className="block mb5">
              - Bất thường lâm sàng/ cận lâm sàng liên quan GMHS:{" "}
            </label>
            <DeboundInput
              value={state.xetNghiemBatThuong}
              readOnly={rowId || isDisable(null, ["xetNghiemBatThuong"])}
              onChange={onChangeValueChung("xetNghiemBatThuong", false)}
              type="multipleline"
              lineHeightText={1}
              fontSize={9}
              minHeight={9 * 2 + 6}
            />
          </div>
        </td>
        <td colSpan={2} className="vamid">
          <div className="flex acenter jcenter">
            <Arrow start={1} height={10} className="mr5" />
            <div className="w50">Bắt đầu</div>
          </div>
          <div className="flex acenter jcenter">
            <Arrow start={0} height={10} className="mr5" />
            <div className="w50">Kết thúc</div>
          </div>
        </td>
        {COLUMNS.map((item, index) => {
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center curp ${
                checkActive ? "active-column" : ""
              }`}
              key={index}
              onClick={onAddNhan(index)}
            >
              <div className="flex jcenter acenter">
                {(
                  get(
                    state,
                    ["chiSo", "cot" + (index + 1), "nhanTheoDoi"].join("_")
                  ) || []
                ).map((label, idx) => {
                  return (
                    <Arrow
                      value={label.id}
                      start={(label.loai || []).includes("Start") ? 1 : 0}
                      key={idx}
                    />
                  );
                })}
              </div>
            </td>
          );
        })}
      </tr>
      <tr style={{ height: 343 }}>
        <td colSpan={2}>
          <table className="table-left-vital-signs">
            <tbody>
              <tr className="left-column-row-height">
                <td className="bold center w75 vamid fo8">HUYẾT ÁP</td>
                <td className="bold center w75 vamid fo8">MẠCH</td>
                <td className="bold center w75 vamid fo8">NHIỆT ĐỘ</td>
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
        <td
          style={{
            position: "relative",
            height: `${canvasHeight - 3}px`,
          }}
          className={`${state?.indexColumn === 0 ? "active-column" : ""}`}
        >
          <VitalSigns
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            columnWidth={columnWidth}
            rangeBloodPressure={state.rangeBloodPressure || []}
            values={getValuesVitalSigns()}
            bonusSize={2}
            changeindexColumn={changeindexColumn}
          />
        </td>
        {Array(11)
          .fill([])
          .map((item, index) => {
            const checkActive = index + 1 == state?.indexColumn;
            return (
              <td className={`${checkActive ? "active-column" : ""}`}></td>
            );
          })}
        {/* <td className={"col-3"}></td>
        <td className={"col-4"}></td>
        <td className={"col-5"}></td>
        <td className={"col-6"}></td>
        <td className={"col-7"}></td>
        <td className={"col-8"}></td>
        <td className={"col-9"}></td>
        <td className={"col-10"}></td>
        <td className={"col-11"}></td>
        <td className={"col-12"}></td> */}
      </tr>
      <tr>
        <td colSpan={2} className="bold center vamid">
          Nhiệt độ
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "nhietDo"];
          return (
            <td
              className={`col-lv6 center col-${index + 1}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
        <td colSpan={2} className="bold center vamid">
          Mạch
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "mach"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
        <td colSpan={2} className="bold center vamid">
          Huyết áp
        </td>
        {COLUMNS.map((item, index) => {
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
        <td colSpan={2} className="bold center vamid red">
          Ghi chú
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "ghiChu"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                rows={2}
                className={`red ${isDisable(index, key) ? "disabled" : ""}`}
                readOnly={isDisable(index, key)}
                value={state[key.join("_")] || ""}
                onChange={onChangeValueKhung(key, false)}
                type="multipleline"
                lineHeightText={1}
                fontSize={9}
                minHeight={9 + 6}
              />
            </td>
          );
        })}
      </tr>
      {itemProps.showDongTu && (
        <tr>
          <td colSpan={5} className="vamid p02">
            Đồng tử: Phải/ trái
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "dongTu"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center  ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
                <Input
                  readOnly={true}
                  onClick={!isDisable(index) ? onChangeDongTu(index) : null}
                  size={"small"}
                  value={state[key.join("_")]}
                />
              </td>
            );
          })}
        </tr>
      )}
      <tr>
        <td colSpan={5} className="vamid p02">
          Số lượng mất máu
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "matMau"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={9999}
                value={state[key.join("_")]}
                onChange={onChangeValueKhung(key, false)}
                type="number"
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={5} className="vamid p02">
          Số lượng nước tiểu
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "nuocTieu"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={9999}
                value={state[key.join("_")]}
                onChange={onChangeValueKhung(key, false)}
                type="number"
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={5} className="vamid p02">
          Đường máu
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "duongMau"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
      {itemProps.showKhac && (
        <tr>
          <td colSpan={5} className="vamid p02">
            Khác
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "theoDoiKhac"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 ${checkActive ? "active-column" : ""}`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
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
      )}
      <tr>
        <td colSpan={3} className="vamid p02">
          ALĐMP
        </td>
        <td colSpan={1} className="col-lv4 vamid">
          <div className="cbox">
            <Checkbox
              checked={getChecked("aldmp", "mmHg")}
              disabled={rowId || isDisable(null, "aldmp")}
              onChange={onChangeChecked("aldmp", "mmHg", khungIndex)}
            />
            <label className="label">mmHg</label>
          </div>
        </td>
        <td colSpan={1} className="col-lv5 vamid">
          <div className="cbox">
            <Checkbox
              checked={getChecked("aldmp", "cmh2o")}
              disabled={rowId || isDisable(null, "aldmp")}
              onChange={onChangeChecked("aldmp", "cmh2o", khungIndex)}
            />
            <label className="label">mmH2O</label>
          </div>
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "aldmp"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
      {itemProps.showALMPB && (
        <tr>
          <td colSpan={3} className="vamid p02">
            ALĐMPB
          </td>
          <td colSpan={1} className="col-lv4 vamid">
            <div className="cbox">
              <Checkbox
                checked={getChecked("aldmpb", "mmHg")}
                disabled={rowId || isDisable(null, "aldmpb")}
                onChange={onChangeChecked("aldmpb", "mmHg", khungIndex)}
              />
              <label className="label">mmHg</label>
            </div>
          </td>
          <td colSpan={1} className="col-lv5 vamid">
            <div className="cbox">
              <Checkbox
                checked={getChecked("aldmpb", "cmh2o")}
                disabled={rowId || isDisable(null, "aldmpb")}
                onChange={onChangeChecked("aldmpb", "cmh2o", khungIndex)}
              />
              <label className="label">mmH2O</label>
            </div>
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "aldmpb"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
              >
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
      )}
      {itemProps.showALTMTT && (
        <tr>
          <td colSpan={3} className="vamid p02">
            ALTMTT
          </td>
          <td colSpan={1} className="col-lv4 vamid">
            <div className="cbox">
              <Checkbox
                checked={getChecked("altmtt", "mmHg")}
                disabled={rowId || isDisable(null, "altmtt")}
                onChange={onChangeChecked("altmtt", "mmHg", khungIndex)}
              />
              <label className="label">mmHg</label>
            </div>
          </td>
          <td colSpan={1} className="col-lv5 vamid">
            <div className="cbox">
              <Checkbox
                checked={getChecked("altmtt", "cmh2o")}
                disabled={rowId || isDisable(null, "altmtt")}
                onChange={onChangeChecked("altmtt", "cmh2o", khungIndex)}
              />
              <label className="label">mmH2O</label>
            </div>
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "altmtt"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
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
      )}
      <tr>
        <td colSpan={5} className="vamid p02">
          Nhịp thở
        </td>
        {COLUMNS.map((item, index) => {
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <Input
                readOnly={true}
                onClick={
                  !isDisable(index, ["nhipTho"]) ? onChangeNhipTho(index) : null
                }
                size={"small"}
                value={getNhipTho(index)}
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={1} rowSpan={rowSpanHoHap} className="col-lv1">
          Hô hấp
        </td>
        <td colSpan={2} rowSpan={rowSpanHoHap} className="vamid center">
          Máy mê
        </td>
        <td colSpan={2} className="vamid p02">
          TTLT
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "hohap", "ttvl"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={9999}
                value={state[key.join("_")]}
                onChange={onChangeValueKhung(key, false)}
                type="number"
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={2} className="vamid p02">
          FeCO2
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "feCo2"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={99}
                value={state[key.join("_")]}
                onChange={onChangeValueChiSoSong(key, index, false)}
                type="number"
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={2} className="vamid p02">
          {itemProps.textApLuc === undefined ? "Áp lực" : itemProps.textApLuc}
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "hohap", "apLuc"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
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
        <td colSpan={2} className="vamid p02">
          SpO2 (%)
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "spo2"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={999}
                value={state[key.join("_")]}
                onChange={onChangeValueChiSoSong(key, index, false)}
                type="number"
              />
            </td>
          );
        })}
      </tr>
      <tr>
        <td colSpan={2} className="vamid p02">
          FiO2 (%)
        </td>
        {COLUMNS.map((item, index) => {
          const key = ["chiSo", "cot" + (index + 1), "chiSoSong", "fio2"];
          const checkActive = index === state?.indexColumn;
          return (
            <td
              className={`col-lv6 center ${checkActive ? "active-column" : ""}`}
              key={index}
              onClick={onChangeindexColumn(index)}
            >
              <DeboundInput
                readOnly={isDisable(index, key)}
                size={"small"}
                step={1}
                min={0}
                max={999}
                value={state[key.join("_")]}
                onChange={onChangeValueChiSoSong(key, index, false)}
                type="number"
              />
            </td>
          );
        })}
        {!itemProps.showServoran &&
          !itemProps.showDesflurane &&
          !itemProps.showHalotan &&
          !itemProps.showMoreInfo &&
          colTongCong}
      </tr>
      {itemProps.showServoran && (
        <tr>
          <td colSpan={2} className="vamid p02">
            Servoran (%)
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "hohap", "servoran"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
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
          {!itemProps.showDesflurane &&
            !itemProps.showHalotan &&
            !itemProps.showMoreInfo &&
            colTongCong}
        </tr>
      )}
      {itemProps.showDesflurane && (
        <tr>
          <td colSpan={2} className="vamid p02">
            Desflurane (%)
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "hohap", "desflurane"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
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
          {!itemProps.showHalotan && !itemProps.showMoreInfo && colTongCong}
        </tr>
      )}
      {itemProps.showHalotan && (
        <tr>
          <td colSpan={2} className="vamid p02">
            Halotan (%)
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "hohap", "halotan"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
                <DeboundInput
                  readOnly={isDisable(index, key)}
                  size={"small"}
                  step={1}
                  min={0}
                  max={99.9}
                  value={state[key.join("_")] || ""}
                  onChange={onChangeValueKhung(key, false)}
                  type="number"
                />
              </td>
            );
          })}
          {!itemProps.showMoreInfo && colTongCong}
        </tr>
      )}
      {itemProps.showMoreInfo && (
        <tr>
          <td colSpan={2} className="vamid p02">
            <div className="flex">
              <DeboundInput
                readOnly={rowId || isDisable(null, ["hoHapTuNhap"])}
                size={"small"}
                className="f1"
                value={state.hoHapTuNhap || ""}
                onChange={onChangeValueKhung(["hoHapTuNhap"], false)}
                type="multipleline"
              />
              (%)
            </div>
          </td>
          {COLUMNS.map((item, index) => {
            const key = ["chiSo", "cot" + (index + 1), "hohap", "tuNhap"];
            const checkActive = index === state?.indexColumn;
            return (
              <td
                className={`col-lv6 center ${
                  checkActive ? "active-column" : ""
                }`}
                key={index}
                onClick={onChangeindexColumn(index)}
              >
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
          {colTongCong}
        </tr>
      )}
      {renderThuoc}

      {itemProps.showQuanSat && (
        <tr>
          <td colSpan={1} className="col-lv1">
            QUAN SÁT
          </td>
          <td colSpan={16} className="">
            <DeboundInput
              readOnly={isDisable(null, ["quanSat"])}
              onChange={onChangeValueKhung(["quanSat"], false)}
              type="multipleline"
              value={state.quanSat}
              lineHeightText={1}
              fontSize={9}
              minHeight={9 * 2 + 6}
            />
          </td>
          <td className="p22">
            <div className="bold fixWidth2">
              TỔNG THỜI GIAN MÊ: {tongGayMe()}
            </div>
          </td>
        </tr>
      )}
      <ModalChangeDate
        ref={refChangeDate}
        columnWidth={columnWidth}
        marginLeft={LEFT_VITAL_SIGNS - 89}
      />
    </Fragment>
  );
};

export default Khung;
