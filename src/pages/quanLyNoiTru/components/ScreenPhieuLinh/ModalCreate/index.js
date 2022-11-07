import { message } from "antd";
import { ModalTemplate, Button } from "components";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import ElementFilter from "components/common/ElementFilter";
import IcCheckCircleWhite from "assets/svg/ic-check-circle-white.svg";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";

const ModalCreate = (
  {
    width,
    title,
    initState,
    renderFilter,
    onSubmit = () => {},
    afterSubmit = () => {},
  },
  ref
) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refElementFilter = useRef();
  const refCallback = useRef(null);

  const [state, _setState] = useState({ show: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useImperativeHandle(ref, () => ({
    show: ({} = {}, onOk, onCallback) => {
      setState({ show: true });
      refCallback.current = onCallback;
    },
    close: ({} = {}) => {
      setState({ show: false });
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => () => {
    if (isOk) {
      refElementFilter.current &&
        refElementFilter.current.submit(async (data) => {
          try {
            setState({ isLoading: true });
            const res = await onSubmit(data);
            if (res && res.code === 0) {
              message.success("Tạo mới phiếu thành công");
              afterSubmit(res.data);
            } else if (res && res.message) {
              message.error(res.message);
              setState({
                show: false,
              });
            }
          } catch (error) {
            if (error?.data) {
              refCallback.current({ dsDichVu: error?.data, payload: data });
              setState({
                show: false,
              });
            } else {
              refConfirm &&
                refConfirm.current &&
                refConfirm.current.show(
                  {
                    title: "Cảnh báo",
                    content: error?.message,
                    cancelText: "Xong",
                    showBtnOk: false,
                  },
                  () => {},
                  () => {}
                );
            }
          } finally {
            setState({ isLoading: false });
          }
        });
    } else {
      setState({
        show: false,
      });
    }
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={width || 800}
      title={title || "Tạo phiếu lĩnh"}
      wrapClassName="modal-phieu-linh"
      onCancel={onOk(false)}
      actionRight={
        <>
          <Button
            type={"default"}
            onClick={onOk(false)}
            loading={state.isLoading}
            minWidth={100}
          >
            {t("common.huy")}
          </Button>
          <Button
            type={"primary"}
            onClick={onOk(true)}
            loading={state.isLoading}
            iconHeight={15}
            rightIcon={<IcCheckCircleWhite />}
            minWidth={100}
          >
            {t("common.xacNhan")}
          </Button>
        </>
      }
    >
      <Main>
        {state.show && (
          <ElementFilter
            ref={refElementFilter}
            renderFilter={renderFilter}
            initState={initState}
          />
        )}
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalCreate);
