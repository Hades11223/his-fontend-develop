import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Col, Checkbox } from "antd";
import { Button, ModalTemplate, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openInNewTab } from "utils";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IconSuccess from "assets/svg/ic-check-circle-white.svg";

const ModalAddCapCuu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    khongCoNguoiThanDiKem: false,
    chuaXacDinhDanhTinh: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    nguyenNhanNhapVien: { listAllNguyenNhanNhapVien },
    loaiCapCuu: { listAllLoaiCapCuu },
    thoiGianCapCuu: { listAllThoiGianCapCuu },
    viTriChanThuong: { listAllViTriChanThuong },
  } = useSelector((state) => state);

  const {
    nguyenNhanNhapVien: { getListAllNguyenNhanNhapVien },
    loaiCapCuu: { getListAllLoaiCapCuu },
    thoiGianCapCuu: { getListAllThoiGianCapCuu },
    viTriChanThuong: { getListAllViTriChanThuong },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      getListAllNguyenNhanNhapVien();
      getListAllLoaiCapCuu();
      getListAllThoiGianCapCuu();
      getListAllViTriChanThuong();
      setState({
        show: item.show,
        loaiCapCuuId: item?.loaiCapCuuId,
        viTriChanThuongId: item?.viTriChanThuongId,
        nguyenNhanNhapVienId: item?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: item?.thoiGianCapCuuId,
        chuaXacDinhDanhTinh: item?.chuaXacDinhDanhTinh,
        khongCoNguoiThanDiKem: item?.khongCoNguoiThanDiKem,
      });
      refCallback.current = callback;
    },
  }));
  const {
    loaiCapCuuId,
    viTriChanThuongId,
    nguyenNhanNhapVienId,
    thoiGianCapCuuId,
    checkValidate,
    loaiCapCuuTen,
    viTriChanThuongTen,
    nguyenNhanNhapVienTen,
    thoiGianCapCuuTen,
    khongCoNguoiThanDiKem,
    chuaXacDinhDanhTinh,
  } = state;
  const onSave = () => {
    if (loaiCapCuuId) {
      setState({
        show: false,
        checkValidate: false,
      });
      let obj = {
        loaiCapCuuId,
        loaiCapCuuTen,
        viTriChanThuongId,
        viTriChanThuongTen,
        nguyenNhanNhapVienId,
        nguyenNhanNhapVienTen,
        thoiGianCapCuuId,
        thoiGianCapCuuTen,
        khongCoNguoiThanDiKem,
        chuaXacDinhDanhTinh,
      };
      if (refCallback.current) refCallback.current(obj);
    } else {
      setState({ checkValidate: true });
    }
  };
  const onChange = (value, variables, valueTen, variablesTen) => {
    setState({
      [`${variables}`]: value,
      [`${variablesTen}`]: valueTen,
    });
  };
  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
  };

  return (
    <ModalTemplate
      closable={false}
      width={600}
      ref={refModal}
      title={t("tiepDon.thongTinBoSung")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSave}
          iconHeight={20}
          rightIcon={<IconSuccess />}
        >
          <span> {t("common.luuThongTin")} </span>
        </Button>
      }
    >
      <Main>
        <Col span={12}>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/loai-cap-cuu")}
              className={
                !loaiCapCuuId ? `label label-error pointer` : "label pointer"
              }
            >
              {t("tiepDon.loaiCapCuu")}
              <span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e, list) =>
                onChange(e, "loaiCapCuuId", list?.children, "loaiCapCuuTen")
              }
              autoFocus={true}
              value={loaiCapCuuId}
              placeholder={t("tiepDon.chonLoaiCapCuu")}
              data={listAllLoaiCapCuu || []}
            />
            {checkValidate && !loaiCapCuuId && (
              <div className="error2">{t("tiepDon.vuiLongChonLoaiCapCuu")}</div>
            )}
          </div>
          <div className="item-select ">
            <label
              onClick={() => openInNewTab("/danh-muc/nguyen-nhan-nhap-vien")}
              className="label pointer"
            >
              {t("tiepDon.nguyenNhanTaiNanThuongTich")}
            </label>
            <Select
              onChange={(e, list) =>
                onChange(
                  e,
                  "nguyenNhanNhapVienId",
                  list?.children,
                  "nguyenNhanNhapVienTen"
                )
              }
              value={nguyenNhanNhapVienId}
              placeholder={t("tiepDon.chonNguyenNhanTaiNanThuongTich")}
              data={listAllNguyenNhanNhapVien || []}
            />
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: 30 }}>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/vi-tri-chan-thuong")}
              className="label pointer"
            >
              {t("tiepDon.viTriChanThuong")}
            </label>
            <Select
              onChange={(e, list) =>
                onChange(
                  e,
                  "viTriChanThuongId",
                  list?.children,
                  "viTriChanThuongTen"
                )
              }
              value={viTriChanThuongId}
              placeholder={t("tiepDon.chonViTriChanThuong")}
              data={listAllViTriChanThuong || []}
            />
          </div>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/thoi-gian-cap-cuu")}
              className="label pointer"
            >
              {t("tiepDon.thoiGianCapCuu")}
            </label>
            <Select
              onChange={(e, list) =>
                onChange(
                  e,
                  "thoiGianCapCuuId",
                  list?.children,
                  "thoiGianCapCuuTen"
                )
              }
              value={thoiGianCapCuuId}
              placeholder={t("tiepDon.chonThoiGianCapCuu")}
              data={listAllThoiGianCapCuu || []}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="item-select">
            <Checkbox
              checked={state?.khongCoNguoiThanDiKem}
              onChange={(e) => {
                setState({
                  khongCoNguoiThanDiKem: e.target.checked,
                });
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  let value = e?.target?.checked;
                  setState({
                    khongCoNguoiThanDiKem: !state?.khongCoNguoiThanDiKem,
                  });
                }
              }}
            >
              {t("tiepDon.khongCoNguoiThanDiKem")}
            </Checkbox>
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: 30 }}>
          <div className="item-select">
            <Checkbox
              checked={state?.chuaXacDinhDanhTinh}
              onChange={(e) => {
                setState({
                  chuaXacDinhDanhTinh: e.target.checked,
                  khongCoNguoiThanDiKem: e.target.checked
                    ? e.target.checked
                    : state?.khongCoNguoiThanDiKem,
                });
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  let value = e?.target?.checked;
                  setState({
                    chuaXacDinhDanhTinh: !state?.chuaXacDinhDanhTinh,
                  });
                }
              }}
            >
              {t("tiepDon.nguoiBenhChuaXacNhanDanhTinh")}
            </Checkbox>
          </div>
        </Col>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalAddCapCuu);
