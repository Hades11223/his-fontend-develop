import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import ChartNoDataContent from "../NoData";
import { isEmpty } from "lodash";
import {
  formatVNCurrentcyStringForChart,
  roundedCurrency,
} from "../../../utils/helpers";
import Loading from "../../common/Loading";
import { LineChartStyled } from "./styled";

const renderDot = (props) => {
  const { x, y, cx, cy, width, height, payload } = props;
  return (
    <g key={payload.value || Math.random(1000)}>
      <circle
        cx={cx}
        cy={cy}
        r={window.innerWidth / 400}
        stroke="#F59E0B"
        strokeWidth={window.innerWidth / 1280}
        fill="#F59E0B"
      />
    </g>
  );
};

const CustomDotLabel =
  (isCurrencyFormat, isCurrencyRounded, lamTronTy, ignoreLabel) => (props) => {
    const { x, y, stroke, value } = props;

    return (
      <text
        x={
          // isCurrencyRounded || isCurrencyFormat
          //   ? x - window.innerWidth / 45
          //   : x - window.innerWidth / 240
          x
        }
        y={
          y -
          window.innerWidth /
            (window.matchMedia("(max-width: 2561px)").matches
              ? window.matchMedia("(max-width: 1921px)").matches
                ? window.matchMedia("(max-width: 1367px)").matches
                  ? 85
                  : 95
                : 102
              : 107)
        }
        dy={8}
        textAnchor="left"
        fill="#F59E0B"
        // fill={"var(--text)"}
        fontSize={"0.875vw"}
        fontWeight={"bold"}
      >
        {lamTronTy || ignoreLabel
          ? value
          : isCurrencyRounded
          ? roundedCurrency(value)
          : isCurrencyFormat
          ? value
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                signDisplay: "never",
                currencyDisplay: "code",
              })
                .format(value)
                .replace("VND", "đ")
            : 0
          : value || 0}
      </text>
    );
  };

const CustomLineChart = ({
  data = [],
  isCurrencyFormat = true,
  isCurrencyRounded = false,
  lamTronTy = false,
  ignoreLabel = false,
  title,
  loading,
}) => {
  const { tyDong, maxValue } = useMemo(() => {
    const maxObj = (
      data && data.length > 0
        ? data
        : [
            {
              value: 0,
            },
          ]
    ).reduce((a, b) => (a.value > b.value ? a : b));
    const tyDong = maxObj.value > 500000000;

    return {
      tyDong,
      maxValue:
        1 +
        (tyDong
          ? Math.round(maxObj.value / 1000000000)
          : Number.parseInt((maxObj.value / 1000000).toFixed(0))),
    };
  }, [data]);
  // console.log('re running usememo tydong.', maxValue);
  const customData = useMemo(
    () =>
      lamTronTy
        ? data?.map((d) => ({
            ...d,
            value: tyDong
              ? (d.value / 1000000000).toFixed(2)
              : Math.round(d.value / 1000000),
          }))
        : data,
    [data]
  );

  return (
    <LineChartStyled>
      {title && <div className="title">{title}</div>}
      {loading ? (
        <Loading isAbsolute type="chart" whiteLoading />
      ) : !data || isEmpty(data) ? (
        <ChartNoDataContent />
      ) : (
        <AreaChart
          width={window.innerWidth / 3}
          height={
            200
            // window.innerWidth /
            // (window.matchMedia("(max-width: 2561px)").matches
            //   ? window.matchMedia("(max-width: 1921px)").matches
            //     ? window.matchMedia("(max-width: 1367px)").matches
            //       ? 9
            //       : 8.5
            //     : 8
            //   : 8)
          }
          data={customData}
          // margin={{
          //   top: (window.innerWidth / 3840) * 20,
          //   right:
          //     (window.innerWidth / 3840) *
          //     (window.matchMedia("(max-width: 2561px)").matches
          //       ? window.matchMedia("(max-width: 1921px)").matches
          //         ? window.matchMedia("(max-width: 1367px)").matches
          //           ? 40
          //           : 50
          //         : 60
          //       : 60),
          //   left:
          //     (window.innerWidth / 3840) *
          //     (window.matchMedia("(max-width: 2561px)").matches
          //       ? window.matchMedia("(max-width: 1921px)").matches
          //         ? window.matchMedia("(max-width: 1367px)").matches
          //           ? 60
          //           : 70
          //         : 90
          //       : 100),
          //   bottom: (window.innerWidth / 3840) * 15,
          // }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="2 3" />
          <XAxis
            fontSize={"0.875vw"}
            dataKey="name"
            // stroke={"var(--text)"} //#FFFFFF
            stroke="#C9CDD4"
            padding={
              {
                // right: (window.innerWidth / 3840) * 10,
                // left:
                //   (window.innerWidth / 3840) *
                //   (window.matchMedia("(max-width: 2561px)").matches
                //     ? window.matchMedia("(max-width: 1921px)").matches
                //       ? window.matchMedia("(max-width: 1367px)").matches
                //         ? 100
                //         : 105
                //       : 110
                //     : 115),
              }
            }
          />
          <YAxis
            fontSize={"0.875vw"}
            stroke={"var(--text)"} //#FFFFFF
            tickFormatter={
              lamTronTy
                ? (value) => value + (tyDong ? " tỷ" : " triệu")
                : ignoreLabel
                ? (value) => value
                : isCurrencyRounded
                ? roundedCurrency
                : isCurrencyFormat
                ? formatVNCurrentcyStringForChart
                : (value) => value
            }
            domain={[0, maxValue]}
            padding={{ top: (window.innerWidth / 3840) * 48 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            // stroke={"var(--text)"} //#FFFFFF
            stroke="#F59E0B"
            label={CustomDotLabel(
              isCurrencyFormat,
              isCurrencyRounded,
              lamTronTy,
              ignoreLabel
            )}
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={renderDot}
            isAnimationActive={false}
          />

          <ReferenceLine
            y={1}
            label=""
            stroke="var(--color-1)"
            // strokeDasharray="3 3"
          />
        </AreaChart>
      )}
    </LineChartStyled>
  );
};

export default React.memo(CustomLineChart);
