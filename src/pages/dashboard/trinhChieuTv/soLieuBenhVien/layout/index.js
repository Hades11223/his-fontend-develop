import React, { useEffect } from "react";
import { TVShowLayoutStyled } from "./styled";
import Header from "./header";
import Footer from "./footer";
import moment from "moment";

const TVShowLayout = (props) => {
  const {
    children,
    date,
    onChangeDate,
    disabledFilter,
    getData,
    onRefresh,
    pageTitle,
    tabFilter,
    allowFuturePicker = false,
    picker,
    format,
    useFixContent,
  } = props;

  // console.log('%c theme','background: red');

  return (
    <TVShowLayoutStyled useFixContent={useFixContent}>
      <div className="layer-1-wrap">
        <div className="layer-1"></div>
        <div className="content-wrap">
          <Header
            onChangeDate={onChangeDate}
            date={moment(date).format("DD/MM/YYYY")}
            getData={getData}
            onRefresh={onRefresh}
            pageTitle={pageTitle}
            tabFilter={tabFilter}
            disabledFilter={disabledFilter}
            allowFuturePicker={allowFuturePicker}
            picker={picker}
            format={format}
          />
          <div className="tv-content">{children}</div>
          <Footer />
        </div>
      </div>
    </TVShowLayoutStyled>
  );
};

export default React.memo(TVShowLayout);
