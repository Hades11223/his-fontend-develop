import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, message, Row } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Button, Card, ModalTemplate, Select, Tabs } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import { useTranslation } from "react-i18next";
import { useEnum, useListAll, useStore } from "hook";
import { ENUM, FORMAT_DATE } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import moment from "moment";
import ThongTinDichVuKyThuat from "../LichSuKham/ThongTinDichVuKyThuat";
import ThongTinDichVuThuoc from "../LichSuKham/ThongTinDichVuThuoc";
import { LOAI_DICH_VU } from "constants/index";
import ModalBoSungThongTinDichVu from "pages/khamBenh/ChiDinhDichVu/ModalBoSungThongTinDichVu";
import ModalThongTinThuoc from "pages/khamBenh/DonThuoc/components/ModalThongTinThuoc";
import { groupBy } from "lodash";

const ModalSaoChepDichVu = (props, ref) => {
  const { t } = useTranslation();
  const refModalBoSungThongTinDichVu = useRef(null);
  const refModalThongTinThuoc = useRef(null);
  const refModal = useRef(null);

  const {
    chiDinhKhamBenh: { chiDinhDichVu },
    dsThuoc: { onChangeInputSearch },
    dsDichVuKyThuat: { onSearch },
    chiDinhDichVuKho: { chiDinhDichVuKho, getListDichVuThuoc },
    phongThucHien: { getListPhongTheoDichVu },
  } = useDispatch();

  const [listHuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const [state, _setState] = useState({ show: false });
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const listDichVuKyThuat = useStore("dsDichVuKyThuat.listDichVuKyThuat", []);
  const listDsThuoc = useStore("dsThuoc.listDsThuoc", []);
  const infoNb = useStore("khamBenh.infoNb", {});
  const [listAllMucDichSuDung] = useListAll("mucDichSuDung");
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, data });
    },
    hide: () => {
      setState({ show: false });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  useEffect(() => {
    if (state?.show && state?.data?.nbDotDieuTriId)
      onSearch({
        dataSearch: {
          nbDotDieuTriId: state?.data?.nbDotDieuTriId,
          chiDinhTuDichVuId: state?.data?.id,
          chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
        },
      });
    onChangeInputSearch({
      nbDotDieuTriId: state?.data?.nbDotDieuTriId,
      chiDinhTuDichVuId: state?.data?.id,
      chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
    });
  }, [state?.data, state?.show]);

  useEffect(() => {
    setState({
      dataThuoc: listDsThuoc,
      selectedRowKeysThuoc: listDsThuoc.map((item) => item?.id),
      isCheckedAllThuoc: true,
    });
  }, [listDsThuoc, state?.show]);

  useEffect(() => {
    setState({
      dataDvkt: listDichVuKyThuat,
      selectedRowKeysDvkt: listDichVuKyThuat.map((item) => item?.id),
      isCheckedAllDvkt: true,
    });
  }, [listDichVuKyThuat, state?.show]);

  const onCancel = () => {
    setState({ show: false });
  };

  const onKeThuoc = (payload) => {
    chiDinhDichVuKho(payload).then((s) => {
      getListDichVuThuoc({
        nbDotDieuTriId: state?.data?.nbDotDieuTriId,
        chiDinhTuDichVuId: thongTinChiTiet.id,
        chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
        dsTrangThaiHoan: [0, 10, 20],
      });
      const newTable = (s || [])
        .map((item) => ({
          ...item,
          dsMucDich: payload.find(
            (x) => x?.nbDichVu?.dichVuId === item?.nbDichVu?.dichVuId
          )?.dsMucDich,
        }))
        .filter((item1) => {
          item1.message && message.error(item1.message);
          return [7624, 8501].includes(item1.code);
        });

      if (newTable.length > 0)
        refModalThongTinThuoc.current &&
          refModalThongTinThuoc.current.show(
            {
              newTable,
              nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
              chiDinhTuDichVuId: thongTinChiTiet.id,
            },
            (options) => {
              setState({ activeKey: options.activeKey, show: false });
            }
          );
    });
  };

  const onKeDvkt = (dataTamTinhTien) => {
    chiDinhDichVu({ dataTamTinhTien }).then((s) => {
      let dsDichVuCanBoSung = s?.dsDichVuCanBoSung;
      let listPhong = [];
      async function fetchData() {
        try {
          listPhong = await getListPhongTheoDichVu({
            page: "",
            size: "",
            dsDichVuId: s?.dsDichVuCanBoSung.map(
              (item) => item?.nbDichVu?.dichVuId
            ),
            khoaChiDinhId: infoNb?.khoaChiDinhId,
          });
        } catch (error) {
          listPhong = [];
        }
        const phongByDichVuId = groupBy(listPhong, "dichVuId");
        (dsDichVuCanBoSung || []).forEach((dichVu) => {
          let dsMucDich = listAllMucDichSuDung.filter(
            (x) => x.dichVuId === dichVu?.nbDichVu?.dichVuId
          );
          dichVu.dsPhongThucHien = phongByDichVuId[dichVu?.nbDichVu?.dichVuId];
          dichVu.dsMucDich = dsMucDich;
        });
        onShowDichVuBoSung(dsDichVuCanBoSung);
      }
      fetchData();
    });
  };

  const onShowDichVuBoSung = (dsDichVuCanBoSung) => {
    refModalBoSungThongTinDichVu.current &&
      dsDichVuCanBoSung?.length &&
      refModalBoSungThongTinDichVu.current.show({
        dataSource: dsDichVuCanBoSung,
        isPhauThuat: false,
      });
  };

  const onSubmit = () => {
    let dataTamTinhTien = state?.dataDvkt.map((item) => {
      return {
        nbDotDieuTriId: state?.data?.nbDotDieuTriId,
        nbDichVu: {
          dichVuId: item.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: thongTinChiTiet.id,
          chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
          khoaChiDinhId: item?.khoaChiDinhId,
          loaiDichVu: item.loaiDichVu,
          thanhTien: item.thanhTien,
          nbGoiDvId: item.nbGoiDvId || undefined,
          nbGoiDvChiTietId: item.nbGoiDvChiTietId || undefined,
          loaiHinhThanhToanId: item?.loaiHinhThanhToanId,
          tyLeTtDv: item?.tyLeTtDv,
          mucDichId: item?.mucDichId,
        },
        nbDvKyThuat: {
          phongId: item.phongThucHienId,
          tuVanVienId: item.tuVanVienId,
        },
      };
    });

    const payload = state?.dataThuoc.map((item) => {
      return {
        nbDotDieuTriId: state?.data?.nbDotDieuTriId,
        lieuDungId: item.lieuDungId,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: thongTinChiTiet.id,
          chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
          khoaChiDinhId: item?.khoaChiDinhId,
          loaiDichVu: item?.loaiDichVu,
          dichVu: {
            id: item?.id,
            ma: item?.ma,
            ten: item?.ten,
            hamLuong: item?.hamLuong,
            tenHoatChat: item?.tenHoatChat,
          },
          tuTra: item?.tuTra,
          khongTinhTien: item?.khongTinhTien,
          ghiChu: item?.ghiChu,
        },
        nbDvKho: {
          khoId: state.khoId,
        },
        dsMucDich: item?.dsMucDich,
      };
    });
    onKeDvkt(dataTamTinhTien);
    payload.length && onKeThuoc(payload);
    onCancel();
  };
  const onListDataThuoc = (data = []) => {
    setState({
      dataThuoc: listDsThuoc.filter((x) => data.includes(x.id)),
      selectedRowKeysThuoc: data,
      isCheckedAllThuoc: listDsThuoc.length === data.length ? true : false,
    });
  };

  const onListDataDvkt = (data) => {
    setState({
      dataDvkt: listDichVuKyThuat.filter((x) => data.includes(x.id)),
      selectedRowKeysDvkt: data,
      isCheckedAllDvkt: listDichVuKyThuat.length === data.length ? true : false,
    });
  };
  return (
    <ModalTemplate
      width={1595}
      ref={refModal}
      title={t("khamBenh.thongTinSaoChep")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("khamBenh.saoChep")}
        </Button>
      }
    >
      <Main>
        <div className="info-service">
          <h1>{t("khamBenh.tongTinLuotKham")}</h1>
          <Row>
            <Col className="info" span={12}>
              <div className="title">{t("khamBenh.ngayKetLuanKham")}:</div>
              <div className="detail">
                {state?.data?.thoiGianKetLuan &&
                  moment(state?.data.thoiGianKetLuan).format(FORMAT_DATE)}
              </div>
            </Col>
            <Col className="info" span={12}>
              <div className="title">
                {t("khamBenh.chanDoanBenhVaKhamBenh")}:
              </div>
              <div className="detail">
                {[
                  ...(state?.data?.dsCdChinh || []),
                  ...(state?.data?.dsCdKemTheo || []),
                ]
                  .map((item) => item.ma + " - " + item.ten)
                  .join(", ")}
              </div>
            </Col>
            <Col className="info" span={12}>
              <div className="title">{t("khamBenh.bsKetLuanKham")}:</div>
              <div className="detail">{state?.data?.tenBacSiKetLuan}</div>
            </Col>
            <Col className="info" span={12}>
              <div className="title">{t("khamBenh.huongDieuTri")}:</div>
              <div className="detail">
                {
                  listHuongDieuTriKham.find(
                    (x) => x.id === state?.data?.huongDieuTri
                  )?.ten
                }
              </div>
            </Col>
            <Col className="info" span={12}>
              <div className="title">{t("khamBenh.ketQua.ketQua")}:</div>
              <div className="detail">
                {
                  listKetQuaDieuTri.find(
                    (x) => x.id === state?.data?.ketQuaDieuTri
                  )?.ten
                }
              </div>
            </Col>
          </Row>
        </div>
        <h1>{t("khamBenh.thongTinDichVuSaoChep")}</h1>
        <Select className="type"></Select>
        <Card noPadding={true} className="tab-content">
          <Tabs defaultActiveKey={"1"}>
            <Tabs.TabPane tab={t("khamBenh.donThuoc.thongTinThuoc")} key="1">
              <ThongTinDichVuThuoc
                nbDotDieuTriId={state?.data?.nbDotDieuTriId}
                id={state?.data?.id}
                onListData={onListDataThuoc}
                selectedRowKeys={state?.selectedRowKeysThuoc}
                isCheckedAll={state?.isCheckedAllThuoc}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("khamBenh.dichVuKyThuat")} key="2">
              <ThongTinDichVuKyThuat
                nbDotDieuTriId={state?.data?.nbDotDieuTriId}
                id={state?.data?.id}
                onListData={onListDataDvkt}
                selectedRowKeys={state?.selectedRowKeysDvkt}
                isCheckedAll={state?.isCheckedAllDvkt}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Main>
      <ModalBoSungThongTinDichVu ref={refModalBoSungThongTinDichVu} />
      <ModalThongTinThuoc
        ref={refModalThongTinThuoc}
        thongTinNguoiBenh={infoNb}
      ></ModalThongTinThuoc>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSaoChepDichVu);
