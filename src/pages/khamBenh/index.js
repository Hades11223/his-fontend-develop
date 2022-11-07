import React, { useRef, useEffect, useMemo, useState } from "react";
import { Row, Col } from "antd";
import { Main, MainPage } from "./styled";
import TimKiemBN from "./components/TimKiemBN";
import LayDSBN from "./components/TimKiemBN/LayDsBN";
import LichSuKham from "./components/LichSuKham";
import ThongTinBN from "./components/ThongTinNB";
import SoLuongBN from "./components/SoLuongBN";
import ThongTin from "./ThongTin";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch, useSelector } from "react-redux";
import { LOAI_PHONG } from "constants/index";
import UnAuth from "../unAuth";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { AutoScale } from "components";

const KhamBenh = (props) => {
  const [state, _setState] = useState({ collapse: true });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const {
    khamBenh: { getPhongTheoTaiKhoan, getDsDichVuById, clearData, getNbDvKham },
    chiDinhKhamBenh: { updateConfigData },
    nbKhamBenh: { onSizeChange },
    phimTat: { onAddLayer, onRemoveLayer },
  } = useDispatch();
  const { listPhongKham } = useSelector((state) => state.khamBenh);
  const { phongThucHienId, dichVu } = useParams();

  const isValid = useMemo(() => {
    if (!phongThucHienId) return true; //nếu không có thông tin phòng thực hiện thì mặc định là true
    if (listPhongKham?.length) {
      // ngược lại nếu có danh sách các phòng khám thì phòng thực hiện phải nằm trong ds phòng khám
      return listPhongKham.some((item) => item.id == phongThucHienId);
    } else {
      //còn nếu không có ds phòng khám thì mặc định là true, đợi load danh sach phòng khám
      return true;
    }
  }, [phongThucHienId, listPhongKham]);

  useEffect(() => {
    getPhongTheoTaiKhoan({
      loaiPhong: LOAI_PHONG.PHONG_KHAM,
    });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      clearData({});
      updateConfigData({ configData: null });
    };
  }, []);

  useEffect(() => {
    if (phongThucHienId && dichVu)
      //nếu có phòng thực hiện Id và dịch vụ thì thực hiện load thông tin màn hình khám bệnh
      getNbDvKham({
        dichVuId: dichVu,
        chuyenTrangThai: false,
      }).then((nbInfo) => {
        getDsDichVuById({
          dichVuId: dichVu,
          phongThucHienId: phongThucHienId,
          loaiPhong: LOAI_PHONG.PHONG_KHAM,
          tuThoiGianVaoVien: moment().format("DD-MM-YYYY 00:00:00"),
          denThoiGianVaoVien: moment().format("DD-MM-YYYY 23:59:59"),
          nbDotDieuTriId: nbInfo.nbDotDieuTriId,
          isLoadNbDvKham: false,
        });
      });
  }, [dichVu, phongThucHienId]);

  useEffect(() => {
    if (!phongThucHienId && !dichVu && listPhongKham?.length) {
      //trạng thái chờ khám => chờ KL => đang khám => đang thực hiện DV
      const dsTrangThaiArr = [[20, 30, 40], [100, 110, 120], [60], [70]];

      const searchNb = (index = 0) => {
        onSizeChange({
          dsPhongThucHienId: (listPhongKham || []).map((x) => x.id),
          size: 10,
          sort: "thoiGianVaoVien,asc", //sắp xếp theo thời gian vào viện sớm nhất
          chuyenTrangThai: true,
          isSingleSearch: true,
          dsTrangThai: dsTrangThaiArr[index],
          tuThoiGianVaoVien: moment().format("DD-MM-YYYY 00:00:00"), //lấy bệnh nhân trong ngày hôm nay
          denThoiGianVaoVien: moment().format("DD-MM-YYYY 23:59:59"),
        }).catch((err) => {
          const newIndex = index + 1;
          if (err.code == -1 && newIndex < dsTrangThaiArr.length) {
            searchNb(newIndex);
          }
        });
      };

      //nếu chưa focus vào bệnh nhân nào thì thực hiện search
      searchNb();
    }
  }, [listPhongKham, phongThucHienId, dichVu]);

  const collapseLeft = () => {
    setState({ collapse: !state.collapse });
  };

  return (
    <MainPage
      breadcrumb={[{ link: "/kham-benh", title: t("khamBenh.khamBenh") }]}
    >
      <Main className="hideScrollbar">
        {!isValid ? (
          <UnAuth></UnAuth>
        ) : (
          <>
            <div
              className={`paddingRight transition-4s left-kham-benh ${
                state.collapse ? "collapse" : ""
              }`}
            >
              <TimKiemBN
                className="search-collapse"
                colapse={state.collapse}
                layerId={refLayerHotKey.current}
              />
              <ThongTinBN
                onCollapse={collapseLeft}
                collapse={state.collapse}
                layerId={refLayerHotKey.current}
              />
              <LichSuKham
                collapse={state.collapse}
                layerId={refLayerHotKey.current}
              />
            </div>
            <div className={"transition-4s right-kham-benh"}>
              <Row>
                <Col span={10}>
                  <LayDSBN layerId={refLayerHotKey.current} />
                </Col>
                <Col span={14}>
                  <SoLuongBN layerId={refLayerHotKey.current} />
                </Col>
                <Col span={24} className="marginTop">
                  <ThongTin layerId={refLayerHotKey.current} />
                </Col>
              </Row>
            </div>
          </>
        )}
      </Main>
    </MainPage>
  );
};

export default KhamBenh;
