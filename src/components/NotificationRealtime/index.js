import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";
const Marquee = (props) => {
  const {
    thongBao: { listThongBaoThoiGianThuc },
  } = useSelector((state) => state);

  const {
    thongBao: { searchThongBao },
  } = useDispatch();

  useEffect(() => {
    searchThongBao({
      page: 0,
      size: 10,
      active: true,
      loaiThongBao: 30,
      sort: "createdAt,desc",
    });
  }, []);

  const onMouseEnter = (e) => {
    e.target && e.target.stop && e.target.stop();
  };
  const onMouseLeave = (e) => {
    e.target && e.target.stop && e.target.start();
  };

  return (
    <Main
      scrolldelay={10}
      scrollamount={4}
      id="myMarquee"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {listThongBaoThoiGianThuc?.map((item, index) => {
        return <span key={index}>{item.noiDung}</span>;
      })}
    </Main>
  );
};

export default Marquee;
