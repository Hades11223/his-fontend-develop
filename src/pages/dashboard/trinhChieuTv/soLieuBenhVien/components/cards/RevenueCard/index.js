import React from "react";
// import useMarquee from '@hook/useMarquee'
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { RevenueCardStyled } from "./styled";

const RevenueCard = ({ currency = false, dataSource = {}, title, width }) => {
  return (
    <RevenueCardStyled customWidth={width}>
      <div className="hover-mask"></div>
      {dataSource.id && (
        <>
          <div className="title text-auto-running">
            {dataSource?.ten || title || ""}
          </div>
          <div className="percent-wrapper">
            {dataSource.showChart && dataSource.percent !== null && (
              <div className="chart-wrapper">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={[
                        {
                          name: "current",
                          value: dataSource?.value || 0,
                        },
                        {
                          name: "other",
                          value:
                            (dataSource?.total || 0) - (dataSource.value || 0),
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={(window.innerWidth * 30) / 3840}
                    >
                      <Cell
                        dataIndex="current"
                        key={`cell-current`}
                        fill={
                          dataSource?.value >
                          (dataSource?.total || 0) - (dataSource.value || 0)
                            ? "#27AE60"
                            : "#c5cad3"
                        }
                      />
                      <Cell
                        dataIndex="other"
                        key={`cell-other`}
                        fill={"transparent"}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {(dataSource.percent || dataSource.percent === 0) && (
              <div className="percent">{Math.round(dataSource.percent)}%</div>
            )}
          </div>
          <div className={`value ${currency && "currency"}`}>
            {currency
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  signDisplay: "never",
                  currencyDisplay: "code",
                })
                  .format(dataSource.value || 0)
                  .replace("VND", "")
              : dataSource.value}
          </div>
        </>
      )}
    </RevenueCardStyled>
  );
};

export default React.memo(RevenueCard);
