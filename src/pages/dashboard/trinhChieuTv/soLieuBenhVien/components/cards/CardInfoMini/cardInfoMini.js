import React from "react";
import Loading from "../../common/Loading";
import {
  CardInfoMiniStyled,
  downTrendIcon,
  noTrendIcon,
  upTrendIcon,
} from "./styled";

const CardInfoMini = ({
  title,
  dataSource = {
    percent: 0,
    value: 0,
    count: 0,
  },
  loading,
}) => {
  return (
    <CardInfoMiniStyled className="animation-tv-card-appear">
      {loading ? (
        <Loading type="chart" isAbsolute noSub whiteLoading />
      ) : (
        <>
          <div className="title">{title}</div>
          <div className="value">
            <div className="value-text">{dataSource.value}</div>
            <div
              className={`percent ${
                dataSource.percent === 0
                  ? "no-trend"
                  : dataSource.percent > 0
                  ? "up-trend"
                  : "down-trend"
              }`}
            >
              <div className="trend-icon">
                {dataSource.percent === 0
                  ? noTrendIcon()
                  : dataSource.percent > 0
                  ? upTrendIcon()
                  : downTrendIcon()}
                <div className="percent-value-text">
                  {dataSource.percent}&nbsp;%
                </div>
              </div>
              <div className="percent-value">
                <div className="count-number">({dataSource.count})</div>
              </div>
            </div>
          </div>
        </>
      )}
    </CardInfoMiniStyled>
  );
};

export default React.memo(CardInfoMini);
