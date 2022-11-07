import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";
import ThongTinHanhChinh from "./ThongTinHanhChinh";
import ChanDoan from "./ChanDoan";
import HoiBenh from "./HoiBenh";
import { Col, Row } from "antd";
import KhamXet from "./KhamXet";
import KhamLamSang from "./KhamLamSang";
import KhamCanLamSang from "./KhamCanLamSang";
import KetLuan from "./KetLuan";
import NbChiSoSong from "./NbChiSoSong";

const KhamCoBan = ({ handleSetData = () => {}, layerId }) => {
  const getUtils = useDispatch().utils.getUtils;
  const getNbDichVuKhamKSK = useDispatch().nbDichVuKhamKSK.getNbDichVuKhamKSK;

  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const typeKhamCoBan = useSelector((state) => state.khamBenh.typeKhamCoBan);
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet
  );

  useEffect(() => {
    getUtils({ name: "doiTuong" });
  }, []);

  const isKsk = useMemo(() => {
    return infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;
  }, [infoNb]);

  useEffect(() => {
    if (isKsk && thongTinChiTiet?.nbDotDieuTriId) {
      getNbDichVuKhamKSK(thongTinChiTiet?.nbDotDieuTriId);
    }
  }, [infoNb, thongTinChiTiet?.nbDotDieuTriId]);

  return (
    <Main
      trangThaiKham={trangThaiKham}
      trangThaiKSK={infoNb?.trangThaiKsk}
      className="fadeIn"
    >
      {isKsk ? (
        <>
          {/* Khám sức khỏe */}
          <ThongTinHanhChinh />
          <ChanDoan handleSetData={handleSetData} layerId={layerId} />
          <NbChiSoSong handleSetData={handleSetData} layerId={layerId} />
          <HoiBenh handleSetData={handleSetData} />
          <KhamLamSang handleSetData={handleSetData} />
          <KhamCanLamSang handleSetData={handleSetData} />
          <KetLuan handleSetData={handleSetData} />
        </>
      ) : (
        <>
          {/* Khám chung */}
          <ThongTinHanhChinh />
          <ChanDoan handleSetData={handleSetData} layerId={layerId} />
          <NbChiSoSong handleSetData={handleSetData} layerId={layerId} />
          <Row>
            <Col xs={24} md={12} className="paddingRight">
              <HoiBenh handleSetData={handleSetData} />
            </Col>

            <Col xs={24} md={12} className="paddingLeft">
              <KhamXet handleSetData={handleSetData} />
            </Col>
          </Row>
        </>
      )}
    </Main>
  );
};

export default React.memo(KhamCoBan);
