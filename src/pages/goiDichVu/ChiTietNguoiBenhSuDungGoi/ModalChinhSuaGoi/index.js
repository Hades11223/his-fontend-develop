import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ModalTemplate, Button, InputTimeout, TableWrapper } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Checkbox, Tooltip, InputNumber } from "antd";
import IcDelete from "assets/svg/ic-delete.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import ModalThemMoiGoi from "pages/goiDichVu/DanhSachSuDungGoi/ModalThemMoiGoi";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";

const { Column } = TableWrapper;

const ModalChinhSuaGoi = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  const refSettings = useRef(null);
  const refModalThemMoiGoi = useRef(null);
  const [state, _setState] = useState({
    dsDvUpdate: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    listDvTrongGoi,
    // totalElements, page, size
  } = useSelector((state) => state.dichVuTrongGoi);

  const {
    dichVuTrongGoi: { onSearch, deleteDvTrongGoi, traNhieuDichVu },
    nbGoiDv: { getById },
  } = useDispatch();
  const { thongTinNbGoiDv } = useSelector((state) => state.nbGoiDv);

  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.map((item) => {
      item.ten = t(item.i18n);
      return item;
    });
    return list;
  }, [t]);
  useImperativeHandle(ref, () => ({
    show: ({ nbDotDieuTriId, currentItem }, callback) => {
      setState({
        show: true,
        nbDotDieuTriId,
        currentItem,
        tenGoiDv: currentItem?.tenGoiDv || "",
      });
      refCallback.current = callback;

      onSearch({
        page: "",
        size: "",
        isGetAll: true,
        dataSearch: {
          nbThongTinId: thongTinNbGoiDv?.nbThongTinId,
          nbGoiDvId: thongTinNbGoiDv?.id,
        },
      });
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOK = (isOk) => async () => {
    if (isOk) {
      traNhieuDichVu(
        (state.dsDvUpdate || []).map((x) => ({
          id: x.id,
          soLuongTra: x.soLuongTra,
        }))
      ).then(() => {
        refCallback.current && refCallback.current();
        setState({ show: false });
      });
    } else setState({ show: false });
  };

  const onRow = (record = {}, index) => {
    return {
      onClick: () => {},
    };
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const onAddDv = () => {
    refModalThemMoiGoi.current &&
      refModalThemMoiGoi.current.show(
        {
          // loaiDichVu: state.loaiDichVu,
          dsDoiTuongSuDung: [],
          // nbThongTinId: infoPatient.nbThongTinId,
          // nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
          // khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
          // chiDinhTuDichVuId: currentToDieuTri.id,
          currentItem: state.currentItem,
          chiDinhTuLoaiDichVu: 210,
          listLoaiChiDinhDV: listLoaiChiDinhDV,
        },
        () => {
          onRefreshList();
        }
      );
  };

  const onRefreshList = () => {
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
  };

  const onDeleteDv = (item) => () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Cảnh báo",
          content: `Xóa dịch vụ ${item?.tenDichVu}?`,
          cancelText: "Đóng",
          okText: "Xóa",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deleteDvTrongGoi(item.id).then((s) => {
            onRefreshList();
          });
        },
        () => {}
      );
  };

  const onChangeSoLuongTra = (item) => (e) => {
    let dsDvUpdate = state.dsDvUpdate || [];
    const _index = dsDvUpdate.findIndex((x) => x.id === item.id);
    if (_index > -1) {
      dsDvUpdate[_index].soLuongTra = e;
    } else {
      dsDvUpdate.push({ ...item, soLuongTra: e });
    }

    setState({ dsDvUpdate });
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
      title: t("common.maDv"),
      sort_key: "maDichVu",
      // dataSort: dataSortColumn["maDichVu"] || "",
      // onClickSort: onClickSort,
      width: "150px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      i18Name: "common.maDv",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapMaDichVu")}
          onChange={(e) => {
            // onChangeInputSearch({ isGetAll: true, maDv: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.tenDichVu"),
      sort_key: "tenDichVu",
      // dataSort: dataSortColumn["tenDichVu"] || "",
      // onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      i18Name: "common.tenDichVu",
      renderSearch: (
        <InputTimeout
          placeholder={t("common.nhapTenDichVu")}
          onChange={(e) => {
            // onChangeInputSearch({ isGetAll: true, tenDichVu: e });
          }}
        />
      ),
    }),
    Column({
      title: t("common.soLuong"),
      sort_key: "soLuong",
      // dataSort: dataSortColumn["soLuong"] || "",
      // onClickSort: onClickSort,
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: "common.soLuong",
      align: "center",
    }),
    Column({
      title: t("goiDichVu.soLuongDaSuDung"),
      sort_key: "soLuongDaDung",
      // dataSort: dataSortColumn["soLuongDaDung"] || "",
      // onClickSort: onClickSort,
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
      width: "80px",
      key: "soLuongTra",
      i18Name: "goiDichVu.soLuongTra",
      align: "center",
      dataIndex: "soLuongTra",
      render: (field, item, index) => {
        const soLuongConLai = (item?.soLuong || 0) - (item?.soLuongDaDung || 0);

        return (
          <InputNumber
            defaultValue={field}
            max={soLuongConLai}
            min={0}
            onChange={onChangeSoLuongTra(item)}
          />
        );
      },
    }),
    Column({
      title: "Giá niêm yết",
      width: "100px",
      dataIndex: "giaNiemYet",
      key: "giaNiemYet",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: "Giá sau giảm",
      width: "100px",
      dataIndex: "giaSauGiam",
      key: "giaSauGiam",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: "Thành tiền",
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      render: (value) => {
        return <div>{(value || 0).formatPrice()}</div>;
      },
    }),
    Column({
      title: "Thuộc miễn giảm cả gói",
      width: "120px",
      dataIndex: "thuocMienGiamCaGoi",
      key: "thuocMienGiamCaGoi",
      align: "center",
      render: (value, item, index) => {
        return <Checkbox checked={value}></Checkbox>;
      },
    }),
    Column({
      title: (
        <>
          {t("common.thaoTac")}
          <IcSetting onClick={onSettings} className="icon" />
        </>
      ),
      width: "100px",
      i18Name: "common.thaoTac",
      align: "center",
      fixed: "right",
      render: (item) => {
        return (
          <>
            <Tooltip title={`Xóa dịch vụ`}>
              <IcDelete onClick={onDeleteDv(item)} className="ic-action" />
            </Tooltip>
          </>
        );
      },
    }),
  ];

  return (
    <ModalTemplate
      width={"80%"}
      ref={refModal}
      title={"Chỉnh sửa gói"}
      closeable={false}
      onCancel={onOK(false)}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<CheckCircleOutlined />}
          iconHeight={15}
          disabled={(state.dsDvUpdate || []).every((x) => x.soLuongTra === 0)}
          onClick={onOK(true)}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <Main>
        <div className="header-box">
          <div className="ten-goi">
            <label>Tên gói:</label>
            <InputTimeout
              className="name-item"
              placeholder={"Nhập tên gói dịch vụ"}
              onChange={(e) => {
                setState({ tenGoiDv: e || "" });
              }}
              value={state.tenGoiDv}
            />
          </div>

          <div>
            <Button
              rightIcon={<PlusCircleOutlined />}
              onClick={onAddDv}
              type="success"
            >
              {t("goiDichVu.themDV")}
            </Button>
          </div>
        </div>

        <div className="table-content">
          <TableWrapper
            title="Dịch vụ thuộc gói"
            classNameRow={"table-content-header"}
            columns={columns}
            dataSource={listDvTrongGoi || []}
            onRow={onRow}
            ref={refSettings}
            styleWrap={{ height: "100%" }}
            tableName="table_GOIDV_ChinhSua_DichVuTrongGoi"
          ></TableWrapper>
        </div>
      </Main>

      <ModalThemMoiGoi ref={refModalThemMoiGoi} />
    </ModalTemplate>
  );
});
export default ModalChinhSuaGoi;
