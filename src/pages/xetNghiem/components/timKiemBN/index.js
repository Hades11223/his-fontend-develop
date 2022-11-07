import React, { useEffect, useState } from "react";
import { Main, SearchPartient } from "./styled";
import { Row, Col } from "antd";
import Select from "components/Select";
import { useSelector, useDispatch } from "react-redux";
import InputBlockString from "components/DanhMuc/inputBlockString";
import { openInNewTab } from "utils";
import { TRANG_THAI_LAY_MAU_BN } from "constants/index";
import { Button } from "components";
import { useTranslation } from "react-i18next";

const TimKiemBN = (props) => {
  const { t } = useTranslation();
  const { listNoiLayBenhPham } = useSelector((state) => state.xetNghiem);
  console.log("listNoiLayBenhPham", listNoiLayBenhPham);
  const {
    thietLap: {
      dataNHOM_HUYET_HOC,
      dataNHOM_SINH_HOA,
      dataNHOM_SINH_HOA_TIM_MACH,
      dataNHOM_MIEN_DICH,
      dataNHOM_GIAI_PHAU_BENH,
      dataNHOM_VI_SINH,
    },
    nhomDichVuCap2: { listGroupService2 },
    xnHuyetHocSinhHoa: { dsNhomDichVuCap2Id: dsNhomDichVuCap2IdSHHH },
    xnGiaiPhauBenhViSinh: { dsNhomDichVuCap2Id: dsNhomDichVuCap2IdGPB },
  } = useSelector((state) => state);
  const {
    xetNghiem: { getPhongLayMau, getDsNguoiBenhQms },
    nbXetNghiem: {
      onChangeInputSearch,
      onSizeChange,
      updateData: updateDataNBXetNghiem,
    },
    nhomDichVuCap2: { searchTongHopDichVuCap2 },
    xnHuyetHocSinhHoa: { updateData: updateDataSHHH },
    xnGiaiPhauBenhViSinh: { updateData: updateDataGPB },
  } = useDispatch();
  let paramCheck = ["/xet-nghiem/lay-mau"].includes(window.location.pathname);
  const [state, _setState] = useState({ listPhong: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    searchTongHopDichVuCap2();
    getPhongLayMau({ loaiPhong: 40 }, paramCheck);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes("/giai-phau-benh-vi-ky-sinh")) {
      let dichVuCap2 = listGroupService2.filter(
        (x) => x.ma == dataNHOM_GIAI_PHAU_BENH || x.ma == dataNHOM_VI_SINH
      );
      if (dichVuCap2.length) {
        let id = dichVuCap2.map((item) => item?.id);
        updateDataGPB({ dsNhomDichVuCap2Id: id });
      }
    }
  }, [dataNHOM_GIAI_PHAU_BENH, dataNHOM_VI_SINH, listGroupService2]);
  useEffect(() => {
    if (window.location.pathname.includes("/sinh-hoa-huyet-hoc")) {
      let dichVuCap2 = listGroupService2.filter(
        (x) =>
          x.ma == dataNHOM_HUYET_HOC ||
          x.ma == dataNHOM_SINH_HOA ||
          x.ma == dataNHOM_SINH_HOA_TIM_MACH ||
          x.ma == dataNHOM_MIEN_DICH
      );
      if (dichVuCap2.length) {
        let id = dichVuCap2.map((item) => item?.id);
        updateDataSHHH({ dsNhomDichVuCap2Id: id });
      }
    }
  }, [
    listGroupService2,
    dataNHOM_HUYET_HOC,
    dataNHOM_SINH_HOA,
    dataNHOM_SINH_HOA_TIM_MACH,
    dataNHOM_MIEN_DICH,
  ]);

  useEffect(() => {
    let phongThucHienId =
      (listNoiLayBenhPham.length && listNoiLayBenhPham[0].id) || null;
    let soLuongHanDoi =
      (listNoiLayBenhPham.length && listNoiLayBenhPham[0].slBanLayBenhPham) ||
      "";
    setState({
      listPhong: listNoiLayBenhPham,
      phongThucHienId,
      soLuongHanDoi,
    });
    if (phongThucHienId && paramCheck) {
      getDsNguoiBenhQms(phongThucHienId);
      updateDataNBXetNghiem({ phongThucHienId });
    }
  }, [listNoiLayBenhPham]);

  useEffect(() => {
    onSizeChange({
      phongThucHienId: state?.phongThucHienId,
      size: 10,
      dataSearch: {
        dsTrangThai: paramCheck
          ? TRANG_THAI_LAY_MAU_BN.reduce((arr, cur) => [...arr, cur.value], [])
          : 66,
      },
    });
  }, [state?.phongThucHienId, dsNhomDichVuCap2IdSHHH, dsNhomDichVuCap2IdGPB]);
  const handleSearchBN = () => {};
  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "phongThucHienId") {
      setState({
        soLuongHanDoi: item?.lists?.slBanLayBenhPham,
      }); //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
      updateDataNBXetNghiem({
        page: 0,
        size: 10,
      });
      setState({
        phongThucHienId: value,
      });
      if (paramCheck && value) {
        getDsNguoiBenhQms(value);
        updateDataNBXetNghiem({ phongThucHienId: value });
      }
    }
    setState({
      [key]: value,
    });
  };
  return (
    <Main>
      <Row align="middle">
        <Col xs={(paramCheck && 12) || 24}>
          <SearchPartient>
            <div
              onClick={() => openInNewTab("/danh-muc/phong")}
              className="title pointer"
            >
              {(paramCheck && t("xetNghiem.phongLayMau")) ||
                t("xetNghiem.phongThucHien")}
            </div>
            <Select
              data={state.listPhong}
              value={state.phongThucHienId}
              placeholder={`${t("common.chon")} ${
                (paramCheck && t("xetNghiem.phongLayMau")) ||
                t("xetNghiem.phongThucHien")
              }`}
              style={{ width: "100%" }}
              onChange={onChange("phongThucHienId")}
            />
          </SearchPartient>
        </Col>
        {!!paramCheck && (
          <>
            <Col xs={8}>
              <SearchPartient>
                <div className="title">{t("xetNghiem.soLuongHangDoi")}</div>
                <InputBlockString
                  placeholder={t("xetNghiem.nhapSoLuongHangDoi")}
                  style={{ width: "100%" }}
                  value={state.soLuongHanDoi}
                  onChange={onChange("soLuongHanDoi")}
                  disabled //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
                />
              </SearchPartient>
            </Col>
            <Col xs={4}>
              <Button
                type="primary"
                style={{ marginTop: 20 }}
                onClick={() => handleSearchBN()}
              >
                OK
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Main>
  );
};

export default TimKiemBN;
