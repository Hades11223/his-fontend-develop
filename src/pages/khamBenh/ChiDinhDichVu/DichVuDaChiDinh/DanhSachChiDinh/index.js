import React, { useEffect, useMemo, useRef } from "react";
import { Collapse, message } from "antd";
import { useDispatch } from "react-redux";
import { groupBy, orderBy } from "lodash";
import Header from "./Header";
import DanhSachDichVu from "./DanhSachDichVu";
import {
  TRANG_THAI_DICH_VU,
  LOAI_DICH_VU,
  GIOI_TINH_BY_VALUE,
} from "constants/index";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";
import { useLoading, useStore } from "hook";
const { Panel } = Collapse;

const DanhSachChiDinh = ({
  keyStore,
  loaiDichVu,
  activeKey = [],
  onCollapsed,
  keys,
  isHiddenTyLett,
  isDisplayLoaiPttt,
  isDisplayIconHoan,
  disabledAll,
  isReadonly,
  ...props
}) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const dsChiDinh = useStore(keyStore, []);
  const configData = useStore("chiDinhKhamBenh.configData", null);
  const thongTinNguoiBenh = useStore(
    "chiDinhKhamBenh.configData.thongTinNguoiBenh"
  );

  const {
    chiDinhKhamBenh: {
      getDsDichVuChiDinhXN,
      getDsDichVuChiDinhKham,
      getDsDichVuChiDinhCLS,
      getDsDichVuNgoaiDieuTri,
      onDeleteDichVu,
    },
  } = useDispatch();
  const { getUrl } = useDispatch().pacs;

  const refModalHoanDichVu = useRef(null);

  useEffect(() => {
    if (configData) {
      switch (loaiDichVu) {
        case LOAI_DICH_VU.KHAM:
          getDsDichVuChiDinhKham();
          break;
        case LOAI_DICH_VU.XET_NGHIEM:
          getDsDichVuChiDinhXN();
          break;
        case LOAI_DICH_VU.CDHA:
          getDsDichVuChiDinhCLS();
          break;
        case LOAI_DICH_VU.NGOAI_DIEU_TRI:
          getDsDichVuNgoaiDieuTri();
          break;
        default:
          break;
      }
    }
  }, [configData, loaiDichVu]);

  const onDeletePhieu = (data) => () => {
    const listDichVuId = data
      // .filter((item) => canEditOrUpdate(item.trangThai, item.loaiDichVu))
      .map((dichVu) => dichVu.id);

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("khamBenh.chiDinh.xacNhanXoaDuLieu")} ${
            data[0].tenPhieuChiDinh
              ? data[0].tenPhieuChiDinh
              : data[0].tenNhomDichVuCap1
          }?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        async () => {
          showLoading();
          try {
            const s = await onDeleteDichVu({
              listDeletingId: listDichVuId,
              loaiDichVu: data[0].loaiDichVu,
            });
            if (s.code === 0) {
              getDsDichVu(data[0].loaiDichVu);
            }
          } catch (error) {
          } finally {
            hideLoading();
          }
        }
      );
  };

  const getDsDichVu = (type) => {
    switch (type) {
      case LOAI_DICH_VU.KHAM:
        getDsDichVuChiDinhKham();
        break;
      case LOAI_DICH_VU.XET_NGHIEM:
        getDsDichVuChiDinhXN();
        break;
      case LOAI_DICH_VU.CDHA:
      case LOAI_DICH_VU.PHAU_THUAT_THU_THUAT:
        getDsDichVuChiDinhCLS();
        break;
      case LOAI_DICH_VU.NGOAI_DIEU_TRI:
        getDsDichVuNgoaiDieuTri();
        break;
      default:
        break;
    }
  };

  const groupAndOrderItem = (items, groupkey, orderKey) => {
    const groupData = groupBy(items, "trangChiDinh");
    const data = {};
    Object.keys(groupData).forEach((trangChiDinh) => {
      data[`${trangChiDinh}-${groupkey}`] = orderBy(
        groupData[trangChiDinh],
        orderKey,
        "asc"
      );
    });
    return data;
  };

  const dataSource = useMemo(() => {
    if (loaiDichVu == LOAI_DICH_VU.KHAM)
      return groupAndOrderItem(dsChiDinh, "kham", [
        "tenNhomDichVuCap1",
        "benhPham",
        "phongThucHien",
      ]);
    if (loaiDichVu == LOAI_DICH_VU.XET_NGHIEM)
      return groupAndOrderItem(dsChiDinh, "xn", [
        "tenPhieuChiDinh",
        "benhPham",
        "phongThucHien",
      ]);
    if (loaiDichVu == LOAI_DICH_VU.CDHA)
      return groupAndOrderItem(dsChiDinh, "cls", [
        "tenPhieuChiDinh",
        "benhPham",
        "phongThucHien",
      ]);
    if (loaiDichVu == LOAI_DICH_VU.NGOAI_DIEU_TRI)
      return { ngoaiDieuTri: dsChiDinh };
  }, [dsChiDinh, loaiDichVu]);

  const onHoanDichVu =
    (record) =>
    (e = {}) => {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      const data = record.filter(
        (x) =>
          x.thanhToan &&
          x.trangThaiHoan === 0 &&
          [
            LOAI_DICH_VU.KHAM,
            LOAI_DICH_VU.CDHA,
            LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
            LOAI_DICH_VU.XET_NGHIEM,
            LOAI_DICH_VU.NGOAI_DIEU_TRI,
          ].includes(x.loaiDichVu) &&
          (x.trangThai
            ? TRANG_THAI_DICH_VU["YEU_CAU_HOAN"].includes(x.trangThai)
            : true)
      );

      let gioiTinh = thongTinNguoiBenh.gioiTinh
        ? GIOI_TINH_BY_VALUE[thongTinNguoiBenh.gioiTinh]
        : "";

      let tuoi =
        thongTinNguoiBenh.thangTuoi > 36 || thongTinNguoiBenh.tuoi
          ? `${thongTinNguoiBenh.tuoi} ${t("common.tuoi")}`
          : `${thongTinNguoiBenh.thangTuoi} ${t("common.thang")}`;
      if (data?.length) {
        data.forEach((itemLoop) => {
          itemLoop.gioiTinh = gioiTinh;
          itemLoop.tuoi = tuoi;
        });
        refModalHoanDichVu.current &&
          refModalHoanDichVu.current.show(
            {
              data: data,
            },
            () => {
              getDsDichVu(data[0]?.loaiDichVu);
            }
          );
      } else {
        message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
        return;
      }
    };
  const onViewPacs = (data) => (e) => {
    e.stopPropagation();
    getUrl({ id: data[0]?.id }).then((res) => {
      window.open(res, "_blank").focus();
    });
  };

  const listPanel = useMemo(() => {
    const list = [];
    Object.keys(dataSource).forEach((key) => {
      if (!dataSource[key]?.length) return;
      const { soPhieu, tenPhieuChiDinh, diaDiemPhongThucHien } =
        dataSource[key][0];
      dataSource[key].forEach((item) => {
        list.push({
          ...item,
          keyDefine: `${soPhieu}-${tenPhieuChiDinh}-${diaDiemPhongThucHien}`,
        });
      });
    });
    const grouped = groupBy(list, "keyDefine");
    return Object.keys(grouped).map((key) => {
      const { tenPhieuChiDinh, tenNhomDichVuCap1, loaiDichVu } =
        (grouped && grouped[key][0]) || {};
      const listTrangThai = grouped[key].map((item) => item.trangThai);
      const dsSoKetNoi = grouped[key].map((item) => item.soKetNoi);

      const setId = new Set();
      grouped[key].forEach((i) => setId.add(i.soPhieuId));

      return {
        header: (
          <Header
            title={tenPhieuChiDinh || tenNhomDichVuCap1}
            listTrangThai={listTrangThai}
            loaiDichVu={loaiDichVu}
            nbDotDieuTriId={configData?.nbDotDieuTriId}
            chiDinhTuLoaiDichVu={configData?.chiDinhTuLoaiDichVu}
            dsChiDinhTuLoaiDichVu={configData?.dsChiDinhTuLoaiDichVu}
            chiDinhTuDichVuId={configData?.chiDinhTuDichVuId}
            isCollapsed={activeKey.includes(key)}
            dataSource={grouped[key]}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            dsSoPhieuId={Array.from(setId)}
            phieuChiDinhId={grouped[key]?.[0]?.phieuChiDinhId}
            key={key}
            onDelete={onDeletePhieu(grouped[key], key)}
            onHoanDichVu={onHoanDichVu(grouped[key])}
            dsSoKetNoi={dsSoKetNoi}
            onViewPacs={onViewPacs(grouped[key])}
            isDisplayIconHoan={isDisplayIconHoan}
            disabledAll={disabledAll}
            isReadonly={isReadonly}
          />
        ),
        content: (
          <DanhSachDichVu
            dataGroup={grouped[key]}
            getDsDichVu={getDsDichVu}
            onDeleteDichVu={onDeleteDichVu}
            isHiddenTyLett={isHiddenTyLett}
            isDisplayLoaiPttt={isDisplayLoaiPttt}
            tableName={"DICH_VU_CHI_DINH_" + loaiDichVu}
            isReadonly={isReadonly}
            disabledAll={disabledAll}
            {...props}
          />
        ),
        key,
      };
    });
  }, [dataSource, activeKey, disabledAll]);
  return (
    <>
      {listPanel.map((panel, idx) => (
        <Panel
          {...props}
          showArrow={false}
          key={panel.key}
          panelKey={panel.key}
          isActive={activeKey.includes(panel.key)}
          header={panel.header}
        >
          {panel.content}
        </Panel>
      ))}
      <ModalHoanDichVu ref={refModalHoanDichVu} />
    </>
  );
};

export default DanhSachChiDinh;
