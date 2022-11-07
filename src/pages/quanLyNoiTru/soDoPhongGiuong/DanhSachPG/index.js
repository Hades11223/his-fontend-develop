import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PGItem from "../PGItem";
import TimKiemPG from "../TimKiemPG";
import { Main } from "./styled";
import { InboxOutlined } from "@ant-design/icons";

const DanhSachPG = ({ onShowDsNb, onThemMoiPG }) => {
  const {
    soDoPhongGiuong: { nbSlTheoGiuong, dataSearch },
  } = useSelector((state) => state);

  const dsPhongMemo = useMemo(() => {
    if (dataSearch?.phongId) {
      return nbSlTheoGiuong.filter((x) => x.phongId == dataSearch?.phongId);
    }
    return nbSlTheoGiuong;
  }, [nbSlTheoGiuong, dataSearch?.phongId]);

  return (
    <Main>
      <TimKiemPG />
      <div className="list-pg">
        {dsPhongMemo && dsPhongMemo.length > 0 ? (
          (dsPhongMemo || []).map((item) => (
            <PGItem
              key={item.phongId}
              data={item}
              onShowDsNb={onShowDsNb}
              onThemMoiPG={onThemMoiPG}
            />
          ))
        ) : (
          <div className="empty-list">
            <div className="icon">
              <InboxOutlined />
            </div>
            <div>Chưa có thông tin phòng - giường</div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default DanhSachPG;
