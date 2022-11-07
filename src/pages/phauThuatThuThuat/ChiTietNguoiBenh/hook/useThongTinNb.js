import { useStore } from "hook";
import { useMemo } from "react";

function useThongTinNb() {
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", null);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", null);
  
  const thongTinNb = useMemo(() => {
    return infoPatient || thongTinBenhNhan || {};
  }, [infoPatient, thongTinBenhNhan]);

  return [thongTinNb];
}
export default useThongTinNb;
