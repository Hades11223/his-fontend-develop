import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from "components/Pagination";
import moment from "moment";
import IcGroup from "assets/images/template/icGroup.png";
import IcEye from "assets/svg/ic-eye.svg";
import { Checkbox, Tooltip } from "antd";
import { useEnum } from "hook";
import { ENUM, ROLES } from "constants/index";
import Icon from "@ant-design/icons";
import IcGuiCt from "assets/svg/giayDayCong/ic-gui-ct.svg";
import IcHuyCn from "assets/svg/giayDayCong/ic-huy-cn.svg";
import { refConfirm } from "app";
import { checkRole } from "utils/role-utils";

const { Column } = TableWrapper;

const DanhSachGiayNghiHuong = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const {
    listData,
    page,
    size,
    totalElements,
    dataSortColumn,

    onSearch,
    onSizeChange,
    onSortChange,
    showFileEditor,
  } = props;

  const [listTrangThaiDayCong] = useEnum(ENUM.TRANG_THAI_DAY_CONG);

  const { dayGiayNghiBaoHiemById, huyGiayNghiBaoHiemById } =
    useDispatch().giayNghiHuong;

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

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const refreshList = () => {
    onSizeChange({ page, size });
  };

  const onGuiChungTu = (item) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    dayGiayNghiBaoHiemById(item.id).then(() => {
      refreshList();
    });
  };

  const onHuyChungNhan = (item) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Xác nhận hủy",
          content: `Bạn chắc chắn muốn hủy chứng nhận ${item.HO_TEN || ""}?`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-confirm",
          showImg: true,
          showBtnOk: true,
        },
        async () => {
          huyGiayNghiBaoHiemById(item.id).then(() => {
            refreshList();
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
      sort_key: "HO_TEN",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["HO_TEN"] || "",
      width: "250px",
      dataIndex: "HO_TEN",
      key: "HO_TEN",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.tenNb",
    }),
    Column({
      title: t("giayDayCong.SO_KCB"),
      sort_key: "SO_KCB",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["SO_KCB"] || "",
      width: "120px",
      dataIndex: "SO_KCB",
      key: "SO_KCB",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.maHoSo",
    }),
    Column({
      title: t("giayDayCong.MA_THE"),
      width: "150px",
      dataIndex: "MA_THE",
      key: "MA_THE",
      render: (item) => {
        return item;
      },
      i18Name: "giayDayCong.MA_THE",
    }),
    Column({
      title: t("giayDayCong.trangThai"),
      sort_key: "trangThai",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["trangThai"] || "",
      width: "170px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "giayDayCong.trangThai",
      render: (item) =>
        (listTrangThaiDayCong || []).find((x) => x.id == item)?.ten || "",
    }),
    Column({
      title: t("giayDayCong.ngayChungTu"),
      sort_key: "ngayChungTu",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["ngayChungTu"] || "",
      width: "150px",
      dataIndex: "ngayChungTu",
      i18Name: "giayDayCong.ngayChungTu",
      key: "ngayChungTu",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.TEN_NGUOI_HANH_NGHE"),
      width: "200px",
      dataIndex: "TEN_NGUOI_HANH_NGHE",
      key: "TEN_NGUOI_HANH_NGHE",
      i18Name: "giayDayCong.TEN_NGUOI_HANH_NGHE",
      render: (item) => {
        return item;
      },
    }),
    Column({
      title: t("giayDayCong.thongTinTraVe"),
      width: "120px",
      dataIndex: "ketQua",
      key: "ketQua",
      i18Name: "giayDayCong.thongTinTraVe",
      render: (item) => {
        return item;
      },
    }),
    Column({
      title: t("giayDayCong.thoiGianVaoVien"),
      sort_key: "thoiGianVaoVien",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["thoiGianVaoVien"] || "",
      width: "150px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      i18Name: "giayDayCong.thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),

    Column({
      title: t("giayDayCong.MA_BHXH"),
      sort_key: "MA_BHXH",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["MA_BHXH"] || "",
      width: "150px",
      dataIndex: "MA_BHXH",
      i18Name: "giayDayCong.MA_BHXH",
      key: "MA_BHXH",
      show: false,
    }),
    Column({
      title: t("giayDayCong.DON_VI"),
      sort_key: "DON_VI",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["DON_VI"] || "",
      width: "150px",
      dataIndex: "DON_VI",
      i18Name: "giayDayCong.DON_VI",
      key: "DON_VI",
      show: false,
    }),
    Column({
      title: t("giayDayCong.dsCdChinh"),
      sort_key: "dsCdChinh",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["dsCdChinh"] || "",
      width: "200px",
      dataIndex: "dsCdChinh",
      show: false,
      i18Name: "giayDayCong.dsCdChinh",
      key: "dsCdChinh",
      render: (item) => (item || []).map((x) => x.ten).join(", "),
    }),
    Column({
      title: t("giayDayCong.phuongPhapDieuTri"),
      sort_key: "phuongPhapDieuTri",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["phuongPhapDieuTri"] || "",
      width: "150px",
      dataIndex: "phuongPhapDieuTri",
      i18Name: "giayDayCong.phuongPhapDieuTri",
      key: "phuongPhapDieuTri",
      show: false,
    }),
    Column({
      title: t("giayDayCong.soNgay"),
      sort_key: "soNgay",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["soNgay"] || "",
      width: "150px",
      show: false,
      dataIndex: "soNgay",
      i18Name: "giayDayCong.soNgay",
      key: "soNgay",
    }),
    Column({
      title: t("giayDayCong.tuNgay"),
      sort_key: "tuNgay",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["tuNgay"] || "",
      width: "150px",
      dataIndex: "tuNgay",
      i18Name: "giayDayCong.tuNgay",
      key: "tuNgay",
      show: false,
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.denNgay"),
      sort_key: "denNgay",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["denNgay"] || "",
      width: "150px",
      show: false,
      dataIndex: "denNgay",
      i18Name: "giayDayCong.denNgay",
      key: "denNgay",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    }),
    Column({
      title: t("giayDayCong.HO_TEN_CHA"),
      sort_key: "HO_TEN_CHA",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["HO_TEN_CHA"] || "",
      width: "150px",
      dataIndex: "HO_TEN_CHA",
      i18Name: "giayDayCong.HO_TEN_CHA",
      key: "HO_TEN_CHA",
      show: false,
    }),
    Column({
      title: t("giayDayCong.HO_TEN_ME"),
      sort_key: "HO_TEN_ME",
      onClickSort: onClickSort,
      dataSort: dataSortColumn["HO_TEN_ME"] || "",
      width: "150px",
      dataIndex: "HO_TEN_ME",
      i18Name: "giayDayCong.HO_TEN_ME",
      key: "HO_TEN_ME",
      show: false,
    }),
    Column({
      title: t("giayDayCong.THU_TRUONG_DV"),
      sort_key: "THU_TRUONG_DV",
      onClickSort: onClickSort,
      show: false,
      dataSort: dataSortColumn["THU_TRUONG_DV"] || "",
      width: "180px",
      dataIndex: "THU_TRUONG_DV",
      i18Name: "giayDayCong.THU_TRUONG_DV",
      key: "THU_TRUONG_DV",
    }),
    Column({
      title: t("giayDayCong.TEKT"),
      sort_key: "TEKT",
      onClickSort: onClickSort,
      show: false,
      align: "center",
      dataSort: dataSortColumn["TEKT"] || "",
      width: "80px",
      dataIndex: "TEKT",
      i18Name: "giayDayCong.TEKT",
      key: "TEKT",
      render: (item) => <Checkbox checked={item == 1} />,
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
            {checkRole([ROLES["GIAY_DAY_CONG"].GIAY_NGHI_HUONG_CHI_TIET]) && (
              <Tooltip title={t("giayDayCong.action.xemChiTiet")}>
                <IcEye className="ic-action" />
              </Tooltip>
            )}

            {list.trangThai == 40 &&
              checkRole([ROLES["GIAY_DAY_CONG"].GIAY_NGHI_HUONG_HUY]) && (
                <Tooltip title={t("giayDayCong.action.huyGiamDinh")}>
                  <Icon
                    className="ic-action"
                    component={IcHuyCn}
                    onClick={onHuyChungNhan(item)}
                  ></Icon>
                </Tooltip>
              )}

            {list.trangThai != 40 &&
              checkRole([ROLES["GIAY_DAY_CONG"].GIAY_NGHI_HUONG_DAY_LE]) && (
                <Tooltip title={t("giayDayCong.action.guiGiamDinh")}>
                  <Icon
                    className="ic-action"
                    component={IcGuiCt}
                    onClick={onGuiChungTu(item)}
                  ></Icon>
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
      onClick: () => {
        if (!checkRole([ROLES["GIAY_DAY_CONG"].GIAY_NGHI_HUONG_CHI_TIET]))
          return;

        const { nbDotDieuTriId } = record;
        showFileEditor({
          phieu: { ma: "P044" },
          nbDotDieuTriId,
        });
      },
    };
  };

  // const oncheckAll = (e) => {
  //   setState({
  //     selectedRowKeys: e.target?.checked
  //       ? (listData || []).map((x) => x.id)
  //       : [],
  //     isCheckedAll: e.target?.checked,
  //   });
  // };

  // const onSelectChange = (selectedRowKeys, data) => {
  //   let updatedSelectedKeys = selectedRowKeys;
  //   updatedSelectedKeys = [...new Set(updatedSelectedKeys)];

  //   if ((listData || []).length === updatedSelectedKeys.length) {
  //     setState({
  //       isCheckedAll: true,
  //       selectedRowKeys: updatedSelectedKeys,
  //     });
  //   } else {
  //     setState({
  //       isCheckedAll: false,
  //       selectedRowKeys: updatedSelectedKeys,
  //     });
  //   }
  // };

  // const rowSelection = {
  //   columnTitle: (
  //     <HeaderSearch
  //       title={
  //         <Checkbox
  //           onChange={oncheckAll}
  //           checked={state.isCheckedAll}
  //         ></Checkbox>
  //       }
  //     />
  //   ),
  //   columnWidth: 40,
  //   onChange: onSelectChange,
  //   selectedRowKeys: state.selectedRowKeys,
  // };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData || []}
        onRow={onRow}
        rowKey={(record) => record.id}
        tableName="table_GIAYDAYCONG_GiayNghiHuong"
        // rowSelection={rowSelection}
        ref={refSettings}
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
    giayNghiHuong: { listData, totalElements, page, size, dataSortColumn },
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
  giayNghiHuong: { onSearch, onSizeChange, onSortChange },
  utils: { getUtils },
  phieuIn: { showFileEditor },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
  onSortChange,
  showFileEditor,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachGiayNghiHuong);
