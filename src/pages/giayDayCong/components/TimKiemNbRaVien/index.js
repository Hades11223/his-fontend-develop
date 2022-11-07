import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch, Button } from "components";
import { useTranslation } from "react-i18next";
import { LOAI_GIAY_GUI_CONG_BHXH, ROLES } from "constants/index";
import useChangeScreen from "pages/giayDayCong/config";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { refConfirm } from "app";
import { checkRole } from "utils/role-utils";

const TimKiemNbRaVien = ({ layerId, ...props }) => {
  const { t } = useTranslation();
  const refFocusTenNb = useRef();
  const { onChangeScreen } = useChangeScreen();

  const [listTrangThaiDayCong] = useEnum(ENUM.TRANG_THAI_DAY_CONG);
  const { dayPhieuRaVien } = useDispatch().nbRaVien;
  const { dataSearch } = useSelector((state) => state.nbRaVien);

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
    nbRaVien: { searchNbRaVienByParams, clearData },
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

  const onDayPhieuHangLoat = () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xác nhận gửi",
          content: `Xác nhận gửi giám định hàng loạt lên cổng bảo hiểm?`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-confirm",
          showBtnOk: true,
          typeModal: "warning",
        },
        async () => {
          const {
            dsTrangThaiDayCong,
            maHoSo,
            maBenhAn,
            tenNb,
            tuThoiGianVaoVien,
            denThoiGianVaoVien,
            dsTrangThai,
            dsHuongDieuTri,
          } = dataSearch || {};

          dayPhieuRaVien({
            dsTrangThaiDayCong,
            maHoSo,
            maBenhAn,
            tenNb,
            tuThoiGianVaoVien,
            denThoiGianVaoVien,
            dsTrangThai,
            dsHuongDieuTri,
          }).then(() => {
            searchNbRaVienByParams({});
          });
        }
      );
  };

  return (
    <BaseSearch
      cacheData={{ ...dataSearch, loaiGiayGuiCongBHXH: 1 }}
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
          functionChangeInput: searchNbRaVienByParams,
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
          functionChangeInput: searchNbRaVienByParams,
        },
        {
          widthInput: "232px",
          title: t("common.trangThai"),
          keyValueInput: "dsTrangThaiDayCong",
          functionChangeInput: ({ dsTrangThaiDayCong }) => {
            searchNbRaVienByParams({ dsTrangThaiDayCong });

            setState({ dsTrangThaiDayCong });
          },
          type: "selectCheckbox",
          value: state.dsTrangThaiDayCong,
          listSelect: [
            { value: "", label: "Tất cả" },
            ...(listTrangThaiDayCong || []).map((item) => ({
              value: item.id,
              label: item.ten,
            })),
          ],
        },
        {
          widthInput: "232px",
          type: "dateOptions",
          state: state,
          setState: setState,
          functionChangeInput: (e) => {
            searchNbRaVienByParams(
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

        ...(checkRole([ROLES["GIAY_DAY_CONG"].NB_RA_VIEN_DAY_HANG_LOAT])
          ? [
              {
                widthInput: "200px",
                type: "addition",
                component: (
                  <div style={{ paddingLeft: 20 }}>
                    <Button
                      height={36}
                      onClick={onDayPhieuHangLoat}
                      type="primary"
                    >
                      Gửi giám định BHXH hàng loạt
                    </Button>
                  </div>
                ),
              },
            ]
          : []),
      ]}
      filter={{
        open: false,
        width: "110px",
        funcSearchData: searchNbRaVienByParams,
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

export default TimKiemNbRaVien;
