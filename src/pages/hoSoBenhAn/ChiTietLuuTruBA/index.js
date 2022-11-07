import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ThongTinNguoiBenh from "./ThongTinNguoiBenh";
import { Main, MainPage } from "./styled";
import ThongTinLuuTru from "./ThongTinLuuTru";
import ThongTinDieuTri from "./ThongTinDieuTri";
import ThongTinPhimChup from "./ThongTinPhimChup";
import { Button } from "components";
import FormWraper from "components/FormWraper";
import { Form } from "antd";
import moment from "moment";
import { ModalChoMuonBA, ModalLuuTruBA, ModalTuChoiBA } from "./modals";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ChiTietLuuTruBA = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const refModalTuChoiBA = useRef(null);
  const refModalLuuTruBA = useRef(null);
  const refModalChoMuonBA = useRef(null);

  const { chiTietLuuTru } = useSelector((state) => state.dsLuuTruBa);
  const {
    dsLuuTruBa: { getChiTietLuuTruBA, doiTrangThaiBA },
  } = useDispatch();
  const [listdoituongkcb] = useEnum(ENUM.DOI_TUONG_KCB);

  useEffect(() => {
    getChiTietLuuTruBA(id);
  }, []);

  useEffect(() => {
    const {
      maLuuTru,
      thoiGianLuuTru,
      maBenhAn,
      thoiGianNhanBa,
      trangThaiBenhAn,
      lyDoTuChoi,
      thoiGianTuChoi,
      lyDoMuon,
      thoiGianMuon,
      nguoiMuon,
      soDienThoaiMuonBa,

      soNgayDieuTri,
      thoiGianRaVien,
      huongDieuTri,
      tienConLai,
      thoiGianVaoVien,
      ketQuaDieuTri,
      soNamLuuTru,
      trangThaiNb,

      dsCdChinh,
      dsCdKemTheo,
      tenKhoaNb,
      tenLoaiBenhAn,
      doiTuongKcb,
    } = chiTietLuuTru || {};

    form.setFieldsValue({
      maLuuTru,
      thoiGianLuuTru: thoiGianLuuTru ? moment(thoiGianLuuTru) : null,
      maBenhAn,
      thoiGianNhanBa: thoiGianNhanBa ? moment(thoiGianNhanBa) : null,
      trangThaiBenhAn,
      lyDoTuChoi,
      thoiGianTuChoi: thoiGianTuChoi ? moment(thoiGianTuChoi) : null,
      lyDoMuon,
      thoiGianMuon: thoiGianMuon ? moment(thoiGianMuon) : null,
      nguoiMuon,
      soDienThoaiMuonBa,

      soNgayDieuTri,
      thoiGianRaVien: thoiGianRaVien ? moment(thoiGianRaVien) : null,
      huongDieuTri,
      tienConLai,
      thoiGianVaoVien: thoiGianVaoVien ? moment(thoiGianVaoVien) : null,
      ketQuaDieuTri,
      soNamLuuTru,
      trangThaiNb,

      dsCdChinh: (dsCdChinh || []).map((x) => x.ten).join(", "),
      dsCdKemTheo: (dsCdKemTheo || []).map((x) => x.ten).join(", "),
      tenKhoaNb,
      tenLoaiBenhAn,
      doiTuongKcb:
        (listdoituongkcb || []).find((x) => x.id === doiTuongKcb)?.ten || "",
    });
  }, [chiTietLuuTru, listdoituongkcb]);

  const onChangeTrangThaiBA = (trangThai) => () => {
    switch (trangThai) {
      //cho mượn bệnh án
      case 70:
        refModalChoMuonBA.current &&
          refModalChoMuonBA.current.show({
            data: { ...chiTietLuuTru, trangThai },
          });
        break;
      //lưu trữ bệnh án
      case 60:
        refModalLuuTruBA.current &&
          refModalLuuTruBA.current.show({
            data: { ...chiTietLuuTru, trangThai },
          });
        break;
      //từ chối bệnh án
      case 40:
        refModalTuChoiBA.current &&
          refModalTuChoiBA.current.show({
            data: { ...chiTietLuuTru, trangThai },
          });
        break;

      default:
        doiTrangThaiBA([{ ...chiTietLuuTru, trangThai }]).then(() => {
          getChiTietLuuTruBA(id);
        });
        break;
    }
  };

  return (
    <MainPage
      breadcrumb={[
        { link: "/ho-so-benh-an", title: "Hồ sơ bệnh án" },
        {
          link: "/ho-so-benh-an/danh-sach-luu-tru-benh-an",
          title: "Danh sách lưu trữ bệnh án",
        },
        {
          link: `/ho-so-benh-an/chi-tiet-luu-tru-ba/${id}`,
          title: "Chi tiết lưu trữ bệnh án",
        },
      ]}
    >
      <Main>
        <ThongTinNguoiBenh />

        <div className="content">
          <FormWraper
            form={form}
            style={{ width: "100%" }}
            labelCol={{
              flex: "140px",
            }}
            labelAlign={"left"}
          >
            <ThongTinLuuTru disabled={true} />

            <ThongTinDieuTri disabled={true} />

            <ThongTinPhimChup />
          </FormWraper>
        </div>

        <div className="action-bottom">
          <div className="button-left">
            <Button>Tóm tắt bệnh án</Button>
          </div>
          <div className="button-right">
            {[null, 10, 20, 40].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(30)} type="primary">
                Nhận BA
              </Button>
            )}
            {[20].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(40)}>Từ chối</Button>
            )}
            {[30].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(20)}>Hủy nhận</Button>
            )}
            {[30].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(50)}>Duyệt BA</Button>
            )}
            {[50].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(30)}>Hủy duyệt</Button>
            )}
            {[50].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(60)}>Lưu trữ</Button>
            )}
            {[60, 80].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(50)}>Hủy lưu trữ</Button>
            )}
            {[60, 80].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(70)}>Cho mượn</Button>
            )}
            {[70].includes(chiTietLuuTru.trangThaiBenhAn) && (
              <Button onClick={onChangeTrangThaiBA(80)}>Nhận lại</Button>
            )}
          </div>
        </div>
      </Main>

      <ModalTuChoiBA ref={refModalTuChoiBA} />
      <ModalLuuTruBA ref={refModalLuuTruBA} />
      <ModalChoMuonBA ref={refModalChoMuonBA} />
    </MainPage>
  );
};

export default ChiTietLuuTruBA;
