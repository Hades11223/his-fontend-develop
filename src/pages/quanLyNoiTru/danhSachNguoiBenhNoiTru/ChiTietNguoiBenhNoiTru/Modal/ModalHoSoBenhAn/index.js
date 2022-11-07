import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "./styled";
import Content from "pages/hoSoBenhAn/ChiTietNguoiBenh/Content";

const ModalHoSoBenhAn = (props, ref) => {
  const [state, setState] = useState({});
  const {
    nbDotDieuTri: { getThongTinNb },
  } = useDispatch();
  useImperativeHandle(ref, () => ({
    show: ({ nbThongTinId, nbDotDieuTriId }) => {
      debugger;
      setState({ ...state, show: true, nbDotDieuTriId });
      getThongTinNb({ nbThongTinId, active: true });
    },
  }));
  return (
    <Modal
      width={"auto"}
      visible={state.show}
      title={<div className="title-header">Hồ sơ bệnh án người bệnh</div>}
      footer={null}
      onCancel={() => setState({ ...state, show: false })}
    >
      <Content nbDotDieuTriId={state.nbDotDieuTriId} />
    </Modal>
  );
};

export default forwardRef(ModalHoSoBenhAn);
