import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { cloneDeep, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { SIZE } from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/utils/vital-signs/constants";
import { MODE, appendPrefix } from "utils/editor-utils";
import { Main } from "./styled";
import ModalBloodPressure from "pages/vital-signs/components/ModalBloodPressure";
import ModalInputRespiratory from "pages/vital-signs/components/ModalInputRespiratory";
import ModalInputDongTu from "./ModalInputDongTu";
import ModalAddLabel from "./ModalAddLabel";
import Khung from "./Khung";
import { Button } from "antd";
import stringUtils from "mainam-react-native-string-utils";
import { convert } from "components/File/constants";
import ModalSelectCSS from "./ModalSelectCSS";
import ModalRemoveColunm from "./ModalRemoveColunm";
import { PlusOutlined } from "@ant-design/icons";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const initState = {
  currentValue: {},
  khungState: [],
};

const GMHS = ({ itemProps, form, formChange, block, mode, ...props }) => {
  const LEFT_VITAL_SIGNS = 325;
  const TOTAL_COL = 12;
  const refModalBloodPressure = useRef(null);
  const refModalInputRespiratory = useRef(null);
  const refModalAddLabel = useRef(null);
  const refModalInputDongTu = useRef(null);
  const refModalSelectCSS = useRef(null);
  const prevValuesRef = useRef(null);
  const refModalRemoveColunm = useRef(null);
  const { getAll: getAllNhanTheoDoi } = useDispatch().nhanTheoDoi;
  // const getCommonConfig = useDispatch().common.getCommonConfig;
  const idNhanGayMe = useSelector((state) => {
    return state.common.commonConfig[itemProps.idNhanGayMe]?.giaTri;
  });
  const context = useContext(EMRContext);
  const signStatus = useStore("files.signStatus", {});

  const refState = useRef({
    ...initState,
  });
  const [state, _setState] = useState(refState.current);
  const setState = (data = {}) => {
    _setState((state) => {
      refState.current = { ...refState.current, ...data };
      return refState.current;
    });
  };
  const refMain = useRef(null);

  useEffect(() => {
    refState.current = state;
    if (mode == MODE.editing) {
      getAllNhanTheoDoi();
      // getCommonConfig();
    }
  }, []);
  useEffect(() => {
    console.log(idNhanGayMe);
  }, [idNhanGayMe]);

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

  const disabled = useMemo(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  useEffect(() => {
    itemProps.fieldName = "khung1";
    if (itemProps.fieldName && form) {
      let khungs = [form["khung1"] || {}];
      khungs = khungs.concat(form["khung2"] || []);
      //danh s??ch c??c khung trong phi???u = khung 1 + t???t c??? c??c phi???u trong khung2
      prevValuesRef.current = []; //reset l???i bi???n ch???a d??? li???u c???a khung2
      const khungState = khungs.map((khung, idx) => {
        //duy???t qua danh s??ch t???t c??? c??c khung
        const preKhung = khungs[idx - 1];
        let fieldName;
        /*m???c ?????nh c??c khung2 s??? kh??ng tr??? v??? gi?? tr??? c???a t???ng c??. 
        N??n s??? l???y d??? li???u t???ng t??? khung tr?????c ???? ????? th??m v??o gi?? tr??? t???ng c?? c???a khung hi???n t???i.
        */
        const thuocDichTruyen = getValue(khung, "thuocDichTruyen") || [];
        if (preKhung) {
          const preThuocDichTruyen =
            getValue(preKhung, "thuocDichTruyen") || [];
          thuocDichTruyen.forEach((thuoc) => {
            const preThuoc = preThuocDichTruyen.find(
              (item) => item.id == thuoc.id
            );
            if (preThuoc) thuoc.tongCu = preThuoc.tong;
          });
        }
        let obj = {
          hoHapTuNhap: khungs[0].hoHapTuNhap,
          nhanXet: khungs[0].nhanXet,
          quanSat: khung.quanSat,
          thuocDichTruyen,
          tienSuGayMeGayTe: khung.tienSuGayMeGayTe,
          thuocDangDieuTri: khung.thuocDangDieuTri,
          aldmp: getValue(khungs[0], "aldmp"),
          aldmpb: getValue(khungs[0], "aldmpb"),
          altmtt: getValue(khungs[0], "altmtt"),
        };
        //m???c ?????nh 1 khung c?? 12 c???t. n??n t???o ra 1 m???ng 12 ph???n t??? r???i duy???t qua ????? th??m c??c field v??o bi???n obj ph??a tren
        Array(12)
          .fill({})
          .forEach((item, index) => {
            if (!getValue(khung, ["chiSo", "cot" + (index + 1)].join(".")))
              return;
            fieldName = ["chiSo", "cot" + (index + 1), "aldmp"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "aldmpb"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "altmtt"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));

            fieldName = ["chiSo", "cot" + (index + 1), "nhanTheoDoi"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));

            fieldName = ["chiSo", "cot" + (index + 1), "ghiChu"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "dongTu"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "matMau"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "nuocTieu"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "theoDoiKhac"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "duongMau"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));

            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "ttvl"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "apLuc"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "servoran"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "desflurane"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "halotan"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "hohap", "tuNhap"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));

            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "id"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "maHoSo"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "nhietDo"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "mach"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = [
              "chiSo",
              "cot" + (index + 1),
              "chiSoSong",
              "huyetApTamThu",
            ];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = [
              "chiSo",
              "cot" + (index + 1),
              "chiSoSong",
              "huyetApTamTruong",
            ];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "nhipTho"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "bopBong"];
            obj[fieldName.join("_")] =
              getValue(khung, fieldName.join(".")) || [];
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "thoiGian"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "fio2"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "feCo2"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
            fieldName = ["chiSo", "cot" + (index + 1), "chiSoSong", "spo2"];
            obj[fieldName.join("_")] = getValue(khung, fieldName.join("."));
          });

        if (idx != 0) {
          /*n???u l?? item ?????u ti??n (khung1) th?? ko t???o ra rowId, c??n nh???ng khung kh??c th?? s??? t???o ra gi?? tr??? rowId  
          ????? l??m c??n c??? update gi?? tr???.
          */
          const tempObj = appendPrefix(cloneDeep(obj), "khung2_");
          const id = stringUtils.guid();
          obj.rowId = id;
          tempObj.rowId = id;
          //sau ???? th?? ?????y to??n b??? gi?? tr??? n??y v??o bi???n prevValuesRef ????? l??u l???i c??c gi?? tr??? c???a khung2
          prevValuesRef.current.push(tempObj);
        }
        //th??m t???t c??? c??c gi?? tr??? chung kh??ng n???m trong khung

        obj = {
          ...obj,
          asa: form.asa,
          malalmapati: form.malalmapati,
          xetNghiemBatThuong: form.xetNghiemBatThuong,
          thuocDangDieuTri: form.thuocDangDieuTri,
          tienSuGayMeGayTe: form.tienSuGayMeGayTe,
          diUng: form.diUng,
          daDayDay: (form.daDayDay || [])[0] == "Da_Day_Day",
          capCuu: (form.capCuu || [])[0] == "Cap_Cuu",
        };
        return obj;
      });
      setState({
        khungState,
      });
    }
  }, [form, itemProps]);

  const getValue = (khung = {}, fieldName, options = { exact: true }) => {
    if (options.exact == true) {
      return get(khung, fieldName);
    }
    return khung[itemProps.fieldName + "_" + fieldName];
  };
  const onAddKhung = () => {
    const khungState = state.khungState || [];
    //khi th??m m???i 1 khung th?? c???n sao ch??p l???i danh s??ch thu???c t??? khugn g???n nh???t
    const preKhung = khungState.slice(-1)[0];
    const newItem = { rowId: stringUtils.guid() };
    if (preKhung) {
      const thuocDichTruyen = preKhung.thuocDichTruyen || [];
      newItem.thuocDichTruyen = thuocDichTruyen.map((item) => {
        //thu???c c???n l???y s??? bao g???m: t???ng, id, t??n
        const { tong, tongCu, id, ten } = item;
        return { tongCu: tong || tongCu, tong: tong || tongCu, id, ten };
      });
      newItem.asa = preKhung.asa;
      newItem.malalmapati = preKhung.malalmapati;
      newItem.xetNghiemBatThuong = preKhung.xetNghiemBatThuong;
      newItem.thuocDangDieuTri = preKhung.thuocDangDieuTri;
      newItem.tienSuGayMeGayTe = preKhung.tienSuGayMeGayTe;
      newItem.diUng = preKhung.diUng;
      newItem.daDayDay = preKhung.daDayDay;
      newItem.capCuu = preKhung.capCuu;
      newItem.nhanXet = preKhung.nhanXet;
      newItem.hoHapTuNhap = preKhung.hoHapTuNhap;
      newItem.aldmp = preKhung.aldmp;
      newItem.aldmpb = preKhung.aldmpb;
      newItem.altmtt = preKhung.altmtt;
    }
    //sau ???? push v??o danh s??ch khung hi???n t???i
    khungState.push(newItem);
    prevValuesRef.current.push({
      rowId: newItem.rowId,
    });
    setData(prevValuesRef.current);
    setState({ khungState: [...khungState] });
  };

  const setData = (data) => {
    const newData = data.map((item) => {
      return convert(item)["khung2"] || {};
    });
    formChange["khung2"] && formChange["khung2"](newData);
  };

  const getFormChange = useMemo(() => {
    const obj = {};
    obj.onChange = (rowId, key, value) => {
      if (!formChange) return;
      if (!rowId) {
        formChange[key] && formChange[key](value);
      } else {
        const prevValues = prevValuesRef.current || [];
        const row = prevValues.find((item) => item.rowId == rowId);
        if (!row) {
          prevValues.push({
            rowId,
            [key]: value,
          });
        } else {
          row[key] = value;
        }
        setData(prevValues);
      }
    };

    obj.getAllData = () => {
      if (!formChange) return {};
      return formChange.getAllData();
    };
    obj.setMultiData = (rowId, data = {}) => {
      if (!formChange) return;
      if (!rowId) {
        formChange.setMultiData(data);
        return;
      }
      const prevValues = prevValuesRef.current || [];
      const row = prevValues.find((item) => item.rowId == rowId);
      if (!row) {
        prevValues.push({
          rowId,
          ...data,
        });
      } else {
        for (let key in data) {
          row[key] = data[key];
        }
      }
      setData(prevValues);
    };
    return obj;
  }, [formChange]);

  const onRemove = (rowId, index) => () => {
    const khungState = state.khungState || [];
    khungState.splice(index, 1);
    setState({
      khungState: [...khungState],
    });
    prevValuesRef.current = (prevValuesRef.current || []).filter(
      (item) => item.rowId != rowId
    );
    setData(prevValuesRef.current);
  };
  return (
    <Main
      columnWidth={columnWidth}
      ref={refMain}
      data-type="gay-me-hoi-suc-component"
    >
      {state.khungState.map((khung, index) => {
        return (
          <table className="khung" key={khung.rowId || index}>
            <tbody>
              <Khung
                itemProps={itemProps}
                khung={khung}
                rowId={khung.rowId}
                refModalBloodPressure={refModalBloodPressure}
                refModalInputRespiratory={refModalInputRespiratory}
                refModalAddLabel={refModalAddLabel}
                refModalInputDongTu={refModalInputDongTu}
                refModalSelectCSS={refModalSelectCSS}
                block={block}
                canvasWidth={canvasWidth}
                formChange={getFormChange}
                canvasHeight={canvasHeight}
                columnWidth={columnWidth}
                onRemove={onRemove(khung.rowId, index)}
                disabled={disabled}
                idNhanGayMe={idNhanGayMe}
                refModalRemoveColunm={refModalRemoveColunm}
              />
            </tbody>
          </table>
        );
      })}
      {!disabled && (
        <Button
          icon={<PlusOutlined />}
          size="small"
          onClick={onAddKhung}
          className="btn-add-khung"
        />
      )}
      <ModalBloodPressure ref={refModalBloodPressure} />
      <ModalInputRespiratory ref={refModalInputRespiratory} />
      <ModalAddLabel ref={refModalAddLabel} />
      <ModalInputDongTu ref={refModalInputDongTu} />
      <ModalSelectCSS ref={refModalSelectCSS} />
      <ModalRemoveColunm ref={refModalRemoveColunm}></ModalRemoveColunm>
    </Main>
  );
};

export default GMHS;
