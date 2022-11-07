import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

const LichSuKham = ({ ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const { lichSuKham, soDotDieuTri } = useSelector((state) => state.hoSoBenhAn);
  const {
    hoSoBenhAn: { updateData },
  } = useDispatch();

  const listData = lichSuKham.map((item) => ({
    maHS: item.maHoSo,
    id: item.id,
    ngayTao: moment(item.thoiGianVaoVien).format("DD/MM/YYYY"),
    noiDung:
      [...(item.dsCdChinh || []), ...(item.dsCdKemTheo || [])].length > 0
        ? [...(item.dsCdChinh || []), ...(item.dsCdKemTheo || [])]
            .map((element) => element.ma + " - " + element.ten)
            .join(",\n")
        : "",
  }));
  return (
    <Main>
      <div className="title">
        {t("hsba.lichSuKhamChuaBenh")} <span>({soDotDieuTri})</span>
      </div>
      <div className="history">
        <ul>
          {listData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                updateData({
                  nbDotDieuTriId: item.id,
                });
                history.push("/ho-so-benh-an/chi-tiet-nguoi-benh/" + item.id);
              }}
              className={id == item.id ? "active" : ""}
            >
              <div className="li-head">
                {item.ngayTao + ` - ${t("common.maHs")}: ` + item.maHS}
              </div>
              <Tooltip
                title={item.noiDung}
                overlayStyle={{ whiteSpace: "break-spaces" }}
              >
                <div className="li-content">
                  {item.noiDung && item.noiDung.substr(0, 110) + "..."}
                </div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  );
};

export default LichSuKham;
