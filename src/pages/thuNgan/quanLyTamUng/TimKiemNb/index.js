import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSearch from "../../../../components/BaseSearch";
import { useTranslation } from "react-i18next";
import { Select } from "components";
import IcLocation from "assets/images/thuNgan/icLocation.png";
import { Main } from "./styled";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
const TimKiemPhieu = (props) => {
  const {
    quanLyTamUng: { onChangeInputSearch },
    khoa: { getListKhoaTongHop },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop },
    phong: { getListPhongTongHop },
  } = useDispatch();
  const { listNhaTheoTaiKhoan } = useSelector((state) => state.toaNha);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const { onChangeSelect, nhaTamUng } = props;
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onSearchDate = (data) => {
    onChangeInputSearch(
      data.tuThoiGianVaoVien
        ? data
        : {
            tuThoiGianVaoVien: "",
            denThoiGianVaoVien: "",
          }
    );
  };
  useEffect(() => {
    getListKhoaTongHop({ dsTinhChatKhoa: 70 });
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
    <Main>
      <BaseSearch
        title={t("thuNgan.quanLyTamUng.danhSachNbQuanLyTamUng")}
        titleRight={
          <div className="boLoc">
            <img src={IcLocation} alt={IcLocation} />
            <Select
              data={listNhaTheoTaiKhoan}
              onChange={onChangeSelect}
              value={nhaTamUng}
            />
          </div>
        }
        dataInput={[
          {
            widthInput: "232px",
            type: "dateOptions",
            state: state,
            setState: setState,
            functionChangeInput: (e) => {
              onSearchDate(
                {
                  tuThoiGianVaoVien: e.tuThoiGianVaoVien?.format(
                    "YYYY-MM-DD 00:00:00"
                  ),
                  denThoiGianVaoVien: e.denThoiGianVaoVien?.format(
                    "YYYY-MM-DD 23:59:59"
                  ),
                },
                !!e.tuThoiGianVaoVien
              );
            },
            title: t("thuNgan.thoiGian"),
            format: "DD/MM/YYYY",
          },
          {
            widthInput: "300px",
            placeholder: t("thuNgan.quanLyTamUng.quetQrNbHoacNhapMaNb"),
            functionChangeInput: onChangeInputSearch,
            isScanQR: true,
            keyValueInput: "maNb",
          },
          {
            widthInput: "180px",
            placeholder: t("common.nhapMaHoSo"),
            keyValueInput: "maHoSo",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "190px",
            placeholder: t("common.nhapMaBenhAn"),
            keyValueInput: "maBenhAn",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "232px",
            placeholder: t("thuNgan.hoTen"),
            keyValueInput: "tenNb",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "180px",
            placeholder: t("common.soBHYT"),
            keyValueInput: "maTheBhyt",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "180px",
            placeholder: t("common.sdt"),
            keyValueInput: "soDienThoai",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "180px",
            placeholder: t("thuNgan.chonDoiTuongKCB"),
            keyValueInput: "doiTuongKcb",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            listSelect: listDoiTuongKcb,
          },
        ]}
      />
    </Main>
  );
};

export default TimKiemPhieu;
