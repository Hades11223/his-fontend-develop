import { Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect } from "react";
import { Main, MainPage } from "./styled";
import WrapperChiTiet from "./WrapperChiTiet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ChiTietDanhSachDichVuKho = (props) => {
  const getChiTietDanhSachDichVuKho =
    useDispatch().danhSachDichVuKho.getChiTietDanhSachDichVuKho;
  const selectedItem = useSelector(
    (state) => state.danhSachDichVuKho.selectedItem
  );
  const { khoId, dichVuId } = useParams();
  useEffect(() => {
    let notUseParamsSearch = props?.location?.state?.notUseParamsSearch;
    getChiTietDanhSachDichVuKho({
      id: khoId,
      dichVuId: dichVuId,
      notUseParamsSearch,
    });
  }, []);

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Danh sách tồn kho", link: "/kho/danh-sach-ton-kho" },
        {
          title: "Chi tiết tồn kho",
          link: `/kho/danh-sach-ton-kho/chi-tiet/${khoId}/${dichVuId}`,
        },
      ]}
      title={"Chi tiết tồn kho"}
      titleRight={
        <div className="right">
          <img
            style={{ marginRight: 10 }}
            src={require("assets/images/kho/location.png")}
            alt=""
          ></img>
          Kho: {selectedItem?.tenKho}
        </div>
      }
    >
      <Main>
        <Row>
          <WrapperChiTiet />
        </Row>
      </Main>
    </MainPage>
  );
};

export default ChiTietDanhSachDichVuKho;
