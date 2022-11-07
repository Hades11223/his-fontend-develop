import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Input, Row, Col } from "antd";
import { PhieuChiDinhWrapper, SelectGroup } from "../styled";
import { SelectGroupNhapVien } from "./styled";
import { TextField, Select, SelectLargeData } from "components";
import { DatePickerField } from "components/DatePicker";
import Checkbox from "components/Checkbox";
import moment from "moment";
import { DOI_TUONG, GIOI_TINH, THIET_LAP_CHUNG } from "constants/index";
import { DivInfo } from "../../KhamCoBan/styled";
import { useSelector, useDispatch } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";
import { useThietLap } from "hook";
import { debounce } from "lodash";
const { SelectChanDoan } = SelectLargeData;

const FormNhapVien = (props) => {
  const { t } = useTranslation();
  const selectFirstRef = useRef();
  const [dataTIEU_DE_TRAI_1] = useThietLap(THIET_LAP_CHUNG.TIEU_DE_TRAI_1);
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet
  );
  const { benhVien = {} } = useSelector((state) => state.auth.auth || {});

  const listAllKhoa = useSelector((state) => state.khoa.listAllKhoa);
  const listAllNgheNghiep = useSelector(
    (state) => state.ngheNghiep.listAllNgheNghiep
  );
  const { listAllTinh, listAllQuanHuyen, listAllXaPhuong } = useSelector(
    (state) => state.ttHanhChinh
  );
  const { getListAllTinh, getListAllQuanHuyen, getListAllXaPhuong } =
    useDispatch().ttHanhChinh;
  const listAllDanToc = useSelector((state) => state.danToc.listAllDanToc);
  const { nbChiSoSong, nbHoiBenh, nbDvKyThuat } = thongTinChiTiet || {};
  const {
    khoa: { getListAllKhoa },
    danToc: { getListAllDanToc },
  } = useDispatch();
  const { handleSetData } = props;

  // const listAllNhomBenhChinh = useSelector(
  //   (state) => state.nhomBenh.listAllNhomBenhChinh || []
  // );
  // const listAllMaBenh = useSelector(
  //   (state) => state.maBenh.listAllMaBenh
  // );
  // const listAllNhomBenhPhu1 = useSelector(
  //   (state) => state.nhomBenh.listAllNhomBenhPhu1 || []
  // );
  const [dimensionSelect, setDimensionSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });
  const { phongThucHien } = nbDvKyThuat || {};
  const {
    tenNb,
    gioiTinh,
    tuoi,
    ngaySinh,
    maTheBhyt,
    denNgayTheBhyt,
    thoiGianVaoVien,
    chiNamSinh,
  } = infoNb || {};
  // const [chiSoSong, setChiSoSong] = useState({});
  const [dataSelect, setDataSelect] = useState(() => ({}));
  useEffect(() => {
    debounceFunc();
  }, [thongTinChiTiet, infoNb, listAllDanToc]);

  const debounceFunc = useCallback(
    debounce(() => {
      const danTocId = listAllDanToc?.find(
        (item) => item.ten == infoNb?.tenDanToc
      )?.id;
      const data = {
        ...dataSelect,
        ...(infoNb || {}),
        ...(thongTinChiTiet?.nbChanDoan || {}),
        ...(thongTinChiTiet?.nbNhapVien || {}),
        ...(thongTinChiTiet?.nbKhamXet || {}),
        ...(thongTinChiTiet?.nbChiSoSong || {}),
        ...(thongTinChiTiet?.nbHoiBenh || {}),
        ...(thongTinChiTiet?.nbKetLuan || {}),
        danTocId: danTocId,
      };
      handleSetData(["nbNhapVien", "danTocId"])(danTocId);
      handleSetData(["nbNhapVien", "cdNoiGioiThieu"])(infoNb?.cdNoiGioiThieu);
      handleSetData(["nbNhapVien", "tenNguoiBaoLanh"])(infoNb?.tenNguoiBaoLanh);
      handleSetData(["nbNhapVien", "sdtNguoiBaoLanh"])(infoNb?.sdtNguoiBaoLanh);
      handleSetData(["nbNhapVien", "xaPhuongId"])(infoNb?.xaPhuongId);
      handleSetData(["nbNhapVien", "quanHuyenId"])(infoNb?.quanHuyenId);
      handleSetData(["nbNhapVien", "tinhThanhPhoId"])(infoNb?.tinhThanhPhoId);
      handleSetData(["nbNhapVien", "soNha"])(infoNb?.soNha);
      handleSetData(["nbNhapVien", "noiLamViec"])(infoNb?.noiLamViec);
      handleSetData(["nbNhapVien", "ngheNghiepId"])(infoNb?.ngheNghiepId);
      setDataSelect(data);
    }, 1000),
    [thongTinChiTiet, infoNb, listAllDanToc]
  );

  useEffect(() => {
    getListAllDanToc({ page: "", size: "" });
    getListAllTinh({ page: "", size: "" });
    getListAllKhoa({ page: "", size: "", dsTinhChatKhoa: 70 });
  }, []);
  useEffect(() => {
    if (dataSelect?.tinhThanhPhoId) {
      getListAllQuanHuyen({
        page: "",
        size: "",
        tinhThanhPhoId: dataSelect?.tinhThanhPhoId,
      });
    }
  }, [dataSelect?.tinhThanhPhoId]);
  useEffect(() => {
    if (dataSelect?.quanHuyenId) {
      getListAllXaPhuong({
        page: "",
        size: "",
        quanHuyenId: dataSelect?.quanHuyenId,
      });
    }
  }, [dataSelect?.quanHuyenId]);
  const [highlight, setHighlight] = useState(true);

  useEffect(() => {
    setDimensionSelect({
      ...dimensionSelect,
      firstHeight: selectFirstRef.current.offsetHeight,
      firstWidth: selectFirstRef.current.offsetWidth,
    });
  }, [dataSelect]);
  const handleChangeData = (key, key1) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if ("khoaNhapVienId" === key) {
      setHighlight(!value);
    }
    if ("tinhThanhPhoId" === key || "quanHuyenId" === key) {
      if ("tinhThanhPhoId" === key) {
        handleSetData([key1 || "nbNhapVien", "tinhThanhPhoId"])(value);
        handleSetData([key1 || "nbNhapVien", "quanHuyenId"])(null);
        setDataSelect({
          ...dataSelect,
          [key]: value,
          quanHuyenId: null,
          xaPhuongId: null,
        });
      } else {
        handleSetData([key1 || "nbNhapVien", "quanHuyenId"])(value);
        setDataSelect({
          ...dataSelect,
          [key]: value,
          xaPhuongId: null,
        });
      }
      handleSetData([key1 || "nbNhapVien", "xaPhuongId"])(null);
    } else if (key === "thoiGianKetLuan") {
      handleSetData([key1 || "nbKetLuan", key])(value);
      setDataSelect({ ...dataSelect, [key]: value });
    } else {
      handleSetData([key1 || "nbNhapVien", key])(value);
      setDataSelect({ ...dataSelect, [key]: value });
    }
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  return (
    <PhieuChiDinhWrapper>
      <div className="form-detail">
        <div className="flex-center">
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ width: "100%" }}>
              {t("khamBenh.ketLuanKham.nhapVien.buongKhamBenh")}:{" "}
            </span>
            {phongThucHien.ten
              ? phongThucHien.ten
              : "..........................."}
          </div>
          <div></div>
        </div>
        <Row className="mr-5">
          <Col span={12}>
            <span>{t("khamBenh.ketLuanKham.nhapVien.tieuDeTrai1")}: </span>
            <span>{dataTIEU_DE_TRAI_1}</span>
          </Col>
          <Col span={8} offset={4}>
            {` ${t("khamBenh.ketLuanKham.nhapVien.ms")}:  42/BV-01`}
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12}>
            {` ${t("khamBenh.ketLuanKham.nhapVien.benhVien")}:  ${
              benhVien?.ten
            }`}
          </Col>
          <Col span={8} offset={4}>
            <TextField
              label={t("khamBenh.ketLuanKham.nhapVien.soVaoVien")}
              html={""}
              disabled={true}
              refsChild={refElement}
              keyReload={"form-nhap-vien"}
            />
          </Col>
        </Row>
        <h3 className="mr-17">I. {t("khamBenh.nhapVien.title")}</h3>
        <Row className="mr-5">
          <Col span={12}>
            {` ${t("khamBenh.ketLuanKham.nhapVien.hoTenInHoa")}:  ${tenNb}`}
          </Col>
          <Col span={7} offset={2}>
            {`2. ${t("khamBenh.ketLuanKham.nhapVien.sinhNgay")}:  ${
              ngaySinh &&
              moment(ngaySinh).format(chiNamSinh ? "YYYY" : "DD/MM/YYYY")
            }`}
          </Col>
          <Col span={2} offsset={1}>
            {`${t("khamBenh.ketLuanKham.nhapVien.tuoi")} : ${tuoi}`}
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12} className="disabled">
            <span>3. {t("khamBenh.ketLuanKham.nhapVien.gioiTinh")}: </span>
            <Checkbox checked={gioiTinh === GIOI_TINH.NAM}>
              {t("common.nam")}
            </Checkbox>
            <Checkbox checked={gioiTinh === GIOI_TINH.NU}>
              {t("common.nu")}
            </Checkbox>
          </Col>
          <Col span={10} offset={2}>
            <SelectGroup style={{ width: "100%" }}>
              <span style={{ width: "35%" }}>
                4. {t("khamBenh.ketLuanKham.nhapVien.ngheNghiep")}:{" "}
              </span>
              <div className="select-box" style={{ width: "65%" }}>
                <Select
                  value={dataSelect?.ngheNghiepId}
                  onChange={handleChangeData("ngheNghiepId")}
                  style={{ width: "100%" }}
                  data={listAllNgheNghiep}
                >
                  {/* {ngheNghiepOption} */}
                </Select>
              </div>
            </SelectGroup>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12}>
            <SelectGroup style={{ width: "100%" }}>
              <span>{`5. ${t("khamBenh.ketLuanKham.nhapVien.danToc")}:`}</span>
              <div className="select-box" style={{ width: "65%" }}>
                <Select
                  value={dataSelect?.danTocId}
                  onChange={handleChangeData("danTocId")}
                  style={{ width: "100%" }}
                  data={listAllDanToc}
                ></Select>
              </div>
            </SelectGroup>
          </Col>
          <Col span={10} offset={2}>
            <TextField
              label={`6. ${t("khamBenh.ketLuanKham.nhapVien.ngoaiKieu")}`}
              delayTyping={200}
              onChange={handleChangeData("ngoaiKieu")}
              html={dataSelect?.ngoaiKieu}
              refsChild={refElement}
              keyReload={"form-nhap-vien"}
            />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <TextField
              label={`7. ${t("khamBenh.ketLuanKham.nhapVien.diaChiSoNha")}`}
              html={dataSelect.soNha}
              onChange={handleChangeData("soNha")}
              delayTyping={200}
              refsChild={refElement}
              keyReload={"form-nhap-vien"}
            />
          </Col>
          {/* <Col span={8}>
            <TextField label="Thôn, phố:" html={soNha} disabled={true} />
          </Col> */}
          <Col span={10}>
            <SelectGroup style={{ width: "100%" }}>
              <span>{t("khamBenh.ketLuanKham.nhapVien.xaPhuong")}</span>
              <div className="select-box" style={{ width: "65%" }}>
                <Select
                  value={dataSelect?.xaPhuongId}
                  onChange={handleChangeData("xaPhuongId")}
                  style={{ width: "100%" }}
                  data={listAllXaPhuong}
                ></Select>
              </div>
            </SelectGroup>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <SelectGroup style={{ width: "100%" }}>
              <span>{t("khamBenh.ketLuanKham.nhapVien.quanHuyen")}</span>
              <div className="select-box" style={{ width: "65%" }}>
                <Select
                  value={dataSelect?.quanHuyenId}
                  onChange={handleChangeData("quanHuyenId")}
                  style={{ width: "100%" }}
                  data={listAllQuanHuyen}
                ></Select>
              </div>
            </SelectGroup>
          </Col>
          <Col span={10}>
            <SelectGroup style={{ width: "100%" }}>
              <span>{t("khamBenh.ketLuanKham.nhapVien.tinhThanhPho")}</span>
              <div className="select-box" style={{ width: "65%" }}>
                <Select
                  value={dataSelect?.tinhThanhPhoId}
                  onChange={handleChangeData("tinhThanhPhoId")}
                  style={{ width: "100%" }}
                  data={listAllTinh}
                ></Select>
              </div>
            </SelectGroup>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={10}>
            <TextField
              label={`8. ${t("khamBenh.ketLuanKham.nhapVien.noiLamViec")}`}
              html={dataSelect.noiLamViec}
              onChange={handleChangeData("noiLamViec")}
              refsChild={refElement}
              keyReload={"form-nhap-vien"}
            />
          </Col>
          <Col span={14} className="disabled">
            <span style={{ marginRight: "20px" }}>
              9. {t("khamBenh.ketLuanKham.nhapVien.doiTuong")}:
            </span>
            <Checkbox checked={infoNb?.doiTuong === DOI_TUONG.BAO_HIEM}>
              1.{t("khamBenh.ketLuanKham.nhapVien.BHYT")}
            </Checkbox>
            <Checkbox checked={infoNb?.doiTuong === DOI_TUONG.KHONG_BAO_HIEM}>
              2.{t("khamBenh.ketLuanKham.nhapVien.thuPhi")}
            </Checkbox>
            <Checkbox checked={false}>
              3.{t("khamBenh.ketLuanKham.nhapVien.mienGiam")}{" "}
            </Checkbox>
            <Checkbox checked={false}>
              4.{t("khamBenh.ketLuanKham.nhapVien.khac")}{" "}
            </Checkbox>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <span>10. {t("khamBenh.ketLuanKham.nhapVien.giaTriBHYT")} </span>{" "}
            <span>
              {denNgayTheBhyt ? moment(denNgayTheBhyt).format("DD") : "......."}
            </span>
            <span> {t("common.thang")} </span>{" "}
            <span>
              {denNgayTheBhyt ? moment(denNgayTheBhyt).format("MM") : "......."}
            </span>
            <span> {t("khamBenh.ketLuanKham.nhapVien.nam")} </span>
            <span>
              {denNgayTheBhyt
                ? moment(denNgayTheBhyt).format("YYYY")
                : "......."}
            </span>
          </Col>
          <Col span={10}>
            <span>{t("khamBenh.ketLuanKham.nhapVien.soBHYT")} </span>
            <Input
              style={{ width: "15%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(0, 2)}
              disabled
            />{" "}
            <Input
              style={{ width: "10%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(2, 3)}
              disabled
            />{" "}
            <Input
              style={{ width: "15%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(3, 5)}
              disabled
            />{" "}
            <Input
              style={{ width: "32%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(5)}
              disabled
            />{" "}
          </Col>
        </Row>
        <div>
          11. {t("khamBenh.ketLuanKham.nhapVien.thongTinNguoiNhaCanBaoTin")}:
        </div>
        <TextField
          className="mr-5"
          label={" "}
          displayColon={false}
          html={dataSelect.tenNguoiBaoLanh}
          refsChild={refElement}
          keyReload={"form-nhap-vien"}
          onChange={handleChangeData("tenNguoiBaoLanh")}
        />
        <Row className="mr-5">
          <Col span={24}>
            <TextField
              label={t("khamBenh.ketLuanKham.nhapVien.dienThoaiSo")}
              html={dataSelect.sdtNguoiBaoLanh}
              refsChild={refElement}
              onChange={handleChangeData("sdtNguoiBaoLanh")}
              keyReload={"form-nhap-vien"}
            />
          </Col>
        </Row>

        <div className="mr-5">
          <TextField
            label={`12. ${t("khamBenh.ketLuanKham.nhapVien.denKhamBenhLuc")}`}
            html={
              thoiGianVaoVien &&
              moment(thoiGianVaoVien || new Date()).format(
                t("khamBenh.ketLuanKham.nhapVien.formatDate")
              )
            }
            disabled={true}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
          {/* <span>12. Đến khám bệnh lúc: </span>
          <DatePickerField
            showTime={{ format: "HH:mm" }}
            customFormat={dateTimeFormat}
            onChange={handleChangeData("thoiGianHenKham")}
            defaultValue= {moment(thoiGianVaoVien, "YYYY-MM-DDTHH:mm:ss")}
            placeholder="......giờ ........phút        ngày ........ tháng ......... năm ........."
            disabled
          /> */}
        </div>
        <div className="mr-5">
          <TextField
            label={`13. ${t(
              "khamBenh.ketLuanKham.nhapVien.chanDoanNoiGioiThieu"
            )}`}
            html={dataSelect?.cdNoiGioiThieu}
            onChange={handleChangeData("cdNoiGioiThieu")}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
        </div>
        <div className="mr-5 reason">
          <TextField
            label={`II. ${t("khamBenh.ketLuanKham.nhapVien.lyDoVaoVien")}`}
            html={dataSelect?.lyDoVaoVien}
            onChange={handleChangeData("lyDoVaoVien")}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
        </div>
        <h3 className="mr-17">
          III. {t("khamBenh.ketLuanKham.nhapVien.hoiBenh")}
        </h3>
        <div className="mr-5">
          <TextField
            label={`1. ${t("khamBenh.ketLuanKham.nhapVien.quaTrinhBenhLy")}`}
            onChange={handleChangeData("quaTrinhBenhLy", "nbHoiBenh")}
            html={dataSelect.quaTrinhBenhLy}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
        </div>
        <div className="mr-5">
          2. {t("khamBenh.ketLuanKham.nhapVien.tienSuBenh")}:
        </div>
        <div className="mr-5">
          <TextField
            label={`- ${t("khamBenh.ketLuanKham.nhapVien.banThan")}`}
            html={dataSelect.tienSuBanThan}
            onChange={handleChangeData("tienSuBanThan", "nbHoiBenh")}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
        </div>
        <div className="mr-5">
          <TextField
            label={`- ${t("khamBenh.ketLuanKham.nhapVien.giaDinh")}`}
            html={dataSelect.tienSuGiaDinh}
            onChange={handleChangeData("tienSuGiaDinh", "nbHoiBenh")}
            refsChild={refElement}
            keyReload={"form-nhap-vien"}
          />
        </div>
        <h3 className="mr-17">
          IV. {t("khamBenh.ketLuanKham.nhapVien.khamXet")}
        </h3>
        <Row className="mr-5">
          <Col span={14}>
            <div className="mr-5">
              <TextField
                label={`1. ${t("khamBenh.ketLuanKham.nhapVien.toanThan")}`}
                html={dataSelect.toanThan}
                onChange={handleChangeData("toanThan", "nbKhamXet")}
                refsChild={refElement}
                keyReload={"form-nhap-vien"}
              />
            </div>
            <div className="mr-5">
              <TextField
                label={`2. ${t("khamBenh.ketLuanKham.nhapVien.cacBoPhan")}`}
                html={dataSelect.cacBoPhan}
                onChange={handleChangeData("cacBoPhan", "nbKhamXet")}
                refsChild={refElement}
                keyReload={"form-nhap-vien"}
              />
            </div>
            <TextField
              label={`3. ${t("khamBenh.ketLuanKham.nhapVien.tomTatKetQuaCLS")}`}
              html={dataSelect.ketQuaLamSang}
              onChange={handleChangeData("ketQuaLamSang")}
              refsChild={refElement}
              keyReload={"form-nhap-vien"}
            />
            {/* <TextField label="4. Chẩn đoán vào viện" html={tenChanDoan} /> */}
            <SelectGroupNhapVien dimension={dimensionSelect} className="mr-0">
              <span>
                4. {t("khamBenh.ketLuanKham.nhapVien.chanDoanBenh")}:{" "}
              </span>
              <div className="select-box-nhap-vien" ref={selectFirstRef}>
                <SelectChanDoan
                  getPopupContainer={(trigger) => {
                    return trigger;
                  }}
                  mode="multiple"
                  maxItem={1}
                  value={(dataSelect.dsCdChinhId || []).map(
                    (item) => item + ""
                  )}
                  onChange={handleChangeData("dsCdChinhId", "nbChanDoan")}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </SelectGroupNhapVien>
          </Col>
          <Col span={6} offset={2}>
            <DivInfo>
              <TextField
                label={t("khamBenh.chanDoan.mach")}
                spanId="mach-chan-doan"
                nextInputByTabKey={"nhiet-do-chan-doan"}
                html={nbChiSoSong?.mach}
                maxLine={1}
                maxLength={2}
                style={{ width: 78 }}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("mach", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
                type="number"
                max={999}
              />
              <span>{t("khamBenh.chanDoan.lanPhut")}</span>
            </DivInfo>
            <DivInfo>
              <TextField
                label={t("khamBenh.chanDoan.nhietDo")}
                spanId="nhiet-do-chan-doan"
                nextInputByTabKey={"huyet-ap-chan-doan"}
                maxLine={1}
                maxLength={4}
                html={nbChiSoSong?.nhietDo}
                style={{ width: 106 }}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("nhietDo", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
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
            <DivInfo>
              <TextField
                label={t("khamBenh.chanDoan.huyetAp")}
                spanId="huyet-ap-chan-doan"
                nextInputByTabKey="sub-huyet-ap-chan-doan"
                maxLine={1}
                maxLength={4}
                html={nbChiSoSong?.huyetApTamThu}
                style={{ width: 106 }}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("huyetApTamThu", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
                type="number"
                max={999}
              />
              <TextField
                label="/"
                spanId="sub-huyet-ap-chan-doan"
                nextInputByTabKey="nhip-tho-chan-doan"
                maxLine={1}
                maxLength={4}
                style={{ width: 52 }}
                html={nbChiSoSong?.huyetApTamTruong}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("huyetApTamTruong", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
                type="number"
                max={999}
              />
              <span> mmHg</span>
            </DivInfo>
            <DivInfo maxWidth={177}>
              <TextField
                label={t("khamBenh.chanDoan.nhipTho")}
                spanId="nhip-tho-chan-doan"
                nextInputByTabKey="can-nang-chan-doan"
                maxLine={1}
                maxLength={4}
                html={nbChiSoSong?.nhipTho}
                style={{ width: 96 }}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("nhipTho", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
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
                style={{ width: 96 }}
                // disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
                onChange={handleChangeData("canNang", "nbChiSoSong")}
                refsChild={refElement}
                keyReload={"chan-doan"}
                type="numberFormat"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue < 1000;
                }}
              />
              <span>kg</span>
            </DivInfo>
          </Col>
        </Row>
        <TextField
          className="mr-5"
          html={dataSelect.daXuLy}
          onChange={handleChangeData("daXuLy")}
          label={`5. ${t("khamBenh.ketLuanKham.nhapVien.daXuLy")}`}
          refsChild={refElement}
          keyReload={"form-nhap-vien"}
        />
        <SelectGroup style={{ width: "100%", display: "flex" }}>
          <span style={highlight ? { color: "red" } : {}}>
            6. {t("khamBenh.ketLuanKham.nhapVien.vaoDieuTriTaiKhoa")}:{" "}
          </span>
          <div className="select-box" style={{ flex: 1 }}>
            <Select
              value={dataSelect.khoaNhapVienId}
              onChange={handleChangeData("khoaNhapVienId")}
              style={{ width: "100%" }}
              showSearch
              filterOption={filterOption}
              data={listAllKhoa}
            ></Select>
          </div>
        </SelectGroup>
        <TextField
          className="mr-5"
          label={`7. ${t("khamBenh.ketLuanKham.nhapVien.chuY")}`}
          html={dataSelect.ghiChu}
          onChange={handleChangeData("ghiChu", "nbKhamXet")}
          refsChild={refElement}
          keyReload={"form-nhap-vien"}
        />

        <Row className="sign-box">
          <Col span={12}></Col>
          <Col span={12}>
            <div className="sign-bottom text-center">
              <div>
                {/* <TextField className="sign-bottom__text" /> */}
                {/* {","} */}
                <DatePickerField
                  placeholder={t("khamBenh.ketLuanKham.nhapVien.ngayThangNam")}
                  value={
                    dataSelect?.thoiGianKetLuan &&
                    moment(dataSelect?.thoiGianKetLuan)
                  }
                  onChange={handleChangeData("thoiGianKetLuan")}
                />
              </div>
              <div className="sign-bottom__title">
                <b>{t("khamBenh.ketLuanKham.nhapVien.bacSiKhamBenh")}</b>
              </div>
              <div className="sign-bottom__sign">
                {t("khamBenh.ketLuanKham.nhapVien.kyTenDongDau")}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </PhieuChiDinhWrapper>
  );
};

export default FormNhapVien;
