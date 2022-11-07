import React from "react";
import IcDelete from "assets/svg/ic-delete.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { forwardRef, useImperativeHandle, useState } from "react";
import SoLuongLeLinh from "../SoLuongLeLinh";
import { WrapperModal } from "./styled";
import IcInfo from "assets/images/khamBenh/icInfo.svg";

const ModalTaoPhieuLinh = (
  {
    // khoId, // kho chọn trong modal chọn kho
  },
  ref
) => {
  const [state, _setState] = useState({
    initState: {
      loaiDichVu: 90,
      // khoId, // kho chọn trong modal chọn kho
      tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
      denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
    },
    listKhoTuTruc: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useImperativeHandle(ref, () => ({
    show: ({} = {}) => {
      setState({ visible: true });
    },
  }));

  const onCancel = () => {
    setState({ visible: false });
  };

  const renderColumns = ({ commonCol }) => [
    commonCol.check,
    commonCol.stt,
    commonCol.maHoSo,
    commonCol.tenNb,
    commonCol.tenHangHoa,
    commonCol.slTra,
    commonCol.ngayThucHien,
    commonCol.ngayKe,
    {
      title: <HeaderSearch title="Tiện tích" />,
      key: "",
      width: "60px",
      dataIndex: "",
      hideSearch: true,
      align: "right",
      render: (_, item, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <IcDelete />
          </div>
        );
      },
    },
  ].filter(item=>item);
  return (
    <WrapperModal
      visible={state.visible}
      width={1200}
      onCancel={onCancel}
      footer={null}
      title={
        <>
          <div>Danh sách người bệnh trong phiếu lĩnh</div>
          <div>
            <IcInfo />
            <span>Danh sách chi tiết NB lĩnh</span>
          </div>
        </>
      }
    >
      <SoLuongLeLinh renderColumns={renderColumns} />
    </WrapperModal>
  );
};

export default forwardRef(ModalTaoPhieuLinh);
