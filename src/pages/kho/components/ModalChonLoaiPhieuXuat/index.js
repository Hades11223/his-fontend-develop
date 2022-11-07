import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import ModalTemplate from "pages/kho/components/ModalTemplate";
import { Main } from "./styled";
import { Form } from "antd";
import IcLoaiPhieuXuat from "assets/images/kho/ic-loai-phieu-xuat.svg";
import { useHistory } from "react-router-dom";

const ModalChonLoaiPhieuXuat = forwardRef((props, ref) => {
  const refOk = useRef(null);
  const refModal = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (
      {
        title = "Lý do từ chối",
        message = "Điền lý do từ chối duyệt",
        buttonCancelText = "Hủy",
        buttonOkText = "Đồng ý",
        value,
      },
      onOk
    ) => {
      setState({ title, message, buttonCancelText, buttonOkText, value });
      form.setFieldsValue({ lyDo: "" });
      form.resetFields();
      refOk.current = onOk;
      refModal.current && refModal.current.show();
    },
  }));
  const [form] = Form.useForm();

  const onClick = (index) => () => {
    refModal.current && refModal.current.hide();
    refOk.current && refOk.current(index);
    return;
  };

  return (
    <ModalTemplate ref={refModal} width={376} title={"Chọn loại phiếu xuất"}>
      <Main>
        <div className="item" onClick={onClick(30)}>
          <IcLoaiPhieuXuat className="item-icon" width={100} />
          <div className="item-content">
            <div className="item-title">PHIẾU XUẤT CHUYỂN KHO</div>
            <div className="item-description">
              Tạo phiếu xuất chuyển hàng hóa đến các kho khác
            </div>
          </div>
        </div>
        <div className="item" onClick={onClick(40)}>
          <IcLoaiPhieuXuat className="item-icon" width={100} />
          <div className="item-content">
            <div className="item-title">PHIẾU XUẤT TRẢ NHÀ CUNG CẤP</div>
            <div className="item-description">
              Tạo phiếu xuất trả lại nhà cung cấp
            </div>
          </div>
        </div>
        <div className="item" onClick={onClick(90)}>
          <IcLoaiPhieuXuat className="item-icon" width={100} />
          <div className="item-content">
            <div className="item-title">PHIẾU XUẤT KHÁC</div>
            <div className="item-description">
              Tạo phiếu xuất hàng đi tài trợ, xuất hủy, xuất dùng chung,...
            </div>
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
});

export default ModalChonLoaiPhieuXuat;
