import React, { useRef } from "react";
import { Main } from "./styled";
import DanhSachLuuTru from "pages/hoSoBenhAn/components/DanhSachLuuTru";
import { useTranslation } from "react-i18next";
import { Button, Page } from "components";
import TimKiemLuuTru from "../components/TimKiemLuuTru";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalChoMuonBA,
  ModalLuuTruBA,
  ModalTuChoiBA,
} from "../ChiTietLuuTruBA/modals";

const DanhSachLuuTruBA = (props) => {
  const { t } = useTranslation();

  const refModalTuChoiBA = useRef(null);
  const refModalLuuTruBA = useRef(null);
  const refModalChoMuonBA = useRef(null);

  const { selectedDichVu, page } = useSelector((state) => state.dsLuuTruBa);
  const { doiTrangThaiBA, onSearch, updateData } = useDispatch().dsLuuTruBa;

  const onChangeTrangThaiBA = (trangThai) => () => {
    switch (trangThai) {
      //cho mượn bệnh án
      case 70:
        refModalChoMuonBA.current &&
          refModalChoMuonBA.current.show(
            {
              data: { ...selectedDichVu[0], trangThai },
              listData: selectedDichVu.map((x) => ({ ...x, trangThai })),
            },
            () => {
              updateData({
                selectedDichVu: selectedDichVu.map((x) => ({
                  ...x,
                  trangThaiBenhAn: trangThai,
                })),
              });
              onSearch({ page });
            }
          );
        break;
      //lưu trữ bệnh án
      case 60:
        refModalLuuTruBA.current &&
          refModalLuuTruBA.current.show(
            {
              data: { ...selectedDichVu[0], trangThai },
              listData: selectedDichVu.map((x) => ({ ...x, trangThai })),
            },
            () => {
              updateData({
                selectedDichVu: selectedDichVu.map((x) => ({
                  ...x,
                  trangThaiBenhAn: trangThai,
                })),
              });
              onSearch({ page });
            }
          );
        break;
      //từ chối bệnh án
      case 40:
        refModalTuChoiBA.current &&
          refModalTuChoiBA.current.show(
            {
              data: { ...selectedDichVu[0], trangThai },
              listData: selectedDichVu.map((x) => ({ ...x, trangThai })),
            },
            () => {
              updateData({
                selectedDichVu: selectedDichVu.map((x) => ({
                  ...x,
                  trangThaiBenhAn: trangThai,
                })),
              });
              onSearch({ page });
            }
          );
        break;

      default:
        doiTrangThaiBA(
          selectedDichVu.map((item) => ({ ...item, trangThai }))
        ).then(() => {
          updateData({
            selectedDichVu: selectedDichVu.map((x) => ({
              ...x,
              trangThaiBenhAn: trangThai,
            })),
          });
          onSearch({ page });
        });
        break;
    }
  };

  //10: Chưa hoàn thành
  //20: Chưa nhận
  //30: Đã nhận
  //40: Đã từ chối
  //50: Đã duyệt
  //60: Đã lưu trữ
  //70: Đã cho mượn
  //80: Đã nhận lại
  return (
    <Page
      breadcrumb={[
        { title: t("hsba.hoSoBenhAn"), link: "/ho-so-benh-an" },
        {
          title: t("hsba.danhSachLuuTruBa"),
          link: "/ho-so-benh-an/danh-sach-luu-tru-benh-an",
        },
      ]}
      title={t("hsba.danhSachLuuTruBa")}
      titleRight={
        selectedDichVu &&
        selectedDichVu.length > 0 && (
          <>
            {[null, 10, 20, 40].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(30)} type="primary">
                Nhận BA
              </Button>
            )}
            {[20].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(40)}>Từ chối</Button>
            )}
            {[30].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(20)}>Hủy nhận</Button>
            )}
            {[30].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(50)}>Duyệt BA</Button>
            )}
            {[50].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(30)}>Hủy duyệt</Button>
            )}
            {[50].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(60)}>Lưu trữ</Button>
            )}
            {[60, 80].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(50)}>Hủy lưu trữ</Button>
            )}
            {[60, 80].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(70)}>Cho mượn</Button>
            )}
            {[70].includes(selectedDichVu[0].trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(80)}>Nhận lại</Button>
            )}
            <Button>Tóm tắt</Button>
          </>
        )
      }
    >
      <Main>
        <TimKiemLuuTru />
        <DanhSachLuuTru />
      </Main>

      <ModalTuChoiBA ref={refModalTuChoiBA} />
      <ModalLuuTruBA ref={refModalLuuTruBA} />
      <ModalChoMuonBA ref={refModalChoMuonBA} />
    </Page>
  );
};

export default DanhSachLuuTruBA;
