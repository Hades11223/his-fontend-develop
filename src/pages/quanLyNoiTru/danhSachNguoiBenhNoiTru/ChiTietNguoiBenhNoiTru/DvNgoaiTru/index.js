import React, { useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { HeaderSearch, Pagination } from "components";
import { useDispatch } from "react-redux";
import TableWrapper from "components/TableWrapper";
import IcView from "assets/images/kho/icView.png";
import { useParams } from "react-router-dom";
import ModalChiTietDichVu from "./ModalChiTietDichVu";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import {
  ENUM,
  GIOI_TINH_BY_VALUE,
  LOAI_DICH_VU,
  TRANG_THAI_DICH_VU,
  TRANG_THAI_HOAN,
} from "constants/index";
import IconPrinter from "assets/images/khamBenh/printer.png";
import { Checkbox, Dropdown, Menu, message, Tooltip } from "antd";
import IconHoanDv from "assets/images/khamBenh/icHoanDv.png";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import ModalHuyHoanDichVu from "components/ModalHuyHoanDichVu";
import IcViewImagePacs from "assets/svg/ic-view-pasc.svg";
import IconKetQua from "assets/images/xetNghiem/icPdf.png";
import IcSetting from "assets/svg/ic-setting.svg";
import printProvider from "data-access/print-provider";
import IconDelete from "assets/images/khamBenh/delete.png";
import { refConfirm } from "app";

const DieuTriSoKet = () => {
  const refModalHoanDichVu = useRef(null);
  const refHuyHoanDichVu = useRef(null);
  const refSettings = useRef(null);
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listTrangThaiHoan] = useEnum(ENUM.TRANG_THAI_HOAN);
  const { listDvNgoaiTru } = useStore("dvNgoaiTru", []);
  const { dataSortColumn } = useStore("dvNgoaiTru", {});
  const { totalElements, page, size } = useStore("dvNgoaiTru", null);
  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});

  const {
    dvNgoaiTru: { onSearch, onSizeChange, onSortChange, onChangeInputSearch },
    chiDinhKhamBenh: { inPhieu, inPhieuKetQua },
    pacs: { getUrl },
    nbDvHoan: { inPhieuHoanDoiTra },
    chiDinhKhamBenh: { onDeleteDichVu },
  } = useDispatch();

  const { t } = useTranslation();

  const { id } = useParams();
  const modalRefThongTinDichVu = useRef(null);
  useEffect(() => {
    if (id) onChangeInputSearch({ nbDotDieuTriId: id, doiTuongKcb: 1 });
  }, [id]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onInPhieuChiDinh = (data) => {
    inPhieu({
      nbDotDieuTriId: data?.nbDotDieuTriId,
      loaiDichVu: data?.loaiDichVu,
      chiDinhTuLoaiDichVu: data?.chiDinhTuLoaiDichVu,
      chiDinhTuDichVuId: data?.chiDinhTuDichVuId,
      soPhieuId: data?.soPhieuId,
    });
  };

  const dataNb = useMemo(() => {
    let gender = infoPatient?.gioiTinh
      ? GIOI_TINH_BY_VALUE[infoPatient?.gioiTinh]
      : "";

    let age =
      infoPatient?.thangTuoi > 36 || infoPatient?.tuoi
        ? `${infoPatient?.tuoi} ${t("common.tuoi")}`
        : `${infoPatient?.thangTuoi} ${t("common.thang")}`;
    return { gender, age };
  }, []);
  const onHoanDv = (record) => {
    const data = Array(record);
    if (data?.length) {
      data.forEach((itemLoop) => {
        itemLoop.gioiTinh = dataNb?.gender;
        itemLoop.tuoi = dataNb?.age;
      });

      refModalHoanDichVu.current &&
        refModalHoanDichVu.current.show(
          {
            data: data,
          },
          () => {
            onChangeInputSearch({ nbDotDieuTriId: id, doiTuongKcb: 1 });
          }
        );
    } else {
      message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
    }
  };

  const onHuyHoan = (data) => {
    data.gioiTinh = dataNb?.gender;
    data.tuoi = dataNb?.age;
    if (refHuyHoanDichVu.current)
      refHuyHoanDichVu.current.show(data, () => {
        onChangeInputSearch({ nbDotDieuTriId: id, doiTuongKcb: 1 });
      });
  };

  const onViewPacs = (data) => {
    getUrl({ id: data?.id }).then((res) => {
      window.open(res, "_blank").focus();
    });
  };

  const inPhieuKetQuaDichVu = (data) => {
    inPhieuKetQua({
      loaiDichVu: data?.loaiDichVu,
      nbDotDieuTriId: data?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: data?.chiDinhTuLoaiDichVu,
      chiDinhTuDichVuId: data?.chiDinhTuDichVuId,
      dsSoKetNoi: data?.soKetNoi ? [data?.soKetNoi] : null,
      soPhieuId: data?.soPhieuId,
    });
  };

  const inPhieuHoan = (data) => {
    inPhieuHoanDoiTra({
      nbDotDieuTriId: data?.nbDotDieuTriId,
      dsNbDichVuId: data?.id,
    }).then((s) => {
      printProvider.printPdf(s);
    });
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const menu = (data) => () => {
    const phieus = [
      {
        key: 0,
        ten: t("phieuIn.inPhieuChiDinh"),
        api: () => onInPhieuChiDinh(data),
      },
    ];
    if (data.trangThaiHoan !== 0) {
      phieus.push({
        key: 1,
        ten: t("phieuIn.inPhieuHoan"),
        api: () => inPhieuHoan(data),
      });
    }
    return (
      <Menu
        items={phieus.map((item, index) => ({
          key: index,
          label: (
            <a href={() => false} onClick={item?.api}>
              {item.ten}
            </a>
          ),
        }))}
      />
    );
  };

  const onDelete = (record) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("common.banChacChanMuonXoa")} ${record.tenDichVu}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu({ id: record.id, loaiDichVu: record.loaiDichVu }).then(
            (s) => {
              if (s.code === 0) {
                onChangeInputSearch({ nbDotDieuTriId: id, doiTuongKcb: 1 });
              }
            }
          );
        }
      );
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "35px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          dataSort={dataSortColumn["tenDichVu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "120px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: t("common.tenDichVu"),
      show: true,
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} />,
      width: "50px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      i18Name: t("common.soLuong"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.dvt")}
          sort_key="tenDonViTinh"
          dataSort={dataSortColumn["tenDonViTinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      i18Name: t("thuNgan.dvt"),
      show: true,
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.chanDoan")} />,
      width: "100px",
      dataIndex: "dsCdChinh",
      key: "dsCdChinh",
      i18Name: t("quanLyNoiTru.chanDoan"),
      show: true,
      render: (item) => {
        return (
          <div className="item">
            {(item || [])
              .map((x) => {
                return `${x.ma} - ${x.ten}`;
              })
              .join(", ")}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ketQua")}
          sort_key="ketQua"
          dataSort={dataSortColumn["ketQua"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "ketQua",
      key: "ketQua",
      i18Name: t("quanLyNoiTru.ketQua"),
      show: true,
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ketLuan")}
          sort_key="ketLuan"
          dataSort={dataSortColumn["ketLuan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "ketLuan",
      key: "ketLuan",
      i18Name: t("quanLyNoiTru.ketLuan"),
      show: true,
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.phongThucHien")}
          sort_key="tenPhongThucHien"
          dataSort={dataSortColumn["tenPhongThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      i18Name: t("quanLyNoiTru.phongThucHien"),
      show: true,
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ngayChiDinh")}
          sort_key="thoiGianChiDinh"
          dataSort={dataSortColumn["thoiGianChiDinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      i18Name: t("quanLyNoiTru.ngayChiDinh"),
      show: true,
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.ngayThucHien")}
          sort_key="thoiGianThucHien"
          dataSort={dataSortColumn["thoiGianThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: t("quanLyNoiTru.ngayThucHien"),
      show: true,
      render: (item) => item && moment(item).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThai")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: t("common.trangThai"),
      show: true,
      render: (item, data) => {
        if (data?.trangThaiHoan !== 0) {
          return (listTrangThaiHoan || []).find(
            (x) => x.id === data?.trangThaiHoan
          )?.ten;
        } else {
          return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.thanhToan")}
          sort_key="thanhToan"
          dataSort={dataSortColumn["thanhToan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "60px",
      dataIndex: "thanhToan",
      key: "thanhToan",
      i18Name: t("quanLyNoiTru.thanhToan"),
      align: "center",
      show: true,
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.thaoTac")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "80px",
      align: "right",
      fixed: "right",
      render: (item, data) => {
        return (
          <div className="image">
            <img
              src={IcView}
              alt={IcView}
              onClick={() =>
                modalRefThongTinDichVu.current &&
                modalRefThongTinDichVu.current.show({
                  ttDichVu: data,
                  ttNb: infoPatient,
                })
              }
            />
            {data.trangThaiHoan === TRANG_THAI_HOAN.THUONG &&
              (!data.thanhToan || data.thanhToanSau) && (
                <Tooltip title={t("khamBenh.chiDinh.xoaDichVu")}>
                  <img onClick={onDelete(data)} src={IconDelete} alt="" />
                </Tooltip>
              )}
            <Tooltip title={t("khamBenh.chiDinh.hoanDichVu")}>
              {data?.thanhToan && data.trangThaiHoan === 0 && (
                <img onClick={() => onHoanDv(data)} src={IconHoanDv} alt="" />
              )}
            </Tooltip>
            <Tooltip title={t("khamBenh.chiDinh.huyYeuCauHoan")}>
              {data.trangThaiHoan === 10 && (
                <img onClick={() => onHuyHoan(data)} src={IcHuyHoan} alt="" />
              )}
            </Tooltip>
            <Dropdown
              overlay={menu(data)}
              trigger={["click"]}
              placement="bottom"
            >
              <img src={IconPrinter} alt={IconPrinter} />
            </Dropdown>
            {LOAI_DICH_VU.CDHA === data?.loaiDichVu &&
              [TRANG_THAI_DICH_VU.DA_CO_KET_QUA].includes(data?.trangThai) && (
                <Tooltip title={t("khamBenh.ketQua.xemKQPacs")}>
                  <IcViewImagePacs
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => onViewPacs(data)}
                  />
                </Tooltip>
              )}
            {[
              TRANG_THAI_DICH_VU.DA_CO_KET_QUA,
              TRANG_THAI_DICH_VU.DA_DUYET,
            ].includes(data?.trangThai) && (
              <Tooltip title={t("phieuIn.inKetQua")}>
                <img
                  src={IconKetQua}
                  alt={IconKetQua}
                  style={{ cursor: "pointer" }}
                  onClick={() => inPhieuKetQuaDichVu(data)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Main>
      <div className="table-content">
        <h1>{t("quanLyNoiTru.dichVuNgoaiTru")}</h1>
        <TableWrapper
          columns={columns}
          dataSource={listDvNgoaiTru}
          rowKey={(record) => record?.id}
          scroll={{ x: 2000 }}
          table="table_NoiTru_DvNgoaiTru"
          ref={refSettings}
        />

        {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listDvNgoaiTru}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            stylePagination={{ justifyContent: "flex-start" }}
          />
        )}
      </div>
      <ModalChiTietDichVu ref={modalRefThongTinDichVu} />
      <ModalHoanDichVu ref={refModalHoanDichVu} />
      <ModalHuyHoanDichVu ref={refHuyHoanDichVu} />
    </Main>
  );
};

export default DieuTriSoKet;
