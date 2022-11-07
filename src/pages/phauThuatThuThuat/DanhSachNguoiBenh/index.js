import React, { useMemo, useState } from "react";
import { Button, Page } from "components";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BaseSearch from "../../../components/BaseSearch";
import DanhSach from "./DanhSach";
import { Main, WrapperPopover } from "./styled";
import TimKiemNb from "./TimKiemNb";
import { Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ModalTaoPhieuLinh from "../../quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuLinh/ModalTaoPhieuLinh";
import { useHistory } from "react-router-dom";
import { useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import {
  getAllQueryString,
  setQueryStringValue,
} from "hook/useQueryString/queryString";

export const infoPatients = [
  {
    dataIndex: "pttt.choPTTT",
    background: "#C1F3F7",
    trangThai: 25,
  },
  {
    dataIndex: "pttt.dangPTTT",
    background: "#C1D8FD",
    trangThai: 63,
  },
  {
    dataIndex: "pttt.hoanThanhPTTT",
    background: "#C8E6C9",
    trangThai: 155,
  },
  {
    dataIndex: "pttt.thuongQuy",
    background: "#FFE0B2",
    loaiPtTt: 10,
  },
  {
    dataIndex: "pttt.capCuu",
    background: "#FF0000",
    loaiPtTt: 30,
  },
  {
    dataIndex: "pttt.theoYeuCau",
    background: "#FFCCBC",
    loaiPtTt: 20,
  },
];

const DanhSachNguoiBenhNoiTru = ({}) => {
  const { t } = useTranslation();
  const refModalPhieuLinh = useRef();
  const history = useHistory();

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    pttt: { onChangeInputSearch, getDashboardTheoTrangThai },
    khoa: { getKhoaTheoTaiKhoan },
    phong: { getPhongTheoTaiKhoan },
  } = useDispatch();
  const { listDashboardPttt, dataSearch } = useSelector((state) => state.pttt);
  const { listKhoaTheoTaiKhoan } = useSelector((state) => state.khoa);
  const khoaThucHienId = useStore("pttt.dataSearch.khoaThucHienId", null);
  const listPhongTheoTaiKhoan = useStore("phong.listPhongTheoTaiKhoan", []);

  const listAllPhong = useMemo(
    () =>
      khoaThucHienId
        ? listPhongTheoTaiKhoan.filter((i) => i.khoaId === khoaThucHienId)
        : listPhongTheoTaiKhoan,
    [khoaThucHienId, listPhongTheoTaiKhoan]
  );

  useEffect(() => {
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    let phongThucHienId = undefined;

    if (queries.phongThucHienId) {
      phongThucHienId = parseInt(queries.phongThucHienId);
    }
    setState({ ...dataSearch, phongThucHienId });
  }, [dataSearch]);

  useEffect(() => {
    getPhongTheoTaiKhoan({ active: true, page: "", size: "" });
    getKhoaTheoTaiKhoan({ active: true, page: "", size: "" });
  }, []);

  const onSearch = (data) => {
    let dsPhongThucHienId = (listAllPhong || []).map((i) => i.id);
    let dsKhoaThucHienId = (listKhoaTheoTaiKhoan || []).map((i) => i.id);


    if (Object.keys(data)[0] === "khoaThucHienId") {
      let khoaThucHienId = Object.values(data)[0];
      //khi chọn khoa thực hiện thì đẩy thông tin lên query
      setQueryStringValue("khoaThucHienId", khoaThucHienId);
      cacheUtils.save(
        "DATA_KHOA_LAM_VIEC_PHAU_THUAT_THU_THUAT",
        "",
        listKhoaTheoTaiKhoan.find((x) => x.id === khoaThucHienId),
        false
      );
      if (khoaThucHienId) {
        dsPhongThucHienId = listPhongTheoTaiKhoan
          .filter((i) => i.khoaId === khoaThucHienId)
          .map((i) => i.id);
      } else {
        dsPhongThucHienId = listPhongTheoTaiKhoan.map((i) => i.id);
      }
      getDashboardTheoTrangThai({
        dsKhoaThucHienId: khoaThucHienId ? khoaThucHienId : dsKhoaThucHienId,
        dsPhongThucHienId,
      });

      onChangeInputSearch({ ...data, dsPhongThucHienId });
    } else {
      let phongThucHienId = Object.values(data)[0];
      //khi chọn phòng thực hiện thì đẩy thông tin lên query
      const newQueries = {};

      setQueryStringValue("phongThucHienId", phongThucHienId);
      if (phongThucHienId) {
        newQueries.phongThucHienId = phongThucHienId;
        newQueries.dsPhongThucHienId = "";
      }
      getDashboardTheoTrangThai({ dsPhongThucHienId: phongThucHienId });
      onChangeInputSearch(newQueries);
    }
  };

  const onClickTaoPhieuLinh = () => {
    if (refModalPhieuLinh.current) {
      refModalPhieuLinh.current.show();
    }
  };
  const onViewDanhSachPhieuLinh = () => {
    history.push("/phau-thuat-thu-thuat/danh-sach-phieu-linh");
  };

  return (
    <Main>
      <Page
        breadcrumb={[
          {
            link: "/phau-thuat-thu-thuat",
            title: t("pttt.quanLyPhauThuatThuThuat"),
          },
          {
            link: "/phau-thuat-thu-thuat/danh-sach-nguoi-benh",
            title: t("pttt.danhSachPhauThuatThuThuat"),
          },
        ]}
        title={t("pttt.danhSachPhauThuatThuThuat")}
      >
        <div className="wrapper-container">
          <div className="group-search">
            <div className="middle-search">
              <BaseSearch
                cacheData={state}
                dataInput={[
                  {
                    widthInput: "200px",
                    placeholder: t("common.khoa"),
                    keyValueInput: "khoaThucHienId",
                    functionChangeInput: onSearch,
                    type: "select",
                    listSelect: [
                      { id: "", ten: "Tất cả" },
                      ...listKhoaTheoTaiKhoan,
                    ],
                  },
                  {
                    widthInput: "200px",
                    placeholder: t("cdha.phongThucHien"),
                    keyValueInput: "phongThucHienId",
                    functionChangeInput: onSearch,
                    type: "select",
                    listSelect: listAllPhong,
                  },
                ]}
              />
            </div>
            <div>
              {infoPatients.map((info, index) => {
                return (
                  <div
                    key={index}
                    className="info"
                    style={{ background: info.background }}
                  >
                    {t(info.dataIndex)}:{" "}
                    <span className="info--bold">
                      {listDashboardPttt.find(
                        (i) =>
                          i.trangThai === info.trangThai ||
                          i.loaiPtTt === info.loaiPtTt
                      )?.soLuong || 0}
                    </span>
                  </div>
                );
              })}
              <div className="info">
                <Button
                  className="btn_new"
                  // type={"success"}
                  onClick={onClickTaoPhieuLinh}
                  rightIcon={
                    <Popover
                      placement="topRight"
                      content={
                        <WrapperPopover>
                          <div
                            className="item-popover"
                            onClick={onViewDanhSachPhieuLinh}
                          >
                            {t("pttt.danhSachPhieuLinh")}
                          </div>
                          <div
                            className="item-popover"
                            onClick={onClickTaoPhieuLinh}
                          >
                            {t("quanLyNoiTru.taoPhieuLinh")}
                          </div>
                        </WrapperPopover>
                      }
                    >
                      <MoreOutlined />
                    </Popover>
                  }
                  iconHeight={20}
                >
                  {t("quanLyNoiTru.taoPhieuLinh")}
                </Button>
              </div>
            </div>
          </div>
          <TimKiemNb />
          <DanhSach />
        </div>
        <ModalTaoPhieuLinh ref={refModalPhieuLinh} />
      </Page>
    </Main>
  );
};

export default DanhSachNguoiBenhNoiTru;
