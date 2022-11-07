import React, {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
// import ModalDanhSachHangHoa from "../ModalDanhSachHangHoa";
import Header1 from "pages/kho/components/Header1";
import InputSearch from "pages/kho/components/InputSearch";
import InputTimeout from "components/InputTimeout";
import IcDown from "assets/images/xetNghiem/icDown.png";
import { useParams } from "react-router-dom";
import { Main } from "./styled";
const { Option } = Select;

const SearchHangHoa = forwardRef(({ isEdit, ...props }, ref) => {
  const { id } = useParams();
  const {
    phieuNhapXuat: { thongTinPhieu },
    tonKho: { listData },
  } = useSelector((state) => state);
  const {
    tonKho: { onSearch: onSearchTonKho, updateData: updateDataTonKho },
    phieuNhapXuat: { onSelectMultiItem, onSearch: onSearchChiTiet },
  } = useDispatch();
  const refKeyDownTime = useRef(null);
  const refSearchHangHoa = useRef();
  const refTimeOut = useRef(null);
  const refModalDanhSachHangHoa = useRef(null);
  const [state, _setState] = useState({
    focusSearch: false,
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show,
  }));
  const show = () => {
    refSearchHangHoa.current.focus();
    setState({ show: true });
  };

  const getDataSearch = (search = {}) => {
    let dataSearch = {
      khoId: thongTinPhieu?.khoId,
    };
    return {
      ...dataSearch,
      ...search,
      phieuNhapId:
        thongTinPhieu.loaiNhapXuat == 40 ? thongTinPhieu.phieuNhapId : "",
    };
  };

  const onSearchData = (value) => {
    onSearchChiTiet({
      phieuNhapXuatId: id,
      page: 0,
      dataSearch: { timKiem: value },
    });
  };

  const onFocus = () => {
    onSearchTonKho({
      dataSearch: getDataSearch({ timKiem: "", ten: "" }),
      page: 0,
      size: 10,
      fromTongHop: true,
      theoLo: thongTinPhieu.loaiNhapXuat == 40,
    });
    setState({ show: true });
  };
  const listDsDichVu = useMemo(() => {
    return listData
      ?.map((item) => item?.ten)
      .filter((item, index, self) => {
        return self.indexOf(item) === index;
      })
      .map((item, index) => {
        return (
          <Option key={index} value={item}>
            {item}
          </Option>
        );
      });
  }, [listData]);

  const onSearch = (type) => (e) => {
    if (!refKeyDownTime.current || new Date() - refKeyDownTime.current > 3000) {
      const value = e?.target ? e?.target?.value : e;
      if (!value) {
        updateDataTonKho({ listData: [] });
      }
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
        refTimeOut.current = null;
      }
      refTimeOut.current = setTimeout(() => {
        setState({ [type]: value });
        onSearchTonKho({
          page: 0,
          size: 10,
          fromTongHop: true,
          dataSearch: getDataSearch({ [type]: value }),
        });
      }, 300);
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      e.stopPropagation();
      refKeyDownTime.current = new Date();
      if (e.target?.value) {
        setState({ show: false });
        refModalDanhSachHangHoa.current.show(
          { ten: e.target?.value },
          (data) => {
            onSelectMultiItem({ data });
          }
        );
      }
    }
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };

  const onShowDsHangHoa = (e) => {
    setState({ show: false });
    refModalDanhSachHangHoa.current.show({ ten: e }, (data) => {
      onSelectMultiItem({ data });
    });
  };

  return (
    <Main>
      <Header1 title="Thông tin hàng hóa" titleMinWidth={150}>
        <InputSearch>
          {!isEdit ? (
            <InputTimeout
              placeholder="Nhập tên hàng hóa"
              onChange={onSearchData}
            />
          ) : (
            <Select
              ref={refSearchHangHoa}
              showSearch
              allowClear
              onBlur={() => {
                setState({ show: false });
              }}
              value={null}
              onFocus={onFocus}
              open={state.show}
              onClear={() => {}}
              placeholder="Nhập tên hàng hóa"
              onSearch={onSearch("timKiem")}
              onKeyDown={onKeyDown}
              onSelect={onShowDsHangHoa}
              filterOption={filterOption}
              suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
            >
              {listDsDichVu}
            </Select>
          )}
        </InputSearch>
        {/* <ModalDanhSachHangHoa ref={refModalDanhSachHangHoa} /> */}
      </Header1>
    </Main>
  );
});

export default SearchHangHoa;
