import { Row, Col, DatePicker, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { Main, NbDivStyled, FilterDivStyled } from "./styled";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { cloneDeep } from "lodash";

const TimKiemPG = () => {
  const [state, _setState] = useState({});

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const {
    khoa: { getListKhoaTongHop },
    phong: { getListPhongTongHop },
    soDoPhongGiuong: {
      getNbSlTheoGiuong,
      updateDataSearch,
      getSoHieuGiuongByPhong,
    },
    phanPhongGiuong: { getDsNbTheoKhoa },
  } = useDispatch();

  const {
    khoa: { listDataTongHop },
    phong: { listRoom },
    soDoPhongGiuong: { dsSoHieuGiuong, dataSearch },
    phanPhongGiuong: { dsNb },
  } = useSelector((state) => state);

  useEffect(() => {
    getListKhoaTongHop();
  }, []);

  useEffect(() => {
    if (dataSearch.khoaId) {
      getDsNbTheoKhoa({
        dsKhoaNbId: [dataSearch.khoaId],
        page: 0,
        size: 500,
        dsTrangThai: [20, 40, 30, 110, 100],
        trangThaiTaiKhoa: 10, //người bệnh đang ở trong khoa
      });

      getListPhongTongHop({
        khoaId: dataSearch.khoaId,
      });
    }
  }, [dataSearch.khoaId]);

  useEffect(() => {
    if (dataSearch.phongId) {
      setState({ giuongId: null });

      getSoHieuGiuongByPhong({
        phongId: dataSearch.phongId,
        sort: "soHieu,asc",
      });
    }
  }, [dataSearch.phongId]);

  useEffect(() => {
    const { khoaId, phongId, giuongId, loaiPhong, tuThoiGian, denThoiGian } =
      dataSearch;

    if (khoaId && tuThoiGian && denThoiGian) {
      getNbSlTheoGiuong({
        khoaId,
        phongId: khoaId ? phongId : undefined,
        giuongId,
        loaiPhong: loaiPhong && loaiPhong.length > 1 ? undefined : loaiPhong,
        tuThoiGian: moment(tuThoiGian).format("DD-MM-YYYY"),
        denThoiGian: moment(denThoiGian).format("DD-MM-YYYY"),
      });
    }
  }, [
    dataSearch.khoaId,
    dataSearch.tuThoiGian,
    dataSearch.denThoiGian,
    dataSearch.phongId,
    dataSearch.loaiPhong,
  ]);

  const onChangeDataSearch = (key, loaiPhongId) => (e) => {
    let updateState = {
      [key]: e,
    };

    if (key == "khoaId") {
      updateState = {
        ...updateState,
        phongId: null,
        giuongId: null,
      };
    }
    if (key == "loaiPhong") {
      let _loaiPhong = cloneDeep(state.loaiPhong || []);
      const checked = e.target.checked;
      if (checked) {
        _loaiPhong.push(loaiPhongId);
      } else {
        _loaiPhong = _loaiPhong.filter((x) => x != loaiPhongId);
      }

      updateState = {
        ...updateState,
        loaiPhong: _loaiPhong,
      };
    }
    setState(updateState);

    updateDataSearch(updateState);
  };

  function onChangeNbInfo(e) {
    updateDataSearch({
      nbDotDieuTriId: e,
    });
  }

  return (
    <Main>
      <NbDivStyled>
        <div className="nb-info">
          <Row>
            <Col span={5}>
              <Select
                data={(dsNb || []).map((x) => ({
                  id: x.id,
                  ten: `${x.maBenhAn || ""}/${x.maHoSo || ""}`,
                }))}
                onChange={onChangeNbInfo}
                value={dataSearch.nbDotDieuTriId}
                placeholder="Mã BA/ Mã hồ sơ"
                className={"nb-info-maBa"}
              />
            </Col>
            <Col span={5}>
              <Select
                data={(dsNb || []).map((x) => ({
                  id: x.id,
                  ten: x.tenNb,
                }))}
                onChange={onChangeNbInfo}
                value={dataSearch.nbDotDieuTriId}
                placeholder="Họ và tên NB"
              />
            </Col>

            <Col span={5}>
              <div className="nb-info-item">
                Phòng hiện tại:{" "}
                {dsNb.find((x) => x.id == dataSearch.nbDotDieuTriId)?.tenPhong}
              </div>
            </Col>

            <Col span={5}>
              <div className="nb-info-item">
                Giường hiện tại:{" "}
                {
                  dsNb.find((x) => x.id == dataSearch.nbDotDieuTriId)
                    ?.soHieuGiuong
                }
              </div>
            </Col>
          </Row>
        </div>
      </NbDivStyled>

      <FilterDivStyled>
        <Row>
          <Col span={5}>
            <div className="item-select">
              <label className="label">Khoa</label>
              <Select
                className="select"
                placeholder={"Chọn khoa"}
                data={listDataTongHop || []}
                onChange={onChangeDataSearch("khoaId")}
                value={dataSearch.khoaId}
              />
            </div>
          </Col>

          <Col span={5}>
            <div className="item-select">
              <label className="label">Phòng</label>
              <Select
                className="select"
                placeholder={"Chọn phòng"}
                data={listRoom || []}
                onChange={onChangeDataSearch("phongId")}
                value={dataSearch.phongId}
              />
            </div>
          </Col>

          <Col span={5}>
            <div className="item-select">
              <label className="label">Giường</label>
              <Select
                className="select"
                placeholder={"Chọn giường"}
                data={(dsSoHieuGiuong || []).map((x) => ({
                  ...x,
                  ten: x.soHieu,
                }))}
                onChange={onChangeDataSearch("giuongId")}
                value={dataSearch.giuongId}
              />
            </div>
          </Col>

          <Col span={4}>
            <div className="item-date">
              <label className="label pointer">Từ ngày</label>
              <DatePicker
                value={dataSearch.tuThoiGian}
                onChange={onChangeDataSearch("tuThoiGian")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </div>
          </Col>

          <Col span={4}>
            <div className="item-select">
              <label className="label">Đến ngày</label>
              <DatePicker
                value={dataSearch.denThoiGian}
                onChange={onChangeDataSearch("denThoiGian")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
              />
            </div>
          </Col>

          <Col span={4} className="check-row">
            <Checkbox
              checked={(dataSearch.loaiPhong || []).includes(60)}
              onChange={onChangeDataSearch("loaiPhong", 60)}
            >
              Giường tự chọn
            </Checkbox>
          </Col>

          <Col span={4} className="check-row">
            <Checkbox
              checked={(dataSearch.loaiPhong || []).includes(50)}
              onChange={onChangeDataSearch("loaiPhong", 50)}
            >
              Giường thường
            </Checkbox>
          </Col>
        </Row>
      </FilterDivStyled>
    </Main>
  );
};

export default TimKiemPG;
