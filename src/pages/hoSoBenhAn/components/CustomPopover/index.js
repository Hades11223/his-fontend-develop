import { DatePicker, Input, Button, InputNumber } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import { connect } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const CustomPopover = ({ onSearch, onChangeInputSearch, ...props }, ref) => {
  const { t } = useTranslation();

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {}, []);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else value = e;
    if ("" == value || null == value) {
      onSearch({ page: 0, size: 10, dataSearch: {} });
    }
    setState({ [key]: value });
  };

  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    if ("" == value) {
      onSearch({ page: 0, size: 10, dataSearch: {} });
    }
    setState({ [`tu${key}`]: value, [`den${key}`]: value1 });
  };

  const onKeyDown = (type) => (e) => {
    if (e?.key == "Enter") {
      const value = e.target ? e.target?.value : e;
      onChangeInputSearch({ [type]: `${value}`.trim() });
    }
  };

  const onSearchDocument = () => {
    const {
      maTheBhyt,
      tuoi,
      tuNgaySinh,
      denNgaySinh,
      tuThoiGianVaoVien,
      denThoiGianVaoVien,
    } = state;
    onChangeInputSearch({
      maTheBhyt,
      tuoi,
      tuNgaySinh,
      denNgaySinh,
      tuThoiGianVaoVien,
      denThoiGianVaoVien,
    });
  };

  const defaultDate = () => {
    return [undefined, moment(new Date(), "DD/MM/YYYY")];
  };

  const content = () => (
    <Main>
      <div className="content-popover">
        <Input
          placeholder={t("common.soBHYT")}
          bordered={false}
          onChange={onChange("maTheBhyt")}
          onKeyDown={onKeyDown("maTheBhyt")}
        ></Input>
        <InputNumber
          className="input-number"
          placeholder={t("hsba.nhapGiaTriTuoiNhoNhatCanTin")}
          bordered={false}
          onChange={onChange("tuoi")}
        ></InputNumber>
        <div className="date">
          <div>
            <label>{t("common.ngaySinh")}</label>
            <RangePicker
              placeholder={[t("common.tuNgay"), t("common.denNgay")]}
              bordered={false}
              defaultValue={defaultDate()}
              format="DD / MM / YYYY"
              onChange={onChangeDate("NgaySinh")}
            ></RangePicker>
          </div>
        </div>
        <div className="date">
          <div>
            <label>{t("hsba.ngayDangKy")}</label>
            <RangePicker
              placeholder={[t("common.tuNgay"), t("common.denNgay")]}
              bordered={false}
              defaultValue={defaultDate()}
              format="DD / MM / YYYY"
              onChange={onChangeDate("ThoiGianVaoVien")}
            ></RangePicker>
          </div>
        </div>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onSearchDocument()}>
            <img src={Search} alt="..." />
            <span>{t("common.tim")}</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      visible={state.show}
      placement="bottomLeft"
      onVisibleChange={() => onCancel()}
    ></PopoverStyled>
  );
};

export default connect(
  (state) => ({}),
  ({ information: { onChangeInputSearch, onSearch } }) => ({
    onSearch,
    onChangeInputSearch,
  }),
  null,
  {
    forwardRef: true,
  }
)(forwardRef(CustomPopover));
