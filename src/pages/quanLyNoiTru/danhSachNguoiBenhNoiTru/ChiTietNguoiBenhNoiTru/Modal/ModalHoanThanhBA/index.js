import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import ThongTinLuuTru from "pages/hoSoBenhAn/ChiTietLuuTruBA/ThongTinLuuTru";
import ThongTinDieuTri from "pages/hoSoBenhAn/ChiTietLuuTruBA/ThongTinDieuTri";
import ThongTinPhimChup from "pages/hoSoBenhAn/ChiTietLuuTruBA/ThongTinPhimChup";
import { useDispatch, useSelector } from "react-redux";
import ThongTinNguoiBenh from "pages/hoSoBenhAn/ChiTietLuuTruBA/ThongTinNguoiBenh";
import FormWraper from "components/FormWraper";
import moment from "moment";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const ModalHoanThanhBA = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);

  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const {
    dsLuuTruBa: { getChiTietLuuTruBA, hoanThanhBA },
  } = useDispatch();
  const [listdoituongkcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const { chiTietLuuTru } = useSelector((state) => state.dsLuuTruBa);

  const { tenNb, tuoi, id } = infoPatient || {};
  const age = tuoi ? ` - ${tuoi} tuổi` : "";

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
      {}
    );
  }, [infoPatient, listGioiTinh]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

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
  }, [chiTietLuuTru]);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });

      getChiTietLuuTruBA(id);
    },
  }));

  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  const onHoanThanhBa = () => {
    hoanThanhBA({
      id,
      trangThai: 20,
    }).then(() => {
      getChiTietLuuTruBA(id);
      onClose();
    });
  };

  const onHuyHoanThanhBa = () => {
    hoanThanhBA({
      id,
      trangThai: 10,
    }).then(() => {
      getChiTietLuuTruBA(id);
      onClose();
    });
  };

  return (
    <ModalTemplate
      width={"80%"}
      closable={true}
      ref={refModal}
      title={"Chi tiết lưu trữ BA"}
      rightTitle={`${tenNb} - ${gioiTinh.ten}${age}`}
      onCancel={onClose}
      actionLeft={
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={() => {
            onClose();
          }}
          leftIcon={<IcArrowLeft />}
        >
          Quay lại
        </Button.Text>
      }
      //10: Chưa hoàn thành
      //20: Chưa nhận
      //30: Đã nhận
      //40: Đã từ chối
      //50: Đã duyệt
      //60: Đã lưu trữ
      //70: Đã cho mượn
      //80: Đã nhận lại
      actionRight={
        <>
          {[20, 40].includes(chiTietLuuTru?.trangThaiBenhAn) && (
            <Button onClick={onHuyHoanThanhBa}>Hủy hoàn thành</Button>
          )}

          {[null, 10].includes(chiTietLuuTru?.trangThaiBenhAn) && (
            <Button type="primary" onClick={onHoanThanhBa}>
              Hoàn thành
            </Button>
          )}
        </>
      }
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
          </FormWraper>

          <ThongTinPhimChup />
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHoanThanhBA);
