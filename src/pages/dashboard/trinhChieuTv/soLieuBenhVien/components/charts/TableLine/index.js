import React, { memo, useMemo } from "react";
import CustomTable from "../../tables/table";
import ArrowIncrease from "@resources/svg/arrow-increase.svg";
import ArrowEqual from "@resources/svg/arrow-equal.svg";
import ArrowDecrease from "@resources/svg/arrow-decrease.svg";
import GroupTransparent from "../../groups/Transparent";
import moment from "moment";
import { useState } from "react";
import HeaderSortable from "@components/common/Table/HeaderSortable";

const Line = ({ item, value, max = 100, status }) => {
  return (
    <div className="td-content" style={{ position: "relative" }}>
      <div
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          width: ((value * 100) / max || 1) + "%",
          height: "100%",
          zIndex: 0,
        }}
        className="linear-gradient-td"
      >
        {status === 1 ? (
          <ArrowIncrease />
        ) : status === 2 ? (
          <ArrowEqual />
        ) : status === 3 ? (
          <ArrowDecrease />
        ) : (
          <></>
        )}
      </div>
      <div
        className="text limited-content text-elipsis"
        style={{ zIndex: 3, textAlign: "right" }}
      >
        {item}
      </div>
    </div>
  );
};

const TableLine = ({
  recordPerPage,
  selectedDate,
  dataSource,
  maxValue,
  listKey = [],
  loading,
  hiddenSoLuong,
  firstTitle = "Nhóm thanh toán",
}) => {
  const [sortData, setSortData] = useState({});
  const customData = useMemo(
    () =>
      sortData.value === 1
        ? [...dataSource].sort(
            (a, b) => a[sortData.key]?.doanhThu - b[sortData.key]?.doanhThu
          )
        : sortData.value === 2
        ? [...dataSource].sort(
            (a, b) => b[sortData.key]?.doanhThu - a[sortData.key]?.doanhThu
          )
        : [...dataSource],
    [dataSource, sortData]
  );
  const formatColumns = () => {
    // const current = moment(selectedDate, 'DD/MM/YYYY').subtract(5, 'day');
    const columns = [
      {
        title: firstTitle,
        dataIndex: "ten",
        key: "ten",
      },
      ...listKey.map((item) => ({
        title: (
          <HeaderSortable
            title={item}
            showSort
            dataSort={sortData.key === item ? sortData.value : 0}
            sort_key={item}
            onClick={(key, value) => {
              setSortData({
                key,
                value,
              });
            }}
            icon={{
              opacity: 0.01,
              fill: "var(--border)",
              colorActive: "#1C75BC",
            }}
            useColoringChange={true}
          />
        ),
        dataIndex: item,
        key: item,
        render: (item) => (
          <Line
            status={item?.status}
            max={maxValue}
            value={item?.doanhThu || 1}
            item={
              hiddenSoLuong
                ? ((item?.doanhThu || 0) + "").formatPrice()
                : (item?.soLuong || 0) +
                  " - " +
                  ((item?.doanhThu || 0) + "").formatPrice()
            }
          ></Line>
        ),
      })),
    ];

    return columns;
  };

  return (
    <GroupTransparent grow={1}>
      <CustomTable
        style={{ flex: 1 }}
        formatColumns={formatColumns}
        dataSource={customData}
        pagination={false}
        loading={loading}
        recordPerPage={recordPerPage}
      ></CustomTable>
    </GroupTransparent>
  );
};

TableLine.propTypes = {};

export default memo(TableLine);
