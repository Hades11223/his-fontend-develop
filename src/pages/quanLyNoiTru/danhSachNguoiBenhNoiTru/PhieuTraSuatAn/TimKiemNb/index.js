import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BaseSearch from "components/BaseSearch";
import { DatePicker } from "components";
import moment from "moment";
import { CustomSelect, Main } from "./styled";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";

const TimKiemPhieu = () => {
  const { t } = useTranslation();

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [listTrangThai] = useEnum(ENUM.TRANG_THAI_PHIEU_LINH_SUAT_AN, []);
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const {
    nbPhieuLinhSuatAn: { updateData },
    nhanVien: { getListAllNhanVien },
    khoa: { getListAllKhoa },
  } = useDispatch();

  useEffect(() => {
    getListAllNhanVien({ page: "", size: "", active: true });
    getListAllKhoa();
  }, []);

  const onChangeInputSearch = (value) => {
    updateData({ searchValue: value });
  };

  const Checkbox = ({
    valueFilter,
    dataSearch,
    title,
    searchKey,
    placeholder,
  }) => (
    <CustomSelect
      placeholder={placeholder}
      data={[
        {
          id: "",
          ten: "Tất cả",
        },
        {
          id: valueFilter[0],
          ten: dataSearch[0] || "Đã " + title,
        },
        {
          id: valueFilter[1],
          ten: dataSearch[1] || "Chưa " + title,
        },
      ]}
      onChange={(e) => onChangeInputSearch({ [searchKey]: e })}
    />
  );

  return (
    <Main>
      <BaseSearch
        dataInput={[
          {
            widthInput: "232px",
            placeholder: t("Tìm kiếm theo khoa chỉ định"),
            keyValueInput: "khoaId",
            type: "select",
            listSelect: listAllKhoa || [],
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "232px",
            keyValueInput: "ngayThucHien",
            type: "addition",
            component: (
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Ngày thực hiện"
                style={{ width: "100%", height: "100%" }}
                onChange={(e) =>
                  onChangeInputSearch({
                    ngayThucHien: moment(e).format("DD/MM/YYYY"),
                  })
                }
              />
            ),
          },
          {
            widthInput: "232px",
            placeholder: t("Số phiếu"),
            keyValueInput: "soPhieu",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "232px",
            keyValueInput: "dotXuat",
            type: "addition",
            component: (
              <Checkbox
                placeholder="Đột xuất"
                valueFilter={[true, false]}
                dataSearch={["Đột xuất", "Không đột xuất"]}
                searchKey="dotXuat"
              />
            ),
          },
          {
            widthInput: "232px",
            keyValueInput: "trangThai",
            placeholder: t("common.trangThai"),
            type: "select",
            functionChangeInput: onChangeInputSearch,
            listSelect: listTrangThai,
          },
          {
            widthInput: "232px",
            placeholder: t("Người duyệt"),
            keyValueInput: "nguoiDuyetId",
            type: "select",
            functionChangeInput: onChangeInputSearch,
            listSelect: listAllNhanVien,
          },
        ]}
        filter={{
          open: true,
          width: "110px",
          funcSearchData: onChangeInputSearch,
          data: [],
        }}
      />
    </Main>
  );
};

export default TimKiemPhieu;
