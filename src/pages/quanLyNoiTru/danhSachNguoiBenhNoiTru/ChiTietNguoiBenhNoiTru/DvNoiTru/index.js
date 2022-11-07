import React, { useEffect } from "react";
import { Main } from "./styled";
import Tabs from "../../../components/Tabs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DSDichVu from "./DSDichVu";
import DSThuoc from "./DSThuoc";
import DSVatTu from "./DSVatTu";
import DSSuatAn from "./DSSuatAn";
import HoaChat from "./HoaChat";

const DvNoiTru = (props) => {
  const { id } = useParams();

  const { onSearch } = useDispatch().dvNoiTru;

  useEffect(() => {
    refreshList();
  }, [id]);

  const refreshList = () => {
    let dataSearch = {
      nbDotDieuTriId: id,
      doiTuongKcb: 3,
    };

    onSearch(dataSearch);
  };

  return (
    <Main>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Danh sách dịch vụ" key="1">
          <DSDichVu refreshList={refreshList} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách thuốc" key="2">
          <DSThuoc refreshList={refreshList} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách vật tư" key="3">
          <DSVatTu refreshList={refreshList} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách suất ăn" key="4">
          <DSSuatAn refreshList={refreshList} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Máu" key="5"></Tabs.TabPane>
        <Tabs.TabPane tab="Hóa chất" key="6">
          <HoaChat refreshList={refreshList} />
        </Tabs.TabPane>
      </Tabs>
    </Main>
  );
};

export default DvNoiTru;
