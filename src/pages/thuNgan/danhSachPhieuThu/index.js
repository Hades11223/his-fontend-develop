import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ENUM, ROLES } from "constants/index";
import {
  Select,
  TableWrapper,
  Card,
  InputTimeout,
  Pagination,
  HeaderSearch,
  ModalChonToaNha,
} from "components";
import { MainPage, GlobalStyle } from "./styled";
import { checkRole } from "utils/role-utils";
import moment from "moment";
import {
  TRANG_THAI_PHIEU_THU,
  SO_TIEN,
  TIME_FORMAT,
  TRANG_THAI_XUAT_HOA_DON,
} from "./configs";
import PhieuThuHeader from "./phieuThuHeader";
import MainHeaderSearchThuNgan from "../timKiemBenhNhan/HeaderSearch";
import IconArrowRight from "assets/images/thuNgan/arrowRight.png";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep, repeat } from "lodash";
import { useTranslation } from "react-i18next";
import cacheUtils from "utils/cache-utils";
import { useEnum } from "hook";
import IcSetting from "assets/svg/ic-setting.svg";
import IcEye from "assets/svg/ic-eye.svg";
import {
  setQueryStringValue,
  setQueryStringValues,
  getAllQueryString,
} from "hook/useQueryString/queryString";

const DanhSachPhieuThu = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const [state, _setState] = useState({
    currentIndex: 0,
    ...getAllQueryString(),
  });
  console.log(state);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refLayerHotKey = useRef(stringUtils.guid());
  const { listData, totalElements, page, size, dataSearch, dataSortColumn } =
    useSelector((state) => state.danhSachPhieuThu);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const { auth } = useSelector((state) => state.auth);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listtrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  const {
    danhSachPhieuThu: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
    },
    khoa: { getListAllKhoa },
    toaNha: { getNhaTheoTaiKhoan },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const refModalChonToaNha = useRef(null);

  const history = useHistory();
  useEffect(() => {
    let nbNoiTru = checkRole([ROLES["THU_NGAN"].THU_NGAN_NOI_TRU]);
    getNhaTheoTaiKhoan({});
    getListAllKhoa();
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();
    const sort = JSON.parse(dataSortColumn);
    queries["tuThoiGianVaoVien"] = queries["tuThoiGianVaoVien"]
      ? moment(queries["tuThoiGianVaoVien"].toDateObject()).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      : !nbNoiTru
      ? moment().startOf("day").format("YYYY-MM-DDTHH:mm:ss")
      : null;
    queries["denThoiGianVaoVien"] = queries["denThoiGianVaoVien"]
      ? moment(queries["denThoiGianVaoVien"].toDateObject()).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      : !nbNoiTru
      ? moment().endOf("day").format("YYYY-MM-DDTHH:mm:ss")
      : null;
    queries["tuThoiGianThanhToan"] = queries["tuThoiGianThanhToan"]
      ? moment(queries["tuThoiGianThanhToan"].toDateObject()).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      : null;
    queries["denThoiGianThanhToan"] = queries["denThoiGianThanhToan"]
      ? moment(queries["denThoiGianThanhToan"].toDateObject()).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      : null;

    const [tuTongTien, denTongTien] = (queries["tongTien"] || ",").split(",");
    delete queries.tongTien;
    queries.tuTongTien = tuTongTien;
    queries.denTongTien = denTongTien;

    onSizeChange({
      size: parseInt(size || 10),
      page: parseInt(page || 0),
      dataSearch: {
        thanhToan: false,
        tuThoiGianVaoVien: !nbNoiTru
          ? moment().startOf("day").format("YYYY-MM-DDTHH:mm:ss")
          : null,
        denThoiGianVaoVien: !nbNoiTru
          ? moment().endOf("day").format("YYYY-MM-DDTHH:mm:ss")
          : null,
        ...queries,
      },
      dataSortColumn: sort,
    });

    onAddLayer({ layerId: refLayerHotKey.current });
    // onSizeChange({
    //   size: 20,
    //   dataSearch: {
    //     thanhToan: false,
    //   },
    //   dataSortColumn: {},
    // });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  useEffect(() => {
    if (state.currentIndex > listData.length - 1) {
      setState({ currentIndex: 0 });
    }
  }, [listData]);

  useEffect(() => {
    async function fetchData() {
      let nhaTamUng = await cacheUtils.read(
        "DATA_NHA_TAM_UNG",
        "",
        null,
        false
      );
      if (!nhaTamUng) {
        if (auth?.dsToaNha?.length === 1) {
          cacheUtils.save("DATA_NHA_TAM_UNG", "", auth?.dsToaNha[0]?.id, false);
          setState({ nhaTamUng: auth?.dsToaNha[0]?.id });
        } else {
          refModalChonToaNha.current &&
            refModalChonToaNha.current.show({}, (e) => {
              setState({ nhaTamUng: e });
              cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
            });
        }
      } else {
        setState({ nhaTamUng });
      }
    }
    fetchData();
  }, [auth?.dsToaNha]);

  const scrollToRow = (id) => {
    document
      .getElementsByClassName("row-id-" + id)[0]
      .scrollIntoView({ block: "center", behavior: "smooth" });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 38, //Mũi tên lên
          onEvent: (e) => {
            console.log(e, "e");
            if (e.target.id !== "nh-select-tim-kiem-ten-man-hinh")
              e.target.blur();
            if (
              state.currentIndex > 0 &&
              e.target.id !== "nh-select-tim-kiem-ten-man-hinh"
            ) {
              setState({
                currentIndex: state.currentIndex - 1,
              });
              scrollToRow(listData[state.currentIndex - 1]?.id);
            }
          },
        },

        {
          keyCode: 40, //Mũi tên xuống
          onEvent: (e) => {
            console.log(e, "e");
            if (e.target.id !== "nh-select-tim-kiem-ten-man-hinh")
              e.target.blur();
            if (
              state.currentIndex < listData.length - 1 &&
              e.target.id !== "nh-select-tim-kiem-ten-man-hinh"
            ) {
              setState({
                currentIndex: state.currentIndex + 1,
              });
              scrollToRow(listData[state.currentIndex + 1]?.id);
            }
          },
        },
        {
          keyCode: 13, //Enter
          onEvent: (e) => {
            const record = listData[state.currentIndex];
            if (record && e.target.nodeName !== "INPUT") {
              onRow(record).onClick();
            }
          },
        },
      ],
    });
  }, [listData, state.currentIndex]);

  const onClickSort = (key, value) => {
    let sort = cloneDeep(dataSortColumn);
    sort[key] = value;
    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }
    setQueryStringValues({ dataSortColumn: JSON.stringify(sort), page: 0 });
    onSortChange({ [key]: value });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (key === "maHoSo") {
      value = fillMaHoSoSearchValue(value);
    }
    if (key === "maNb") {
      value = fillMaNbSearchValue(value);
    }
    setQueryStringValue(key, encodeURIComponent(value || ""));
    onChangeInputSearch({
      [key]: value,
    });
  };

  //function
  function fillMaHoSoSearchValue(initValue) {
    if (!initValue) return null;

    if (initValue.length <= 4) {
      let returnValue = moment().format("YYMMDD");
      returnValue += repeat(0, 4 - initValue.length);
      returnValue += initValue;

      return returnValue;
    } else if (initValue.length === 6) {
      let returnValue = moment().format("YYMM");
      returnValue += initValue;

      return returnValue;
    } else {
      return initValue;
    }
  }

  function fillMaNbSearchValue(initValue) {
    if (!initValue) return null;

    if (initValue.length <= 6) {
      let returnValue = moment().format("YYMM");
      returnValue += repeat(0, 6 - initValue.length);
      returnValue += initValue;

      return returnValue;
    } else {
      return initValue;
    }
  }

  const onChangeTongTien = (value) => {
    setQueryStringValue("tongTien", value);
    setState({ tongTien: value });
    value = value || ",";
    const [tuTongTien, denTongTien] = value.split(",");
    onChangeInputSearch({ tuTongTien, denTongTien });
  };

  const onChangeSelect = (e) => {
    cacheUtils.save("DATA_NHA_TAM_UNG", "", e, false);
    setState({ nhaTamUng: e });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maHoSo || 0}
          search={
            <InputTimeout
              value={state.maHoSo}
              placeholder={t("common.timMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "maHoSo",
      key: "maHoSo",
      i18Name: "common.maHs",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maNb || 0}
          search={
            <InputTimeout
              value={state.maNb}
              placeholder={t("thuNgan.timMaNb")}
              onChange={onSearchInput("maNb")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hoTen")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNb || 0}
          search={
            <InputTimeout
              value={state.tenNb}
              placeholder={t("thuNgan.timHoTen")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "thuNgan.hoTen",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soTien")}
          sort_key="tongTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tongTien || 0}
          searchSelect={
            <Select
              value={state.tongTien}
              data={SO_TIEN}
              defaultValue=""
              placeholder={t("thuNgan.chonSoTien")}
              onChange={onChangeTongTien}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: "thuNgan.soTien",
      show: true,
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="thanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhToan || 0}
          searchSelect={
            <Select
              value={state.thanhToan}
              defaultValue={"false"}
              data={TRANG_THAI_PHIEU_THU}
              placeholder={t("thuNgan.chonTTPhieuThu")}
              onChange={onSearchInput("thanhToan")}
            />
          }
          title={t("thuNgan.trangThaiPt")}
        />
      ),
      width: 150,
      dataIndex: "thanhToan",
      key: "thanhToan",
      i18Name: "thuNgan.trangThaiPt",
      show: true,
      align: "center",
      render: (thanhToan) => {
        return thanhToan
          ? t("thuNgan.daThanhToan")
          : t("thuNgan.chuaThanhToan");
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soPhieu || 0}
          title={t("thuNgan.soPhieuThu")}
          search={
            <InputTimeout
              placeholder={t("thuNgan.soPhieuThu")}
              onChange={onSearchInput("soPhieu")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soPhieu",
      key: "soPhieu ",
      i18Name: "thuNgan.soPhieuThu",
      show: true,
      align: "center",
      render: (item) => item,
    },

    {
      title: (
        <HeaderSearch
          title={t("thuNgan.ngayThanhToan")}
          sort_key="thoiGianThanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianThanhToan || 0}
        />
      ),
      width: 130,
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      i18Name: "thuNgan.ngayThanhToan",
      show: true,
      render: (item) => {
        return item && <span>{moment(item).format(TIME_FORMAT)}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tenThuNgan")}
          sort_key="tenThuNgan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenThuNgan || 0}
          search={
            <InputTimeout
              value={state.tenThuNgan}
              placeholder={t("thuNgan.timTenThuNgan")}
              onChange={onSearchInput("tenThuNgan")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      i18Name: "thuNgan.tenThuNgan",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.daXuatHoaDon")}
          sort_key="phatHanhHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.phatHanhHoaDon || 0}
          searchSelect={
            <Select
              value={state.phatHanhHoaDon}
              data={TRANG_THAI_XUAT_HOA_DON}
              defaultValue=""
              placeholder={t("common.chonTrangThai")}
              onChange={onSearchInput("phatHanhHoaDon")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "phatHanhHoaDon",
      key: "phatHanhHoaDon",
      i18Name: "thuNgan.daXuatHoaDon",
      show: true,
      render: (phatHanhHoaDon) => {
        return phatHanhHoaDon ? t("thuNgan.daXuat") : t("thuNgan.chuaXuat");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.doiTuongNb")}
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              value={state.doiTuong}
              data={[{ id: "", ten: t("common.tatCa") }, ...listDoiTuong]}
              defaultValue=""
              valueNumber={true}
              placeholder={t("common.chonDoiTuong")}
              onChange={onSearchInput("doiTuong")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuong",
      key: "doiTuong",
      i18Name: "thuNgan.doiTuongNb",
      show: true,
      render: (item) => {
        const index = listDoiTuong.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listDoiTuong[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.doiTuongKCB")}
          sort_key="doiTuongKcb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tongTien || 0}
          searchSelect={
            <Select
              value={state.doiTuongKcb}
              data={[{ id: "", ten: t("common.tatCa") }, ...listDoiTuongKcb]}
              defaultValue=""
              valueNumber={true}
              placeholder={t("thuNgan.chonDoiTuongKCB")}
              onChange={onSearchInput("doiTuongKcb")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuongKcb",
      key: "doiTuongKcb",
      i18Name: "thuNgan.doiTuongKCB",
      show: true,
      render: (item) => {
        const index = listDoiTuongKcb.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listDoiTuongKcb[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.trangThaiNb")}
          sort_key="trangThaiNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThaiNb || 0}
          searchSelect={
            <Select
              value={state.trangThaiNb}
              data={[{ id: "", ten: t("common.tatCa") }, ...listtrangThaiNb]}
              valueNumber={true}
              defaultValue=""
              placeholder={t("thuNgan.chonTrangThaiNb")}
              onChange={onSearchInput("trangThaiNb")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "trangThaiNb",
      key: "trangThaiNb",
      i18Name: "thuNgan.trangThaiNb",
      show: true,
      render: (item) => {
        return (listtrangThaiNb || []).find((dt) => dt.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoa")}
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              value={state.khoaId}
              defaultValue=""
              valueNumber={true}
              data={[{ id: "", ten: t("common.tatCa") }, ...listAllKhoa]}
              placeholder={t("common.chonKhoa")}
              onChange={onSearchInput("dsKhoaId")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "khoaId",
      key: "khoaId",
      i18Name: "common.khoa",
      show: true,
      render: (item) => {
        const index = listAllKhoa.findIndex((khoa) => khoa.id === item);
        if (index === -1) return;
        return listAllKhoa[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.tienIch")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      render: (item) => {
        return (
          <>
            <IcEye className="ic-action" onClick={onOpenDetail(item)} />
          </>
        );
      },
    },
  ];

  const handleChangePage = (page) => {
    setQueryStringValue("page", page - 1);
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    setQueryStringValues({ size: size, page: 0 });
    onSizeChange({ size: size, dataSortColumn, dataSearch });
  };

  const onOpenDetail = (record) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!checkRole([ROLES["THU_NGAN"].CHI_TIET_PHIEU_THU])) return;
    const { maHoSo, id, nbDotDieuTriId } = record;
    history.push(
      `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${id}/${nbDotDieuTriId}`
    );
  };

  const onRow = (record) => {
    return {
      onClick: onOpenDetail(record),
    };
  };

  return (
    <MainPage
      showBreadcrumb={false}
      topHeader={
        <MainHeaderSearchThuNgan
          titleBack={`${t("common.quayLai")} [ESC]`}
          backLink="/thu-ngan"
          icon={IconArrowRight}
          layerId={refLayerHotKey.current}
          nhaTamUng={state?.nhaTamUng}
          onChangeSelect={onChangeSelect}
        />
      }
      title={t("thuNgan.danhSachPhieuThu")}
    >
      <GlobalStyle></GlobalStyle>
      <PhieuThuHeader layerId={refLayerHotKey.current} />
      <Card noPadding={true}>
        <TableWrapper
          style={{ background: "#f4f5f7" }}
          rowClassName={(record, index) => {
            return index == state.currentIndex
              ? "row-selected row-id-" + record.id
              : "row-id-" + record.id;
          }}
          scroll={{ y: 500, x: 1500 }}
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          tableName="table_ThuNgan_DanhSachPhieuThu"
          ref={refSettings}
        ></TableWrapper>
        {!!totalElements && (
          <Pagination
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        )}
      </Card>
      <ModalChonToaNha ref={refModalChonToaNha} />
    </MainPage>
  );
};

export default DanhSachPhieuThu;
