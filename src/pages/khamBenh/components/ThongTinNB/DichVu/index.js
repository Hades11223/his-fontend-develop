import React, { useMemo, useRef } from "react";
import PendingIcon from "assets/svg/kham-benh/pending.svg";
import WaitingIcon from "assets/svg/kham-benh/waiting.svg";
import FinishIcon from "assets/svg/kham-benh/finish.svg";
import { Main } from "./styled";
import { Popover } from "antd";
import Tooltip from "./Tooltip";
export const DichVu = ({ item, isMainService, ...props }) => {
  const item2 = !isMainService && props.items?.length ? props.items[0] : null;
  const status = useMemo(() => {
    if (isMainService) {
      if (
        [
          10, //ĐĂNG KÝ KHÁM
          20, //CHỜ KHÁM
          30, //ĐÃ CHECKIN CHỜ KHÁM
          40, //CHUẨN BỊ KHÁM
          50, //BỎ QUA
          130, //BỎ QUA KẾT LUẬN
        ].includes(item?.trangThai)
      )
        return 1;
      else if (
        [
          60, //ĐANG KHÁM
          70, //ĐANG THỰC HIỆN DỊCH VỤ,
          100, //CHỜ KẾT LUẬN,
          110, //ĐÃ CHECKIN CHỜ KL,
          120, //CHUẨN BỊ KL,
          140, //ĐÃ KẾT LUẬN,
          // 130, //ĐANG KẾT LUẬN, chuyển lên đỏ TICKET 1751
        ].includes(item?.trangThai)
      ) {
        return 2;
      } else {
        if (
          [
            // 140, //ĐÃ KẾT LUẬN, chuyển lên vàng TICKET 1751
            150, //ĐÃ KẾT LUẬN
            160, //ĐÃ DUYỆT
          ].includes(item?.trangThai)
        ) {
          return 3;
        }
      }
    } else {
      if (
        //tất cả các dịch vụ đều nằm trong ds
        !props.items?.find(
          (item) =>
            ![
              15, //CHỜ TIẾP ĐÓN CLS
              25, //CHỜ TIẾP NHẬN
              35, //ĐÃ CHECKIN
              43, //CHUẨN BỊ THỰC HIỆN
              46, //CHUẨN BỊ LẤY MẪU
            ].includes(item?.trangThai)
        )
      ) {
        return 1;
      } else if (
        //1 trong các dịch vụ nằm trong danh sách từ 4-10
        props.items?.find((item) =>
          [
            64, //"ĐÃ TIẾP NHẬN",
            65, //"ĐÃ LẤY MẪU"
          ].includes(item?.trangThai)
        ) ||
        //hoặc tồn tại 1 dịch vụ ở trạng thái > 10
        (
          props.items?.filter((item) =>
            [
              155, //ĐÃ CÓ KẾT QUẢ
              160, //"ĐÃ DUYỆT"
            ].includes(item?.trangThai)
          ) || []
        ).length !== props.items?.length
      ) {
        return 2;
      } else if (
        //tất cả các dịch vụ đều nằm trong ds
        !props.items?.find(
          (item) =>
            ![
              155, //ĐÃ CÓ KẾT QUẢ
              160, //"ĐÃ DUYỆT"
            ].includes(item?.trangThai)
        )
      ) {
        return 3;
      }
    }
    return 1;
  }, [isMainService, item]);
  const icon = useMemo(() => {
    if (status == 1) return <WaitingIcon />;
    if (status == 2) return <PendingIcon />;
    return <FinishIcon />;
  }, [isMainService, item]);
  return (
    <Popover
      content={
        <Tooltip
          item={item}
          isMainService={isMainService}
          items={props.items}
        />
      }
    >
      <Main
        className={`service-name status${status}`}
        isMainService={isMainService}
        // trangThai={item.trangThai}
        trangThai={2}
        id={props.id}
      >
        {icon}
        {isMainService ? item?.tenDichVu : item2?.tenNhomDichVuCap2}
      </Main>
    </Popover>
  );
};

export default DichVu;
