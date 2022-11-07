import { Col, Row, Select } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { Main, SearchDate } from "./styled";
import { DatePicker, Space, Menu, Dropdown, message, Popover } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import DateDropdown from "../../khamBenh/components/ModalDanhSachBN/DateDropdown";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TrangThaiDashboard from "./TrangThaiDashboard"
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
const { RangePicker } = DatePicker;
const { Option } = Select;

const PieChart = (props) => {
  const refShowDate = useRef(null);
  const { t } = useTranslation()
  const {
    utils: {
      listloaiPhong,
      listLoaiThoiGian
    },
    dashboardCDHA: {
      data,
      listNguonNb
    }
  } = useSelector((state) => state) || {}
  const {
    utils: {
      getUtils
    },
    dashboardCDHA: {
      getDashboard
    }
  } = useDispatch() || {}
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (listNguonNb?.length > 0) {

      let root = am5.Root.new("chartdiv");

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      );

      // Define data
      let data = listNguonNb;

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "soLuong",
          categoryField: "tenNguonNb"
        })
      );
      series.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        // centerX: am5.percent(50),
        // x: am5.percent(50),
        // layout: root.horizontalLayout
      }));
      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
      });
      legend.data.setAll(series.dataItems);
      // Disabling labels and ticks
      series.labels.template.set("visible", false);
      series.ticks.template.set("visible", false);
      return () => root.dispose();
    }
  }, [listNguonNb])
  return (
    <div className="chart">
      <Row justify="space-between" align="middle" style={{ height: 50, padding: 10 }}>
        <div className="chart_title">
          {t("cdha.nguonNguoiBenh")}
        </div>
        <div className="chart_title_right">
          <div>{(listNguonNb || []).reduce((init, item) => {
            let soLuong = item?.soLuong || 0
            return init += soLuong
          }, 0)}</div>
          <div>{t("cdha.dichVu")}</div>
        </div>
      </Row>
      <hr />
      <div id="chartdiv" className="chart-wrapper">
      </div>
    </div>
  );
};

export default PieChart;
