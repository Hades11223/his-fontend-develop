import React, { useEffect } from "react";
import { Title } from "../styled";
import { useTranslation } from "react-i18next";
import KhamNoiKhoa from "./KhamNoiKhoa";
import KhamNgoaiKhoa from "./KhamNgoaiKhoa";
import KhamSanPhuKhoa from "./KhamSanPhuKhoa";
import DaLieu from "./DaLieu";
import RangHamMat from "./RangHamMat";
import TaiMuiHong from "./TaiMuiHong";
import Mat from "./Mat";
import { TableCollapse } from "./styled";
import SelectBacSy from "../components/SelectBacSy";
import { useDispatch, useSelector } from "react-redux";
import { useThietLap } from "hook";
import { THIET_LAP_CHUNG } from "constants/index";

const KhamLamSang = (props) => {
  const { t } = useTranslation();

  const { auth } = useSelector((state) => state.auth);
  const dsChuyenKhoaDvKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDichVu?.dichVu?.dsChuyenKhoa
  );
  const ketLuanKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.ketLuanKham
  );

  const {
    nhanVien: { getListAllNhanVien },
  } = useDispatch();
  const { dsChuyenKhoa: dsChuyenKhoaUser } = auth || {};
  const dsMaCKUser = (dsChuyenKhoaUser || []).map((item) => item.ma);
  const dsMaCKDv = (dsChuyenKhoaDvKham || []).map((item) => item.ma);

  const [dataCHUYEN_KHOA_NOI_KHOA] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_NOI_KHOA
  );
  const [dataCHUYEN_KHOA_NGOAI_KHOA] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_NGOAI_KHOA
  );
  const [dataCHUYEN_KHOA_SAN_PHU_KHOA] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_SAN_PHU_KHOA
  );
  const [dataCHUYEN_KHOA_MAT] = useThietLap(THIET_LAP_CHUNG.CHUYEN_KHOA_MAT);

  const [dataCHUYEN_KHOA_TAI_MUI_HONG] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_TAI_MUI_HONG
  );

  const [dataCHUYEN_KHOA_RANG_HAM_MAT] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_RANG_HAM_MAT
  );

  const [dataCHUYEN_KHOA_DA_LIEU] = useThietLap(
    THIET_LAP_CHUNG.CHUYEN_KHOA_DA_LIEU
  );

  const { handleSetData } = props;
  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    bacSiKhamNoiId,
    bacSiKhamNgoaiId,
    bacSiKhamSanId,
    bacSiKhamMatId,
    bacSiKhamTmhId,
    bacSiKhamRhmId,
    bacSiKhamDaLieuId,
  } = thongTinKSK || {};

  useEffect(() => {
    getListAllNhanVien({ size: "", page: "", active: true });
  }, []);

  const onChangeBacSyValue = (key) => handleSetData(["nbKSK", key]);

  return (
    <>
      <Title>V. {t("khamBenh.khamSucKhoe.khamLamSang")}</Title>

      <TableCollapse>
        <thead>
          <tr>
            <th className="td-content">
              {t("khamBenh.khamSucKhoe.noiDungKham")}
            </th>
            <th className="td-bacsy">{t("khamBenh.khamSucKhoe.bacSi")}</th>
          </tr>
        </thead>

        <tbody>
          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_NOI_KHOA) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_NOI_KHOA))) && (
            <tr>
              <td>
                <KhamNoiKhoa handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamNoiId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamNoiId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_NGOAI_KHOA) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_NGOAI_KHOA))) && (
            <tr>
              <td>
                <KhamNgoaiKhoa handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamNgoaiId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamNgoaiId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_SAN_PHU_KHOA) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_SAN_PHU_KHOA))) && (
            <tr>
              <td>
                <KhamSanPhuKhoa handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamSanId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamSanId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_MAT) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_MAT))) && (
            <tr>
              <td>
                <Mat handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamMatId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamMatId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_TAI_MUI_HONG) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_TAI_MUI_HONG))) && (
            <tr>
              <td>
                <TaiMuiHong handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamTmhId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamTmhId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_RANG_HAM_MAT) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_RANG_HAM_MAT))) && (
            <tr>
              <td>
                <RangHamMat handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamRhmId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamRhmId")}
                />
              </td>
            </tr>
          )}

          {(ketLuanKham ||
            (dsMaCKUser.includes(dataCHUYEN_KHOA_DA_LIEU) &&
              dsMaCKDv.includes(dataCHUYEN_KHOA_DA_LIEU))) && (
            <tr>
              <td>
                <DaLieu handleSetData={handleSetData} />
              </td>
              <td>
                <SelectBacSy
                  value={bacSiKhamDaLieuId}
                  onChangeBacSyValue={onChangeBacSyValue("bacSiKhamDaLieuId")}
                />
              </td>
            </tr>
          )}
        </tbody>
      </TableCollapse>
    </>
  );
};

export default KhamLamSang;
