import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Row, Switch } from "antd";
import { Button, Select } from "components";
import Breadcrumb from "components/Breadcrumb";
import { useEnum } from "hook";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";

const ThietLapTichDiem = ({
  //state
  dataPhieuLinh,
  //dispacth
  getPhieuLinhTra,
  postPhieuLinhTra,
}) => {
  const [state, _setState] = useState({ disableSave: true });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const [listThoiGianTaoPhieuLinh] = useEnum("ThoiGianTaoPhieuLinh");
  const onSave = () => {
    const payload = {
      ...state,
    };
    postPhieuLinhTra(payload);
  };
  const onCancel = () => {
    setState({ ...dataPhieuLinh, disableSave: true });
  };

  useEffect(() => {
    if (dataPhieuLinh) {
      setState({
        ...dataPhieuLinh,
      });
    }
  }, [dataPhieuLinh]);

  useEffect(() => {
    getPhieuLinhTra();
  }, []);

  const onChange = (key) => (value) => {
    const newState = { ...state, [key]: value };
    setState({
      [key]: value,
      disableSave: Object.keys(dataPhieuLinh).reduce(
        (a, b) => a && newState[b] === dataPhieuLinh[b],
        true
      ),
    });
  };

  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Thiết lập", link: "/thiet-lap" },
            {
              title: "Thiết lập phiếu lĩnh trả",
              link: "/thiet-lap/phieu-linh-tra",
            },
          ]}
        />
      </Row>
      <Row>
        <Col xxl={10} xl={10} md={10} className="body">
          <div className="wrap-content">
            <div className="title">
              <div>Thiết lập phiếu lĩnh trả</div>
            </div>
            <div className="main">
              <div className="group-item">
                <div className="text text-bold">Thời gian tạo phiếu</div>
                <div className="group-item-input">
                  <Select
                    value={state.thoiGianTaoPhieu}
                    data={listThoiGianTaoPhieuLinh}
                    onChange={onChange("thoiGianTaoPhieu")}
                    placeholder="Chọn thời gian tạo phiếu"
                  ></Select>
                </div>
              </div>
              <div className="group-item">
                <div className="text text-bold">
                  Cho phép tạo phiếu lĩnh với số lượng lẻ
                </div>
                <div className="group-item-input">
                  <Switch
                    checked={state.linhSoLuongLe}
                    onChange={onChange("linhSoLuongLe")}
                  ></Switch>
                </div>
              </div>
              <div className="group-item">
                <div className="text text-bold">
                  Cho phép trả với số lượng lẻ
                </div>
                <div className="group-item-input">
                  <Switch
                    checked={state.traSoLuongLe}
                    onChange={onChange("traSoLuongLe")}
                  ></Switch>
                </div>
              </div>
            </div>

            <div className="action">
              <Button
                className="button-cancel"
                rightIcon={<CloseOutlined />}
                onClick={onCancel}
                iconHeight={15}
                minWidth={100}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                rightIcon={<SaveOutlined />}
                className="button-ok"
                onClick={onSave}
                iconHeight={18}
                minWidth={100}
                disabled={state.disableSave}
              >
                Lưu
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Main>
  );
};

export default connect(
  (state) => ({
    dataPhieuLinh: state.thietLap.phieuLinhTra,
  }),
  ({ thietLap: { postPhieuLinhTra, getPhieuLinhTra, updateData } }) => ({
    postPhieuLinhTra,
    getPhieuLinhTra,
    updateData,
  })
)(ThietLapTichDiem);
