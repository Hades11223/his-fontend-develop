import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { HeaderSearch, ModalTemplate } from "components";
import TableWrapper from "components/TableWrapper";
import { useDispatch, useSelector } from "react-redux";
import IcUpload from "assets/svg/danhMuc/ic-upload.svg";
import IcDelete from "assets/svg/ic-delete.svg";
import moment from "moment";
import { PhienBanBieuMauStyled } from "./styled";
import fileUtils from "utils/file-utils";
import { refConfirm } from "app";
const ModalPhienBanBieuMau = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  const refModal = useRef(null);
  const refSettings = useRef(null);

  const {
    baoCao: { getLichSuBaoCao, deleteLichSuBaoCao },
  } = useDispatch();
  const {
    baoCao: { listLichSuBaoCao = [] },
  } = useSelector((state) => state);

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  useImperativeHandle(ref, () => ({
    show: async (baoCaoId) => {
      try {
        await getLichSuBaoCao({ baoCaoId });
        setState({ show: true });
      } catch (error) {
        console.log(error);
      }
    },
  }));
  const onOK = (isOk) => () => {
    if (isOk) {
    } else {
    }
    setState({ show: false });
  };
  useEffect(() => {
    if (state.show) {
      refModal.current.show();
    } else {
      refModal.current.hide();
    }
  }, [state.show]);
  const dataSortColumn = {};
  const onClickSort = () => {};
  const handleDowload = (item) => {
    fileUtils.downloadFile(item.mauBaoCao);
  };
  const handleDelete = (item) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.thongBao"),
          content: `${t("common.banCoChacMuonXoa")}`,
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-warning",
          showImg: true,
          showBtnOk: true,
          typeModal: "warning",
        },
        () => {
          debugger;
          deleteLichSuBaoCao(item.id);
        }
      );
  };
  const columns = [
    {
      title: <HeaderSearch title={t("danhMuc.tenPhienBan")} sort_key="ten" />,
      width: 200,
      dataIndex: "ten",
    },
    {
      title: <HeaderSearch title={t("danhMuc.loaiPhienBan")} />,
      width: 200,
      dataIndex: "bieuMauGoc",
      render: (data, item) => {
        return item.bieuMauGoc
          ? t("danhMuc.phienBanGoc")
          : t("danhMuc.phienBanTaiLen");
      },
    },
    {
      title: <HeaderSearch title={t("danhMuc.tepBieuMau")} />,
      width: 200,
      dataIndex: "mauBaoCao",
      render: (data) => {
        const tenMau = data.split("/") || [];
        return (
          <span style={{ color: "#2F80ED" }}>
            {tenMau[tenMau.length - 1] || ""}
          </span>
        );
      },
    },
    {
      title: <HeaderSearch title={t("danhMuc.ngayTao")} />,
      width: 200,
      dataIndex: "thoiGianTao",
      render: (data, item) => {
        return moment(data).format("DD/MM/YYYY hh:mm");
      },
    },
    {
      title: <HeaderSearch title={t("danhMuc.nguoiTao")} />,
      width: 200,
      dataIndex: "nguoiThucHien",
      align: "center",
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: 100,
      dataIndex: "id",
      render: (data, item) => {
        return (
          <div className="action">
            <IcUpload
              className="ic-upload"
              onClick={() => handleDowload(item)}
            ></IcUpload>
            <IcDelete
              className="ic-delete"
              onClick={() => handleDelete(item)}
            ></IcDelete>
          </div>
        );
      },
    },
  ];
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("danhMuc.phienBanBieuMau")}
      width={1500}
    >
      <PhienBanBieuMauStyled>
        <TableWrapper
          columns={columns}
          dataSource={listLichSuBaoCao}
          scroll={{ x: false, y: 400 }}
          tableName="table_phienBanBieuMau"
          ref={refSettings}
          styleWrap={{ height: 400 }}
        ></TableWrapper>
      </PhienBanBieuMauStyled>
    </ModalTemplate>
  );
};
export default forwardRef(ModalPhienBanBieuMau);
