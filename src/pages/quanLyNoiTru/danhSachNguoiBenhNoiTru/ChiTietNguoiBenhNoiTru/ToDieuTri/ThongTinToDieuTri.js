import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Row, Col } from "antd";
import { MainToDieuTri, SelectGroup } from "./styled";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SelectLargeData, Select, TextField, DateTimePicker } from "components";
import { orderBy } from "lodash";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
const { SelectChanDoan } = SelectLargeData;

const ThongTinToDieuTri = (props, ref) => {
  const history = useHistory();
  const { t } = useTranslation();
  const _listDataTongHop = useStore("mauDienBien._listDataTongHop", []);
  const listNhanVien = useStore("nhanVien.listNhanVien", []);
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const listToDieuTri = useStore("toDieuTri.listToDieuTri", []);
  const {
    auth: { nhanVienId },
  } = useStore("auth", {});
  const listAllCheDoChamSoc = useStore("cheDoChamSoc._listDataTongHop", []);

  const { _getListTongHop } = useDispatch().mauDienBien;
  const {
    maBenh: { getListAllMaBenh },
  } = useDispatch();
  const { _getListTongHop: getListAllCheDoChamSoc } =
    useDispatch().cheDoChamSoc;

  const { updateData: updataDataToDieuTri } = useDispatch().toDieuTri;
  const { currentToDieuTri, isReadonly } = props;
  const [state, _setState] = useState({
    thoiGianYLenh: moment(),
    thoiGianKham: moment(),
    bacSiDieuTriId: null,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListAllCheDoChamSoc({ active: true, page: "", size: "" });
    getListAllMaBenh({ page: "", size: "", active: true });
  }, []);
  useEffect(() => {
    if (currentToDieuTri) {
      setState({
        cheDoAn: currentToDieuTri?.cheDoAn,
        bacSiTrucId: currentToDieuTri?.bacSiTrucId,
        bacSiDieuTriId: currentToDieuTri?.bacSiDieuTriId,
        ghiChu: currentToDieuTri?.ghiChu,
        dsCdKemTheoId: currentToDieuTri?.dsCdKemTheoId,
        dienBienBenh: currentToDieuTri?.dienBienBenh,
        moTa: currentToDieuTri?.moTa,
        dsCdChinhId: currentToDieuTri?.dsCdChinhId,
        thoiGianYLenh: moment(currentToDieuTri?.thoiGianYLenh),
        thoiGianKham: moment(currentToDieuTri?.thoiGianKham),
        cheDoChamSocId: currentToDieuTri?.cheDoChamSocId,
      });
    }
  }, [currentToDieuTri]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return state;
    },
  }));

  useEffect(() => {
    if (currentToDieuTri) return null;
    let toDieuTri = orderBy(listToDieuTri, "thoiGianYLenh", "desc");

    if (toDieuTri.length) {
      setState({
        dsCdKemTheoId: toDieuTri[0]?.dsCdKemTheoId,
        dienBienBenh: toDieuTri[0]?.dienBienBenh,
        dsCdChinhId: toDieuTri[0]?.dsCdChinhId,
        khoaChiDinhId: toDieuTri[0]?.khoaChiDinhId,
      });
    } else {
      setState({
        dsCdKemTheoId: infoPatient?.dsCdVaoVienKemTheoId,
        dsCdChinhId: infoPatient?.dsCdVaoVienId,
        moTa: infoPatient?.moTa,
        bacSiDieuTriId: infoPatient?.bacSiDieuTriId,
        khoaChiDinhId: infoPatient?.khoaChiDinhId,
        bacSiTrucId: nhanVienId,
      });
    }
  }, [listToDieuTri, infoPatient]);
  useEffect(() => {
    if (infoPatient) {
      setState({ bacSiDieuTriId: infoPatient?.bacSiDieuTriId });
    }
  }, [infoPatient]);

  useEffect(() => {
    _getListTongHop({
      page: "",
      size: "",
      active: "",
      dsKhoaChiDinhId: currentToDieuTri?.khoaChiDinhId || state.khoaChiDinhId,
      dsPhongId: infoPatient?.phongId,
    });
  }, [infoPatient, currentToDieuTri, state.khoaChiDinhId]);

  // logcurrentToDieuTri?.khoaChiDinhId || state.khoaChiDinhId

  const onClose = () => {
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${infoPatient?.id}`
    );
    if (currentToDieuTri)
      updataDataToDieuTri({ toDieuTriId: currentToDieuTri?.id });
  };
  const onChangeInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({ [key]: value });
  };

  return (
    <fieldset disabled={isReadonly} style={{ width: "100%" }}>
      <MainToDieuTri>
        <Col span={12} className="mr8">
          <Row>
            <h1
              style={{ paddingRight: 20, marginBottom: 0, lineHeight: "unset" }}
            >
              {t("quanLyNoiTru.toDieuTri.title")}
            </h1>
            <div className="date">
              <span style={{ paddingRight: 10 }} className="title">
                {t("quanLyNoiTru.toDieuTri.ngayYLenh")}:
              </span>
              <DateTimePicker
                showTime={{ format: "HH:mm:ss" }}
                value={state?.thoiGianYLenh}
                onChange={onChangeInput("thoiGianYLenh")}
                placeholder={"Chọn thời gian"}
                disabled={isReadonly}
              />
            </div>
          </Row>
          <Col>
            <SelectGroup>
              <span>{t("quanLyNoiTru.chanDoanBenh")}: </span>
              <div className="select-box-chan-doan">
                <SelectChanDoan
                  mode="multiple"
                  maxItem={1}
                  value={(state?.dsCdChinhId || []).map((item) => item + "")}
                  onChange={onChangeInput("dsCdChinhId")}
                  style={{
                    width: "100%",
                  }}
                  disabled={isReadonly}
                />
              </div>
            </SelectGroup>
          </Col>
          <Col>
            <TextField
              label={t("quanLyNoiTru.chanDoanMoTaChiTiet")}
              className="input_custom"
              marginTop={5}
              onChange={onChangeInput("moTa")}
              html={state?.moTa}
              maxLine={1}
            />
          </Col>
          <Col style={{ marginTop: "5px" }}>
            {t("quanLyNoiTru.dienBenBenh")}: {"  "}
            <Select
              style={{ minWidth: "200px" }}
              data={_listDataTongHop}
              onChange={(e) =>
                setState({
                  dienBienBenh: (_listDataTongHop || []).find((x) => x.id === e)
                    ?.dienBien,
                })
              }
              disabled={isReadonly}
            />
            <TextField
              className="input_custom"
              marginTop={5}
              onChange={onChangeInput("dienBienBenh")}
              html={state?.dienBienBenh}
              maxLine={1}
            />
          </Col>
        </Col>
        {/* ---------------------------------------------------------------------------------------- Right  */}
        <Col span={12} className="ml8">
          <Row>
            <Row style={{ flex: 1 }}>
              <div className="date">
                <span style={{ paddingRight: 10 }} className="title">
                  {t("quanLyNoiTru.toDieuTri.ngayKham")}:
                </span>
                <DateTimePicker
                  showTime={{ format: "HH:mm:ss" }}
                  value={state?.thoiGianKham}
                  onChange={onChangeInput("thoiGianKham")}
                  placeholder={"Chọn thời gian"}
                  disabled={isReadonly}
                />
              </div>
            </Row>
            <img
              style={{ width: 15, height: 15, cursor: "pointer" }}
              src={require("assets/images/utils/x-gray.png")}
              alt=""
              onClick={() => onClose()}
            />
          </Row>
          <Col>
            <SelectGroup>
              <span>{t("quanLyNoiTru.chanDoanKemTheo")}: </span>
              <div className="select-box-chan-doan">
                <SelectChanDoan
                  mode="multiple"
                  value={(state?.dsCdKemTheoId || []).map((item) => item + "")}
                  onChange={onChangeInput("dsCdKemTheoId")}
                  style={{
                    width: "100%",
                  }}
                  disabled={isReadonly}
                />
              </div>
            </SelectGroup>
          </Col>
          <Col>
            <TextField
              label={t("quanLyNoiTru.toDieuTri.ghiChu")}
              className="input_custom"
              marginTop={5}
              onChange={onChangeInput("ghiChu")}
              html={state?.ghiChu}
              maxLine={1}
            />
          </Col>
          <Col>
            <SelectGroup>
              <span>{t("quanLyNoiTru.bacSiDieuTri")}: </span>
              <Select
                value={state?.bacSiDieuTriId}
                onChange={onChangeInput("bacSiDieuTriId")}
                name="bacSiDieuTriId"
                className="select-box-chan-doan"
                data={listNhanVien}
                disabled={isReadonly}
              />
            </SelectGroup>
          </Col>
          <Col>
            <SelectGroup>
              <span>{t("quanLyNoiTru.toDieuTri.bacSiTruc")} : </span>
              <Select
                value={state?.bacSiTrucId}
                onChange={onChangeInput("bacSiTrucId")}
                name="bacSiTrucId"
                className="select-box-chan-doan"
                data={listNhanVien}
                disabled={isReadonly}
              />
            </SelectGroup>
          </Col>
          <Col>
            <TextField
              label={t("quanLyNoiTru.toDieuTri.cheDoAn")}
              className="input_custom"
              marginTop={5}
              onChange={onChangeInput("cheDoAn")}
              html={state?.cheDoAn}
              maxLine={1}
            />
          </Col>
          <Col>
            <SelectGroup>
              <span>{t("quanLyNoiTru.toDieuTri.cheDoChamSoc")} : </span>
              <Select
                value={state?.cheDoChamSocId}
                onChange={onChangeInput("cheDoChamSocId")}
                className="select-box-chan-doan"
                data={listAllCheDoChamSoc}
                disabled={isReadonly}
              />
            </SelectGroup>
          </Col>
        </Col>
      </MainToDieuTri>
    </fieldset>
  );
};
export default memo(forwardRef(ThongTinToDieuTri));
