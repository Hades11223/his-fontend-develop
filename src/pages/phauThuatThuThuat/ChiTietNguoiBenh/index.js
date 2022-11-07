import React, { useMemo, useRef } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Dropdown,
  Menu,
  message,
  Row,
  Tooltip,
  Popover,
  Radio,
  Space,
} from "antd";
import IcArrowLeft from "assets/svg/pttt/ic-arrow-left.svg";
import IcSave from "assets/svg/pttt/ic-save.svg";
import IcThongTin from "assets/svg/pttt/thong-tin-nguoi-thuc-hien.svg";
import IcThongTinPTTT from "assets/svg/pttt/thong-tin-pttt.svg";
import IcChiDinhDichVu from "assets/svg/pttt/ic-chi-dinh-dich-vu.svg";
import IcThuoc from "assets/svg/pttt/ic-thuoc.svg";
import IcVatTu from "assets/svg/pttt/ic-vat-tu.svg";
import IcPhongGiuong from "assets/svg/pttt/ic-phong-giuong.svg";
import { Button, Card, Tabs } from "components";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Main, MainPage } from "./styled";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import ThongTinNguoiThucHien from "./ThongTinNguoiThucHien";
import ThongTinPTTT from "./ThongTinPTTT";
import ChiDinhDichVuKyThuat from "./ChiDinhDichVuKyThuat";
import ChiDinhThuoc from "./ChiDinhThuoc";
import ChiDinhVatTu from "./ChiDinhVatTu";
import ThongTinPhongGiuong from "./ThongTinPhongGiuong";
import HeaderPTTT from "./components/HeaderPTTT";
import moment from "moment";
import Icon from "@ant-design/icons";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import ChiDinhNgoaiDieuTri from "./ChiDinhNgoaiDieuTri";
import IcDvNgoaiDieuTri from "assets/svg/noiTru/ic-dv-ngoai-dieu-tri.svg";
import useThongTinNb from "./hook/useThongTinNb";
import { useLoading } from "hook";
import IcPrint from "assets/svg/ic-print.svg";
import { printJS } from "data-access/print-provider";
import SettingIc from "assets/images/utils/setting.png";
import cacheUtils from "utils/cache-utils";
import { flatten } from "lodash";
import nbDvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import ModalInChiDinhTheoDV from "./components/ModalInChiDinhTheoDV";
import ChiDinhHoaChat from "./ChiDinhHoaChat";
import IcHoaChat from "assets/svg/pttt/ic-hoa-chat.svg";
import { transformObjToQueryString } from "hook/useQueryString/queryString";

