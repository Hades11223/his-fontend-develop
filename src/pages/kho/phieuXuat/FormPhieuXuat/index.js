import React, { memo, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Col, Row, Input, Form } from "antd";
import { HINH_THUC_NHAP_XUAT } from "constants/index";
import { Main } from "./styled";
import Header1 from "pages/kho/components/Header1";
import { formatDecimal } from "utils";
const { Option } = Select;

const FormPhieuXuat = ({ loaiNhapXuat, ...props }) => {
  const refThongTinPhieu = useRef(null);
  const [form] = Form.useForm();
  const {
    hinhThucNhapXuat: { listHinhThucNhapXuat },
    phieuNhapXuat: { checkValidate, thongTinPhieu, dsNhapXuatChiTiet },
    auth: { auth },
    doiTac: { listAllDoiTac },
    nhapKho: { listPhieuNhap },
    kho: { listKhoUser },
  } = useSelector((state) => state);

  const {
    kho: { getAllTongHop: getAllKhoTongHop },
    quanTriKho: { onSearch: onSearchQuanTriKho },
    utils: { getUtils },
    nhanVien: { searchId: searchNhanVienById },
    phieuNhapXuat: { updateData },
    doiTac: { getListAllDoiTac },
    nhapKho: { getListPhieuNhap },
    kho: { getTheoTaiKhoan },
  } = useDispatch();

  useEffect(() => {
    getListHinhThucNhapXuat({ dsHinhThucNhapXuat: 20 });
    getListAllDoiTac({ dsLoaiDoiTac: [20], active: true });
  }, []);

  const { getListHinhThucNhapXuat } = useDispatch().hinhThucNhapXuat;

  useEffect(() => {
    refThongTinPhieu.current = thongTinPhieu;
  }, [thongTinPhieu]);
  const onChange = (type) => (e) => {
    if (loaiNhapXuat == 40) {
      if (type == "nhaCungCapId") {
        refThongTinPhieu.current.phieuNhapId = null;
      }
    }
    const value = e?.target ? e.target?.value : e;
    refThongTinPhieu.current = { ...refThongTinPhieu.current, [type]: value };
    updateData({ thongTinPhieu: refThongTinPhieu.current });
  };

  useEffect(() => {
    getListPhieuNhap({
      page: 0,
      size: 9999,
      dataSearch: {
        dsLoaiNhapXuat: 10,
        dsKhoId: thongTinPhieu.khoId,
        nhaCungCapId: thongTinPhieu.nhaCungCapId,
      },
    });
  }, [thongTinPhieu.nhaCungCapId, thongTinPhieu.khoId]);

  const optionsHinhThucNhapXuat = useMemo(() => {
    let options = listHinhThucNhapXuat?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listHinhThucNhapXuat]);
  const optionsDsPhieuNhap = useMemo(() => {
    if (!thongTinPhieu.nhaCungCapId) return [];
    let options = (listPhieuNhap || [])
      .filter((item, index, self) => {
        return (
          item.soPhieu &&
          self.findIndex((item2) => item2.soPhieu === item.soPhieu) == index
        );
      })
      .map((item, index) => (
        <Option key={index} value={item?.id}>
          {item?.soPhieu}
        </Option>
      ));
    return options;
  }, [listPhieuNhap, thongTinPhieu.nhaCungCapId]);
  const optionsKho = useMemo(() => {
    let options = listKhoUser?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoUser]);
  const optionsKhoNhap = useMemo(() => {
    let options =
      listKhoUser
        ?.filter((item) => item.id !== thongTinPhieu?.khoId)
        .map((item, index) => (
          <Option key={index} value={item?.id}>
            {item?.ten}
          </Option>
        )) || [];
    return options;
  }, [listKhoUser, thongTinPhieu?.khoId]);

  const optionsNhaCungCap = useMemo(() => {
    let options = listAllDoiTac?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listAllDoiTac]);

  useEffect(() => {
    getAllKhoTongHop({ active: true }).then((s) => {
      onSearchQuanTriKho({
        active: true,
        size: 99999,
        dataSearch: { khoTrucThuocId: thongTinPhieu?.khoId, active: true },
      });
    });
  }, [thongTinPhieu?.khoId]);
  useEffect(() => {
    getTheoTaiKhoan({});
    getAllKhoTongHop({ active: true });
    getUtils({ name: "thang" });
    getListHinhThucNhapXuat({
      active: true,
      dsHinhThucNhapXuat: HINH_THUC_NHAP_XUAT.LOAI_XUAT,
    });
    if (auth?.nhanVienId) {
      searchNhanVienById({ nhanVienId: auth?.nhanVienId });
    }
  }, []);

  const nhaCungCap = useMemo(() => {
    // if (thongTinPhieu?.id) return thongTinPhieu.nhaCungCap;
    const nhaCungCap = listAllDoiTac?.find(
      (item) => item?.id === thongTinPhieu?.nhaCungCapId
    );
    return nhaCungCap;
  }, [thongTinPhieu.nhaCungCapId, listAllDoiTac]);

  const thanhTien = useMemo(() => {
    return (dsNhapXuatChiTiet || []).reduce((a, b) => {
      return (
        a +
        b.soLuongSoCapYeuCau *
          (b.giaNhapSauVat ||
            b.loNhap?.giaNhapSauVat ||
            b.dichVu?.giaNhapSauVat ||
            0)
      );
    }, 0);
  }, [dsNhapXuatChiTiet]);

  const renderThanhTien = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label className={"label"}>Th??nh ti???n</label>
          <Input value={formatDecimal(thanhTien)} disabled />
        </div>
      </Col>
    );
  }, [thanhTien]);
  const renderKhoNhap = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label className={"label"}>Kho nh???p</label>
          <Select
            onChange={onChange("khoDoiUngId")}
            value={thongTinPhieu?.khoDoiUngId}
            placeholder={"Ch???n kho nh???p"}
            showSearch
          >
            {optionsKhoNhap}
          </Select>
        </div>
      </Col>
    );
  }, [thongTinPhieu?.khoDoiUngId, listKhoUser, thongTinPhieu?.khoId]);
  const renderLoaiXuat = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label
            className={
              !thongTinPhieu?.hinhThucNhapXuatId ? `label label-error` : "label"
            }
          >
            Lo???i xu???t<span style={{ color: "red" }}> *</span>
          </label>
          <Select
            placeholder="Lo???i xu???t"
            data={listHinhThucNhapXuat}
            showArrow
            value={thongTinPhieu.hinhThucNhapXuatId}
            onChange={onChange("hinhThucNhapXuatId")}
            showSearch
            filterOption={(input, option) =>
              option &&
              option.children &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {optionsHinhThucNhapXuat}
          </Select>
          {checkValidate && !thongTinPhieu?.hinhThucNhapXuatId && (
            <div className="error">Vui l??ng ch???n lo???i xu???t!</div>
          )}
        </div>
      </Col>
    );
  }, [thongTinPhieu?.hinhThucNhapXuatId, checkValidate, listHinhThucNhapXuat]);
  const renderKhoXuat = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label
            className={!thongTinPhieu?.khoId ? `label label-error` : "label"}
          >
            Kho xu???t<span style={{ color: "red" }}> *</span>
          </label>
          <Select
            onChange={onChange("khoId")}
            value={thongTinPhieu?.khoId}
            placeholder={"Ch???n kho xu???t"}
            disabled={true}
            showSearch
          >
            {optionsKho}
          </Select>
          {checkValidate && !thongTinPhieu?.khoId && (
            <div className="error">Vui l??ng ch???n kho xu???t!</div>
          )}
        </div>
      </Col>
    );
  }, [thongTinPhieu?.khoId, checkValidate, listKhoUser]);
  const renderNhaCungCap = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label
            className={
              !thongTinPhieu?.nhaCungCapId ? `label label-error` : "label"
            }
          >
            Nh?? cung c???p<span style={{ color: "red" }}> *</span>
          </label>

          <Select
            placeholder="Nh?? cung c???p"
            // onChange={onChange("dsKhoId")}
            onSelect={onChange("nhaCungCapId")}
            value={thongTinPhieu?.nhaCungCapId}
            showSearch
            filterOption={(input, option) =>
              option &&
              option.children &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {optionsNhaCungCap}
          </Select>
          {checkValidate && !thongTinPhieu?.nhaCungCapId && (
            <div className="error">Vui l??ng ch???n nh?? cung c???p!</div>
          )}
        </div>
      </Col>
    );
  }, [listAllDoiTac, checkValidate, thongTinPhieu?.nhaCungCapId]);
  const renderDiaChiNhaCungCap = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label className={"label"}>?????a ch??? nh?? cung c???p</label>
          <Input value={nhaCungCap?.diaChi} disabled />
        </div>
      </Col>
    );
  }, [nhaCungCap?.diaChi]);
  const renderSoPhieu = useMemo(() => {
    return (
      <Col span={6}>
        <div className="form-item">
          <label className={"label"}>S??? phi???u nh???p</label>
          <Select
            onChange={onChange("phieuNhapId")}
            value={thongTinPhieu?.phieuNhapId}
            placeholder={"Ch???n s??? phi???u"}
            disabled={dsNhapXuatChiTiet?.length}
            showSearch
            filterOption={(input, option) =>
              option &&
              option.children &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {optionsDsPhieuNhap}
          </Select>
          {/* {checkValidate && !thongTinPhieu?.phieuNhapId && (
            <div className="error">Vui l??ng ch???n phi???u nh???p!</div>
          )} */}
        </div>
      </Col>
    );
  }, [
    checkValidate,
    thongTinPhieu?.phieuNhapId,
    listPhieuNhap,
    thongTinPhieu.nhaCungCapId,
    dsNhapXuatChiTiet,
  ]);
  const renderSoHoaDon = useMemo(() => {
    const phieuNhap = listPhieuNhap?.find(
      (item) => item?.id === thongTinPhieu?.phieuNhapId
    );
    return (
      <Col span={6}>
        <div className="form-item">
          <label className={"label"}>S??? h??a ????n</label>
          <Input value={phieuNhap?.soHoaDon} disabled />
        </div>
      </Col>
    );
  }, [thongTinPhieu?.phieuNhapId, listPhieuNhap]);

  const renderGhiChu = useMemo(() => {
    return (
      <Col span={loaiNhapXuat == 30 ? 24 : 6}>
        <div className="form-item">
          <label className={"label"}>Ghi ch??</label>
          <Input
            onChange={onChange("ghiChu")}
            value={thongTinPhieu?.ghiChu}
            placeholder={"Nh???p ghi ch??"}
          />
        </div>
      </Col>
    );
  }, [thongTinPhieu?.ghiChu, loaiNhapXuat]);

  const renderForm = () => {
    if (loaiNhapXuat == 40)
      return (
        <>
          {renderLoaiXuat}
          {renderNhaCungCap}
          {renderSoPhieu}
          {renderSoHoaDon}
          {renderGhiChu}
          {renderDiaChiNhaCungCap}
          {renderKhoXuat}
          {renderThanhTien}
        </>
      );
    if (loaiNhapXuat == 30)
      return (
        <>
          {renderLoaiXuat}
          {renderKhoNhap}
          {renderKhoXuat}
          {renderThanhTien}
          {renderGhiChu}
        </>
      );
    return (
      <>
        {renderLoaiXuat}
        {renderGhiChu}
        {renderKhoXuat}
        {renderThanhTien}
      </>
    );
  };

  return (
    <Main>
      <Form style={{ width: "100%" }} form={form} layout="vertical">
        <Header1
          title={"Th??ng tin phi???u"}
          noPadding={true}
          bottom={10}
        ></Header1>
        <Row gutter={[10, 10]}>{renderForm()}</Row>
      </Form>
    </Main>
  );
};

export default memo(FormPhieuXuat);
