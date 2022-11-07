import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { GlobalStyle, Main } from "./styled";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { MODE } from "utils/editor-utils";
import { SettingOutlined } from "@ant-design/icons";
import InputGroup from "../InputGroup";
import { defaultData } from "./defaultData";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";
const BangKeChiPhiTongHop = forwardRef((props, ref) => {
  const { component, mode, form, template } = props;
  const itemProps = component.props || {};
  const init = useDispatch().component.init;
  const listTable = useMemo(() => {
    if (
      mode === "config" ||
      (itemProps && form && form[itemProps?.fieldName]?.length)
    ) {
      const values =
        mode === "config" ? defaultData : form[itemProps?.fieldName];
      const rows = values.map((e) => {
        const temp = [];
        e.k.forEach((item) => {
          temp.push({
            col1: item.tenKhoaChiDinh,
            colMerge: 14,
            isBold: true,
          });
          item.n.forEach((nhomDichVuC1) => {
            temp.push({
              col1: nhomDichVuC1.tenNhomDichVuCap1,
              col2: Math.ceil(nhomDichVuC1.tongTien)?.formatPrice(),
              col3: "",
              col4: Math.ceil(nhomDichVuC1.tongTienBh)?.formatPrice(),
              col5: Math.ceil(nhomDichVuC1.tienBhThanhToan)?.formatPrice(),
              col6: Math.ceil(nhomDichVuC1.tienNbCungChiTra)?.formatPrice(),
              col7: "",
              col7: Math.ceil(nhomDichVuC1.tienNguonKhac)?.formatPrice(),
              col8: Math.ceil(nhomDichVuC1.tienNbTuTra)?.formatPrice(),
              isBold: true,
              colMerge: 6,
            });
            if (!nhomDichVuC1.tenNhomDichVuCap1.includes("Gói vật tư y tế")) {
              nhomDichVuC1.ktc[0].s[0].dv.forEach((dv) => {
                temp.push({
                  col1: dv.tenDichVu,
                  col2: dv.tenDonViTinh,
                  col3: dv.soLuong,
                  col4: Math.ceil(dv.donGia)?.formatPrice(),
                  col5: Math.ceil(dv.giaBaoHiem)?.formatPrice(),
                  col6: dv.tyLeTtDv,
                  col7: dv.tongTien,
                  col8: dv.tyLeBhTt,
                  col9: Math.ceil(dv.tongTien)?.formatPrice(),
                  col10: Math.ceil(dv.tienBhThanhToan)?.formatPrice(),
                  col11: Math.ceil(dv.tienNbCungChiTra)?.formatPrice(),
                  col12: Math.ceil(dv.tienNguonKhac)?.formatPrice(),
                  col13: Math.ceil(dv.tienNbTuTra)?.formatPrice(),
                  col14: dv.thanhToan ? "X" : "",
                });
              });
            } else {
              nhomDichVuC1.ktc.forEach((ktc) => {
                temp.push({
                  col1: `${ktc.tenGoiVatTuKtc} (${ktc.tenPtTt})`,
                  col2: Math.ceil(ktc.tongTien)?.formatPrice(),
                  col3: "",
                  col4: Math.ceil(ktc.tongTienBh)?.formatPrice(),
                  col5: Math.ceil(ktc.tienBhThanhToan)?.formatPrice(),
                  col6: Math.ceil(ktc.tienNbCungChiTra)?.formatPrice(),
                  col7: "",
                  col8: Math.ceil(ktc.tienNbTuTra)?.formatPrice(),
                  isBold: true,
                  colMerge: 6,
                });
                ktc.s.forEach((stent) => {
                  temp.push({
                    col1: stent.tenNhomVatTuKtc,
                    col2: Math.ceil(stent.tongTien)?.formatPrice(),
                    col3: "",
                    col4: Math.ceil(stent.tongTienBh)?.formatPrice(),
                    col5: Math.ceil(stent.tienBhThanhToan)?.formatPrice(),
                    col6: Math.ceil(stent.tienNbCungChiTra)?.formatPrice(),
                    col7: "",
                    col8: Math.ceil(stent.tienNbTuTra)?.formatPrice(),
                    colMerge: 6,
                    isBold: true,
                  });
                  stent.dv.forEach((dv) => {
                    temp.push({
                      col1: dv.tenDichVu,
                      col2: dv.tenDonViTinh,
                      col3: dv.soLuong,
                      col4: Math.ceil(dv.donGia)?.formatPrice(),
                      col5: Math.ceil(dv.giaBaoHiem)?.formatPrice(),
                      col6: dv.tyLeTtDv,
                      col7: dv.tongTien,
                      col8: dv.tyLeBhTt,
                      col9: Math.ceil(dv.tongTien)?.formatPrice(),
                      col10: Math.ceil(dv.tienBhThanhToan)?.formatPrice(),
                      col11: Math.ceil(dv.tienNbCungChiTra)?.formatPrice(),
                      col12: Math.ceil(dv.tienNguonKhac)?.formatPrice(),
                      col13: Math.ceil(dv.tienNbTuTra)?.formatPrice(),
                      col14: dv.thanhToan ? "X" : "",
                    });
                  });
                });
              });
            }
          });
          temp.push({
            col1: `Cộng ${item.tenKhoaChiDinh}`,
            col2: Math.ceil(item.tongTien)?.formatPrice(),
            col3: "",
            col4: Math.ceil(item.tongTienBh)?.formatPrice(),
            col5: Math.ceil(item.tienBhThanhToan)?.formatPrice(),
            col6: Math.ceil(item.tienNbCungChiTra)?.formatPrice(),
            col7: "",
            col8: Math.ceil(item.tienNbTuTra)?.formatPrice(),
            colMerge: 6,
            isBold: true,
          });
        });
        const tongCong = {
          col1: `Tổng cộng`,
          col2: Math.ceil(e.tongTien)?.formatPrice(),
          col3: "",
          col4: Math.ceil(e.tongTienBh)?.formatPrice(),
          col5: Math.ceil(e.tienBhThanhToan)?.formatPrice(),
          col6: Math.ceil(e.tienNbCungChiTra)?.formatPrice(),
          col7: "",
          col8: Math.ceil(e.tienNbTuTra)?.formatPrice(),
          colMerge: 6,
          isBold: true,
        };
        return [...temp, tongCong];
      });
      return { rows, values };
    }
  }, [form, itemProps, defaultData]);
  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data) => {
    return {
      ...state,
      ...data,
    };
  };
  const number = () => {
    const elements = [];
    for (let i = 1; i < 15; i++) {
      elements.push(
        <td key={i} className="center bold">
          ({i})
        </td>
      );
    }
    return elements.map((item) => item);
  };
  const colgroup = () => {
    const arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push(<td key={i}>{i}</td>);
    }
    const WIDTH = [150, 40, 40, 40, 40, 40, 40, 40, 40, 250, 50];
    return arr.map((item, index) => (
      <col
        style={{ textAlign: "center", color: "red" }}
        width={WIDTH[index]}
      ></col>
    ));
  };

  const renderBody = (data) => {
    return (data || []).map((row) => {
      return (
        <tr>
          {new Array(row.colMerge ? 15 - row.colMerge : 14)
            .fill(1)
            .map((item, index) => {
              const data = row[`col${index + 1}`] ? row[`col${index + 1}`] : "";
              return (
                <td
                  colSpan={row.colMerge && index == 0 ? row.colMerge : 0}
                  className={`col-${index + 1} ${row.isBold ? "bold" : ""}`}
                  style={{
                    textAlign: row.colMerge && index === 1 ? "right" : "",
                  }}
                >
                  {data}
                </td>
              );
            })}
        </tr>
      );
    });
  };
  return (
    <Main
      className="bang-ke-chi-phi"
      mode={mode}
      itemProps={itemProps}
      data-type="bang-ke-chi-phi"
    >
      <GlobalStyle></GlobalStyle>
      {mode === MODE.config && (
        <>
          <div className="table-config">
            <Button
              icon={<SettingOutlined />}
              onClick={handleFocus}
              size={"small"}
            />
          </div>
        </>
      )}
      {(listTable?.rows || []).map((item, index) => {
        return (
          <>
            <div
              className="info"
              data-type="block"
              data-level="3"
              id-info={stringUtils.guid()}
            >
              <div
                className="flex jSpaceBetween"
                data-type="line"
                data-level="4"
              >
                <span className="ma-the flex ml5">
                  <span>Mã thẻ BHYT</span>
                  <div className="ml5">
                    <InputGroup
                      component={{
                        props: {
                          width: 20,
                          height: 20,
                          disabled: true,
                          rule: "xx_x_xx_xxxxxxxxxx",
                          fieldName: "maTheBhyt",
                        },
                      }}
                      disabled={true}
                      form={form}
                      mode={mode}
                    ></InputGroup>
                  </div>
                </span>
                <span className="ma-the">
                  Giá trị từ {listTable?.values[index]?.tuNgayTheBhyt} đến{" "}
                  {listTable?.values[index]?.tuNgayTheBhyt}
                </span>
                <span className="muc-huong">
                  <span> Mức hưởng</span>
                  <span className="box">
                    {listTable?.values[index]?.mucHuongBhyt}
                  </span>
                </span>
              </div>
              <div data-type="line" data-level="4">
                <span>
                  (Chi phí KBCB tính từ ngày{" "}
                  {form?.thoiGianVaoVien
                    ? moment(form?.thoiGianVaoVien).format("DD/MM/YYYY")
                    : ""}
                  ) đến ngày{" "}
                  {form?.thoiGianRaVien
                    ? moment(form?.thoiGianRaVien).format("DD/MM/YYYY")
                    : ""}
                  )
                </span>
              </div>
            </div>
            <table
              key={index}
              className="table"
              data-type={`table`}
              id-table={stringUtils.guid()}
            >
              <colgroup>{colgroup()}</colgroup>
              <thead className="table-head">
                <tr>
                  <td rowSpan={2} className="center td">
                    {t("editor.bangKeChiPhi.noiDung")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.donViTinhLan")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.soLuong")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.donGiaBV(dong)")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.donGiaBH(dong)")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.tiLeThanhToanTheoDichVu(%)")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.thanhTienBV(dong)")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.tiLeThanhToanBHYT(%)")}
                  </td>
                  <td rowSpan={2} className="center">
                    {t("editor.bangKeChiPhi.thanhTienBH(dong)")}
                  </td>
                  <td colSpan={4} className="center">
                    {t("editor.bangKeChiPhi.nguonThanhToan(dong)")}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="center">{t("editor.bangKeChiPhi.quyBHYT")}</td>
                  <td className="center">
                    {t("editor.bangKeChiPhi.nguoiBenhCungChiTra")}
                  </td>
                  <td className="center">{t("editor.bangKeChiPhi.khac")}</td>
                  <td className="center">
                    {t("editor.bangKeChiPhi.nguoiBenhTuTra")}
                  </td>
                  <td className="center">{t("editor.bangKeChiPhi.daTT")}</td>
                </tr>

                <tr>{number()}</tr>
              </thead>
              <tbody className="table-tbody">{renderBody(item)}</tbody>
            </table>
          </>
        );
      })}
    </Main>
  );
});

export default BangKeChiPhiTongHop;
