import React, {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import ModalDanhSachHangHoa from "../ModalDanhSachHangHoa";
import Header1 from "pages/kho/components/Header1";
import InputSearch from "pages/kho/components/InputSearch";
import IcDown from "assets/images/xetNghiem/icDown.png";
import InputTimeout from "components/InputTimeout";
import { useParams } from "react-router-dom";
import { Main } from "./styled";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const SeachHangHoa = forwardRef(({ isEdit, ...props }, ref) => {
  const { id } = useParams();
  const history = useHistory();

  const {
    phieuNhapXuat: { thongTinPhieu, nhapKhongTheoThau },
    quyetDinhThauChiTiet: { listQuyetDinhThauChiTiet },
    kho: { currentItem: khoHienTai },
  } = useSelector((state) => state);
  const {
    quyetDinhThauChiTiet: {
      onSearch: onSearchQDTCT,
      updateData: updateDataQDTCT,
      onSelectQDTChiTiet,
    },
    phieuNhapXuat: { onSearch: onSearchChiTiet },
  } = useDispatch();

  const refSearchHangHoa = useRef();
  const refKeyDownTime = useRef(null);
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

  const onFocus = () => {
    onSearchQDTCT({
      dataSearch: {
        timKiem: "",
        ten: "",
        dichVuId: "",
        quyetDinhThauId: thongTinPhieu?.quyetDinhThauId,
        nhaCungCapId: thongTinPhieu?.nhaCungCapId,
        dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        thau: history.location.pathname.includes("chinh-sua")
          ? !!thongTinPhieu?.quyetDinhThauId
          : !nhapKhongTheoThau,
        active: true,
        dsMucDichSuDung: khoHienTai.nhaThuoc ? 20 : 10,
      },
      page: 0,
      size: 10,
      fromTongHop: true,
    });
    setState({ show: true });
  };
  const listDsDichVu = useMemo(() => {
    return listQuyetDinhThauChiTiet
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
  }, [listQuyetDinhThauChiTiet]);

  const onSearch = (type) => (e) => {
    if (!refKeyDownTime.current || new Date() - refKeyDownTime.current > 3000) {
      const value = e?.target ? e?.target?.value : e;
      if (!value) {
        updateDataQDTCT({ listQuyetDinhThauChiTiet: [] });
      }
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
        refTimeOut.current = null;
      }
      refTimeOut.current = setTimeout(() => {
        setState({ [type]: value });
        onSearchQDTCT({
          page: 0,
          size: 10,
          fromTongHop: true,
          dataSearch: {
            ten: "",
            dichVuId: "",
            [type]: value,
            quyetDinhThauId: thongTinPhieu?.quyetDinhThauId,
            nhaCungCapId: thongTinPhieu?.nhaCungCapId,
            dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
            thau: !nhapKhongTheoThau,
            active: true,
            dsMucDichSuDung: khoHienTai.nhaThuoc ? 20 : 10,
          },
        });
      }, 300);
    }
    setState({ show: true });
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      refKeyDownTime.current = new Date();
      if (e.target?.value)
        refModalDanhSachHangHoa.current.show(
          { ten: e.target?.value },
          (data) => {
            onSelectQDTChiTiet({ data });
          }
        );
      setState({ show: false });
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
    refModalDanhSachHangHoa.current.show({ ten: e }, (data) => {
      onSelectQDTChiTiet({ data });
    });
  };
  const onSearchData = (value) => {
    onSearchChiTiet({
      phieuNhapXuatId: id,
      page: 0,
      dataSearch: { timKiem: value },
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
        <ModalDanhSachHangHoa ref={refModalDanhSachHangHoa} />
      </Header1>
    </Main>
  );
});

export default SeachHangHoa;
