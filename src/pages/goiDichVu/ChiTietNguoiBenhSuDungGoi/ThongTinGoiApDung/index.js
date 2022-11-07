import React, { memo, useEffect, useRef } from "react";
import { Main, GlobalStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Checkbox, Col, Popover, Row } from "antd";
import { TableWrapper, InputTimeout } from "components";
import IcSetting from "assets/svg/ic-setting.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import ModalChinhSuaGoi from "../ModalChinhSuaGoi";

const { Column } = TableWrapper;
const ThongTinGoiApDung = (props) => {
  const refSettings = useRef(null);
  const refModalChinhSuaGoi = useRef(null);

  const {
    listDvTrongGoi,
    // totalElements, page, size
  } = useSelector((state) => state.dichVuTrongGoi);
  const {
    dichVuTrongGoi: {
      onSearch,
      onSortChange,
      // onSizeChange,
      onChangeInputSearch,
    },
    nbGoiDv: { getById },
  } = useDispatch();

  const { thongTinNbGoiDv, dataSortColumnChiTiet: dataSortColumn } =
    useSelector((state) => state.nbGoiDv);
  const { t } = useTranslation();

  useEffect(() => {
    if (thongTinNbGoiDv?.id) {
      onSearch({
        page: "",
        size: "",
        isGetAll: true,
        dataSearch: {
          nbThongTinId: thongTinNbGoiDv?.nbThongTinId,
          nbGoiDvId: thongTinNbGoiDv?.id,
        },
      });
    }
  }, [thongTinNbGoiDv]);
  const onClickSort = (key, value) => {
    onSortChange({ isGetAll: true, [key]: value });
  };
  const renderTrangThai = (item) => {
    if (item.soLuongDaDung == 0) return t("goiDichVu.taoMoi");
    if (item.soLuongDaDung >= item.soLuong) return t("goiDichVu.daThucHien");
    return t("goiDichVu.dangThucHien");
  };
  const renderThanhTien = (item) => {
    return (
      (item.soLuong || 0) * (item.giaKhongBaoHiem || 0) -
      renderTongTienMienGiam(item)
    );
  };
  const renderTongTienMienGiam = (item) => {
    return (
      (item.tienGiamGia || 0) +
      (item?.tienMienGiamGoiDv || 0) +
      (item?.tienMienGiam || 0)
    );
  };
  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };
  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      i18Name: "common.stt",
      fixed: "left",
    }),
    Column({
      title: t("common.maDv"),
      sort_key: "maDichVu",
      dataSort: dataSortColumn["maDichVu"] || "",
      onClickSort: onClickSort,
      width: "150px",
      fixed: "left",
      dataIndex: "maDichVu",
      key: "maDichVu",
      i18Name: "common.maDv",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapMaDichVu")}
          onChange={(e) => {
            onChangeInputSearch({ isGetAll: true, maDv: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.tenDichVu"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "200px",
      fixed: "left",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapTenDichVu")}
          onChange={(e) => {
            onChangeInputSearch({ isGetAll: true, tenDichVu: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.soLuong"),
      sort_key: "soLuong",
      dataSort: dataSortColumn["soLuong"] || "",
      onClickSort: onClickSort,
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: "common.soLuong",
      align: "center",
    }),
    Column({
      title: t("goiDichVu.soLuongDaSuDung"),
      sort_key: "soLuongDaDung",
      dataSort: dataSortColumn["soLuongDaDung"] || "",
      onClickSort: onClickSort,
      width: "80px",
      dataIndex: "soLuongDaDung",
      key: "soLuongDaDung",
      i18Name: "goiDichVu.soLuongDaSuDung",
      align: "center",
      render: (value) => value || 0,
    }),
    Column({
      title: t("goiDichVu.soLuongConLai"),
      width: "80px",
      key: "soLuongConLai",
      i18Name: "goiDichVu.soLuongConLai",
      align: "center",
      render: (field, item, index) => {
        return (item?.soLuong || 0) - (item?.soLuongDaDung || 0);
      },
    }),
    Column({
      title: t("goiDichVu.soLuongTra"),
      sort_key: "soLuongTra",
      dataSort: dataSortColumn["soLuongTra"] || "",
      onClickSort: onClickSort,
      width: "80px",
      dataIndex: "soLuongTra",
      key: "soLuongTra",
      i18Name: "goiDichVu.soLuongTra",
      align: "center",
      render: (value) => value || 0,
    }),
    Column({
      title: t("goiDichVu.giaKhongBaoHiem"),
      sort_key: "giaKhongBaoHiem",
      dataSort: dataSortColumn["giaKhongBaoHiem"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      i18Name: "goiDichVu.giaKhongBaoHiem",
      align: "right",
      render: (value, item, index) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: t("goiDichVu.phanTramMienGiam"),
      sort_key: "phanTramMienGiam",
      dataSort: dataSortColumn["phanTramMienGiam"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "phanTramMienGiam",
      key: "phanTramMienGiam",
      i18Name: "goiDichVu.phanTramMienGiam",
      align: "center",
      render: (value) => {
        return value || 0;
      },
    }),

    Column({
      title: t("goiDichVu.tienMienGiamDV"),
      sort_key: "tienMienGiam",
      dataSort: dataSortColumn["tienMienGiam"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      i18Name: "goiDichVu.tienMienGiamDV",
      align: "right",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: t("goiDichVu.tienMienGiamGoi"),
      sort_key: "tienMienGiamGoiDv",
      dataSort: dataSortColumn["tienMienGiamGoiDv"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "tienMienGiamGoiDv",
      key: "tienMienGiamGoiDv",
      i18Name: "goiDichVu.tienMienGiamGoi",
      align: "right",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: t("goiDichVu.tienMienGiamVoucher"),
      sort_key: "tienGiamGia",
      dataSort: dataSortColumn["tienGiamGia"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "tienGiamGia",
      key: "tienGiamGia",
      i18Name: "goiDichVu.tienMienGiamVoucher",
      align: "right",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: t("goiDichVu.tongTienMienGiam"),
      width: "120px",
      key: "tongTienMienGiam",
      i18Name: "goiDichVu.tongTienMienGiam",
      align: "right",
      render: (value, item) => {
        return <div>{renderTongTienMienGiam(item).formatPrice()}</div>;
      },
    }),
    Column({
      title: t("common.thanhTien"),
      width: "100px",
      key: "thanhTien",
      i18Name: "common.thanhTien",
      align: "right",
      render: (value, item) => {
        return renderThanhTien(item).formatPrice();
      },
    }),
    Column({
      title: t("goiDichVu.khongTinhTien"),
      sort_key: "khongTinhTien",
      dataSort: dataSortColumn["khongTinhTien"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      i18Name: "goiDichVu.khongTinhTien",
      align: "center",
      render: (value, item, index) => {
        return <Checkbox checked={value}></Checkbox>;
      },
    }),
    Column({
      title: t("goiDichVu.mienGiamGoiDv"),
      sort_key: "mienGiamGoiDv",
      dataSort: dataSortColumn["mienGiamGoiDv"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "mienGiamGoiDv",
      key: "mienGiamGoiDv",
      i18Name: "goiDichVu.mienGiamGoiDv",
      align: "center",
      render: (value, item, index) => {
        return <Checkbox checked={value}></Checkbox>;
      },
    }),
    Column({
      title: t("common.trangThai"),
      sort_key: "trangThai",
      dataSort: dataSortColumn["trangThai"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "common.trangThai",
      align: "center",
      render: (field, item, index) => {
        return renderTrangThai(item);
      },
    }),

    // Column({
    //   title: (
    //     <>
    //       {t("common.thaoTac")}
    //       <img
    //         src={IcSetting}
    //         alt="..."
    //         onClick={onSettings}
    //         style={{ cursor: "pointer" }}
    //       />
    //     </>
    //   ),
    //   width: "90px",
    //   i18Name: "common.thaoTac",
    //   align: "center",
    //   fixed: "right",
    //   render: () => {
    //     return <></>;
    //   },
    // }),
  ];
  // const onChangePage = (page) => {
  //   onSearch({ page: page - 1 });
  // };

  // const onShowSizeChange = (size) => {
  //   onSizeChange({ size });
  // };

  const onChinhSuaGoi = () => {
    refModalChinhSuaGoi.current &&
      refModalChinhSuaGoi.current.show({ currentItem: thongTinNbGoiDv }, () => {
        getById(thongTinNbGoiDv?.id);

        onSearch({
          page: "",
          size: "",
          isGetAll: true,
          dataSearch: {
            nbThongTinId: thongTinNbGoiDv?.nbThongTinId,
            nbGoiDvId: thongTinNbGoiDv?.id,
          },
        });
      });
  };

  return (
    <Main>
      <div className="thong-tin-goi">
        <Row gutter={[8, 8, 8, 8]}>
          <Col span={24}>
            <div className="title-goidv">
              <div className="item">
                <div className="label">{t("goiDichVu.tenGoi")}: </div>
                <div className="text-content">{thongTinNbGoiDv?.tenGoiDv}</div>
              </div>

              <a onClick={onChinhSuaGoi} className="action-chinh-sua-goi">
                {t("goiDichVu.chinhSuaGoi")}
                <IcEdit className="ic-action" />
              </a>
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 8, 8, 8]}>
          <Col span={6}>
            <div className="item">
              <div className="label">{t("goiDichVu.ngaySuDungGoi")}: </div>
              <div className="text-content">
                {thongTinNbGoiDv?.thoiGianApDung
                  ?.toDateObject()
                  .format("HH:mm:ss dd/MM/yyyy")}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="item">
              <div className="label">
                {t("goiDichVu.tongTienGoiTheoNiemYet")}:{" "}
              </div>
              <div className="text-content">
                {thongTinNbGoiDv?.tongTien?.formatPrice()}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <GlobalStyle />
            <Popover
              overlayClassName="popover-tong-tien-mien-giam"
              content={
                <div>
                  <div className="item">
                    <div className="label">
                      {t("goiDichVu.tongTienMienGiam")}
                    </div>
                    <div className="text-content">
                      {(
                        (thongTinNbGoiDv?.tienMienGiamDichVu || 0) +
                        (thongTinNbGoiDv?.tienMienGiamGoiDv || 0) +
                        (thongTinNbGoiDv?.tienGiamGia || 0)
                      ).formatPrice()}
                    </div>
                  </div>
                  <div className="item">
                    <div className="label">{t("goiDichVu.theoGoi")} </div>
                    <div className="text-content">
                      {(thongTinNbGoiDv?.tienMienGiamGoiDv || 0).formatPrice()}
                    </div>
                  </div>
                  <div className="item">
                    <div className="label">{t("goiDichVu.theoDichVu")} </div>
                    <div className="text-content">
                      {(thongTinNbGoiDv?.tienMienGiamDichVu || 0).formatPrice()}
                    </div>
                  </div>
                  <div className="item">
                    <div className="label">{t("goiDichVu.theoVoucher")} </div>
                    <div className="text-content">
                      {(thongTinNbGoiDv?.tienGiamGia || 0).formatPrice()}
                    </div>
                  </div>
                </div>
              }
            >
              <div className="item">
                <div className="label">{t("goiDichVu.tongTienMienGiam")}: </div>
                <div className="text-content">
                  {(
                    (thongTinNbGoiDv?.tienMienGiamDichVu || 0) +
                    (thongTinNbGoiDv?.tienMienGiamGoiDv || 0) +
                    (thongTinNbGoiDv?.tienGiamGia || 0)
                  ).formatPrice()}
                </div>
              </div>
            </Popover>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row>
          <Col span={6}>
            <div className="item">
              <div className="label">{t("goiDichVu.tongTienGoiSauGiam")}: </div>
              <div className="text-content">
                {(
                  (thongTinNbGoiDv?.tongTien || 0) -
                  (thongTinNbGoiDv?.tienGiamGia || 0) -
                  (thongTinNbGoiDv?.tienMienGiamDichVu || 0) -
                  (thongTinNbGoiDv?.tienMienGiamGoiDv || 0)
                ).formatPrice()}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="item">
              <div className="label">
                {t("goiDichVu.tongTienDaThanhToan")}:{" "}
              </div>
              <div className="text-content">
                {(thongTinNbGoiDv?.tienDaThanhToan || 0).formatPrice()}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="item">
              <div className="label" style={{ fontWeight: "bold" }}>
                {t("goiDichVu.tienNbConThieu")}:{" "}
              </div>
              <div
                className="text-content"
                style={{ color: "red", fontSize: "20px" }}
              >
                {(
                  (thongTinNbGoiDv?.tongTien || 0) -
                  (thongTinNbGoiDv?.tienGiamGia || 0) -
                  (thongTinNbGoiDv?.tienMienGiamDichVu || 0) -
                  (thongTinNbGoiDv?.tienMienGiamGoiDv || 0) -
                  (thongTinNbGoiDv?.tienDaThanhToan || 0)
                ).formatPrice()}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="item">
              <div className="label">
                {t("goiDichVu.tienDaSuDungTruocGiam")}:{" "}
              </div>
              <div className="text-content">
                {(thongTinNbGoiDv?.tienDaSuDungTruocGiam || 0).formatPrice()}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="dich-vu-trong-goi">
        {t("goiDichVu.danhSachDichVuTrongGoi")}
        <div>
          {t("common.thaoTac")}
          <IcSetting onClick={onSettings} className="ic-action" />
        </div>
      </div>
      <TableWrapper
        columns={columns}
        dataSource={listDvTrongGoi}
        // onRow={onRow}
        rowKey={(record) => `${record.id}`}
        // scroll={{ x: 1500 }}
        tableName="table_GOIDV_DichVuTrongGoi"
        ref={refSettings}
      />
      {/* {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listDvTrongGoi}
          total={totalElements}
          onShowSizeChange={onShowSizeChange}
        />
      )} */}
      <ModalChinhSuaGoi ref={refModalChinhSuaGoi} />
    </Main>
  );
};
export default memo(ThongTinGoiApDung);
