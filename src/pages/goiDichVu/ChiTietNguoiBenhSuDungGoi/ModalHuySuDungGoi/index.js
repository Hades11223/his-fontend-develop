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
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { useLoading } from "hook";

const ModalHuySuDungGoi = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ type = 0, nbGoiDvId, nbDotDieuTriId }, callback) => {
      //type=0 huỷ sử dụng
      //type=1 dừng sử dụng
      setState({ show: true, type, nbGoiDvId, nbDotDieuTriId });
      refCallback.current = callback;
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const { thongTinNbGoiDv } = useSelector((state) => state.nbGoiDv);
  const {
    nbGoiDv: { onHuySuDungGoi, onDungSuDungGoi, traLaiTienThua },
  } = useDispatch();

  const onOK = (isOk) => async () => {
    if (isOk) {
      try {
        showLoading();
        if (state.type == 0) {
          await onHuySuDungGoi({
            nbDotDieuTriId: state.nbDotDieuTriId,
            nbGoiDvId: state.nbGoiDvId,
            lyDo: state.lyDo,
            soTienTraLai,
          });
          refCallback.current && refCallback.current();
          onOK(false)();
          //huygoi
        } else {
          //dunggoi
          if (soTienTraLai > 0) {
            await traLaiTienThua({
              nbDotDieuTriId: state.nbDotDieuTriId,
              tongTien: soTienTraLai,
              nbGoiDvId: state.nbGoiDvId,
            });
          }
          await onDungSuDungGoi({
            nbGoiDvId: state.nbGoiDvId,
            lyDo: state.lyDo,
          });
          refCallback.current && refCallback.current();
          onOK(false)();
        }
      } catch (error) {
      } finally {
        hideLoading();
      }
    } else setState({ show: false });
  };

  const onChange = (type) => (value) => {
    setState({ [type]: value });
  };
  const soTienTraLai = useMemo(() => {
    return (
      (thongTinNbGoiDv?.tienDaThanhToan || 0) -
      (thongTinNbGoiDv?.tienDaSuDung || 0)
    );
  }, [thongTinNbGoiDv]);

  return (
    <ModalTemplate
      width={"700px"}
      ref={refModal}
      title={
        state.type == 0
          ? t("goiDichVu.xacNhanHuySuDungGoi")
          : t("goiDichVu.xacNhanDungSuDungGoi")
      }
      closeable={false}
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
                <div className="text-label">{t("goiDichVu.soTienTraLai")}</div>
                <div className="text-content">{soTienTraLai.formatPrice()}</div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="tien-thanh-toan">
              <div className="text-item">
                <div className="text-label">{t("goiDichVu.tongTienDaTT")}</div>
                <div className="text-content">
                  {(thongTinNbGoiDv?.tienDaThanhToan || 0).formatPrice()}
                </div>
              </div>
              <div className="text-item">
                <div className="text-label">
                  {t("goiDichVu.tongTienDaSuDung")}
                </div>
                <div className="text-content">
                  {(thongTinNbGoiDv?.tienDaSuDungTruocGiam || 0).formatPrice()}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="lyDo">
          {state.type == 0 ? t("goiDichVu.lyDoHuy") : t("goiDichVu.lyDoDung")}
        </div>
        <InputTimeout
          isTextArea={true}
          row={4}
          placeholder={
            state.type == 0
              ? t("goiDichVu.nhapLyDoHuy")
              : t("goiDichVu.nhapLyDoDung")
          }
          onChange={onChange("lyDo")}
        ></InputTimeout>
        <div className="luuY">
          (
          {soTienTraLai > 0
            ? t("goiDichVu.luuYNoteLyDoThua")
            : t("goiDichVu.luuYNoteLyDoThieu")}
          )
        </div>
      </Main>
    </ModalTemplate>
  );
});
export default ModalHuySuDungGoi;
