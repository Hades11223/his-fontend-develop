import { DatePicker, message, Popover, InputNumber } from "antd";
import { Main } from "./styled";
import IcDelete from "assets/images/kho/delete.png";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChietKhauIcon from "assets/svg/kho/chiet-khau.svg";
import ModalChietKhau from "pages/kho/components/ModalChietKhau";
import InputTimeout from "components/InputTimeout";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { formatterNumber, parserNumber, formatNumber } from "utils";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import PopoverHangHoa from "../PopoverHangHoa";
import TableEmpty from "pages/kho/components/TableEmpty";
import moment from "moment";
import IcCalculator from "assets/images/kho/icCalculator.png";
import Select from "components/Select";
import IcAdd from "assets/images/kho/add-blue.png";
import ModalDanhSachHangHoa from "../ModalDanhSachHangHoa";
import { LOAI_DICH_VU } from "constants/index";

const DanhSachHangHoa = ({ id, onFocusSearchHangHoa, ...props }, ref) => {
  const styleInput = {
    border: "none",
    textAlign: "right",
  };
  const refModalChietKhau = useRef(null);
  const refModalDanhSachHangHoa = useRef(null);
  const [state, setState] = useState({
    data: [],
    soLuongSoCap: 0,
    tongTien: 0,
    thanhTienSuaDoi: 0,
    tongTienChietKhauHangHoa: 0,
  });
  const history = useHistory();

  const {
    xuatXu: { listAllXuatXu },
    phieuNhapXuat: {
      thongTinPhieu,
      dsNhapXuatChiTiet,
      dataSortColumn,
      page = 0,
      size = 10,
      totalElements = 0,
      nhapKhongTheoThau,
    },
    doiTac: { listAllNhaSanXuat },
    thangSoBanLe: { listAllThangSoBanLe },
    kho: { listKhoUser },
  } = useSelector((state) => state);
  const {
    xuatXu: { getListAllXuatXu },
    phieuNhapXuat: { updateData, onSortChange, onSearch: onSearchChiTiet },
    thangSoBanLe: { getListAllThangSoBanLe },
  } = useDispatch();

  const soLuongSoCap =
    dsNhapXuatChiTiet?.reduce(
      (total, x) => (total = total + (x?.soLuongSoCap || 0)),
      0
    ) || 0;
  const tongTien =
    dsNhapXuatChiTiet?.reduce(
      (total, x) =>
        (total =
          total + (x?.loNhap?.giaNhapSauVat || 0) * (x?.soLuongSoCap || 0)),
      0
    ) || 0;
  const chietKhau =
    (parseFloat(thongTinPhieu?.tienChietKhau) || 0) +
    (parseFloat((tongTien * (thongTinPhieu.phanTramChietKhau || 0)) / 100) ||
      0);
  const thanhTien = (tongTien || 0) - (chietKhau || 0) || 0;
  const thanhTienSuaDoi =
    dsNhapXuatChiTiet?.reduce(
      (total, x) => (total = total + x?.thanhTienSuaDoi),
      0
    ) || 0;

  useImperativeHandle(ref, () => ({
    getTong: () => ({
      thanhTien: thanhTien,
      thanhTienSuaDoi: thanhTienSuaDoi,
      phanTramChietKhau: thongTinPhieu.phanTramChietKhau,
      tienChietKhau: chietKhau,
    }),
  }));

  const nhaThuoc = useMemo(() => {
    return (listKhoUser || []).find((x) => x.id === thongTinPhieu.khoId)
      ?.nhaThuoc;
  }, [thongTinPhieu]);

  const isReadOnly = useMemo(() => {
    if (history.location.pathname.includes("chi-tiet")) {
      return true;
    } else {
      return false;
    }
  }, [history.location.pathname]);
  const changeSoLuong = (data) => (value) => {
    if (data?.vatTuBoId > 0) {
      let dataBo = dsNhapXuatChiTiet.find((item) =>
        thongTinPhieu?.quyetDinhThauId
          ? item?.quyetDinhThauChiTietId === data?.vatTuBoId
          : item.dichVuId === data?.vatTuBoId
      );
      const index = dataBo.dsNhapXuatChiTiet.findIndex((item) =>
        data.id ? item.id === data.id : item.detachId === data.detachId
      );
      if (index !== -1) {
        const item = dataBo.dsNhapXuatChiTiet[index];
        const giaKhongBaoHiem =
          item?.loNhap.giaNhapSauVat *
          (1 + (item?.loNhap.thangSoBanLe || 0) / 100);
        item.soLuongSoCap = value;
        item.thanhTienSuaDoi = item?.loNhap?.giaNhapSauVat * value || 0;
        item.loNhap = {
          ...item.loNhap,
          giaKhongBaoHiem: nhaThuoc
            ? Math.floor(giaKhongBaoHiem)
            : giaKhongBaoHiem,
        };
        if (value > 0) {
          item.isFocus = false;
        }

        updateData({
          dsNhapXuatChiTiet: [
            ...dsNhapXuatChiTiet.map((item) => {
              return { ...item, isFocus: false };
            }),
          ],
        });
      }
    } else {
      const index = dsNhapXuatChiTiet.findIndex((item) =>
        data.id ? item.id === data.id : item.detachId === data.detachId
      );
      if (index !== -1) {
        const item = dsNhapXuatChiTiet[index];
        const giaKhongBaoHiem =
          item?.loNhap.giaNhapSauVat *
          (1 + (item?.loNhap.thangSoBanLe || 0) / 100);
        item.soLuongSoCap = value;
        item.thanhTienSuaDoi = item?.loNhap?.giaNhapSauVat * value || 0;
        item.loNhap = {
          ...item.loNhap,
          giaKhongBaoHiem: nhaThuoc
            ? Math.floor(giaKhongBaoHiem)
            : giaKhongBaoHiem,
        };
        if (value > 0) {
          item.isFocus = false;
        }
        updateData({
          dsNhapXuatChiTiet: [...dsNhapXuatChiTiet],
        });
      }
    }
  };

  const changeDSLo = (key, data, index) => async (value) => {
    //TODO: onchange giaNhapSauVat => change thangSoBanLe
    let newData = { [key]: value };
    if (key === "vat") {
      const giaNhapSauVat = (
        (data?.loNhap?.giaNhapTruocVat || 0) *
        (1 + value / 100)
      ).toFixed(2);
      const res = listAllThangSoBanLe.filter(
        (x) =>
          x.giaNhapNhoNhat < giaNhapSauVat &&
          giaNhapSauVat < x.giaNhapLonNhat &&
          x.khoId === thongTinPhieu?.khoId
      );

      let thangSoBanLe = (!res ? 0 : res[0]?.thangSoBanLe) || 0;
      let giaKhongBaoHiem = giaNhapSauVat * (1 + (thangSoBanLe || 0) / 100);
      newData = {
        ...newData,
        giaNhapSauVat: giaNhapSauVat,
        thangSoBanLe,
        giaBaoHiem:
          data?.tyLeBhTt === 0
            ? 0
            : (giaNhapSauVat * (1 + (thangSoBanLe || 0) / 100)).toFixed(2),
        giaKhongBaoHiem: nhaThuoc
          ? Math.floor(giaKhongBaoHiem)
          : giaKhongBaoHiem,
        thanhTienSuaDoi: giaNhapSauVat * data?.soLuongSoCap || 0,
      };
    } else if (key === "giaNhapSauVat") {
      const giaNhapTruocVat = (
        (value || 0) /
        (1 + (data?.loNhap?.vat || 0) / 100)
      ).toFixed(2);
      const res = listAllThangSoBanLe.filter(
        (x) =>
          x.giaNhapNhoNhat < value &&
          value < x.giaNhapLonNhat &&
          x.khoId === thongTinPhieu?.khoId
      );

      let thangSoBanLe = (!res ? 0 : res[0]?.thangSoBanLe) || 0;
      let giaKhongBaoHiem = value * (1 + (thangSoBanLe || 0) / 100);
      newData = {
        ...newData,
        giaBaoHiem:
          data?.tyLeBhTt === 0
            ? 0
            : (value * (1 + (thangSoBanLe || 0) / 100)).toFixed(2),
        giaKhongBaoHiem: nhaThuoc
          ? Math.floor(giaKhongBaoHiem)
          : giaKhongBaoHiem,
        giaNhapTruocVat,
        thangSoBanLe,
        thanhTienSuaDoi: value * data?.soLuongSoCap || 0,
      };
    } else if (key === "giaNhapTruocVat") {
      const giaNhapSauVat = (
        (value || 0) *
        (1 + (data?.loNhap?.vat || 0) / 100)
      ).toFixed(2);
      const res = listAllThangSoBanLe.filter(
        (x) =>
          x.giaNhapNhoNhat < giaNhapSauVat &&
          giaNhapSauVat < x.giaNhapLonNhat &&
          x.khoId === thongTinPhieu?.khoId
      );

      let thangSoBanLe = (!res ? 0 : res[0]?.thangSoBanLe) || 0;
      let giaKhongBaoHiem = giaNhapSauVat * (1 + (thangSoBanLe || 0) / 100);
      newData = {
        ...newData,
        giaNhapSauVat: giaNhapSauVat,
        giaBaoHiem:
          data?.tyLeBhTt === 0
            ? 0
            : (giaNhapSauVat * (1 + (thangSoBanLe || 0) / 100)).toFixed(2),
        giaKhongBaoHiem: nhaThuoc
          ? Math.floor(giaKhongBaoHiem)
          : giaKhongBaoHiem,
        thangSoBanLe,
        thanhTienSuaDoi: giaNhapSauVat * data?.soLuongSoCap || 0,
      };
    } else if (key === "tyLeChietKhau") {
      newData = {
        ...newData,
        tienChietKhau: null,
      };
    } else if (key === "tienChietKhau") {
      newData = {
        ...newData,
        tyLeChietKhau: null,
      };
    } else if (key === "soLuongSoCap") {
      if (
        data?.quyetDinhThauId &&
        value > (data?.chiTietThau?.soLuongConLai || 0)
      ) {
        message.error("Số lượng nhập vào lớn hơn Số lượng còn lại của thầu");
      }
    } else if (key === "ngayHanSuDung") {
      newData.ngayHanSuDung = newData.ngayHanSuDung.format("YYYY-MM-DD");
    }
    if (data?.vatTuBoId > 0) {
      let dataBo = dsNhapXuatChiTiet.find((item) =>
        thongTinPhieu?.quyetDinhThauId
          ? item?.quyetDinhThauChiTietId === data?.vatTuBoId
          : item.dichVuId === data?.vatTuBoId
      );
      const index = dataBo?.dsNhapXuatChiTiet.findIndex((item) =>
        data.id ? item.id === data.id : item.detachId === data.detachId
      );
      if (index !== -1) {
        const item = dataBo?.dsNhapXuatChiTiet[index];
        if (key === "thanhTienSuaDoi") {
          item.thanhTienSuaDoi = value;
        }
        item.loNhap = { ...item.loNhap, ...newData };
        item.thanhTienSuaDoi =
          newData.thanhTienSuaDoi || data.thanhTienSuaDoi || 0;
        item.isFocus = false;
        updateData({
          dsNhapXuatChiTiet: [
            ...dsNhapXuatChiTiet.map((item) => {
              return { ...item, isFocus: false };
            }),
          ],
        });
      }
    } else {
      const index = dsNhapXuatChiTiet.findIndex((item) =>
        data.id ? item.id === data.id : item.detachId === data.detachId
      );
      if (index !== -1) {
        const item = dsNhapXuatChiTiet[index];
        if (key === "thanhTienSuaDoi") {
          item.thanhTienSuaDoi = value;
        }
        item.loNhap = { ...item.loNhap, ...newData };
        item.isFocus = false;
        item.thanhTienSuaDoi =
          newData.thanhTienSuaDoi || data.thanhTienSuaDoi || 0;
        updateData({
          dsNhapXuatChiTiet: [...dsNhapXuatChiTiet],
        });
      }
    }
  };
  useEffect(() => {
    let ds = dsNhapXuatChiTiet?.filter((x) => x.isFocus);
    if (ds?.length) {
      let item = ds?.[ds.length - 1]?.id
        ? ds?.[ds.length - 1]?.id
        : ds?.[ds.length - 1]?.detachId;
      document.getElementById(item).focus();
    }
  }, [dsNhapXuatChiTiet]);

  const onClickSort = (key, value) => {
    if (!dsNhapXuatChiTiet || dsNhapXuatChiTiet?.length < 1) return;
    onSortChange({
      [key]: value,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      key: "stt",
      width: "5%",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (_, data, index) => {
        return index % 2 === 1 ? (
          {
            children: (
              <div className="">
                <div className="">
                  <div className="d-flex flex">
                    <div className="per20 flex">
                      <span className="mr5">Mã hiệu:</span>
                      <div className="f1">
                        <InputTimeout
                          onChange={changeDSLo("maKyHieu", data)}
                          placeholder="Nhập mã hiệu"
                          value={data?.loNhap?.maKyHieu}
                          className={"per100"}
                        />
                      </div>
                    </div>
                    <div className="per15 flex">
                      <span
                        className="mr5"
                        style={{
                          color: `${data.loNhap?.soLo && data?.loaiDichVu !== LOAI_DICH_VU.THUOC ? "" : "red"}`,
                        }}
                      >
                        Số lô:
                      </span>
                      <InputTimeout
                        onChange={changeDSLo("soLo", data)}
                        placeholder="Nhập số lô"
                        value={data?.loNhap?.soLo}
                        className={"per100"}
                      />
                    </div>
                    <div className="per15 flex">
                      <span
                        className="mr5"
                        style={{
                          color: `${data.loNhap?.ngayHanSuDung && data?.loaiDichVu !== LOAI_DICH_VU.THUOC ? "" : "red"}`,
                        }}
                      >
                        HSD:
                      </span>
                      <DatePicker
                        placeholder="Chọn ngày"
                        format={"DD/MM/YYYY"}
                        value={
                          data?.loNhap?.ngayHanSuDung &&
                          moment(data?.loNhap?.ngayHanSuDung)
                        }
                        onChange={changeDSLo("ngayHanSuDung", data)}
                        className={"per100"}
                      />
                    </div>
                    <div className="per15 flex">
                      <span className="mr5">Thặng số bán lẻ:</span>
                      <div className="f1">
                        <InputNumber
                          className={"per100"}
                          min={0}
                          formatter={(value) => formatterNumber(value)}
                          parser={(value) => parserNumber(value)}
                          value={data.loNhap?.thangSoBanLe}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="per20 flex">
                      <span
                        className="mr5"
                        style={{
                          color: `${data.loNhap?.xuatXuId ? "" : "red"}`,
                        }}
                      >
                        Xuất xứ:
                      </span>
                      <div className="f1">
                        <Select
                          className="per100"
                          placeholder="Chọn xuất xứ"
                          data={listAllXuatXu}
                          onChange={changeDSLo("xuatXuId", data)}
                          disabled={!!thongTinPhieu.quyetDinhThauId}
                          value={data.loNhap?.xuatXuId}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex" style={{ marginTop: "10px" }}>
                    <div className="per20 flex">
                      <span className="mr5">Đơn giá BH:</span>
                      <div className="f1">
                        <InputNumber
                          min={0}
                          // onChange={changeDSLo("giaBaoHiem", data)}
                          placeholder="Nhập đơn giá bảo hiểm"
                          value={data?.loNhap?.giaBaoHiem}
                          formatter={(value) => formatterNumber(value)}
                          parser={(value) => parserNumber(value)}
                          className="per100"
                          disabled={!nhapKhongTheoThau}
                        />
                      </div>
                    </div>
                    <div className="per18 flex">
                      <span className="mr5">Đơn giá không BH:</span>
                      <div className="f1">
                        <InputNumber
                          className="per100"
                          min={0}
                          // onChange={changeDSLo("giaKhongBaoHiem", data)}
                          formatter={(value) => formatterNumber(value)}
                          parser={(value) => parserNumber(value)}
                          placeholder="Nhập đơn giá không bảo hiểm"
                          value={data?.loNhap?.giaKhongBaoHiem}
                          disabled={!nhapKhongTheoThau}
                        />
                      </div>
                    </div>
                    <div className="per16 flex">
                      <span className="mr5">Phụ thu:</span>
                      <InputNumber
                        className={"per100"}
                        min={0}
                        onChange={(e) => {
                          const value =
                            !isNaN(parseFloat(e)) && parseFloat(e) > 0
                              ? parseFloat(e) % 1.0 === 0.0
                                ? parseInt(e)
                                : parseFloat(e)
                              : 0;
                          changeDSLo("giaPhuThu", data)(value);
                        }}
                        formatter={(value) => formatterNumber(value)}
                        parser={(value) => parserNumber(value)}
                        placeholder="Nhập phụ thu"
                        value={data.loNhap?.giaPhuThu}
                        disabled={!nhapKhongTheoThau}
                      />
                    </div>
                    <div className="per30 flex">
                      <span className="mr5">Nhà sản xuất:</span>
                      <div className="f1">
                        <Select
                          className="per16"
                          placeholder="Chọn nhà sản xuất"
                          data={listAllNhaSanXuat}
                          onChange={changeDSLo("nhaSanXuatId", data)}
                          disabled={!!thongTinPhieu.quyetDinhThauId}
                          value={data.loNhap?.nhaSanXuatId}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            props: {
              colSpan: 7,
            },
          }
        ) : (
          <div> {data?.index}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="dichVu.dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ma"] || 0}
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: "15%",
      render: (item, data, index) => {
        return index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <PopoverHangHoa data={data}>
            <div className="item-ma">{item}</div>
          </PopoverHangHoa>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="dichVu.dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ten"] || 0}
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "30%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div>
            <PopoverHangHoa data={data}>
              <div className="item-ten">{item}</div>
            </PopoverHangHoa>
            <div>
              <InputTimeout
                style={{ width: "80%", padding: 0, color: "#777" }}
                onChange={changeDSLo("ghiChu", data)}
                value={data?.loNhap?.ghiChu}
                placeholder="Ghi chú"
              />
            </div>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="SL"
          sort_key="soLuongSoCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soLuongSoCap || 0}
        />
      ),
      dataIndex: "soLuongSoCap",
      key: "soLuongSoCap",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1 + (data?.tenDvtSoCap || data?.dvtSoCap?.ten),
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div style={{ display: "flex" }}>
            <InputNumber
              id={data.id ? data.id : data.detachId}
              min={0}
              placeholder="Nhập số lượng"
              style={{ width: "80%", textAlign: "center" }}
              value={data?.soLuongSoCap}
              parser={(value) => parserNumber(value)}
              formatter={(value) => formatterNumber(value)}
              // autoFocus={true}
              onChange={(e) => {
                const value =
                  !isNaN(parseFloat(e)) && parseFloat(e) > 0
                    ? parseFloat(e) % 1.0 === 0.0
                      ? parseInt(e)
                      : parseFloat(e)
                    : 0;
                changeSoLuong(data)(value);
              }}
            />
            <span style={{ display: "flex", alignItems: "end" }}>
              {data?.tenDvtSoCap || data?.dvtSoCap?.ten}
            </span>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Giá sau VAT"
          sort_key="loNhap.giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["loNhap.giaNhapSauVat"] || 0}
        />
      ),
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div>
            <Popover
              trigger="click"
              placement="bottomRight"
              overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
              content={
                <div>
                  <label>Giá nhập trước VAT</label>
                  <InputNumber
                    min={0}
                    formatter={(value) => formatterNumber(value)}
                    parser={(value) => parserNumber(value)}
                    onChange={(e) => {
                      const value =
                        !isNaN(parseFloat(e)) && parseFloat(e) > 0
                          ? parseFloat(e) % 1.0 === 0.0
                            ? parseInt(e)
                            : parseFloat(e)
                          : 0;
                      changeDSLo("giaNhapTruocVat", data)(value);
                    }}
                    placeholder="Nhập giá trước VAT"
                    value={data?.loNhap?.giaNhapTruocVat}
                    style={styleInput}
                  />
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>VAT</label>
                  <InputNumber
                    min={0}
                    parser={(value) => parserNumber(value)}
                    formatter={(value) => formatterNumber(value)}
                    onChange={(e) => {
                      const value =
                        !isNaN(parseFloat(e)) && parseFloat(e) > 0
                          ? parseFloat(e) % 1.0 === 0.0
                            ? parseInt(e)
                            : parseFloat(e)
                          : 0;
                      changeDSLo("vat", data)(value);
                    }}
                    placeholder="Nhập vat"
                    value={data?.loNhap?.vat}
                    style={styleInput}
                  />
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Giá nhập sau VAT</label>
                  <InputNumber
                    min={0}
                    formatter={(value) => formatterNumber(value)}
                    parser={(value) => parserNumber(value)}
                    onChange={(e) => {
                      const value =
                        !isNaN(parseFloat(e)) && parseFloat(e) > 0
                          ? parseFloat(e) % 1.0 === 0.0
                            ? parseInt(e)
                            : parseFloat(e)
                          : 0;
                      changeDSLo("giaNhapSauVat", data)(value);
                    }}
                    placeholder="Nhập giá sau VAT"
                    value={data?.loNhap?.giaNhapSauVat}
                    style={styleInput}
                  />
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                </div>
              }
            >
              <div style={{ display: "flex" }}>
                <InputNumber
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  style={{ width: "100%", textAlign: "right" }}
                  value={data?.loNhap?.giaNhapSauVat || 0}
                  readOnly
                ></InputNumber>

                <img src={IcCalculator} alt="..." />
              </div>
            </Popover>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTien || 0}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1 + data?.ten,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div>
            <Popover
              trigger="click"
              placement="bottomRight"
              overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
              content={
                <div>
                  <label>Thành tiền sửa đổi</label>
                  <InputNumber
                    min={0}
                    formatter={(value) => formatterNumber(value)}
                    parser={(value) => parserNumber(value)}
                    value={data?.thanhTienSuaDoi}
                    style={styleInput}
                    onChange={(e) => {
                      const value =
                        !isNaN(parseFloat(e)) && parseFloat(e) > 0
                          ? parseFloat(e) % 1.0 === 0.0
                            ? parseInt(e)
                            : parseFloat(e)
                          : 0;
                      changeDSLo("thanhTienSuaDoi", data, index)(value);
                    }}
                  />
                </div>
              }
            >
              <div style={{ display: "flex" }}>
                <InputNumber
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  style={{ width: "100%", textAlign: "right" }}
                  value={data?.thanhTienSuaDoi?.toFixed(2)}
                  readOnly
                />
                <img src={IcCalculator} alt="..." />
              </div>
            </Popover>
          </div>
        ),
    },
    {
      title: <HeaderSearch title="" />,
      key: "delete",
      width: "5%",
      align: "center",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div className="icon">
            <img
              onClick={() => {
                updateData({
                  dsNhapXuatChiTiet: dsNhapXuatChiTiet.filter((item) =>
                    data.id
                      ? item.id !== data.id
                      : item.detachId !== data.detachId
                  ),
                });
              }}
              style={{ cursor: "pointer", width: "15px" }}
              src={IcDelete}
              alt="..."
            />
            {data?.vatTuBo && (
              <img
                onClick={() => onShowDsHangHoa(data?.dichVuId, data)}
                style={{ cursor: "pointer", width: "18px", marginTop: "5px" }}
                src={IcAdd}
                alt="..."
              />
            )}
          </div>
        ),
    },
  ];
  const dataSource = useMemo(() => {
    let data = [];
    (dsNhapXuatChiTiet || []).map((item, index) => {
      data.push({ ...item, index: index + 1 });
      (item.dsNhapXuatChiTiet || []).map((item2, index2) => {
        data.push({
          ...item2,
          index: index + 1 + "." + (index2 + 1),
          ma: item2?.dichVu?.ma || item2?.ma,
          ten: item2?.dichVu?.ten || item2?.ten,
        });
      });
    });

    return (data || []).reduce((a, item, index) => {
      return [
        ...a,
        {
          ...item,
          rowId: index,
        },
        {
          ...item,
          rowId: index + "_",
        },
      ];
    }, []);
  }, [dsNhapXuatChiTiet]);
  const showModalChietKhau = () => (e) => {
    if (refModalChietKhau.current) {
      refModalChietKhau.current.show({ isReadOnly });
    }
  };

  useEffect(() => {
    getListAllXuatXu();
    getListAllThangSoBanLe();
  }, []);

  const onChangePage = (page) => {
    onSearchChiTiet({ page: page - 1 });
  };

  const onChangeSize = (size) => {
    props.onSizeChange({ size: size });
  };

  const onShowDsHangHoa = (e, data) => {
    refModalDanhSachHangHoa.current.show(
      { vatTuBoId: e, data, hiddenButon: true },
      (data) => {
        // onSelectQDTChiTiet({ data });
      }
    );
  };

  return (
    <Main>
      <TableWrapper
        style={{
          marginRight: "-1px",
          height: "550px",
          overflowY: "auto",
        }}
        className="danh-sach-hang-hoa"
        locale={{
          emptyText: (
            <TableEmpty
              onClickButton={onFocusSearchHangHoa}
              showButton={true}
            />
          ),
        }}
        showSorterTooltip={false}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "level-1" : "level-2"
        }
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.rowId}
      />
      <div className="">
        {id && id != "them-moi" && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={onChangeSize}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
        <div
          className="d-flex flex-end pt-2 border-top"
          style={{ justifyContent: "end", marginRight: "20px" }}
        >
          <div className="text-right pr-4">
            <label>Tổng số lượng: </label>
            <label>Tổng tiền: </label>
            <label className="text-blue pointer" onClick={showModalChietKhau()}>
              <span>
                <ChietKhauIcon />
              </span>
              <span style={{ marginLeft: "5px" }}>Chiết khấu: </span>
            </label>
            <label>Thành tiền: </label>
            <label>Thành tiền sửa đổi: </label>
          </div>
          <div className="text-right pr-2" style={{ marginLeft: "5px" }}>
            <label>{formatNumber(soLuongSoCap)}</label>
            <label>{formatNumber(tongTien)}</label>
            <label>{formatNumber(chietKhau)}</label>
            <label>{formatNumber(thanhTien)}</label>
            <label>{formatNumber(thanhTienSuaDoi)}</label>
          </div>
        </div>
      </div>
      <ModalChietKhau ref={refModalChietKhau} />
      <ModalDanhSachHangHoa ref={refModalDanhSachHangHoa} />
    </Main>
  );
};

export default forwardRef(DanhSachHangHoa);
