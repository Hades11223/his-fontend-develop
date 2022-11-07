import React, { useCallback } from "react";
import Loading from "../../common/Loading";
import { CardInfoStyled } from "./styled";

const CardInfo = (props) => {
  const {
    loading,
    miniLoading,
    dataSource,
    title,
    unit,
    mappingFields = () => [],
    currencyFormat,
    flex1,
  } = props;

  const formatValue = useCallback((value, currencyFormat = false) => {
    if (currencyFormat) {
      return value
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            signDisplay: "never",
            currencyDisplay: "code",
          })
            .format(value)
            .replace("VND", "")
        : 0;
    }
    return value || 0;
  }, []);

  let tong =
    !!dataSource && !!Object.entries(dataSource).length
      ? Object.entries(dataSource).reduce((prev, next) => prev[1] + next[1])
      : 0;

  return (
    <CardInfoStyled flex1={flex1}>
      <div className="card-info-content">
        <div className="title">{title}</div>
        {loading && <Loading isAbsolute type="chart" whiteLoading noSub />}
        {miniLoading && <Loading isAbsolute type="card" alignTop={true} />}
        {!loading && (
          <>
            <div className="card-unit">{unit}</div>
            <div className="card-total">
              {formatValue(tong, currencyFormat)}
            </div>
            <div className="card-divider"></div>
            {(mappingFields(dataSource) || []).map((info, index) => {
              return (
                <div className="info" key={info.key}>
                  <div className="label">{info.label}</div>
                  <div className="value">
                    {formatValue(info.value, info.currencyFormat)}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </CardInfoStyled>
  );
};

export default React.memo(CardInfo);
