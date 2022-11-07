import React, { useRef } from "react";
import { Main, WrapButtonRight, WrapperPopover } from "./styled";
import { useDispatch } from "react-redux";
import { Page, Button } from "components";
import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import SoDoPhongGiuong from "pages/quanLyNoiTru/soDoPhongGiuong";
import ModalTaoPhieuTra from "../PhieuTra/ModalTaoPhieuTra";
import ModalTaoPhieuLinh from "../PhieuLinh/ModalTaoPhieuLinh";
import { useParams } from "react-router-dom";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import TimKiemHangHoa from "./TimKiemHangHoa";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useTranslation } from "react-i18next";

const TraHangHoa = ({ history }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const refModalPhieuLinh = useRef();
  const refModalPhieuTra = useRef();
  const refSoDoPhongGiuong = useRef();
  const {
    soDoPhongGiuong: { updateDataSearch },
  } = useDispatch();

  const clickTaoPhieuTra = (e) => {
    if (
      refModalPhieuTra.current &&
      (["svg", "SPAN"].every((i) => i !== e?.target?.nodeName) ||
        e?.target?.className == "label-btn")
    ) {
      refModalPhieuTra.current.show();
    }
  };

  const onClickPhongGiuong = () => {
    updateDataSearch({
      nbDotDieuTriId: null,
      khoaId: 56,
    });

    refSoDoPhongGiuong.current && refSoDoPhongGiuong.current.show();
  };

  const onClickDsNbTraDv = () => {
    history.push("/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu");
  };

  return (
    <Page
      height="10"
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          link: `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${id}`,
          title: "Điều trị nội trú",
        },
        {
          link: `/quan-ly-noi-tru/tra-hang-hoa/${id}`,
          title: t("quanLyNoiTru.danhSachHangHoaTra"),
        },
      ]}
      title={t("quanLyNoiTru.danhSachHangHoaTra")}
      titleRight={
        <WrapButtonRight>
          <Button onClick={onClickPhongGiuong}>Sơ đồ Phòng - Giường</Button>
          <Button
            className="btn_new"
            // type={"success"}
            onClick={clickTaoPhieuTra}
            rightIcon={
              <Popover
                trigger={"click"}
                content={
                  <WrapperPopover width={250}>
                    <div
                      className="item-popover"
                      onClick={() => {
                        history.push("/quan-ly-noi-tru/danh-sach-phieu-tra");
                      }}
                    >
                      Danh sách phiếu trả
                    </div>
                    <div className="item-popover" onClick={clickTaoPhieuTra}>
                      Tạo phiếu trả
                    </div>
                    <div className="item-popover" onClick={onClickDsNbTraDv}>
                      Danh sách NB chưa hoàn thành trả
                    </div>
                  </WrapperPopover>
                }
              >
                <MoreOutlined className={"icon-more"} />
              </Popover>
            }
            iconHeight={20}
          >
            <span className="label-btn">Tạo phiếu trả</span>
          </Button>
        </WrapButtonRight>
      }
    >
      <Main>
        <ThongTinBenhNhan />
        <TimKiemHangHoa />
        <DanhSachHangHoa />
        <ModalTaoPhieuLinh ref={refModalPhieuLinh} />
        <ModalTaoPhieuTra ref={refModalPhieuTra} />
        <SoDoPhongGiuong ref={refSoDoPhongGiuong} />
      </Main>
    </Page>
  );
};

export default TraHangHoa;
