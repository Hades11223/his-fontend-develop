import { Col, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useMemo } from "react";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { MainPage } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "components";
import TrangThai from "pages/kho/components/TrangThai";
import SearchHangHoa from "../SearchHangHoa";
import ThongTinPhieuNhap from "./ThongTinPhieuNhap";
import ThongTinTongHop from "./ThongTinTongHop";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import { useHistory, useParams } from "react-router-dom";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import IcXuatFile from "assets/images/kho/icXuatFile.png";
import fileUtils from "utils/file-utils";
import IcCreate from "assets/svg/thuNgan/iconCreate.svg";
import { refConfirm } from "app";
import Action from "../../Action";
import ThongTinPhieu from "./ThongTinPhieu";
import { Tabs, Pagination } from "components";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import DanhSachHangHoa1 from "./DanhSachHangHoa1";
import { ENUM, ROLES, TRANG_THAI_PHIEU_NHAP_XUAT } from "constants/index";
import { useEnum } from "hook";
import { checkRole } from "utils/role-utils";

const ChiTietPhieuNhap = ({ ...props }) => {
  const history = useHistory();
  const refSearchHangHoa = useRef();
  const {
    phieuNhapXuat: {
      thongTinPhieu,
      dsNhapXuatChiTiet,
      dataSortColumn,
      page = 0,
      size = 10,
      totalElements = 0,
    },
    utils: { listdinhDangBaoCao },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: {
      getDetail,
      resetData,
      xoaPhieu,
      onSearchChiTiet,
      onSortChange,
      onSizeChange,
      inPhieuNhapXuat,
      xuatPhieuNhapXuat,
    },
    nbDvKho: { getDsTraKho },
  } = useDispatch();
  const { id } = useParams();

  useEnum(ENUM.DINH_DANG_BAO_CAO);

  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);

  useEffect(() => {
    getDsTraKho({ phieuTraId: id });
    return () => {
      resetData();
    };
  }, []);

  useEffect(() => {
    if (id && id != "them-moi") {
      getDetail({ id });
    }
  }, [id]);

  const onClickSort = (key, value) => {
    if (!dsNhapXuatChiTiet || dsNhapXuatChiTiet?.length < 1) return;
    onSortChange({
      [key]: value,
    });
  };

  const onChangePage = (page) => {
    onSearchChiTiet({ page: page - 1 });
  };

  const onChangeSize = (size) => {
    onSizeChange({ size: size });
  };

  const onDelete = () => {
    if (refConfirm.current) {
      refConfirm.current.show(
        {
          title: "",
          content: `Xác nhận xóa phiếu ${thongTinPhieu?.soPhieu}?`,
          cancelText: "Huỷ",
          okText: "Đồng ý",
          showBtnOk: true,
        },
        () => {
          xoaPhieu({ id: thongTinPhieu.id }).then((s) => {
            history.push("/kho/nhap-kho");
          });
        },
        () => {}
      );
    }
  };
  const onPrint = () => {
    inPhieuNhapXuat({ id });
  };

  const onCreate = () => {
    if (thongTinPhieu?.khoId)
      window.location.href = `/kho/nhap-kho/phieu-nhap-nha-cung-cap/them-moi?khoId=${thongTinPhieu.khoId}`;
  };
  const onExportFile = () => {
    xuatPhieuNhapXuat({ id }).then((s) => {
      if (s?.dinhDang === 20) {
        fileUtils.downloadFile(s?.file?.pdf);
      } else {
        fileUtils.downloadFile(s?.file?.doc);
      }
    });
  };
  const TRANG_THAI_PHIEU_MOI = [
    TRANG_THAI_PHIEU_NHAP_XUAT.TAO_MOI,
    TRANG_THAI_PHIEU_NHAP_XUAT.TAO_MOI_DA_GIU_CHO,
  ];

  const listBtn = useMemo(() => {
    switch (thongTinPhieu.trangThai) {
      case TRANG_THAI_PHIEU_NHAP_XUAT.HOAN_THANH:
        return ["huyDuyet"];
      case TRANG_THAI_PHIEU_NHAP_XUAT.CHO_DUYET:
        return ["duyet", "tuChoiDuyet"];
      default:
        return [];
    }
  }, [thongTinPhieu.trangThai]);

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Nhập kho", link: "/kho/nhap-kho" },
        {
          title: "Chi tiết phiếu nhập",
          link: `kho/phieu-nhap-nha-cung-cap/chi-tiet/${id}`,
        },
      ]}
      title={
        <div className="header">
          Chi tiết phiếu nhập
          <div className="header-action">
            <div className="action-btn" onClick={onExportFile}>
              <Tooltip title="Xuất File">
                <img src={IcXuatFile} alt="..." />
              </Tooltip>
            </div>
            {TRANG_THAI_PHIEU_MOI.includes(thongTinPhieu?.trangThai) && (
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
              </div>
            )}
            <div className="action-btn" onClick={onPrint}>
              <Tooltip title="In phiếu nhập kho">
                <IcPrint />
              </Tooltip>
            </div>
            {checkRole([ROLES["KHO"].THEM_MOI_PHIEU_NHAP_KHO]) && (
              <div className="action-btn" onClick={onCreate}>
                <IcCreate />
              </div>
            )}
          </div>
        </div>
      }
      titleRight={<TrangThai times={times} />}
      actionLeft={
        thongTinPhieu.loaiNhapXuat === 70 && (
          <Action listBtn={listBtn} showBack={true}></Action>
        )
      }
    >
      {thongTinPhieu.loaiNhapXuat ? (
        thongTinPhieu.loaiNhapXuat === 70 ? (
          <div className="wrap-content">
            <Card>
              <ThongTinPhieu {...props} id={id} />
            </Card>
            <Card className="tab-content" noPadding={true}>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Danh sách hàng hóa trả" key="1">
                  <DanhSachHangHoa1 {...props} isEdit={false} />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab="Danh sách người bệnh trong phiếu trả"
                  key="2"
                >
                  <DanhSachNguoiBenh {...props} isEdit={false} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </div>
        ) : (
          <Card className="page-wrapper">
            <Row className="page-body1">
              <Col span={17} className="col-left">
                <SearchHangHoa ref={refSearchHangHoa} />

                <div className="thong-tin-hang-hoa">
                  <DanhSachHangHoa
                    dataSortColumn={dataSortColumn}
                    onClickSort={onClickSort}
                    dataSource={dsNhapXuatChiTiet}
                  ></DanhSachHangHoa>
                  <div className="">
                    {id && id != "them-moi" && totalElements ? (
                      <Pagination
                        onChange={onChangePage}
                        current={page + 1}
                        pageSize={size}
                        total={totalElements}
                        onShowSizeChange={onChangeSize}
                        style={{ flex: 1, justifyContent: "flex-end" }}
                      />
                    ) : null}
                    <ThongTinTongHop />
                  </div>
                </div>
              </Col>
              <Col span={7} className="col-right">
                <ThongTinPhieuNhap />
              </Col>
            </Row>
          </Card>
        )
      ) : (
        <></>
      )}
    </MainPage>
  );
};

export default ChiTietPhieuNhap;
