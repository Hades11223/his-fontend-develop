import React, { useMemo } from "react";
import { Main } from "./styled";
import { CheckCircleOutlined } from "@ant-design/icons";

const TYPE1 = ["Tạo mới", "Chờ duyệt", "Hoàn thành"];
const TYPE2 = ["Tạo mới", "Đã phát"];
const TYPE3 = ["Đã phát"];
const TYPE4 = ["Tạo mới", "Hoàn thành"];
const TrangThai = ({ type, props, times }) => {
  const listNode = useMemo(() => {
    if (type == 1)
      //phieu nhap nhà cung cấp
      return TYPE1;
    if (type == 2)
      //phieu nhập dự trù
      return TYPE1;
    if (type == 3)
      //don thuoc
      return TYPE2;
    if (type == 4)
      //tu truc
      return TYPE3;
    if (type == 5)
      //phát thuốc ngoại true
      return TYPE4;
    return TYPE1;
  }, [type]);
  const listTime = useMemo(() => {
    if (Array.isArray(times)) return times;
    return [];
  }, [times]);
  return (
    <Main className="progress-step">
      {listNode.map((item, index) => {
        return (
          <div
            key={index}
            className={`node ${
              listTime[index]
                ? "finish"
                : index > listTime.length
                ? "disable"
                : ""
            }`}
          >
            <div className="step-text">
              {item} <CheckCircleOutlined style={{ color: "#049254" }} />
            </div>
            {!!listTime[index] && (
              <div className="step-desc">
                <span>
                  {listTime[index]
                    .toDateObject()
                    .format("HH:mm:ss - dd/MM/yyyy")}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </Main>
  );
};

export default TrangThai;
