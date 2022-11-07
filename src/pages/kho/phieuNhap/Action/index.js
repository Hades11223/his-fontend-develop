import React, { useMemo, useRef } from "react";
import IcEdit from "assets/images/kho/ic-edit.svg";
import IcSend from "assets/images/kho/ic-send.svg";
import IcCancel from "assets/images/kho/ic-cancel.svg";
import IcSave from "assets/images/kho/ic-save.svg";
import { useHistory } from "react-router-dom";
import Button from "pages/kho/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";
import { useParams } from "react-router-dom";
import ModalNhapLyDo from "pages/kho/components/ModalNhapLyDo";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";

const mapButton = ({
  onEdit,
  onGuiDuyetPhieu,
  onTuChoiDuyet,
  onHuyDuyet,
  onDuyetPhieu,
}) => ({
  suaPhieu: {
    condition: [
      {
        loaiPhieu: 2,
        trangThai: 10,
        loaiNhapXuat: [10, 20],
        roles: ROLES["KHO"].SUA_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 10,
        loaiNhapXuat: [30, 40, 90],
        roles: ROLES["KHO"].SUA_PHIEU_XUAT_KHO,
      },
      {
        loaiPhieu: 2,
        trangThai: 15,
        loaiNhapXuat: [10, 20],
        roles: ROLES["KHO"].SUA_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 15,
        loaiNhapXuat: [30, 40, 90],
        roles: ROLES["KHO"].SUA_PHIEU_XUAT_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 20,
        loaiNhapXuat: [20],
        roles: ROLES["KHO"].SUA_PHIEU_XUAT_KHO,
      },
    ],
    component: (
      <Button
        key={1}
        onClick={onEdit}
        className="left-btn"
        rightIcon={<IcEdit />}
        minWidth={100}
      >
        Sửa phiếu
      </Button>
    ),
  },
  guiDuyet: {
    condition: [
      {
        loaiPhieu: 2,
        trangThai: 10,
        loaiNhapXuat: [10, 20, 85],
        roles: ROLES["KHO"].GUI_DUYET_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 10,
        loaiNhapXuat: [30, 40, 90],
        roles: ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO,
      },
      {
        loaiPhieu: 2,
        trangThai: 15,
        loaiNhapXuat: [10, 20, 80],
        roles: ROLES["KHO"].GUI_DUYET_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 15,
        loaiNhapXuat: [30, 40, 90],
        roles: ROLES["KHO"].GUI_DUYET_PHIEU_XUAT_KHO,
      },
    ],
    component: (
      <Button
        key={2}
        className="right-btn"
        onClick={onGuiDuyetPhieu}
        rightIcon={<IcSend />}
        type="primary"
        minWidth={100}
      >
        Gửi duyệt
      </Button>
    ),
  },
  tuChoiDuyet: {
    condition: [
      { loaiPhieu: 2, trangThai: 20, loaiNhapXuat: [30] },
      { loaiPhieu: 1, trangThai: 20, loaiNhapXuat: [20, 80] },
    ],
    component: (
      <Button
        key={3}
        className="left-btn"
        onClick={onTuChoiDuyet}
        rightIcon={<IcCancel />}
        minWidth={100}
      >
        Từ chối duyệt
      </Button>
    ),
  },
  huyDuyet: {
    condition: [
      {
        loaiPhieu: 2,
        trangThai: 30,
        loaiNhapXuat: [10, 30],
        roles: ROLES["KHO"].HUY_DUYET_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 30,
        loaiNhapXuat: [20, 40, 80, 90],
        roles: ROLES["KHO"].HUY_DUYET_PHIEU_XUAT_KHO,
      },
    ],
    component: (
      <Button
        key={4}
        className="right-btn"
        onClick={onHuyDuyet}
        rightIcon={<IcCancel />}
        minWidth={100}
      >
        Hủy duyệt
      </Button>
    ),
  },
  huyGuiDuyet: {
    condition: [
      {
        loaiPhieu: 2,
        trangThai: 20,
        loaiNhapXuat: [10, 20],
        roles: ROLES["KHO"].HUY_GUI_DUYET_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 20,
        loaiNhapXuat: [30, 40, 90],
        roles: ROLES["KHO"].HUY_DUYET_PHIEU_XUAT_KHO,
      },
    ],
    component: (
      <Button
        key={5}
        className="right-btn"
        onClick={onTuChoiDuyet}
        rightIcon={<IcCancel />}
        minWidth={100}
      >
        Hủy gửi duyệt
      </Button>
    ),
  },
  duyet: {
    condition: [
      {
        loaiPhieu: 2,
        trangThai: 20,
        loaiNhapXuat: [10, 30],
        roles: ROLES["KHO"].DUYET_PHIEU_NHAP_KHO,
      },
      {
        loaiPhieu: 1,
        trangThai: 20,
        loaiNhapXuat: [20, 40, 80, 90],
        roles: ROLES["KHO"].DUYET_PHIEU_XUAT_KHO,
      },
    ],
    component: (
      <Button
        key={6}
        className="right-btn"
        onClick={onDuyetPhieu}
        type={"primary"}
        rightIcon={<IcSave />}
        minWidth={100}
      >
        Duyệt
      </Button>
    ),
  },
});

