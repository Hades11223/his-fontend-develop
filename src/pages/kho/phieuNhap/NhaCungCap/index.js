import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainPage } from "./styled";
import { Row, Col } from "antd";
import FormPhieuNhap from "./FormPhieuNhap";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { Card } from "components";
import TrangThai from "pages/kho/components/TrangThai";
import SearchHangHoa from "./SearchHangHoa";
import { useQueryString } from "hook";

export const redirectToDetailPage = ({ id, history }) => {
  history.push(`/kho/phieu-nhap-nha-cung-cap/chi-tiet/${id}`);
};

const PhieuNhap = ({ ...props }) => {
  const [khoId] = useQueryString("khoId", 0);

  const { thongTinPhieu, dsNhapXuatChiTiet } = useSelector(
    (state) => state.phieuNhapXuat
  );
  const { getListAllNhaSanXuat } = useDispatch().doiTac;

  const { updateData, getDetail, resetData, createOrUpdate } =
    useDispatch().phieuNhapXuat;
  const { updateData: updateDataThauChiTiet } =
    useDispatch().quyetDinhThauChiTiet;
  const refSearchHangHoa = useRef();
  const refDanhSachHangHoa = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  const onFocusSearchHangHoa = () => {
    refSearchHangHoa.current && refSearchHangHoa.current.show();
  };

  useEffect(() => {
    updateDataThauChiTiet({ dataSortColumn: {} });
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
    });
    if (id) {
      getDetail({ id });
    } else {
      updateData({
        thongTinPhieu: {
          ...(thongTinPhieu || {}),
          khoId: khoId ? parseInt(khoId) : "",
          ngayHoaDon: moment(new Date(), "YYYY-MM-DD"),
          loaiNhapXuat: 10,
        },
      });
    }
    return () => {
      resetData();
    };
  }, []);
  const onCreateOrUpdate = ({ id, guiDuyet, ...value }) => {
    const tong = refDanhSachHangHoa.current.getTong();
    const body = {
      ...value,
      ...thongTinPhieu,
      ngayHoaDon: value.ngayHoaDon.format("YYYY-MM-DD"),
      thanhTien: tong.thanhTien,
      thanhTienSuaDoi: tong.thanhTienSuaDoi,
      tienChietKhau: tong.tienChietKhau,
      phanTramChietKhau: tong.phanTramChietKhau,
      // chietKhauTongHoaDon: tong?.chietKhauTongHoaDon,
      dsNhapXuatChiTiet: (dsNhapXuatChiTiet || []).map((item) => {
        const { quyetDinhThauChiTietId } = item;
        const loNhap = item.loNhap || {};
        if (quyetDinhThauChiTietId)
          loNhap.quyetDinhThauChiTietId = quyetDinhThauChiTietId;
        return {
          ...item,
          loNhap,
          dsLo: undefined,
          dichVu: item.dichVu,
          dichVuId: item.dichVuId,
          soLuongSoCap: item.soLuongSoCap,
          soLuongSoCapYeuCau: item.soLuongSoCap,
          thanhTien: item.thanhTien,
          thanhTienSuaDoi: item.thanhTienSuaDoi,
          xuatXuId: item.xuatXuId,
        };
      }),
    };
    createOrUpdate({ id, guiDuyet, loaiPhieu: 2, ...body }).then(({ id }) => {
      history.push(`/kho/phieu-nhap-nha-cung-cap/chi-tiet/${id}`);
    });
  };
  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Nhập kho", link: "/kho/nhap-kho" },
      ]}
      titleRight={<TrangThai />}
      title={"Thêm mới phiếu nhập"}
    >
      <Card className="page-body">
        <Row className="page-body1">
          <Col span={17} className="col-left">
            <SearchHangHoa ref={refSearchHangHoa} isEdit={true} />
            <DanhSachHangHoa
              ref={refDanhSachHangHoa}
              onFocusSearchHangHoa={onFocusSearchHangHoa}
              id={id}
            />
          </Col>
          <Col span={7} className="col-right">
            <FormPhieuNhap onCreateOrUpdate={onCreateOrUpdate} />
          </Col>
        </Row>
      </Card>
    </MainPage>
  );
};

export default PhieuNhap;
