import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import DichVuKham from "../DichVuKham";
export const HanhTrinhKham = (props) => {
  const [totalLevel, setTotalLevel] = useState(0);
  const [lastItem , setLastItem] = useState({});
  useEffect(() => {
    let itemLastCondition = {}
    const getLevel = (data) => {
      if (data?.length) {
        let level = 1;
        data.forEach((item) => {
          let levelx = getLevel(item.dsKham);
          if (levelx > level) level = levelx;
          if ((item.huongDieuTri === 30) || (item.huongDieuTri === 40)) {
            itemLastCondition = item
          }
        });
        return level + 1;
      }
      return 0;
    };

    let level = getLevel(props.dsKham);
    setTotalLevel(level);
    setLastItem(itemLastCondition)
  }, [props.dsKham]);

  return (
    <Main className="hanh-trinh-kham">
      <ul className="chart">
        {props.dsKham.map((item, index) => {
          return (
            <DichVuKham
              lastItem={lastItem}
              item={item}
              id={"item_" + index}
              key={"item_" + index}
              level={1}
              totalLevel={totalLevel}
            />
          );
        })}
      </ul>
    </Main>
  );
};

export default HanhTrinhKham;
