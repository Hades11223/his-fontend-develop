import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ModalTemplate, Button, InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "lodash";
import { HOTKEY } from "constants/index";
import printProvider from "data-access/print-provider";
import { useStore } from "hook";
const ModalThemMoiPhieuThuThanhToan = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    dsPhuongThucTt: {},
    isOnDungGoi: false,
    loading: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const thongTinNbGoiDv = useStore("nbGoiDv.thongTinNbGoiDv", {});

  const { listAllPhuongThucThanhToan } = useSelector(
    (state) => state.phuongThucTT
  );
  const listPhuongThucThanhToan = useMemo(() => {
    if (!listAllPhuongThucThanhToan) return [];
    return sortBy(listAllPhuongThucThanhToan, ["uuTien"], "asc");
  }, [listAllPhuongThucThanhToan]);
  const {
    phuongThucTT: { getListAllPhuongThucThanhToan },
    thanhToanGoi: { onTaoThanhToan, onPhieuThu },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({ isOnDungGoi }, callback) => {
      setState({ show: true, dsPhuongThucTt: {}, isOnDungGoi });
      refCallback.current = callback;
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
      getListAllPhuongThucThanhToan({ page: "", size: "" });
    } else {
      refModal.current && refModal.current.hide();
      setState({ loading: false });
    }
  }, [state.show]);

  useEffect(() => {
    if (state.show) {
      const dsPhuongThucTt = {};
      (listPhuongThucThanhToan || []).forEach((item) => {
        dsPhuongThucTt[item.id] = {
          tongTien: item.tienMat
            ? soTienPhaiThanhToan < 0
              ? 0
              : soTienPhaiThanhToan
            : null,
          maChuanChi: "",
          phuongThucTtId: item.id,
        };
        setState({ dsPhuongThucTt });
      });
    }
  }, [state.show, listPhuongThucThanhToan, thongTinNbGoiDv]);
  const onOK = (isOk) => () => {
    if (isOk) {
      setState({ loading: true });
      const dsPhuongThucTt = Object.keys(state.dsPhuongThucTt)
        .map((key) => state.dsPhuongThucTt[key])
        .filter((x) => x.tongTien != null);
      const tongTien = dsPhuongThucTt.reduce((a, b) => {
        return a + Number(b.tongTien);
      }, 0);

      onTaoThanhToan({
        nbDotDieuTriId: thongTinNbGoiDv.nbDotDieuTriId,
        nbGoiDvId: thongTinNbGoiDv.id,
        tongTien: tongTien,
        dsPhuongThucTt: dsPhuongThucTt,
      })
        .then((data) => {
          onPhieuThu(data?.id).then((s) => {
            if (s?.file?.pdf) printProvider.printPdf(s);
          });
          if (refCallback.current) refCallback.current(data);
          onOK(false)();
        })
        .catch(() => {
          setState({ loading: false });
        });
    } else setState({ show: false });
  };
  const onChange = (id, type) => (value) => {
    const dsPhuongThucTt = state.dsPhuongThucTt || {};
    if (!dsPhuongThucTt[id]) {
      dsPhuongThucTt[id] = { phuongThucTtId: id };
    }
    if (value >= 0) {
      dsPhuongThucTt[id][type] = value;
    } else {
      dsPhuongThucTt[id][type] = null;
    }
    setState({ dsPhuongThucTt: { ...dsPhuongThucTt } });
  };
  const tienSauGiamGia = useMemo(() => {
    return (
      (thongTinNbGoiDv?.tongTien || 0) -
      (thongTinNbGoiDv?.tienMienGiamDichVu || 0) -
      (thongTinNbGoiDv?.tienMienGiamGoiDv || 0) -
      (thongTinNbGoiDv?.tienGiamGia || 0)
    );
  }, [thongTinNbGoiDv]);
  const soTienPhaiThanhToan = useMemo(() => {
    return state.isOnDungGoi
      ? (thongTinNbGoiDv?.tienDaSuDungTruocGiam || 0) -
          (thongTinNbGoiDv?.tienDaThanhToan || 0)
      : tienSauGiamGia - (thongTinNbGoiDv?.tienDaThanhToan || 0);
  }, [tienSauGiamGia, thongTinNbGoiDv, state.isOnDungGoi]);

  const soTienThanhToan = useMemo(() => {
    return Object.keys(state.dsPhuongThucTt).reduce((a, b) => {
      return a + Number(state.dsPhuongThucTt[b].tongTien);
    }, 0);
  }, [state.dsPhuongThucTt]);
  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOK(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOK(true)();
      },
    },
  ];
  return (
    <ModalTemplate
      width={"850px"}
      ref={refModal}
      title={t("goiDichVu.phieuThanhToanGoi")}
      closable={false}
      hotKeys={hotKeys}
      onCancel={onOK(false)}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<CheckCircleOutlined />}
          iconHeight={15}
          onClick={onOK(true)}
          loading={state?.loading}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <Main>
        <Row gutter={[12, 12]} className="thong-tin-so-tien">
          <Col span={12}>
            <div className="tien-tra-lai">
              <div className="text-item">
                <div className="text-label">
                  {t("goiDichVu.soTienThanhToan")}
                </div>
                <div className="text-content">
                  {soTienThanhToan.formatPrice()}
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="tien-thanh-toan">
              <div className="text-item">
                <div className="text-label">
                  {t("goiDichVu.tongTienGoiSauGiam")}
                </div>
                <div className="text-content">
                  {tienSauGiamGia.formatPrice()}
                </div>
              </div>
              <div className="text-item">
                <div className="text-label">{t("goiDichVu.soTienDaTT")}</div>
                <div className="text-content">
                  {(thongTinNbGoiDv?.tienDaThanhToan || 0).formatPrice()}
                </div>
              </div>
              <div className="text-item">
                <div className="text-label">
                  {t("goiDichVu.soTienGoiPhaiTT")}
                </div>
                <div className="text-content">
                  {soTienPhaiThanhToan.formatPrice()}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {(listPhuongThucThanhToan || []).map((item, index) => {
          return (
            <Row className="row-box" key={index}>
              <Col span={12}>
                <div className="row-label">
                  {`${t("common.thanhToan")} ${item.ten}`}
                </div>

                <InputTimeout
                  type="number"
                  formatPrice={true}
                  min={0}
                  value={state.dsPhuongThucTt[item.id]?.tongTien}
                  placeholder={t("common.nhapSoTien")}
                  onChange={onChange(item.id, "tongTien")}
                />
              </Col>
              {/* https://jira.isofh.com.vn/browse/SAKURA-10726 */}
              {item.loaiPhuongThucTt == 32 && (
                <Col span={12}>
                  <div className="row-label">{t("goiDichVu.maChuanChi")}</div>
                  <InputTimeout
                    value={state.dsPhuongThucTt[item.id]?.maChuanChi}
                    placeholder={t("goiDichVu.nhapMaChuanChi")}
                    onChange={onChange(item.id, "maChuanChi")}
                  />
                </Col>
              )}
            </Row>
          );
        })}
      </Main>
    </ModalTemplate>
  );
});
export default ModalThemMoiPhieuThuThanhToan;
