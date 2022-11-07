import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { SIZE } from "../../BangTheoDoiBenhNhanHSTC/VitalSigns/utils/vital-signs/constants";
import { Main } from "./styled";
import ModalBloodPressure from "pages/vital-signs/components/ModalBloodPressure";
import ModalInputRespiratory from "pages/vital-signs/components/ModalInputRespiratory";
import Khung from "./Khung";
import { convert } from "components/File/constants";
import ModalSelectCSS from "../../BangTheoDoiBenhNhanGMHS/GMHS/ModalSelectCSS";
import { checkComponentDisable } from "utils/editor-utils";
import EMRContext from "pages/editor/context/EMR";

const initState = {
  khung: {},
};

const GMHS = ({ itemProps, form, formChange, block, mode, ...props }) => {
  const LEFT_VITAL_SIGNS = 212;
  const TOTAL_COL = 12;
  const refModalBloodPressure = useRef(null);
  const refModalInputRespiratory = useRef(null);
  const refModalSelectCSS = useRef(null);
  const { auth } = useSelector((state) => state.auth);
  const context = useContext(EMRContext);  
  const patient = context.patient;
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
  }, []);

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
    let disable =
      checkComponentDisable(
        auth,
        patient,
        itemProps,
        mode,
        signStatus,
        props
      ) || itemProps.disabled;
    return disable;
  }, [
    mode,
    signStatus,
    itemProps.disabled,
    itemProps.readOnly,
    props.valuesHIS, //[dataFromHis]
    patient,
    props.disable,
  ]);

  useEffect(() => {
    if (form) {
      let obj = {};
      let fieldName = "";
      //mặc định 1 khung có 12 cột. nên tạo ra 1 mảng 12 phần tử rồi duyệt qua để thêm các field vào biến obj phía tren
      Array(12)
        .fill({})
        .forEach((item, index) => {
          if (
            !getValue(
              form,
              ["bangTheoDoi", "chiSo", "cot" + (index + 1)].join(".")
            )
          )
            return;

          [
            "altm",
            "kieuHoHap",
            "vt",
            "petCo2",
            "aldt",
            "duongMauMaoMach",
            "khac",
          ].forEach((hoHap) => {
            fieldName = [
              "bangTheoDoi",
              "chiSo",
              "cot" + (index + 1),
              "hoHap",
              hoHap,
            ];
            obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          });

          [
            "id",
            "maHoSo",
            "nhietDo",
            "mach",
            "huyetApTamThu",
            "huyetApTamTruong",
            "nhipTho",
            "bopBong",
            "fio2",
            "spo2",
            "thoiGian",
          ].forEach((css) => {
            fieldName = [
              "bangTheoDoi",
              "chiSo",
              "cot" + (index + 1),
              "chiSoSong",
              css,
            ];
            obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          });
        });

      [
        "nhanXet",
        "tongDichRa",
        "tongDichVao",
        "biLan",
        "tongDichVaoCu",
        "tongDichRaCu",
      ].map((dich) => {
        fieldName = ["bangTheoDoi", "dich", dich];
        obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
      });
      fieldName = ["bangTheoDoi", "tieuChuan", "thoiGianTheoDoi"];
      obj[fieldName.join("_")] = getValue(form, fieldName.join("."));

      Array(5)
        .fill({})
        .forEach((item, index) => {
          if (
            !getValue(
              form,
              [
                "bangTheoDoi",
                "dich",
                "hang" + (index < 4 ? index + 1 : "Tong"),
              ].join(".")
            )
          )
            return;
          fieldName = [
            "bangTheoDoi",
            "dich",
            "hang" + (index < 4 ? index + 1 : "Tong"),
            "thoiGian",
          ];
          obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          ["dich", "keo", "mau", "khac"].forEach((dich) => {
            fieldName = [
              "bangTheoDoi",
              "dich",
              "hang" + (index < 4 ? index + 1 : "Tong"),
              "dichVao",
              dich,
            ];
            obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          });
          ["nuocTieu", "danLuu", "khac"].forEach((dich) => {
            fieldName = [
              "bangTheoDoi",
              "dich",
              "hang" + (index < 4 ? index + 1 : "Tong"),
              "dichRa",
              dich,
            ];
            obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          });
        });

      Array(7)
        .fill({})
        .forEach((item, index) => {
          if (
            !getValue(
              form,
              ["bangTheoDoi", "tieuChuan", "cot" + (index + 1)].join(".")
            )
          )
            return;
          [
            "spo2",
            "tho",
            "tinh",
            "cua2Chan",
            "ha",
            "nhipTim",
            "nhietDo",
            "khongTimTai",
            "khongChayMau",
            "khongRetRun",
            "khongKichDong",
            "khongDau",
            "khongNon",
            "khongCauBangQuang",
            "tongDiem",
          ].map((tieuChuan) => {
            fieldName = [
              "bangTheoDoi",
              "tieuChuan",
              "cot" + (index + 1),
              tieuChuan,
            ];
            obj[fieldName.join("_")] = getValue(form, fieldName.join("."));
          });
        });
      setState({ khung: obj });
    }
  }, [form]);

  const getValue = (khung = {}, fieldName, options = { exact: true }) => {
    if (options.exact == true) {
      return get(khung, fieldName);
    }
    return khung[itemProps.fieldName + "_" + fieldName];
  };

  const setData = (data) => {
    const newData = data.map((item) => {
      return convert(item)["khung2"] || {};
    });
    formChange["khung2"] && formChange["khung2"](newData);
  };

  const getFormChange = useMemo(() => {
    const obj = {};
    obj.onChange = (key, value) => {
      if (!formChange) return;
      formChange[key] && formChange[key](value);
    };

    obj.getAllData = () => {
      if (!formChange) return {};
      return formChange.getAllData();
    };
    obj.setMultiData = (data = {}) => {
      if (!formChange) return;
      formChange.setMultiData(data);
      return;
    };
    return obj;
  }, [formChange]);

  return (
    <Main
      columnWidth={columnWidth}
      ref={refMain}
      data-type="theo-doi-hoi-tinh-component"
    >
      <Khung
        itemProps={itemProps}
        khung={state.khung}
        refModalBloodPressure={refModalBloodPressure}
        refModalInputRespiratory={refModalInputRespiratory}
        refModalSelectCSS={refModalSelectCSS}
        block={block}
        canvasWidth={canvasWidth}
        formChange={getFormChange}
        canvasHeight={canvasHeight}
        columnWidth={columnWidth}
        disabled={disabled}
        mode={mode}
      />

      <ModalBloodPressure ref={refModalBloodPressure} />
      <ModalInputRespiratory ref={refModalInputRespiratory} />
      <ModalSelectCSS ref={refModalSelectCSS} />
    </Main>
  );
};

export default GMHS;
