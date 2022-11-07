import React, { useMemo } from "react";
import { Tabs } from "components";
import DonThuoc from "./DonThuoc";
import IcChiDinh from "assets/svg/noiTru/ic-chi-dinh-dich-vu.svg";
import IcThuoc from "assets/svg/noiTru/ic-don-thuoc.svg";
import IcPhauThuat from "assets/svg/noiTru/ic-phau-thuat.svg";
import IcVatTu from "assets/svg/noiTru/ic-vat-tu.svg";
import IcSuatAn from "assets/svg/noiTru/ic-suat-an.svg";
import IcHoaChat from "assets/svg/noiTru/ic-hoa-chat.svg";
import IcMau from "assets/svg/noiTru/ic-mau.svg";
import { Main } from "./styled";
import VatTu from "./VatTu";
import DichVuKyThuat from "./DichVuKyThuat";
import { useDispatch, useSelector } from "react-redux";
import SuatAn from "./SuatAn";
import { CaretDownOutlined } from "@ant-design/icons";
import GoiPTTT from "./GoiPTTT";
import HoaChat from "./HoaChat";

const ChiDinhDichVu = (props) => {
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { getListThietLapChonKhoTheoTaiKhoan } = useDispatch().thietLapChonKho;
  const { isReadonly } = props;
  const onChangeTab = (e) => {
    let loaiDichVu = 90;
    if (e === "3") {
      loaiDichVu = 100;
    }
    if (e === "6") {
      loaiDichVu = 110;
    }
    let payload = {
      khoaNbId: infoPatient?.khoaNbId,
      khoaChiDinhId: currentToDieuTri?.khoaChiDinhId,
      doiTuong: infoPatient?.doiTuong,
      loaiDoiTuongId: infoPatient?.loaiDoiTuongId,
      capCuu: infoPatient?.capCuu,
      phongId: infoPatient?.phongId,
      noiTru: true,
      canLamSang: false,
      loaiDichVu: loaiDichVu,
    };
    getListThietLapChonKhoTheoTaiKhoan({ ...payload });
  };

  const listTabs = [
    {
      name: "Chỉ định dịch vụ",
      component: <DichVuKyThuat isReadonly={isReadonly} />,
      iconTab: <IcChiDinh />,
    },
    {
      name: "Gói mổ 10 ngày",
      component: <GoiPTTT />,
      iconTab: <IcPhauThuat />,
    },
    {
      name: "Thuốc",
      component: <DonThuoc isReadonly={isReadonly} />,
      iconTab: <IcThuoc />,
    },
    {
      name: "Vật tư",
      component: <VatTu isReadonly={isReadonly} />,
      iconTab: <IcVatTu />,
    },
    {
      name: "Suất ăn",
      component: <SuatAn />,
      iconTab: <IcSuatAn />,
    },
    {
      name: "Máu",
      iconTab: <IcMau />,
    },
    {
      name: "Hóa chất",
      iconTab: <IcHoaChat />,
      component: <HoaChat />,
    },
  ];
  return (
    <Main top={16} bottom={0}>
      <Tabs.Left
        type="card"
        moreIcon={<CaretDownOutlined />}
        className="tab-main"
        defaultActiveKey="0"
        onChange={onChangeTab}
      >
        {[...listTabs].map((obj, i) => {
          return (
            <Tabs.TabPane
              key={i}
              tab={
                <div>
                  {obj?.iconTab}
                  {obj?.name}
                </div>
              }
            >
              {obj?.component}
            </Tabs.TabPane>
          );
        })}
      </Tabs.Left>
    </Main>
  );
};
export default ChiDinhDichVu;
