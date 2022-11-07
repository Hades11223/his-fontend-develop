import { Tooltip, Popover } from "antd";
import React, { useEffect, useRef } from "react";
import RankGoldIcon from "assets/svg/hoSoBenhAn/rankGold.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { Main } from "./styled";
import FolderUpload from "assets/svg/drive_folder_upload.svg";
import { useDispatch, useSelector } from "react-redux";
import fileUtils from "utils/file-utils";
import ModalChinhSuaThongTin from "../../../../tiepDon/TiepDon/ModalChinhSuaThongTin";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import ModalFolderAndFile from "components/ModalFolderAndFile";
const TTCoBan = () => {
  const { t } = useTranslation();
  const refModalChinhSuaThongTin = useRef(null);
  const {
    hangTheId,
    tenHangThe,
    iconHangThe,
    diemToiThieu,
    diaChi,
    tuoi,
    soDienThoai,
    gioiTinh,
    tenNb,
    maNb,
    id,
    nbThongTinId,
  } = useSelector((state) => state.nbDotDieuTri.thongTinBenhNhan || {});

  const { listgioiTinh } = useSelector((state) => state.utils);
  const {
    utils: { getUtils },
    nbDotDieuTri: { getById },
  } = useDispatch();
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  const refModalFoderAndFile = useRef(null);
  const onEdit = (isEdit) => () => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show({ id: id, isEdit }, () => {
        message.success(t("common.daLuuDuLieu"));
        getById(id);
      });
  };
  return (
    <Main>
      <div className="left">
        <div>
          {hangTheId ? (
            <Popover
              placement="topRight"
              content={tenHangThe + ": " + diemToiThieu + ` ${t("hsba.diem")}`}
            >
              <img
                src={`${fileUtils.absoluteFileUrl(iconHangThe)}`}
                alt=""
                style={{ width: "35px", height: "35px" }}
              />
            </Popover>
          ) : (
            <RankGoldIcon style={{ width: "35px", height: "35px" }} />
          )}{" "}
        </div>
        <div className="ma-nb ml2">
          {t("common.maNb")}: {maNb}
        </div>

        <div className="tt-nb ml2" onClick={onEdit(false)}>
          <b className="ten-nb">{tenNb}</b> (
          {listgioiTinh?.find((item) => item.id === gioiTinh)?.ten} - {tuoi}{" "}
          {t("common.tuoi")}) - {t("common.sdt")}: {soDienThoai} -{" "}
          {t("common.maNb")}: {maNb} - {diaChi}
        </div>
      </div>
      <div className="right">
        <Tooltip title={"Thư mục"}>
          <FolderUpload
            className="icon-folder"
            onClick={() => {
              refModalFoderAndFile.current &&
                refModalFoderAndFile.current.show({
                  nbThongTinId: nbThongTinId,
                });
            }}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title={t("hsba.capNhatThongTin")}>
          <EditIcon
            onClick={onEdit(true)}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </Tooltip>
      </div>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
      <ModalFolderAndFile ref={refModalFoderAndFile}></ModalFolderAndFile>
    </Main>
  );
};

export default TTCoBan;
