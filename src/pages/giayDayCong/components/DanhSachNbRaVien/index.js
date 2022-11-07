import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from "components/Pagination";
import moment from "moment";
import IcGroup from "assets/images/template/icGroup.png";
import IcEye from "assets/svg/ic-eye.svg";
import { useEnum, useLoading } from "hook";
import { ENUM, ROLES } from "constants/index";
import Icon from "@ant-design/icons";
import IcGuiCt from "assets/svg/giayDayCong/ic-gui-ct.svg";
import IcHuyCn from "assets/svg/giayDayCong/ic-huy-cn.svg";
import { refConfirm } from "app";
import { Checkbox, Tooltip } from "antd";
import { checkRole } from "utils/role-utils";

const { Column } = TableWrapper;

const DanhSachNbRaVien = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [listDinhChiThaiNghen] = useEnum(ENUM.DINH_CHI_THAI_NGHEN);
  const [listTreEmKhongThe] = useEnum(ENUM.TRE_EM_KHONG_THE);
  const [listTrangThaiDayCong] = useEnum(ENUM.TRANG_THAI_DAY_CONG);
  const { showLoading, hideLoading } = useLoading();

  const { dayPhieuRaVienById, huyPhieuRaVienById } = useDispatch().nbRaVien;

  const {
    listData,
    page,
    size,
    totalElements,

    onSearch,
    onSizeChange,
    onSortChange,

    onShowTTRaVien,
  } = props;

  const [state, _setState] = useState({
    isCheckedAll: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    onSizeChange({ page, size });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const refreshList = () => {
    onSizeChange({ page, size });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onGuiChungTu = (item) => () => {
    dayPhieuRaVienById(item.id).then(() => {
      refreshList();
    });
  };

  const onHuyChungNhan = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xác nhận hủy",
          content: `Bạn chắc chắn muốn hủy chứng nhận ${item.HO_TEN}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-confirm",
          showImg: true,
          showBtnOk: true,
        },
        async () => {
          showLoading();

          huyPhieuRaVienById(item.id)
            .then(() => {
              hideLoading();
              refreshList();
            })
            .catch(() => {
              hideLoading();
            });
        }
      );
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("giayDayCong.HO_TEN"),
      width: "250px",
      dataIndex: "HO_TEN",
      key: "HO_TEN",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.HO_TEN",
    }),
    Column({
      title: t("giayDayCong.maBenhAn"),
      width: "120px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.maBenhAn",
    }),
    Column({
      title: t("giayDayCong.maHoSo"),
      width: "120px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.maHoSo",
    }),
    Column({
      title: t("giayDayCong.MA_THE"),
      width: "160px",
      dataIndex: "MA_THE",
      key: "MA_THE",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.MA_THE",
    }),
    Column({
      title: t("giayDayCong.trangThai"),
      width: "170px",
      dataIndex: "trangThaiDayCong",
      key: "trangThaiDayCong",
      i18Name: "giayDayCong.trangThai",
      render: (item) =>
        (listTrangThaiDayCong || []).find((x) => x.id == item)?.ten || "",
    }),
    Column({
      title: t("giayDayCong.nbRaVien.ngayChungTu"),
      width: "150px",
      dataIndex: "thoiGianChungTu",
      i18Name: "giayDayCong.nbRaVien.ngayChungTu",
      key: "thoiGianChungTu",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.thongTinTraVe"),
      width: "180px",
      dataIndex: "ketQua",
      key: "ketQua",
      i18Name: "giayDayCong.thongTinTraVe",
      render: (item) => {
        return item;
      },
    }),
    Column({
      title: t("giayDayCong.thoiGianVaoVien"),
      width: "150px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      i18Name: "giayDayCong.thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),

    Column({
      title: t("giayDayCong.GIOI_TINH"),
      width: "100px",
      dataIndex: "GIOI_TINH",
      key: "GIOI_TINH",
      show: false,
      i18Name: "giayDayCong.GIOI_TINH",
      align: "center",
      render: (item) => listgioiTinh.find((gt) => gt.id === item)?.ten,
    }),
    Column({
      title: t("giayDayCong.ngaySinh"),
      width: "120px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      show: false,
      i18Name: "giayDayCong.ngaySinh",
      render: (field, item, index) =>
        field
          ? moment(field).format(item?.chiNamSinh ? "YYYY" : "DD / MM / YYYY")
          : "",
    }),
    Column({
      title: t("giayDayCong.diaChi"),
      width: "200px",
      dataIndex: "diaChi",
      key: "diaChi",
      show: false,
      i18Name: "giayDayCong.diaChi",
    }),
    Column({
      title: t("giayDayCong.MA_BHXH"),
      width: "140px",
      dataIndex: "MA_BHXH",
      key: "MA_BHXH",
      show: false,
      i18Name: "giayDayCong.MA_BHXH",
    }),
    Column({
      title: t("giayDayCong.MA_DANTOC"),
      width: "120px",
      dataIndex: "MA_DANTOC",
      key: "MA_DANTOC",
      show: false,
      i18Name: "giayDayCong.MA_DANTOC",
    }),
    Column({
      title: t("giayDayCong.DINH_CHI_THAI_NGHEN"),
      width: "200px",
      dataIndex: "DINH_CHI_THAI_NGHEN",
      key: "DINH_CHI_THAI_NGHEN",
      show: false,
      i18Name: "giayDayCong.DINH_CHI_THAI_NGHEN",
      render: (item) =>
        listDinhChiThaiNghen.find((item) => item.id === item)?.ten,
    }),
    Column({
      title: t("giayDayCong.TUOI_THAI"),
      width: "100px",
      dataIndex: "TUOI_THAI",
      key: "TUOI_THAI",
      show: false,
      i18Name: "giayDayCong.TUOI_THAI",
    }),
    Column({
      title: t("giayDayCong.TEKT"),
      sort_key: "TEKT",
      onClickSort: onClickSort,
      show: false,
      align: "center",
      width: "80px",
      dataIndex: "TEKT",
      i18Name: "giayDayCong.TEKT",
      key: "TEKT",
      render: (item) => <Checkbox checked={item == 1} />,
    }),
    Column({
      title: t("giayDayCong.thoiGianRaVien"),
      width: "200px",
      dataIndex: "thoiGianRaVien",
      key: "thoiGianRaVien",
      show: false,
      i18Name: "giayDayCong.thoiGianRaVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.tuThoiGianNghiNgoaiTru"),
      width: "200px",
      dataIndex: "tuThoiGianNghiNgoaiTru",
      key: "tuThoiGianNghiNgoaiTru",
      show: false,
      i18Name: "giayDayCong.tuThoiGianNghiNgoaiTru",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.denThoiGianNghiNgoaiTru"),
      width: "200px",
      dataIndex: "denThoiGianNghiNgoaiTru",
      key: "denThoiGianNghiNgoaiTru",
      show: false,
      i18Name: "giayDayCong.denThoiGianNghiNgoaiTru",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.dsCdChinh"),
      width: "200px",
      dataIndex: "dsCdChinh",
      key: "dsCdChinh",
      show: false,
      i18Name: "giayDayCong.dsCdChinh",
      render: (item) => (item || []).map((x) => x.ten).join(", "),
    }),
    Column({
      title: t("giayDayCong.PP_DIEUTRI"),
      width: "160px",
      dataIndex: "PP_DIEUTRI",
      key: "PP_DIEUTRI",
      show: false,
      i18Name: "giayDayCong.PP_DIEUTRI",
    }),
    Column({
      title: t("giayDayCong.GHI_CHU"),
      width: "200px",
      dataIndex: "GHI_CHU",
      key: "GHI_CHU",
      show: false,
      i18Name: "giayDayCong.GHI_CHU",
    }),
    Column({
      title: t("giayDayCong.tenKhoaNb"),
      width: "220px",
      dataIndex: "tenKhoaNb",
      key: "tenKhoaNb",
      show: false,
      i18Name: "giayDayCong.tenKhoaNb",
    }),
    Column({
      title: t("giayDayCong.TEN_TRUONGKHOA"),
      width: "200px",
      dataIndex: "TEN_TRUONGKHOA",
      key: "TEN_TRUONGKHOA",
      show: false,
      i18Name: "giayDayCong.TEN_TRUONGKHOA",
    }),
    Column({
      title: t("giayDayCong.MA_CCHN_TRUONGKHOA"),
      width: "220px",
      dataIndex: "MA_CCHN_TRUONGKHOA",
      key: "MA_CCHN_TRUONGKHOA",
      show: false,
      i18Name: "giayDayCong.MA_CCHN_TRUONGKHOA",
    }),

    Column({
      title: (
        <>
          {t("common.tienIch")}
          <img
            src={IcGroup}
            alt="..."
            onClick={onSettings}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
      width: "100px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (list, item, index) => {
        return (
          <div className="ic-action">
            {checkRole([ROLES["GIAY_DAY_CONG"].NB_RA_VIEN_CHI_TIET]) && (
              <Tooltip title={t("giayDayCong.action.xemChiTiet")}>
                <IcEye className="ic-action" onClick={onShowTTRaVien(list)} />
              </Tooltip>
            )}

            {list.trangThaiDayCong == 40 &&
              checkRole([ROLES["GIAY_DAY_CONG"].NB_RA_VIEN_HUY]) && (
                <Tooltip title={t("giayDayCong.action.huyGiamDinh")}>
                  <Icon
                    className="ic-action"
                    component={IcHuyCn}
                    onClick={onHuyChungNhan(item)}
                  />
                </Tooltip>
              )}

            {list.trangThaiDayCong != 40 &&
              checkRole([ROLES["GIAY_DAY_CONG"].NB_RA_VIEN_DAY_LE]) && (
                <Tooltip title={t("giayDayCong.action.guiGiamDinh")}>
                  <Icon
                    className="ic-action"
                    component={IcGuiCt}
                    onClick={onGuiChungTu(item)}
                  />
                </Tooltip>
              )}
          </div>
        );
      },
    }),
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {},
    };
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        ref={refSettings}
        tableName="table_GIAYDAYCONG_DsNbRaVien"
      />
      {!!totalElements && (
        <Pagination
          listData={listData || []}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nbRaVien: { listData, totalElements, page, size, dataSortColumn },
  } = state;
  return {
    listData,
    totalElements,
    page,
    size,
    dataSortColumn,
  };
};

const mapDispatchToProps = ({
  nbRaVien: { onSearch, onSizeChange, onSortChange },
  utils: { getUtils },
  phieuIn: { showFileEditor },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
  onSortChange,
  showFileEditor,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachNbRaVien);
