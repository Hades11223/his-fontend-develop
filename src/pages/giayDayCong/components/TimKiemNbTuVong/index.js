import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BaseSearch, Button } from "components";
import { useTranslation } from "react-i18next";
import useChangeScreen from "pages/giayDayCong/config";
import { LOAI_GIAY_GUI_CONG_BHXH } from "constants/index";

const TimKiemNbTuVong = ({ layerId, ...props }) => {
  const refFocusTenNb = useRef();
  const { t } = useTranslation();
  const { onChangeScreen } = useChangeScreen();

  const [state, _setState] = useState({
    selectedDateFrom: null,
    selectedDateTo: null,
  });

  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    phimTat: { onRegisterHotkey },
    nbTuVong: { searchNbTuVongByParams, clearData },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });

    return () => {
      clearData();
    };
  }, []);

  return (
    <BaseSearch
      cacheData={{ loaiGiayGuiCongBHXH: 6 }}
      dataInput={[
        {
          widthInput: "120px",
          placeholder: t("giayDayCong.loaiGiayGuiCongBHXH"),
          keyValueInput: "loaiGiayGuiCongBHXH",
          functionChangeInput: onChangeScreen,
          type: "select",
          listSelect: LOAI_GIAY_GUI_CONG_BHXH,
          allowClear: true,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm tên NB, mã HS",
          keyValueInput: "maHoSo",
          functionChangeInput: searchNbTuVongByParams,
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
          placeholder: "Tìm mã bệnh án",
          keyValueInput: "maBenhAn",
          functionChangeInput: searchNbTuVongByParams,
        },
        // {
        //   widthInput: "232px",
        //   title: t("common.trangThai"),
        //   keyValueInput: "dsTrangThai",
        //   functionChangeInput: ({ dsTrangThai }) => {
        //     // searchNbTuVongByParams({ dsTrangThai });

        //     setState({ dsTrangThai });
        //   },
        //   type: "selectCheckbox",
        //   value: state.dsTrangThai,
        //   listSelect: [
        //     { value: "", label: "Tất cả" },
        //     { value: 1, label: "Tạo mới" },
        //     { value: 2, label: "Gửi thất bại" },
        //     { value: 3, label: "Tạo lại" },
        //     { value: 4, label: "Gửi thành công" },
        //   ],
        // },
        {
          widthInput: "232px",
          type: "dateOptions",
          state: state,
          setState: setState,
          functionChangeInput: (e) => {
            searchNbTuVongByParams(
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
          title: "Ngày vào viện",
          placeholder: "Chọn ngày vào viện",
          format: "DD/MM/YYYY",
        },

        // {
        //   widthInput: "200px",
        //   type: "addition",
        //   component: (
        //     <div style={{ paddingLeft: 20 }}>
        //       <Button onClick={() => {}} type="primary">
        //         Gửi giám định BHXH hàng loạt
        //       </Button>
        //     </div>
        //   ),
        // },
      ]}
      filter={{
        open: false,
        width: "110px",
        funcSearchData: searchNbTuVongByParams,
        data: [
          {
            key: ["tuThoiGianVaoVien", "denThoiGianVaoVien"],
            widthInput: "212px",
            type: "date-1",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: "Ngày vào viện",
          },
        ],
      }}
    />
  );
};

export default TimKiemNbTuVong;
