import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate } from "components";
import FormInfo from "../FormInfo";
import { Main } from "./styled";
import { refConfirm } from "app";
import { useDispatch } from "react-redux";
import { useLoading } from "hook";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { message } from "antd";

const ModalChinhSuaThongTin = ({ onlySeen, ...props }, ref) => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
  });
  const { tongTienDieuTri } = useDispatch().nbDotDieuTri;
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModal = useRef(null);
  const refCallBack = useRef(null);

  useImperativeHandle(ref, () => ({
    show: async ({ id, isEdit = true }, callback) => {
      showLoading();
      let time = new Date().getTime();
      tongTienDieuTri({ id })
        .then((s) => {
          time = new Date().getTime() - time;
          if (time > 500) time = 0;
          else time = 500 - time;
          setTimeout(() => {
            hideLoading();
            const allowEdit = checkRole([
              ROLES["TIEP_DON"].SUA_THONG_TIN_DA_THANH_TOAN,
            ]);
            if (s.phieuThuDaThanhToan && isEdit) {
              if (allowEdit)
                refConfirm.current &&
                  refConfirm.current.show(
                    {
                      title: t("common.thongBao"),
                      content: `${t(
                        "tiepDon.khongTheSuaThongTinNbDaCoPhieuThuDaThanhToan"
                      )}`,
                      cancelText: t("common.quayLai"),
                      okText: t("common.sua"),
                      classNameOkText: "button-warning",
                      showImg: true,
                      showBtnOk: true,
                      typeModal: "warning",
                    },
                    () => {
                      setState({ show: true, id, isEdit: isEdit });
                      refCallBack.current = callback;
                    }
                  );
              else
                message.error(
                  t("tiepDon.khongTheSuaThongTinNbDaCoPhieuThuDaThanhToan")
                );
            } else {
              setState({ show: true, id, isEdit: isEdit });
              refCallBack.current = callback;
            }
          }, time);
        })
        .catch((e) => {
          hideLoading();
        });
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const onOk = () => {
    onCancel();
    refCallBack.current && refCallBack.current();
  };
  return (
    <ModalTemplate
      title={
        onlySeen
          ? t("tiepDon.chiTietThongTinNb")
          : t("tiepDon.chinhSuaThongTin")
      }
      ref={refModal}
      onCancel={onCancel}
    >
      <Main>
        <FormInfo
          id={state.id}
          isEdit={state.isEdit}
          visible={state.show}
          onCancel={onCancel}
          onOk={onOk}
          onlySeen={onlySeen}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChinhSuaThongTin);
