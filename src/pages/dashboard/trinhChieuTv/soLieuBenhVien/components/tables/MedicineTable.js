import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Loading from "../common/Loading";
import { Pagination, Select, Table, Tabs, Tooltip } from "antd";
import moment from "moment";
import InputSearch from "../common/input/search";
import { nonAccentVietnamese } from "../../utils/helpers";

const PrevIcon = (
  <svg
    width={(window.innerWidth / 3840) * 32}
    height={(window.innerWidth / 3840) * 40}
    viewBox="0 0 32 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.208 44.125L12.1247 25L31.208 5.875L25.333 -2.56804e-07L0.333005 25L25.333 50L31.208 44.125Z"
      fill="white"
    />
    <path
      d="M31.208 44.125L12.1247 25L31.208 5.875L25.333 -2.56804e-07L0.333005 25L25.333 50L31.208 44.125Z"
      fill="#172B4D"
      fillOpacity="0.25"
    />
  </svg>
);

const NextIcon = (
  <svg
    width={(window.innerWidth / 3840) * 32}
    height={(window.innerWidth / 3840) * 40}
    viewBox="0 0 32 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.79199 5.875L19.8753 25L0.791992 44.125L6.66699 50L31.667 25L6.66699 -2.56804e-07L0.79199 5.875Z"
      fill="white"
    />
    <path
      d="M0.79199 5.875L19.8753 25L0.791992 44.125L6.66699 50L31.667 25L6.66699 -2.56804e-07L0.79199 5.875Z"
      fill="#172B4D"
      fillOpacity="0.25"
    />
  </svg>
);

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

const MedicineTableStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: calc(8 * 100vw / 3840);
  font-size: 1.2625vw;
  @media all and (max-width: 2561px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1921px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1367px) {
    font-size: 0.9375vw;
  }
  position: relative;
  padding-bottom: calc(70 * 100vw / 3840);
  .content-table {
    width: 100%;
    height: 100%;
    padding: calc(16 * 100vw / 3840);
    ${({ useBackground }) =>
      useBackground
        ? `
    background: var(--background);//#000E25;
    border-radius: 0.83333333333vw;
  `
        : ""}
    .filter-select-search {
      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        line-height: 1vw;
      }
    }
  }
  .header {
    display: flex;
    flex-direction: row;
    height: calc(100vh * 80 / 2160) !important;
    justify-content: space-between;
    .title {
      font-weight: 900;
      font-size: 1.25vw;
      line-height: 1.45vw;
      color: var(--text); //#ffffff;
      margin-bottom: 0.5em;
    }
    .config-button {
      cursor: pointer;
      font-weight: 700;
      font-size: calc(100vw / 3840 * 60);
      line-height: calc(100vw / 3840 * 65);
      color: var(--text); //#ffffff;
    }
  }
  .pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-pagination {
      padding: 0 !important;
      .ant-pagination-item {
        min-width: 8px;
        margin: 0.26020833333vw;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-options {
        display: none;
      }
      .ant-pagination-item-ellipsis {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      .ant-pagination-jump-next,
      .ant-pagination-jump-prev {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      li {
        border-radius: 50%;
        width: 0.57291666666vw !important;
        height: 0.57291666666vw !important;
        border: 0.10416666666vw solid #f2994a;
        background: transparent;
        &.ant-pagination-item-active {
          animation: ${paging_item_moving} 200ms ease-in-out;
          background: #f2994a;
        }
        a {
          display: none;
        }
      }
    }
  }
  .ant-tabs-nav-list {
    .ant-tabs-tab {
      font-weight: bold;
      padding: calc(16 * 100vw / 3840);
      margin-top: calc(16 * 100vw / 3840);
      margin-left: calc(16 * 100vw / 3840);
      font-size: calc(60 * 100vw / 3840);
      .ant-tabs-tab-btn {
        color: #1c75bc;
        :hover {
          color: #56ccf2;
        }
      }
      &.ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: #56ccf2;
        }
      }
    }
  }
  .ant-table {
    background: transparent;
    .ant-table-container {
      background: transparent;
      .ant-table-content {
        background: transparent;
        .ant-table-thead {
          background: transparent;
        }
        colgroup,
        tr {
          background: transparent;
        }
        .ant-table-cell {
          background: transparent;
          color: var(--text); //#fff;
          font-weight: 700;
          font-size: calc(50 * 100vw / 3840);
          line-height: 115%;
          .anticon {
            font-size: calc(32 * 100vw / 3840);
          }
        }
      }
    }
  }
  .text-ellipsis {
    color: var(--text); //#fff;
    font-weight: 700;
    line-height: 115%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .filter-search-input {
    width: 100%;
    &.limit-widtht-450 {
      max-width: calc(100vw / 3840 * 450);
    }
    .ant-input-prefix {
      font-size: calc(60 * 100vw / 3840);
      .anticon {
        font-size: calc(60 * 100vw / 3840) !important;
      }
    }
    .ant-input-affix-wrapper {
      width: 100% !important;
      border-radius: calc(14 * 100vw / 3840) !important;
    }
    input {
      font-size: calc(60 * 100vw / 3840);
      width: fit-content !important;
      height: fit-content !important;
    }
  }
  .filter-select-search {
    width: 100%;
    .ant-select-selection-placeholder {
      font-size: calc(60 * 100vw / 3840);
      padding-top: calc(32 * 100vw / 3840);
      font-weight: 400;
    }
    .ant-select-selection-search-input {
      font-size: calc(60 * 100vw / 3840);
      padding-top: calc(32 * 100vw / 3840);
      font-weight: 400;
      height: 100% !important;
    }
    .ant-select-item {
      font-size: calc(60 * 100vw / 3840) !important;
      font-weight: 700;
      width: 100%;
      padding-top: calc(32 * 100vw / 3840);
      height: calc(120 * 100vw / 3840) !important;
    }
    .ant-select-selection-item {
      font-size: calc(60 * 100vw / 3840) !important;
      font-weight: 700;
      width: 100%;
      padding-top: calc(32 * 100vw / 3840);
      height: calc(120 * 100vw / 3840) !important;
    }
    .ant-select-item-option {
      font-size: calc(60 * 100vw / 3840) !important;
      font-weight: 700;
      width: 100%;
      padding-top: calc(32 * 100vw / 3840);
      height: calc(120 * 100vw / 3840) !important;
    }
    .ant-select-item-option-content {
      font-size: calc(60 * 100vw / 3840) !important;
      font-weight: 700;
      width: 100%;
      padding-top: calc(32 * 100vw / 3840);
      height: calc(120 * 100vw / 3840) !important;
    }
    .ant-select-selector {
      height: calc(110 * 100vw / 3840);
      border-radius: calc(14 * 100vw / 3840) !important;
      input {
        font-size: calc(60 * 100vw / 3840);
        padding-top: calc(32 * 100vw / 3840);
      }
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: "calc(32 * 100vw / 3840) calc(16 * 100vw / 3840) !important";
  }
  .hoverable-row:hover {
    background: var(--row-hover) !important;
    cursor: pointer;
    th,
    td {
      background: transparent !important;
    }
  }
`;

const MedicineTable = ({
  data,
  recordPerPage = 15,
  loading,
  autoIncreasePageTime = 20000,
  useBackground = true,
  filter,
  setFilter,
  columnsConfig,
  dmKho,
  setClientFilter,
  hsd6Thang,
  hsd3Thang,
  quaHsd3Thang,
}) => {
  const [paging, setPaging] = useState({
    size: recordPerPage,
    total: data?.length,
    current: 1,
  });

  const [currentLoading, setCurrentLoading] = useState(false);
  const [showingData, setShowingData] = useState([]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: recordPerPage,
      total: data?.length,
      current: 1,
    }));
  }, [data, recordPerPage]);

  useEffect(() => {
    setCurrentLoading(true);
    setTimeout(() => {
      setShowingData(
        (data || []).filter(
          (item, index) =>
            index >= paging.size * (paging.current - 1) &&
            index < paging.size * paging.current
        )
      );
      setCurrentLoading(false);
    }, 200);
  }, [data, paging.size, paging.current, recordPerPage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setPaging((prev) => ({
      //   ...prev,
      //   current: prev.current >= prev.total / prev.size ? 1 : prev.current + 1,
      // }));
    }, autoIncreasePageTime);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlePageChange = useCallback((page, pageSize) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);

  const columns = useMemo(() => {
    if (columnsConfig) return columnsConfig;
    return [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        children: [
          {
            dataIndex: "key",
            key: "key",
            render: (_, v, i) => (
              <div
                className="text-ellipsis"
                style={{
                  maxWidth: (window.innerWidth / 3840) * 110,
                  minWidth: (window.innerWidth / 3840) * 110,
                }}
              >
                {paging.size * ((paging.current || 1) - 1) + i + 1}
              </div>
            ),
          },
        ],
      },
      {
        title: "Tên",
        dataIndex: "ten",
        key: "name",
        children: [
          {
            // title: (
            //   <InputSearch
            //     placeholder={'Tìm kiếm'}
            //     className={'filter-search-input limit-widtht-450'}
            //     onChange={(v) => {
            //       setClientFilter &&
            //         setClientFilter((prev) => ({
            //           ...prev,
            //           name: v,
            //         }));
            //     }}
            //   />
            // ),
            // width: (window.innerWidth / 3840) * 500, //1670
            dataIndex: "ten",
            key: "name",
            render: (value, rec, _) => (
              <div
                className="text-ellipsis"
                style={{
                  maxWidth: (window.innerWidth / 3840) * 900,
                  minWidth: (window.innerWidth / 3840) * 900,
                }}
              >
                <Tooltip
                  overlayClassName="tooltip-tv"
                  title={value}
                  // placement={'bottomRight'}
                  // overlayInnerStyle={{
                  //   background: 'white',
                  //   color: '#1c75bc',
                  //   fontWeight: 850,
                  //   border: 'none',
                  //   fontSize: 'calc(40 * 100vw / 3840)',
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   padding: 'calc(20 * 100vw / 3840)',
                  // }}
                >
                  <span>{value}</span>
                </Tooltip>
              </div>
            ),
          },
        ],
      },
      {
        title: "SL",
        dataIndex: "soLuong",
        key: "count",
        sorter: true,
        // width: (window.innerWidth / 3840) * 200,
        children: [
          {
            // width: (window.innerWidth / 3840) * 200, // 1870
            dataIndex: "soLuong",
            key: "count",
            render: (value) => (
              <div
                className="text-ellipsis"
                style={{
                  maxWidth: (window.innerWidth / 3840) * 180,
                  minWidth: (window.innerWidth / 3840) * 180,
                }}
              >
                {value}
              </div>
            ),
          },
        ],
      },
      {
        title: "ĐV",
        dataIndex: "donVi",
        key: "unit",
        children: [
          {
            dataIndex: "donVi",
            key: "unit",
            // width: (window.innerWidth / 3840) * 160, //2220
            render: (value) => {
              return (
                <div
                  className="text-ellipsis"
                  style={{
                    maxWidth: (window.innerWidth / 3840) * 160,
                    minWidth: (window.innerWidth / 3840) * 160,
                  }}
                >
                  <Tooltip overlayClassName="tooltip-tv" title={value}>
                    {value}
                  </Tooltip>
                </div>
              );
            },
          },
        ],
      },
      {
        title: "Kho",
        dataIndex: "kho",
        key: "kho",
        children: [
          {
            title: (
              <Select
                placeholder={"Chọn kho"}
                className={"filter-select-search"}
                options={dmKho}
                // style={{ maxWidth: 'calc(900 * 100vw / 3840)' }}
                allowClear
                showSearch
                onChange={(value) => {
                  setFilter &&
                    setFilter((prev) => ({
                      ...prev,
                      maKho: value,
                    }));
                }}
                dropdownClassName={"tv-selector"}
                value={filter.maKho}
                filterOption={(inputValue, opt) => {
                  return nonAccentVietnamese(opt.label)?.includes(
                    nonAccentVietnamese(inputValue)
                  );
                }}
              />
            ),
            // width: (window.innerWidth / 3840) * 1000,
            dataIndex: "kho",
            key: "kho",
            render: (value, rec, _) => (
              <Tooltip
                overlayClassName="tooltip-tv"
                title={value}
                // placement={'bottomRight'}
                // overlayInnerStyle={{
                //   background: 'white',
                //   color: '#1c75bc',
                //   fontWeight: 850,
                //   border: 'none',
                //   fontSize: 'calc(40 * 100vw / 3840)',
                //   display: 'flex',
                //   alignItems: 'center',
                //   padding: 'calc(20 * 100vw / 3840)',
                // }}
              >
                <div
                  className="text-ellipsis"
                  style={{
                    position: "relative",
                    fontSize: "calc((50 * 100vw) / 3840)",
                    maxWidth: (window.innerWidth / 3840) * 1100,
                    minWidth: (window.innerWidth / 3840) * 1100,
                  }}
                >
                  {value}
                </div>
              </Tooltip>
            ),
          },
        ],
      },
      {
        title: "HSD",
        dataIndex: "hsd",
        sorter: true,
        key: "hsd",
        // width: (window.innerWidth / 3840) * 300, //2830
        children: [
          {
            title: (
              <Select
                options={HSD_OPTIONS}
                style={{
                  // maxWidth: 'calc(330 * 100vw / 3840)'
                  maxWidth: (window.innerWidth / 3840) * 340,
                }}
                menuItemCa
                onChange={(value) =>
                  setFilter &&
                  setFilter((prev) => ({
                    ...prev,
                    hsd: value,
                  }))
                }
                allowClear
                value={filter.hsd}
                placeholder={"Chọn HSD"}
                className={"filter-select-search"}
                dropdownClassName={"tv-selector"}
              />
            ),
            // width: (window.innerWidth / 3840) * 220, // 3050
            dataIndex: "hsd",
            key: "hsd",
            render: (v, rec) => {
              const overTime = moment(v, "YYYY-MM-DDTHH:mm:ss.sssZ").diff(
                moment(),
                "months"
              );
              return (
                <div
                  style={{
                    color:
                      overTime > -3
                        ? overTime < 0
                          ? "#EB5757"
                          : overTime < 3
                          ? "#F2994A"
                          : "#27AE60"
                        : "red",
                    maxWidth: (window.innerWidth / 3840) * 340,
                    minWidth: (window.innerWidth / 3840) * 340,
                  }}
                >
                  {v
                    ? moment(v, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY")
                    : ""}
                </div>
              );
            },
          },
        ],
      },
      {
        title: <div>Lô nhập</div>,
        dataIndex: "soLo",
        key: "soLo",
        // width: (window.innerWidth / 3840) * 330,
        children: [
          {
            title: (
              <div>
                <InputSearch
                  // className={'filter-search-input limit-widtht-450'}
                  placeholder={"Tìm kiếm"}
                  onChange={(value) =>
                    setClientFilter &&
                    setClientFilter((prev) => ({
                      ...prev,
                      soLo: value,
                    }))
                  }
                />
              </div>
            ),
            // width: (window.innerWidth / 3840) * 330,
            dataIndex: "soLo",
            key: "soLo",
            render: (v) => {
              const ww = window.innerWidth;
              return (
                <div
                  className="text-ellipsis"
                  style={{
                    // textAlign: 'right',
                    // maxWidth: (window.innerWidth / 3840) * 330,
                    width: "100%",
                    maxWidth:
                      (ww -
                        (ww / 3840) * (110 + 900 + 180 + 160 + 1100 + 340)) *
                        (ww / 3840) -
                      (ww / 3840) * 100,
                    // minWidth: (window.innerWidth / 3840) * 330,
                  }}
                >
                  <Tooltip overlayClassName="tooltip-tv" title={v}>
                    <span>{v}</span>
                  </Tooltip>
                </div>
              );
            },
          },
        ],
      },
    ];
  }, [columnsConfig, dmKho, paging]);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    const { column, field, order } = sorter;
    setClientFilter((prev) => ({
      ...prev,
      sort: {
        column: field,
        direct: order,
      },
    }));
  };

  const customTABS = useMemo(() => {
    if (process.env.REACT_APP_HOSPITAL === "mediplus")
      return TABS.filter((i) => i.key !== TABKEYS.mauVaChePham);
    return TABS;
  }, []);

  return (
    <MedicineTableStyled useBackground={useBackground}>
      <div className="content-table">
        <div className="tabs" style={{ position: "relative" }}>
          <Tabs
            activeKey={filter.maNhom}
            onChange={(v) => {
              setFilter &&
                setFilter((prev) => ({
                  ...prev,
                  maNhom: v,
                }));
            }}
          >
            {customTABS.map((tItem) => {
              return (
                <Tabs.TabPane
                  className="tab-pane-item"
                  tab={tItem.label}
                  key={tItem.key}
                />
              );
            })}
          </Tabs>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
              fontSize: "calc(100vw / 3840 * 70)",
              lineHeight: "115%",
              fontWeight: 700,
            }}
          >
            <div
              style={{ padding: "calc(100vw / 3840 * 32)", color: "#27AE60" }}
            >{`6 THÁNG: ${hsd6Thang || 0}`}</div>
            <div
              style={{ padding: "calc(100vw / 3840 * 32)", color: "#F2994A" }}
            >{`3 THÁNG: ${hsd3Thang || 0}`}</div>
            <div
              style={{ padding: "calc(100vw / 3840 * 32)", color: "#EF4066" }}
            >{`Hết hạn: ${quaHsd3Thang || 0}`}</div>
          </div>
        </div>
        <Table
          dataSource={showingData}
          columns={columns}
          pagination={false}
          loading={{
            spinning: loading || currentLoading,
            indicator: <Loading isAbsolute type="chart" whiteLoading />,
          }}
          rowKey={(row) => row.id}
          onChange={handleTableChange}
          rowClassName={"hoverable-row"}
        />
      </div>
      <div className="pagination">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPaging((prev) => ({
              ...prev,
              current:
                prev.current > 1
                  ? prev.current - 1
                  : parseInt(prev.total / prev.size) + 1,
            }));
          }}
        >
          {PrevIcon}
        </div>
        &nbsp;
        <Pagination
          current={paging.current}
          total={paging.total}
          pageSize={paging.size}
          onChange={handlePageChange}
        />
        &nbsp;
        <div
          style={{ cursor: "pointer", fontSize: "calc(16 * 100vw / 3840)" }}
          onClick={() => {
            setPaging((prev) => ({
              ...prev,
              current:
                prev.current <=
                parseInt((prev.total || 0) / (prev.size || recordPerPage))
                  ? prev.current + 1
                  : 1,
            }));
          }}
        >
          {NextIcon}
        </div>
      </div>
    </MedicineTableStyled>
  );
};

export const TABKEYS = {
  thuoc: "THUOC",
  hoaChat: "HC",
  mauVaChePham: "MAU",
  vatTuYTe: "VTYT",
};

export const TABS = [
  {
    key: TABKEYS.thuoc,
    value: TABKEYS.thuoc,
    label: "Thuốc",
  },
  {
    key: TABKEYS.hoaChat,
    value: TABKEYS.hoaChat,
    label: "Hóa chất",
  },
  {
    key: TABKEYS.mauVaChePham,
    value: TABKEYS.mauVaChePham,
    label: "Máu và chế phẩm máu",
  },
  {
    key: TABKEYS.vatTuYTe,
    value: TABKEYS.vatTuYTe,
    label: "Vật tư y tế",
  },
];

export const HSDKeys = {
  threeMonth: 3,
  sixMonth: 6,
  overThreeMonth: -3,
};

export const HSD_OPTIONS = [
  {
    key: HSDKeys.overThreeMonth,
    value: HSDKeys.overThreeMonth,
    label: "Quá hạn 3 tháng",
  },
  {
    key: HSDKeys.threeMonth,
    value: HSDKeys.threeMonth,
    label: "Cận hạn 3 tháng",
  },
  {
    key: HSDKeys.sixMonth,
    value: HSDKeys.sixMonth,
    label: "Cận hạn 6 tháng",
  },
];

export default React.memo(MedicineTable);
