import React, { useEffect, useMemo, useState } from "react";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import IcClose from "assets/images/kho/icClose.png";
import { BaseSearch } from "components";
import {
  LOAI_NHAP_XUAT,
  TRANG_THAI_DON_THUOC_NGOAI_TRU,
} from "constants/index";
import cacheUtils from "utils/cache-utils";
import { useTranslation } from "react-i18next";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listKhoUser } = useSelector((state) => state.kho);
  const { dataSearch } = useSelector((state) => state.phatThuocNgoaiTru);
  const { auth } = useSelector((state) => state.auth);

  const {
    kho: { getTheoTaiKhoan },
    phatThuocNgoaiTru: { onChangeInputSearch },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getTheoTaiKhoan({ nhaThuoc: false });
    getListAllNhanVien({ page: "", size: "" });
  }, []);

  useEffect(() => {
    cacheUtils
      .read(auth.nhanVienId, "DATA_PHAT_THUOC_NGOAI_TRU", [], false)
      .then((s) => {
        setState({ dsKhoId: s });
        if (s.length) {
          onChangeInputSearch({
            dsTrangThai: [15, 10],
            dsKhoId: s,
            sort: "soPhieu,desc",
            loaiNhapXuat: LOAI_NHAP_XUAT.NB_NGOAI_TRU,
          });
        } else {
          onChangeInputSearch({
            dsTrangThai: [15, 10],
            dsKhoId: listKhoUser.length
              ? listKhoUser.map((x) => {
                  return x.id;
                })
              : 0,
            sort: "soPhieu,desc",
            loaiNhapXuat: LOAI_NHAP_XUAT.NB_NGOAI_TRU,
          });
        }
      });
  }, [listKhoUser]);

  const onRemove = (e) => {
    let kho = dataSearch?.dsKhoId.filter((item) => item !== e);
    setState({ dsKhoId: kho });
    onChangeInputSearch({
      dsKhoId: kho.length
        ? kho
        : listKhoUser.map((x) => {
            return x.id;
          }),
    });
  };

  const onRemoveTrangThai = (e) => {
    let dsTrangThai = dataSearch.dsTrangThai.filter((item) => item !== e);
    onChangeInputSearch({
      dsTrangThai: dsTrangThai.length ? dsTrangThai : null,
    });
  };

  const listKhoNhanVienKho = useMemo(() => {
    return listKhoUser.map((item) => {
      item.value = item.id;
      item.label = item?.ten;
      return item;
    });
  }, [listKhoUser]);

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    }
    if (key === "dsKhoId" && !value) {
      onChangeInputSearch({
        [key]: listKhoUser.map((x) => {
          return x.id;
        }),
      });
    } else {
      onChangeInputSearch({ [key]: value });
    }
    if (key === "dsKhoId") {
      cacheUtils.save(
        auth.nhanVienId,
        "DATA_PHAT_THUOC_NGOAI_TRU",
        value
          ? value
          : listKhoUser.map((x) => {
              return x.id;
            }),
        false
      );
      setState({ dsKhoId: value });
    }
  };

  return (
    <Main>
      <BaseSearch
        filter={{
          open: true,
          width: "110px",
          title: "Lọc phiếu",
          funcSearchData: onChangeInputSearch,
          data: [
            {
              key: "soPhieu",
              placeholder: t("common.soPhieu"),
              type: "normal",
              title: t("common.soPhieu"),
            },
            {
              key: "maNb",
              placeholder: t("common.maNb"),
              type: "normal",
              title: t("common.maNb"),
            },
            {
              key: "nguoiDuyetId",
              placeholder: "Người phát",
              type: "select",
              dataSelect: listAllNhanVien,
              title: "Người phát",
            },
            {
              key: ["tuThoiGianDuyet", "denThoiGianDuyet"],
              placeholder: ["Từ ngày", "đến ngày"],
              type: "date-1",
              title: "Ngày phát",
            },
          ],
        }}
        dataInput={[
          {
            widthInput: "232px",
            keyValueInput: "dsKhoId",
            functionChangeInput: ({ dsKhoId }) =>
              onSearchInput("dsKhoId")(dsKhoId),
            type: "selectCheckbox",
            listSelect: listKhoNhanVienKho,
            value: state.dsKhoId,
            title: "Tên kho",
          },
          {
            widthInput: "232px",
            placeholder: "Quét QR người bệnh hoặc nhập mã hồ sơ để tìm kiếm",
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
            placeholder: "Tìm theo họ tên NB",
            keyValueInput: "tenNb",
            functionChangeInput: onChangeInputSearch,
          },
          {
            widthInput: "232px",
            keyValueInput: "dsTrangThai",
            functionChangeInput: ({ dsTrangThai }) =>
              onSearchInput("dsTrangThai")(dsTrangThai),
            type: "selectCheckbox",
            listSelect: TRANG_THAI_DON_THUOC_NGOAI_TRU,
            value: dataSearch.dsTrangThai,
            title: "Trạng thái đơn",
          },
        ]}
      />
      <div className="array-store">
        {(state?.dsKhoId || []).map((item) => {
          return (
            <div className="item">
              <span>{listKhoUser.find((x) => x.id === item)?.ten}</span>
              <img
                style={{ cursor: "pointer" }}
                src={IcClose}
                alt="..."
                onClick={() => onRemove(item)}
              ></img>
            </div>
          );
        })}
        {(dataSearch.dsTrangThai || []).map((item, index) => {
          return (
            <div className="item" key={index}>
              <span>
                {
                  TRANG_THAI_DON_THUOC_NGOAI_TRU.find((x) => x.value === item)
                    ?.label
                }
              </span>
              <img
                style={{ cursor: "pointer" }}
                src={IcClose}
                alt="..."
                onClick={() => onRemoveTrangThai(item)}
              ></img>
            </div>
          );
        })}
      </div>
    </Main>
  );
};
export default TimKiemPhieu;
