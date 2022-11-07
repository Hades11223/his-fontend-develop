import React, { useCallback, useEffect, useMemo, useRef } from "react";
// import isoraLogo from "@resources/images/logo/isora-tv-logo.png";
// import refreshBtnImg from "@resources/images/icon/refresh-btn.png";
// import { RefreshIconTV } from "@components/common/svgIcons";
import { Button } from "antd";
import { calulateTimeByCurrent, eventEmitter } from "../utils/helpers";
import { useHistory } from "react-router-dom";
import moment from "moment";
import DatePicker from "../components/common/DatePicker";
import IconRefresh from "assets/svg/ic-reload.svg";
import IconSetting from "assets/svg/ic-setting.svg";
import ModalTheme from "./modal-theme";
import { HOST } from "client/request";
import { useSelector } from "react-redux";

const Header = (props) => {
  const {
    onRefresh,
    pageTitle = "Số liệu bệnh viện",
    onChangeDate,
    date,
    tabFilter,
    disabledFilter,
    allowFuturePicker = false,
    picker,
    format = "DD/MM/YYYY",
  } = props;

  const { auth } = useSelector((state) => state.auth);
  const history = useHistory();
  const refModalTheme = useRef();

  const time = useMemo(() => {
    return calulateTimeByCurrent();
  }, []);

  const handleRefresh = () => {
    // countLuotTruyCap();
    onRefresh && onRefresh();
  };

  const handleChangeTheme = () => {
    if (refModalTheme.current) refModalTheme.current.open();
  };

  const handleOnChangeDate = useCallback((value) => {
    onChangeDate && onChangeDate(value);
  }, []);

  useEffect(() => {
    eventEmitter.emit("update-showing-header", false);
    const intervalId = setInterval(() => {
      const timerMm = document.getElementById("timer-mm");
      const timerSs = document.getElementById("timer-ss");
      if (parseInt(timerSs.innerText) === 0) {
        if (parseInt(timerMm.innerText) === 0) {
          handleRefresh();
          onChangeDate && onChangeDate(moment());
          const calTime = calulateTimeByCurrent();
          timerSs.innerText = calTime.ss;
          timerMm.innerText = calTime.mm;
        } else {
          timerSs.innerText = "59";
          timerMm.innerText = (parseInt(timerMm.innerText) - 1).toString();
        }
      } else {
        timerSs.innerText = (parseInt(timerSs.innerText) - 1).toString();
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
      eventEmitter.emit(
        "update-showing-header",
        localStorage.getItem("hidenHeader") != "true"
      );
    };
  }, []);

  const caretLeftClick = useCallback(() => {
    if (disabledFilter) return;
    onChangeDate &&
      onChangeDate(moment(date, "DD/MM/YYYY").clone().subtract(1, "day"));
  }, [date, disabledFilter]);

  const caretRightClick = useCallback(() => {
    if (disabledFilter && !allowFuturePicker) return;
    if (
      moment(date, "DD/MM/YYYY").clone().diff(moment(), "day") >= 0 &&
      !allowFuturePicker
    )
      return;
    onChangeDate &&
      onChangeDate(moment(date, "DD/MM/YYYY").clone().add(1, "day"));
  }, [date, disabledFilter, allowFuturePicker]);

  const gotoPage = (value) => {
    history.push(value);
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          {auth?.benhVien?.ten ? (
            <div className="image">
              <img
                onClick={() => gotoPage("/")}
                className="isofh"
                src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
                alt=""
              />
            </div>
          ) : (
            <span onClick={() => gotoPage("/")} className="isofh-white"></span>
          )}

          <span className="title-text">{pageTitle}</span>
        </div>
        {tabFilter && tabFilter}
        <div className="refresh-with-timer">
          {date && (
            <>
              <div className="filter-date">
                <div
                  className="caret-left"
                  title={moment(date, "DD/MM/YYYY")
                    .subtract(1, "d")
                    .format("DD/MM/YYYY")}
                  onClick={caretLeftClick}
                  disabled={disabledFilter}
                ></div>
                <DatePicker
                  format={format}
                  onChange={handleOnChangeDate}
                  value={moment(date, "DD/MM/YYYY")}
                  allowClear={false}
                  disabled={disabledFilter}
                  picker={picker}
                  disabledDate={(d) => d > moment() && !allowFuturePicker}
                />
                {(moment(date, "DD/MM/YYYY").clone().diff(moment(), "day") <
                  0 ||
                  allowFuturePicker) && (
                  <div
                    className="caret-right"
                    title={moment(date, "DD/MM/YYYY")
                      .add(1, "d")
                      .format("DD/MM/YYYY")}
                    onClick={caretRightClick}
                    disabled={disabledFilter && !allowFuturePicker}
                  ></div>
                )}
              </div>
            </>
          )}
          <span className="time-label">Tự động cập nhật sau</span>
          <span className="time-content">
            <span id="timer-mm">{time.mm}</span>&nbsp;phút&nbsp;
            <span id="timer-ss">{time.ss}</span>&nbsp;giây
          </span>
          <Button
            type="link"
            onClick={handleRefresh}
            disabled={disabledFilter}
            title="Cập nhật lại số liệu"
            className="btn-top-right"
          >
            <IconRefresh style={{ width: "2vw", height: "2vw" }} />
            {/* {window.matchMedia('(min-width: 2700px)').matches ? (
              RefreshIconTV
            ) : (
              <img className="refresh-btn-img" src={refreshBtnImg} />
            )} */}
          </Button>
          <Button
            type="link"
            onClick={handleChangeTheme}
            // disabled={disabledFilter}
            title="Cập nhật lại số liệu"
            className="btn-top-right"
          >
            <IconSetting style={{ width: "2vw", height: "2vw" }} />
          </Button>
        </div>
      </div>
      <ModalTheme ref={refModalTheme}></ModalTheme>
    </>
  );
};

export default React.memo(Header);
