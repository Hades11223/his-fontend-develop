import React, { useEffect, useRef, memo } from "react";
import { Main } from "./styled";
import { PrinterOutlined } from "@ant-design/icons";
import { firstLetterWordUpperCase } from "utils";
import { useDispatch } from "react-redux";
import IconSave from "assets/images/thuNgan/icSave.png";
import { useTranslation } from "react-i18next";
import FormChuyenVien from "pages/khamBenh/KetLuan/FormChuyenVien";
import fileUtils from "utils/file-utils";
import { printJS } from "data-access/print-provider";
import { Button, ModalTemplate } from "components";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ModalChuyenVien = ({
  refModalChuyenVien,
  infoNb,
  thongTinChiTiet,
  refreshList = () => {},
}) => {
  const refData = useRef({});
  const {
    benhVien: { getListAllBenhVien },
    maBenh: { getListAllMaBenh },
    quanLyNoiTru: { updateGiayChuyenVien },
    nbChuyenVien: { inPhieuChuyenVienById, taoMoiGiayChuyenTuyen },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { t } = useTranslation();

  useEffect(() => {
    refData.current = thongTinChiTiet;
  }, [thongTinChiTiet]);

  useEffect(() => {
    getListAllBenhVien({ page: "", size: "" });
    getListAllMaBenh({ page: "", size: "" });
  }, []);
  const gioiTinh =
    (listGioiTinh || []).find((item) => item.id === infoNb?.gioiTinh) || {};

  const handleClickBack = () => {
    setTimeout(() => refModalChuyenVien.current.hide(), 50);
  };
  const handleClickNext = () => {
    let data = {};
    Object.values(refData.current).forEach((item) => {
      data = {
        ...data,
        ...item,
      };
    });
    const {
      active,
      createdAt,
      createdBy,
      updatedBy,
      updatedAt,
      dieuTriTai1,
      dieuTriTai2,
      vienChuyenDen,
      ...payload
    } = data;

    function onReloadNb() {
      getNbNoiTruById(payload.nbDotDieuTriId);
      refreshList && refreshList();
      setTimeout(() => refModalChuyenVien.current.hide(), 50);
    }

    if (payload.id) {
      updateGiayChuyenVien(payload).then((s) => {
        onReloadNb();
      });
    } else {
      taoMoiGiayChuyenTuyen({ ...payload, loai: payload.loai || 10 }).then(
        () => {
          onReloadNb();
        }
      );
    }
  };
  const handlePrint = () => {
    inPhieuChuyenVienById(thongTinChiTiet?.nbChuyenVien?.id).then((s) => {
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(s.file.pdf) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: "application/pdf",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          printJS({
            printable: blobUrl,
            type: "pdf",
          });
        });
    });
  };
  const handleSetData = (arrKey) => (e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;
    const [key1, key2] = arrKey;
    if (key2) {
      refData.current = {
        ...refData.current,
        [key1]: refData.current[key1]
          ? {
              ...refData.current[key1],
              [key2]: value,
            }
          : { [key2]: value },
      };
    } else {
      refData.current = {
        ...refData.current,
        [key1]: value,
      };
    }
  };
  return (
    <ModalTemplate
      width={1140}
      ref={refModalChuyenVien}
      closable={true}
      title={t("quanLyNoiTru.giayChuyenTuyen")}
      rightTitle={
        <span className="header-right" style={{ marginRight: "20px" }}>
          <span className="font-color">
            {firstLetterWordUpperCase(infoNb?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {infoNb?.tuoi && (
            <span className="normal-weight">
              - {infoNb?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </span>
      }
      actionLeft={
        <Button height={30} minWidth={60} onClick={handleClickBack}>
          {t("common.quayLai")}
        </Button>
      }
      actionRight={
        <>
          <Button onClick={handlePrint}>
            In <PrinterOutlined />
          </Button>
          <Button type="primary" onClick={handleClickNext}>
            <span>
              <span className="btn-checkout">
                <span className="btn-checkout__text">{t("common.luu")} </span>
                <img
                  style={{ maxHeight: "20px" }}
                  src={IconSave}
                  alt={IconSave}
                />
              </span>
            </span>
          </Button>
        </>
      }
    >
      <Main>
        <FormChuyenVien
          handleSetData={handleSetData}
          infoNb={infoNb}
          thongTinChiTiet={thongTinChiTiet}
        ></FormChuyenVien>
      </Main>
    </ModalTemplate>
  );
};

export default memo(ModalChuyenVien);
