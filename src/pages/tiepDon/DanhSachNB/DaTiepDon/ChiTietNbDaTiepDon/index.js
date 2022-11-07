import React, { useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { Row } from "antd";
import ThongTinBN from "pages/tiepDon/KeDichVuKham/LeftPanel/ThongTinBN";
import DanhSachDichVu from "pages/tiepDon/components/DanhSachDichVu";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Page } from "components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ModalSignPrint from "components/ModalSignPrint";
import { PrinterOutlined } from "@ant-design/icons";
import PhatHanhThe from "pages/tiepDon/components/PhatHanhThe";

const ChiTietNbDaTiepDon = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const refModalSignPrint = useRef(null);

  const {
    nbDotDieuTri: { getById },
    nbKSK: { tiepDonNBKSK },
  } = useDispatch();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);

  const isKsk = useMemo(() => {
    return thongTinBenhNhan?.khamSucKhoe || thongTinBenhNhan?.loaiDoiTuongKsk;
  }, [thongTinBenhNhan]);

  useEffect(() => {
    // vì response có 1 số trường ko đồng bộ (có cái có, có cái ko và ngược lại)
    // nên hiện tại dùng 2 API /nb-dot-dieu-tri/:id và /nb-dot-dieu-tri/tong-hop/:id
    if (id) getById(id);
    // if (id) getChiTietById(id);
  }, [id]);

  //function
  function tiepNhanNbKSK() {
    tiepDonNBKSK([thongTinBenhNhan.id]).then(() => {
      getById(id);
    });
  }

  function keThemDV() {
    history.push(`/tiep-don/dich-vu/${id}`);
  }

  const onKeDichVu = (e, payload = {}) => {
    refModalSignPrint.current.show({
      nbDotDieuTriId: id,
      maManHinh: "002",
      maViTri: "00201",
      dsChiDinhTuLoaiDichVu: [200, 230, 240],
    });
  };

  const onPrint = () => {
    onKeDichVu(null, { isInPhieu: true });
  };

  return (
    <Page
      breadcrumb={[
        {
          title: t("tiepDon.quanLyTiepDon"),
          link: "/quan-ly-tiep-don",
        },
        {
          title: t("tiepDon.danhSachNguoiBenhDaTiepDon"),
          link: "/quan-ly-tiep-don/danh-sach-nb-da-tiep-don",
        },
        {
          title: t("tiepDon.chiTietNguoiBenhDaTiepDon"),
          link: `/quan-ly-tiep-don/danh-sach-nb-da-tiep-don/${id}`,
        },
      ]}
      title={t("tiepDon.chiTietNguoiBenhDaTiepDon")}
    >
      <Main>
        <Row span={24}>
          <ThongTinBN />
        </Row>
        <Row className="content">
          <DanhSachDichVu nbDotDieuTriId={id} isNBKhamSucKhoe={isKsk} />
        </Row>
        <div className="bottom-action">
          <PhatHanhThe />

          <Button onClick={onPrint} icon={<PrinterOutlined />}>
            {t("tiepDon.inGiayTo")}
          </Button>
          <Button onClick={keThemDV}>{t("tiepDon.themDichVu")}</Button>
          {isKsk && thongTinBenhNhan?.trangThaiKsk === 10 && (
            <Button type="primary" onClick={tiepNhanNbKSK}>
              {t("tiepDon.tiepNhanNguoiBenhKSK")}
            </Button>
          )}
        </div>
      </Main>

      <ModalSignPrint ref={refModalSignPrint} />
    </Page>
  );
};
export default ChiTietNbDaTiepDon;
