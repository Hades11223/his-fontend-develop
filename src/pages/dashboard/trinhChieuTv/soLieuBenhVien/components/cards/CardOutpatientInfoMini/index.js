import React from "react";
import Loading from "../../common/Loading";
import {
  CardOutpatientInfoStyled,
  downTrendIcon,
  noTrendIcon,
  TooltipStyled,
  upTrendIcon,
} from "./styled";

const CardOutpatientInfo = ({
  title,
  titleStyle,
  dataSource = {},
  percentTop = false,
  loading,
  firstLoading,
  useMarqueeTitle = false,
}) => {
  const { tooltipData } = dataSource;
  // useMarquee(`.text-auto-running`, 0, 0)

  const renderFirstPercent = () => {
    if (!dataSource.percent && dataSource.percent !== 0) return "";
    return (
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
            {Math.round(Math.abs(dataSource.percent) * 100) / 100}&nbsp;%
          </div>
        </div>
        {(dataSource.count || dataSource.count === 0) && (
          <div className="percent-value">
            <div className="count-number">({dataSource.count})</div>
          </div>
        )}
      </div>
    );
  };

  const renderSecondPercent = () => {
    if (!dataSource.secondPercent || dataSource.secondPercent === 0) return "";
    return (
      <div className="second-percent">
        {Math.round(dataSource.secondPercent * 100) / 100}&nbsp;%
      </div>
    );
  };

  const renderTooltip = (content) => {
    return (
      <TooltipStyled
        overlayClassName="tooltip-tv"
        placement={tooltipData.placement || "top"}
        // color={'var(--text)' || 'white'}
        overlayStyle={{
          zIndex: "8",
        }}
        title={
          <div className="tooltip-content-wrap">
            {tooltipData?.numOfForm && tooltipData?.numOfForm > 1
              ? (tooltipData?.fields || []).map((fields, index) =>
                  renderForm(fields || [], index)
                )
              : renderForm(tooltipData?.fields || [], -1)}
          </div>
        }
      >
        {content}
      </TooltipStyled>
    );
  };

  const renderForm = (fields, index) => {
    return (
      <div className="form" key={`form-${index || 0}`}>
        <div className="title">
          {index < 0 ? tooltipData.title : tooltipData.title[index]}
        </div>
        <div className="fields-wrap">
          {fields.map((field) => {
            return (
              <div className="field" key={field.key}>
                <div className="label">{field.label}:</div>
                <div className="value">{field.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <CardOutpatientInfoStyled
        secondPercent={
          dataSource.secondPercent || dataSource.secondPercent === 0
        }
        haveTooltip={!!tooltipData}
      >
        {firstLoading ? (
          <Loading type="chart" isAbsolute noSub whiteLoading />
        ) : (
          <>
            {loading && <Loading type="chart" isAbsolute noSub whiteLoading />}
            <div className="card-tv-row">
              <div
                style={titleStyle || {}}
                className="title-text text-auto-running"
              >
                {useMarqueeTitle ? <marquee>{title}</marquee> : title}
              </div>
              {(dataSource.secondPercent ||
                dataSource.secondPercent === 0 ||
                percentTop) &&
                renderFirstPercent()}
            </div>
            <div className="card-tv-row absolute-bottom">
              <div className="value">{dataSource.value}</div>
              {dataSource.secondPercent ||
              dataSource.secondPercent === 0 ||
              percentTop
                ? renderSecondPercent()
                : renderFirstPercent()}
            </div>
            <div className="card-tv-row margin-row"></div>
          </>
        )}
      </CardOutpatientInfoStyled>
    );
  };
  return tooltipData ? renderTooltip(renderContent()) : renderContent();
};

export default React.memo(CardOutpatientInfo);
