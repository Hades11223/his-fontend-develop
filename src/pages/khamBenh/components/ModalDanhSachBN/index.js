import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { Main, SearchDate } from "./styled";
import { Select, InputTimeout, TableWrapper, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { TRANG_THAI_KHAM_BN } from "../../configs";
import { ENUM, TRANG_THAI_DICH_VU } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import DateDropdown from "./DateDropdown";
import Calendar from "assets/images/kho/calendar.png";
import ICClose from "assets/svg/ic-close.svg";
import moment from "moment";
import { createRef } from "react";
import { useTranslation } from "react-i18next";
import ModalTemplate from "../ModalTemplate";
import { useEnum } from "hook";
import { refConfirm } from "app";
import useWindowSize from "hook/useWindowSize";

let refDangKhamError = createRef();
export const ModalDanhSachBN = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refInputNhapSoKham = useRef(null);
  const refShowDate = useRef(null);
  const refMaHoSo = useRef(null);
  const refTenNguoiBenh = useRef(null);
  const refModal = useRef(null);
  const windowSize = useWindowSize();

  const [state, _setState] = useState({
    show: false,
    data: {},
    tuThoiGianVaoVien: moment().format("DD/MM/YYYY"),
    denThoiGianVaoVien: moment().format("DD/MM/YYYY"),
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listdoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listhuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);

  const {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSortColumn,
    phongThucHienId,
  } = useSelector((state) => state.nbKhamBenh);

  const { infoNb, dangKhamError, listPhongKham } = useSelector(
    (state) => state.khamBenh
  );
  const listNhanVien = useSelector((state) => state.nhanVien.listNhanVien);
  const {
    nbKhamBenh: { onSearch, onSizeChange, onSortChange, onChangeInputSearch },
    khamBenh: { kiemTraTrangThaiLoadNguoiBenh, boQuaKham, updateData },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();
  useEffect(() => {
    if (dangKhamError && refDangKhamError.current != dangKhamError) {
      refDangKhamError.current = dangKhamError;
      refConfirm.current &&
        refConfirm.current.show(
          {
            showBtnOk: false,
            title: t("common.thongBao"),
            content: dangKhamError,
            rightCancelButton: true,
            cancelText: t("common.dong"),
          },
          () => {},
          () => {
            updateData({
              dangKhamError: "",
            });
          }
        );
    }
  }, [dangKhamError]);

  useEffect(() => {
    renderData();
  }, [listData]);
  const renderData = () => {
    let data = listData.map((item) => {
      let age =
        item.thangTuoi <= 36
          ? ` - ${item.tuoi2}`
          : ` - ${item.tuoi} ${t("common.tuoi")}`;
      return {
        ...item,
        mucHuongTheBhyt: item.mucHuongBhyt,
        thongTin: `${item.tenNb}${age}${
          item.tenTinhThanhPho ? " - " + item.tenTinhThanhPho : ""
        }`,
      };
    });
    setState({ data });
  };

  useImperativeHandle(ref, () => ({
    show: (option = {}) => {
      const {
        search = false,
        timKiem = "",
        soPhieu = "",
        maHoSo,
        tenNb,
      } = option;
      refModal.current.show({});
      setState({
        // all: false,
        show: true,
        timKiem: timKiem.trim(),
        tenNb: tenNb,
        maHoSo: maHoSo,
        // tuThoiGianVaoVien: moment().format("DD/MM/YYYY"),
        // denThoiGianVaoVien: moment().format("DD/MM/YYYY"),
      });
      if (search) {
        onChangeInputSearch(
          {
            size: size,
            tenNb: tenNb,
            maHoSo: maHoSo,
            soPhieu: soPhieu,
            dsTrangThaiHoan: [0, 10],
          },
          true
        );
      } else {
        // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
        onChangeInputSearch(
          {
            // tuThoiGianVaoVien: moment().format("DD-MM-YYYY 00:00:00"),
            // denThoiGianVaoVien: moment().format("DD-MM-YYYY 23:59:59"),
            tuThoiGianVaoVien: state.tuThoiGianVaoVien
              ? `${state.tuThoiGianVaoVien} 00:00:00`
              : null,
            denThoiGianVaoVien: state.denThoiGianVaoVien
              ? `${state.denThoiGianVaoVien} 23:59:59`
              : null,
            dsTrangThaiHoan: [0, 10],
            tenNb: "",
            maNb: "",
            maHoSo: "",
            soPhieu: "",
          },
          true
        );
      }
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 117, //F6
            onEvent: () => {
              refInputNhapSoKham.current && refInputNhapSoKham.current.focus();
            },
          },
        ],
      });
    },
  }));
  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  useEffect(() => {
    getListNhanVienTongHop();
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    if (state.show) {
      setTimeout(() => {
        refTenNguoiBenh.current.setValue(state.tenNb);
        refMaHoSo.current.setValue(state.maHoSo);
      }, [1000]);
    }
  }, [state.show, state.tenNb, state.maHoSo]);
  const onSetNbTiepTheo = (record, chuyenTrangThai) => {
    return new Promise((resolve, reject) => {
      kiemTraTrangThaiLoadNguoiBenh({
        dichVuId: record.id,
        nbDotDieuTriId: record.nbDotDieuTriId,
        chuyenTrangThai,
      })
        .then((s) => {
          resolve(true);
        })
        .catch((e) => {
          refConfirm.current.show(
            {
              showBtnOk: true,
              title: t("common.thongBao"),
              content: e,
              cancelText: t("common.dong"),
              okText: t("common.xacNhan"),
              typeModal: "warning",
            },
            () => {
              setState({ show: false });
              kiemTraTrangThaiLoadNguoiBenh({
                dichVuId: record.id,
                nbDotDieuTriId: record.nbDotDieuTriId,
                chuyenTrangThai,
                forceUpdate: true,
              })
                .then((s) => {
                  resolve(true);
                })
                .catch((e) => {
                  reject(e);
                });
            },
            () => {
              reject();
            }
          );
        });
    });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        onSetNbTiepTheo(record, false).then((s) => {
          setState({ show: false });
        });
      },
    };
  };
  const onClickSort = (key, value) => {
    onSortChange(
      {
        [key]: value,
      },
      true
    );
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (key == "dsTrangThai") {
      if (value == 20) {
        value = [value, 30, 40];
      } else if (value == 100) {
        value = [value, 110, 120];
      }
      if (value == 50) {
        value = [value, 130];
      }
      onChangeInputSearch(
        {
          [key]: value,
          dsTrangThaiHoan: [0, 10],
        },
        true
      );
    } else if (key == "phongThucHienId") {
      onSearch({
        phongThucHienId: value,
      });
    } else {
      onChangeInputSearch(
        {
          [key]: value,
          dsTrangThaiHoan: [0, 10],
        },
        true
      );
    }
  };

  const onClickBoQua = (record) => () => {
    boQuaKham({
      loadNbTiepTheo: false,
      id: record.id,
      trangThai: record.trangThai,
      isShowMessage: true,
    }).then((s) => {
      record.trangThai = s?.data?.nbDvKyThuat?.trangThai;
      setState({ data: [...state.data] });
    });
  };
  const onClickGoi = (record) => (e) => {
    e.stopPropagation();
    onSetNbTiepTheo(record, true).then((s) => {
      setState({ show: false });
    });
  };
  const renderGoiButton = (record) => {
    const trangThai = record?.trangThai;
    switch (trangThai) {
      case TRANG_THAI_DICH_VU.CHO_KHAM:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
      case TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM:
      case TRANG_THAI_DICH_VU.DA_CHECKIN_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
      case TRANG_THAI_DICH_VU.BO_QUA:
      case TRANG_THAI_DICH_VU.BO_QUA_KET_LUAN:
        //cho phép button Gọi nhấn
        return (
          <div className="btn-action" onClick={onClickGoi(record)}>
            {t("khamBenh.goi")}
          </div>
        );
      case TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU:
      case TRANG_THAI_DICH_VU.DA_KET_LUAN:
      case TRANG_THAI_DICH_VU.DA_DUYET:
        //button gọi không cho phép
        return (
          <div disabled className="btn-action">
            {t("khamBenh.goi")}
          </div>
        );
      default:
        break;
    }
  };
  const renderBoQuaButton = (record) => {
    const trangThai = record?.trangThai;
    switch (trangThai) {
      case TRANG_THAI_DICH_VU.DANG_KHAM:
      case TRANG_THAI_DICH_VU.CHO_KHAM:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
      case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
      case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
        //cho phép button Gọi nhấn
        return (
          <div className="btn-action" onClick={onClickBoQua(record)}>
            {t("common.boQua")}
          </div>
        );
      default:
        break;
    }
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} isTitleCenter={true} />,
      width: "30px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.ngayDangKy")}
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              placeholder={t("khamBenh.dsBenhNhan.nhapNgayDangKy")}
              onChange={onSearchInput("thoiGianVaoVien")}
            />
          }
        />
      ),
      render: (item) => {
        return moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
      width: "80px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.soKham")}
          sort_key="stt2"
          dataSort={dataSortColumn["stt2"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              ref={refInputNhapSoKham}
              placeholder={t("khamBenh.dsBenhNhan.nhapSoKham")}
              onChange={onSearchInput("stt2")}
            />
          }
        />
      ),
      width: "40px",
      dataIndex: "stt2",
      key: "stt2",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("common.maNb")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              placeholder={t("khamBenh.dsBenhNhan.nhapMaNb")}
              onChange={onSearchInput("maNb")}
            />
          }
        />
      ),
      width: "55px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              refWrap={refMaHoSo}
              placeholder={t("khamBenh.dsBenhNhan.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "55px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.tenTuoiDiaChi")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              refWrap={refTenNguoiBenh}
              placeholder={t("khamBenh.dsBenhNhan.nhapTenTuoiDiaChi")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "thongTin",
      key: "thongTin",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.doiTuong")}
          sort_key="doiTuong"
          dataSort={dataSortColumn["doiTuong"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder={t("khamBenh.dsBenhNhan.doiTuong")}
              onChange={onSearchInput("doiTuong")}
              data={listdoiTuong || []}
            />
          }
        />
      ),
      width: "60px",
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        return listdoiTuong.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("common.tenDichVu")}
          sort_key="tenDichVu"
          dataSort={dataSortColumn["tenDichVu"] || 0}
          onClickSort={onClickSort}
          search={
            <InputTimeout
              placeholder={t("khamBenh.dsBenhNhan.nhapTenDichVu")}
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },

    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.tenBacSiKham")}
          sort_key="tenBacSiKham"
          dataSort={dataSortColumn["bacSiKhamId"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder={t("khamBenh.dsBenhNhan.tenBacSiKham")}
              onChange={onSearchInput("bacSiKhamId")}
              data={listNhanVien || []}
              dropdownClassName="ds-nb-select-bac-si"
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "bacSiKhamId",
      key: "bacSiKhamId",
      render: (item) => {
        return listNhanVien.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("common.trangThai")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder={t("common.chonTrangThai")}
              onChange={onSearchInput("dsTrangThai")}
              data={[{ id: "", ten: t("common.tatCa") }, ...TRANG_THAI_KHAM_BN]}
              defaultValue=""
              dropdownClassName="ds-nb-select-trang-thai"
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        const res = listTrangThaiDichVu.find((el) => el.id === item) || {};
        return res.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.huongDieuTri")}
          sort_key="huongDieuTri"
          dataSort={dataSortColumn["huongDieuTri"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder={t("khamBenh.dsBenhNhan.huongDieuTri")}
              onChange={onSearchInput("huongDieuTri")}
              data={listhuongDieuTriKham || []}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "huongDieuTri",
      key: "huongDieuTri",
      render: (item) => {
        return listhuongDieuTriKham.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.dsBenhNhan.phongThucHien")}
          sort_key="phongThucHienId"
          dataSort={dataSortColumn["phongThucHienId"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              allowClear
              placeholder={t("common.chonPhongKham")}
              onChange={onSearchInput("phongThucHienId")}
              data={listPhongKham || []}
              value={Number(phongThucHienId)}
              dropdownClassName="ds-nb-select-phong-kham"
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "phongThucHienId",
      key: "phongThucHienId",
      render: (item) => {
        const res = (listPhongKham || []).find((el) => el.id === item) || {};
        return res.ten;
      },
    },

    {
      title: <HeaderSearch title={t("common.thaoTac")} isTitleCenter={true} />,
      width: "60px",
      dataIndex: "action",
      key: "action",
      render: (item, record) => {
        return (
          <div className="action-group">
            {renderGoiButton(record)}
            {renderBoQuaButton(record)}
          </div>
        );
      },
    },
  ];
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 }, true);
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
  };

  const rowClassName = (record) => {
    return record.id === infoNb?.id ? "active" : "";
  };
  const onSelectedDate = (e) => {
    setState({
      all: e.all,
      tuThoiGianVaoVien: e.tuThoiGianVaoVien?.format("DD/MM/YYYY") ?? "",
      denThoiGianVaoVien: e.denThoiGianVaoVien?.format("DD/MM/YYYY") ?? "",
    });
    onChangeInputSearch(
      {
        tuThoiGianVaoVien: e.tuThoiGianVaoVien?.format("DD/MM/YYYY 00:00:00"),
        denThoiGianVaoVien: e.denThoiGianVaoVien?.format("DD/MM/YYYY 23:59:59"),
        dsTrangThaiHoan: [0, 10],
      },
      true
    );
  };
  const onShowAll = () => {
    onSelectedDate({
      all: true,
      tuThoiGianVaoVien: null,
      denThoiGianVaoVien: null,
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={"98%"}
      layerId={refLayerHotKey.current}
      title={
        <>
          {" "}
          {t("khamBenh.titleDanhSachNguoiBenh")}
          <span
            style={{
              fontFamily: "Nunito Sans",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 600,
              marginLeft: 24,
              marginRight: 10,
            }}
          >
            {t("khamBenh.ngayDangKy")}
          </span>
          <SearchDate>
            <DateDropdown
              onSelectedDate={onSelectedDate}
              ref={refShowDate}
            ></DateDropdown>
            <Input
              className="filter"
              value={
                state.all
                  ? t("common.tatCa")
                  : `${state.tuThoiGianVaoVien} - ${state.denThoiGianVaoVien}`
              }
              onChange={null}
              onClick={() => refShowDate.current.show()}
            />
            {!state.all ? (
              <ICClose
                style={{ position: "absolute", right: 5, top: 6 }}
                onClick={onShowAll}
              />
            ) : (
              <img
                src={Calendar}
                alt="..."
                style={{ position: "absolute", right: 5, top: 6 }}
              />
            )}
          </SearchDate>
        </>
      }
      onCancel={() => {
        setState({
          show: false,
        });
      }}
    >
      <Main>
        <TableWrapper
          rowClassName={rowClassName}
          columns={columns}
          dataSource={state.data}
          onRow={onRow}
          scroll={{ y: 450 }}
          rowKey={(record) => `${record.id}-${record.tenNb}`}
          styleWrap={{
            height: Math.min(
              (state.data || []).length * 60 + 120,
              windowSize.height * 0.725
            ),
            minHeight: 260,
          }}
        />
        {totalElements ? (
          <Pagination
            listData={state.data}
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
          />
        ) : null}
      </Main>
    </ModalTemplate>
  );
});

export default ModalDanhSachBN;
