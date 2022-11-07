import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { GlobalStyle, Main } from "./styled";
import Select from "components/Select";
import { useDispatch } from "react-redux";
import { useEnum, useStore, useListAll } from "hook";
import { ENUM } from "constants/index";

const TopContent = (props) => {
  const {
    phong: { getListPhong },
    kiosk: { onChangeInputSearch },
  } = useDispatch();
  const { onQuayTiepDon } = props;
  const [listloaiQms] = useEnum(ENUM.LOAI_QMS);
  const listRoom = useStore("phong.listRoom", []);
  const [listAllQuayTiepDon] = useListAll("quayTiepDon");

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListPhong({});
  }, []);

  const onChange = (key) => (e) => {
    if (key === "loaiQms") {
      getListPhong({ loaiPhong: e });
      setState({ [key]: e });
      onQuayTiepDon(null);
    }
    if (key === "quayTiepDonId") {
      onQuayTiepDon(e);
    }
    onChangeInputSearch({ [key]: e });
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
          data={listloaiQms}
          onChange={onChange("loaiQms")}
        />
      </Row>
      {state.loaiQms !== 10 && (
        <Row>
          <Select
            dropdownClassName="modal-select"
            placeholder="Chọn phòng"
            data={listRoom}
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
