import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
  CartesianGrid,
} from "recharts";
import { Space, Switch } from "antd";
import ContainerCard from "../common/ContainerCard";
import Loading from "../common/Loading";
import EmptyChart from "../common/EmptyChart";
const widthDefined = {
  sm: {
    wText: 90,
    fontSize: 12,
  },
  md: {
    wText: 100,
    fontSize: 12,
  },
  lg: {
    wText: 130,
    fontSize: 16,
  },
  xxl: {
    wText: 150,
    fontSize: 16,
  },
};
const InpatientChart = ({ data, isLoading }) => {
  const totalHienCo = useMemo(
    () => data?.reduce((t, item) => (t += item.hienCo), 0),
    [data]
  );
  const totalRaVien = useMemo(
    () => data?.reduce((t, item) => (t += item.raVien), 0),
    [data]
  );
  const totalVaoVien = useMemo(
    () => data?.reduce((t, item) => (t += item.vaoVien), 0),
    [data]
  );
  const [state, setState] = useState({});
  const RenderCustomizedLabel = ({ x, y, width, height, value, ...props }) => {
    return (
      <g>
        <text
          x={x + width + 5}
          y={height <= 10 ? y - 10 : y + height / 2 - 8}
          textAnchor="hanging"
          dominantBaseline="hanging"
          fontSize={12}
          fontWeight="600"
          // fill={height <= 10 ? '#000000' : '#fff'}
        >
          {value}
        </text>
      </g>
    );
  };
  const onresize = () => {
    if (window.screen.width < 400) {
      setState({ reload: !state.reload, ...widthDefined.sm });
    } else if (window.screen.width < 1200) {
      setState({ reload: !state.reload, ...widthDefined.md });
    } else if (window.screen.width < 1400) {
      setState({ reload: !state.reload, ...widthDefined.lg });
    } else {
      setState({ reload: !state.reload, ...widthDefined.xxl });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onresize);
    onresize();
  }, []);

  function LegendContent() {
    return (
      <>
        <div className="legend">
          <div
            className="color-block"
            style={{
              backgroundColor: "#1c75bc",
            }}
          ></div>
          <span>Hi???n c?? : {totalHienCo}</span>
        </div>

        <div className="legend">
          <div
            style={{
              backgroundColor: "#27AE60",
            }}
            className="color-block"
          ></div>
          <span>Ra vi???n : {totalRaVien}</span>
        </div>
        <div className="legend">
          <div
            className="color-block"
            style={{
              backgroundColor: "#F2994A",
            }}
          ></div>
          <span>V??o vi???n : {totalVaoVien}</span>
        </div>
      </>
    );
  }
  return (
    <ContainerCard
      title="Ng?????i b???nh n???i tr??"
      utilities={
        <Space>
          {/* <Switch
            size="large"
            checkedChildren="Khoa"
            unCheckedChildren="Ph??ng"
          /> */}
        </Space>
      }
    >
      {/* <p style={{ fontWeight: 'bold' }}>(????n v???: ng?????i)</p> */}
      <div className="scroll-chart">
        {isLoading && <Loading type="chart" isAbsolute />}
        {(!data || data?.length) <= 0 && !isLoading && <EmptyChart />}
        {!isLoading && data?.length > 0 && (
          <ResponsiveContainer height={data?.length * 65 + 50}>
            <BarChart
              barCategoryGap={"10%"}
              barGap={"10%"}
              layout="vertical"
              data={data}
              margin={{ top: 35, right: 50, left: 25, bottom: 5 }}
              barSize={16}
              maxBarSize={16}
            >
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: "40px" }}
                margin={40}
                content={LegendContent()}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="tenKhoa"
                width={state.wText}
                style={{ fontWeight: "bold", fontSize: 15 }}
              />
              <Tooltip />
              <Bar name="Hi???n c??" dataKey="hienCo" fill="#1c75bc">
                <LabelList
                  dataKey="hienCo"
                  position="inside"
                  content={RenderCustomizedLabel}
                />
              </Bar>
              <Bar name="Ra vi???n" dataKey="raVien" fill="#27AE60">
                <LabelList
                  dataKey="raVien"
                  position="inside"
                  content={RenderCustomizedLabel}
                />
              </Bar>
              <Bar name="V??o vi???n" dataKey="vaoVien" fill="#F2994A">
                <LabelList
                  dataKey="vaoVien"
                  position="inside"
                  content={RenderCustomizedLabel}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {!isLoading && data?.length > 0 && (
        <p style={{ fontWeight: "bold" }}>(????n v???: ng?????i)</p>
      )}
    </ContainerCard>
  );
};

export default InpatientChart;
