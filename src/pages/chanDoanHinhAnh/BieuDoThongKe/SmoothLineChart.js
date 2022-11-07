import {  Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const SmoothLineChart = ({ setStateParent, stateParent }) => {
  const { t } = useTranslation();
  const [listNhomThoiGianDashboard] = useEnum(ENUM.NHOM_THOI_GIAN_DASHBOARD);
  const {
    dashboardCDHA: { listTheoThoiGian },
  } = useSelector((state) => state) || {};
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv-right");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    let typeRender = {
      10: "day",
      20: "month",
      30: "year",
    };
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: typeRender[stateParent?.nhomThoiGian],
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 70,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        // curveFactory: d3.curveBasis
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 4,
          stroke: root.interfaceColors.get("background"),
          strokeWidth: 2,
          fill: series.get("fill"),
        }),
      });
    });
    series.set("fill", am5.color("#6DD7ED")); // set color
    series.set("stroke", am5.color("#6DD7ED")); // set color
    let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
    tooltip.label.set("text", "{valueY}");

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));
    let dataRender = (listTheoThoiGian || []).map((item) => {
      return {
        date: new Date(item?.thoiGian).getTime(),
        value: item?.soLuong,
      };
    });
    series.data.setAll(dataRender);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [listTheoThoiGian, stateParent?.nhomThoiGian]);
  return (
    <div className="chart">
      <Row
        justify="space-between"
        align="middle"
        style={{ height: 50, padding: 10 }}
      >
        <div className="chart_title">{t("cdha.tongHopDichVu")}</div>
        <Select
          style={{ width: 300, border: "1px solid grey" }}
          // placeholder={t("cdha.chonPhongThucHien")}
          value={stateParent?.nhomThoiGian}
          onChange={(e) => {
            setStateParent({ nhomThoiGian: e });
          }}
        >
          {(listNhomThoiGianDashboard).map((item, index) => (
            <Select.Option key={index} value={item.id}>
              {item.ten}
            </Select.Option>
          ))}
        </Select>
        <div className="chart_title_right">
          <div>
            {(listTheoThoiGian || []).reduce((init, item) => {
              let soLuong = item?.soLuong || 0;
              return (init += soLuong);
            }, 0)}
          </div>
          <div>{t("cdha.dichVu")}</div>
        </div>
      </Row>
      <hr />
      <div id="chartdiv-right" className="chart-wrapper"></div>
    </div>
  );
};

export default SmoothLineChart;
