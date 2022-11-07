import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import moment from "moment";
import IconEdit from "assets/images/noiTru/icEdit.png";
import { useTranslation } from "react-i18next";
import ModalThongTinRaVien from "./ModalThongTinRaVien";
import Icon, { FileTextOutlined } from "@ant-design/icons";
import ModalChuyenVien from "./ModalChuyenVien";
import { useEnum } from "hook";
import ModalThongTinTuVong from "./ModalThongTinTuVong";
import cacheUtils from "utils/cache-utils";
import { ENUM, ROLES, TRANG_THAI_NB } from "constants/index";
import { checkRole } from "utils/role-utils";
const ThongTinVaoVien = (props) => {
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { nbThongTinRaVien } = useSelector((state) => state.nbDotDieuTri);
  const [listLyDoTuVong] = useEnum(ENUM.LY_DO_TU_VONG);
  const [listDiaDiemTuVong] = useEnum(ENUM.DIA_DIEM_TU_VONG);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const [listHuongDieuTriNoiTru] = useEnum(ENUM.HUONG_DIEU_TRI_NOI_TRU);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [thongTinChiTiet, setThongTinChiTiet] = useState({});
  const { t } = useTranslation();
  const [state, _setState] = useState();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const modalThongTinRaVienRef = useRef();
  const modalThongTinTuVongRef = useRef(null);
  const refModalChuyenVien = useRef();
  const onShowModalChuyenVien = (dsCdRaVienId) => {
    if (refModalChuyenVien.current) {
      // getGiayChuyenVienById(infoPatient.id).then((s) => {
      setThongTinChiTiet({
        nbChanDoan: {
          dsCdChinhId: dsCdRaVienId
            ? dsCdRaVienId
            : infoPatient?.dsCdRaVienId || null,
        },
        nbChuyenVien: {
          nbDotDieuTriId: infoPatient.id,
        },
      });
      refModalChuyenVien.current.show();
      // });
    }
  };

  const onShowModalThongTinTuVong = () => {
    if (modalThongTinTuVongRef.current) {
      modalThongTinTuVongRef.current.show({
        nbDotDieuTriId: infoPatient?.id,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      setState({ khoaLamViec });
    }
    fetchData();
  }, []);

  const isReadonly = useMemo(() => {
    return (
      (infoPatient?.khoaNbId !== state?.khoaLamViec?.id ||
        [
          TRANG_THAI_NB.DANG_CHUYEN_KHOA,
          TRANG_THAI_NB.HEN_DIEU_TRI,
          TRANG_THAI_NB.DA_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
        ].includes(infoPatient?.trangThai)) &&
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA])
    );
  }, [infoPatient, state?.khoaLamViec]);

  return (
    <Main>
      <Row span={24} className="info">
        <div className="title">{t("quanLyNoiTru.thongTinVaoVien")}</div>
        <div className="content-tab">
          <Row>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.khoaNhapVien")}:</span>{" "}
                <b>{infoPatient?.tenKhoaNhapVien}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanNoiGioiThieu")}:</span>{" "}
                <b>{infoPatient?.cdNoiGioiThieu}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanVaoVien")}:</span>{" "}
                <b>
                  {infoPatient?.dsCdVaoVien
                    ?.map((item) => `${item?.ma} - ${item?.ten}`)
                    ?.join("; ")}
                </b>
              </div>
            </Col>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.thoiGianNhapVien")}:</span>{" "}
                <b>
                  {infoPatient?.thoiGianVaoKhoaNhapVien &&
                    moment(infoPatient?.thoiGianVaoKhoaNhapVien).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.noiGioiThieu")}:</span>{" "}
                <b>
                  {infoPatient?.maNoiGioiThieu &&
                    infoPatient?.tenNoiGioiThieu &&
                    `${infoPatient?.maNoiGioiThieu} - ${infoPatient?.tenNoiGioiThieu}`}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.bsChiDinhNhapVien")}:</span>{" "}
                <b>{infoPatient?.tenBsChiDinhNhapVien}</b>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row className="info">
        <div className="title">{t("quanLyNoiTru.thongTinDieuTri")}</div>
        <div className="content-tab">
          <Row>
            <Col span={24}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanChinhHienTai")}:</span>{" "}
                <b>
                  {infoPatient?.dsCdChinh
                    ?.map((item) => `${item?.ma} - ${item?.ten}`)
                    ?.join("; ")}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanKemTheo")}:</span>{" "}
                <b>
                  {infoPatient?.dsCdKemTheo
                    ?.map((item) => `${item?.ma} - ${item?.ten}`)
                    ?.join("; ")}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanMoTaChiTiet")}:</span>{" "}
                <b>{infoPatient?.moTa}</b>
              </div>
            </Col>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("common.phong")}:</span> <b>{infoPatient?.tenPhong}</b>
              </div>
              <div class="item-sub">
                <span>{t("common.khoa")}:</span> <b>{infoPatient?.tenKhoaNb}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.ghiChuChoDieuDuong")}:</span>{" "}
                <b>{infoPatient?.ghiChuDieuDuong}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.loaiBenhAn")}:</span>{" "}
                <b>{infoPatient?.tenLoaiBenhAn}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.doiTuongKcb")}:</span>{" "}
                <b>
                  {
                    (listDoiTuongKcb || []).find(
                      (x) => x.id === infoPatient?.doiTuongKcb
                    )?.ten
                  }
                </b>
              </div>
            </Col>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.giuong")}:</span>{" "}
                <b>
                  {infoPatient?.soHieuGiuong} - {infoPatient?.tenDvGiuong}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.bsDieuTri")}:</span>{" "}
                <b>{infoPatient?.tenBacSiDieuTri}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.soNgayDieuTri")}:</span>{" "}
                <b>{infoPatient?.soNgayDieuTri}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.trangThaiNb")}: </span>{" "}
                <b>
                  {
                    (listTrangThaiNb || []).find(
                      (x) => x.id === infoPatient?.trangThai
                    )?.ten
                  }
                </b>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row span={24} className="info">
        <div className="title">
          {t("quanLyNoiTru.thongTinRaVien")}{" "}
          {!isReadonly && (
            <img
              src={IconEdit}
              alt={IconEdit}
              style={{ cursor: "pointer" }}
              onClick={() =>
                modalThongTinRaVienRef.current &&
                modalThongTinRaVienRef.current.show()
              }
            />
          )}
          {/* hương điều trị ra viện = 40 thì sẽ hiện icon */}
          {/* {nbThongTinRaVien?.huongDieuTri === 40 && (
            <Icon
              component={IcBaoCao}
              onClick={() => onShowModalChuyenVien()}
            ></Icon>
          )} */}
          {/* kết quả điều trị = 5 tử vong thì hiện icon */}
          {nbThongTinRaVien?.ketQuaDieuTri === 5 && (
            <FileTextOutlined onClick={() => onShowModalThongTinTuVong()} />
          )}
        </div>
        <div className="content-tab">
          <Row>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanRaVienChinh")}*: </span>{" "}
                <b>
                  {nbThongTinRaVien?.dsCdChinh
                    ?.map((item) => `${item?.ma} - ${item?.ten}`)
                    ?.join("; ")}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanRaVienKemTheo")}: </span>{" "}
                <b>
                  {nbThongTinRaVien?.dsCdKemTheo
                    ?.map((item) => `${item?.ma} - ${item?.ten}`)
                    ?.join("; ")}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.chanDoanRaVienMoTaChiTiet")}: </span>{" "}
                <b>{nbThongTinRaVien?.moTa}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.phuongPhapDieuTri")}*: </span>{" "}
                <b>{nbThongTinRaVien?.phuongPhapDieuTri}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.loiDanBacSy")}: </span>{" "}
                <b>{nbThongTinRaVien?.loiDanBacSi}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.tinhTrangNb")}: </span>{" "}
                <b>{nbThongTinRaVien?.tinhTrang}</b>
              </div>
              <div class="item-sub">
                <span>
                  {t("quanLyNoiTru.quaTrinhBenhLyVaDienBienLamSang")}:{" "}
                </span>{" "}
                <b>{nbThongTinRaVien?.quaTrinhBenhLy}</b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.tomTatKetQuaCls")}: </span>{" "}
                <b>{nbThongTinRaVien?.ketQuaCls}</b>
              </div>
            </Col>
            <Col span={12}>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.tinhTrangRaVien")}*: </span>{" "}
                <b>
                  {
                    (listHuongDieuTriNoiTru || []).find(
                      (x) => x.id === nbThongTinRaVien?.huongDieuTri
                    )?.ten
                  }
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.ketQuaDieuTri")}*: </span>{" "}
                <b>
                  {
                    (listKetQuaDieuTri || []).find(
                      (x) => x.id === nbThongTinRaVien?.ketQuaDieuTri
                    )?.ten
                  }
                </b>
              </div>
              {nbThongTinRaVien?.ketQuaDieuTri === 5 && (
                <div class="item-sub">
                  <span>{t("quanLyNoiTru.thoiGianTuVong")}: </span>{" "}
                  <b>
                    {nbThongTinRaVien?.thoiGianTuVong &&
                      moment(nbThongTinRaVien?.thoiGianTuVong).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                  </b>
                </div>
              )}
              {nbThongTinRaVien?.ketQuaDieuTri === 5 && (
                <div class="item-sub">
                  <span>{t("quanLyNoiTru.diaDiemTuVong")}*: </span>{" "}
                  <b>
                    {
                      listDiaDiemTuVong?.find(
                        (i) => i.id === nbThongTinRaVien?.diaDiemTuVong
                      )?.ten
                    }
                  </b>
                </div>
              )}
              {nbThongTinRaVien?.ketQuaDieuTri === 5 && (
                <div class="item-sub">
                  <span>{t("quanLyNoiTru.lyDoTuVong")}*: </span>{" "}
                  <b>
                    {
                      listLyDoTuVong?.find(
                        (i) => i.id === nbThongTinRaVien?.lyDoTuVong
                      )?.ten
                    }
                  </b>
                </div>
              )}
              {nbThongTinRaVien?.ketQuaDieuTri === 5 && (
                <div class="item-sub">
                  <span>{t("quanLyNoiTru.ghiChuTuVong")}: </span>{" "}
                  <b>{nbThongTinRaVien?.ghiChuTuVong}</b>
                </div>
              )}
              <div class="item-sub">
                <span>{t("quanLyNoiTru.thoiGianRaVien")}: </span>{" "}
                <b>
                  {nbThongTinRaVien?.thoiGianRaVien &&
                    moment(nbThongTinRaVien?.thoiGianRaVien).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </div>
              <div class="item-sub">
                <span>{t("quanLyNoiTru.thoiGianHenKham")}: </span>{" "}
                <b>
                  {nbThongTinRaVien?.thoiGianHenKham &&
                    moment(nbThongTinRaVien?.thoiGianHenKham).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <ModalThongTinRaVien
        refModal={modalThongTinRaVienRef}
        refModalChuyenVien={refModalChuyenVien}
        onShowModalChuyenVien={onShowModalChuyenVien}
      />
      <ModalChuyenVien
        refModalChuyenVien={refModalChuyenVien}
        infoNb={infoPatient}
        thongTinChiTiet={thongTinChiTiet}
      ></ModalChuyenVien>

      <ModalThongTinTuVong ref={modalThongTinTuVongRef} />
    </Main>
  );
};
export default memo(ThongTinVaoVien);
