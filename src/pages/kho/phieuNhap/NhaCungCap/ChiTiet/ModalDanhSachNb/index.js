import React from "react";
import IcDelete from "assets/svg/ic-delete.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SoLuongLeLinh from "../SoLuongLeLinh";
import { WrapperModal } from "./styled";
import IcInfo from "assets/images/khamBenh/icInfo.svg";

const testData = [
  {
    id: 1,
    maBenhAn: "HH046",
    tenNb: "Nguyễn Hồng Huyền Trang",
    ten: "Aspirin",
    slChoLanTruoc: 1,
    slKe: "1",
    ngayThucHien: "20/11/2022 20:11:34",
    ngayKe: "20/11/2022 20:11:34",
  },
  {
    id: 2,
    maBenhAn: "HH046",
    tenNb: "Nguyễn Hồng Huyền Trang",
    ten: "Khẩu trang y tế 4 lớp chống bụi gấp đôi",
    slChoLanTruoc: 2,
    slKe: "2",
    ngayThucHien: "20/11/2022 20:11:34",
    ngayKe: "20/11/2022 20:11:34",
  },
  {
    id: 3,
    maBenhAn: "HH046",
    tenNb: "Nguyễn Hồng Huyền Trang",
    ten: "Aspirin",
    slChoLanTruoc: 50,
    slKe: "50",
    ngayThucHien: "20/11/2022 20:11:34",
    ngayKe: "20/11/2022 20:11:34",
  },
  {
    id: 4,
    maBenhAn: "HH046",
    tenNb: "Nguyễn Hồng Huyền Trang",
    ten: "Khẩu trang y tế 4 lớp chống bụi gấp đôi",
    slChoLanTruoc: 100,
    slKe: "100",
    ngayThucHien: "20/11/2022 20:11:34",
    ngayKe: "20/11/2022 20:11:34",
  },
];

const ModalTaoPhieuLinh = (
  {
    // khoId, // kho chọn trong modal chọn kho
  },
  ref
) => {
  const refConfirm = useRef(null);
  const history = useHistory();
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
    commonCol.maBenhAn,
    commonCol.tenNb,
    commonCol.tenHangHoa,
    commonCol.slKe,
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
  ];
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
      <SoLuongLeLinh renderColumns={renderColumns} dataSource={testData} />
    </WrapperModal>
  );
};

export default connect(
  (state) => ({
    listLoaiDichVu: state.utils.listLoaiDichVu || [],
    listKhoaTheoTaiKhoan: state.khoa.listKhoaTheoTaiKhoan || [],
    listKhoUser: state.kho.listKhoUser || [],
    listKhoCha: state.kho.listKhoCha || [],

    // khoId: state.phieuNhapXuat.thongTinPhieu?.khoId,
  }),
  ({
    utils: { getUtils },
    kho: { getListKhoCha },
    nhapKho: { taoPhieuLinhBu },
    phieuNhapXuat: { guiDuyetPhieu },
  }) => ({
    getUtils,
    getListKhoCha,
    taoPhieuLinhBu,
    guiDuyetPhieu,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalTaoPhieuLinh));
