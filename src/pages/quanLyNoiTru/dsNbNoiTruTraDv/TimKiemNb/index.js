import { ENUM } from "constants/index";
import { useEnum } from "hook";
import useListAll from "hook/useListAll";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSearch from "../../../../components/BaseSearch";
const TimKiemPhieu = (props) => {
  const {
    danhSachNguoiBenhNoiTru: { onChangeInputSearch },
    khoa: { getListKhoaTongHop },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop },
    phong: { getListPhongTongHop },
  } = useDispatch();
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [listDoiTuongKCB] = useEnum(ENUM.DOI_TUONG_KCB);
  const { listDataTongHop, listKhoaTheoTaiKhoan } = useSelector(
    (state) => state.khoa
  );
  const { listNhanVien } = useSelector((state) => state.nhanVien);
  const { listRoom } = useSelector((state) => state.phong);
  const { dsTrangThai } = props;
  const [listAllLoaiBenhAn] = useListAll("loaiBenhAn");
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListKhoaTongHop({
      dsTinhChatKhoa: 70,
      page: "",
      size: "",
    });
    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getListNhanVienTongHop({
        page: null,
        size: null,
        active: true,
        "vanBang.ma": data,
      });
    });
  }, []);
  useEffect(() => {
    if (state?.dsKhoaNbId) {
      getListPhongTongHop({
        page: null,
        size: null,
        khoaId: state?.dsKhoaNbId,
      });
    }
  }, [state?.dsKhoaNbId]);
  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: "Tìm tên NB, QR nb, mã hs",
          functionChangeInput: onChangeInputSearch,
          isScanQR: true,
          qrGetValue: "maHoSo",
          keysFlexible: [
            {
              key: "tenNb",
              type: "string",
            },
            {
              key: "maHoSo",
              type: "number",
            },
          ],
        },
        {
          widthInput: "232px",
          placeholder: "Mã BA",
          keyValueInput: "maBenhAn",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "212px",
          placeholder: "Khoa",
          keyValueInput: "dsKhoaNbId",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listDataTongHop,
        },
        {
          widthInput: "232px",
          placeholder: "Loại bệnh án",
          keyValueInput: "loaiBenhAnId",
          listSelect: listAllLoaiBenhAn,
          functionChangeInput: onChangeInputSearch,
          type: "select",
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        // funcRefreshData: () => { onSearch({ page: 0, size: 10 }) },
        funcSearchData: onChangeInputSearch,
        data: [
          {
            widthInput: "212px",
            placeholder: "Khoa",
            key: "khoaNbId",
            type: "select",
            functionChangeInput: onChangeInputSearch,
            dataSelect: [
              { id: null, ten: "Tất cả" },
              ...(listKhoaTheoTaiKhoan || []),
            ],
          },
          {
            widthInput: "212px",
            placeholder: "Bác sĩ điều trị",
            key: "bacSiDieuTriId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [{ id: null, ten: "Tất cả" }, ...(listNhanVien || [])],
          },
          {
            widthInput: "212px",
            placeholder: "Trạng thái NB",
            key: "trangThai",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [
              { id: null, ten: "Tất cả" },
              ...(listTrangThaiNb || []).filter((x) =>
                dsTrangThai.includes(x.id)
              ),
            ],
          },
          {
            widthInput: "212px",
            placeholder: "Tìm theo đối tượng KCB",
            key: "doiTuongKcb",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [
              { id: null, ten: "Tất cả" },
              ...(listDoiTuongKCB || []),
            ],
          },
          {
            widthInput: "212px",
            placeholder: "Phòng",
            key: "phongId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [{ id: null, ten: "Tất cả" }, ...(listRoom || [])],
          },
          {
            widthInput: "212px",
            placeholder: "Giường",
            key: "giuongId",
            type: "normal",
          },
          {
            key: ["tuThoiGianVaoKhoa", "denThoiGianVaoKhoa"],
            placeholder: ["Từ ngày", "đến ngày"],
            type: "date-1",
            title: "Thời gian vào khoa",
          },
          {
            key: ["tuThoiGianVaoKhoaNhapVien", "denThoiGianVaoKhoaNhapVien"],
            placeholder: ["Từ ngày", "đến ngày"],
            type: "date-1",
            title: "Thời gian nhập viện",
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieu;
