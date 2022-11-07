import React, { useEffect, useRef, useMemo } from "react";
import { TableWrapper, Button } from "components";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  ENUM,
  HOTKEY,
  TRANG_THAI_NB_GOI_DV,
  TRANG_THAI_NB_GOI_DV_TAM_UNG,
} from "constants/index";
import ModalThemMoiPhieuThuThanhToan from "../ModalThemMoiPhieuThuThanhToan";
import ModalHuyThanhToanGoi from "../ModalHuyThanhToanGoi";
import stringUtils from "mainam-react-native-string-utils";
import { useEnum } from "hook";
import { groupBy } from "lodash";
import IcReload from "assets/svg/ic-reload.svg";
import IcPrint from "assets/svg/ic-print.svg";
import { Tooltip } from "antd";
import { checkRole } from "utils/role-utils";
import printProvider from "data-access/print-provider";
import IcSetting from "assets/svg/ic-setting.svg";

const { Column } = TableWrapper;

const ThanhToanGoi = ({ isSave, isCancelPayment }) => {
  const refModalThemMoiPhieuThuThanhToan = useRef(null);
  const refModalHuyThanhToanGoi = useRef(null);
  const { t } = useTranslation();
  const refSettings = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const { listThanhToanGoi } = useSelector((state) => state.thanhToanGoi);
  const { thongTinNbGoiDv } = useSelector((state) => state.nbGoiDv);
  const [listTrangThaiGoiDvTamUng] = useEnum(ENUM.TRANG_THAI_GOI_DV_TAM_UNG);
  const {
    thanhToanGoi: { onSortChange, onSearch, onPhieuThu, onPhieuHoan },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    if (thongTinNbGoiDv?.id) {
      onSearch({
        dataSearch: {
          nbGoiDvId: thongTinNbGoiDv?.id,
        },
      });
    }
  }, [thongTinNbGoiDv?.id]);
  const dataSource = useMemo(() => {
    const data = groupBy(listThanhToanGoi || [], "trangThai");
    console.log("listTrangThaiGoiDvTamUng", listTrangThaiGoiDvTamUng);
    return Object.keys(data).map((key, index1) => {
      return {
        title: `${t("common.phieu")} ${
          listTrangThaiGoiDvTamUng?.find((item) => item.id == key)?.ten || ""
        }`,
        id: index1 + "",
        key: index1 + "",
        isParent: true,
        children: data[key].map((item, index2) => {
          item.stt = index2 + 1;
          item.key = `${index1}_${index2}`;
          return item;
        }),
      };
    });
  }, [listThanhToanGoi, listTrangThaiGoiDvTamUng]);
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: HOTKEY.F1,
          onEvent: () => {
            onThemMoi();
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  const onThemMoi = () => {
    refModalThemMoiPhieuThuThanhToan.current &&
      refModalThemMoiPhieuThuThanhToan.current.show({}, () => {
        onSearch({
          dataSearch: { nbGoiDvId: thongTinNbGoiDv?.id },
        });
      });
  };

  // const onChangePage = (page) => {
  //   onSearch({ page: page - 1 });
  // };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const onHuyThanhToan = (item) => () => {
    refModalHuyThanhToanGoi.current &&
      refModalHuyThanhToanGoi.current.show({ item }, () => {
        onSearch({
          dataSearch: { nbGoiDvId: thongTinNbGoiDv?.id },
        });
      });
  };

  const inPhieuThu = (item) => {
    if (item.trangThai == 30) {
      //phiếu hoàn tiền
      onPhieuHoan({ nbGoiDvId: item?.nbGoiDvId }).then((s) => {
        if (s?.file?.pdf) printProvider.printPdf(s);
      });
    } else {
      onPhieuThu(item?.id).then((s) => {
        if (s?.file?.pdf) printProvider.printPdf(s);
      });
    }
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
    }),
    Column({
      title: t("common.soTien"),
      // sort_key: "maHoSo",
      // dataSort: dataSortColumn["tongTien"] || "",
      // onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tongTien",
      key: "tongTien",
      i18Name: "common.soTien",
      align: "right",
      render: (value, record) => {
        if (record.isParent) {
          return <div className="header-row">{record.title}</div>;
        }
        return value.formatPrice();
      },
    }),
    Column({
      title: t("common.kyHieu"),
      // sort_key: "soPhieu",
      // dataSort: dataSortColumn["soPhieu"] || "",
      // onClickSort: onClickSort,
      width: "120px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      i18Name: "common.kyHieu",
      align: "left",
    }),
    Column({
      title: t("goiDichVu.soPhieuDoiUng"),
      // sort_key: "soPhieuHoanUng",
      // dataSort: dataSortColumn["soPhieuHoanUng"] || "",
      onClickSort: onClickSort,
      width: "120px",
      // dataIndex: "tenDichVu",
      key: "soPhieuDoiUng",
      align: "left",
      i18Name: "goiDichVu.soPhieuDoiUng",
      render: (value, item) => {
        if (item.trangThai == TRANG_THAI_NB_GOI_DV_TAM_UNG.THANH_TOAN) {
          return item.soPhieuHoanUng;
        }
        return item.soPhieuTamUng;
      },
    }),
    Column({
      title: t("goiDichVu.ngayPhieuThu"),
      // sort_key: "thoiGianThucHien",
      // dataSort: dataSortColumn["thoiGianThucHien"] || "",
      // onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "goiDichVu.ngayPhieuThu",
      render: (value, item) =>
        item.thoiGianThucHien?.toDateObject().format("dd/MM/yyyy HH:mm:ss"),
    }),
    Column({
      title: t("goiDichVu.thuNgan"),
      // sort_key: "tenThuNgan",
      // dataSort: dataSortColumn["tenThuNgan"] || "",
      // onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      align: "left",
      i18Name: "goiDichVu.thuNgan",
    }),
    Column({
      title: t("common.trangThai"),
      // sort_key: "trangThai",
      // dataSort: dataSortColumn["trangThai"] || "",
      // onClickSort: onClickSort,
      width: "130px",
      dataIndex: "trangThai",
      key: "trangThai",
      i18Name: "goiDichVu.trangThaiDv",
      align: "center",
      render: (value) =>
        listTrangThaiGoiDvTamUng?.find((item) => item.id == value)?.ten || "",
    }),
    Column({
      title: t("common.lyDo"),
      // sort_key: "lyDo",
      // dataSort: dataSortColumn["lyDo"] || "",
      // onClickSort: onClickSort,
      width: "130px",
      dataIndex: "lyDo",
      key: "lyDo",
      i18Name: "common.lyDo",
      align: "left",
    }),
    Column({
      title: (
        <>
          {t("common.thaoTac")}
          <IcSetting className="icon" onClick={onSettings} />
        </>
      ),
      width: 100,
      key: "thaoTac",
      i18Name: "common.thaoTac",
      align: "right",
      fixed: "right",
      render: (value, item) => {
        if (item.isParent) return null;
        return (
          <div className="row-action">
            {item.trangThai == TRANG_THAI_NB_GOI_DV_TAM_UNG.THANH_TOAN &&
              ![
                TRANG_THAI_NB_GOI_DV.HUY_SU_DUNG,
                TRANG_THAI_NB_GOI_DV.DUNG_SU_DUNG,
                TRANG_THAI_NB_GOI_DV.KET_THUC,
              ].includes(thongTinNbGoiDv?.trangThai) &&
              !item.soPhieuHoanUng &&
              checkRole(isCancelPayment) && (
                <Tooltip title={t("goiDichVu.huyThanhToanGoi")}>
                  <IcReload onClick={onHuyThanhToan(item)} />
                </Tooltip>
              )}

            {item.trangThai != 20 && (
              <Tooltip title={t("common.inPhieu")}>
                <IcPrint onClick={() => inPhieuThu(item)} />
              </Tooltip>
            )}
          </div>
        );
      },
    }),
  ];
  const rowClassName = (record) => {
    if (record.isParent) return "row-parent";
    return "";
  };

  // const onShowSizeChange = (size) => {
  //   onSizeChange({ size });
  // };

  return (
    <>
      <Main noPadding={true}>
        <div className="tab-content-header">
          {t("goiDichVu.danhSachThanhToanGoi")}
          {checkRole(isSave) &&
            thongTinNbGoiDv.trangThai !== TRANG_THAI_NB_GOI_DV.KET_THUC && (
              <Button type="success" onClick={onThemMoi}>
                {t("common.themMoi")} [F1]
              </Button>
            )}
        </div>
        <TableWrapper
          key={dataSource.length}
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => `${record.key}`}
          expandable={{ defaultExpandAllRows: true }}
          scroll={{ x: 1200 }}
          rowClassName={rowClassName}
          tableName="table_GOIDV_ThanhToanGoi"
          ref={refSettings}
        />
        {/* {!!totalElements && (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listThanhToanGoi}
            total={totalElements}
            onShowSizeChange={onShowSizeChange}
          />
        )} */}
        <ModalThemMoiPhieuThuThanhToan ref={refModalThemMoiPhieuThuThanhToan} />
        <ModalHuyThanhToanGoi ref={refModalHuyThanhToanGoi} />
      </Main>
    </>
  );
};

export default ThanhToanGoi;
