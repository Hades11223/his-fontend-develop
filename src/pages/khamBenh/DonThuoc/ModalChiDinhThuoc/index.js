import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import { Button, Select, ModalTemplate, InputTimeout } from "components";
import TableDonThuoc from "../../components/TableDonThuoc";
import TableThuocKeNgoai from "../../components/TableThuocKeNgoai";
import {
  TRANG_THAI_DICH_VU,
  LOAI_DICH_VU,
  DOI_TUONG,
  LIST_LOAI_DON_THUOC,
  LOAI_DON_THUOC,
} from "constants/index";
import { message, Radio, Popover } from "antd";
import ModalThongTinThuoc from "../components/ModalThongTinThuoc";
import IcSetting from "assets/svg/ic-setting.svg";
import cacheUtils from "utils/cache-utils";
import { useStore } from "hook";
import { refConfirm } from "app";

export const ModalChiDinhThuoc = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refIsSubmit = useRef(null);
  const refModalThongTinThuoc = useRef(null);
  const refModal = useRef(null);
  const refInput = useRef(null);

  const [state, _setState] = useState({
    show: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    loadingChiDinh: false,
    thanhTien: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { dataNb } = useSelector((state) => state.chiDinhDichVuKho);
  const { nhanVienId } = useSelector((state) => state.auth.auth);
  const infoNb = useStore("khamBenh.infoNb", {});
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const listAllLieuDung = useSelector(
    (state) => state.lieuDung.listAllLieuDung
  );

  const { nbDotDieuTriId, id: chiDinhTuDichVuId } = thongTinChiTiet;
  const khoaChiDinhId = thongTinChiTiet.nbDichVu?.khoaChiDinhId;

  const { nbDvKyThuat } = thongTinChiTiet || {};
  const { trangThai: trangThaiKham } = nbDvKyThuat || {};
  const {
    chiDinhDichVuKho: {
      searchDv,
      updateData,
      tamTinhTien,
      getListDichVuTonKho,
      getListDichVuThuoc,
      chiDinhDichVuThuocKeNgoai,
      getListDichVuThuocKeNgoai,
      chiDinhDichVuKho,
    },
    boChiDinh: { getBoChiDinh },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await cacheUtils.read(
        "",
        "DATA_THEO_SO_LUONG_TON_KHO_THUOC",
        null,
        false
      );
      if (data) {
        setState({ theoSoLuongTonKho: data?.theoSoLuongTonKho });
      } else {
        setState({ theoSoLuongTonKho: 15 });
      }
    }
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    show: (option = {}) => {
      setState({
        show: true,
        loaiDonThuoc: option.loaiDonThuoc,
        khoId: option.khoId,
        dataSource: option.dataSource || {},
        dataKho: option.dataKho || [],
        disableChiDinh: option.disableChiDinh,
        keyword: "",
      });
      refIsSubmit.current = false;
      onSelectLoaiDonThuoc(option.khoId)(option.loaiDonThuoc);
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
      });
    },
  }));

  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      refModal.current.hide({});
    } else {
      refModal.current.show({});
    }
  }, [state.show]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    // if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId.length > 0) {
      searchDv({});
    } else {
      updateData({
        listDvKho: [],
      });
    }
  }, [state.disableChiDinh, dataNb]);

  const { thanhTien, loaiDonThuoc } = state;

  const onTamTinhTien = (listSelected) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId,
      nbDichVu: {
        dichVuId: state.loaiDonThuoc == 150 ? item?.id : item?.dichVuId,
        soLuong: item.soLuong,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
          hamLuong: item?.hamLuong,
          tenHoatChat: item?.tenHoatChat,
        },
        khoaChiDinhId: khoaChiDinhId,
      },
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );

      setState({
        show: true,
        thanhTien: thanhTien,
        listSelectedDv: listSelected,
      });
    });
  };

  const onSelectedNoPayment = (data) => {
    setState({
      show: true,
      thanhTien: thanhTien,
      listSelectedDv: data,
    });
  };

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      loaiDichVu: LOAI_DICH_VU.THUOC,
      notCallBoChiDinh: true,
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    if (state.loaiDonThuoc == 150) {
      // kê thuốc ngoài
      delete obj.loaiDichVu;
    } else if (loaiDonThuoc == 20 || loaiDonThuoc == 30) {
      delete obj.loaiDichVu;
      delete obj.notCallBoChiDinh;
      getListDichVuTonKho({
        ...obj,
        khoId: state.khoId,
        page: "0",
        size: "10",
        dataSortColumn: { ten: 1 },
      });
    } else {
      searchDv(obj);
    }
  };

  const onSelectLoaiDonThuoc = (khoId) => (value) => {
    setState({
      loaiDonThuoc: value,
      khoId: khoId,
      listSelectedDv: [],
    });
    if (value === 150) {
      // thuốc kê ngoài
      getBoChiDinh({ thuocChiDinhNgoai: true, bacSiChiDinhId: nhanVienId });
    } else {
      getBoChiDinh({
        dsLoaiDichVu: LOAI_DICH_VU.THUOC,
        bacSiChiDinhId: nhanVienId,
      });
    }
  };

  const onSelectKho = (value) => {
    setState({
      khoId: value,
    });
  };

  const checkChoPhepKeThuocKho = useMemo(() => {
    if (TRANG_THAI_DICH_VU.DA_KET_LUAN === trangThaiKham && loaiDonThuoc === 20)
      return false;
    return true;
  }, [loaiDonThuoc, trangThaiKham]);

  const onSubmit = () => {
    if (refIsSubmit.current) return;
    if (!checkChoPhepKeThuocKho) {
      message.error(t("khamBenh.donThuoc.huyKetLuanDeChiDinhThemThuoc"));
      return;
    }
    const { listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
      return;
    }
    let checkSoLuong = listSelectedDv.some(
      (item) => !item.soLuong || item.soLuong == 0
    );
    if (checkSoLuong) {
      message.error(t("khamBenh.donThuoc.truongBatBuocDienSoLuong"));
      return;
    }
    setState({
      loadingChiDinh: true,
    });

    const payload = listSelectedDv.map((item) => {
      switch (state.loaiDonThuoc) {
        case 150:
          return {
            nbDotDieuTriId,
            thuocChiDinhNgoaiId: item?.id,
            soLuong: item.soLuong,
            ghiChu: item?.ghiChu,
            lieuDungId: item.lieuDungId,
            chiDinhTuDichVuId: chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM, //loại dịch vụ kham
          };
        default:
          return {
            nbDotDieuTriId,
            lieuDungId: item.lieuDungId,
            nbDichVu: {
              dichVuId: state.loaiDonThuoc == 150 ? item?.id : item?.dichVuId,
              soLuong: item.soLuong,
              chiDinhTuDichVuId: chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
              khoaChiDinhId: khoaChiDinhId,
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
      }
    });
    refIsSubmit.current = true;

    const isKsk = infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;
    if (state.loaiDonThuoc === 150) {
      // thuốc kê ngoài
      chiDinhDichVuThuocKeNgoai(payload)
        .then((s) => {
          if (s?.code === 0) {
            getListDichVuThuocKeNgoai({
              nbDotDieuTriId,
              chiDinhTuDichVuId: isKsk ? null : thongTinChiTiet.id,
              chiDinhTuLoaiDichVu: isKsk ? null : LOAI_DICH_VU.KHAM,
            });
            onClosePopup();
            setState({
              activeKey: [150],
              show: false,
              listSelectedDv: [],
            });
          }
          let newTable = s?.neededUpdateRecord.filter((x) => {
            return x.code === 8501;
          });
          if (newTable.length > 0)
            refModalThongTinThuoc.current &&
              refModalThongTinThuoc.current.show({
                newTable,
                chiDinhTuDichVuId: thongTinChiTiet.id,
                nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
                loaiDonThuoc,
              });
        })
        .catch(() => {
          setState({
            loadingChiDinh: false,
          });
          refIsSubmit.current = false;
        });
    } else {
      chiDinhDichVuKho(payload)
        .then((s) => {
          onShowMessageTuongTacThuoc(s);
          getListDichVuThuoc({
            nbDotDieuTriId,
            chiDinhTuDichVuId: isKsk ? null : thongTinChiTiet.id,
            chiDinhTuLoaiDichVu: isKsk ? null : LOAI_DICH_VU.KHAM,
            dsTrangThaiHoan: [0, 10, 20],
          }).then((res) => {
            onClosePopup();
            let list = res?.data?.map((item) => item.loaiDonThuoc);
            setState({
              activeKey: list,
              show: false,
              listSelectedDv: [],
            });
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
                  loaiDonThuoc,
                },
                (options) => {
                  setState({ activeKey: options.activeKey, show: false });
                }
              );
        })
        .catch(() => {
          refIsSubmit.current = false;
          setState({
            loadingChiDinh: false,
          });
        });
    }
  };

  const onShowMessageTuongTacThuoc = (data) => {
    let tuongTacThuoc = (data?.filter((x) => x.tuongTacThuoc) || []).map(
      (x1) => x1.tuongTacThuoc
    );
    tuongTacThuoc?.length && message.error(tuongTacThuoc.join(", "));

    let content = data?.filter((x) => x.code === 8504 && x.message) || [];
    content?.length &&
      refConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: content[0].message,
          cancelText: t("common.dong"),
          classNameOkText: "button-error",
          showImg: true,
          typeModal: "warning",
        },
        () => {}
      );
  };
  const onClosePopup = () => {
    setState({
      show: false,
      thanhTien: 0,
      loadingChiDinh: false,
      listSelectedDv: [],
    });
  };
  const dsKho = useMemo(() => {
    return TRANG_THAI_DICH_VU.DA_KET_LUAN === trangThaiKham &&
      loaiDonThuoc === 20
      ? []
      : state.dataKho;
  }, [state.dataKho, loaiDonThuoc]);
  const isShowSelectKho = useMemo(() => {
    return loaiDonThuoc === 20;
  }, [loaiDonThuoc]);
  const disabled =
    state.loaiDonThuoc === undefined ||
    state.loaiDonThuoc == 10 ||
    state.loaiDonThuoc == 150 ||
    state.loaiDonThuoc === "";

  const onChangeRadio = (e) => {
    setState({ theoSoLuongTonKho: e.target.value });
    cacheUtils.save(
      "",
      "DATA_THEO_SO_LUONG_TON_KHO_THUOC",
      { theoSoLuongTonKho: e.target.value },
      false
    );
  };

  const popovercontent = (
    <div style={{ display: "grid" }}>
      {t("common.caiDatTimKiemHangHoa")}:
      <Radio.Group
        defaultValue={state?.theoSoLuongTonKho}
        style={{ display: "grid" }}
        onChange={onChangeRadio}
      >
        <Radio value={15}>{t("common.hangHoaConTon")}</Radio>
        <Radio value={""}>{t("common.tatCaHangHoa")}</Radio>
      </Radio.Group>
    </div>
  );
  const onChange = (value) => {
    setState({ keyword: value });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={1447}
      layerId={refLayerHotKey.current}
      title={t("khamBenh.donThuoc.chiDinhThuoc")}
      onCancel={() => {
        setState({
          show: false,
        });
        return true;
      }}
      actionRight={
        <>
          <Button minWidth={100} type="default" onClick={onClosePopup}>
            {t("common.huy")}
          </Button>
          <Button minWidth={100} type="primary" onClick={onSubmit}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        <div className="filter-box">
          <Select
            className="filter-item"
            value={state.loaiDonThuoc}
            data={LIST_LOAI_DON_THUOC.filter((item) => [
              LOAI_DON_THUOC.NHA_THUOC,
              LOAI_DON_THUOC.THUOC_KHO,
              LOAI_DON_THUOC.KE_NGOAI,
            ])}
            onChange={onSelectLoaiDonThuoc()}
            placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
          />
          {isShowSelectKho && (
            <Select
              className="filter-item"
              data={dsKho} // đã kết luận , phải hủy mới có list
              style={{ width: "210px", marginRight: "15px" }}
              onClick={() => {
                if (
                  TRANG_THAI_DICH_VU.DA_KET_LUAN === trangThaiKham &&
                  loaiDonThuoc === 20
                ) {
                  setState({
                    isShowTextError: true,
                  });
                }
              }}
              placeholder={t("khamBenh.donThuoc.vuiLongChonKho")}
              onChange={onSelectKho}
              value={state.khoId}
              disabled={disabled}
            />
          )}
          <InputTimeout
            className="filter-item"
            ref={refInput}
            placeholder={t("khamBenh.donThuoc.nhapTenThuocHoacBoChiDinh")}
            value={state.keyword}
            onChange={onChange}
          />
          <div className="setting">
            <Popover
              trigger={"click"}
              content={popovercontent}
              placement="bottom"
            >
              <IcSetting className="icon" />
            </Popover>
          </div>
        </div>

        {state.loaiDonThuoc === LOAI_DON_THUOC.KE_NGOAI ? (
          <TableThuocKeNgoai
            onSelectedNoPayment={onSelectedNoPayment}
            thanhTien={thanhTien}
            boChiDinhSelected={state.boChiDinhSelected}
            onSelectedBoChiDinh={onSelectedBoChiDinh}
            loaiDonThuoc={state.loaiDonThuoc}
            visible={state.show}
            keyword={state.keyword}
          />
        ) : (
          <TableDonThuoc
            thanhTien={thanhTien}
            onSelected={onTamTinhTien}
            boChiDinhSelected={state.boChiDinhSelected}
            listAllLieuDung={listAllLieuDung || []}
            khoId={state.khoId}
            loaiDonThuoc={state.loaiDonThuoc}
            loaiDichVu={LOAI_DICH_VU.THUOC}
            visible={state.show}
            layerId={refLayerHotKey.current}
            theoSoLuongTonKho={state?.theoSoLuongTonKho}
            keyword={state.keyword}
            nbDotDieuTriId={thongTinChiTiet?.nbDotDieuTriId}
          />
        )}
      </Main>
      <ModalThongTinThuoc
        ref={refModalThongTinThuoc}
        thongTinNguoiBenh={infoNb}
      ></ModalThongTinThuoc>
    </ModalTemplate>
  );
});

export default ModalChiDinhThuoc;
