import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Collapse, Form } from "antd";
import { Main, Header, Content } from "./styled";
import IcEx from "assets/images/xetNghiem/icEx.svg";
import IcArrow from "assets/images/xetNghiem/icArrow.svg";
import ThongTinChung from "../../chiTietDichVu/thongTinChung";
import FormContent from "./components/formContent";
import KetLuan from "./components/ketLuan";
import NhomChiSoCon from "./components/nhomChiSoCon";
import Select from "components/Select";
import { TRANG_THAI, SERVICE_STATUS } from "../../configs";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import printProvider from "data-access/print-provider";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

const { Panel } = Collapse;

const ThongTinDichVu = ({ layerId, infoDichVu }) => {
  const { t } = useTranslation();
  const [listPhanLoaiKetQuaXetNghiem] = useEnum(
    ENUM.PHAN_LOAI_KET_QUA_XET_NGHIEM
  );
  const {
    mauKetQuaXN: { listDataTongHop: listMauKetQuaXN },
    maMay: { listDataTongHop },
  } = useSelector((state) => state);
  const {
    mauKetQuaXN: { getDataTongHop: getListMauKetQua },
    maMay: { getDataTongHop },
    xetNghiem: { updateKetQuaXetNghiem },
    layMauXN: { xacNhanlayMau },
    xnGiaiPhauBenhViSinh: {
      xacNhanKetQua,
      duyetKetQua,
      xacNhanTiepNhanMau,
      updateData,
      getDsDichVuChiDinhXN,
      getPhieuKetQua,
    },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [openPopup, setOpenPopup] = useState(false);
  const [mauSelected, setMauSelected] = useState({});
  const [dsChiSoCon, setDsChiSoSon] = useState([]);
  const [form] = Form.useForm();
  const isDisabled = infoDichVu.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  const [status, setStatus] = useState(null);
  const refNotification = useRef(null);

  useEffect(() => {
    getListMauKetQua({ page: 0, size: 1000, active: true });
    getDataTongHop({ page: 0, size: 1000, active: true });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 27, //ESC
          onEvent: () => {
            setOpenPopup(false);
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (infoDichVu.trangThai) {
      setStatus(infoDichVu.trangThai);
    }
  }, [infoDichVu.trangThai]);

  const onClickViewDetail = () => {
    setOpenPopup(!openPopup);
  };

  const handleChangeMauKetQua = (value) => {
    const itemSelected = listMauKetQuaXN.find((item) => item.id === value);
    setMauSelected(itemSelected);
  };
  const handleClickSave = () => {
    form
      .validateFields()
      .then((values) => {
        values = { ...values, dsChiSoCon };
        if (infoDichVu.id) {
          updateKetQuaXetNghiem([{ id: infoDichVu.id, ...values }]).then(
            (s) => {
              updateData({ infoDichVu: s[0] });
            }
          );
        }
      })
      .catch((err) => {});
  };

  const showInfo = (data) => {
    setDsChiSoSon(data);
  };

  const listPanel = [
    {
      header: (
        <div>
          {infoDichVu.nhomDichVuCap2Id == 66
            ? t("xetNghiem.viSinhKySinhTrung")
            : t("xetNghiem.giaiPhauBenh")}
        </div>
      ),
      content: <FormContent infoDichVu={infoDichVu} form={form} />,
      key: 1,
    },
    {
      header: (
        <div>
          {t("common.ketLuan")}{" "}
          <Select
            placeholder={t("xetNghiem.chonMauKetLuan")}
            data={listMauKetQuaXN}
            onChange={handleChangeMauKetQua}
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={isDisabled}
          />
        </div>
      ),
      content: (
        <>
          <KetLuan
            infoDichVu={infoDichVu}
            mauSelected={mauSelected}
            listDataTongHop={listDataTongHop}
            form={form}
            listPhanLoaiKetQuaXetNghiem={listPhanLoaiKetQuaXetNghiem}
          />
          <NhomChiSoCon
            infoDichVu={infoDichVu}
            showInfo={showInfo}
            listPhanLoaiKetQuaXetNghiem={listPhanLoaiKetQuaXetNghiem}
          />
        </>
      ),
      key: 2,
    },
  ];

  const handleSubmit = (status) => () => {
    xacNhanTiepNhanMau({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getDsDichVuChiDinhXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }

      if (res.code == 7609) {
        refNotification.current &&
          refNotification.current.show({
            title: t("common.thongBao"),
            content: res.message,
            okText: t("common.dong"),
            classNameOkText: "button-closel",
            showBtnOk: true,
          });
      }
    });
  };
  const handleCancel = (status) => () => {
    xacNhanlayMau({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getDsDichVuChiDinhXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }
    });
  };
  const onResult = (status) => () => {
    xacNhanKetQua({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getDsDichVuChiDinhXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }
    });
  };
  const onConfirmResult = (status) => () => {
    duyetKetQua({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        if (res.code === 0) {
          const newInfoDichVu = {
            ...infoDichVu,
            trangThai: res?.data?.[0]?.trangThai,
          };
          updateData({ infoDichVu: newInfoDichVu });
          getDsDichVuChiDinhXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
        }
      }
    });
  };

  const onPriviewPdf = () => {
    getPhieuKetQua({}).then((s) => {
      let data = s.map((item) => {
        return item.file.pdf;
      });
      printProvider.printMergePdf(data);
    });
  };

  return (
    <Main>
      <Header>
        <div className="header-left">
          <div className="header-left__title">
            <div>
              {t("common.dichVu")}:{" "}
              <span className="header-left__title--bold">
                {infoDichVu.maDichVu}
                {infoDichVu.tenDichVu && ` - ${infoDichVu.tenDichVu}`}
              </span>
            </div>
            <div>
              {t("xetNghiem.chanDoanSoBo")}:{" "}
              <span className="header-left__title--bold">
                {infoDichVu.cdSoBo}
              </span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="header-right__detail">
            {t("xetNghiem.chiTietDichVu")} <IcEx onClick={onClickViewDetail} />
            <IcArrow
              style={{ display: openPopup ? "block" : "none" }}
              className="header-right__arrow"
            />
            <div className="header-right__popup">
              <ThongTinChung
                style={{ display: openPopup ? "block" : "none" }}
                data={infoDichVu}
              />
            </div>
          </span>

          {TRANG_THAI["XAC_NHAN_TIEP_NHAN_MAU"].includes(status) && (
            <>
              {checkRole([ROLES["XET_NGHIEM"].TIEP_NHAN_MAU_GPB]) && (
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={handleSubmit("accept")}
                >
                  {t("xetNghiem.tiepNhanMau")}
                </Button>
              )}
              {checkRole([ROLES["XET_NGHIEM"].HUY_MAU_GPB]) && (
                <Button
                  className="header-right__btn"
                  onClick={handleCancel("cancel")}
                >
                  {t("xetNghiem.huyMau")}
                </Button>
              )}
            </>
          )}

          {TRANG_THAI["XAC_NHAN_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={handleSubmit("cancel")}
                >
                  {t("xetNghiem.huyTiepNhanMau")}
                </Button>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={onResult("accept")}
                >
                  {t("xetNghiem.coKetQua")}
                </Button>
              </>
            )}
          {TRANG_THAI["CO_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].DUYET_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn"
                  onClick={onResult("cancel")}
                >
                  {t("xetNghiem.huyKetQua")}
                </Button>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={onConfirmResult("accept")}
                >
                  {t("xetNghiem.duyetKetQua")}
                </Button>
              </>
            )}
          {TRANG_THAI["DUYET_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].HUY_DUYET_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn"
                  onClick={onConfirmResult("cancel")}
                >
                  {t("xetNghiem.huyDuyetKetQua")}
                </Button>
              </>
            )}
          {TRANG_THAI["IN"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].IN_KET_QUA_GPB]) && (
              <Button
                className="header-right__btn"
                onClick={() => onPriviewPdf()}
              >
                {t("xetNghiem.inKetQua")}
              </Button>
            )}
          {TRANG_THAI["SAVE"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_GPB]) && (
              <Button
                className="header-right__btn"
                onClick={handleClickSave}
                disabled={!infoDichVu.id}
              >
                {t("xetNghiem.luuLai")}
              </Button>
            )}
        </div>
      </Header>
      <Content>
        <Collapse defaultActiveKey={["1", "2"]} expandIconPosition="right">
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </Collapse>
      </Content>
      <ModalNotification ref={refNotification} />
    </Main>
  );
};

export default ThongTinDichVu;
