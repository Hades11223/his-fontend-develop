import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { ModalTemplate, Button, InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
import { HOTKEY } from "constants/index";

const ModalHuyThanhToanGoi = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ item }, callback) => {
      setState({ show: true, item, lyDo: "" });
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
  const {
    thanhToanGoi: { onHuyThanhToan },
  } = useDispatch();

  const onOK = (isOk) => () => {
    if (isOk) {
      onHuyThanhToan({
        id: state.item?.id,
        lyDo: state.lyDo,
        nbGoiDvId: state.item?.nbGoiDvId,
      }).then((s) => {
        refCallback.current && refCallback.current();
        onOK(false)();
      });
    } else setState({ show: false });
  };
  const onChange = (value) => {
    setState({ lyDo: value });
  };
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
      width={"500px"}
      ref={refModal}
      title={t("goiDichVu.xacNhanHuyThanhToanGoi")}
      closable={false}
      onCancel={onOK(false)}
      hotKeys={hotKeys}
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
          <Col span={24}>
            <div className="tien-tra-lai">
              <div className="text-item">
                <div className="text-label">
                  {t("goiDichVu.soTienHuyThanhToan")}
                </div>
                <div className="text-content">
                  {(state?.item?.tongTien || 0).formatPrice()}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="lyDo">{t("goiDichVu.lyDoHuyThanhToan")}</div>
        <InputTimeout
          value={state.lyDo}
          isTextArea={true}
          rows={4}
          placeholder={t("goiDichVu.nhapLyDoHuyThanhToan")}
          onChange={onChange}
        ></InputTimeout>
      </Main>
    </ModalTemplate>
  );
});
export default ModalHuyThanhToanGoi;
