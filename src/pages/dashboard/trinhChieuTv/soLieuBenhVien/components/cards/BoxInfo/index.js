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

  return (
    <CardInfoStyled>
      <div className="box-info-content">
        {(mappingFields(dataSource) || []).map((info, index) => {
          return (
            <div className="info-content" key={info.key}>
              <div className="label">{info.label}</div>
              <div className="value">{info.value}</div>
              {info.loading && (
                <Loading isAbsolute type="chart" whiteLoading noSub />
              )}

              {info.miniLoading && (
                <Loading isAbsolute type="card" alignTop={true} />
              )}
            </div>
          );
        })}
        {/* <div className="title">{title}</div> */}

        {/* {!loading && (
          <>
            <div className="card-total">
              {formatValue(
                dataSource?.tongHop?.tong || dataSource?.tong,
                currencyFormat,
              )}
            </div>
          </>
        )} */}
      </div>
    </CardInfoStyled>
  );
};

export default React.memo(CardInfo);
