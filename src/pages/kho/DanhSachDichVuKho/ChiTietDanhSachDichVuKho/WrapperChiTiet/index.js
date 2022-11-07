import React, { memo } from "react";
import ThongTinDichVu from "./ThongTinDichVu";
import DanhSach from "./DanhSach";
import { Main } from "./styled";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import Button from "pages/kho/components/Button";

const LeftPanel = (props) => {
  const { selectedItem: selectedGiuChoItem } = useSelector(
    (state) => state.danhSachDichVuKhoChiTiet
  );
  const { loaiNhapXuat, trangThai, phieuNhapXuatId } = selectedGiuChoItem || {};
  const { huyDatTruoc, datTruoc, getListPhieuNhapXuatChiTiet, updateData } =
    useDispatch().danhSachDichVuKhoChiTiet;

  const onHuyGiuTon = () => {
    huyDatTruoc(phieuNhapXuatId).then(() => {
      getListPhieuNhapXuatChiTiet({ page: 0, nhapKho: false });

      updateData({ selectedItem: null });
    });
  };

  const onGiuTon = () => {
    datTruoc(phieuNhapXuatId).then(() => {
      getListPhieuNhapXuatChiTiet({
        page: 0,
        nhapKho: false,
        loaiNhapXuat: 100,
      });

      updateData({ selectedItem: null });
    });
  };

  return (
    <Main>
      <ThongTinDichVu {...props} />
      <DanhSach {...props} />
      <div className="button-bottom">
        {loaiNhapXuat == 100 && trangThai == 15 && (
          <Button onClick={onHuyGiuTon} minWidth={100}>
            Hủy giữ tồn
          </Button>
        )}

        {loaiNhapXuat == 100 && trangThai == 10 && (
          <Button onClick={onGiuTon} minWidth={100}>
            Giữ tồn
          </Button>
        )}
      </div>
    </Main>
  );
};

const mapDispatchToProps = () => ({});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(LeftPanel);
