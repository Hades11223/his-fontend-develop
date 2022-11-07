import { DatePicker, Row, Col } from "antd";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
} from "react";
import { Main, PopoverStyled, GlobalStyles } from "./styled";
import Calendar from "assets/images/kho/calendar.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Button } from "components";

const DateDropdown = (
  {
    keyFrom,
    keyTo,
    ignoreKeys = [],
    onSelectedDate,
    setStateParent,
    children,
    ...props
  },
  ref
) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  const onCancel = (show) => {
    setState({
      tuyChon: false,
      from: "",
      to: "",
      show,
    });
  };

  const onChangeDate = (key) => (e) => {
    setState({
      [key]: e?.format("DD/MM/YYYY"),
    });
    setStateParent &&
      setStateParent({
        [key === "to"
          ? keyTo || "selectedDateTo"
          : keyFrom || "selectedDateFrom"]: e,
      });
  };
  const submit = async (e) => {
    if (!state.from || !state.to) {
      setState({
        isCheckValidateDate: true,
      });
    } else {
      onSelectedDate &&
        onSelectedDate({
          ...state,
          tuThoiGianVaoVien: moment(state.from, "DD/MM/YYYY"),
          denThoiGianVaoVien: moment(state.to, "DD/MM/YYYY"),
        });
      onCancel();
    }
  };
  const listOptions = useMemo(() => {
    return [
      {
        key: "tatCa",
        text: t("common.tatCa"),
      },
      {
        key: "today",
        text: t("khamBenh.dsBenhNhan.homNay"),
        tuThoiGianVaoVien: moment(),
        denThoiGianVaoVien: moment(),
      },
      {
        key: "yesterday",
        text: t("khamBenh.dsBenhNhan.homQua"),
        tuThoiGianVaoVien: moment().subtract(1, "days"),
        denThoiGianVaoVien: moment().subtract(1, "days"),
      },
      {
        key: "last7DaysBefore",
        text: t("khamBenh.dsBenhNhan.bayNgayTruoc"),
        tuThoiGianVaoVien: moment().subtract(6, "days"),
        denThoiGianVaoVien: moment(),
      },
      {
        key: "last30DaysBefore",
        text: t("khamBenh.dsBenhNhan.baMuoiNgayTruoc"),
        tuThoiGianVaoVien: moment().subtract(29, "days"),
        denThoiGianVaoVien: moment(),
      },
      {
        key: "currentMonth",
        text: t("khamBenh.dsBenhNhan.thangHienTai"),
        tuThoiGianVaoVien: moment().startOf("month"),
        denThoiGianVaoVien: moment().endOf("month"),
      },
      {
        key: "lastMonth",
        text: t("khamBenh.dsBenhNhan.thangTruoc"),
        tuThoiGianVaoVien: moment().subtract(1, "months").startOf("month"),
        denThoiGianVaoVien: moment().subtract(1, "months").endOf("month"),
      },
      {
        key: "setting",
        text: t("khamBenh.dsBenhNhan.tuyChon"),
      },
    ];
  }, []);

  const onSelect = (item) => () => {
    const newState = {
      ...item,
      [keyFrom || "selectedDateFrom"]: item.tuThoiGianVaoVien,
      [keyTo || "selectedDateTo"]: item.denThoiGianVaoVien,
      tuyChon: false,
      all: false,
    };
    if (item.key === "setting") {
      newState.tuyChon = true;
      newState.isCheckValidateDate = false;
    } else {
      newState.show = false;
      if (item.key === "tatCa") {
        newState.all = true;
        newState.isCheckValidateDate = false;
      }
      onSelectedDate && onSelectedDate(newState);
    }
    setState(newState);
    setStateParent && setStateParent(newState);
  };
  const content = () => (
    <Main>
      <div className="content-popover">
        <Row gutter={[6]}>
          <Col span={state.tuyChon ? 6 : 24}>
            {listOptions
              .filter(
                (item) => !ignoreKeys?.length || !ignoreKeys.includes(item.key)
              )
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`content-popover_button ${
                      state.key === item.key ? "active" : ""
                    }`}
                    onClick={onSelect(item)}
                  >
                    {item.text}
                  </div>
                );
              })}
          </Col>
          {state.tuyChon && (
            <Col span={state.tuyChon ? 18 : 6} className="optional">
              <div className="title-dropdow">
                {t("khamBenh.dsBenhNhan.tuyChon")}
              </div>
              <Row className="date-content" gutter={[16, 16, 16, 16]}>
                <Col span={12} className="select-date">
                  {t("common.tuNgay")}
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    open={true}
                    getPopupContainer={(node) => node.parentNode}
                    className={"date-name-first"}
                    showToday={false}
                    placeholder={t("common.vuiLongChonNgay")}
                    onChange={onChangeDate("from")}
                    disabledDate={(d) =>
                      !d ||
                      d.isAfter(
                        (state.to &&
                          moment(moment(state.to, "DD/MM/YYYY")).format(
                            "YYYY-MM-DD"
                          )) ||
                          null
                      )
                    }
                    suffixIcon={
                      <img
                        src={Calendar}
                        alt="..."
                        style={{ marginRight: 5 }}
                      />
                    }
                  />
                  {state.isCheckValidateDate && !state.from && (
                    <div style={{ color: "red" }}>
                      {t("khamBenh.dsBenhNhan.vuiLongChonTuNgay")}
                    </div>
                  )}
                </Col>
                <Col span={12} className="select-date">
                  {t("common.denNgay")}
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    open={true}
                    getPopupContainer={(node) => node.parentNode}
                    className={"date-name-seccond"}
                    showToday={false}
                    placeholder={t("common.vuiLongChonNgay")}
                    onChange={onChangeDate("to")}
                    disabledDate={(d) =>
                      !d ||
                      d.isBefore(
                        (state.from &&
                          moment(moment(state.from, "DD/MM/YYYY")).format(
                            "YYYY-MM-DD"
                          )) ||
                          null
                      )
                    }
                    suffixIcon={
                      <img
                        src={Calendar}
                        alt="..."
                        style={{ marginRight: 5 }}
                      />
                    }
                  />
                  {state.isCheckValidateDate && !state.to && (
                    <div style={{ color: "red" }}>
                      {t("khamBenh.dsBenhNhan.vuiLongChonDenNgay")}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="footer">
                <Button
                  type="default"
                  minWidth={100}
                  onClick={() => onCancel(true)}
                >
                  {t("common.huy")}
                </Button>
                <Button type="primary" minWidth={100} onClick={() => submit()}>
                  {t("common.dongY")}
                </Button>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </Main>
  );
  return (
    <>
      <GlobalStyles
        width={state.tuyChon ? 835 : 204}
        height={state.tuyChon ? 472 : "auto"}
      />
      <PopoverStyled
        overlayClassName="popover-modal-date-custom"
        content={content}
        // visible={true}
        trigger="click"
        visible={state.show}
        placement="bottomLeft"
        onVisibleChange={onCancel}
      ></PopoverStyled>
    </>
  );
};
export default forwardRef(DateDropdown);
