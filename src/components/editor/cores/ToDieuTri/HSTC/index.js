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
// import ModalBloodPressure from "pages/vital-signs/components/ModalBloodPressure";
// import ModalInputRespiratory from "pages/vital-signs/components/ModalInputRespiratory";
import ElectronicSignature from "../../ElectronicSignature";
// import SelectNurse from "../SelectNurse";
// import ModalChangeDate from "pages/vital-signs/components/ModalChangeDate";
import DropDownList from "../DropDownList";
import stringUtils from "mainam-react-native-string-utils";
import ToggleValue from "../ToggleValue";
import DeboundInput from "components/editor/config/DeboundInput";
import { useTranslation } from "react-i18next";

const HSTC = ({ itemProps, form, formChange, block, ...props }, refs) => {
  const { t } = useTranslation();
  const LEFT_VITAL_SIGNS = 220;
  const TOTAL_COL = 12;
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
    if (form) {
    }
    if (itemProps.fieldName && form) {
      // let values = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      // let hasValueMachNhiet = false;
      // values.forEach((item, index) => {
      //   const cot = getValue("cot_cot" + (index + 1));
      //   if (cot) item.date = cot.toDateObject();
      //   item.nhietDo = getValue("nhietDo_cot" + (index + 1)) || "";
      //   item.mach = getValue("mach_cot" + (index + 1)) || "";
      //   if (item.mach || item.nhietDo) hasValueMachNhiet = true;
      //   item.huyetAp = getValue("huyetAp_cot" + (index + 1)) || "";
      //   item.ghiChu = getValue("ghiChu_cot" + (index + 1)) || "";
      //   item.dom_mauDom = getValue("dom_mauDom_cot" + (index + 1)) || [];
      //   item.dom_soLuongDom =
      //     getValue("dom_soLuongDom_cot" + (index + 1)) || [];
      //   item.phan_soLan = getValue("phan_soLan_cot" + (index + 1)) || "";
      //   item.phan_mauPhan = getValue("phan_mauPhan_cot" + (index + 1)) || [];
      //   item.phan_tinhChat = getValue("phan_tinhChat_cot" + (index + 1)) || [];
      //   item.spo2 = getValue("spo2_cot" + (index + 1)) || "";
      //   item.nhipTho = getValue("nhipTho_cot" + (index + 1)) || "";
      //   item.glassgow = getValue("glassgow_cot" + (index + 1)) || "";
      //   item.thoMay_mode = getValue("thoMay_mode_cot" + (index + 1)) || "";
      //   item.thoMay_tv = getValue("thoMay_tv_cot" + (index + 1)) || "";
      //   item.thoMay_tanSo = getValue("thoMay_tanSo_cot" + (index + 1)) || "";
      //   item.thoMay_peakLow =
      //     getValue("thoMay_peakLow_cot" + (index + 1)) || "";
      //   item.thoMay_fio2 = getValue("thoMay_fio2_cot" + (index + 1)) || "";
      //   item.thoMay_peepCpapEpap =
      //     getValue("thoMay_peepCpapEpap_cot" + (index + 1)) || "";
      //   item.thoMay_psIpap = getValue("thoMay_psIpap_cot" + (index + 1)) || "";
      //   item.thoOxy_gongKinh =
      //     getValue("thoOxy_gongKinh_cot" + (index + 1)) || "";
      //   item.thoOxy_mask = getValue("thoOxy_mask_cot" + (index + 1)) || "";
      //   item.thoOxy_maskTui =
      //     getValue("thoOxy_maskTui_cot" + (index + 1)) || "";
      //   item.dich_dichVao_dichThuoc =
      //     getValue("dich_dichVao_dichThuoc_cot" + (index + 1)) || "";
      //   item.dich_dichVao_an =
      //     getValue("dich_dichVao_an_cot" + (index + 1)) || "";
      //   item.dich_dichVao_khac =
      //     getValue("dich_dichVao_khac_cot" + (index + 1)) || "";
      //   if (
      //     item.dich_dichVao_dichThuoc ||
      //     item.dich_dichVao_an ||
      //     item.dich_dichVao_khac
      //   ) {
      //     item.dich_dichVao_dichVaoTong_tong =
      //       getValue("dich_dichVao_dichVaoTong_tong" + (index + 1)) || "";
      //   }
      //   item.dich_dichRa_dichTieu =
      //     getValue("dich_dichRa_dichTieu_cot" + (index + 1)) || "";
      //   item.dich_dichRa_dichRaKhac =
      //     getValue("dich_dichRa_dichRaKhac_cot" + (index + 1)) || "";
      //   item.dich_dichRa_ghiChu =
      //     getValue("dich_dichRa_ghiChu_cot" + (index + 1)) || "";
      //   if (item.dich_dichRa_dichTieu || item.dich_dichRa_dichRaKhac) {
      //     item.dich_dichRa_dichRaTong_tong =
      //       getValue("dich_dichRa_dichRaTong_tong" + (index + 1)) || "";
      //   }
      //   if (
      //     item.dich_dichRa_dichRaTong_tong ||
      //     item.dich_dichVao_dichVaoTong_tong
      //   )
      //     item.dich_dichTong_tong =
      //       getValue("dich_dichTong_tong" + (index + 1)) || "";
      //   item.chamSocDieuDuong_dichTonDaDay =
      //     getValue("chamSocDieuDuong_dichTonDaDay_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_duongMauMaoMach =
      //     getValue("chamSocDieuDuong_duongMauMaoMach_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_hutDom =
      //     getValue("chamSocDieuDuong_hutDom_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_tuThe =
      //     getValue("chamSocDieuDuong_tuThe_cot" + (index + 1)) || [];
      //   item.chamSocDieuDuong_tamGoi =
      //     getValue("chamSocDieuDuong_tamGoi_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_goiDau =
      //     getValue("chamSocDieuDuong_goiDau_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_thayBang =
      //     getValue("chamSocDieuDuong_thayBang_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_veSinh =
      //     getValue("chamSocDieuDuong_veSinh_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_viTriNKQ =
      //     getValue("chamSocDieuDuong_viTriNKQ_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_soNgayDatNKQ =
      //     getValue("chamSocDieuDuong_soNgayDatNKQ_cot" + (index + 1)) || "";
      //   item.chamSocDieuDuong_apLuc =
      //     getValue("chamSocDieuDuong_apLuc_cot" + (index + 1)) || "";
      //   item.chanKy = getValue("chanKy_cot" + (index + 1));
      // });
      // setState({
      //   hasValueMachNhiet,
      //   values,
      //   rangeBloodPressure: getRangeBloodPressure(values),
      //   dich_dichVao_dichVaoTong_tongCu: getValue(
      //     "dich_dichVao_dichVaoTong_tongCu"
      //   ),
      //   dich_dichRa_dichRaTong_tongCu: getValue(
      //     "dich_dichRa_dichRaTong_tongCu"
      //   ),
      // });
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
    return null;
    // return (
    //   <div className={"flex acenter"}>
    //     {label}
    //     <SelectNurse
    //       value={
    //         form
    //           ? form[
    //               itemProps.fieldName + "_dieuDuongTheoDoi_dieuDuongCa" + index
    //             ]
    //           : ""
    //       }
    //       onChange={onChangeDieuDuong("dieuDuongTheoDoi_dieuDuongCa" + index)}
    //     />
    //   </div>
    // );
  };
  const renderThuocs = (item, isSub) => {
    const buoiDung = [];
    if (item.slSang)
      buoiDung.push({ ten: t("editor.sang"), soLuong: item.slSang });
    if (item.slChieu)
      buoiDung.push({ ten: t("editor.chieu"), soLuong: item.slChieu });
    if (item.slToi)
      buoiDung.push({ ten: t("editor.toi"), soLuong: item.slToi });
    if (item.slDem)
      buoiDung.push({ ten: t("editor.dem"), soLuong: item.slDem });
    const textBuoiDung = buoiDung
      .map((buoi, index) => {
        return `${item.tenDuongDung || ""} ${buoi.ten} ${buoi.soLuong} ${
          item.tenDonViTinh
        }`;
      })
      .join(", ");
    return (
      <>
        <div key={item.id} className="mb10 ml5">
          <div className={`${!isSub ? "b" : ""}`}>
            {isSub ? "-" : ""} {item.tenDichVu} {item.soLuong} (
            {item.tenDonViTinh}) {!isSub ? "(Thuốc chính)" : "(Thuốc dùng kèm)"}
          </div>
          {!isSub && (
            <div className="i mt5">
              {textBuoiDung} {item.thoiDiem}{" "}
              {!!item.ghiChu && `Ghi chú: ${item.ghiChu}`}
            </div>
          )}
        </div>
        {item?.childs?.length ? (
          <>
            <>{item.childs.map((e) => renderThuocs(e, true))}</>
          </>
        ) : null}
      </>
    );
  };
  const yLenh = useMemo(() => {
    if (form) {
      const thuocs = form.dsThuoc || [];
      for (let index = 0; index < thuocs.length; index++) {
        const item = thuocs[index];
        const listParent = thuocs.filter((item1) => {
          return item1.id == item.dungKemId;
        });
        if (listParent.length) {
          listParent.forEach((item2) => {
            if (!item2.childs) item2.childs = [];
            item2.childs.push(item);
          });
          thuocs.splice(index, 1);
          index--;
        }
      }
      if (thuocs?.length) {
        return thuocs.map((item, index) => {
          return renderThuocs(item);
        });
      }
    }
  }, [form]);

  const renderDichVu = (data) => {
    return (data || []).map((item, index) => {
      return (
        <div key={index}>
          - {item?.tenDichVu} {item.soLuong != 1 ? `(${item.soLuong} lần)` : ""}{" "}
          {item?.ghiChu ? `(${item.ghiChu})` : ""}
        </div>
      );
    });
  };
  const dienBienBenh = useMemo(() => {
    let dienBien = form.dienBienBenh?.replaceAll("\n", "<br>");
    let dienbienReplace = dienBien?.replaceAll("null", "");
    if (form) {
      return (
        <div className="ml5">
          {form.dienBienBenh && (
            <div className="dien-bien ">
              <div>Diễn biến bệnh:</div>
              <div dangerouslySetInnerHTML={{ __html: dienbienReplace }}></div>
            </div>
          )}
          {form?.dsXetNghiem?.length ? (
            <div className="ds-xet-nghiem">
              <span>Xét nghiệm:</span>
              {renderDichVu(form?.dsXetNghiem)}
            </div>
          ) : (
            <></>
          )}
          {form?.dsCdhaTdcn?.length ? (
            <div className="ds-cdha">
              <span>Dịch vụ CĐHA - TDCN:</span>
              {renderDichVu(form?.dsCdhaTdcn)}
            </div>
          ) : (
            <></>
          )}
          {form?.dsPtTt?.length ? (
            <div className="ds-cdha">
              <span>Phẫu thuật:</span>
              {renderDichVu(form?.dsPtTt)}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }, [form]);
  const hoiChan = useMemo(() => {
    return <div></div>;
  }, [form]);

  return (
    <Main ref={refMain}>
      <table>
        <tbody>
          <tr>
            <td className="text-center">NGÀY</td>
            <td className="text-center">DIỄN BIẾN BỆNH</td>
            <td className="text-center">Y LỆNH</td>
            {!itemProps.hideHLDD && (
              <td className="text-center">CHẾ ĐỘ HL,DD</td>
            )}
            {/* <td>HỘI CHẨN</td> */}
          </tr>
          {form ? (
            <tr>
              <td className="text-center" style={{ width: "50px" }}>
                <div>
                  <div>{form.thoiGianYLenh?.toDateObject().format("thu")}</div>
                  <div>
                    {form.thoiGianYLenh?.toDateObject().format("dd/MM")}
                  </div>
                  <div>
                    {form.thoiGianYLenh?.toDateObject().format("HH:mm")}
                  </div>
                </div>
              </td>
              <td style={{ width: itemProps.hideHLDD ? "300px" : "250px" }}>
                {dienBienBenh}
              </td>
              <td style={{ width: itemProps.hideHLDD ? "unset" : "250px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{yLenh}</span>
                  <span style={{ alignSelf: "center" }}>
                    {`${form?.vietTatHhhvBsDieuTri || ""} ${
                      form?.tenBacSiDieuTri || ""
                    }`}
                  </span>
                </div>
              </td>
              {!itemProps.hideHLDD && (
                <td>
                  <span className="ml5"> {form?.ghiChu}</span>
                </td>
              )}
            </tr>
          ) : null}
        </tbody>
      </table>
    </Main>
  );
};

export default HSTC;
