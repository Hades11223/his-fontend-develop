import React, { useEffect, useRef, useState } from "react";
import { Row } from "antd";
import { Main, GlobalStyle } from "./styled";
import { Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import { ENUM } from "constants/index";
import { useEnum, useListAll } from "hook";

const TopContent = (props) => {
  const refPayload = useRef({});
  const { listAllPhong = [] } = useSelector((state) => state.phong);
  const {
    phong: { getListAllPhong },
    kiosk: { getListAllKiosk },
  } = useDispatch();

  const [listLoaiQms] = useEnum(ENUM.LOAI_QMS);
  const [listAllQuayTiepDon] = useListAll("quayTiepDon");

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListAllPhong({ page: "", size: "", active: true });
  }, []);

  const onChange = (key) => (e) => {
    if (key === "loaiQms") {
      getListAllPhong({ page: "", size: "", active: true, loaiPhong: e });
      setState({ [key]: e });
      refPayload.current.loaiQms = e;
      refPayload.current.quayTiepDonId = null;
    }
    if (key === "quayTiepDonId") {
      refPayload.current.quayTiepDonId = e;
    }
    if (key === "phongId") {
      refPayload.current.phongId = e;
    }
    props.onSearch && props.onSearch(refPayload.current);
    getListAllKiosk({ ...refPayload.current, page: "", size: "" });
  };

  return (
    <Main>
      <GlobalStyle />
      <Row>
        <div className="top">HỆ THỐNG XẾP HÀNG CHỜ</div>
      </Row>
      <Row>
        <div className="middle">Xin kính chào Quý khách</div>
      </Row>
      <Row>
        <div className="bottom">Thiết lập</div>
      </Row>
      <Row>
        <Select
          dropdownClassName="modal-select"
          placeholder="Chọn loại QMS"
          data={listLoaiQms}
          onChange={onChange("loaiQms")}
        />
      </Row>
      {state.loaiQms !== 10 && (
        <Row>
          <Select
            dropdownClassName="modal-select"
            placeholder="Chọn phòng"
            data={listAllPhong}
            onChange={onChange("phongId")}
          />
        </Row>
      )}
      {state.loaiQms === 10 && (
        <Row>
          <Select
            dropdownClassName="modal-select"
            placeholder="Quầy tiếp đón"
            data={listAllQuayTiepDon}
            onChange={onChange("quayTiepDonId")}
          />
        </Row>
      )}
    </Main>
  );
};

export default TopContent;
