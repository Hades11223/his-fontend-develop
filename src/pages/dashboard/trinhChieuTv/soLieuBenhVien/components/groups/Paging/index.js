import React, { useCallback, useEffect, useState } from "react";
import { Pagination, Tooltip } from "antd";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import Loading from "../../common/Loading";
import ChartNoDataContent from "../../charts/NoData";
import useMarquee from "../../hooks/useMarquee";
import { GroupPagingStyled } from "./styled";

const GroupPaging = ({
  grow,
  numPerPage = 3,
  dataSource,
  title,
  loading,
  autoIncreasePageTime = 20000,
  vertical = false,
  customCard,
  customStyled,
  id = "",
  minimumFlex = "calc(100vw / 5)",
}) => {
  const [paging, setPaging] = useState({
    current: 1,
    total: dataSource?.data?.length || 0,
    size: numPerPage,
  });

  const [showingData, setShowingData] = useState([]);

  useMarquee(`#group-paging-${id} .text-auto-running`, 0, 0, showingData);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: numPerPage,
    }));
  }, [numPerPage]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      total: dataSource?.data?.length || 0,
    }));
  }, [dataSource]);

  useEffect(() => {
    setShowingData(
      (dataSource?.data || []).filter(
        (item, index) =>
          index >= paging.size * (paging.current - 1) &&
          index < paging.size * paging.current
      )
    );
  }, [paging, dataSource?.data]);

  const onChangePaging = useCallback((page, pageSize) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setPaging((prev) => ({
    //     ...prev,
    //     current: prev.current >= prev.total / prev.size ? 1 : prev.current + 1,
    //   }));
    // }, autoIncreasePageTime);
    return () => {
      // clearInterval(intervalId);
    };
  }, []);

  return (
    <GroupPagingStyled
      grow={grow}
      numPerPage={numPerPage}
      vertical={vertical}
      minimumFlex={minimumFlex}
      customStyled={customStyled}
      id={`group-paging-${id}`}
    >
      <div className="group-content">
        <div className="title">
          {title}&nbsp;({dataSource?.sum || 0})
        </div>
        {loading ? (
          <Loading type="chart" whiteLoading isAbsolute />
        ) : dataSource?.sum <= 0 ? (
          <ChartNoDataContent />
        ) : (
          <div className="content-cards">
            {showingData.map((item, index) =>
              customCard ? (
                customCard(item, index)
              ) : (
                <div
                  key={`${item.id}-${index}`}
                  className={`paging-card-wrapper animation-tv-card-moving delay-${index}`}
                >
                  <div className="paging-card-content">
                    <div className="name text-auto-running">{item.name}</div>
                    <div className="bhyt">
                      {item.medicalInsurance && <span>BHYT</span>}
                    </div>
                    <div className="fields">
                      {(item?.fields || []).map(({ name, label, value }) => (
                        <Tooltip title={value} overlayClassName="tooltip-tv">
                          <div className="field" key={name}>
                            <div className="label">{label}:&nbsp;</div>
                            <div className="value two-line">{value}</div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="advanceMoney">
                        <div>Tạm ứng</div>
                        <div>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            signDisplay: "never",
                            currencyDisplay: "code",
                          })
                            .format(item.advanceMoney)
                            .replace("VND", "")}
                          <span className="super-script">đ</span>
                        </div>
                      </div>
                      <div className="hospitalFee">
                        <div>Viện phí</div>
                        <div>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            signDisplay: "never",
                            currencyDisplay: "code",
                          })
                            .format(item.hospitalFee)
                            .replace("VND", "")}
                          <span className="super-script">đ</span>
                        </div>
                      </div>
                    </div>
                    <div className="rating-number">{item.stt}</div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        <div className="pagination">
          <div
            className="first-page"
            onClick={() =>
              setPaging((prev) => ({
                ...prev,
                current: 1,
              }))
            }
          >
            <DoubleLeftOutlined />
          </div>
          <Pagination
            current={paging.current}
            onChange={onChangePaging}
            total={paging.total}
            pageSize={paging.size}
          />
          <div
            className="last-page"
            onClick={() =>
              setPaging((prev) => ({
                ...prev,
                current:
                  paging.total % paging.size > 0
                    ? parseInt(paging.total / paging.size) + 1
                    : parseInt(paging.total / paging.size),
              }))
            }
          >
            <DoubleRightOutlined />
          </div>
        </div>
      </div>
    </GroupPagingStyled>
  );
};

export default React.memo(GroupPaging);
