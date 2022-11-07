import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row } from "antd";
import { TextField, SelectLargeData } from "components";
import { Title, DivInfo, SelectGroup } from "../styled";
import classNames from "classnames";
import { DEFAULT_CHAN_DOAN_KSK, MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";
const { SelectChanDoan } = SelectLargeData;

const ChanDoan = ({ handleSetData, layerId }) => {
  const { t } = useTranslation();
  const {
    infoNb,
    thongTinChiTiet: { nbChanDoan, nbChiSoSong, id },
  } = useSelector((state) => state.khamBenh);
  const listAllMaBenh = useSelector(
    (state) => state.maBenh.listAllMaBenh || []
  );

  const dataChiSoSongRef = useRef({ ...nbChiSoSong });

  const {
    maBenh: { getListAllMaBenh },
  } = useDispatch();

  const { cdSoBo, dsCdChinhId, dsCdKemTheoId, moTa } = nbChanDoan || {};

  const [dataSelect, setDataSelect] = useState({
    dsCdChinhId: [],
    dsCdKemTheoId: [],
  });
  const [heightSelect, setHeightSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });
  const selectFirstRef = useRef();
  const selectSecondRef = useRef();

  const isKsk = useMemo(() => {
    return infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;
  }, [infoNb]);

  useEffect(() => {
    getListAllMaBenh({ page: "", size: "" });
  }, []);

  const kskChanDoanIds = useMemo(() => {
    const _cdIds =
      listAllMaBenh.find((x) => x.ma == DEFAULT_CHAN_DOAN_KSK)?.id || null;

    return _cdIds ? [_cdIds] : [];
  }, [listAllMaBenh]);

  useEffect(() => {
    setHeightSelect({
      firstHeight: selectFirstRef.current.offsetHeight,
      secondHeight: selectSecondRef.current.offsetHeight,
    });
  }, [dataSelect]);

  useEffect(() => {
    setDataSelect({
      ...dataSelect,
      dsCdChinhId: isKsk && !dsCdChinhId ? kskChanDoanIds : dsCdChinhId,
      dsCdKemTheoId,
      moTa,
      cdSoBo,
    });

    if (isKsk && !dsCdChinhId) {
      handleSetData(["nbChanDoan", "dsCdChinhId"])(kskChanDoanIds);
    }
  }, [dsCdChinhId, dsCdKemTheoId, infoNb, isKsk, kskChanDoanIds]);

  const handleChangeChiSoSong = (key) => (value) => {
    dataChiSoSongRef.current = {
      ...dataChiSoSongRef.current,
      [key]: value || 0,
    };

    handleSetData(["nbChiSoSong", [key]])(value);
  };

  const handleChangeData = (key) => (values) => {
    if (
      (key === "dsCdChinhId" || key === "dsCdKemTheoId") &&
      values.length > MAX_NUMBER_SICK
    )
      return;

    setDataSelect({ ...dataSelect, [key]: values });
    handleSetData(["nbChanDoan", [key]])(values);
  };

  return (
    <Row>
      <Col md={24} className="paddingRight">
        <Title>II. {t("khamBenh.chanDoan.title")}</Title>
        <TextField
          className="input_custom"
          marginTop={5}
          onChange={handleChangeData("cdSoBo")}
          label={`1. ${t("khamBenh.chanDoan.chanDoanSoBo")}`}
          html={cdSoBo}
          maxLine={1}
          spanId="chan-doan-so-bo"
          maxLength={1000}
          refsChild={refElement}
          keyReload={"chan-doan"}
        />
        {/* {dataSelect?.cdSoBo?.length > 1000 && <div style={{color: "red"}}>Vui lòng nhập trường Chuẩn đoán sơ bộ không quá 1000 ký tự!</div>} */}
        <SelectGroup dataHeight={heightSelect.firstHeight}>
          <span
            className={classNames({
              "red-text": !dataSelect.dsCdChinhId?.length,
            })}
          >
            2. {t("khamBenh.chanDoan.chanDoanBenh")}:
          </span>
          <div className="select-box-chan-doan" ref={selectFirstRef}>
            <SelectChanDoan
              getPopupContainer={(trigger) => {
                return trigger;
              }}
              mode="multiple"
              maxItem={1}
              value={(dataSelect.dsCdChinhId || []).map((item) => item + "")}
              onChange={handleChangeData("dsCdChinhId")}
              style={{
                width: "100%",
              }}
            />
          </div>
        </SelectGroup>
        <SelectGroup dataHeight={heightSelect.secondHeight}>
          <span>3. {t("khamBenh.chanDoan.chanDoanKemTheo")}: </span>
          <div className="select-box-chan-doan" ref={selectSecondRef}>
            <SelectChanDoan
              getPopupContainer={(trigger) => {
                return trigger;
              }}
              mode="multiple"
              value={(dataSelect.dsCdKemTheoId || []).map((item) => item + "")}
              onChange={handleChangeData("dsCdKemTheoId")}
              style={{
                width: "100%",
              }}
            />
          </div>
        </SelectGroup>
        <TextField
          label={`4. ${t("khamBenh.chanDoan.moTaChiTiet")}`}
          onChange={(e) => {
            handleSetData(["nbChanDoan", "moTa"])(e);
            handleChangeData("moTa")(e);
          }}
          html={moTa}
          className="input_custom"
          marginTop={10}
          maxLength={2000}
          refsChild={refElement}
          keyReload={"chan-doan"}
        />
        {/* {dataSelect?.moTa?.length > 2000 && <div style={{color: "red"}}>Vui lòng nhập trường Mô tả chi tiết không quá 2000 ký tự!</div>} */}
      </Col>
    </Row>
  );
};

export default React.memo(ChanDoan);
