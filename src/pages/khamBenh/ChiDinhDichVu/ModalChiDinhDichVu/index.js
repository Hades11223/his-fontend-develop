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
import {
  Select,
  Button,
  InputTimeout,
  TableWrapper,
  Pagination,
  ModalTemplate,
} from "components";
import { message } from "antd";
import { refConfirm } from "app";
import {
  DOI_TUONG,
  LOAI_DICH_VU,
  THIET_LAP_CHUNG,
  TY_LE_THANH_TOAN,
} from "constants/index";
import { RightOutlined } from "@ant-design/icons";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { BlankContentWrapper } from "../../components/TableLoaiDV/styled";
import { Checkbox } from "antd";
import { useStore, useThietLap } from "hook";
import ModalBoSungThongTinDichVu from "../ModalBoSungThongTinDichVu";
import ModalThongTinThuoc from "pages/khamBenh/DonThuoc/components/ModalThongTinThuoc";

export const ModalChiDinhDichVu = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refIsSubmit = useRef(null);
  const refOption = useRef({});
  const refInput = useRef(null);
  const refModal = useRef(null);
  const refModalBoSungThongTinDichVu = useRef(null);
  const refModalThongTinThuoc = useRef(null);

  const [state, _setState] = useState({
    show: false,
    listSelectedDv: [],
    listDichVu: [],
    // boChiDinhSelected: {},
    tuVanVienId: null,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { dataTamTinhTien, listGoiDv, listDvKham, page, size, totalElements } =
    useSelector((state) => state.chiDinhKhamBenh);

  const dsDichVuChiDinhKham = useStore(
    "chiDinhKhamBenh.dsDichVuChiDinhKham",
    []
  );
  const dsDichVuChiDinhXN = useStore("chiDinhKhamBenh.dsDichVuChiDinhXN", []);
  const dsDichVuChiDinhCls = useStore("chiDinhKhamBenh.dsDichVuChiDinhCls", []);
  const dsDichVuNgoaiDieuTri = useStore(
    "chiDinhKhamBenh.dsDichVuNgoaiDieuTri",
    []
  );
  const listLoaiHinhThanhToanCuaDoiTuong = useStore(
    "loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong",
    []
  );
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const [dataThucHienCanBang] = useThietLap(
    THIET_LAP_CHUNG.THUC_HIEN_CAN_BANG_PHONG
  );
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    chiDinhKhamBenh: {
      updateData,
      onSearchDichVu,
      onSearchGoiDichVu,
      tamTinhTien,
      chiDinhDichVu,
      searchDvKSK,
      getDsGoiDvChiTiet,
    },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({
      loaiDichVu,
      dsLoaiDichVu = [
        LOAI_DICH_VU.KHAM,
        LOAI_DICH_VU.XET_NGHIEM,
        LOAI_DICH_VU.CDHA,
        LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
      ],
      dsDoiTuongSuDung,
      nbThongTinId,
      nbDotDieuTriId,
      khoaChiDinhId,
      chiDinhTuDichVuId,
      chiDinhTuLoaiDichVu = LOAI_DICH_VU.KHAM, //MẶC ĐỊNH LÀ KHÁM BỆNH
      isPhauThuat = false,
      isHiddenTyLett = true,
      disableChiDinh = false,
      listLoaiChiDinhDV = [],
      doiTuong,
    }) => {
      setState({
        show: true,
        keyword: "",
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        isHiddenTyLett,
        isPhauThuat,
        listLoaiChiDinhDV,
        disableChiDinh,
        tuVanVienId: null,
      });
      refOption.current = {
        dsLoaiDichVu: dsLoaiDichVu.join(","),
        nbDotDieuTriId,
        dsDoiTuongSuDung,
        khoaChiDinhId,
        nbThongTinId,
        listLoaiChiDinhDV,
        doiTuong,
      };
      refIsSubmit.current = false;

      onSelectServiceType(loaiDichVu);
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
      });
    },
  }));

  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
    if (state.show) {
      refModal.current && refModal.current.show({});
      setTimeout(() => {
        refInput.current.focus();
      }, 1000);
    } else {
      refModal.current && refModal.current.hide({});
    }
  }, [state.show]);
  useEffect(() => {
    getListAllNhanVien({ page: "", size: "", active: true });

    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    // const { listSelectedDv } = state;
    const listDichVu = (listDvKham || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id || "dv"}-${item.dichVuId}`,
    }));
    // .filter((itemFilter) => !itemFilter.hanCheKhoaChiDinh);
    setState({
      listDichVu,
    });
  }, [listDvKham]);

  const onTamTinhTien = (listSelectedDv) => {
    let listLoaiHinhMacDinh = listLoaiHinhThanhToanCuaDoiTuong.filter(
      (x) => x.macDinh
    );
    let loaiHinhThanhToanId =
      listLoaiHinhMacDinh.length === 1
        ? listLoaiHinhMacDinh[0]?.loaiHinhThanhToanId
        : null;

    const payload = listSelectedDv.map((item) => ({
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item.ten,
          ma: item.ma,
        },
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong || 1,
        loaiDichVu: item?.loaiDichVu,
        khoaChiDinhId: refOption.current.khoaChiDinhId,
        nbGoiDvId: item?.nbGoiDvId || undefined,
        nbGoiDvChiTietId: item?.nbGoiDvChiTietId || undefined,
        loaiHinhThanhToanId: loaiHinhThanhToanId,
        tyLeTtDv:
          !state.isHiddenTyLett &&
          item?.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT &&
          state.isPhauThuat
            ? item?.tyLeTtDv || 100
            : undefined,
      },
      nbDvKyThuat: {
        phongId: item.phongId,
        tuVanVienId: item.tuVanVienId || state.tuVanVienId,
      },
      boChiDinhId: item.boChiDinhId || undefined,
    }));

    tamTinhTien({
      khoaChiDinhId: refOption.current.khoaChiDinhId,
      chiDinhTuDichVuId: state.chiDinhTuDichVuId,
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
      dsDichVu: payload,
    }).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );
      setState({
        thanhTien: thanhTien,
        listSelectedDv: listSelectedDv,
        indeterminate:
          listSelectedDv.length &&
          listSelectedDv.length < state.listDichVu.length,
      });
    });
  };

  // useEffect(() => {
  //   onChangePage(1);
  // }, [state.boChiDinhSelected]);

  const onChangeSoLuong = (_uniqueKey, key) => {
    return (value) => {
      let _listSelectedDv = Object.assign([], listSelectedDv);
      const _findDvIndex = _listSelectedDv.findIndex(
        (x) => x.uniqueKey === _uniqueKey
      );
      if (_findDvIndex !== -1) {
        _listSelectedDv[_findDvIndex][key] = value;
        setState({ listSelectedDv: _listSelectedDv });

        onTamTinhTien(_listSelectedDv);
      }
    };
  };

  const { listDichVu, listSelectedDv, thanhTien, keyword, loaiDichVu } = state;

  useEffect(() => {
    // if (elementKey !== 1) return;
    if (!state.disableChiDinh && state.show) {
      onChangePage(1);
    } else {
      updateData({
        listDvKham: [],
        disableChiDinh: state.disableChiDinh,
      });
    }
  }, [state.disableChiDinh, state.show]);

  const onSelectServiceType = (value = "") => {
    if (state.disableChiDinh) return;
    updateData({
      listLoaiDichVu: value ? [value] : [],
    });

    const _selectedGroup = refOption.current.listLoaiChiDinhDV.find(
      (x) => x.id === value
    );

    setState({
      loaiDichVu: value,
      indeterminate: false,
      keyword: "",
      listDichVu: [],
      boChiDinhId: null,
      // listSelectedDv: [],
    });
    if (value !== "KSK") {
      if (_selectedGroup?.goiDvId) {
        getDsGoiDvChiTiet({
          page: 0,
          goiDvId: _selectedGroup.goiDvId,
          nbGoiDvId: _selectedGroup.nbGoiDvId,
          // nbDotDieuTriId: id,
          nbThongTinId: refOption.current.nbThongTinId,
          dangSuDung: true,
        });
        return;
      }

      if (value == LOAI_DICH_VU.GOI_DICH_VU) {
        onSearchGoiDichVu({
          page: "",
          size: "",
          ten: "",
          khoaChiDinhId: refOption.current.khoaChiDinhId,
          dsBacSiChiDinhId: nhanVienId,
          dsDoiTuongSuDung: refOption.current.dsDoiTuongSuDung,
          dsLoaiDichVu: refOption.current.dsLoaiDichVu,
        });
      } else {
        onSearchDichVu2({ page: 0, keyword: "", loaiDichVu: value });
      }
    } else {
      searchDvKSK({
        nbDotDieuTriId: refOption.current.nbDotDieuTriId,
        hopDongKsk: true,
      });
    }
    // getBoChiDinh({ dsLoaiDichVu: value })
  };

  const onSubmit = async () => {
    try {
      if (refIsSubmit.current) return; //nếu đang submit thì bỏ qua
      const { listSelectedDv } = state;
      if (
        state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU &&
        !listSelectedDv.every((x) => x.soLuong > 0)
      ) {
        message.error(t("khamBenh.vuiLongNhapSoLuongLon0"));
        return;
      }

      if (!listSelectedDv.length) {
        message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
        return;
      }
      setState({
        filterText: "",
      });
      let dsDichVuCanBoSung = [];
      let dsDichVuThoaDieuKien = [];
      let listLoaiHinhMacDinh = listLoaiHinhThanhToanCuaDoiTuong.filter(
        (x) => x.macDinh
      );
      let loaiHinhThanhToanId =
        listLoaiHinhMacDinh.length === 1
          ? listLoaiHinhMacDinh[0]?.loaiHinhThanhToanId
          : null;
      debugger;
      listSelectedDv.filter((item) => {
        if (
          (item?.dsPhongThucHien?.length > 1 &&
            dataThucHienCanBang.toLowerCase() === "false") ||
          item?.yeuCauBenhPham ||
          (item?.dsMucDich?.length &&
            refOption.current.doiTuong === DOI_TUONG.BAO_HIEM)
        ) {
          dsDichVuCanBoSung.push(item);
        } else {
          dsDichVuThoaDieuKien.push(item?.dichVuId);
        }
      });
      //lấy ra ds dịch vụ đủ điều kiện và ds dịch vụ cần bổ sung
      dsDichVuCanBoSung = dsDichVuCanBoSung.map((item, index) => ({
        yeuCauBenhPham: item?.yeuCauBenhPham,
        dsPhongThucHien: item?.dsPhongThucHien,
        dsMucDich: item?.dsMucDich,
        nbDichVu: {
          chiDinhTuDichVuId: state.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
          dichVu: {
            ten: item?.ten,
          },
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong || 1,
          loaiDichVu: item?.loaiDichVu,
          khoaChiDinhId: refOption.current.khoaChiDinhId,
          nbGoiDvId: item?.nbGoiDvId || undefined,
          nbGoiDvChiTietId: item?.nbGoiDvChiTietId || undefined,
          loaiHinhThanhToanId: loaiHinhThanhToanId,
          tyLeTtDv:
            !state.isHiddenTyLett &&
            item?.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT &&
            state.isPhauThuat
              ? item?.tyLeTtDv || 100
              : undefined,
        },
        boChiDinhId: item.boChiDinhId || undefined,
        nbDotDieuTriId: refOption.current.nbDotDieuTriId,
        nbDvKyThuat: {
          // phongThucHienId: item.nbDvKyThuat?.phongThucHienId,
          tuVanVienId: state.tuVanVienId,
        },
        key: index,
        stt: index + 1,
      }));
      if (dsDichVuThoaDieuKien.length > 0) {
        // tạo dịch vụ nếu đủ điều kiện
        let dataTamTinhTienDichVuDuThoaDieuKien = dataTamTinhTien
          .filter((item) =>
            dsDichVuThoaDieuKien.some(
              (dichVuId) => dichVuId == item.nbDichVu.dichVuId
            )
          )
          .map((item) => {
            const _findIndex = listSelectedDv.findIndex(
              (x) => x.dichVuId == item.nbDichVu.dichVuId
            );
            if (_findIndex > -1) {
              const _findItem = listSelectedDv[_findIndex];
              //nếu là dv ngoài điều trị + ds phòng thực hiện chỉ có 1 thì set phòng thực hiện vào payload gửi lên
              if (
                _findItem.loaiDichVu == LOAI_DICH_VU.NGOAI_DIEU_TRI &&
                _findItem.dsPhongThucHien &&
                _findItem.dsPhongThucHien.length == 1
              ) {
                return {
                  ...item,
                  nbDvKyThuat: {
                    ...item.nbDvKyThuat,
                    phongThucHienId: _findItem.dsPhongThucHien[0].phongId,
                  },
                };
              } else if (
                _findItem.dsPhongThucHien &&
                _findItem.dsPhongThucHien.length > 1 &&
                dataThucHienCanBang.toLowerCase() === "true"
              ) {
                let phongThucHien = _findItem.dsPhongThucHien.reduce(
                  (prev, curr) =>
                    prev.nbChuaHoanThanh < curr.nbChuaHoanThanh ? prev : curr
                );
                return {
                  ...item,
                  nbDvKyThuat: {
                    ...item.nbDvKyThuat,
                    phongThucHienId: phongThucHien?.phongId,
                  },
                };
              }
            }

            return item;
          });
        refIsSubmit.current = true;

        const res = await chiDinhDichVu({
          dataTamTinhTien: dataTamTinhTienDichVuDuThoaDieuKien,
          dsDichVuCanBoSung,
        });
        setState({
          listSelectedDv: [],
          listDichVu:
            state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU
              ? []
              : state.listDichVu,
        });
        if (res.code == 0) {
          onCancel();
        } else {
          refIsSubmit.current = false;
        }
        dsDichVuCanBoSung = res.dsDichVuCanBoSung;
        //ở đây dùng res.dsDichVuCanBoSung bởi vì đã merge với ds trả về lỗi, nếu chỉ dùng dsDichVuCanBoSung thì sẽ bị thiếu những dịch vụ kê bị lỗi
        onShowDichVuBoSung(dsDichVuCanBoSung);

        const response = res.response || [];
        if (!dsDichVuCanBoSung?.length && response?.length) {
          let item = response.filter((x) => x.data).map((x1) => x1.data);
          let messageWarning = item[item.length - 1].filter((x) => x.message);
          let content = messageWarning[messageWarning?.length - 1]?.message;
          content &&
            refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: content,
                cancelText: t("common.dong"),
                classNameOkText: "button-error",
                showImg: true,
                typeModal: "warning",
              },
              () => {}
            );
        }

        if (response.length) {
          onDichVuKemTheo(res.response);
        }
      } else {
        onCancel();
        onShowDichVuBoSung(dsDichVuCanBoSung);
      }
    } catch (error) {
      refIsSubmit.current = false;
    }
  };

  const onDichVuKemTheo = (data, khoId) => {
    let item = data.filter((x) => x.data).map((x1) => x1.data);
    let newTable = [];
    item.forEach((x) => {
      x.forEach((x1) => {
        if (x1.nbDichVu.dichVu.loaiDichVu === LOAI_DICH_VU.CDHA) {
          x1.dsDvKemTheo.forEach((x2) => {
            if (x2.code === 8501) newTable.push(x2);
          });
        }
      });
    });
    if (newTable.length) {
      refModalThongTinThuoc.current &&
        refModalThongTinThuoc.current.show({
          newTable,
          nbDotDieuTriId: refOption.current.nbDotDieuTriId,
          chiDinhTuDichVuId: state.chiDinhTuDichVuId,
        });
    }
  };

  const onShowDichVuBoSung = (dsDichVuCanBoSung) => {
    refModalBoSungThongTinDichVu.current &&
      dsDichVuCanBoSung?.length &&
      refModalBoSungThongTinDichVu.current.show({
        dataSource: dsDichVuCanBoSung,
        isPhauThuat: state.isPhauThuat,
      });
  };
  const onCancel = () => {
    setState({
      show: false,
      thanhTien: 0,
      listDichVu:
        state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU ? [] : state.listDichVu,
      indeterminate: false,
      listSelectedDv: [],
      filterText: "",
    });
    refModal.current && refModal.current.hide();
  };

  const onSearch = (keyword) => {
    setState({
      keyword: keyword,
    });
    if (state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU) {
      onSearchGoiDichVu({
        ten: keyword,
        page: 0,
        size: 500,
        khoaChiDinhId: refOption.current.khoaChiDinhId,
        dsBacSiChiDinhId: nhanVienId,
      });
    } else {
      onSearchDichVu2({ keyword, page: 0, size, loaiDichVu: state.loaiDichVu });
    }
  };

  const onSelectGoiDichVu = (item) => (e) => {
    setState({ activeLink: item.dichVuId });

    onSearchDichVu2({
      page: 0,
      size: 50,
      loaiDichVu: null,
      boChiDinhId: item.dichVuId,
    });
    e.preventDefault();
  };

  const listDichVuDaKe = useMemo(() => {
    return [
      ...dsDichVuChiDinhCls,
      ...dsDichVuChiDinhKham,
      ...dsDichVuChiDinhXN,
      ...dsDichVuNgoaiDieuTri,
    ];
  }, [
    dsDichVuChiDinhCls,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhXN,
    dsDichVuNgoaiDieuTri,
  ]);

  const onSelectDichVu = (record) => (e) => {
    if (e.target.hasAttribute("type")) {
      const checked = e.target.checked;

      const { listSelectedDv } = state;
      let updatedListDv = [];
      if (checked) {
        updatedListDv = [
          { ...record, soLuong: record?.soLuongMacDinh || record.soLuong || 1 },
          ...listSelectedDv,
        ];

        //check và hiện thị cảnh báo nếu dịch vụ đã tồn tại
        const _searchIndex = (listSelectedDv || []).findIndex(
          (x) => x.dichVuId == record.dichVuId
        );
        if (_searchIndex != -1) {
          message.error(`Dịch vụ ${record.ten} đã tồn tại!`);
        }
      } else {
        updatedListDv = listSelectedDv.filter(
          (item) => item.uniqueKey !== record.uniqueKey
        );
      }

      if (listDichVuDaKe.length > 0 && checked) {
        //kiểm tra mở popup khi dịch vụ trùng
        let objDupplicate = listDichVuDaKe.find(
          (item1) => item1.dichVuId == record.dichVuId
        );
        if (objDupplicate) {
          refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: t("khamBenh.chiDinh.canhBaoKeTrung")
                  .replace("{0}", objDupplicate.tenDichVu)
                  .replace("{1}", objDupplicate.tenNb),
                cancelText: t("common.huy"),
                okText: t("common.xacNhan"),
                showImg: false,
                showBtnOk: true,
                typeModal: "warning",
              },
              () => {
                onTamTinhTien(updatedListDv);
              }
            );
          return false;
        }
      }
      onTamTinhTien(updatedListDv);
    } else {
      e.currentTarget.firstElementChild.firstElementChild.firstElementChild.firstElementChild.click();
    }
  };

  const checkAllDichVu = (e) => {
    const checked = e.target.checked;
    let updatedListDv = [];

    if (checked) {
      updatedListDv = [
        ...listDichVu
          .filter(
            (x1) =>
              listSelectedDv.findIndex((x2) => x1.dichVuId == x2.dichVuId) == -1
          )
          .map((x) => ({ ...x, soLuong: x.soLuong || 1 })),
        ...listSelectedDv,
      ];
    } else {
      updatedListDv = listSelectedDv.filter(
        (x1) => listDichVu.findIndex((x2) => x1.dichVuId == x2.dichVuId) == -1
      );
    }

    onTamTinhTien(updatedListDv);
  };

  useEffect(() => {
    if (state.loaiDichVu !== 150) {
      setState({ activeLink: -1 });
    }
  }, [state.loaiDichVu]);

  const onRemoveItem = (value) => () => {
    const listUpdatedTag = listSelectedDv.filter(
      (item) => item.uniqueKey !== value
    );

    setState({
      listSelectedDv: listUpdatedTag,
    });
    onTamTinhTien(listUpdatedTag);
  };

  const onSelectTuVanVien = (e) => {
    setState({
      tuVanVienId: e,
    });
    onTamTinhTien(listSelectedDv.map((item) => ({ ...item, tuVanVienId: e })));
  };

  const columnsDichVu = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={!(state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU)}
          title={
            state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? (
              <div style={{ marginLeft: 6, width: "100%", textAlign: "left" }}>
                {listDichVu && listDichVu.length > 0 && (
                  <Checkbox
                    onChange={checkAllDichVu}
                    checked={listDichVu.every(
                      (x1) =>
                        listSelectedDv.findIndex(
                          (x2) => x1.dichVuId == x2.dichVuId
                        ) != -1
                    )}
                  >
                    {t("common.chonTatCa")}
                  </Checkbox>
                )}
              </div>
            ) : (
              t("khamBenh.donThuoc.tenThuocHamLuong")
            )
          }
        />
      ),
      dataIndex: "",
      key: "",
      width: "100%",
      render: (value, currentRow, index) => {
        const _selectedDV = listSelectedDv.find(
          (x) => x.dichVuId === currentRow.dichVuId
        );
        const soLuong = _selectedDV?.soLuong || 1;
        const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
        const giaBaoHiem = (currentRow.giaBaoHiem || 0).formatPrice();
        const giaPhuThu = (currentRow.giaPhuThu || 0).formatPrice();
        const donGia = `${giaKhongBaoHiem} | ${t(
          "khamBenh.chiDinh.BH"
        )}: ${giaBaoHiem} | ${t("khamBenh.chiDinh.phuThu")}: ${giaPhuThu}`;
        return (
          <div className="row-item">
            <div className="left-box">
              <Checkbox
                checked={
                  !!listSelectedDv.find(
                    (item) => item.uniqueKey === currentRow.uniqueKey
                  )
                }
              />
            </div>

            <div className="right-box">
              <div className="name">
                <b>{currentRow?.ten}</b>
              </div>
              {/* <div
                className="soluong"
                onClick={(event) => event.stopPropagation()}
              >
                {!!listSelectedDv.find(
                  (item) => item.uniqueKey === currentRow.uniqueKey
                ) && (
                  <InputTimeout
                    type="number"
                    value={soLuong}
                    style={{ width: 50 }}
                    min={1}
                    step={1}
                    onChange={
                      onChangeSoLuong && onChangeSoLuong(currentRow.dichVuId)
                    }
                  />
                )}
              </div> */}
              <div className="desc">{donGia}</div>
            </div>
          </div>
        );
      },
    },
  ];
  const columnsGoiDichVu = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
        />
      ),
      dataIndex: "",
      key: "",
      width: "100%",
      render: (value, currentRow, index) => {
        return (
          <div>
            {currentRow?.ten} <RightOutlined className="arrow-icon" />
          </div>
        );
      },
    },
  ];

  const columnsChooseDv = [
    {
      title: <HeaderSearch isTitleCenter={true} title={<Checkbox checked />} />,
      key: "key",
      width: 40,
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked onChange={onRemoveItem(list.uniqueKey)} />
      ),
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.stt")} />,
      dataIndex: "stt",
      key: "stt",
      width: 40,
      align: "center",
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={t("common.tenDichVu")} />
      ),
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title={t("common.tyLeTt")} isTitleCenter={true} />,
      dataIndex: "tyLeTtDv",
      key: "tyLeTtDv",
      width: "20%",
      hidden: state.isHiddenTyLett,
      render: (item, list, index) => {
        const tyLeTtDv = item || 100;
        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <Select
              value={tyLeTtDv}
              data={TY_LE_THANH_TOAN}
              onChange={onChangeSoLuong(list.uniqueKey, "tyLeTtDv")}
              disabled={
                !state.isPhauThuat ||
                list.loaiDichVu !== LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
              }
            />
          </div>
        );
      },
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.soLuong")} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: 80,
      render: (item, list, index) => {
        const soLuong = item || 1;

        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <InputTimeout
              type="number"
              value={soLuong}
              style={{ width: 65 }}
              min={1}
              step={1}
              onChange={onChangeSoLuong(list.uniqueKey, "soLuong")}
            />
          </div>
        );
      },
    },
  ];

  const renderEmptyTextLeftTable = () => {
    return (
      <div style={{ marginTop: 130 }}>
        <div style={{ color: "#c3c3c3", fontSize: 14 }}>
          {t("common.khongCoDuLieuPhuHop")}
        </div>
      </div>
    );
  };
  const onChangePage = (page) => {
    onSearchDichVu2({
      page: page - 1,
      size,
      keyword,
      loaiDichVu: loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? null : loaiDichVu,
    });
  };
  const onSizeChange = (value) => {
    onSearchDichVu2({
      page: 0,
      size: value,
      keyword: keyword,
      loaiDichVu: loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU ? null : loaiDichVu,
    });
  };
  const onSearchDichVu2 = ({
    keyword,
    page = 0,
    size = 10,
    loaiDichVu,
    boChiDinhId,
  }) => {
    //nếu không phải là loại dịch vụ thì ko search (case loaiDichVu = id gói dv)
    if (![...Object.values(LOAI_DICH_VU), null, ""].includes(loaiDichVu))
      return;

    onSearchDichVu({
      ten: keyword,
      page: page || 0,
      size: size || 10,
      khoaChiDinhId: refOption.current.khoaChiDinhId,
      bacSiChiDinhId: nhanVienId,
      // boChiDinhId: state.boChiDinhSelected?.id,
      boChiDinhId: boChiDinhId,
      ...(loaiDichVu
        ? { loaiDichVu: loaiDichVu }
        : {
            dsLoaiDichVu: refOption.current.dsLoaiDichVu,
          }),
      dsDoiTuongSuDung: refOption.current.dsDoiTuongSuDung,
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={1447}
      layerId={refLayerHotKey.current}
      title={t("khamBenh.chiDinh.chiDinhDichVuKyThuat")}
      onCancel={onCancel}
      actionRight={
        <>
          <Button
            minWidth={100}
            type="default"
            onClick={onCancel}
            iconHeight={15}
          >
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
            defaultValue=""
            value={state.loaiDichVu}
            className="filter-item"
            data={state.listLoaiChiDinhDV}
            placeholder={t("khamBenh.chiDinh.chonLoaiDV")}
            onChange={onSelectServiceType}
          ></Select>
          <InputTimeout
            className="filter-item"
            ref={refInput}
            placeholder={t("khamBenh.chiDinh.chonDichVu")}
            onChange={onSearch}
            value={state.keyword}
          />
          <Select
            value={state.tuVanVienId}
            className="filter-item"
            data={listAllNhanVien}
            placeholder={t("khamBenh.chiDinh.chonTuVanVien")}
            onChange={onSelectTuVanVien}
          ></Select>
        </div>
        <div className="list-services">
          {state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU && (
            <div className="content-equal-w bundle-services">
              <div className="danh-sach-goi-dich-vu">
                <TableWrapper
                  rowKey={(record) => {
                    return record.ma;
                  }}
                  columns={columnsGoiDichVu}
                  dataSource={listGoiDv}
                  rowClassName={(record, index) => {
                    return `goi-dich-vu-item ${
                      record.dichVuId == state.activeLink
                        ? "selected-goi-dich-vu"
                        : ""
                    }`;
                  }}
                  showHeader={false}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: onSelectGoiDichVu(record),
                    };
                  }}
                  locale={{
                    emptyText: renderEmptyTextLeftTable(),
                  }}
                  scroll={{ y: 350 }}
                />
              </div>
            </div>
          )}
          <div className="content-equal-w">
            <div className="title-table">{t("common.dichVu")}</div>
            <div className="danh-sach-dich-vu">
              <TableWrapper
                rowKey={(record) => {
                  return record.id || record.dichVuId;
                }}
                columns={columnsDichVu}
                dataSource={listDichVu}
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
                }}
                showHeader={
                  state.loaiDichVu == LOAI_DICH_VU.GOI_DICH_VU &&
                  listDichVu &&
                  listDichVu.length > 0
                }
                headerMinHeight={"30px"}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: onSelectDichVu(record),
                  };
                }}
                locale={{
                  emptyText: renderEmptyTextLeftTable(),
                }}
                scroll={{ y: 350 }}
              />
              {!!listDichVu.length && (
                <Pagination
                  listData={listDichVu}
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  total={totalElements}
                  onShowSizeChange={onSizeChange}
                  stylePagination={{ justifyContent: "flex-start" }}
                />
              )}
            </div>
          </div>
          <div className="content-equal-w">
            <div className="title">
              <div className="title__left">
                <img src={CircleCheck} alt="" /> {t("common.daChon")}
              </div>
              <div className="title__right">
                {t("khamBenh.chiDinh.tongTien")}:{" "}
                {(thanhTien || 0).formatPrice()} đ
              </div>
            </div>
            <div className="content-body">
              {!listSelectedDv.length || listSelectedDv.length === 0 ? (
                <BlankContentWrapper>
                  <div>
                    {!state.disableChiDinh
                      ? t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu")
                      : t(
                          "khamBenh.chiDinh.yeuCauNhapChanDoanTruocChiDinhDichVu"
                        )}
                  </div>
                </BlankContentWrapper>
              ) : (
                <>
                  {/* {listSelectedDv.map((item) => (
                  <Tag
                    key={item.uniqueKey}
                    className="custom-tag"
                    color="green"
                    closable
                    onClose={onRemoveItem(item.dichVuId)}
                  >
                    {`${item.ten} (Slg: ${item.soLuong})`}
                  </Tag>
                ))} */}
                  <TableWrapper
                    rowKey={(record) => {
                      return record.uniqueKey;
                    }}
                    columns={columnsChooseDv}
                    dataSource={(listSelectedDv || []).map((x, idx) => ({
                      ...x,
                      stt: idx + 1,
                    }))}
                    scroll={{ x: 450 }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Main>
      <ModalBoSungThongTinDichVu
        ref={refModalBoSungThongTinDichVu}
        onDichVuKemTheo={onDichVuKemTheo}
      />
      <ModalThongTinThuoc ref={refModalThongTinThuoc} />
    </ModalTemplate>
  );
});

export default ModalChiDinhDichVu;
