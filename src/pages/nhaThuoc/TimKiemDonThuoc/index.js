import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useTransition,
} from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { TRANG_THAI_DON_THUOC } from "constants/index";
import IcClose from "assets/images/kho/icClose.png";
import { useTranslation } from "react-i18next";
import { BaseSearch } from "components";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import moment from "moment";

const TimKiemDonThuoc = ({ layerId, ...props }) => {
  const {
    dsKhoId = [],
    dsTrangThai,
    maNb,
    soPhieu,
    maHoSo,
    nguoiDuyetId,
    tuThoiGianDuyet,
    denThoiGianDuyet,
    tuThoiGianTaoPhieu,
    denThoiGianTaoPhieu,
  } = useSelector((state) => state.thuocKho);

  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listKhoUser } = useSelector((state) => state.kho);
  const { t } = useTranslation();
  const history = useHistory();
  const {
    kho: { getAllTongHop: getAllKhoTongHop, getTheoTaiKhoan },
    thuocKho: { searchThuocByParams, postTaoMoi, saveTrangThai, readTrangThai },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  const listKhoNhanVienKho = useMemo(() => {
    return listKhoUser.map((item) => {
      item.value = item.id;
      item.label = item?.ten;
      return item;
    });
  }, [listKhoUser]);

  const refFocusTenNb = useRef();
  const refFocusQr = useRef();
  const refCreate = useRef();

  const {
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
        {
          keyCode: 114, //F3
          onEvent: () => {
            refFocusQr.current && refFocusQr.current.focus();
          },
        },
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });
  }, []);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getAllKhoTongHop({});
    getListAllNhanVien();
    getTheoTaiKhoan({ nhaThuoc: true });
    readTrangThai();
    searchThuocByParams({
      tuThoiGianTaoPhieu: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      denThoiGianTaoPhieu: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
    });
  }, []);

  const onSearchInput = (key) => (e) => {
    searchThuocByParams({ [key]: e });

    if (key === "dsTrangThai") {
      saveTrangThai(e);
      searchThuocByParams({ dsTrangThai: e });
    }
  };
  const renderParamsSelected = (item, key, arr, mustFilter) => {
    return (
      <div className="item">
        <span>{mustFilter ? arr.find((x) => x.id == item)?.ten : item}</span>
        <img
          style={{ cursor: "pointer" }}
          src={IcClose}
          alt="..."
          onClick={(e) => {
            if (key === "time") {
              searchThuocByParams({
                tuThoiGianDuyet: null,
                denThoiGianDuyet: null,
              });
            }
            if (key === "timeTaoPhieu") {
              searchThuocByParams({
                tuThoiGianTaoPhieu: null,
                denThoiGianTaoPhieu: null,
              });
            } else {
              searchThuocByParams({ [key]: null });
            }
          }}
        ></img>
      </div>
    );
  };

  const onKeyDown = (e) => {
    if (dsKhoId.length === 0) {
      message.error(t("nhaThuoc.vuiLongChonKhoDeQuetDon"));
      return null;
    }
    if (dsKhoId.length > 1) {
      message.error(t("nhaThuoc.chiChon1KhoDeQuetDon"));
      return null;
    }

    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    handleSearchBN(value);
  };

  const handleSearchBN = debounce((value) => {
    const { qrBN = "" } = state;
    let str = qrBN.trim() || value?.maHoSo || "";
    let param = {};
    param = { maHoSo: Number(str) };
    if (param?.maHoSo || param?.soPhieu) {
      // Search info nb
      // param.isSingleSearch = true;
      param.sort = "id,desc";
      param.dsKhoId = dsKhoId.length > 0 ? dsKhoId : null;
      const obj = {
        khoId: param.dsKhoId && param.dsKhoId[0], //103
        nbDotDieuTri: {
          maHoSo: param.maHoSo,
        },
      };
      postTaoMoi(obj)
        .then((s) => {
          if (!s.length) {
          }
          history.push(`/nha-thuoc/chi-tiet/${s.phieuXuatId}`);
        })
        .catch((e) => {});
    } else {
    }
  }, 100);

  return (
    <Main>
      <BaseSearch
        dataInput={[
          {
            widthInput: "160px",
            placeholder: "Chọn kho",
            title: "Tên kho",
            keyValueInput: "dsKhoId",
            listSelect: listKhoNhanVienKho,
            value: dsKhoId,
            functionChangeInput: ({ dsKhoId }) =>
              onSearchInput("dsKhoId")(dsKhoId),
            type: "selectCheckbox",
          },
          {
            widthInput: "180px",
            title: t("common.trangThai"),
            keyValueInput: "dsTrangThai",
            type: "selectCheckbox",
            listSelect: TRANG_THAI_DON_THUOC.map((x) => ({
              ...x,
              id: x.value,
              ten: x.label,
            })),
            value: dsTrangThai,
            functionChangeInput: ({ dsTrangThai }) =>
              onSearchInput("dsTrangThai")(dsTrangThai),
          },
          {
            widthInput: "300px",
            placeholder: t("nhaThuoc.timTheoTenNguoiBenhHoacSoPhieu"),
            keyValueInput: "tenNb",
            functionChangeInput: searchThuocByParams,
          },
          {
            widthInput: "500px",
            placeholder: t("nhaThuoc.quetQrNguoiBenhHoacNhapMaHoSoDeTimDonMoi"),
            functionChangeInput: onKeyDown,
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
        ]}
        filter={{
          open: true,
          width: "110px",
          funcSearchData: searchThuocByParams,
          data: [
            {
              key: "maNb",
              widthInput: "212px",
              placeholder: "Mã NB",
              type: "normal",
            },
            {
              key: "maHoSo",
              widthInput: "212px",
              placeholder: "Mã hồ sơ",
              type: "normal",
            },
            {
              key: "nguoiDuyetId",
              widthInput: "212px",
              placeholder: "Người phát",
              dataSelect: listAllNhanVien || [],
              type: "select",
            },
            {
              key: ["tuThoiGianDuyet", "denThoiGianDuyet"],
              widthInput: "212px",
              type: "dateRange",
              placeholder: [t("common.tuNgay"), t("common.denNgay")],
              title: "Ngày phát",
            },
            {
              key: ["tuThoiGianTaoPhieu", "denThoiGianTaoPhieu"],
              widthInput: "212px",
              type: "dateRange",
              placeholder: [t("common.tuNgay"), t("common.denNgay")],
              title: "Ngày tạo phiếu",
              defaultDate: [moment(new Date()), moment(new Date())],
            },
          ],
        }}
      />

      <div className="array-store">
        {(dsKhoId || []).map((item, index) => {
          return (
            <div className="item" key={index}>
              <span>
                {listKhoNhanVienKho?.find((x) => x.id == item)?.label}
              </span>
              <img
                style={{ cursor: "pointer" }}
                src={IcClose}
                alt="..."
                onClick={(e) => {
                  const index = dsKhoId?.findIndex((x) => x === item);
                  dsKhoId.splice(index, 1);
                  searchThuocByParams({ dsKhoId });
                }}
              ></img>
            </div>
          );
        })}
        {(dsTrangThai || []).map((item, index) => {
          return (
            <div className="item" key={index}>
              <span>
                {TRANG_THAI_DON_THUOC.find((x) => x.value == item)?.label}
              </span>
              <img
                style={{ cursor: "pointer" }}
                src={IcClose}
                alt="..."
                onClick={(e) => {
                  const index = dsTrangThai.findIndex((x) => x === item);
                  dsTrangThai.splice(index, 1);
                  searchThuocByParams({ dsTrangThai });
                }}
              ></img>
            </div>
          );
        })}
        {maNb && renderParamsSelected(maNb, "maNb")}
        {soPhieu && renderParamsSelected(soPhieu, "soPhieu")}
        {maHoSo && renderParamsSelected(maHoSo, "maHoSo")}
        {nguoiDuyetId &&
          renderParamsSelected(
            nguoiDuyetId,
            "nguoiDuyetId",
            listAllNhanVien,
            true
          )}
        {tuThoiGianDuyet &&
          denThoiGianDuyet &&
          renderParamsSelected(
            `${tuThoiGianDuyet} - ${denThoiGianDuyet}`,
            "time"
          )}
        {tuThoiGianTaoPhieu &&
          denThoiGianTaoPhieu &&
          renderParamsSelected(
            `${tuThoiGianTaoPhieu} - ${denThoiGianTaoPhieu}`,
            "timeTaoPhieu"
          )}
      </div>
    </Main>
  );
};

export default TimKiemDonThuoc;
