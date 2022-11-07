import React, { useMemo, useCallback, useEffect } from "react";
import { HOST } from "client/request";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Main } from "./styled";
import IconRefresh from "assets/svg/ic-reload.svg";
import IconSetting from "assets/svg/ic-setting.svg";
import { Button, DatePicker } from "antd";
import moment from "moment";

const Header = (props) => {
  const {
    allowFuturePicker = false,
    date,
    onChangeDate,
    disabledFilter,
    format = "DD/MM/YYYY",
    onRefresh,
  } = props;
  const { auth } = useSelector((state) => state.auth);

  const history = useHistory();
  const gotoPage = (value) => {
    history.push(value);
  };
  const handleRefresh = () => {
    onRefresh && onRefresh();
  };

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

  const handleChangeTheme = () => {};

  const handleOnChangeDate = useCallback((value) => {
    onChangeDate && onChangeDate(value);
  }, []);

  const time = useMemo((maxTime = 10) => {
    const _min = moment().minute();
    const _sec = moment().second();
    return {
      mm: maxTime - 1 - (_min % maxTime),
      ss: 59 - _sec,
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timerMm = document.getElementById("timer-mm");
      const timerSs = document.getElementById("timer-ss");
      if (parseInt(timerSs.innerText) === 0) {
        if (parseInt(timerMm.innerText) === 0) {
          handleRefresh();
          onChangeDate && onChangeDate(moment());
          const calTime = time();
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
    };
  }, []);

  return (
    <Main>
      <div className="header">
        <div className="header__left">
          {auth?.benhVien?.ten ? (
            <div className="header__left-image">
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
          <h1 className="header__left-title">SỐ LIỆU BỆNH VIỆN</h1>
        </div>
        <div className="header__right">
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
          <span className="time-label">Tự động cập nhật sau </span>
          <span className="timer">
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
    </Main>
  );
};

export default Header;
