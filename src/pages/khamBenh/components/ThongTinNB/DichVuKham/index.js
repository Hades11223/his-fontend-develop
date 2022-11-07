import React, { useMemo } from "react";
import MuiTenNgang from "../MuiTenNgang";
import MuiTenDoc from "../MuiTenDoc";
import DichVu from "../DichVu";
import KetLuan from "../KetLuan";
import { groupBy } from "lodash";
export const DichVuKham = ({ item, level = 1, isMain, lastItem, ...props }) => {
  const list = useMemo(() => {
    item = JSON.parse(JSON.stringify(item));
    let dsKham = item.dsKham || [];
    item.dsKham = [];
    let list = [item];
    let addRight = true;
    dsKham.forEach((item, index) => {
      if (addRight) {
        list.push(item);
        addRight = false;
      } else {
        list.splice(0, 0, item);
        addRight = true;
      }
    });
    return list;
  }, [item]);
  const displayKetLuan = useMemo(() => {
    if (lastItem?.huongDieuTri) {
      if (
        lastItem?.huongDieuTri === item.huongDieuTri &&
        item.huongDieuTri &&
        item.huongDieuTri != 100
      ) {
        //100 KHÔNG KHÁM // nếu có chuyển viện hoặc nhập viện , và có nhiều KL , thì chỉ hiện CV hoặc NV
        return <KetLuan item={item} id={props.id + "_item_result"} />;
      }
    } else if (
      item.huongDieuTri &&
      item.huongDieuTri != 100 &&
      item.huongDieuTri != 30 &&
      item.huongDieuTri != 40
    ) {
      return <KetLuan item={item} id={props.id + "_item_result"} />;
    }
  }, [lastItem]);
  const displayMuiTenDocKetLuan = useMemo(() => {
    if (lastItem?.huongDieuTri) {
      if (
        lastItem?.huongDieuTri === item.huongDieuTri &&
        item.huongDieuTri &&
        item.huongDieuTri != 100
      ) {
        return (
          <MuiTenDoc
            direction="result"
            fromNode={props.id + "_item_service_name"}
            toNode={props.id + "_item_result"}
            totalLevel={props.totalLevel}
            level={level}
          />
        );
      }
    } else if (
      item.huongDieuTri &&
      item.huongDieuTri != 100 &&
      item.huongDieuTri != 30 &&
      item.huongDieuTri != 40
    ) {
      return (
        <MuiTenDoc
          direction="result"
          fromNode={props.id + "_item_service_name"}
          toNode={props.id + "_item_result"}
          totalLevel={props.totalLevel}
          level={level}
        />
      );
    }
  }, [lastItem]);
  const listCls = groupBy(item?.dsCls || [], "tenNhomDichVuCap2");
  return list.length > 1 ? (
    list.map((item2, index) => {
      return (
        <DichVuKham
          item={item2}
          level={item2.id == item.id ? level : level + 1}
          key={props.key + "_" + index}
          id={item2.id == item.id ? props.id : props.id + "_" + index}
          isMain={item2.id == item.id}
          totalChild={list.length - 1}
          totalLevel={props.totalLevel}
          lastItem={lastItem}
        />
      );
    })
  ) : (
    <li key={props.key} id={props.id} data-key={props.key} data-level={level}>
      <div
        className="item"
        id={props.id + "_item"}
        style={{
          zIndex: level,
          height: "25px",
          marginTop: 30 + (level - 1) * 8 + "px",
          marginBottom: 8 + "px",
        }}
      >
        <DichVu
          item={item}
          isMainService={true}
          id={props.id + "_item_service_name"}
        />
        {level == 1 ? (
          <MuiTenDoc
            direction={"top"}
            totalLevel={props.totalLevel}
            level={level}
          />
        ) : null}

        {(item.dsCls || []).length ? (
          <MuiTenDoc
            direction={"up"}
            totalLevel={props.totalLevel}
            level={level}
          />
        ) : null}

        {displayMuiTenDocKetLuan}
        {isMain && (
          <>
            {props.totalChild >= 2 && (
              <MuiTenNgang
                direction={"left"}
                leftNode={props.id + "_" + 0}
                rightNode={props.id}
                level={level}
              />
            )}
            {props.totalChild >= 1 && (
              <MuiTenNgang
                direction={"right"}
                leftNode={props.id}
                rightNode={props.id + "_" + props.totalChild}
                level={level}
              />
            )}
          </>
        )}
      </div>
      {Object.keys(listCls).length ? (
        <ul className="item-child" style={{ zIndex: level }}>
          {Object.keys(listCls).map((key, index2) => {
            return (
              <li key={index2} className="item">
                <DichVu items={listCls[key]} />
              </li>
            );
          })}
        </ul>
      ) : null}
      {displayKetLuan}
    </li>
  );
};

export default DichVuKham;