const ChiTietNguoiBenh = ({ history }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { state: locationState } = useLocation();
  const refModalInChiDinhTheoDV = useRef(null);
  const {
    pttt: {
      onSearch,
      getById,
      saveThongTinPTTT,
      saveNguoiThucHien,
      getTatCaGiayChiDinh,
    },
    khoa: { getKhoaTheoTaiKhoan },
    phuongPhapGayMe: { getListAllPhuongPhapGayMe },
    nhanVien: { getListAllPhauThuatVien },
    thietLap: { getThietLap },
    phieuIn: {
      getListPhieu,
      getFilePhieuIn,
      showFileEditor,
      getDataDanhSachPhieu,
    },
    thietLapChonKho: { getListThietLapChonKhoTheoTaiKhoan },
  } = useDispatch();

  const { showLoading, hideLoading } = useLoading();

  const { listDsPttt, listFilter, dataDetail, disabledSave, disabledSave2 } =
    useSelector((state) => state.pttt);
  const [thongTinBenhNhan] = useThongTinNb();

  const [state, _setState] = useState({
    activeKey: "0",
    collapse: true,
    valuePhieuChiDinh: 1,
    popoverVisible: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listTabs = [
    {
      name: t("pttt.thongTinPTTT"),
      component: <ThongTinPTTT />,
      iconTab: <IcThongTinPTTT />,
      isShow: true,
    },
    {
      name: t("pttt.thongTinNguoiThucHien"),
      component: <ThongTinNguoiThucHien />,
      iconTab: <IcThongTin />,
      isShow: true,
    },
    {
      name: t("common.chiDinhDichVu"),
      component: <ChiDinhDichVuKyThuat />,
      iconTab: <IcChiDinhDichVu />,
      isShow: true,
    },
    {
      name: t("common.chiDinhThuoc"),
      component: <ChiDinhThuoc />,
      iconTab: <IcThuoc />,
      isShow: true,
    },
    {
      name: t("common.chiDinhVatTu"),
      component: <ChiDinhVatTu />,
      iconTab: <IcVatTu />,
      isShow: true,
    },
    {
      name: t("common.chiDinhHoaChat"),
      component: <ChiDinhHoaChat />,
      iconTab: <IcHoaChat />,
      isShow: true,
    },
    {
      name: t("common.chiDinhNgoaiDieuTri"),
      component: <ChiDinhNgoaiDieuTri />,
      iconTab: <IcDvNgoaiDieuTri />,
      isShow: true,
    },
    {
      name: t("common.thongTinPhongGiuong"),
      component: <ThongTinPhongGiuong />,
      iconTab: <IcPhongGiuong />,
      isShow: true,
    },
  ];

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getKhoaTheoTaiKhoan({ ...param });
    getListAllPhuongPhapGayMe({ ...param });
    getListAllPhauThuatVien({ dsMaThietLapVanBang: "BAC_SI", ...param });

    cacheUtils
      .read("", "PTTT_OPTION_IN_PHIEU_CHI_DINH", 1)
      .then((valuePhieuChiDinh) => {
        setState({ valuePhieuChiDinh });
      });
  }, []);

  useEffect(() => {
    if (id) {
      getById(id).then((data) => {
        onSearch({
          size: 500,
          param: { nbDotDieuTriId: data?.nbDotDieuTriId },
        });
      });
    }
  }, [id]);

  const onChange = (tab) => {
    setState({ activeKey: tab });
    if (tab === "3" || tab === "4" || tab === "5") {
      let loaiDichVu = 90;
      if (tab === "4") {
        loaiDichVu = 100;
      }
      if (tab === "5") {
        loaiDichVu = 110;
      }
      let payload = {
        khoaNbId: thongTinBenhNhan?.khoaNbId,
        khoaChiDinhId: dataDetail?.khoaThucHienId,
        doiTuong: thongTinBenhNhan?.doiTuong,
        loaiDoiTuongId: thongTinBenhNhan?.loaiDoiTuongId,
        capCuu: thongTinBenhNhan?.capCuu,
        phongId: thongTinBenhNhan?.phongId,
        noiTru: true,
        canLamSang: false,
        loaiDichVu: loaiDichVu,
      };
      getListThietLapChonKhoTheoTaiKhoan({ ...payload });
    }
  };

  const onSaveThongTinPTTT = () => {
    if (state.activeKey === "0") {
      saveThongTinPTTT().then((res) => {
        if (res && res.code === 0) {
          getById(id).then((data) => {
            onSearch({
              size: 500,
              param: { nbDotDieuTriId: data?.nbDotDieuTriId },
            });
          });
          message.success(t("common.capNhatThanhCong"));
        }
      });
    } else if (state.activeKey === "1") {
      saveNguoiThucHien().then((res) => {
        if (res && res.code === 0) {
          message.success(t("common.capNhatThanhCong"));
        }
      });
    }
    // refModalHuySuDungGoi.current &&
    //   refModalHuySuDungGoi.current.show({ type: 1 });
  };

  const isDisableSave = () => {
    const disable = [155].some((i) => i === dataDetail?.trangThai);
    if (state.activeKey === "0")
      return disabledSave || disable || dataDetail?.trangThaiHoan === 40;
    if (state.activeKey === "1")
      return disabledSave2 || disable || dataDetail?.trangThaiHoan === 40;
    return disable;
  };

  const onFilterDate = (date) => {
    if (date) {
      onSearch({
        size: 500,
        param: {
          nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
          tuThoiGianThucHien: date[0].format("YYYY-MM-DD HH:mm:ss"),
          denThoiGianThucHien: date[1].format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    } else {
      onSearch({
        size: 500,
        param: { nbDotDieuTriId: dataDetail?.nbDotDieuTriId },
      });
    }
  };

  const onSelectDv = (item) => () => {
    history.push("/phau-thuat-thu-thuat/chi-tiet-phau-thuat/" + item.id);
  };

  useEffect(() => {
    if (dataDetail?.id)
      getListPhieu({
        nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
        maManHinh: "009",
        maViTri: "00901",
        chiDinhTuLoaiDichVu: 40,
        chiDinhTuDichVuId: dataDetail?.id,
      }).then((listPhieu) => {
        setState({ listPhieu: listPhieu });
      });
  }, [dataDetail?.id]);
  const onPrintPhieu = (item) => async () => {
    if (item?.type == "editor") {
      showFileEditor({
        phieu: item,
        nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
        id: id,
      });
    } else {
      try {
        showLoading();
        const { finalFile } = await getFilePhieuIn({
          listPhieus: [item],
          nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 40,
          showError: true,
          id: id,
        });
        printJS({
          printable: finalFile,
          type: "pdf",
        });
      } catch (error) {
      } finally {
        hideLoading();
      }
    }
  };

  const contentPhieuChiDinh = () => {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Radio.Group
          value={state.valuePhieuChiDinh || 2}
          onChange={(e) => {
            setState({
              valuePhieuChiDinh: e.target.value,
              popoverVisible: false,
            });
            cacheUtils.save(
              "",
              "PTTT_OPTION_IN_PHIEU_CHI_DINH",
              e.target.value
            );
          }}
        >
          <Space direction="vertical">
            <Radio value={1}>{t("pttt.tatCaChiDinh")}</Radio>
            <Radio value={2}>{t("pttt.chiDinhChuaIn")}</Radio>
            <Radio value={3}>{t("pttt.inChiDinhTheoDichVu")}</Radio>
          </Space>
        </Radio.Group>
      </div>
    );
  };

  const onPrint = async () => {
    let res = await getTatCaGiayChiDinh({
      nbDotDieuTriId: dataDetail.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail.id,
    });
    const dsFilePdf = res?.reduce((acc, item) => {
      if (Array.isArray(item)) {
        // xử lý phiếu , có những phiếu có mảng con bên trong
        let list = item.map((itemChild) => itemChild.file.pdf);
        acc = [...acc, [...list]];
        return acc;
      }
      acc = [...acc, ...item.filePdf];
      return acc;
    }, []);
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };

  const onPrintPhieuChuaIn = async () => {
    let res = await getTatCaGiayChiDinh({
      nbDotDieuTriId: dataDetail.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail.id,
      inPhieuChiDinh: false,
    });
    if (res?.length === 0) {
      message.error(t("khamBenh.khongConPhieuChiDinhChuaIn"));
      return null;
    }
    const dsFilePdf = res?.reduce((acc, item) => {
      if (Array.isArray(item)) {
        // xử lý phiếu , có những phiếu có mảng con bên trong
        let list = item.map((itemChild) => itemChild.file.pdf);
        acc = [...acc, [...list]];
        return acc;
      }
      acc = [...acc, ...item.filePdf];
      return acc;
    }, []);
    const s = await getDataDanhSachPhieu({
      dsFile: flatten(dsFilePdf),
      mode: 0,
    });
    printJS({
      printable: s,
      type: "pdf",
    });
  };

  const onPrintTheoDichVu = async () => {
    let res = await nbDvKyThuatProvider.getDvPhieuChiDinh({
      nbDotDieuTriId: dataDetail.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail.id,
      chiDinhTuLoaiDichVu: 40,
    });
    refModalInChiDinhTheoDV.current.show(res.data);
  };

  const onPrintPhieuChiDinh = async (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    showLoading();
    switch (state.valuePhieuChiDinh) {
      case 1: {
        // tất cả chỉ định
        await onPrint();
        break;
      }
      case 2: {
        // chỉ định chưa in
        await onPrintPhieuChuaIn();
        break;
      }
      case 3: {
        // in chỉ định theo dịch vụ
        await onPrintTheoDichVu();
        break;
      }
      default:
        // tất cả chỉ định
        await onPrint();
        break;
    }
    hideLoading();
  };

  const menu = useMemo(() => {
    return (
      <Menu
        items={[
          {
            key: -1,
            label: (
              <div style={{ display: "flex" }}>
                <div onClick={onPrintPhieuChiDinh} style={{ flex: 1 }}>
                  {"Phiếu chỉ định"}
                </div>

                <Popover
                  getPopupContainer={(trigger) => trigger.parentNode}
                  overlayClassName={"step-wrapper-in-options left"}
                  placement="leftTop"
                  content={contentPhieuChiDinh()}
                  visible={state.popoverVisible}
                  trigger="click"
                >
                  <img
                    src={SettingIc}
                    alt=""
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setState({ popoverVisible: !state.popoverVisible });
                    }}
                  />
                </Popover>
              </div>
            ),
          },
          ...(state?.listPhieu || []).map((item, index) => ({
            key: index,
            label: (
              <a href={() => false} onClick={onPrintPhieu(item)}>
                {item.ten || item.tenBaoCao}
              </a>
            ),
          })),
        ]}
      />
    );
  }, [state?.listPhieu, id, state.valuePhieuChiDinh, state.popoverVisible]);

  return (
    <MainPage
      breadcrumb={[
        {
          link: "/phau-thuat-thu-thuat",
          title: t("pttt.quanLyPhauThuatThuThuat"),
        },
        {
          link:
            "/phau-thuat-thu-thuat/danh-sach-nguoi-benh" +
            transformObjToQueryString(locationState),
          title: t("pttt.danhSachPhauThuatThuThuat"),
        },
        {
          link: window.location.pathname,
          title: t("pttt.chiTietPhauThuat"),
        },
      ]}
      // title={t("goiDichVu.chiTietNguoiBenhSuDungGoi")}
    >
      <Main>
        <Row className="pb-5">
          <h1>{}</h1>
          <span style={{ flex: 1, textAlign: "right" }}>
            <img src={require("assets/images/utils/location.png")} alt="" />
            <b>
              {thongTinBenhNhan?.maKhoaNb} - {thongTinBenhNhan?.tenKhoaNb}
            </b>
          </span>
        </Row>
        <Row>
          <Col className="header-left" span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <Card className="content">
          <Tabs.Left
            defaultActiveKey={state.activeKey}
            tabPosition={"left"}
            tabWidth={220}
            type="card"
            moreIcon={<CaretDownOutlined />}
            onChange={onChange}
            className={`tab-main ${
              state.collapse ? "collapse-tab" : "show-more"
            }`}
            tabBarExtraContent={
              <div className={`content-tabs-extra`}>
                <div className="title-tabs-extra">
                  <span>{t("pttt.dsPhauThuatThuThuat")}</span>
                  <Tooltip
                    title={t(
                      state.collapse ? "common.moRong" : "common.thuGon"
                    )}
                    overlayStyle={{ whiteSpace: "nowrap" }}
                    overlayInnerStyle={{ width: "fit-content" }}
                    visible={state.off ? false : undefined}
                    onVisibleChange={(e) => {
                      if (e && state.off) {
                        setState({ off: false });
                      }
                    }}
                  >
                    <Icon
                      onClick={() => {
                        setState({ collapse: !state.collapse, off: true });
                      }}
                      className="icon-collapse-ds"
                      component={state.collapse ? extendTable : extendChiTiet}
                    />
                  </Tooltip>
                </div>
                <div className="picker-range-date">
                  <DatePicker.RangePicker
                    placeholder={[t("common.tuNgay"), t("common.denNgay")]}
                    format="DD/MM/YYYY"
                    onChange={onFilterDate}
                  ></DatePicker.RangePicker>
                </div>
                <div className="wrapper-list-extra">
                  {listFilter?.map((item, index) => (
                    <Tooltip
                      key={index}
                      title={item.tenDichVu}
                      placement="right"
                    >
                      <div
                        className={`item-tabs-extra ${
                          item?.id == id ? "active-tabs-extra" : ""
                        }`}
                        onClick={onSelectDv(item)}
                      >
                        <div className="top-child">
                          <span>{item.tenDichVu}</span>
                          <span>{item.tyLeTtDv || 0}%</span>
                        </div>
                        <div>
                          {moment(item.thoiGianThucHien).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            }
          >
            {listTabs.map((obj, i) => {
              return (
                <Tabs.TabPane
                  key={i}
                  tab={
                    <div>
                      {obj?.iconTab}
                      {obj?.name}
                    </div>
                  }
                  disabled={!obj.isShow}
                >
                  <div>
                    <HeaderPTTT title={obj?.name} />
                    <div className="content-tab-custom">{obj?.component}</div>
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs.Left>
        </Card>

        <Row className="action-bottom">
          <div className="button-left"></div>
          <div className="button-right">
            <Button
              type="default"
              leftIcon={<IcArrowLeft />}
              minWidth={100}
              onClick={() => history.goBack()}
            >
              {t("common.quayLai")}
            </Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                type="default"
                rightIcon={<IcPrint className="ic-print" />}
                minWidth={100}
              >
                {t("khamBenh.inGiayTo")}
              </Button>
            </Dropdown>
            <Button
              type="primary"
              rightIcon={<IcSave />}
              minWidth={100}
              onClick={onSaveThongTinPTTT}
              disabled={isDisableSave()}
            >
              {t("common.luu")}
            </Button>
          </div>
        </Row>
      </Main>

      <ModalInChiDinhTheoDV ref={refModalInChiDinhTheoDV} />
    </MainPage>
  );
};

export default memo(ChiTietNguoiBenh);
