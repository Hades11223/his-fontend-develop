import React, { useEffect, useMemo, useRef } from "react";
import { SIZE, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import { cloneDeep, isEmpty } from "lodash";
import {
  drawLine,
  drawDate,
  handleBloodPressure,
  drawValueFooter,
  drawValueBody,
  drawBodyBloodPressure,
  drawLeftColumnFooter,
  drawLeftColumnBloodPressure,
  drawLeftColumnBackground,
} from "utils/vital-signs/canvas-utils";
import { Main } from "./styled";

export default function Page({
  moreValueIds = [],
  values = [],
  vitalSignsCategories,
  data = {},
  tieuDeTrai1,
  tieuDeTrai2,
}) {
  const { leftColumnWidth, columnWidth, headerHeight, rowHeight } = SIZE;
  const refCanvas = useRef(null);
  const showSurgery = process.env.REACT_APP_SHOW_SURGERY === "true";
  const bottomHeight =
    SIZE.bottomHeight +
    (moreValueIds.length > 2 ? moreValueIds.length - 1 : moreValueIds.length) *
      50;
  const canvasHeight = rowHeight * 75 + headerHeight + bottomHeight;
  let canvasWidth = Math.max(
    leftColumnWidth + values.length * columnWidth,
    850
  );
  const sizeLeftItem = leftColumnWidth / 3;

  let rangeBloodPressure = [];
  if (!isEmpty(values)) {
    const cloneValues = cloneDeep(values);
    const indexOfLastItemHasValue =
      cloneValues.length -
      1 -
      cloneValues
        .reverse()
        .findIndex((item) => !!item.huyetap && item.huyetap.length > 1);

    const newValue = handleBloodPressure(
      values[indexOfLastItemHasValue] && values[indexOfLastItemHasValue].huyetap
    );
    rangeBloodPressure =
      BLOOD_PRESSURE.find(
        (item) =>
          item.min <= newValue.huyetApTamTruong &&
          newValue.huyetApTamTruong <= item.max
      ) &&
      BLOOD_PRESSURE.find(
        (item) =>
          item.min <= newValue.huyetApTamTruong &&
          newValue.huyetApTamTruong <= item.max
      ).listShow;
  }
  if (!showSurgery) {
    values.map((item) => (item.ptTtId = null));
  }

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = canvasWidth;
      refCanvas.current.height = canvasHeight;
      draw();
    }
  }, [refCanvas.current]);

  const drawLineRow = (ctx) => {
    for (
      let i = 0;
      i < canvasHeight - bottomHeight - headerHeight;
      i = i + rowHeight
    ) {
      if (i % (rowHeight * 10) === 0) {
        drawLine(
          ctx,
          { x: leftColumnWidth, y: i + headerHeight },
          { x: canvasWidth, y: i + headerHeight },
          1.5
        );
      } else {
        drawLine(
          ctx,
          { x: leftColumnWidth, y: i + headerHeight },
          { x: canvasWidth, y: i + headerHeight },
          0.5,
          [10, 2]
        );
      }
    }
  };
  const drawLineColumn = (ctx) => {
    for (let i = 0; i < values.length + 1; i++) {
      drawLine(
        ctx,
        { x: i * columnWidth + leftColumnWidth, y: 0 },
        {
          x: i * columnWidth + leftColumnWidth,
          y: canvasHeight,
        },
        0.5
      );
    }
  };
  const drawText = (ctx, text, from) => {
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText(text, from.x, from.y);
  };

  const drawHeader = (ctx) => {
    drawText(ctx, "Ngày/tháng", { x: 40, y: 20 });
    drawText(ctx, "Huyết", { x: 10, y: 50 });
    drawText(ctx, "áp", { x: 10, y: 70 });
    drawText(ctx, "Mạch", { x: sizeLeftItem + 5, y: 50 });
    drawText(ctx, "L/ph", { x: sizeLeftItem + 5, y: 70 });
    drawText(ctx, "Nhiệt", { x: sizeLeftItem * 2 + 5, y: 50 });
    drawText(ctx, "độ C", { x: sizeLeftItem * 2 + 5, y: 70 });
    drawDate(ctx, values);
  };

  const drawValues = (ctx, values) => {
    if (isEmpty(values)) return;
    values.forEach((item, index) => {
      try {
        drawBodyBloodPressure({
          ctx,
          item,
          huyetAp: item.huyetap,
          index,
          canvasHeight,
          bottomHeight,
          headerHeight,
          rangeBloodPressure,
          columnWidth: SIZE.columnWidth,
          bloodPressureHeight: 150,
          bottomRangeBloodPressure: 10,
          rowHeight: SIZE.rowHeight,
          totalRow: 75,
          leftColumnWidth: SIZE.leftColumnWidth,
        });
        drawValueBody({
          ctx,
          item,
          values,
          index,
          columnWidth: SIZE.columnWidth,
          leftColumnWidth: SIZE.leftColumnWidth,
          headerHeight: SIZE.headerHeight,
          bottomHeight: SIZE.bottomHeight,
          totalRow: 75,
          rowHeight: SIZE.rowHeight,
          startValueMach: 30,
          startValueNhiet: 34.5,
        });
        debugger;
        drawValueFooter(
          canvasHeight - bottomHeight,
          ctx,
          index,
          item,
          values,
          moreValueIds,
          true
        );
      } catch (error) {
        console.log("lỗi mẹ rồi");
      }
    });
  };
  const drawBackground = (ctx) => {
    if (!ctx) {
      return;
    }
    drawLineRow(ctx);
    drawLineColumn(ctx);
    drawLeftColumnBackground(
      ctx,
      canvasWidth,
      canvasHeight,
      sizeLeftItem,
      bottomHeight
    );
    drawHeader(ctx);
    drawLeftColumnFooter({
      ctx,
      moreValueIds: moreValueIds,
      vitalSignsCategories: vitalSignsCategories,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
      bottomHeight: bottomHeight,
      isPrintMode: true,
    });
    drawLeftColumnBloodPressure(ctx, rangeBloodPressure);
  };
  const draw = () => {
    if (refCanvas.current) {
      const ctx = refCanvas.current.getContext("2d");
      drawBackground(ctx);
      drawValues(ctx, values);
    }
  };
  const renderChanDoan = useMemo(() => {
    const chiDinhChinh = (data.dsCdChinh || []).map((item) => item.ten).join();
    const chiDinhKemTheo = (data.dsCdKemTheo || [])
      .map((item) => item.ten)
      .join();
    return `${chiDinhChinh}  ${chiDinhKemTheo ? `, ${chiDinhKemTheo}` : ""}`;
  }, [data]);
  if (!data) return null;
  return (
    <Main>
      <table style={{ marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              <div>{(tieuDeTrai1 || "").toUpperCase()}</div>
              <div style={{ fontWeight: "bold", marginTop: 5 }}>
                {(tieuDeTrai2 || "").toUpperCase()}
              </div>
            </td>
            <td>
              <div className="text-header">
                {"PHIẾU THEO DÕI CHỨC NĂNG SỐNG"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ width: 240 }}>
              <span>{data.tenKhoaNb}</span>
            </td>
            <td>
              Họ tên bệnh nhân:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: 200,
                  display: "inline-block",
                  marginRight: 50,
                }}
              >
                {data.tenNb}
              </span>
              Tuổi:{" "}
              <span style={{ fontWeight: "bold", marginRight: 50 }}>
                {data.tuoi}
              </span>{" "}
              Giới tính:{" "}
              <span style={{ fontWeight: "bold", marginRight: 50 }}>
                {data.gioiTinh === 1 ? "Nam" : "Nữ"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: 3 }}>
              {data.tenPhong && (
                <div>
                  <span>{data.tenPhong}</span>
                </div>
              )}
              <div>
                Giường:
                <span> {data.tenDvGiuong}</span>
              </div>
              {data.maHoSo ? (
                <div style={{ marginTop: 5 }}>
                  Mã hồ sơ:
                  <span> {data.maHoSo}</span>
                </div>
              ) : null}
            </td>
            <td style={{ verticalAlign: "top" }}>
              {data.dsCdChinh?.length || data.dsCdKemTheo?.length ? (
                <div style={{ marginTop: 3 }}>Chẩn đoán: {renderChanDoan}</div>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ flexDirection: "row", marginTop: 10, paddingBottom: 5 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              color: "#E74C3C",
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            x
          </div>
          <span style={{ marginLeft: 5, float: "left" }}>Nhịp mạch</span>

          <img
            src={require("../images/bg_blue.png")}
            style={{
              width: 10,
              height: 10,
              background: "#5498DB",
              float: "left",
              marginTop: 5,
              marginLeft: 30,
            }}
            alt=""
          />
          <span style={{ marginLeft: 5, float: "left" }}>Nhiệt độ</span>
          <img
            src={require("../images/huyet_ap.png")}
            style={{
              width: 10,
              height: 10,
              float: "left",
              marginTop: 5,
              marginLeft: 30,
            }}
            alt=""
          />
          <span style={{ marginLeft: 5, float: "left" }}>Huyết áp</span>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <canvas
          ref={refCanvas}
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      <ul className="list-surgery">
        {values.map((item, index) => {
          if (item.ptTtId) {
            return (
              <li key={index}>
                {item.thoiGianThucHien.format("dd/MM/yyyy HH:mm")} - Bác sĩ:{" "}
                {item.tenBacSiPtTt} - {item.phuongPhapPtTt}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </Main>
  );
}
