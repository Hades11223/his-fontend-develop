import { Input, Button } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled, GlobalStyle } from "./styled";
import Search from "assets/images/welcome/search.png";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "components";
import IconSearch from "assets/images/xetNghiem/icSearch.png";

const CustomPopover = (props, ref) => {
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    khoa: { getListAllKhoa },
    nhanVien: { getListAllNhanVien },
    quanLyNoiTru: { onChangeInputSearch, onSearch },
  } = useDispatch();
  const {
    khoa: { listAllKhoa },
    nhanVien: { listAllNhanVien },
  } = useSelector((state) => state);
  useEffect(() => {
    getListAllKhoa({ page: "", size: "" });
    getListAllNhanVien({ page: "", size: "" });
  }, []);

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
    if ("" === value || null == value) {
      onSearch({ page: 0, size: 10, dataSearch: {} });
    }
    setState({ [key]: value });
  };
  const onKeyDown = (type) => (e) => {
    if (e?.key === "Enter") {
      const value = e.target ? e.target?.value : e;
      onChangeInputSearch({ [type]: `${value}`.trim() });
      setState({ show: false });
    }
  };

  const onSearchDocument = () => {
    const { maNb, khoaNhapVienId, bacSiKetLuanId } = state;
    onChangeInputSearch({
      maNb,
      khoaNhapVienId,
      bacSiKetLuanId,
    });
    setState({ show: false });
  };

  const content = () => (
    <Main>
      <GlobalStyle />
      <div className="content-popover">
        <Input
          placeholder="Nhập tìm mã người bệnh"
          bordered={false}
          onChange={onChange("maNb")}
          onKeyDown={onKeyDown("maNb")}
          suffix={<img src={IconSearch} alt="IcDown" className="ic-down" />}
        ></Input>
        <label style={{ paddingTop: "10px", fontSize: "13px" }}>
          Khoa nhập viện
        </label>
        <Select
          placeholder="Khoa nhập viện"
          bordered={false}
          data={listAllKhoa}
          onChange={onChange("khoaNhapVienId")}
        ></Select>
        <Select
          placeholder="Nhập tìm tên bác sĩ chỉ định"
          bordered={false}
          data={listAllNhanVien}
          onChange={onChange("bacSiKetLuanId")}
        ></Select>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onSearchDocument()}>
            <img src={Search} alt="..." />
            <span>Tìm</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      trigger="click"
      visible={state.show}
      placement="bottomLeft"
      overlayClassName="custom-popover"
      onVisibleChange={() => onCancel()}
    ></PopoverStyled>
  );
};

export default forwardRef(CustomPopover);