const Action = ({
  loaiPhieu = 2, // 1: xuất kho, khác (2): nhập kho
  allowEdit = true,
  hiddenCancel = false, // ẩn nút hủy duyệt
  showBack,
  listBtn,
  otherBtn,
  ...props
}) => {
  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);
  const { id } = useParams();
  const refModalNhapLyDo = useRef(null);
  const {
    phieuNhapXuat: { guiDuyetPhieu, duyetPhieu, huyDuyet, tuChoiDuyet },
  } = useDispatch();
  const { push, goBack } = useHistory();
  const onDuyetPhieu = () => {
    duyetPhieu({ id });
  };

  const onHuyDuyet = () => {
    refModalNhapLyDo.current &&
      refModalNhapLyDo.current.show(
        {
          title: "Lý do hủy duyệt ",
          message: "Điền lý do hủy duyệt",
        },
        (lyDo) => {
          huyDuyet({ id, lyDo });
        }
      );
  };

  const onGuiDuyetPhieu = () => {
    guiDuyetPhieu({ id });
  };

  const onTuChoiDuyet = () => {
    refModalNhapLyDo.current &&
      refModalNhapLyDo.current.show(
        {
          title: "Lý do từ chối ",
          message: "Điền lý do từ chối duyệt",
        },
        (lyDo) => {
          tuChoiDuyet({ id, lyDo });
        }
      );
  };

  const onEdit = (e) => {
    if (loaiPhieu == 1) {
      push(`/kho/xuat-kho/chinh-sua/${thongTinPhieu?.id}`);
    } else {
      if (thongTinPhieu.loaiNhapXuat == 30) {
        push(`/kho/xuat-kho/chinh-sua/${thongTinPhieu?.id}`);
      } else if (thongTinPhieu.thangDuTru)
        push(`/kho/phieu-nhap-du-tru/chinh-sua/${thongTinPhieu?.id}`);
      else push(`/kho/phieu-nhap-nha-cung-cap/chinh-sua/${thongTinPhieu?.id}`);
    }
  };

  const buttonList = mapButton({
    onEdit,
    onGuiDuyetPhieu,
    onTuChoiDuyet,
    onHuyDuyet,
    onDuyetPhieu,
  });

  return (
    <Main className="action">
      {showBack && (
        <Button.Text
          className={"mr-auto"}
          type="primary"
          onClick={goBack}
          leftIcon={<IcArrowLeft />}
        >
          Quay lại
        </Button.Text>
      )}
      {otherBtn && otherBtn}
      {(listBtn
        ? listBtn.map((item) => buttonList[item])
        : Object.values(buttonList).filter((btn) =>
            btn.condition.some(
              (condition) =>
                condition.loaiPhieu === loaiPhieu &&
                condition.trangThai === thongTinPhieu.trangThai &&
                (!condition.roles || checkRole([condition.roles])) &&
                condition.loaiNhapXuat.some(
                  (lnx) => lnx === thongTinPhieu.loaiNhapXuat
                )
            )
          )
      ).map((btn) => btn.component)}
      <ModalNhapLyDo ref={refModalNhapLyDo} />
    </Main>
  );
};

export default Action;
