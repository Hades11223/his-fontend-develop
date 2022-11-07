import React, { useMemo, useRef, useEffect, useState } from "react";
import { MainPage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import FormPhieuNhap from "./FormPhieuNhap";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { Button, Card } from "components";
import IcSendApprove from "assets/images/kho/ic-send-approve.svg";
import IcCancel from "assets/images/kho/ic-cancel.svg";
import IcSave from "assets/images/kho/ic-save.svg";
import { useHistory, useParams } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import moment from "moment";
import { useQueryString } from "hook";
import SearchHangHoa from "./SearchHangHoa";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
const PhieuNhapDuTru = ({ ...props }) => {
  const [khoId] = useQueryString("khoId", "");
  const refDanhSachHangHoa = useRef(null);
  const { t } = useTranslation();
  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);
  const {
    phieuNhapXuat: { updateData, createOrUpdate, getDetail, resetData },
  } = useDispatch();

  const { id } = useParams();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refSearchHangHoa = useRef(null);
  const history = useHistory();
  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);
  useEffect(() => {
    if (id) {
      getDetail({ id });
    } else {
      updateData({
        thongTinPhieu: {
          ...(thongTinPhieu || {}),
          khoId: khoId ? parseInt(khoId) : "",
          ngayHoaDon: moment(new Date(), "YYYY-MM-DD"),
          loaiNhapXuat: 20,
        },
      });
    }
    return () => {
      resetData();
    };
  }, []);

  const isEdit = useMemo(() => {
    return !!id;
  }, [id]);

  const onCancel = () => {
    history.push(`/kho/phieu-nhap-du-tru/chi-tiet/${thongTinPhieu.id}`);
  };

  const onSave = (guiDuyet) => (e) => {
    let validateSave =
      refDanhSachHangHoa.current && refDanhSachHangHoa.current.getData();
    if (validateSave) {
      return null;
    } else {
      setState({ isLoadingBtn: true });
      createOrUpdate({ id, guiDuyet, loaiPhieu: 1 }).then(({ id }) => {
        history.push(`/kho/phieu-nhap-du-tru/chi-tiet/${id}`);
        setState({ isLoadingBtn: false });
      });
      setTimeout(() => setState({ isLoadingBtn: false }), 1000);
    }
  };

  const onFocusSearchHangHoa = () => {
    refSearchHangHoa.current && refSearchHangHoa.current.show();
  };

  return (
    <MainPage
      breadcrumb={[
        { title: t("kho.kho"), link: "/kho" },
        { title: t("kho.nhapKho"), link: "/kho/nhap-kho" },
      ]}
      titleRight={<TrangThai times={times} />}
      title={t("kho.phieuNhapDuTru")}
      actionRight={
        !isEdit ? (
          <>
            {checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO]) && (
              <Button
                loading={state?.isLoadingBtn}
                onClick={onSave(true)}
                className="left-btn"
                rightIcon={<IcSendApprove />}
              >
                {t("kho.luuVaGuiDuyetPhieu")}
              </Button>
            )}
            {!checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO]) && (
              <Button
                loading={state?.isLoadingBtn}
                className="right-btn"
                onClick={onSave(false)}
                type={"primary"}
                rightIcon={<IcSave />}
              >
                {t("kho.luuPhieu")}
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
              {t("kho.huy")}
            </Button>
            <Button
              loading={state?.isLoadingBtn}
              className="right-btn"
              onClick={onSave(false)}
              rightIcon={<IcSave />}
              minWidth={120}
              type={"primary"}
            >
              {t("kho.luuPhieu")}
            </Button>
          </>
        )
      }
    >
      <Card>
        <FormPhieuNhap {...props} />
      </Card>
      <Card noPadding={true}>
        <SearchHangHoa isEdit={true} ref={refSearchHangHoa} />
        <DanhSachHangHoa
          onFocusSearchHangHoa={onFocusSearchHangHoa}
          ref={refDanhSachHangHoa}
          {...props}
          isEdit={true}
        />
      </Card>
    </MainPage>
  );
};

export default PhieuNhapDuTru;
