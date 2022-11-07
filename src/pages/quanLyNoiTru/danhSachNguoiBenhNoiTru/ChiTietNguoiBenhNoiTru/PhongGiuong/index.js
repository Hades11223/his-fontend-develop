import React, { useRef } from "react";
import { Main } from "./styled";
import DSPhongGiuong from "./DSPhongGiuong";
import DSNghiDieuTri from "./DSNghiDieuTri";
import { Button } from "components";
import Tabs from "../../../components/Tabs";
import SoDoPhongGiuong from "../../../soDoPhongGiuong";
import { useDispatch, useSelector } from "react-redux";
import IcCreate from "assets/images/kho/IcCreate.png";

const PhongGiuong = (props) => {
  const refSoDoPhongGiuong = useRef(null);
  const {
    soDoPhongGiuong: { updateDataSearch },
  } = useDispatch();
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { isReadonly } = props;
  const onThemMoi = () => {
    updateDataSearch({
      nbDotDieuTriId: infoPatient?.id,
      khoaId: infoPatient?.khoaNbId,
    });

    refSoDoPhongGiuong.current && refSoDoPhongGiuong.current.show();
  };
  console.log("isReadonly", isReadonly)
  const operations = !isReadonly && (
    <Button
      minWidth={"100px"}
      iconHeight={15}
      height={32}
      rightIcon={<img src={IcCreate} alt="..."></img>}
      type="primary"
      className="btn-add"
      onClick={onThemMoi}
    >
      Thêm mới
    </Button>
  );

  return (
    <Main>
      <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
        <Tabs.TabPane tab="Danh sách phòng giường" key="1">
          <DSPhongGiuong isReadonly={isReadonly}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách nghỉ điều trị" key="2">
          <DSNghiDieuTri isReadonly={isReadonly}/>
        </Tabs.TabPane>
      </Tabs>

      <SoDoPhongGiuong ref={refSoDoPhongGiuong} />
    </Main>
  );
};

export default PhongGiuong;
