import { message } from "antd";
import { Button, ModalTemplate } from "components";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { ArrowLeftOutlined } from "@ant-design/icons";
import DanhSach from "./DanhSach";
import TimKiem from "./TimKiem";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";

const ModalTiepNhanKSK = forwardRef((props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => _setState((state) => ({ ...state, ...data }));
  const refModal = useRef(null);
  const refDanhSach = useRef(null);
  const { listSelectedId, dsPhongThucHienId } = useSelector(
    (state) => state.dsBenhNhan
  );

  const {
    dsBenhNhan: { tiepNhanNbKSK, onChangeInputSearch },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
      refDanhSach.current && refDanhSach.current.reset();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => () => {
    if (isOk) {
      // xử lý cái gì đó
      if (!listSelectedId.length) {
        message.error("Cần chọn hồ sơ để tiếp nhận");
        return;
      }
      if (!dsPhongThucHienId) {
        message.error("Chưa chọn phòng thực hiện");
        return;
      }
      onTiepNhan();
      onOk(false)();
    } else {
      setState({
        show: false,
      });
    }
  };

  const onTiepNhan = () => {
    tiepNhanNbKSK();
  };

  const onCloseModal = () => {
    onOk(false)();
    onChangeInputSearch({});
  };

  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onCloseModal}
      title="Tiếp nhận NB KSK"
      actionLeft={
        <Button.Text
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={onCloseModal}
        >
          Quay lại
        </Button.Text>
      }
      actionRight={
        <Button onClick={onOk(true)} type="primary">
          Tiếp nhận NB KSK
        </Button>
      }
    >
      <Main>
        <TimKiem
          triggerResetChecked={() => {
            refDanhSach.current && refDanhSach.current.reset();
          }}
        />
        {state.show && <DanhSach ref={refDanhSach} />}
      </Main>
    </ModalTemplate>
  );
});

export default ModalTiepNhanKSK;
