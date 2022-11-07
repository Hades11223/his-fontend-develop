import IcCancel from "assets/images/kho/ic-cancel.svg";
import IcSave from "assets/images/kho/ic-save.svg";
import IcSendApprove from "assets/images/kho/ic-send-approve.svg";
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { MainPage } from "./styled";
import { useEffect } from "react";
import TrangThai from "pages/kho/components/TrangThai";
import { Card, Button } from "components";
import { useParams, useLocation, useHistory } from "react-router-dom";
import FormPhieuXuat from "./FormPhieuXuat";
import ModalNhapLyDo from "pages/kho/components/ModalNhapLyDo";
import { useQueryString } from "hook";
import SearchHangHoa from "./SearchHangHoa";
import ThongTinPhieuXuat from "./ChiTiet/ThongTinPhieuXuat";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

const PhieuXuat = ({ ...props }) => {
  const refModalNhapLyDo = useRef(null);
  const refSearchHangHoa = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const [type] = useQueryString("type", "");
  const [khoId] = useQueryString("khoId", "");
  const history = useHistory();

  const {
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet },
  } = useSelector((state) => {
    return state;
  });

  const {
    phieuNhapXuat: {
      getDetail,
      updateData,
      createOrUpdate,
      resetData,
      suaSoLuongDuyet,
    },
    hinhThucNhapXuat: { getListHinhThucNhapXuat },
  } = useDispatch();

  const loaiNhapXuat = useMemo(() => {
    if (type) return parseInt(type);
    if (thongTinPhieu.id) return thongTinPhieu.loaiNhapXuat;
    return 0;
  }, [location, type, thongTinPhieu.loaiNhapXuat]);
  const getTitlePage = useMemo(() => {
    let mode = "Thêm mới";
    if (thongTinPhieu.id) {
      mode = "Chỉnh sửa";
    }
    if (loaiNhapXuat == 0) return `${mode} phiếu xuất`;
    if (loaiNhapXuat == 30) return `${mode} phiếu xuất chuyển kho`;
    if (loaiNhapXuat == 40) return `${mode} phiếu xuất trả nhà cung cấp`;
    if (loaiNhapXuat == 90) return `${mode} phiếu xuất khác`;
  }, [loaiNhapXuat, thongTinPhieu]);

  const isEdit = useMemo(() => {
    return !!id;
  }, [id]);

  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);

  useEffect(() => {
    if (
      thongTinPhieu?.trangThai &&
      ![10, 15, 20].includes(thongTinPhieu?.trangThai) //chỉ 3 trangh thái tạo mới,chờ duyệt mới được vào trang chỉnh sửa, tạo mới
    ) {
      history.push("/kho/xuat-kho/chi-tiet/" + thongTinPhieu.id);
    }
  }, [thongTinPhieu]);

  useEffect(() => {
    getListHinhThucNhapXuat({ dsHinhThucNhapXuat: 20 });
    if (id) {
      getDetail({ id });
    } else {
      updateData({
        thongTinPhieu: {
          ...(thongTinPhieu || {}),
          khoId: khoId ? parseInt(khoId) : "",
          loaiNhapXuat: loaiNhapXuat,
        },
      });
    }
    return () => {
      resetData();
    };
  }, []);

  const thanhTien = useMemo(() => {
    return (dsNhapXuatChiTiet || []).reduce((a, b) => {
      return (
        a + b.soLuongSoCapYeuCau * (b.giaNhapSauVat || b.loNhap?.giaNhapSauVat)
      );
    }, 0);
  }, [dsNhapXuatChiTiet]);
  // console.log("thongTinPhieu", thongTinPhieu)
  const onSave = (guiDuyet) => (e) => {
    if (thongTinPhieu.trangThai === 20) {
      suaSoLuongDuyet(id).then(({ id }) => {
        history.push(`/kho/xuat-kho/chi-tiet/${id}`);
      });
    } else {
      createOrUpdate({ id, guiDuyet, loaiPhieu: 3, thanhTien }).then(
        ({ id }) => {
          history.push(`/kho/xuat-kho/chi-tiet/${id}`);
        }
      );
    }
  };

  const onFocusSearchHangHoa = () => {
    refSearchHangHoa.current && refSearchHangHoa.current.show();
  };

  const onCancel = () => {
    history.push(`/kho/xuat-kho/chi-tiet/${thongTinPhieu.id}`);
  };

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Xuất kho", link: "/kho/xuat-kho" },
      ]}
      titleRight={<TrangThai times={times} />}
      title={<>{getTitlePage}</>}
      actionRight={
        !isEdit ? (
          <>
            {checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO]) && (
              <Button
                onClick={onSave(true)}
                className="left-btn"
                rightIcon={<IcSendApprove />}
              >
                Lưu và gửi duyệt phiếu
              </Button>
            )}
            {!checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO]) && (
              <Button
                className="right-btn"
                onClick={onSave(false)}
                type={"primary"}
                rightIcon={<IcSave />}
              >
                Lưu phiếu
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              className="right-btn"
              onClick={onCancel}
              rightIcon={<IcCancel />}
              minWidth={120}
            >
              Hủy
            </Button>
            <Button
              className="right-btn"
              onClick={onSave(false)}
              rightIcon={<IcSave />}
              minWidth={120}
              type={"primary"}
            >
              Lưu phiếu
            </Button>
          </>
        )
      }
    >
      <Card>
        {!thongTinPhieu.trangThai ||
        ([10, 15].includes(thongTinPhieu.trangThai) &&
          thongTinPhieu.loaiNhapXuat != 20) ? (
          <FormPhieuXuat loaiNhapXuat={loaiNhapXuat} />
        ) : (
          <ThongTinPhieuXuat isEdit={true} loaiNhapXuat={loaiNhapXuat} />
        )}
      </Card>
      <Card noPadding={true}>
        <SearchHangHoa isEdit={true} ref={refSearchHangHoa} />
        <DanhSachHangHoa
          onFocusSearchHangHoa={onFocusSearchHangHoa}
          {...props}
          isEdit={true}
        />
      </Card>
      <ModalNhapLyDo ref={refModalNhapLyDo} />
    </MainPage>
  );
};

export default PhieuXuat;
