import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Modal } from "./styled";
import Content from "pages/hoSoBenhAn/ChiTietNguoiBenh/Content";
import { useParams } from "react-router-dom";

const ModalHoSoBenhAn = (props, ref) => {
  const [state, _setState] = useState({ isDetail: true });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { nbThongTinId, nbDotDieuTriId } = props;
  const {
    dsDichVuKyThuat: { onSearch: getDvKt },
    hoSoBenhAn: { getListDichVuThuoc, getListDichVuVatTu },
    nbDotDieuTri: { getThongTinNb },
  } = useDispatch();
  const { id } = useParams();
  useImperativeHandle(ref, () => ({
    show: (isDetail) => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    if (id && state.show) {
      getListDichVuThuoc({ nbDotDieuTriId: id });
      getListDichVuVatTu({ nbDotDieuTriId: id });
      getDvKt({ dataSearch: { nbDotDieuTriId: id } });
    }
  }, [id, state.show]);

  useEffect(() => {
    if (nbThongTinId && state.show) {
      getThongTinNb({ nbThongTinId, active: true });
    }
  }, [nbThongTinId, state.show]);
  return (
    <Modal
      width={"auto"}
      visible={state.show}
      title={<div className="title-header">Hồ sơ bệnh án người bệnh</div>}
      footer={null}
      onCancel={() => setState({ ...state, show: false })}
    >
      <Content nbDotDieuTriId={nbDotDieuTriId} />
    </Modal>
  );
};

export default forwardRef(ModalHoSoBenhAn);
