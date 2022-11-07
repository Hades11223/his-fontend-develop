import { sortBy } from "lodash";
import React, { useMemo } from "react";
import ThuItem from "../components/ThuItem";
import { Main, TabLabelStyle, PGStyled } from "./styled";

const PGItem = ({ data, onShowDsNb, onThemMoiPG }) => {
  const { maPhong, slGiuong, slGiuongTrong, slNb, dsGiuong, phongId, khoaId } =
    data || {};

  const dsThuMemo = useMemo(() => {
    return (dsGiuong[0].dsNgay || []).map((item) => ({
      ...item,
      dsGiuong: sortBy(dsGiuong, ["soHieu"], "asc"),
    }));
  }, [dsGiuong]);

  return (
    <PGStyled>
      <TabLabelStyle>
        <div className="pg-name">{maPhong}</div>
        <div className="pg-info">{`${slGiuongTrong}/${slGiuong} giường trống; ${slNb} người bệnh`}</div>
      </TabLabelStyle>

      <Main>
        <ul>
          {(dsThuMemo || []).map((item) => (
            <li key={item.ngay}>
              <ThuItem
                dsGiuong={item.dsGiuong}
                dsNb={item.dsNb}
                ngay={item.ngay}
                phongId={phongId}
                khoaId={khoaId}
                onShowDsNb={onShowDsNb}
                onThemMoiPG={onThemMoiPG}
              />
            </li>
          ))}
        </ul>
      </Main>
    </PGStyled>
  );
};

export default PGItem;
