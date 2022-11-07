import React, { useEffect } from 'react';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
  CartesianGrid,
  Label,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';

const BarTooltipStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: calc(100vw / 3840 * 40);
  background: #ffffff;
  box-shadow: 0px 0px calc(100vw / 3840 * 20) rgba(0, 0, 0, 0.1);
  border-radius: calc(100vw / 3840 * 64) calc(100vw / 3840 * 64)
    calc(100vw / 3840 * 64) 0px;
  > p {
    font-weight: 900;
    font-size: 48px;
    line-height: 65px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #1c75bc;
    flex: none;
    order: 0;
    /* flex-grow: 0; */
  }
  .tooltip-item {
    .label {
      font-weight: 900;
      font-size: calc(100vw / 3840 * 48);
      line-height: calc(100vw / 3840 * 65);
    }
    .value {
      font-weight: 450;
      font-size: calc(100vw / 3840 * 48);
      line-height: calc(100vw / 3840 * 65);
    }
  }
`;

const BarTooltip = (props) => {
  const { label, payload = [], fields = [] } = props;
  const data = payload[0]?.payload;
  if (!data) return '';
  return (
    <BarTooltipStyled>
      <p>{label}</p>
      {fields.map((item) => {
        return (
          <div className="tooltip-item" key={item.key}>
            <span className="label">{item.label}</span>:&nbsp;
            <span className="value">{data[item.key]}</span>
          </div>
        );
      })}
    </BarTooltipStyled>
  );
};

const CustomizedTick = (props) => {
  const { x, y, payload } = props;
  return (
    <svg>
      <switch>
        <foreignObject
          x={x - (window.innerWidth / 3840) * 140}
          y={y}
          width={(window.innerWidth / 3840) * 300}
          height={(window.innerWidth / 3840) * 450}
        >
          <div
            style={{ color: 'var(--header-text)' }}
            xmlns="http://www.w3.org/1999/xhtml"
          >
            {payload.value}
          </div>
        </foreignObject>
        <text textAnchor="middle" x={0} y={0}>
          {payload.value}
        </text>
      </switch>
    </svg>
  );
};

const PercentLabel = (props) => {
  const { value, viewBox, fill, style } = props;
  const { x, y } = viewBox;
  return (
    <g viewBox={viewBox}>
      <text
        style={style}
        textAnchor="start"
        fill={fill}
        x={x - (window.innerWidth / 3840) * 120}
        y={
          y + (window.innerWidth / 3840) * 500 + (window.innerWidth / 3640) * 50
        }
      >
        {value}
      </text>
    </g>
  );
};

const ValueLabel = (props) => {
  const { value, viewBox, fill, style } = props;
  const { x, y } = viewBox;
  return (
    <g viewBox={viewBox}>
      <text
        style={style}
        textAnchor="start"
        fill={fill}
        x={x - (window.innerWidth / 3840) * 120}
        y={
          y + (window.innerWidth / 3840) * 350 + (window.innerWidth / 3640) * 50
        }
      >
        {value}
      </text>
    </g>
  );
};

const DarkBarChartContent = React.memo((props) => {
  const {
    dataKey = 'name',
    valueKey = 'value',
    useCurrencyFormat = false,
    valueLabelText,
    percentLabelText,
    valueLabelKey,
    useTooltip = true,
    tooltipProps = {},
    dataSource = [],
  } = props;

  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart
        data={dataSource}
        key={moment().format('DD/MM/YYYY-HH:mm:ss:sss')}
        margin={{
          top: (window.innerWidth / 3840) * 100,
          right: (window.innerWidth / 3840) * (useCurrencyFormat ? 450 : 50),
          left: (window.innerWidth / 3840) * 100,
          bottom: (window.innerWidth / 3840) * 650,
        }}
      >
        <defs>
          <linearGradient id="colorbar" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#1C75BC" stopOpacity={1} />
            <stop offset="100%" stopColor="#09C3FF" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="colorred" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C323D" stopOpacity={1} />
            <stop offset="100%" stopColor="#F63832" stopOpacity={1} />
          </linearGradient>
        </defs>
        {useTooltip && <Tooltip content={<BarTooltip {...tooltipProps} />} />}
        <XAxis
          stroke={'var(--header-text)' || '#56CCF2'}
          dataKey={dataKey}
          tickMargin={(window.innerWidth / 3840) * 30}
          tick={<CustomizedTick />}
          minTickGap={-9999}
        >
          {valueLabelText && (
            <Label
              value={valueLabelText}
              offset={0}
              position="left"
              fill={'var(--header-text)' || '#white'}
              style={{ fontWeight: 900, fontSize: 'calc(80 / 3840 * 100vw)' }}
              content={<ValueLabel value={valueLabelText} />}
            />
          )}
          {percentLabelText && (
            <Label
              value={percentLabelText}
              offset={0}
              position="left"
              fill="#56CCF2"
              style={{ fontWeight: 900, fontSize: 'calc(80 / 3840 * 100vw)' }}
              content={<PercentLabel value={percentLabelText} />}
            />
          )}
        </XAxis>
        <YAxis
          stroke={'var(--header-text)' || '#56CCF2'}
          style={{
            fontWeight: 900,
            fontSize: 'calc(60 / 3840 * 100vw)',
          }}
        />
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke={"var(--header-text)" || "#56CCF2"}
        />
        <Bar
          dataKey={valueKey}
          fill="url(#colorbar)"
          maxBarSize={(window.innerWidth / 3840) * 160}
        >
          {dataSource.map((entry, index) => {
            const color =
              entry.percent > 100 ? 'url(#colorred)' : 'url(#colorbar)';
            return (
              <React.Fragment key={`cell-wrap-${entry.id}`}>
                <Cell key={`cell-${entry.id}`} fill={color} />
              </React.Fragment>
            );
          })}
          <LabelList
            position="top"
            dataKey={valueKey}
            formatter={(value) => {
              if (!value || value == 0) return '';
              if (useCurrencyFormat)
                return new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  signDisplay: 'never',
                  currencyDisplay: 'code',
                })
                  .format(value)
                  .replace('VND', 'đ');
              return value;
            }}
            style={{ fontWeight: 900, fontSize: 'calc(80 / 3840 * 100vw)' }}
          />
          {valueLabelKey && (
            <LabelList
              position="bottom"
              dataKey={valueLabelKey}
              formatter={(value) => {
                return value || 0;
              }}
              fill={'var(--header-text)' || '#fff'}
              stroke={'var(--header-text)' || '#fff'}
              style={{ fontWeight: 900, fontSize: 'calc(80 / 3840 * 100vw)' }}
              offset={(window.innerWidth / 3840) * 350}
            />
          )}
          {percentLabelText && (
            <LabelList
              offset={(window.innerWidth / 3840) * 500}
              position="bottom"
              dataKey={'percent'}
              style={{
                fontWeight: 900,
                fontSize: 'calc(80 / 3840 * 100vw)',
              }}
              formatter={(value) => {
                return `${value || 0}%`;
              }}
            />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

export default DarkBarChartContent;
