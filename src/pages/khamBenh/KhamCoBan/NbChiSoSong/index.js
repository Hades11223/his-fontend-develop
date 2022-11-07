import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { TextField, Select } from "components";
import { Title, DivInfo, SelectGroup } from "../styled";
import { useDispatch } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";

const NbChiSoSong = ({ handleSetData, layerId }) => {
  const { t } = useTranslation();

  const nbChiSoSong = useStore("khamBenh.thongTinChiTiet.nbChiSoSong", {});
  const khoaChiDinhId = useStore(
    "khamBenh.thongTinChiTiet.nbDichVu.khoaChiDinhId",
    null
  );
  const listDataTongHop = useStore("chiSoSong._listDataTongHop", []);
  const dataChiSoSongRef = useRef({ ...nbChiSoSong });
  const [listNhomMau] = useEnum(ENUM.NHOM_MAU);
  const {
    maBenh: { getListAllMaBenh },
    chiSoSong: { _getListTongHop },
  } = useDispatch();

  const [dataSelect, setDataSelect] = useState({});

  useEffect(() => {
    getListAllMaBenh({ page: "", size: "" });
  }, []);
  useEffect(() => {
    if (khoaChiDinhId) _getListTongHop({ dsKhoaId: khoaChiDinhId });
  }, [khoaChiDinhId]);
  useEffect(() => {
    let dsChiSoSongKhac = listDataTongHop.map((item) => ({
      chiSoSongId: item.id,
      giaTri: nbChiSoSong?.dsChiSoSongKhac?.find(
        (x) => x.chiSoSongId === item?.id
      )?.giaTri,
      ten: item?.ten,
      donVi: item?.donVi,
    }));
    setDataSelect({
      ...nbChiSoSong,
      dsChiSoSongKhac: dsChiSoSongKhac,
    });
  }, [nbChiSoSong, listDataTongHop]);

  const handleChangeChiSoSong = (key) => (value) => {
    dataChiSoSongRef.current = {
      ...dataChiSoSongRef.current,
      [key]: value || 0,
    };
    setDataSelect({ ...dataSelect, [key]: value });
    handleSetData(["nbChiSoSong", [key]])(value);
  };

  const handleChangeChiSoSongKhac = (key, e, a) => (value, item, index) => {
    dataSelect[key][index].giaTri = value;
    setDataSelect({ ...dataSelect });
    handleSetData(["nbChiSoSong", [key]])(
      dataSelect.dsChiSoSongKhac.filter((x) => x.giaTri)
    );
  };
  return (
    <Row>
      <Col md={6}>
        <Title>III. {t("khamBenh.sinhHieu")}</Title>
        <DivInfo>
          <TextField
            label={t("khamBenh.chanDoan.mach")}
            spanId="mach-chan-doan"
            nextInputByTabKey={"nhiet-do-chan-doan"}
            html={nbChiSoSong?.mach}
            maxLine={1}
            maxLength={4}
            style={{ width: 100 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("mach")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="number"
            max={999}
          />
          <span>{t("khamBenh.chanDoan.lanPhut")}</span>
        </DivInfo>
        <DivInfo maxWidth={177}>
          <TextField
            label={t("khamBenh.chanDoan.canNang")}
            spanId="can-nang-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.canNang}
            style={{ width: 120 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("canNang")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="numberFormat"
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < 1000;
            }}
          />
          <span>kg</span>
        </DivInfo>
      </Col>
      <Col md={6} style={{ marginTop: 40 }}>
        <DivInfo>
          <TextField
            label={t("khamBenh.chanDoan.nhietDo")}
            spanId="nhiet-do-chan-doan"
            nextInputByTabKey={"huyet-ap-chan-doan"}
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.nhietDo}
            style={{ width: 120 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("nhietDo")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="numberFormat"
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < 1000;
            }}
          />
          <span>
            <sup>0</sup>C
          </span>
        </DivInfo>
        <DivInfo maxWidth={177}>
          <TextField
            label={t("khamBenh.chanDoan.chieuCao")}
            spanId="chieu-cao-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.chieuCao}
            style={{ width: 120 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("chieuCao")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="numberFormat"
          />
          <span>cm</span>
        </DivInfo>
      </Col>
      <Col md={6} style={{ marginTop: 40 }}>
        <DivInfo>
          <TextField
            label={t("khamBenh.chanDoan.huyetAp")}
            spanId="huyet-ap-chan-doan"
            nextInputByTabKey="sub-huyet-ap-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.huyetApTamThu}
            style={{ width: 100 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("huyetApTamThu")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="number"
            max={999}
          />
          <TextField
            label="/"
            spanId="sub-huyet-ap-chan-doan"
            nextInputByTabKey="nhip-tho-chan-doan"
            maxLine={1}
            maxLength={4}
            style={{ width: 50 }}
            html={nbChiSoSong?.huyetApTamTruong}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("huyetApTamTruong")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="number"
            max={999}
            displayColon={false}
          />
          <span> mmHg</span>
        </DivInfo>
        <DivInfo maxWidth={177}>
          <TextField
            label="BMI"
            spanId="bmi-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.bmi}
            style={{ width: 100 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("bmi")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="number"
            readOnly={true}
          />
        </DivInfo>
      </Col>
      <Col md={6} className="paddingLeft" style={{ marginTop: 40 }}>
        <DivInfo maxWidth={177}>
          <TextField
            label={t("khamBenh.chanDoan.nhipTho")}
            spanId="nhip-tho-chan-doan"
            nextInputByTabKey="can-nang-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.nhipTho}
            style={{ width: 100 }}
            // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("nhipTho")}
            refsChild={refElement}
            keyReload={"nb-chi-so-song"}
            type="number"
            max={999}
          />
          <span>{t("khamBenh.chanDoan.lanPhut")}</span>
        </DivInfo>
        <DivInfo maxWidth={177}>
          <SelectGroup style={{ marginTop: "0" }}>
            <span>{t("khamBenh.chanDoan.nhomMau")}: </span>
            <div className="select-box-chan-doan">
              <Select
                data={listNhomMau}
                onChange={handleChangeChiSoSong("nhomMau")}
                style={{ width: "100%" }}
                value={dataSelect?.nhomMau}
              />
            </div>
          </SelectGroup>
        </DivInfo>
      </Col>
      {(dataSelect?.dsChiSoSongKhac || []).map((item, index) => {
        return (
          <Col
            md={6}
            key={index}
            className={`${(index + 1) % 4 === 0 ? "paddingLeft" : ""}`}
          >
            <DivInfo>
              <TextField
                label={item.ten}
                spanId="nhip-tho-chan-doan"
                nextInputByTabKey="can-nang-chan-doan"
                maxLine={1}
                maxLength={4}
                html={item?.giaTri}
                style={{ maxWidth: 130 }}
                styleLabel={{ maxWidth: 100 }}
                onChange={(e) =>
                  handleChangeChiSoSongKhac("dsChiSoSongKhac")(e, item, index)
                }
                refsChild={refElement}
                keyReload={"nb-chi-so-song"}
                regexSymbols={true}
              />
              <span>{item.donVi}</span>
            </DivInfo>
          </Col>
        );
      })}
    </Row>
  );
};

export default React.memo(NbChiSoSong);
